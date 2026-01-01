const questions = [
  { q: "namba rendu parula first yaru love panna", a: "loosu" },
  { q: "namba rendu parula yaru first pasuna", a: "loosu" },
  { q: "namba rendu parum nadathu pova first reson yaru", a: "madu" },
  { q: "namba rendu parula yaru first loosu", a: "loosu" },
  { q: "10th laa naa sapudalana nee sapuduviya?", a: "no" },
  { q: "namba rendu parula yaru v2ku bayapaduva", a: "loosu" },
  { q: "namba rendu parula yaru marapa", a: "renduparum" },
  { q: "proposal date correct ah sonnena?", a: "no" },
  { q: "namba rendu parula sollratha kekamata", a: "loosu" },
  { q: "yaru romba pavam", a: "madu" },
];

let level = 0;

const levelsDiv = document.getElementById("levels");
const game = document.getElementById("game");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const final = document.getElementById("final");
const nextPageBtn = document.getElementById("nextPageBtn");

/* RENDER LEVELS */
function renderLevels() {
  levelsDiv.innerHTML = "";
  questions.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "level";
    d.style.top = `${i * 80}px`;
    d.style.left = i % 2 === 0 ? "60px" : "160px";
    d.innerText = i === level ? "💖" : i < level ? "❤️" : "🔒";

    if (i === level) {
      d.style.cursor = "pointer";
      d.onclick = openGame;
    }

    levelsDiv.appendChild(d);
  });
}

/* OPEN GAME */
function openGame() {
  game.style.display = "flex";
  questionEl.innerText = questions[level].q;
  feedback.innerText = "";
  optionsEl.innerHTML = "";

  ["madu","renduparum","loosu","thariyala","yes","no"]
    .sort(() => Math.random() - 0.5)
    .forEach(opt => {
      const b = document.createElement("button");
      b.innerText = opt;
      b.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(b);
    });
}

/* SHOW KISS */
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

/* HEART MOVE */
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

  h.style.left = f.left + "px";
  h.style.top = f.top + "px";
  document.body.appendChild(h);

  requestAnimationFrame(() => {
    h.style.left = t.left + "px";
    h.style.top = t.top + "px";
  });

  setTimeout(() => {
    h.remove();
    if (callback) callback();
  }, 1300);
}

/* CHECK ANSWER */
function checkAnswer(ans) {
  if (ans === questions[level].a) {
    showKiss();
    game.style.display = "none";

    moveHeart(() => {
      level++;
     if (level < questions.length) {
    renderLevels();
    openGame();
} else {
    // FINISH
    renderLevels();
    document.getElementById("map").style.display = "none";
    final.style.display = "flex";

    // ✅ Allow scrolling now
    document.body.style.overflowY = "auto";
}

    });
  } else {
    feedback.innerText = "Try again my love 💕";
    document.querySelector(".card").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".card").classList.remove("shake");
    }, 300);
  }
}

/* NEXT PAGE BUTTON */
nextPageBtn.onclick = () => {
  window.location.href = "index2.html";
};

/* START */
renderLevels();

