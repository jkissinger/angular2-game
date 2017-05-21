import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularCanvas } from './app.canvas';
import { GameState } from './game.state';

@NgModule({
  declarations: [
    AppComponent,
    GameState
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, GameState]
})
export class AppModule { }
