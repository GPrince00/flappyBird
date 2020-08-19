console.log("Prince Flappy Bird");

const hitSound = new Audio();
hitSound.src = '../efects/hit.wav';

const sprites = new Image();
sprites.src = '../assets/sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height -204,

    draw() {
        ctx.fillStyle = '#70C5CE';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.x, background.y,
            background.width, background.height,
        );
        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.x + background.width), background.y,
            background.width, background.height,
        );
    }
}

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height -112,
    draw() {
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.x, floor.y,
            floor.width, floor.height,
        );
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            (floor.x + floor.width), floor.y,
            floor.width, floor.height,
        );
    }
}

function collision() {
    const flappyBirdY = global.flappyBird.y + global.flappyBird.height;
    if(flappyBirdY >= floor.y) return true;

    return false;
}

function createFlappBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravity: 0.25,
        speed: 0,
        leap: 4.6,
        jump(){
            flappyBird.speed = - flappyBird.leap;
        },
        update(){
            if(collision()) {
                hitSound.play();
                setTimeout(() => {
                    changeScreen(Screens.START)
                }, 500);
                return;
            }
    
            flappyBird.speed += flappyBird.gravity;
            flappyBird.y += flappyBird.speed;
        },
        draw() {
            ctx.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.width, flappyBird.height,
                flappyBird.x, flappyBird.y,
                flappyBird.width, flappyBird.height,
            );
        }
    }
    return flappyBird;
}

const messageGetReady = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw() {
        ctx.drawImage(
            sprites,
            messageGetReady.spriteX, messageGetReady.spriteY,
            messageGetReady.width, messageGetReady.height,
            messageGetReady.x, messageGetReady.y,
            messageGetReady.width, messageGetReady.height,
        );
    }
}
const global = {};
let activeScreen = {};

function changeScreen(newScreen) {
    activeScreen = newScreen;

    if (activeScreen.initializes) activeScreen.initializes();
}

const Screens = {
    START: {
        initializes() {
            global.flappyBird = createFlappBird();
        },
        draw() {
            background.draw();
            floor.draw();
            global.flappyBird.draw();
            messageGetReady.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {

        }
    },
    GAME: {
        draw() {
            background.draw();
            floor.draw();
            global.flappyBird.draw();
        },
        click(){
            global.flappyBird.jump();
        },
        update() {
            global.flappyBird.update();
        }
    }
}

function loop() {
    activeScreen.draw();
    activeScreen.update();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (activeScreen.click) {
        activeScreen.click();
    }
})

changeScreen(Screens.START);
loop();
