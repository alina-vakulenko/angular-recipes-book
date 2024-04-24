import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  activeTab = 'recipes';

  onNavigate(tabName: string) {
    this.activeTab === tabName;
  }
}
