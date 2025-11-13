package com.restaurant.ordering.service;

import com.restaurant.ordering.model.Order;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private static final String ORDERS_FILE = "orders.dat";
    private final List<Order> pastOrders = new ArrayList<>();
    private final AtomicLong orderIdCounter = new AtomicLong(0);

    public OrderService() {
        loadOrders();
        long maxId = pastOrders.stream().mapToLong(Order::getId).max().orElse(0L);
        orderIdCounter.set(maxId);
    }

    public List<Order> getPastOrders() {
        return Collections.unmodifiableList(pastOrders);
    }

    public Order placeOrder(Order order) {
        order.setId(orderIdCounter.incrementAndGet());
        order.setDate(ZonedDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        pastOrders.add(order);
        saveOrders();
        return order;
    }

    @SuppressWarnings("unchecked")
    private void loadOrders() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(ORDERS_FILE))) {
            List<Order> loadedOrders = (List<Order>) ois.readObject();
            pastOrders.addAll(loadedOrders);
        } catch (FileNotFoundException e) {
            // File doesn't exist yet, which is fine on first run.
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace(); // Or handle more gracefully
        }
    }

    private void saveOrders() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(ORDERS_FILE))) {
            oos.writeObject(new ArrayList<>(pastOrders));
        } catch (IOException e) {
            e.printStackTrace(); // Or handle more gracefully
        }
    }
}