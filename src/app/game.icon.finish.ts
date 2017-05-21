import { GameIcon } from './game.icon';

export class FinishIcon extends GameIcon {

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        super(minX, maxX, minY, maxY);
        this.color = "green";
        this.font = "Consolas - 20px";
        this.height = 8;
        this.width = 14;
        this.name = "FinishLine";
    }

    draw(context: CanvasRenderingContext2D) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        let poleWidth = Math.floor(this.width / 5);
        context.fillRect(this.x, this.y, poleWidth, this.height * 3);
    }
}