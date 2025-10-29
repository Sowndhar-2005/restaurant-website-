import { Category } from '../models/menu.model';

export const MENU_DATA: Category[] = [
  {
    name: 'Appetizers',
    items: [
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '1', name: 'Quantum Quesadillas', description: 'Folded tortillas filled with a cheesy paradox of flavors.', price: 8.99, imageUrl: 'https://picsum.photos/400/300?random=1' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '2', name: 'Bruschetta Binary', description: 'Toasted bread with a duo of tomato-basil and olive tapenade.', price: 7.50, imageUrl: 'https://picsum.photos/400/300?random=2' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '3', name: 'API-tizers Platter', description: 'A shareable platter of mozzarella sticks, wings, and onion rings.', price: 12.99, imageUrl: 'https://picsum.photos/400/300?random=3' }
    ]
  },
  {
    name: 'Main Courses',
    items: [
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '4', name: 'The Java Burger', description: 'A robust and richly flavored beef patty, compiled to perfection.', price: 14.50, imageUrl: 'https://picsum.photos/400/300?random=4' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '5', name: 'Polymorphic Pasta', description: 'Pasta that adapts to your taste with a choice of three sauces.', price: 13.99, imageUrl: 'https://picsum.photos/400/300?random=5' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '6', name: 'Firewall Fajitas', description: 'Sizzling hot chicken or beef with secure layers of flavor.', price: 16.75, imageUrl: 'https://picsum.photos/400/300?random=6' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '7', name: 'Singleton Salmon', description: 'A unique, perfectly grilled salmon fillet with lemon-dill sauce.', price: 18.99, imageUrl: 'https://picsum.photos/400/300?random=7' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '8', name: 'Kernel Kake', description: 'A rich chocolate lava cake, the core of our dessert menu.', price: 7.99, imageUrl: 'https://picsum.photos/400/300?random=8' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '9', name: 'Boolean Brownie', description: 'A simple true/false choice: with or without ice cream. Always true.', price: 6.50, imageUrl: 'https://picsum.photos/400/300?random=9' }
    ]
  },
  {
    name: 'Drinks',
    items: [
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '10', name: 'Syntax Soda', description: 'A refreshing soda with a crisp, clean finish.', price: 2.99, imageUrl: 'https://picsum.photos/400/300?random=10' },
      // FIX: Changed id from number to string to match MenuItem interface.
      { id: '11', name: 'Compiler Coffee', description: 'Strong, hot coffee that gets you running.', price: 3.50, imageUrl: 'https://picsum.photos/400/300?random=11' }
    ]
  }
];
