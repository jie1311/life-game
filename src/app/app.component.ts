import {Component} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  game: Game;
  playTag: any;

  constructor() {
    this.initGame();
  }

  initGame() {
    this.game = new Game(80, 80);
    this.stop();
  }

  initMaze() {
    this.game = null;
    this.stop();
  }

  reset(): void {
    this.game.reset();
    this.stop();
  }

  play(): void {
    this.playTag = setInterval(() => {
      this.game.next();
    }, 0);
  }

  next(): void {
    this.game.next();
    this.stop();
  }

  stop(): void {
    clearInterval(this.playTag);
  }
}
