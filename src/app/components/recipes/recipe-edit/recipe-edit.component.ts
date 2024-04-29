import { Ingredient } from './../../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from './../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const editedRecipe = this.recipeService.getRecipe(this.id);
      const { name, imagePath, description } = editedRecipe;
      recipeName = name;
      recipeImagePath = imagePath;
      recipeDescription = description;

      if (editedRecipe.ingredients?.length) {
        for (const ingredient of editedRecipe.ingredients) {
          recipeIngredients.push(this.createIngredientFormGroup(ingredient));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  private createIngredientFormGroup(ingredient?: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(
        ingredient ? ingredient.name : null,
        Validators.required
      ),
      amount: new FormControl(ingredient ? ingredient.amount : null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  get ingredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(this.createIngredientFormGroup());
  }

  onDeleteIngredient(index: number) {
    const ingredients = this.ingredientsFormArray;
    ingredients.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
