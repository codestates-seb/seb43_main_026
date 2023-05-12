package com.codestates.schedule.mapper;

import com.codestates.schedule.dto.ScheduleDto;
import com.codestates.schedule.entity.Schedule;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    default Schedule schedulePostDtoToSchedule(ScheduleDto.Post schedulePostDto) {
        Schedule schedule = new Schedule();

        schedule.setDate(schedulePostDto.getDate());
        schedule.setImageAddress(schedulePostDto.getImageAddress());
        schedule.setMemo(schedulePostDto.getMemo());
        schedule.setLocation(schedulePostDto.getLocation());
        schedule.setStartTime(schedulePostDto.getStartTime());
        schedule.setEndTime(schedulePostDto.getEndTime());

        return schedule;
    }

    default Schedule schedulePatchDtoToSchedule(ScheduleDto.Patch schedulePatchDto) {
        Schedule schedule = new Schedule();

        schedule.setScheduleId(schedulePatchDto.getScheduleId());
        schedule.setImageAddress(schedulePatchDto.getImageAddress());
        schedule.setMemo(schedulePatchDto.getMemo());
        schedule.setLocation(schedulePatchDto.getLocation());
        schedule.setStartTime(schedulePatchDto.getStartTime());
        schedule.setEndTime(schedulePatchDto.getEndTime());

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
        scheduleResponseDto.setMemberId(schedule.getMember().getMemberId());

        return scheduleResponseDto;
    }

    default List<ScheduleDto.Response> schedulesToScheduleResponseDtos(List<Schedule> schedules) {
        return schedules.stream()
                .map(schedule -> scheduleToScheduleResponseDto(schedule))
                .collect(Collectors.toList());
    }
}
