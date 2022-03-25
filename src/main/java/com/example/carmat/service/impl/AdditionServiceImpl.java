package com.example.carmat.service.impl;

import com.example.carmat.entity.Addition;
import com.example.carmat.repository.AdditionRepository;
import com.example.carmat.service.AdditionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class AdditionServiceImpl implements AdditionService {
    private final AdditionRepository additionRepository;

    @Override
    public List<Addition> getAllAddition() {
        return additionRepository.findAll();
    }
}
