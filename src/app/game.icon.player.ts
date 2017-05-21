import { GameIcon } from './game.icon';

export class PlayerIcon extends GameIcon {

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        super(minX, maxX, minY, maxY);
        this.color = "blue";
        this.font = "Consolas - 20px";
        this.height = 20;
        this.width = 20;
        this.name = "Player";
    }

    //TODO: Override draw and draw the player as a gradient circle?

}