import { GameIcon } from './game.icon';

export class PlayerIcon extends GameIcon {

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        super(minX, maxX, minY, maxY);
        this.color = "red";
        this.font = "Consolas - 20px";
        this.height = 20;
        this.width = 20;
        this.name = "Player";
    }

}