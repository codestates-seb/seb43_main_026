package com.codestates.calendar.controller;

import com.codestates.calendar.dto.CalendarDto;
import com.codestates.calendar.dto.MultiResponseDto;
import com.codestates.calendar.entity.CalendarContent;
import com.codestates.calendar.mapper.CalendarMapper;
import com.codestates.calendar.service.CalendarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/calendars")
@Validated
public class CalendarController {
    private final CalendarService calendarService;
    private final CalendarMapper calendarMapper;
    private final static String CALENDAR_DEFAULT_URL = "/calendars";

    public CalendarController(CalendarService calendarService, CalendarMapper calendarMapper) {
        this.calendarService = calendarService;
        this.calendarMapper = calendarMapper;
    }

    @PostMapping("/{calendar-id}/calendarcontents")
    public ResponseEntity postCalendarContent(@Valid @RequestBody CalendarDto.Post calendarPostDto,
                                              @PathVariable("calendar-id") @Positive long calendarId) {
        calendarPostDto.setCalendarId(calendarId);

        CalendarContent calendarContent = calendarService.createCalendarContent(calendarMapper.calendarPostDtoToCalendarContent(calendarPostDto));

        URI location = UriComponentsBuilder
                .newInstance()
                .path(CALENDAR_DEFAULT_URL + "/{calendar-id}/calendarcontents/{calendarContent-id}")
                .buildAndExpand(calendarId, calendarContent.getCalendarContentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{calendar-id}/calendarcontents/{calendarContent-id}")
    public ResponseEntity patchCalendarContent(@Valid @RequestBody CalendarDto.Patch calendarPatchDto,
                                               @PathVariable("calendar-id") @Positive long calendarId,
                                               @PathVariable("calendarContent-id") @Positive long calendarContentId) {
        calendarPatchDto.setCalendarContentId(calendarContentId);

        CalendarContent calendarContent = calendarService.updateCalendarContent(calendarMapper.calendarPatchDtoToCalendarContent(calendarPatchDto), calendarId);

        CalendarDto.Response response = calendarMapper.calendarContentToCalendarResponseDto(calendarContent);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{calendar-id}/calendarcontents/{calendarContent-id}")
    public ResponseEntity getCalendarContent(@PathVariable("calendar-id") @Positive long calendarId,
                                             @PathVariable("calendarContent-id") @Positive long calendarContentId) {
        CalendarContent calendarContent = calendarService.findCalendarContent(calendarContentId, calendarId);
        CalendarDto.Response response = calendarMapper.calendarContentToCalendarResponseDto(calendarContent);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 해당 캘린더에 포함된 모든 컨텐츠를 가져오는 핸들러 메서드
    @GetMapping("/{calendar-id}")
    public ResponseEntity getCalendar(@PathVariable("calendar-id") @Positive long calendarId,
                                      @Positive @RequestParam int year,
                                      @Positive @Max(12) @RequestParam int month) {
        List<CalendarContent> calendarContents = calendarService.findCalendarContents(calendarId, year, month);

        int attendanceRate = calendarService.calculateAttendanceRate(calendarContents, month);
        int totalMinutes = calendarService.calculateTotalTime(calendarContents);

        List<CalendarDto.Response> responses = calendarMapper.calendarContentsToCalendarResponseDtos(calendarContents);
        return new ResponseEntity<>(new MultiResponseDto<>(responses, attendanceRate, totalMinutes), HttpStatus.OK);
    }

    @DeleteMapping("/{calendar-id}/calendarcontents/{calendarContent-id}")
    public ResponseEntity deleteCalendarContent(@PathVariable("calendar-id") @Positive long calendarId,
                                                @PathVariable("calendarContent-id") @Positive long calendarContentId) {
        calendarService.deleteCalendarContent(calendarContentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
