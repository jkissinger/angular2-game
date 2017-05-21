import { Component, AfterViewInit } from '@angular/core';
import { AngularCanvas } from './app.canvas';
import { HighScore } from './game.highscore';
import { PlayerIcon } from './game.icon.player';
import { FinishIcon } from './game.icon.finish';

@Component({
    selector: 'app-root',
    template: ``,
    host: { '(document:keydown)': 'handleKeyboardEvents($event)', '(document:mousedown)': 'handleMouseEvent($event)', '(document:touchend)': 'handleTouchEvent($event)' }
})
export class GameState implements AfterViewInit {
    canvas: AngularCanvas;
    player: PlayerIcon;
    finishLine: FinishIcon;
    highScore: HighScore;
    score: number;

    constructor() {
        console.log("Constructed Game State");
    }

    ngAfterViewInit() {
        let width = window.innerWidth - 50;
        let height = window.innerHeight - 50;
        this.canvas = new AngularCanvas(width, height);
        this.player = new PlayerIcon(0, 50, 0, 50);
        this.finishLine = new FinishIcon(75, width - 25, 75, height - 25);
        this.highScore = new HighScore();
        this.canvas.registerIcon(this.player);
        this.canvas.registerIcon(this.finishLine);
        this.loadNewGameState();
    }

    loadNewGameState() {
        this.player.setRandomLocation();
        this.finishLine.setRandomLocation();
        this.canvas.refresh();
        let a = this.player.x - this.finishLine.x;
        let b = this.player.y - this.finishLine.y;
        this.score = Math.floor(Math.sqrt(a * a + b * b));
    }

    handleTouchEvent(event: TouchEvent): any {
        if (event && event.touches[0]) {
            this.movePlayerRelative(event.touches[0].pageX, event.touches[0].pageY);
        }
    }

    handleMouseEvent(event: MouseEvent): any {
        if (event) {
            this.movePlayerRelative(event.x, event.y);
        }
    }

    movePlayerRelative(x: number, y: number) {
        if (this.player) {
            let center = this.player.getCenter();
            this.canvas.adjustCoords(center);
            this.player.x = this.player.x + Math.floor((x - center[0]) / 10);
            this.player.y = this.player.y + Math.floor((y - center[1]) / 10);
            this.score = this.score - 1;
            this.refreshCanvas();
        }
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
        this.score = this.score - 1;
        this.refreshCanvas();
    }

    refreshCanvas() {
        this.canvas.refresh();
        let collisions = this.canvas.getCollisions(this.player);
        for (let collided of collisions) {
            console.log(this.player.name + " collided with " + collided.name);
            if (collided == this.finishLine) {
                alert("You win! Score: " + this.score);
                this.highScore.registerNewScore(this.score);
                this.loadNewGameState();
            }
        }
    }
}