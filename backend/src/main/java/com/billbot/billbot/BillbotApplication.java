package com.billbot.billbot;

import com.billbot.billbot.config.EnvConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BillbotApplication {

	public static void main(String[] args) {
		EnvConfig.load();
		SpringApplication.run(BillbotApplication.class, args);
	}

}
