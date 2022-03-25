package com.example.carmat.service.impl;

import com.example.carmat.entity.Brand;
import com.example.carmat.repository.BrandRepository;
import com.example.carmat.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }
}
