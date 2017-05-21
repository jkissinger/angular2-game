import { GameIcon } from './game.icon';

export class AngularCanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    icons: Array<GameIcon>;

    constructor(width: number, height: number) {
        console.log("Constructed Canvas");
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        // TODO: Do this with a reference to the app root?
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.icons = [];
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    registerIcon(icon: GameIcon) {
        this.icons.push(icon);
    }

    drawIcons() {
        for (let icon of this.icons) {
            icon.draw(this.context);
        }
    }

    getCollisions(icon: GameIcon) {
        let collisions = [];
        for (let otherIcon of this.icons) {
            if (icon != otherIcon && this.hasCollided(icon, otherIcon)) {
                collisions.push(otherIcon);
            }
        }
        return collisions;
    }

    hasCollided(icon1: GameIcon, icon2: GameIcon) {
        let left1 = icon1.x;
        let right1 = icon1.x + icon1.width;
        let top1 = icon1.y;
        let bottom1 = icon1.y + icon1.height;
        let left2 = icon2.x;
        let right2 = icon2.x + icon2.width;
        let top2 = icon2.y;
        let bottom2 = icon2.y + icon2.height;
        if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
            return false;
        }
        return true;
    }

    refresh() {
        this.clear();
        this.drawIcons();
    }

    adjustCoords(coords: Array<number>) {
        coords[0] = coords[0] + this.canvas.offsetLeft;
        coords[1] = coords[1] + this.canvas.offsetTop;
    }
}