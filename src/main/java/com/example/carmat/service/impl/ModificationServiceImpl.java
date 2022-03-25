package com.example.carmat.service.impl;

import com.example.carmat.entity.Modification;
import com.example.carmat.repository.ModificationRepository;
import com.example.carmat.service.ModificationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ModificationServiceImpl implements ModificationService {
    private final ModificationRepository modificationRepository;

    @Override
    public List<Modification> getAllModificationByModelCarId(long modelCarId) {
        return modificationRepository.findAllByModelCarId(modelCarId);
    }
}
