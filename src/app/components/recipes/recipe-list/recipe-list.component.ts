import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Homemade thin dough pizza',
      'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'
    ),
    new Recipe(
      'Lemonade',
      'Homemade lemonade with mint',
      'https://www.simplyrecipes.com/thmb/4LFrc9hSMoKErr2WI7tThcnvWwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Lemonade-LEAD-08-B-441ceb568f854bb485dbed79e082bb4a.jpg'
    ),
    new Recipe(
      'Pasta',
      'Homemade tomato pasta',
      'https://www.seriouseats.com/thmb/BaFY3ICtVL0mCrM8cdX82UzuVwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230822-SEA-pasta-al-tonno-hero-03-Diana-Chistruga-ed0b2f08cb0747ebb9646ca8c6bb24ae.jpg'
    ),
  ];

  onSelect(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
