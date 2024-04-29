import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  recipesUpdateSubscription: Subscription;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesUpdateSubscription =
      this.recipeService.recipesChanged.subscribe(
        (recipes) => (this.recipes = recipes)
      );
  }

  ngOnDestroy(): void {
    this.recipesUpdateSubscription.unsubscribe();
  }
}
