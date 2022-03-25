package com.example.carmat.service.impl;

import com.example.carmat.entity.Equipment;
import com.example.carmat.repository.EquipmentRepository;
import com.example.carmat.service.EquipmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class EquipmentServiceImpl implements EquipmentService {
    private final EquipmentRepository equipmentRepository;
    @Override
    public List<Equipment> getALlEquipment() {
        return equipmentRepository.findAll();
    }
}
