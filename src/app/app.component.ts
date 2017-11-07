import {Component, Input} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Game';
  game: Game;

  constructor() {
    this.game = new Game(100, 100);
  }

  reset(): void {
    this.game.reset();
  }

  next100(): void {
    for (let i = 0; i < 100; i++) {
      this.game.next();
    }
  }

  next(): void {
    this.game.next();
  }
}
