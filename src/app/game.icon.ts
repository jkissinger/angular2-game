export class GameIcon {
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;
    name: string;
    font: string;

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
}