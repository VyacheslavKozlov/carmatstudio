package com.example.carmat.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
@JsonIdentityInfo( scope = Order.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "price")
    private int price;

    @ManyToOne
    @JoinColumn(name = "modification_id")
    private Modification modification;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    @ManyToMany
    private List<Addition> additions;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;


}
