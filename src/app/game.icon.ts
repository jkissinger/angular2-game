export class GameIcon {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;
    name: string;
    font: string;

    constructor(minX: number, maxX: number, minY: number, maxY: number) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    getCenter() {
        return [Math.floor(this.x + this.width / 2), Math.floor(this.y + this.height / 2)];
    }

    setRandomLocation() {
        this.x = Math.floor(Math.random() * this.maxX) + this.minX;
        this.y = Math.floor(Math.random() * this.maxY) + this.minY;
    }

    moveLeft(distance: number) {
        this.x = this.x - distance;
    }

    moveRight(distance: number) {
        this.x = this.x + distance;
    }

    moveUp(distance: number) {
        this.y = this.y - distance;
    }

    moveDown(distance: number) {
        this.y = this.y + distance;
    }

    draw(context: CanvasRenderingContext2D) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillText(this.name, this.x, this.y);
    }
}