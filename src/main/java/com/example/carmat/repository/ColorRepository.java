package com.example.carmat.repository;

import com.example.carmat.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Integer> {
    public List<Color> findAllByMaterialId(long materialId);
}
