package com.restaurant.ordering.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
}