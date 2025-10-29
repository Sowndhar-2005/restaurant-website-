import { Component, ChangeDetectionStrategy, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-recommendation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendation-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationModalComponent {
  menuItems = input.required<MenuItem[]>();
  closeModal = output<void>();

  private geminiService = inject(GeminiService);

  userPreference = signal('');
  recommendation = signal('');
  isLoading = signal(false);
  error = signal<string | null>(null);

  async getRecommendations() {
    if (this.isLoading() || !this.userPreference().trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.recommendation.set('');

    try {
      const result = await this.geminiService.getMenuRecommendations(this.userPreference(), this.menuItems());
      this.recommendation.set(result);
    } catch (e) {
      this.error.set('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
