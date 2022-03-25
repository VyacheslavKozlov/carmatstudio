package com.example.carmat.controller;

import com.example.carmat.entity.Brand;
import com.example.carmat.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/brand")
public class BrandController {
    private final BrandService brandService;

    @GetMapping
    public List<Brand> getAllBrands(){
        return brandService.getAllBrands();
    }
}
