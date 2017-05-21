import { Component, AfterViewInit } from '@angular/core';
import { AngularCanvas } from './app.canvas';
import { PlayerIcon } from './game.icon.player';
import { FinishIcon } from './game.icon.finish';

@Component({
    selector: 'app-root',
    template: ``,
    host: { '(document:keydown)': 'handleKeyboardEvents($event)' }
})
export class GameState implements AfterViewInit {
    canvas: AngularCanvas;
    player: PlayerIcon;
    finishLine: FinishIcon;

    constructor() {
        console.log("Constructed Game State");
    }

    ngAfterViewInit() {
        this.canvas = new AngularCanvas(500, 500);
        this.canvas.clear();
        this.player = new PlayerIcon(40, 40);
        this.canvas.registerIcon(this.player);
        this.finishLine = new FinishIcon(75, 400, 75, 400);
        this.canvas.registerIcon(this.finishLine);
        this.canvas.refresh();
    }

    handleKeyboardEvents(event: KeyboardEvent) {
        let key = event.which || event.keyCode;
        let stepDistance = 3;
        if (key == 37 || key == 65) {
            this.player.moveLeft(stepDistance);
        } else if (key == 38 || key == 87) {
            this.player.moveUp(stepDistance);
        } else if (key == 39 || key == 68) {
            this.player.moveRight(stepDistance);
        } else if (key == 40 || key == 83) {
            this.player.moveDown(stepDistance);
        }
        this.refreshCanvas();
    }

    refreshCanvas() {
        this.canvas.refresh();
        let collisions = this.canvas.getCollisions(this.player);
        for (let collided of collisions) {
            console.log(this.player.name + " collided with " + collided.name);
            if (collided == this.finishLine) {
                alert("You win!");
            }
        }
    }
}