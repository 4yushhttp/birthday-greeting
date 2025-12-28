// Show and hide pages
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');

  // Start/stop balloons and slideshow on Surprise page
  if (pageId === "surprise") {
    startBalloons();
    startSlideshow();
  } else {
    stopBalloons();
  }
}

// Keep background music playing continuously
window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  audio.volume = 0.4;

  // Most browsers require a user click before playing
  document.body.addEventListener('click', () => {
    if (audio.paused) audio.play();
  }, { once: true });
});

// 🎂 Cut Your Cake Game — with Countdown & Mobile Support
let player, cake, message, countdown, startBtn;
let playerX = 100, playerY = 200;
let cakeX = 400, cakeY = 200;
let speed = 3;
let playing = false;
let moveInterval;

window.addEventListener("load", () => {
  player = document.getElementById("player");
  cake = document.getElementById("cake");
  message = document.getElementById("game-message");
  countdown = document.getElementById("countdown");
  startBtn = document.getElementById("start-btn");

  if (cake && player) {
    document.addEventListener("mousemove", moveCakeMouse);
    document.addEventListener("touchmove", moveCakeTouch, { passive: false });
  }

  if (startBtn) startBtn.addEventListener("click", startGame);
});

function startGame() {
  if (playing) return;
  message.textContent = "";
  startBtn.disabled = true;
  countdown.textContent = "3";

  let count = 3;
  let timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.textContent = count;
    } else {
      clearInterval(timer);
      countdown.textContent = "GO!";
      setTimeout(() => (countdown.textContent = ""), 500);
      playing = true;
      playerX = 100;
      playerY = 200;
      speed = 3;
      moveInterval = setInterval(movePlayer, 30);

      setInterval(() => {
        if (playing) speed += 0.5;
      }, 5000);
    }
  }, 1000);
}

function moveCakeMouse(e) {
  if (!playing) return;
  moveCake(e.clientX, e.clientY);
}

function moveCakeTouch(e) {
  if (!playing) return;
  e.preventDefault();
  const touch = e.touches[0];
  moveCake(touch.clientX, touch.clientY);
}

function moveCake(clientX, clientY) {
  const gameArea = document.getElementById("game-area");
  const rect = gameArea.getBoundingClientRect();

  cakeX = clientX - rect.left - 50;
  cakeY = clientY - rect.top - 50;

  cakeX = Math.max(0, Math.min(cakeX, rect.width - 100));
  cakeY = Math.max(0, Math.min(cakeY, rect.height - 100));

  cake.style.left = cakeX + "px";
  cake.style.top = cakeY + "px";
}

function movePlayer() {
  if (!playing) return;

  if (playerX < cakeX) playerX += speed;
  if (playerX > cakeX) playerX -= speed;
  if (playerY < cakeY) playerY += speed;
  if (playerY > cakeY) playerY -= speed;

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  const dx = playerX - cakeX;
  const dy = playerY - cakeY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 70) {
    message.textContent = "😋 I ate the cake!";
    playing = false;
    clearInterval(moveInterval);
    startBtn.disabled = false;
    startBtn.textContent = "Play Again 🎮";
  }
}

// 🎈 Floating Balloons in Surprise Section
function createBalloon() {
  const container = document.getElementById("balloon-container");
  if (!container) return;

  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  const colors = ["#ff6fa5", "#ffb347", "#77dd77", "#84b6f4", "#f49ac2", "#ff6961"];
  balloon.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
  balloon.style.left = Math.random() * 90 + "%";
  balloon.style.animationDuration = (6 + Math.random() * 4) + "s";
  balloon.style.width = 40 + Math.random() * 30 + "px";
  balloon.style.height = 60 + Math.random() * 40 + "px";

  container.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}

function startBalloons() {
  stopBalloons();
  window.balloonInterval = setInterval(createBalloon, 500);
}

function stopBalloons() {
  clearInterval(window.balloonInterval);
}

// 🎞 Slideshow for Surprise Section
let slideIndex = 0;
let slides = document.querySelectorAll("#slideshow-container .slide");

function showSlides() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 3000);
}

function startSlideshow() {
  slideIndex = 0;
  showSlides();
}
// for video
window.addEventListener("load", () => {
  const bg = document.getElementById("bg-music");
  const video = document.getElementById("videomsg");
  const playBtn = document.getElementById("playVideoBtn");
  const pauseBtn = document.getElementById("pauseVideoBtn");

  if (!bg || !video || !playBtn || !pauseBtn) return;

  // Play video and fade background music
  playBtn.addEventListener("click", () => {
    playBtn.disabled = true;
    playBtn.textContent = "🎬 Playing...";

    let fadeOut = setInterval(() => {
      if (bg.volume > 0.2) {
        bg.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        video.play();
      }
    }, 100);
  });

  // Pause video and restore background music
  pauseBtn.addEventListener("click", () => {
    video.pause();

    // Fade background music back up
    let fadeIn = setInterval(() => {
      if (bg.volume < 1) {
        bg.volume += 0.05;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    playBtn.disabled = false;
    playBtn.textContent = "💖 Play Video";
  });

  // When video ends, restore background music automatically
  video.addEventListener("ended", () => {
    let fadeIn = setInterval(() => {
      if (bg.volume < 1) {
        bg.volume += 0.05;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    playBtn.disabled = false;
    playBtn.textContent = "💖 Play Video";
  });
});

