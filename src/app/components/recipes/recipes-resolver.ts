import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

//The router waits for the data to be resolved before the route is finally activated.
export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const existingRecipes = inject(RecipesService).getRecipes();
  if (existingRecipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  }
  return existingRecipes;
};
