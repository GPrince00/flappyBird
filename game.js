console.log("Prince Flappy Bird");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    heigth: 204,
    x: 0,
    y: canvas.height -204,

    draw() {
        ctx.fillStyle = '#70C5CE';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.heigth,
            background.x, background.y,
            background.width, background.heigth,
        );
        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.heigth,
            (background.x + background.width), background.y,
            background.width, background.heigth,
        );
    }
}

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
    gravity: 0.25,
    speed: 0,
    update(){
        flappyBird.speed += flappyBird.gravity;
        flappyBird.y += flappyBird.speed;
    },
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
    flappyBird.update()
    background.draw();
    floor.draw();
    flappyBird.draw();
    requestAnimationFrame(loop);
}

loop();
