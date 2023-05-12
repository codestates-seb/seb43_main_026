package com.codestates.calendar.service;

import com.codestates.auth.LoginUtils;
import com.codestates.calendar.entity.Calendar;
import com.codestates.calendar.entity.CalendarContent;
import com.codestates.calendar.repository.CalendarContentRepository;
import com.codestates.calendar.repository.CalendarRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final CalendarContentRepository calendarContentRepository;
    private final MemberRepository memberRepository;

    public CalendarService(CalendarRepository calendarRepository, CalendarContentRepository calendarContentRepository, MemberRepository memberRepository) {
        this.calendarRepository = calendarRepository;
        this.calendarContentRepository = calendarContentRepository;
        this.memberRepository = memberRepository;
    }

    // memberService의 createMember 메서드 안에 추가하면 됨.
    // TODO 캘린더의 연월 세팅 코드 추가해야함
    public Calendar initCalendar(Member member) {
        // 코드 중복 검사하기!!!!

        Calendar calendar = new Calendar();
        calendar.setMember(member);

        Calendar savedCalendar = calendarRepository.save(calendar);
        member.addCalendar(calendar);

        return savedCalendar;
    }

    // 매월 1일 자동으로 모든 멤버들의 캘린더가 새로 생성됨
    // TODO 캘린더의 연월 세팅 코드 추가해야함
    @Scheduled(cron = "0 0 0 1 * *")
    public void createCalendar() {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            Calendar calendar = new Calendar();
            calendar.setMember(member);
            calendarRepository.save(calendar);
        }
    }

    // memberService의 deleteMember 메서드 안에 추가하면 됨.
    public void deleteCalendar(long memberId) {
        Optional<Calendar> optionalCalendar = calendarRepository.findByMember_MemberId(memberId);
        Calendar calendar = optionalCalendar.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CALENDAR_NOT_FOUND));
        calendarRepository.delete(calendar);
    }

    public CalendarContent createCalendarContent(CalendarContent calendarContent) {

        LoginUtils.checkLogin();

        return calendarContentRepository.save(calendarContent);
    }

    public CalendarContent updateCalendarContent(CalendarContent calendarContent, long calendarId) {

        CalendarContent findCalendarContent = findVerifiedCalendarContent(calendarContent.getCalendarContentId(), calendarId);

        // 작성자와 수정자가 일치하는지 확인하는 로직
        String emailFromToken = LoginUtils.checkLogin();
        String emailFromCalendarContent = findCalendarContent.getCalendar().getMember().getEmail();
        checkAccessibleUser(emailFromToken, emailFromCalendarContent);

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

        String emailFromToken = LoginUtils.checkLogin();
        String emailFromCalendarContent = calendarContent.getCalendar().getMember().getEmail();
        checkAccessibleUser(emailFromToken, emailFromCalendarContent);

        verifyValidCalendarId(calendarContent, calendarId);

        return calendarContent;
    }

    public List<CalendarContent> findCalendarContents(long calendarId, int year, int month) {
        List<CalendarContent> calendarContents = calendarContentRepository.findByCalendar_CalendarId(calendarId);
        String emailFromToken = LoginUtils.checkLogin();

        if (calendarContents.size() != 0) {
            CalendarContent calendarContent = calendarContents.get(0);
            String emailFromCalendarContent = calendarContent.getCalendar().getMember().getEmail();

            checkAccessibleUser(emailFromToken, emailFromCalendarContent);

        } else {
            String emailFromCalendar = calendarRepository.findById(calendarId).get().getMember().getEmail();

            checkAccessibleUser(emailFromToken, emailFromCalendar);
        }

        return calendarContents.stream()
                .filter(calendarContent -> convertDateToYear(calendarContent.getContent()) == year)
                .filter(calendarContent -> convertDateToMonth(calendarContent.getDate()) == month)
                .collect(Collectors.toList());
    }

    public List<List<CalendarContent>> findCalendars(int year, int month) {
        List<Calendar> calendars = calendarRepository.findAll();
        List<List<CalendarContent>> responses = new ArrayList<>();

        for (Calendar calendar : calendars) {
            List<CalendarContent> calendarContents = findCalendarContents(calendar.getCalendarId(), year, month);
            responses.add(calendarContents);
        }

        return responses;
    }

//    public int calculateAttendanceRate(List<CalendarContent> calendarContents, int month) {
//        int daysForMonth = calculateDaysForMonth(month);
//        int exerciseDays = calendarContents.size();
//        int attendanceRate = (exerciseDays / daysForMonth) * 100;
//
//        return attendanceRate;
//    }

//    private int calculateDaysForMonth(int month) {
//        if (month == 2) {
//            return 28;
//        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
//            return 30;
//        }
//        else return 31;
//    }

//    public int calculateTotalTime(List<CalendarContent> calendarContents) {
//        int totalMinutes = 0;
//        for (CalendarContent content : calendarContents) {
//            String beginTime = content.getBeginTime();
//            String endTime = content.getEndTime();
//            int timeDifference = calculateTimeDifference(beginTime, endTime);
//            totalMinutes += timeDifference;
//        }
//        return totalMinutes;
//    }

//    private int calculateTimeDifference(String beginTime, String endTime) {
//        int beginHour = Integer.parseInt(beginTime.substring(0, 2));
//        int endHour = Integer.parseInt(endTime.substring(0, 2));
//        int beginMinute = Integer.parseInt(beginTime.substring(3, 5));
//        int endMinute = Integer.parseInt(endTime.substring(3, 5));
//
//        return (endHour - beginHour) * 60 + (endMinute - beginMinute);
//    }

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

    // 시간 설정에 대한 유효성 검사도 프론트쪽으로 넘기는게 나을듯
//    private void verifyValidTimeSetting(CalendarContent calendarContent) {
//        int timeDifference = calculateTimeDifference(calendarContent.getBeginTime(), calendarContent.getEndTime());
//        if (timeDifference <= 0) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_CALENDARCONTENT_TIME_SETTING);
//        }
//    }

    private void verifyValidCalendarId(CalendarContent calendarContent, long calendarId) {
        if (calendarContent.getCalendar().getCalendarId() != calendarId) {
            throw new BusinessLogicException(ExceptionCode.INVALID_CALENDAR_ID);
        }
    }

    private void checkAccessibleUser(String emailFromToken, String emailFromCalendar) {
        if (!emailFromToken.equals("SoomoAdmin@gmail.com") && !emailFromToken.equals(emailFromCalendar)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_ACCESS_CALENDAR);
        }
    }
}
