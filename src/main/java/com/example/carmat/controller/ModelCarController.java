package com.example.carmat.controller;

import com.example.carmat.entity.ModelCar;
import com.example.carmat.service.ModelCarService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/modelcar")
public class ModelCarController {

    private final ModelCarService modelCarService;

    @GetMapping("/{brandid}")
    public List<ModelCar> getModelCarByBrandId(@PathVariable("brandid") long brandId){
        System.out.println(brandId + 5);
        return modelCarService.getModelCarByBrandId(brandId);
    }



}
