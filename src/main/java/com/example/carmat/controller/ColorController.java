package com.example.carmat.controller;

import com.example.carmat.entity.Color;
import com.example.carmat.service.ColorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/color")
public class ColorController {
    private final ColorService colorService;

    @GetMapping
    public List<Color> getAllColors(){
        return colorService.getAllColors();
    }

    @GetMapping("/{material_id}")
    public List<Color> getAllColorsByMaterialId(@PathVariable("material_id") long materialId){
        return colorService.getAllColorsByMaterialId(materialId);
    }



}
