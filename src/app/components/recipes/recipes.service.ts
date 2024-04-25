import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Homemade thin dough pizza',
      'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*',
      [
        new Ingredient('tomatoes', 10),
        new Ingredient('Spinach', 1),
        new Ingredient('Cheese', 2),
      ]
    ),
    new Recipe(
      'Lemonade',
      'Homemade lemonade with mint',
      'https://www.simplyrecipes.com/thmb/4LFrc9hSMoKErr2WI7tThcnvWwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Lemonade-LEAD-08-B-441ceb568f854bb485dbed79e082bb4a.jpg',
      [
        new Ingredient('mint', 1),
        new Ingredient('lemon', 5),
        new Ingredient('sugar', 1),
      ]
    ),
    new Recipe(
      'Pasta',
      'Homemade tomato pasta',
      'https://www.seriouseats.com/thmb/BaFY3ICtVL0mCrM8cdX82UzuVwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230822-SEA-pasta-al-tonno-hero-03-Diana-Chistruga-ed0b2f08cb0747ebb9646ca8c6bb24ae.jpg',
      [
        new Ingredient('Tomato souce', 1),
        new Ingredient('Pasta', 1),
        new Ingredient('Olive oil', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(idx: number) {
    return this.recipes[idx];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientList(ingredients);
  }
}
