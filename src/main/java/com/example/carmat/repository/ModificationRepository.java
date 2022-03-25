package com.example.carmat.repository;

import com.example.carmat.entity.Modification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModificationRepository extends JpaRepository<Modification, Integer> {
    public List<Modification> findAllByModelCarId(long modelCarId);
}
