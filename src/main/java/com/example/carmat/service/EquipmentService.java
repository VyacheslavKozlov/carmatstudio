package com.example.carmat.service;

import com.example.carmat.entity.Equipment;

import java.util.List;

public interface EquipmentService {
    public List<Equipment> getALlEquipment();

    public List<Equipment> getALlEquipmentByCategoryId(long categoryId, long materialId);
}
