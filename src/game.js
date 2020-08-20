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

function createTubes() {
    const tubes = {
        width: 52,
        height: 400,
        floor: {
            spriteX: 0,
            spriteY: 169,
        },
        sky: {
            spriteX: 52,
            spriteY: 169,
        },
        space: 80,
        draw() {
            tubes.pairs.forEach(function(pair) {
                const yRandom = pair.y;
                const spaceBetweenTubes = 90;
    
                const tubeSkyX = pair.x;
                const tubeSkyY = yRandom;
                ctx.drawImage(
                    sprites,
                    tubes.sky.spriteX, tubes.sky.spriteY,
                    tubes.width, tubes.height,
                    tubeSkyX, tubeSkyY,
                    tubes.width, tubes.height,
                );
    
                const tubeFloorX = pair.x;
                const tubeFloorY = tubes.height + spaceBetweenTubes + yRandom;
                ctx.drawImage(
                    sprites,
                    tubes.floor.spriteX, tubes.floor.spriteY,
                    tubes.width, tubes.height,
                    tubeFloorX, tubeFloorY,
                    tubes.width, tubes.height,
                );

                pair.tubeSky = {
                    x: tubeSkyX,
                    y: tubes.height + tubeSkyY
                }
                pair.tubeFloor = {
                    x: tubeFloorX,
                    y: tubeFloorY
                }
            })
        },
        hascollisionWithFlappyBird(pair) {
            const headOfFlappy = global.flappyBird.y;
            const footOfFlappy = global.flappyBird.y + global.flappyBird.height;

            if(global.flappyBird.x >= pair.x) {
                if(headOfFlappy <= pair.tubeSky.y) return true;

                if(footOfFlappy >= pair.tubeFloor.y) return true;
            }
            return false
        },
        pairs: [],
        update() {
            const pass100Frames = frames % 100 === 0;
            if(pass100Frames) {
                console.log("pass100Frames")
                tubes.pairs.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });                
            }

            tubes.pairs.forEach(function(pair) {
                pair.x = pair.x - 2;

                if (tubes.hascollisionWithFlappyBird(pair)){
                    console.log("Game Over")
                }
                if(pair.x + tubes.width <= 0) tubes.pairs.shift();
            });
        }
    }
    return tubes;
}

const Screens = {
    START: {
        initializes() {
            global.flappyBird = createFlappBird();
            global.floor = createFloor();
            global.tube = createTubes();
        },
        draw() {
            background.draw();
            global.tube.draw();
            global.floor.draw();
            global.flappyBird.draw();
            messageGetReady.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {
            global.floor.update();
            global.tube.update();
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
