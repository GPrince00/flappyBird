console.log("Prince Flappy Bird");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
    flappyBird.draw();
    
    requestAnimationFrame(loop);
}

loop();
