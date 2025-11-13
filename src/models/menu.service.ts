import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Order, PastOrder } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api'; // Base URL for your Spring Boot backend

  getMenu(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/menu`);
  }

  getPastOrders(): Observable<PastOrder[]> {
    return this.http.get<PastOrder[]>(`${this.apiUrl}/orders`);
  }

  placeOrder(order: { items: any[], total: number }): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }
}