import { GameIcon } from './game.icon';

export class PlayerIcon extends GameIcon {

    constructor(startX: number, startY: number) {
        super();
        this.color = "red";
        this.font = "Consolas - 20px";
        this.height = 20;
        this.width = 20;
        this.name = "Player";
        this.x = startX;
        this.y = startY;
    }

}