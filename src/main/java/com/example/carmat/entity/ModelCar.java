package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "modelcar")
@JsonIdentityInfo( scope = ModelCar.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ModelCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "modelname")
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;


}
