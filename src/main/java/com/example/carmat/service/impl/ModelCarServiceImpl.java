package com.example.carmat.service.impl;

import com.example.carmat.entity.ModelCar;
import com.example.carmat.repository.ModelCarRepository;
import com.example.carmat.service.ModelCarService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ModelCarServiceImpl implements ModelCarService {

    private final ModelCarRepository modelCarRepository;

    @Override
    public List<ModelCar> getModelCarByBrandId(long brandId) {
        return modelCarRepository.findAllByBrandId(brandId);
    }
}
