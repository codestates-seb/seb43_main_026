package com.codestates.Sumo.slice.basic;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest
@AutoConfigureMockMvc
public class ControllerTestDefaultStructure {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void postMemberTest() {
        // (5) 테스트용 request body 생성

        // (6) MockMvc 객체로 테스트 대상 Controller 호출

        // (7) Controller 핸들러 메서드에서 응답으로 수신한 HTTP Status 및 response body 검증
    }
}
