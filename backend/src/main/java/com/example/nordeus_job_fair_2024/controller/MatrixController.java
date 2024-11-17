package com.example.nordeus_job_fair_2024.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@RequestMapping("")
@RestController
public class MatrixController {
    private final WebClient api = WebClient.create("https://jobfair.nordeus.com/jf24-fullstack-challenge/test");

    @GetMapping("/nordeus-data")
    public ResponseEntity<String> getNordeusData() {
        return new ResponseEntity<>(api.method(HttpMethod.GET).retrieve().bodyToMono(String.class).block(), HttpStatusCode.valueOf(200));
    }
}
