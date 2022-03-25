package com.example.carmat.controller;

import com.example.carmat.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class CategoryController {
    private final CategoryService categoryService;
}
