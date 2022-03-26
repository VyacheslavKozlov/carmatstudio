package com.example.carmat.controller;

import com.example.carmat.entity.RugPicture;
import com.example.carmat.service.RugPictureService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/picture")
public class RugPictureController {

    private final RugPictureService rugPictureService;

    @GetMapping()
    public RugPicture getPictureById(){
        return rugPictureService.getPictureById(1);
    }

}
