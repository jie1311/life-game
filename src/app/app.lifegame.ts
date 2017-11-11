import {Component, Input} from '@angular/core';
import {LifeGame} from './lifegame';

@Component({
  selector: 'app-lifegame',
  templateUrl: './app.lifegame.html',
  styleUrls: ['./app.lifegame.css', './app.component.css']
})

export class AppLifegameComponent {
  @Input() game: LifeGame;
}
