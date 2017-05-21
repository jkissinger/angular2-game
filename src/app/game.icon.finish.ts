import { GameIcon } from './game.icon';

export class FinishIcon extends GameIcon {

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        super();
        this.color = "green";
        this.font = "Consolas - 20px";
        this.height = 20;
        this.width = 20;
        this.name = "FinishLine";
        this.x = Math.floor(Math.random() * maxX) + minX;
        this.y = Math.floor(Math.random() * maxY) + minY;
    }

}