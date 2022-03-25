package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "modification")
@JsonIdentityInfo( scope = Modification.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Modification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "modificationname")
    private String name;

    @Column(name = "trunk")
    private double trunk;

    @Column(name = "jumper")
    private boolean jumper;

    @Column(name = "row3")
    private boolean row3;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "modelcar_id")
    private ModelCar modelCar;
}
