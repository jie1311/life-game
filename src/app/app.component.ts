import {Component} from '@angular/core';
import {LifeGame} from './lifegame';
import {Miner} from './miner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lifegame: LifeGame;
  miner: Miner;

  constructor() {
    this.initMiner();
  }

  initLifegame(): void {
    this.miner = null;
    this.lifegame = new LifeGame(80, 80);
  }

  initMiner(): void {
    this.lifegame = null;
    this.miner = new Miner(16, 16, 36);
  }
}
