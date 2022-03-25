package com.example.carmat.controller;

import com.example.carmat.entity.Material;
import com.example.carmat.service.MaterialService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/material")
public class MaterialController {
    private final MaterialService materialService;

    @GetMapping
    public List<Material> getAllMaterial(){
        return materialService.getAllMaterial();
    }
}
