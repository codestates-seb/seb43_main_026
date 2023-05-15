package com.codestates;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SumoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SumoApplication.class, args);
	}

}
