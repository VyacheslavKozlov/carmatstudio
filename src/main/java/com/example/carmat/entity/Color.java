package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "color")
@JsonIdentityInfo( scope = Color.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "color")
    private String color;

    @Column(name = "urlimage")
    private String url;

    @Column(name = "plot")
    private String plot;

    @Column(name = "available")
    private boolean available;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;
}
