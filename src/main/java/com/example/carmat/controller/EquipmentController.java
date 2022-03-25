package com.example.carmat.controller;

import com.example.carmat.entity.Equipment;
import com.example.carmat.service.EquipmentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/equipment")
public class EquipmentController {
    private EquipmentService equipmentService;

    @GetMapping
    public List<Equipment> getAllEquipment(){
        return equipmentService.getALlEquipment();
    }


}
