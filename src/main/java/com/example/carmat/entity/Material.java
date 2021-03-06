package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "material")
@JsonIdentityInfo( scope = Material.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "materialname")
    private String name;

}
