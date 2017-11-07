import {Component} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Game';
  game: Game;
  playTag: any;

  constructor() {
    this.game = new Game(80, 80);
  }

  reset(): void {
    this.game.reset();
    clearInterval(this.playTag);
  }

  play(): void {
    this.playTag = setInterval(() => {
      this.game.next();
    }, 0);
  }

  next(): void {
    this.game.next();
  }

  stop(): void {
    clearInterval(this.playTag);
  }
}
