package com.example.carmat.service.impl;

import com.example.carmat.entity.Color;
import com.example.carmat.repository.ColorRepository;
import com.example.carmat.service.ColorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;

    @Override
    public List<Color> getAllColors() {
        return colorRepository.findAll();
    }

    @Override
    public List<Color> getAllColorsByMaterialId(long materialId) {
        return colorRepository.findAllByMaterialId(materialId);
    }
}
