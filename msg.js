const questions = [
  { q: "namba rendu parula first yaru love panna", a: "loosu" },
  { q: "namba rendu parula yaru first pasuna", a: "loosu" },
  { q: "namba rendu parum nadathu pova first reson yaru", a: "madu" },
  { q: "namba rendu parula yaru first loosu", a: "loosu" },
  { q: "10th laa naa sapudalana nee sapuduviya? yes or no", a: "no" },
  { q: "namba rendu parula yaru v2ku athigama bayapaduva", a: "loosu" },
  { q: "namba rendu parula yaru athigama marapa", a: "renduparum" },
  { q: "idhu varaikum naa proposal date correct ah solli irukana?", a: "no" },
  { q: "namba rendu parula yaru sollratha kekamata", a: "loosu" },
  { q: "namba rendu parula yaru romba pavam", a: "madu" }
];

let level = 0;

/* Elements */
const levelsDiv = document.getElementById("levels");
const game = document.getElementById("game");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const finalPopup = document.getElementById("finalPopup");
const nextPageBtn = document.getElementById("nextPageBtn");
const loveBtn = document.getElementById("loveBtn");
const levelText = document.getElementById("levelText");

document.body.style.overflowY = "hidden";


// ================== TYPEWRITER (SAFE) ==================
function typeQuestion(text, el, speed = 40) {
  el.innerHTML = "";
  let i = 0;

  function typeNext() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeNext, speed);
    }
  }

  typeNext();
}


// ================== RENDER LEVELS ==================
function renderLevels() {
  levelsDiv.innerHTML = "";

  questions.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "level";
    if (i === level) d.classList.add("pulse");

    d.style.top = `${i * 80}px`;
    d.style.left = i % 2 === 0 ? "60px" : "160px";
    d.innerText = i === level ? "💖" : i < level ? "❤️" : "🔒";

    if (i === level) {
      d.onclick = openGame;
      d.addEventListener("touchstart", openGame);
    }

    levelsDiv.appendChild(d);
  });
}


// ================== OPEN GAME ==================
function openGame() {
  game.style.display = "flex";
  levelText.innerText = `Level ${level + 1}`;
levelText.style.animation = "none";
levelText.offsetHeight; // 🔥 reset animation
levelText.style.animation = "levelPop 0.6s ease forwards";
  feedback.innerText = "";
  optionsEl.innerHTML = "";

  typeQuestion(questions[level].q, questionEl);

  const options = ["madu", "renduparum", "loosu", "thariyala", "yes", "no"];

  options
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const b = document.createElement("button");
      b.innerText = opt;
      b.disabled = false;
      b.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(b);
    });
}


// ================== KISS EFFECT ==================
function showKiss() {
  for (let i = 0; i < 15; i++) {
    const k = document.createElement("div");
    k.className = "kiss";
    k.innerText = "😘";
    k.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(k);
    setTimeout(() => k.remove(), 1300);
  }
}


// ================== HEART MOVE ==================
function moveHeart(callback) {
  const levelsElems = document.querySelectorAll(".level");
  const from = levelsElems[level];
  const to = levelsElems[level + 1];
  if (!to) return;

  const h = document.createElement("div");
  h.className = "moving-heart";
  h.innerText = "❤️";

  const f = from.getBoundingClientRect();
  const t = to.getBoundingClientRect();

  const startX = f.left + f.width / 2;
  const startY = f.top + f.height / 2;
  const endX = t.left + t.width / 2;
  const endY = t.top + t.height / 2;

  h.style.left = startX + "px";
  h.style.top = startY + "px";
  document.body.appendChild(h);

  let progress = 0;
  const curveHeight = -120;

  function animate() {
    progress += 0.02;

    const x = startX + (endX - startX) * progress;
    const y = startY + (endY - startY) * progress +
              curveHeight * Math.sin(Math.PI * progress);

    h.style.transform = `translate(${x - startX}px, ${y - startY}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      glitterExplosion(endX, endY);
      h.remove();
      if (callback) callback();
    }
  }

  requestAnimationFrame(animate);
}


// ================== CHECK ANSWER ==================
function checkAnswer(ans) {
  if (ans === questions[level].a) {
    showKiss();

    // 🔥 LAST QUESTION
    if (level === questions.length - 1) {
      game.style.display = "none";
      document.getElementById("map").style.display = "none";
      finalPopup.style.display = "flex";
      document.body.style.overflowY = "auto";

      loveBtn.disabled = false;
      loveBtn.classList.remove("locked");
      loveBtn.classList.add("unlocked");
      loveBtn.innerText = "❤️ Click for Love";
      return;
    }

    // 🧡 NORMAL LEVEL
    game.style.display = "none";
    moveHeart(() => {
      level++;
      renderLevels();
      openGame();
    });

  } else {
    feedback.innerText = "Try again my love 💕";
    document.querySelector(".card").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".card").classList.remove("shake");
    }, 300);
  }
}


// ================== GLITTER ==================
function glitterExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    const g = document.createElement("div");
    g.className = "glitter";
    g.innerText = ["✨", "💖", "💫"][Math.floor(Math.random() * 3)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;

    g.style.left = x + "px";
    g.style.top = y + "px";
    g.style.setProperty("--x", Math.cos(angle) * distance + "px");
    g.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(g);
    setTimeout(() => g.remove(), 1000);
  }
}


// ================== NEXT PAGE ==================
nextPageBtn.onclick = () => {
  window.location.href = "index2.html";
};


// ================== START ==================
renderLevels();


