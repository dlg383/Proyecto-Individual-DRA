package com.proyecto.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.backend.dto.Iphone15DTO;
import com.proyecto.backend.service.ScrapingService;

@RestController
@RequestMapping("/iphone15")
public class Iphone15Controller {

    @Autowired
    private ScrapingService scrapingService;

    @GetMapping("/data")
    public List<Iphone15DTO> getIPhone15Data() {
        return scrapingService.retrieveIPhone15Data();
    }
}
