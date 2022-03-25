package com.example.carmat.service;

import com.example.carmat.entity.Modification;

import java.util.List;

public interface ModificationService {
    public List<Modification> getAllModificationByModelCarId(long modelCarId);
}
