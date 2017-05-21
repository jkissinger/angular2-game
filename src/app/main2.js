var myGamePiece;
var myObstacles = [];
var myScore;
var myLives;

function startGame() {
	myGamePiece = new component("20px - Consolas", 30, 30, "red", 10, 120, "±");
	myGamePiece.gravity = 0.05;
	myScore = new component("30px - Consolas", 10, 10, "black", 280, 40, "");
	myLives = 300;
	myGameArea.start();
	updateLifeCounter();
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function updateLifeCounter() {
	lifeCounter = "Lives: " + myLives;
	document.getElementById("lifeCounter").textContent = lifeCounter;
}

function component(font, width, height, color, x, y, text) {
	this.score = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.color = color;
	this.gravity = 0;
	this.gravitySpeed = 0;
	this.smashed = false;
	this.text = text;
	this.font = font;
	this.update = function () {
		ctx = myGameArea.context;
		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillText(this.text, this.x, this.y);
	}
	this.newPos = function () {
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
	}
	this.hitBottom = function () {
		var rockbottom = myGameArea.canvas.height - this.height;
		if (this.y > rockbottom) {
			this.y = rockbottom;
			this.gravitySpeed = 0;
		}
	}
	this.crashWith = function (otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		if (this.smashed) {
			console.log("Smashed object not crashing.");
			crash = false;
		}
		return crash;
	}
	this.smash = function () {
		console.log("Smashing object, smashed: " + this.smashed);
		this.color = "yellow";
		this.smashed = true;
	}
}

function updateGameArea() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i < myObstacles.length; i += 1) {
		if (!myObstacles[i].smashed && myGamePiece.crashWith(myObstacles[i])) {
			myLives = myLives - 1;
			if (myLives > 0) {
				updateLifeCounter();
				myObstacles[i].smash();
				myObstacles[i].update();
			} else {
				return;
			}
		}
		myObstacles[i].newPos();
		myObstacles[i].update();
	}
	myGameArea.clear();
	myGameArea.frameNo += 1;
	if (myGameArea.frameNo == 1 || everyinterval(150)) {
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
		minGap = 50;
		maxGap = 200;
		gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
		letter = new component("20px - Consolas", 30, 30, "green", maxHeight, height, "A");
		letter.gravity = 0.5;
		myObstacles.push(letter);
	}
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += -1;
		myObstacles[i].update();
	}
	myScore.text = "SCORE: " + myGameArea.frameNo;
	myScore.update();
	myGamePiece.newPos();
	myGamePiece.update();
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function accelerate(n) {
	myGamePiece.gravity = n;
}
