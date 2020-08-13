console.log("Prince Flappy Bird");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    heigth: 112,
    x: 0,
    y: canvas.height -112,
    draw() {
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.heigth,
            floor.x, floor.y,
            floor.width, floor.heigth,
        );
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.heigth,
            (floor.x + floor.width), floor.y,
            floor.width, floor.heigth,
        );
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    heigth: 24,
    x: 10,
    y: 50,
    draw() {
        ctx.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.width, flappyBird.heigth,
            flappyBird.x, flappyBird.y,
            flappyBird.width, flappyBird.heigth,
        );
    }
}

function loop() {
    floor.draw();
    flappyBird.draw();
    
    requestAnimationFrame(loop);
}

loop();
