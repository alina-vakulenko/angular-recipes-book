import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('eggs', 1),
    new Ingredient('olive oil', 1),
    new Ingredient('flour', 2),
  ];

  getIngredientsList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsUpdate();
  }

  addIngredientList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientsUpdate();
  }

  private onIngredientsUpdate() {
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
