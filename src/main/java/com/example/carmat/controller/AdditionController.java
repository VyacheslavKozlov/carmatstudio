package com.example.carmat.controller;

import com.example.carmat.entity.Addition;
import com.example.carmat.service.AdditionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/addition")
public class AdditionController {
    private final AdditionService additionService;

    @GetMapping
    public List<Addition> getAllAddition(){
        return additionService.getAllAddition();
    }
}
