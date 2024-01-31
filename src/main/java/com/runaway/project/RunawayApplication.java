package com.runaway.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.runaway.project.dto")
public class RunawayApplication {

	public static void main(String[] args) {
		SpringApplication.run(RunawayApplication.class, args);
	}
}
