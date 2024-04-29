import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipesService } from '../components/recipes/recipes.service';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-8e037-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-8e037-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => ({
            ...recipe,
            ingredient: recipe.ingredients ? recipe.ingredients : [],
          }))
        ),
        tap((recipes) => this.recipeService.setRecipes(recipes))
      );
  }
}
