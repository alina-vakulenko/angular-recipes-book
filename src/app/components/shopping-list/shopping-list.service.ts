import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('eggs', 1),
    new Ingredient('olive oil', 1),
    new Ingredient('flour', 2),
  ];

  getIngredientsList() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsUpdate();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.onIngredientsUpdate();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientsUpdate();
  }

  addIngredientList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientsUpdate();
  }

  private onIngredientsUpdate() {
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
