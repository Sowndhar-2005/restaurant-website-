package com.restaurant.ordering.service;

import com.restaurant.ordering.model.Category;
import com.restaurant.ordering.model.MenuItem;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MenuService {

    private static final List<Category> menu = Arrays.asList(
            new Category("Starters", Arrays.asList(
                    new MenuItem("1", "Garlic Bread", "Toasted bread with garlic butter.", 5.99, "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop"),
                    new MenuItem("2", "Bruschetta", "Grilled bread with tomatoes, garlic, basil.", 6.99, "https://images.unsplash.com/photo-1505253716362-af78f6d37fde?q=80&w=2070&auto=format&fit=crop")
            )),
            new Category("Main Courses", Arrays.asList(
                    new MenuItem("3", "Margherita Pizza", "Classic pizza with tomato, mozzarella, and basil.", 12.99, "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop"),
                    new MenuItem("4", "Spaghetti Carbonara", "Pasta with eggs, cheese, pancetta.", 14.99, "https://images.unsplash.com/photo-1608796313193-c5a092a3155a?q=80&w=1974&auto=format&fit=crop")
            )),
            new Category("Desserts", Arrays.asList(
                    new MenuItem("5", "Tiramisu", "Coffee-flavoured Italian dessert.", 7.99, "https://images.unsplash.com/photo-1571877275927-563d38693055?q=80&w=1974&auto=format&fit=crop"),
                    new MenuItem("6", "Panna Cotta", "Sweetened cream thickened with gelatin.", 6.99, "https://images.unsplash.com/photo-1567197937699-357a4a19715e?q=80&w=1974&auto=format&fit=crop")
            )),
            new Category("Drinks", Arrays.asList(
                    new MenuItem("7", "Coca-Cola", "Classic coke.", 2.99, "https://images.unsplash.com/photo-1622483767028-3f66f32a2ea7?q=80&w=2070&auto=format&fit=crop"),
                    new MenuItem("8", "Orange Juice", "Freshly squeezed orange juice.", 3.99, "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1974&auto=format&fit=crop")
            ))
    );

    public List<Category> getFullMenu() {
        return menu;
    }
}