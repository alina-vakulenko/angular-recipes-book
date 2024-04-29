import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuth = false;

  constructor(
    private storageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuth = !!user)
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.storageService.storeRecipes();
  }

  onFetchData() {
    this.storageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
