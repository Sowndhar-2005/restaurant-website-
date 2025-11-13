import { Component, ChangeDetectionStrategy, signal, computed, WritableSignal, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, MenuItem, CartItem, PastOrder } from './models/menu.model';
import { MenuService } from './services/menu.service';

interface Notification {
  id: number;
  message: string;
  icon: 'cart' | 'check';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  menu: WritableSignal<Category[]> = signal([]);
  cart: WritableSignal<CartItem[]> = signal([]);
  orderHistory: WritableSignal<PastOrder[]> = signal([]);
  selectedCategory: WritableSignal<string> = signal('');
  searchTerm = signal('');
  isLoading = signal(true);
  error = signal<string | null>(null);
  isMobileCartVisible = signal(false);
  isSidebarVisible = signal(false);
  isCategoryDropdownOpen = signal(false);
  notifications: WritableSignal<Notification[]> = signal([]);

  private nextNotificationId = 0;
  private readonly storageKey = 'restaurantOrderHistory';
  private menuService = inject(MenuService);

  constructor() {
    this.loadOrderHistory();
    this.loadMenu();
  }

  filteredMenu: Signal<MenuItem[]> = computed(() => {
    if (this.isLoading()) return [];

    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      const allItems = this.menu().flatMap(category => category.items);
      return allItems.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }
    
    const category = this.menu().find(c => c.name === this.selectedCategory());
    return category ? category.items : [];
  });

  cartCount: Signal<number> = computed(() => {
    return this.cart().reduce((total, item) => total + item.quantity, 0);
  });
  
  cartTotal: Signal<number> = computed(() => {
    return this.cart().reduce((total, item) => total + item.price * item.quantity, 0);
  });

  private loadMenu(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.menuService.getMenuData().subscribe({
      next: (menuData) => {
        const validMenuData = menuData.filter(category => category && category.items.length > 0);
        this.menu.set(validMenuData);
        if (validMenuData.length > 0) {
          this.selectedCategory.set(validMenuData[0].name);
        }
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        console.error('Failed to load menu', err);
        this.error.set(err.message || 'An unknown error occurred while loading the menu.');
        this.isLoading.set(false);
      }
    });
  }

  private loadOrderHistory(): void {
    if (typeof localStorage !== 'undefined') {
      const savedHistory = localStorage.getItem(this.storageKey);
      if (savedHistory) {
        this.orderHistory.set(JSON.parse(savedHistory));
      }
    }
  }

  private saveOrderHistory(): void {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(this.orderHistory()));
    }
  }

  addNotification(message: string, icon: 'cart' | 'check'): void {
    const id = this.nextNotificationId++;
    const newNotification: Notification = { id, message, icon };
    this.notifications.update(current => [...current, newNotification]);

    setTimeout(() => {
      this.notifications.update(current => current.filter(n => n.id !== id));
    }, 3000);
  }

  retryLoadMenu(): void {
    this.loadMenu();
  }

  toggleSidebar(): void {
    this.isSidebarVisible.update(v => !v);
  }

  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen.update(v => !v);
  }

  selectCategory(categoryName: string): void {
    this.selectedCategory.set(categoryName);
    this.isCategoryDropdownOpen.set(false);
  }

  addToCart(itemToAdd: MenuItem): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...itemToAdd, quantity: 1 }];
    });
    this.addNotification(`'${itemToAdd.name}' added to cart`, 'cart');
  }

  updateQuantity(itemId: string, change: number): void {
    this.cart.update(currentCart => {
      const item = currentCart.find(i => i.id === itemId);
      if (!item) return currentCart;

      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return currentCart.filter(i => i.id !== itemId);
      }
      return currentCart.map(i => i.id === itemId ? { ...i, quantity: newQuantity } : i);
    });
  }
  
  placeOrder(): void {
    const currentCart = this.cart();
    if (currentCart.length === 0) return;

    const newOrder: PastOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: currentCart,
      total: this.cartTotal() * 1.1 // Total includes tax
    };

    this.orderHistory.update(history => [newOrder, ...history]);
    this.addNotification('Your order has been successfully placed!', 'check');
    this.saveOrderHistory();
    this.cart.set([]); // Clear the cart
    this.closeMobileCart();
    this.isSidebarVisible.set(false);
  }
  
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  openMobileCart(): void {
    this.isMobileCartVisible.set(true);
  }

  closeMobileCart(): void {
    this.isMobileCartVisible.set(false);
  }
}