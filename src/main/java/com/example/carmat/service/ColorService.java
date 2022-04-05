package com.example.carmat.service;

import com.example.carmat.entity.Color;

import java.util.List;

public interface ColorService {
    public List<Color> getAllColors();

    public List<Color> getAllColorsByMaterialId(long materialId);
}
