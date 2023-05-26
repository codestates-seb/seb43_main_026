package com.codestates.schedule.controller;

import com.codestates.schedule.dto.ScheduleDto;
import com.codestates.schedule.entity.Schedule;
import com.codestates.schedule.mapper.ScheduleMapper;
import com.codestates.schedule.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schedules")
@Validated
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final ScheduleMapper scheduleMapper;
    private final static String SCHEDULE_DEFAULT_URL = "/schedules";

    public ScheduleController(ScheduleService scheduleService, ScheduleMapper scheduleMapper) {
        this.scheduleService = scheduleService;
        this.scheduleMapper = scheduleMapper;
    }

    @PostMapping
    public ResponseEntity postSchedule(@Valid @RequestPart("schedule") ScheduleDto.Post schedulePostDto,
                                       @RequestPart("image")MultipartFile image) throws IOException {

        Schedule schedule = scheduleService.createSchedule(scheduleMapper.schedulePostDtoToSchedule(schedulePostDto), image);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(SCHEDULE_DEFAULT_URL + "/{schedule-id}")
                .buildAndExpand(schedule.getScheduleId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{schedule-id}")
    public ResponseEntity patchSchedule(@Valid @RequestPart("schedule") ScheduleDto.Patch schedulePatchDto,
                                        @RequestPart(value = "image", required = false) MultipartFile image,
                                        @PathVariable("schedule-id") @Positive long scheduleId) throws IOException {
        schedulePatchDto.setScheduleId(scheduleId);

        Schedule schedule = scheduleService.updateSchedule(scheduleMapper.schedulePatchDtoToSchedule(schedulePatchDto), image);

        ScheduleDto.Response response = scheduleMapper.scheduleToScheduleResponseDto(schedule);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{schedule-id}")
    public ResponseEntity getSchedule(@PathVariable("schedule-id") @Positive long scheduleId) {
        Schedule schedule = scheduleService.findSchedule(scheduleId);

        ScheduleDto.Response response = scheduleMapper.scheduleToScheduleResponseDto(schedule);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getOneUserSchedules(@Positive @RequestParam int year,
                                              @Positive @Max(12) @RequestParam int month) {

        List<Schedule> schedules = scheduleService.findOneUserSchedules(year, month);

        List<ScheduleDto.Response> responses = scheduleMapper.schedulesToScheduleResponseDtos(schedules);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // 관리자만 호출이 가능한 핸들러 메서드
    // 수영왕 페이지 작성을 위한 요청 핸들러 메서드
    @GetMapping("/admin")
    public ResponseEntity getAllUsersSchedules(@Positive @RequestParam int year,
                                               @Positive @Max(12) @RequestParam int month) {
        List<List<Schedule>> allUsersSchedules = scheduleService.findAllUsersSchedules(year, month);
        List<List<ScheduleDto.Response>> responses = allUsersSchedules.stream()
                .map(schedules -> scheduleMapper.schedulesToScheduleResponseDtos(schedules))
                .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{schedule-id}")
    public ResponseEntity deleteSchedule(@PathVariable("schedule-id") @Positive long scheduleId) {

        scheduleService.deleteSchedule(scheduleId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
