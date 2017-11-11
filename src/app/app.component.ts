import {Component} from '@angular/core';
import {LifeGame} from './lifegame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lifegame: LifeGame;

  constructor() {
    this.initLifegame();
  }

  initLifegame(): void {
    this.lifegame = new LifeGame(80, 80);
  }

  initMiner(): void {
    this.lifegame = null;
  }
}
