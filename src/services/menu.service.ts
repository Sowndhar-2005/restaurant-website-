import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category, MenuItem } from '../models/menu.model';

// Interface for the raw menu item from the API
interface ApiMenuItem {
  id: string;
  name: string;
  dsc: string;
  price: number;
  img: string;
  rate: number;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private baseUrl = 'https://free-food-menus-api-two.vercel.app';

  // List of category endpoints to fetch
  private categories = [
    'bbqs', 'best-foods', 'breads', 'burgers', 'chocolates', 'desserts', 
    'drinks', 'fried-chicken', 'ice-cream', 'pizzas', 'porks', 
    'sandwiches', 'sausages', 'steaks'
  ];

  getMenuData(): Observable<Category[]> {
    const categoryRequests = this.categories.map(categoryName => 
      this.http.get<ApiMenuItem[]>(`${this.baseUrl}/${categoryName}`).pipe(
        map(items => ({
          name: this.formatCategoryName(categoryName),
          items: items ? items.map(this.mapApiMenuItemToMenuItem) : []
        }))
      )
    );

    return forkJoin(categoryRequests).pipe(
      retry(1), // Automatically retry the entire set of requests once on failure
      map(categories => categories.filter(c => c.items.length > 0)),
      catchError(this.handleError) // Centralized error handling
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred while fetching menu data:', error);
    // Return an observable that emits a user-facing error message.
    return throwError(() => new Error('Could not load the menu. The restaurant might be busy. Please try again in a moment.'));
  }

  private mapApiMenuItemToMenuItem(apiItem: ApiMenuItem): MenuItem {
    return {
      id: apiItem.id,
      name: apiItem.name,
      description: apiItem.dsc,
      price: apiItem.price,
      imageUrl: apiItem.img,
    };
  }
  
  private formatCategoryName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}