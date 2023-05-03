package com.codestates.calendar.mapper;

import com.codestates.calendar.dto.CalendarDto;
import com.codestates.calendar.entity.Calendar;
import com.codestates.calendar.entity.CalendarContent;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CalendarMapper {
    default CalendarContent calendarPostDtoToCalendarContent(CalendarDto.Post calendarPostDto) {
        CalendarContent calendarContent = new CalendarContent();
        Calendar calendar = new Calendar();
        calendar.setCalendarId(calendarPostDto.getCalendarId());

        calendarContent.setDate(calendarPostDto.getDate());
        calendarContent.setImageAddress(calendarPostDto.getImageAddress());
        calendarContent.setContent(calendarPostDto.getContent());
        calendarContent.setLocation(calendarPostDto.getLocation());
        calendarContent.setCalendar(calendar);

        return calendarContent;
    }

    default CalendarContent calendarPatchDtoToCalendarContent(CalendarDto.Patch calendarPatchDto) {
        CalendarContent calendarContent = new CalendarContent();

        calendarContent.setImageAddress(calendarPatchDto.getImageAddress());
        calendarContent.setContent(calendarPatchDto.getContent());
        calendarContent.setLocation(calendarPatchDto.getLocation());

        return calendarContent;
    }

    default CalendarDto.Response calendarContentToCalendarResponseDto(CalendarContent calendarContent) {
        CalendarDto.Response calendarResponseDto = new CalendarDto.Response();

        calendarResponseDto.setCalendarContentId(calendarContent.getCalendarContentId());
        calendarResponseDto.setDate(calendarContent.getDate());
        calendarResponseDto.setImageAddress(calendarContent.getImageAddress());
        calendarResponseDto.setContent(calendarContent.getContent());
        calendarResponseDto.setLocation(calendarContent.getLocation());
        calendarResponseDto.setCalendarId(calendarContent.getCalendar().getCalendarId());

        return calendarResponseDto;
    }

    default List<CalendarDto.Response> calendarContentsToCalendarResponseDtos(List<CalendarContent> calendarContents) {
        return calendarContents.stream()
                .map(calendarContent -> calendarContentToCalendarResponseDto(calendarContent))
                .collect(Collectors.toList());
    }
}
