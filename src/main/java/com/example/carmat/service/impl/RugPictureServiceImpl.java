package com.example.carmat.service.impl;

import com.example.carmat.entity.RugPicture;
import com.example.carmat.repository.RugPictureRepository;
import com.example.carmat.service.RugPictureService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RugPictureServiceImpl implements RugPictureService {

    private final RugPictureRepository rugPictureRepository;

    @Override
    public RugPicture getPictureById(long id) {
        return rugPictureRepository.findById(id).get();
    }
}
