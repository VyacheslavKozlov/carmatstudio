package com.example.carmat.service.impl;

import com.example.carmat.repository.CategoryRepository;
import com.example.carmat.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
}
