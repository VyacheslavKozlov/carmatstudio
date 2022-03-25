package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "addition")
@JsonIdentityInfo( scope = Addition.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Addition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "additionname")
    private String name;

    @Column(name = "price")
    private int price;
}
