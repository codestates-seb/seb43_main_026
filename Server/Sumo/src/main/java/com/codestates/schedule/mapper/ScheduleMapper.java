package com.codestates.schedule.mapper;

import com.codestates.schedule.dto.ScheduleDto;
import com.codestates.schedule.entity.Schedule;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    default Schedule schedulePostDtoToSchedule(ScheduleDto.Post schedulePostDto) {
        Schedule schedule = new Schedule();

        schedule.setDate(stringToLocalDate(schedulePostDto.getDate()));
        schedule.setMemo(schedulePostDto.getMemo());
        schedule.setLocation(schedulePostDto.getLocation());
        schedule.setStartTime(stringToLocalTime(schedulePostDto.getStartTime()));
        schedule.setEndTime(stringToLocalTime(schedulePostDto.getEndTime()));

        return schedule;
    }

    default Schedule schedulePatchDtoToSchedule(ScheduleDto.Patch schedulePatchDto) {
        Schedule schedule = new Schedule();

        schedule.setScheduleId(schedulePatchDto.getScheduleId());
        schedule.setMemo(schedulePatchDto.getMemo());
        schedule.setLocation(schedulePatchDto.getLocation());
        schedule.setStartTime(stringToLocalTime(schedulePatchDto.getStartTime()));
        schedule.setEndTime(stringToLocalTime(schedulePatchDto.getEndTime()));

        return schedule;
    }

    default ScheduleDto.Response scheduleToScheduleResponseDto(Schedule schedule) {
        ScheduleDto.Response scheduleResponseDto = new ScheduleDto.Response();

        scheduleResponseDto.setScheduleId(schedule.getScheduleId());
        scheduleResponseDto.setDate(schedule.getDate());
        scheduleResponseDto.setImageAddress(schedule.getImageAddress());
        scheduleResponseDto.setMemo(schedule.getMemo());
        scheduleResponseDto.setLocation(schedule.getLocation());
        scheduleResponseDto.setStartTime(schedule.getStartTime());
        scheduleResponseDto.setEndTime(schedule.getEndTime());
        scheduleResponseDto.setDurationTime(schedule.getDurationTime());
        scheduleResponseDto.setMemberId(schedule.getMember().getMemberId());

        return scheduleResponseDto;
    }

    default List<ScheduleDto.Response> schedulesToScheduleResponseDtos(List<Schedule> schedules) {
        return schedules.stream()
                .map(schedule -> scheduleToScheduleResponseDto(schedule))
                .collect(Collectors.toList());
    }

    default LocalDate stringToLocalDate(String date) {
        // dto에서 pattern 애너테이션으로 이미 검증하고 있음
//        try {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            LocalDate localDate = LocalDate.parse(date, formatter);
//            return localDate;
//        } catch (DateTimeParseException e) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_DATETIME);
//        }

        // 2월 29, 30, 31일에 대한 예외처리는 안되고 있음
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return localDate;
    }

    default LocalTime stringToLocalTime(String time) {
//        try {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
//            LocalTime localTime = LocalTime.parse(time, formatter);
//            return localTime;
//        } catch (DateTimeParseException e) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_DATETIME);
//        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime localTime = LocalTime.parse(time, formatter);
        return localTime;
    }
}
