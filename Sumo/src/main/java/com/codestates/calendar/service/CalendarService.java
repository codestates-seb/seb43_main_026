package com.codestates.calendar.service;

import com.codestates.calendar.dto.CalendarDto;
import com.codestates.calendar.entity.Calendar;
import com.codestates.calendar.entity.CalendarContent;
import com.codestates.calendar.repository.CalendarContentRepository;
import com.codestates.calendar.repository.CalendarRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CalendarService {
    // TODO CRUD 시에 로그인 인증 관련 로직을 추가해야함!!!

    private final CalendarRepository calendarRepository;
    private final CalendarContentRepository calendarContentRepository;
    private final MemberService memberService;

    public CalendarService(CalendarRepository calendarRepository,
                           CalendarContentRepository calendarContentRepository,
                           MemberService memberService) {
        this.calendarRepository = calendarRepository;
        this.calendarContentRepository = calendarContentRepository;
        this.memberService = memberService;
    }

    // memberService의 createMember 메서드 안에 추가하면 됨.
    public Calendar initCalendar(long memberId) {
        Calendar calendar = new Calendar();
        Member member = new Member();
        member.setMemberId(memberId);
        calendar.setMember(member);

        return calendarRepository.save(calendar);
    }

    // memberService의 deleteMember 메서드 안에 추가하면 됨.
    public void deleteCalendar(long memberId) {
        Optional<Calendar> optionalCalendar = calendarRepository.findByMember_MemberId(memberId);
        Calendar calendar = optionalCalendar.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CALENDAR_NOT_FOUND));
        calendarRepository.delete(calendar);
    }

    public CalendarContent createCalendarContent(CalendarContent calendarContent) {

        verifyValidTimeSetting(calendarContent);

        return calendarContentRepository.save(calendarContent);
    }

    public CalendarContent updateCalendarContent(CalendarContent calendarContent, long calendarId) {

        CalendarContent findCalendarContent = findVerifiedCalendarContent(calendarContent.getCalendarContentId(), calendarId);

        Optional.ofNullable(calendarContent.getImageAddress()).ifPresent(imageAddress -> findCalendarContent.setImageAddress(imageAddress));
        Optional.ofNullable(calendarContent.getContent()).ifPresent(content -> findCalendarContent.setContent(content));
        Optional.ofNullable(calendarContent.getLocation()).ifPresent(location -> findCalendarContent.setLocation(location));
        Optional.ofNullable(calendarContent.getBeginTime()).ifPresent(beginTime -> findCalendarContent.setBeginTime(beginTime));
        Optional.ofNullable(calendarContent.getEndTime()).ifPresent(endTime -> findCalendarContent.setEndTime(endTime));

        return calendarContentRepository.save(findCalendarContent);
    }

    public CalendarContent findCalendarContent(long calendarContentId, long calendarId) {
        return findVerifiedCalendarContent(calendarContentId, calendarId);
    }

    private CalendarContent findVerifiedCalendarContent(long calendarContentId, long calendarId) {
        Optional<CalendarContent> optionalCalendarContent = calendarContentRepository.findById(calendarContentId);
        CalendarContent calendarContent =
                optionalCalendarContent.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CALENDARCONTENT_NOT_FOUND));

        verifyValidCalendarId(calendarContent, calendarId);

        return calendarContent;
    }

    public List<CalendarContent> findCalendarContents(long calendarId, int year, int month) {
        List<CalendarContent> calendarContents = calendarContentRepository.findByCalendar_CalendarId(calendarId);

        return calendarContents.stream()
                .filter(calendarContent -> convertDateToYear(calendarContent.getContent()) == year)
                .filter(calendarContent -> convertDateToMonth(calendarContent.getDate()) == month)
                .collect(Collectors.toList());
    }

    // TODO 이 코드의 개선할 수 있는 점들
    // dto를 리턴하고 있음, member 조회 쿼리가 많이 날라감
    // 누적 시간, 출석률을 db에 저장하는 방법도 하나의 방법임 - 굳이
    // 우선순위큐를 사용하는 방법도 있음 - 컬럼을 하나 추가해서 인덱스로 활용(즉, db에 정렬시켜놓는 방법임)
    // 실시간이냐 한달 고정이냐에 따라서도 구현이 달라질 듯
    public List<CalendarDto.Response> findCalendars(int year, int month) {
        List<Calendar> calendars = calendarRepository.findAll();

        List<CalendarDto.Response> responses = new ArrayList<>();

        for (Calendar calendar : calendars) {
            CalendarDto.Response response = new CalendarDto.Response();

            List<CalendarContent> calendarContents = findCalendarContents(calendar.getCalendarId(), year, month);
            String nickname = memberService.findMember(calendar.getMember().getMemberId()).getNickname();
            int totalMinutes = calculateTotalTime(calendarContents);
            int attendanceRate = calculateAttendanceRate(calendarContents, month);

            response.setNickname(nickname);
            response.setTotalMinutes(totalMinutes);
            response.setAttendanceRate(attendanceRate);

            responses.add(response);
        }

        return responses;
    }

    public int calculateAttendanceRate(List<CalendarContent> calendarContents, int month) {
        int daysForMonth = calculateDaysForMonth(month);
        int exerciseDays = calendarContents.size();
        int attendanceRate = (exerciseDays / daysForMonth) * 100;

        return attendanceRate;
    }

    private int calculateDaysForMonth(int month) {
        if (month == 2) {
            return 28;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        else return 31;
    }

    public int calculateTotalTime(List<CalendarContent> calendarContents) {
        int totalMinutes = 0;
        for (CalendarContent content : calendarContents) {
            String beginTime = content.getBeginTime();
            String endTime = content.getEndTime();
            int timeDifference = calculateTimeDifference(beginTime, endTime);
            totalMinutes += timeDifference;
        }
        return totalMinutes;
    }

    private int calculateTimeDifference(String beginTime, String endTime) {
        // 12:12
        int beginHour = Integer.parseInt(beginTime.substring(0, 2));
        int endHour = Integer.parseInt(endTime.substring(0, 2));
        int beginMinute = Integer.parseInt(beginTime.substring(3, 5));
        int endMinute = Integer.parseInt(endTime.substring(3, 5));

        return (endHour - beginHour) * 60 + (endMinute - beginMinute);
    }

    private int convertDateToYear(String date) {
        return Integer.parseInt(date.substring(0, 4));
    }

    private int convertDateToMonth(String date) {
        return Integer.parseInt(date.substring(5, 7));
    }

    public void deleteCalendarContent(long calendarContentId, long calendarId) {
        CalendarContent calendarContent = findVerifiedCalendarContent(calendarContentId, calendarId);
        calendarContentRepository.delete(calendarContent);
    }

    private void verifyValidTimeSetting(CalendarContent calendarContent) {
        int timeDifference = calculateTimeDifference(calendarContent.getBeginTime(), calendarContent.getEndTime());
        if (timeDifference <= 0) {
            throw new BusinessLogicException(ExceptionCode.INVALID_CALENDARCONTENT_TIME_SETTING);
        }
    }

    private void verifyValidCalendarId(CalendarContent calendarContent, long calendarId) {
        if (calendarContent.getCalendar().getCalendarId() != calendarId) {
            throw new BusinessLogicException(ExceptionCode.INVALID_CALENDAR_ID);
        }
    }
}
