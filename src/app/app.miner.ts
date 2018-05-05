import {Component, Input} from '@angular/core';
import {Miner, Unit} from './miner';

@Component({
  selector: 'app-miner',
  templateUrl: './app.miner.html',
  styleUrls: ['./app.miner.css', './app.component.css']
})

export class AppMinerComponent {
  @Input() game: Miner;
  timer: any;
  preventSimpleClick: boolean;


  clickUnit(unit: Unit): void {
    this.preventSimpleClick = false;
    const delay = 200;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick && this.game.winTag === 0) {
        this.game.mark(unit);
      }
    }, delay);

  }

  doubleClickUnit(unit: Unit): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    if (this.game.winTag === 0) {
      this.game.open(unit);
    }
  }
}


