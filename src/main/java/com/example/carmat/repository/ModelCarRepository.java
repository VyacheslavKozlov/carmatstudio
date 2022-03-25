package com.example.carmat.repository;

import com.example.carmat.entity.ModelCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelCarRepository extends JpaRepository<ModelCar, Integer> {
    public List<ModelCar> findAllByBrandId(long brandId);

}
