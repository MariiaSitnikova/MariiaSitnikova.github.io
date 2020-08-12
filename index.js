var Paw = new Image();
var bg = new Image(); // Создание объекта
var food = new Image(); // Создание объекта
var asteroid = new Image(); // Создание объекта
var meteor = new Image();
var gameOver = new Image();
var scoreImg = new Image();
var foodNumber = 5;
var asteroidsNumber = 4;
var meow = new Audio();
var traktor = new Audio();
var score = 0;
var gameEnd = false;

meow.src = "audio/meow.mp3"
traktor.src = "audio/traktor.mp3"
Paw.src = "img/Paw.png"; // Указание нужного изображения
bg.src = "img/bg.png"; // Аналогично
food.src = "img/food.png"; // Аналогично
asteroid.src = "img/asteroid.png"; // Аналогично
meteor.src = "img/meteor.png";
gameOver.src = "img/game-over.png";
scoreImg.src = "img/score.png";


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var xPos = 10;
var yPos = 150;
var fishes = [];
var asteroids = [];


document.addEventListener("keydown", move);

function move(event) {
    var key = event.key;
    if (key === "ArrowUp" || key === "w" || key === "W") {
        moveUp();
    }
    if (key === "ArrowDown" || key === "s" || key === "S") {
        moveDown();
    }
    if (key === "ArrowLeft" || key === "d" || key === "D") {
        moveLeft();
    }
    if (key === "ArrowRight" || key === "a" || key === "A") {
        moveRight();
    }
}

function moveUp() {
    if (yPos - 25 >= 0) {
        yPos -= 25;
    }
}

function moveDown() {
    if (yPos + 25 <= bg.height - Paw.height) {
        yPos += 25;
    }
}

function moveRight() {
    if (xPos + 25 <= bg.width - Paw.width) {
        xPos += 25;
    }
}

function moveLeft() {
    if (xPos - 25 >= 0) {
        xPos -= 25;
    }
}

function createFishes() {
    while (fishes.length !== foodNumber) {
        var fish = {
            x: getRandomArbitrary(50, canvas.width - 50),
            y: getRandomArbitrary(50, canvas.height - 50),
            width: food.width,
            height: food.height,
        };
        fishes.push(fish)
    }
}

function createAsteroids() {
    while (asteroids.length !== asteroidsNumber) {
        var img = asteroid;
        if (getRandomArbitrary(0, 2) === 0) {
            img = meteor;
        }
        var aster = {
            x: bg.width,
            y: getRandomArbitrary(50, canvas.height - 50),
            width: img.width - 30,
            height: img.height - 30,
            image: img,
            speed: getRandomArbitrary(3, 7),
        };
        asteroids.push(aster)
    }
}

function drawAsteroids() {
    for (var i = 0; i < asteroids.length; i++) {
        ctx.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
        asteroids[i].x -= asteroids[i].speed;
        if (checkPawCollision(asteroids[i]) === true) {
            meow.play();
            gameEnd = true;
        }
        if (asteroids[i].x < 0) {
            asteroids.splice(i, 1);

        }

    }
}

meteor.onload = draw;

function draw() {
    createFishes();
    createAsteroids();
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < fishes.length; i++) {
        ctx.drawImage(food, fishes[i].x, fishes[i].y);
        if (checkPawCollision(fishes[i]) === true) {
            fishes.splice(i, 1);
            score++;
        }
    }
    ctx.drawImage(Paw, xPos, yPos);
    drawAsteroids();
    ctx.drawImage(scoreImg, bg.width - 250, 0);
    ctx.fillStyle = "#990066";
    ctx.font = "48px Berlin Sans FB";
    ctx.fillText(score, bg.width + scoreImg.width - 250, 60);
    if (gameEnd === false) {
        window.requestAnimationFrame(draw);
    } else {
        ctx.drawImage(gameOver, (bg.width - gameOver.width) / 2, (bg.height - gameOver.height) / 2);
    }
}

function checkPawCollision(obj) {
    if (xPos < obj.x + obj.width &&
        xPos + Paw.width > obj.x &&
        yPos < obj.y + obj.height &&
        yPos + Paw.height > obj.y) {
        return true;
    }
    return false;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
