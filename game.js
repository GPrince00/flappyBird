console.log("Prince Flappy Bird");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function loop() {
    ctx.drawImage(
        sprites,
        0, 0,
        33, 24,
        10, 50,
        33, 24,
    )
    requestAnimationFrame(loop);
}

loop();
