export class HighScore {
    elem: HTMLDivElement;
    highScore: number;

    constructor() {
        console.log("Constructed HighScore");
        this.highScore = 0;
        this.elem = document.createElement('div');
        document.body.insertBefore(this.elem, document.body.childNodes[0]);
        this.updateText();
    }

    updateText() {
        this.elem.innerText = "High Score: " + this.highScore;
    }

    registerNewScore(score: number) {
        if (score > this.highScore) {
            this.highScore = score;
            this.updateText();
        }
    }
}