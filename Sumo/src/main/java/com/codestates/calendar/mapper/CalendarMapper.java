package com.codestates.calendar.mapper;

import com.codestates.calendar.dto.CalendarDto;
import com.codestates.calendar.entity.CalendarContent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CalendarMapper {
//    default CalendarContent calendarPostDtoToCalendarContent(CalendarDto.Post calendarPostDto) {
//        CalendarContent calendarContent = new CalendarContent();
//
//        calendarContent.setDate(calendarPostDto.getDate());
//        calendarContent.setImageAddress(calendarPostDto.getImageAddress());
//        calendarContent.setContent(calendarPostDto.getContent());
//        calendarContent.setLocation(calendarPostDto.getLocation());
//
//        // 여기부터하기!! calender 만들고 content에 set하기
//    }
}
