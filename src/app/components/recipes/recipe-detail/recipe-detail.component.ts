import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
