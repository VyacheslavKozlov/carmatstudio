package com.example.carmat.service.impl;

import com.example.carmat.entity.Material;
import com.example.carmat.repository.MaterialRepository;
import com.example.carmat.service.MaterialService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;

    @Override
    public List<Material> getAllMaterial() {
        return materialRepository.findAll();
    }
}
