package com.springbootiamp.chessgamesever;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
@MapperScan("com.chessgame.dal")
public class ChessgameseverApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChessgameseverApplication.class, args);
	}

}

