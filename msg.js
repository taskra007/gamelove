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

document.body.style.overflowY = "hidden";

// ================== TYPEWRITER ==================
function typeQuestion(text, el, speed = 40) {
  el.innerHTML = "";
  let i = 0;
  (function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i++);
      setTimeout(type, speed);
    }
  })();
}

// ================== RENDER LEVELS ==================
function renderLevels() {
  levelsDiv.innerHTML = "";

  questions.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "level";
    if (i === level) d.classList.add("pulse");

    d.style.top = `${i * 100}px`;
    d.style.left = i % 2 === 0 ? "60px" : "160px";
    d.innerHTML = i === level ? "💖" : i < level ? "❤️" : "🔒";

    const label = document.createElement("div");
    label.className = "level-label";
    label.innerText = `Level ${i + 1}`;
    d.appendChild(label);

    // 🔥 LEVEL 1 → GitHub Pages redirect
    if (i === 0 && level === 0) {
      d.style.cursor = "pointer";
      d.onclick = () => {
        window.open(
          "https://taskra007.github.io/level-1-test/",
          "_blank"
        );
      };
    }

    // ❤️ LEVEL 2+ → question game
    else if (i === level) {
      d.style.cursor = "pointer";
      d.onclick = openGame;
    }

    levelsDiv.appendChild(d);
  });
}

// ================== OPEN GAME ==================
function openGame() {
  // ❌ Block game for Level 1
  if (level === 0) return;

  game.style.display = "flex";
  feedback.innerText = "";
  optionsEl.innerHTML = "";

  typeQuestion(questions[level].q, questionEl);

  ["madu", "renduparum", "loosu", "thariyala", "yes", "no"]
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const b = document.createElement("button");
      b.innerText = opt;
      b.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(b);
    });
}

// ================== CHECK ANSWER ==================
function checkAnswer(ans) {
  if (ans === questions[level].a) {

    // LAST LEVEL
    if (level === questions.length - 1) {
      game.style.display = "none";
      document.getElementById("map").style.display = "none";
      finalPopup.style.display = "flex";

      loveBtn.disabled = false;
      loveBtn.classList.remove("locked");
      loveBtn.classList.add("unlocked");
      loveBtn.innerText = "❤️ Click for Love";
      return;
    }

    game.style.display = "none";
    moveHeart(() => {
      level++;
      renderLevels();
      openGame();
    });

  } else {
    feedback.innerText = "Try again my love 💕";
  }
}

// ================== HEART MOVE ==================
function moveHeart(callback) {
  const levels = document.querySelectorAll(".level");
  const from = levels[level];
  const to = levels[level + 1];
  if (!to) return;

  const f = from.getBoundingClientRect();
  const t = to.getBoundingClientRect();

  const heart = document.createElement("div");
  heart.className = "moving-heart";
  heart.innerText = "❤️";
  heart.style.left = f.left + f.width / 2 + "px";
  heart.style.top = f.top + f.height / 2 + "px";
  document.body.appendChild(heart);

  let p = 0;
  function animate() {
    p += 0.02;
    heart.style.transform =
      `translate(${(t.left - f.left) * p}px,
      ${(t.top - f.top) * p - 120 * Math.sin(Math.PI * p)}px)`;
    if (p < 1) requestAnimationFrame(animate);
    else {
      heart.remove();
      callback();
    }
  }
  animate();
}

// ================== NEXT BUTTON ==================
nextPageBtn.onclick = () => {
  window.location.href = "index2.html";
};

// ================== START ==================
renderLevels();
