export class Miner {
  private _height: number;
  private _width: number;
  private _mines: number;
  private _status: any[];
  private _hintMap: any[];
  private _winTag: number; // 0 for unknown, 1 for win, 2 for lose

  constructor(height: number, width: number, mines: number) {
    this._height = height;
    this._width = width;
    this._mines = mines;
    this.init();
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get mines(): number {
    return this._mines;
  }

  set mines(value: number) {
    this._mines = value;
  }

  get status(): any[] {
    return this._status;
  }

  set status(value: any[]) {
    this._status = value;
  }

  get winTag(): number {
    return this._winTag;
  }

  set winTag(value: number) {
    this._winTag = value;
  }

  get hintMap(): any[] {
    return this._hintMap;
  }

  set hintMap(value: any[]) {
    this._hintMap = value;
  }

  init(): void {
    this._status = [];
    for (let i = 0; i < this._height; i++) {
      this._status[i] = [];
      for (let j = 0; j < this._width; j++) {
        this._status[i][j] = 0;
      }
    }

    this.putMines();
    this.newHintMap();
    this._winTag = 0;
  }

  reset(): void {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._status[i][j] = 0;
      }
    }

    this.putMines();
    this.newHintMap();
    this._winTag = 0;
  }

  checkWin(): void {
    if (this.winTag === 0) {
      let match = true;
      for (let i = 0; i < this._height; i++) {
        for (let j = 0; j < this._width; j++) {
          if (this._status[i][j] === 0 && !this._hintMap[i][j].clicked) {
            match = false;
          }
        }
      }
      if (match) {
        this.winTag = 1;
      }
    }
    if (this.winTag === 0) {
      let match = true;
      for (let i = 0; i < this._height; i++) {
        for (let j = 0; j < this._width; j++) {
          if (this._status[i][j] === 1 && !this._hintMap[i][j].marked) {
            match = false;
          }
        }
      }
      if (match) {
        this.winTag = 1;
      }
    }
  }

  click(unit: Unit): void {
    if (!unit.clicked && !unit.marked && this._winTag === 0) {
      unit.clicked = true;
      if (unit.hint === 9) {
        this._winTag = 2;
      } else if (unit.hint === 0) {
        const i = unit.cordI;
        const j = unit.cordJ;
        try {
          this.click(this._hintMap[i - 1][j - 1]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i - 1][j]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i - 1][j + 1]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i][j - 1]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i][j + 1]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i + 1][j - 1]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i + 1][j]);
        } catch (e) {

        }
        try {
          this.click(this._hintMap[i + 1][j + 1]);
        } catch (e) {

        }
      }
      this.checkWin();
    }
  }

  doubleClick(unit: Unit): void {
    if (!unit.clicked && this._winTag === 0) {
      unit.marked = !unit.marked;
      this.checkWin();
    }
  }

  private newHintMap(): void {
    this._hintMap = [];
    for (let i = 0; i < this._height; i++) {
      this._hintMap[i] = [];
      for (let j = 0; j < this._width; j++) {
        this._hintMap[i][j] = new Unit(i, j, false, false, this.hint(i, j));
      }
    }
  }

  private putMines(): void {
    for (let i = 0; i < this._mines; i++) {
      let x = this.getRandomCord(0, this._height - 1);
      let y = this.getRandomCord(0, this._height - 1);
      while (this._status[x][y] === 1) {
        x = this.getRandomCord(0, this._height - 1);
        y = this.getRandomCord(0, this._height - 1);
      }
      this._status[x][y] = 1;
    }
  }

  private getRandomCord(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private hint(i: number, j: number): number {
    if (this._status[i][j] === 1) {
      return 9;
    } else {
      let sum = 0;
      if (this._status[i - 1]) {
        if (this._status[i - 1][j - 1]) {
          sum = sum + this._status[i - 1][j - 1];
        }
        if (this._status[i - 1][j]) {
          sum = sum + this._status[i - 1][j];
        }
        if (this._status[i - 1][j + 1]) {
          sum = sum + this._status[i - 1][j + 1];
        }
      }
      if (this._status[i]) {
        if (this._status[i][j - 1]) {
          sum = sum + this._status[i][j - 1];
        }
        if (this._status[i][j + 1]) {
          sum = sum + this._status[i][j + 1];
        }
      }
      if (this._status[i + 1]) {
        if (this._status[i + 1][j - 1]) {
          sum = sum + this._status[i + 1][j - 1];
        }
        if (this._status[i + 1][j]) {
          sum = sum + this._status[i + 1][j];
        }
        if (this._status[i + 1][j + 1]) {
          sum = sum + this._status[i + 1][j + 1];
        }
      }
      return sum;
    }
  }
}

export class Unit {
  private _cordI: number;
  private _cordJ: number;
  private _clicked: boolean;
  private _marked: boolean;
  private _hint: number;


  constructor(cordI: number, cordJ: number, clicked: boolean, marked: boolean, hint: number) {
    this._cordI = cordI;
    this._cordJ = cordJ;
    this._clicked = clicked;
    this._marked = marked;
    this._hint = hint;
  }

  get marked(): boolean {
    return this._marked;
  }

  set marked(value: boolean) {
    this._marked = value;
  }

  get cordI(): number {
    return this._cordI;
  }

  set cordI(value: number) {
    this._cordI = value;
  }

  get cordJ(): number {
    return this._cordJ;
  }

  set cordJ(value: number) {
    this._cordJ = value;
  }

  get clicked(): boolean {
    return this._clicked;
  }

  set clicked(value: boolean) {
    this._clicked = value;
  }

  get hint(): number {
    return this._hint;
  }

  set hint(value: number) {
    this._hint = value;
  }
}
