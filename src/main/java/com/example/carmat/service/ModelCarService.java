package com.example.carmat.service;

import com.example.carmat.entity.ModelCar;

import java.util.List;

public interface ModelCarService {

    public List<ModelCar> getModelCarByBrandId(long brandId);
}
