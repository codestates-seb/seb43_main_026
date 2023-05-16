package com.codestates.schedule.controller;

import com.codestates.schedule.dto.ScheduleDto;
import com.codestates.schedule.entity.Schedule;
import com.codestates.schedule.mapper.ScheduleMapper;
import com.codestates.schedule.service.ScheduleService;
import com.google.gson.Gson;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class ScheduleControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ScheduleService scheduleService;

    @MockBean
    private ScheduleMapper mapper;


    @Test
    void postScheduleTest() throws Exception {
        // given
        ScheduleDto.Post post = new ScheduleDto.Post("2023-05-15",
                "image",
                "15:00",
                "17:00");

        BDDMockito.given(mapper.schedulePostDtoToSchedule(Mockito.any(ScheduleDto.Post.class))).willReturn(new Schedule());

        Schedule mockResultSchedule = new Schedule();
        mockResultSchedule.setScheduleId(1L);
        BDDMockito.given(scheduleService.createSchedule(Mockito.any(Schedule.class)))
                .willReturn(mockResultSchedule);

        String content = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/schedules").build().toUri();
        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.post(uri)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
        // then
        actions
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.header().string("Location", Matchers.is(Matchers.startsWith("/schedules/"))));

    }

    @Test
    void patchSchedule() throws Exception {
        // given
        long scheduleId = 1L;
        ScheduleDto.Patch patch = new ScheduleDto.Patch("image", "memo");

        ScheduleDto.Response response = new ScheduleDto.Response(scheduleId, "2023-05-15", "image", "memo", "location", "13:00", "15:00", 1L);

        BDDMockito.given(mapper.schedulePatchDtoToSchedule(Mockito.any(ScheduleDto.Patch.class))).willReturn(new Schedule());

        BDDMockito.given(scheduleService.updateSchedule(Mockito.any(Schedule.class))).willReturn(new Schedule());

        BDDMockito.given(mapper.scheduleToScheduleResponseDto(Mockito.any(Schedule.class))).willReturn(response);

        String content = gson.toJson(patch);
        URI uri = UriComponentsBuilder.newInstance().path("/schedules/{schedule-id}").buildAndExpand(scheduleId).toUri();
        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.patch(uri)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
        // then
        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageAddress").value(patch.getImageAddress()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.memo").value(patch.getMemo()));
    }

    @Test
    void getSchedule() {
    }

    @Test
    void getOneUserSchedules() {
    }

    @Test
    void getAllUsersSchedules() {
    }

    @Test
    void deleteSchedule() {
    }
}