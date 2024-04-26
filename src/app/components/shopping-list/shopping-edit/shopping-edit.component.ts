import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  // @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;
  form: FormGroup;
  editItemSusbscription: Subscription;
  editMode = false;
  editedItemIdx: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null),
    });

    this.editItemSusbscription =
      this.shoppingListService.startEditing.subscribe((idx) => {
        this.editMode = true;
        this.editedItemIdx = idx;
        this.editedItem = this.shoppingListService.getIngredient(idx);
        this.form.setValue({
          ...this.editedItem,
        });
      });
  }

  ngOnDestroy(): void {
    this.editItemSusbscription.unsubscribe();
  }

  onSubmit() {
    // const newIngredient = new Ingredient(
    //   this.nameInputRef.nativeElement.value,
    //   +this.amountInputRef.nativeElement.value
    // );
    const { name, amount } = this.form?.value;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIdx,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIdx);
    this.onClear();
  }
}
