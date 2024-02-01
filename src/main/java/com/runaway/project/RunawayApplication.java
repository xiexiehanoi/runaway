package com.runaway.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.runaway.project.repository.login.properties.GoogleProperties;
import com.runaway.project.repository.login.properties.NaverProperties;

@SpringBootApplication
@EntityScan(basePackages = "com.runaway.project.*")
@EnableConfigurationProperties({GoogleProperties.class, NaverProperties.class})
public class RunawayApplication {

	public static void main(String[] args) {
		SpringApplication.run(RunawayApplication.class, args);
	}
}
