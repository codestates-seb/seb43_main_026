package com.codestates.schedule.controller;

import com.codestates.schedule.dto.ScheduleDto;
import com.codestates.schedule.entity.Schedule;
import com.codestates.schedule.mapper.ScheduleMapper;
import com.codestates.schedule.service.ScheduleService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.hamcrest.MatcherAssert;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

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

    /**
     * given에 들어가는 요소들: 응답 데이터, given메서드, uri 및 쿼리파라미터,
     * request body에 해당하는 dto(POST, PATCH만 해당)
     *
     * when에 들어가는 요소들: mockMvc.perform 메서드(http 메서드, params, accept, contentType, content)
     *
     * then에 들어가는 요소들: status, header, jsonPath, JsonPath.parse(배열 사이즈 비교할 때)
     */

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
    void patchScheduleTest() throws Exception {
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
    void getScheduleTest() throws Exception {
        // given
        long scheduleId = 1L;
        Schedule schedule = new Schedule("2023-05-15", "image", "memo");

        ScheduleDto.Response response = new ScheduleDto.Response(scheduleId, "2023-05-15", "image", "memo", "location", "13:00", "15:00", 1L);

        BDDMockito.given(scheduleService.findSchedule(Mockito.anyLong()))
                .willReturn(new Schedule());

        BDDMockito.given(mapper.scheduleToScheduleResponseDto(Mockito.any(Schedule.class)))
                .willReturn(response);

        URI uri = UriComponentsBuilder.newInstance().path("/schedules/{schedule-id}").buildAndExpand(scheduleId).toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get(uri)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.date").value(schedule.getDate()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageAddress").value(schedule.getImageAddress()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.memo").value(schedule.getMemo()));
    }

    @Test
    void getOneUserSchedulesTest() throws Exception {
        // given
        List<ScheduleDto.Response> responses = List.of(
                new ScheduleDto.Response(1L, "2023-05-15", "image1", "memo1", "location", "13:00", "15:00", 1L),
                new ScheduleDto.Response(2L, "2023-05-16", "image2", "memo2", "location", "13:00", "15:00", 1L));

        BDDMockito.given(scheduleService.findOneUserSchedules(Mockito.anyInt(), Mockito.anyInt())).willReturn(new ArrayList<>());

        BDDMockito.given(mapper.schedulesToScheduleResponseDtos(Mockito.anyList())).willReturn(responses);

        String year = "2023";
        String month = "5";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("year", year);
        queryParams.add("month", month);

        URI uri = UriComponentsBuilder.newInstance().path("/schedules").build().toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get(uri)
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        MvcResult result = actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$");

        MatcherAssert.assertThat(list.size(), Matchers.is(2));
    }

    @Test
    void getAllUsersSchedulesTest() throws Exception {
        // given
        List<ScheduleDto.Response> responses = List.of(
                new ScheduleDto.Response(1L, "2023-05-15", "image1", "memo1", "location", "13:00", "15:00", 1L),
                new ScheduleDto.Response(2L, "2023-05-16", "image2", "memo2", "location", "13:00", "15:00", 1L));

        BDDMockito.given(scheduleService.findAllUsersSchedules(Mockito.anyInt(), Mockito.anyInt())).willReturn(List.of(List.of(), List.of()));

        BDDMockito.given(mapper.schedulesToScheduleResponseDtos(Mockito.anyList())).willReturn(responses);

        String year = "2023";
        String month = "5";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("year", year);
        queryParams.add("month", month);

        URI uri = UriComponentsBuilder.newInstance().path("/schedules/admin").build().toUri();

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get(uri)
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        MvcResult result = actions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").isArray())
                .andReturn();

        List list1 = JsonPath.parse(result.getResponse().getContentAsString()).read("$[0]");
        List list2 = JsonPath.parse(result.getResponse().getContentAsString()).read("$[1]");

        MatcherAssert.assertThat(list1.size(), Matchers.is(2));
        MatcherAssert.assertThat(list2.size(), Matchers.is(2));
    }

    @Test
    void deleteScheduleTest() throws Exception {
        // given
        long scheduleId = 1L;

        BDDMockito.doNothing().when(scheduleService).deleteSchedule(scheduleId);
        URI uri = UriComponentsBuilder.newInstance().path("/schedules/{schedule-id}").buildAndExpand(scheduleId).toUri();

        // when
        ResultActions actions = mockMvc.perform(MockMvcRequestBuilders.delete(uri));

        // then
        actions.andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}