import { GameIcon } from './game.icon';

export class FinishIcon extends GameIcon {

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        super(minX, maxX, minY, maxY);
        this.color = "green";
        this.font = "Consolas - 20px";
        this.height = 5;
        this.width = 5;
        this.name = "FinishLine";
    }

}