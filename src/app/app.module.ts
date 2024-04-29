import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { RecipesService } from './components/recipes/recipes.service';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { RecipesModule } from './components/recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
  ],
  providers: [
    ShoppingListService,
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
