console.log("Prince Flappy Bird");

let frames = 0;
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

function createFloor() {
    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 112,
        x: 0,
        y: canvas.height -112,
        update() {
            const floorMovement = 1;
            const repeatWhen = floor.width / 2;
            const movement = floor.x - floorMovement;

            floor.x = movement % repeatWhen;
        },
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
    return floor;
}



function collision() {
    const flappyBirdY = global.flappyBird.y + global.flappyBird.height;
    if(flappyBirdY >= global.floor.y) return true;

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
        movements: [ 
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 },
            { spriteX: 0, spriteY: 26 },
        ],
        currentFrame: 0,
        updateCurrentFrame() {
            const frameInterval = 10;
            const passedInterval = frames % frameInterval === 0;
            if(passedInterval) {

                const birdMoviment = 1;
                const increment = birdMoviment + flappyBird.currentFrame;
                const repetitionBase = flappyBird.movements.length;
                flappyBird.currentFrame = increment % repetitionBase;
            }

        },
        draw() {
            flappyBird.updateCurrentFrame();
            const { spriteX, spriteY } = flappyBird.movements[flappyBird.currentFrame]
            ctx.drawImage(
                sprites,
                spriteX, spriteY,
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
            global.floor = createFloor();
        },
        draw() {
            background.draw();
            global.floor.draw();
            global.flappyBird.draw();
            messageGetReady.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {
            global.floor.update();

        }
    },
    GAME: {
        draw() {
            background.draw();
            global.floor.draw();
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

    frames += 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if (activeScreen.click) {
        activeScreen.click();
    }
})

changeScreen(Screens.START);
loop();
