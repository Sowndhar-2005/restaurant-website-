import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getMenuRecommendations(preference: string, menu: MenuItem[]): Promise<string> {
    const model = 'gemini-2.5-flash';
    
    const menuForPrompt = menu.map(item => ({
        name: item.name,
        description: item.description,
        price: item.price
    }));

    const prompt = `You are a helpful and friendly restaurant assistant for "Java Roast & Grill".
A customer has the following preference: "${preference}".

Based on this preference, please recommend up to 3 items from our menu. For each recommendation, provide a brief, enticing explanation for why it's a good fit for the customer.
Format your response clearly.

Here is our menu:
${JSON.stringify(menuForPrompt, null, 2)}
`;

    try {
      const response = await this.genAI.models.generateContent({
        model: model,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error('Error fetching recommendations from Gemini API:', error);
      return 'Sorry, I encountered an error while trying to get recommendations. Please check the console for more details or try again later.';
    }
  }
}
