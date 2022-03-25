package com.example.carmat.controller;

import com.example.carmat.entity.Modification;
import com.example.carmat.service.ModificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/modification")
public class ModificationController {

    private final ModificationService modificationService;

    @GetMapping("/{modelcarid}")
    public List<Modification> getAllModificationByModelCarId(@PathVariable("modelcarid") long modelCarId){
        return modificationService.getAllModificationByModelCarId(modelCarId);
    }

}
