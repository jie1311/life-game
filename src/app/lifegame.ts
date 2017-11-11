export class LifeGame {
  private _height: number;
  private _width: number;
  private _status: any[];
  private _playTag: any;

  constructor(height: number, width: number) {
    this._height = height;
    this._width = width;
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

  get status(): any[] {
    return this._status;
  }

  set status(value: any[]) {
    this._status = value;
  }

  get playTag(): any {
    return this._playTag;
  }

  set playTag(value: any) {
    this._playTag = value;
  }

  init(): void {
    this._status = [];
    for (let i = 0; i < this._height; i++) {
      this._status[i] = [];
      for (let j = 0; j < this._width; j++) {
        this._status[i][j] = this.getRandomStatus();
      }
    }
    this.stop();
  }

  reset(): void {
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._status[i][j] = this.getRandomStatus();
      }
    }
    this.stop();
  }

  play(): void {
    this.playTag = setInterval(() => {
      this.next();
    }, 0);
  }

  stop(): void {
    clearInterval(this.playTag);
  }

  nextOne(): void {
    this.next();
    this.stop();
  }

  private getRandomStatus(): number {
    return Math.floor(Math.random() * 2);
  }

  private next(): void {
    const newStatus = [];
    for (let i = 0; i < this._height; i++) {
      newStatus[i] = [];
      for (let j = 0; j < this._width; j++) {
        if (i === 0 && j === 0) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[this._height - 1][this._width - 1],
            this._status[this._height - 1][j],
            this._status[this._height - 1][j + 1],
            this._status[i][this._width - 1],
            this._status[i][j + 1],
            this._status[i + 1][this._width - 1],
            this._status[i + 1][j],
            this._status[i + 1][j + 1]);
        } else if (i === 0 && j !== 0 && j !== this._width - 1) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[this._height - 1][j - 1],
            this._status[this._height - 1][j],
            this._status[this._height - 1][j + 1],
            this._status[i][j - 1],
            this._status[i][j + 1],
            this._status[i + 1][j - 1],
            this._status[i + 1][j],
            this._status[i + 1][j + 1]);
        } else if (i !== 0 && i !== this._height - 1 && j === 0) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[i - 1][this._width - 1],
            this._status[i - 1][j],
            this._status[i - 1][j + 1],
            this._status[i][this._width - 1],
            this._status[i][j + 1],
            this._status[i + 1][this._width - 1],
            this._status[i + 1][j],
            this._status[i + 1][j + 1]);
        } else if (i !== 0 && i !== this._height - 1 && j !== 0 && j !== this._width - 1) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[i - 1][j - 1],
            this._status[i - 1][j],
            this._status[i - 1][j + 1],
            this._status[i][j - 1],
            this._status[i][j + 1],
            this._status[i + 1][j - 1],
            this._status[i + 1][j],
            this._status[i + 1][j + 1]);
        } else if (i === this._height - 1 && j !== 0 && j !== this._width - 1) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[i - 1][j - 1],
            this._status[i - 1][j],
            this._status[i - 1][j + 1],
            this._status[i][j - 1],
            this._status[i][j + 1],
            this._status[0][j - 1],
            this._status[0][j],
            this._status[0][j + 1]);
        } else if (i !== 0 && i !== this._height - 1 && j === this._width - 1) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[i - 1][j - 1],
            this._status[i - 1][j],
            this._status[i - 1][0],
            this._status[i][j - 1],
            this._status[i][0],
            this._status[i + 1][j - 1],
            this._status[i + 1][j],
            this._status[i + 1][0]);
        } else if (i === this._height - 1 && j === this._width - 1) {
          newStatus[i][j] = this.nextUnit(i, j,
            this._status[i - 1][j - 1],
            this._status[i - 1][j],
            this._status[i - 1][0],
            this._status[i][j - 1],
            this._status[i][0],
            this._status[0][j - 1],
            this._status[0][j],
            this._status[0][j + 1]);
        }
      }
    }
    this._status = newStatus;
  }

  private nextUnit(i: number, j: number,
                   lu: number, uu: number, ru: number,
                   ll: number, rr: number,
                   ld: number, dd: number, rd: number): number {
    if (this._status[i][j] === 1) {
      if (lu + uu + ru + ll + rr + ld + dd + rd < 2) {
        return 0;
      } else if (lu + uu + ru + ll + rr + ld + dd + rd > 3) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (lu + uu + ru + ll + rr + ld + dd + rd === 3) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

