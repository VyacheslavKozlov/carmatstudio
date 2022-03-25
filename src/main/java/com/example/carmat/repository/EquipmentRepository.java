package com.example.carmat.repository;

import com.example.carmat.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {
    List<Equipment> findAllByCategoryIdAndMaterialId(long categoryId, long materialId);
}
