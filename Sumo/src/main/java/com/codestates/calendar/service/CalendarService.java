package com.codestates.calendar.service;

import com.codestates.calendar.entity.Calendar;
import com.codestates.calendar.entity.CalendarContent;
import com.codestates.calendar.repository.CalendarContentRepository;
import com.codestates.calendar.repository.CalendarRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final CalendarContentRepository calendarContentRepository;

    public CalendarService(CalendarRepository calendarRepository, CalendarContentRepository calendarContentRepository) {
        this.calendarRepository = calendarRepository;
        this.calendarContentRepository = calendarContentRepository;
    }

    // memberService의 createMember 메서드 안에 추가하면 됨.
    public Calendar initCalendar(Member member) {
        Calendar calendar = new Calendar();
        // TODO 캘린더의 memberId 세팅하기
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
        return calendarContentRepository.save(calendarContent);
    }

    public CalendarContent updateCalendarContent(CalendarContent calendarContent) {
        CalendarContent findCalendarContent = findVerifiedCalendarContent(calendarContent.getCalendarContentId());
        Optional.ofNullable(calendarContent.getImageAddress()).ifPresent(imageAddress -> findCalendarContent.setImageAddress(imageAddress));
        Optional.ofNullable(calendarContent.getContent()).ifPresent(content -> findCalendarContent.setContent(content));
        Optional.ofNullable(calendarContent.getLocation()).ifPresent(location -> findCalendarContent.setLocation(location));
        return calendarContentRepository.save(findCalendarContent);
    }

    public CalendarContent findCalendarContent(long calendarContentId) {
        return findVerifiedCalendarContent(calendarContentId);
    }

    private CalendarContent findVerifiedCalendarContent(long calendarContentId) {
        Optional<CalendarContent> optionalCalendarContent = calendarContentRepository.findById(calendarContentId);
        CalendarContent calendarContent =
                optionalCalendarContent.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CALENDARCONTENT_NOT_FOUND));
        return calendarContent;
    }

    public List<CalendarContent> findCalendarContents(long calendarId) {
        return calendarContentRepository.findByCalendar_CalendarId(calendarId);
    }

    public void deleteCalendarContent(long calendarContentId) {
        calendarContentRepository.deleteById(calendarContentId);
    }
}
