import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeNotSelectedComponent } from './recipe-not-selected/recipe-not-selected.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { recipesResolver } from './recipes-resolver';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: RecipeNotSelectedComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipes: recipesResolver },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipes: recipesResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingmodule {}
