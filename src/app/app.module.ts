import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppLifegameComponent} from './app.lifegame';
import {AppMinerComponent} from './app.miner';

@NgModule({
  declarations: [
    AppComponent,
    AppLifegameComponent,
    AppMinerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
