import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientAddedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredientsList();
    this.ingredientAddedSubscription =
      this.shoppingListService.ingredientAdded.subscribe(
        (updatedIngredientsList) => (this.ingredients = updatedIngredientsList)
      );
  }

  ngOnDestroy(): void {
    this.ingredientAddedSubscription.unsubscribe();
  }

  onEditItem(idx: number) {
    this.shoppingListService.startEditing.next(idx);
  }
}
