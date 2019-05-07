let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let fly = new Audio();
let score_sound = new Audio();
let bg_sound = new Audio();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";
fly.src = "sound/fly.mp3";
score_sound.src = "sound/score.mp3";
bg_sound.src = "sound/mix.mp3";
bg_sound.volume = 0.1;
fly.volume = 0.1;
score_sound.volume = 0.1;
let gap = 90;
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 25;
  fly.play();
}
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};
let score = 0;
let xPos = 10;
let yPos = 150;
let gravity = 1.5;
function draw() {
  bg_sound.play();
  ctx.drawImage(bg, 0, 0);
  for(let i = 0; i < pipe.length; i++) {
  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
  ctx.drawImage(pipeBottom,  pipe[i].x, pipe[i].y + pipeUp.height + gap);
  pipe[i].x--;

  if(pipe[i].x == 125) {
    pipe.push({
      x: cvs.width,
      y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
    });
  }
  if(xPos + bird.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
    || yPos + bird.height >= cvs.height - fg.height) {
    location.reload();
  }
  if (pipe[i].x == 5) {
    score++;
    score_sound.play();
  }
}
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += gravity;
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, cvs.height - 20)
  requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
