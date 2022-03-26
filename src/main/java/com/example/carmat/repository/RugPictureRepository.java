package com.example.carmat.repository;

import com.example.carmat.entity.RugPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RugPictureRepository extends JpaRepository<RugPicture, Integer> {

    public Optional<RugPicture> findById(long id);

}
