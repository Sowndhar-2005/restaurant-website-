package com.restaurant.ordering.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CartItem extends MenuItem {
    private int quantity;

    public CartItem(String id, String name, String description, double price, String imageUrl, int quantity) {
        super(id, name, description, price, imageUrl);
        this.quantity = quantity;
    }

    public CartItem(MenuItem menuItem, int quantity) {
        super(menuItem.getId(), menuItem.getName(), menuItem.getDescription(), menuItem.getPrice(), menuItem.getImageUrl());
        this.quantity = quantity;
    }
}