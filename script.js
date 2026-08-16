// =============================================
// PERSONALIZE YOUR ARPITA WEBSITE HERE
// =============================================

const SITE_CONFIG = {
  name: 'Arpita Baby',
  openingLine: 'somewhere in the quiet...',
  introHeader: 'Some moments are small...',
  introBody: '...but somehow become the ones we keep in the quietest part of us.',
  photo: 'assets/images/our-photo.jpg',
  photoCaption: 'This is us — the part I keep coming back to.',
  finalQuestion: 'If I could keep one feeling from us forever, what would it be?',
  finalAnswerOptions: [
    'The way your laugh settles everything.',
    'The calm that exists when we are together.',
    'The feeling that the future is brighter with you in it.'
  ],
  finalMessage: [
    'Some people fill a room. You quietly rearrange the whole world around you, and somehow no one notices until they realize nothing feels the same without you in it.',
    'I do not know exactly what our future holds — but I know I want every slow morning, every quiet drive, and every dream we have not spoken out loud to be part of it.',
    'This was never really about eight questions. It was just an excuse to spend a little more time thinking about you, and to make a place for all the quiet love that keeps growing between us.'
  ],
  secretMessage: 'Made for Arpita Baby, with all the quiet details.',
  memoryCards: [
    { title: 'Little things', items: ['The way you make even silence feel warm.', 'The way a small look can say everything.'] },
    { title: 'Moments I remember', items: ['The calm after a long day when it feels easy to just be near you.', 'The kind of laughter that makes everything lighter.'] },
    { title: 'Things I love', items: ['Your gentleness.', 'The sincerity in everything you do.'] },
    { title: 'Things that make me smile', items: ['Your expression before you laugh.', 'How naturally you make a room feel softer.'] }
  ],
  futureCards: [
    { title: 'Somewhere to go', items: ['A place no one else knows about.', 'A quiet road trip with no rush.'] },
    { title: 'Something to try', items: ['A late-night walk with nowhere to be.', 'A day that starts slow and ends in laughter.'] },
    { title: 'A memory to make', items: ['A sunrise we watched together.', 'A tiny tradition that belongs only to us.'] },
    { title: 'A dream to hold onto', items: ['A life that feels gentle and honest.', 'A future where we keep choosing each other.'] }
  ],
  questions: [
    { text: 'Which moment with me would you secretly replay if you could?', options: [
      { text: 'The quiet one that felt like home.', mood: 'quiet' },
      { text: 'The one where we laughed so hard we forgot the world.', mood: 'wild' },
      { text: 'The tiny moment that made me feel closer to you.', mood: 'ember' }
    ] },
    { text: 'What is one little thing I do that somehow always makes you smile?', options: [
      { text: 'The way you make the room feel softer.', mood: 'quiet' },
      { text: 'That look you get when you are happy around me.', mood: 'ember' },
      { text: 'The way you are completely yourself with me.', mood: 'wild' }
    ] },
    { text: 'Which of our silly moments still makes you laugh the most?', options: [
      { text: 'The one that changed the mood in an instant.', mood: 'wild' },
      { text: 'The one where we laughed for no real reason at all.', mood: 'ember' },
      { text: 'The one where neither of us wanted it to end.', mood: 'quiet' }
    ] },
    { text: 'Which moment between us felt unexpectedly special?', options: [
      { text: 'The quiet one that said more than words ever could.', mood: 'quiet' },
      { text: 'The one where I felt unusually close to you.', mood: 'ember' },
      { text: 'The one that felt like a secret only we were sharing.', mood: 'wild' }
    ] },
    { text: 'If we could relive one kind of day together, which would you choose?', options: [
      { text: 'A slow day with no plans and all the time in the world.', mood: 'quiet' },
      { text: 'A day full of movement, laughter, and little adventures.', mood: 'wild' },
      { text: 'A day that felt dreamy, cinematic, and completely ours.', mood: 'ember' }
    ] },
    { text: 'When do you feel closest to me?', options: [
      { text: 'When we are just quiet together.', mood: 'quiet' },
      { text: 'When we are talking and everything feels honest.', mood: 'ember' },
      { text: 'When it feels like the whole world disappears for a moment.', mood: 'wild' }
    ] },
    { text: 'If we could disappear somewhere together tomorrow, where would you want us to go?', options: [
      { text: 'Somewhere calm, tucked away, and private.', mood: 'quiet' },
      { text: 'Somewhere warm and full of life and stories.', mood: 'ember' },
      { text: 'Somewhere wild enough to feel like a dream.', mood: 'wild' }
    ] },
    { text: 'What is one memory you still want us to make someday?', options: [
      { text: 'A sunrise we watched together, without rushing.', mood: 'quiet' },
      { text: 'A late-night adventure that felt a little unreal.', mood: 'wild' },
      { text: 'A tradition that belongs to us and no one else.', mood: 'ember' }
    ] }
  ]
};

(function () {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const body = document.body;

  const EMBER_HUES = { ember: 28, quiet: 260, wild: 8 };

  const EmberField = (() => {
    const canvas = qs('#ember-field');
    const ctx = canvas.getContext('2d');
    let particles = [], width = 0, height = 0, dpr = 1, hue = 30;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    function makeParticles(count) {
      particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, radius: (Math.random() * 1.4 + 0.3) * dpr, speed: (Math.random() * 0.26 + 0.04) * dpr, drift: (Math.random() - 0.5) * 0.12 * dpr, alpha: Math.random() * 0.38 + 0.08 }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed; particle.x += particle.drift;
        if (particle.y < -10) { particle.y = height + 10; particle.x = Math.random() * width; }
        ctx.beginPath(); ctx.fillStyle = `hsla(${hue}, 68%, 68%, ${particle.alpha})`; ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    function setHue(nextHue) { hue += (nextHue - hue) * 0.05; }
    function init() {
      resize(); makeParticles(prefersReducedMotion ? 0 : (window.innerWidth < 640 ? 24 : 46)); window.addEventListener('resize', resize, { passive: true });
      if (prefersReducedMotion) return; draw();
    }
    return { init, setHue: (nextHue) => { if (!prefersReducedMotion) setHue(nextHue); } };
  })();

  const Glow = (() => {
    const glowEl = qs('#glow'); let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2, currentX = targetX, currentY = targetY, started = false;
    function setVars(x, y) { glowEl.style.setProperty('--glow-x', `${x}px`); glowEl.style.setProperty('--glow-y', `${y}px`); }
    function animate() { currentX += (targetX - currentX) * 0.08; currentY += (targetY - currentY) * 0.08; setVars(currentX, currentY); requestAnimationFrame(animate); }
    function moveTo(x, y) { targetX = x; targetY = y; if (!started && !prefersReducedMotion) { started = true; animate(); } if (prefersReducedMotion) setVars(x, y); }
    function init() {
      setVars(targetX, targetY); if (prefersReducedMotion) return;
      window.addEventListener('mousemove', (event) => moveTo(event.clientX, event.clientY), { passive: true });
      window.addEventListener('touchmove', (event) => { if (event.touches?.[0]) moveTo(event.touches[0].clientX, event.touches[0].clientY); }, { passive: true });
      window.addEventListener('touchstart', (event) => { if (event.touches?.[0]) moveTo(event.touches[0].clientX, event.touches[0].clientY); }, { passive: true });
    }
    return { init };
  })();

  function switchScene(fromEl, toEl, { instant = false } = {}) {
    if (!fromEl) { toEl.classList.add('scene--active'); return; }
    if (instant || prefersReducedMotion) { fromEl.classList.remove('scene--active'); toEl.classList.add('scene--active', 'scene--entering'); return; }
    fromEl.classList.add('scene--leaving');
    setTimeout(() => { fromEl.classList.remove('scene--active', 'scene--leaving'); toEl.classList.add('scene--active', 'scene--entering'); setTimeout(() => toEl.classList.remove('scene--entering'), 900); }, 680);
  }

  const Transition = (() => {
    const layer = qs('#transition-layer');
    function play(callback) {
      if (prefersReducedMotion) { callback(); return; }
      layer.style.transition = 'none'; layer.style.opacity = '0';
      requestAnimationFrame(() => { layer.style.transition = 'opacity 0.6s var(--ease-soft)'; layer.style.opacity = '1'; setTimeout(() => { callback(); setTimeout(() => { layer.style.opacity = '0'; }, 120); }, 600); });
    }
    return { play };
  })();

  const Opening = (() => {
    let discovered = false;
    function revealStaggered() {
      if (discovered) return; discovered = true; body.classList.add('discovering');
      qsa('#scene-dark [data-reveal], #scene-dark .name-reveal').forEach((node, index) => setTimeout(() => node.classList.add('is-in'), 260 * index + 180));
    }
    function init() {
      if (prefersReducedMotion || isTouch) setTimeout(revealStaggered, 550); else { window.addEventListener('mousemove', revealStaggered, { once: true }); window.addEventListener('keydown', revealStaggered, { once: true }); setTimeout(revealStaggered, 4200); }
      qs('#begin-btn').addEventListener('click', () => { body.classList.add('began'); Transition.play(() => Journey.enter()); });
    }
    return { init };
  })();

  const Journey = (() => {
    const stage = qs('#question-stage'), progressFill = qs('#progress-fill'), currentCount = qs('#q-current'), whisperEl = qs('#journey-whisper');
    const sceneDark = qs('#scene-dark'), sceneStory = qs('#scene-story'), sceneJourney = qs('#scene-journey'), sceneMemory = qs('#scene-memory'), sceneSomeday = qs('#scene-someday'), sceneHush = qs('#scene-hush');
    const questions = SITE_CONFIG.questions; let currentIndex = 0; const moodTally = { ember: 0, quiet: 0, wild: 0 }; let advancing = false;
    function pad(value) { return String(value).padStart(2, '0'); }
    function renderQuestions() {
      questions.forEach((question, index) => {
        const wrap = document.createElement('div'); wrap.className = 'question' + (index === 0 ? ' is-current' : ''); wrap.dataset.index = String(index); wrap.setAttribute('role', 'group');
        const number = document.createElement('p'); number.className = 'question-number'; number.textContent = `${pad(index + 1)} / ${pad(questions.length)}`;
        const title = document.createElement('h2'); title.className = 'question-text'; title.textContent = question.text;
        const options = document.createElement('ul'); options.className = 'options';
        question.options.forEach((option) => {
          const item = document.createElement('li'); const button = document.createElement('button'); button.type = 'button'; button.className = 'option-btn'; button.dataset.mood = option.mood; button.setAttribute('aria-label', option.text);
          const label = document.createElement('span'); label.textContent = option.text; const mark = document.createElement('span'); mark.className = 'option-btn__mark'; mark.textContent = '— chosen';
          button.append(label, mark); button.addEventListener('click', () => handleAnswer(index, option.mood, button, options)); item.appendChild(button); options.appendChild(item);
        });
        wrap.append(number, title, options); stage.appendChild(wrap);
      });
    }
    function handleAnswer(questionIndex, mood, selectedButton, list) {
      if (advancing) return; advancing = true; qsa('.option-btn', list).forEach((button) => { button.disabled = true; if (button !== selectedButton) button.classList.add('is-dimmed'); }); selectedButton.classList.add('is-selected'); moodTally[mood] += 1; EmberField.setHue(EMBER_HUES[mood]);
      const whisperOptions = { ember: ['the light warms, just slightly.', 'somewhere, a candle catches.', 'the room feels a little closer.'], quiet: ['a hush settles in.', 'the noise outside fades a little.', 'everything slows, just for a second.'], wild: ['something stirs in the dark.', 'a door, somewhere, creaks open.', 'the night leans in.'] };
      const lines = whisperOptions[mood]; whisperEl.textContent = lines[Math.floor(Math.random() * lines.length)]; whisperEl.classList.add('is-in');
      setTimeout(() => { whisperEl.classList.remove('is-in'); advance(questionIndex); }, prefersReducedMotion ? 350 : 1200);
    }
    function advance(questionIndex) {
      const currentQuestion = qs(`.question[data-index="${questionIndex}"]`, stage), isLast = questionIndex === questions.length - 1;
      if (isLast) { currentQuestion.classList.add('is-leaving'); setTimeout(() => { switchScene(sceneJourney, sceneMemory); setTimeout(() => { switchScene(sceneMemory, sceneSomeday); setTimeout(() => { switchScene(sceneSomeday, sceneHush); setTimeout(() => Final.enterViaHush(), 1200); }, 1400); }, 1400); }, 500); return; }
      const nextQuestion = qs(`.question[data-index="${questionIndex + 1}"]`, stage); currentQuestion.classList.add('is-leaving');
      setTimeout(() => { currentQuestion.classList.remove('is-current', 'is-leaving'); nextQuestion.classList.add('is-current'); currentIndex = questionIndex + 1; currentCount.textContent = pad(currentIndex + 1); progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`; advancing = false; }, 480);
    }
    function enter() { body.classList.add('scene-journey-active'); switchScene(sceneDark, sceneStory); setTimeout(() => switchScene(sceneStory, sceneJourney), 1100); }
    function init() { renderQuestions(); currentCount.textContent = '01'; progressFill.style.width = `${100 / questions.length}%`; }
    return { init, enter, moodTally: () => moodTally };
  })();

  const Memory = (() => {
    const memoryGrid = qs('#memory-grid');
    function render() { SITE_CONFIG.memoryCards.forEach((card) => { const item = document.createElement('article'); item.className = 'memory-card'; const title = document.createElement('h3'); title.textContent = card.title; const list = document.createElement('ul'); card.items.forEach((line) => { const li = document.createElement('li'); li.textContent = line; list.appendChild(li); }); item.append(title, list); memoryGrid.appendChild(item); }); }
    return { render };
  })();

  const Future = (() => {
    const futureGrid = qs('#future-grid');
    function render() { SITE_CONFIG.futureCards.forEach((card) => { const item = document.createElement('article'); item.className = 'future-card'; const title = document.createElement('h3'); title.textContent = card.title; const list = document.createElement('ul'); card.items.forEach((line) => { const li = document.createElement('li'); li.textContent = line; list.appendChild(li); }); item.append(title, list); futureGrid.appendChild(item); }); }
    return { render };
  })();

  const Final = (() => {
    const sceneHush = qs('#scene-hush'), sceneFinal = qs('#scene-final'), finalQuestionPanel = qs('#final-question-panel'), finalOptions = qs('#final-options'), finalMessage = qs('#final-message'), moreBtn = qs('#more-btn'), surprise = qs('#surprise'), constellation = qs('#constellation'), dateEl = qs('#today-date');
    function renderFinalQuestion() {
      finalOptions.innerHTML = '';
      SITE_CONFIG.finalAnswerOptions.forEach((answer) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'final-option'; button.textContent = answer; button.addEventListener('click', () => { qsa('.final-option').forEach((option) => option.classList.remove('is-selected')); button.classList.add('is-selected'); setTimeout(() => { finalQuestionPanel.classList.add('hidden'); finalMessage.classList.remove('hidden'); qsa('#scene-final [data-reveal]').forEach((node, index) => setTimeout(() => node.classList.add('is-in'), 220 * index + 200)); setTimeout(() => moreBtn.classList.remove('hidden'), 1400); }, prefersReducedMotion ? 150 : 650); }); finalOptions.appendChild(button); });
    }
    function buildConstellation() { const points = [[8,70],[17,34],[27,55],[49,22],[64,44],[76,30],[89,66],[60,82],[38,86]]; constellation.innerHTML = ''; points.forEach(([x,y], index) => { const dot = document.createElement('span'); dot.className = 'dot'; dot.style.left = `${x}%`; dot.style.top = `${y}%`; dot.style.animationDelay = `${index * 0.18}s`; constellation.appendChild(dot); }); }
    function setDate() { dateEl.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    function enterViaHush() { Transition.play(() => { switchScene(sceneHush, sceneFinal); renderFinalQuestion(); }); }
    function init() { moreBtn.addEventListener('click', () => { moreBtn.classList.add('hidden'); surprise.hidden = false; buildConstellation(); setDate(); surprise.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' }); }); }
    return { init, enterViaHush };
  })();

  const Sound = (() => {
    const button = qs('#sound-toggle'), audio = qs('#ambient-audio'); let enabled = false;
    function init() { button.addEventListener('click', () => { enabled = !enabled; button.setAttribute('aria-pressed', String(enabled)); if (enabled) { audio.volume = 0.35; audio.play().catch(() => { enabled = false; button.setAttribute('aria-pressed', 'false'); }); } else audio.pause(); }); }
    return { init };
  })();

  function updatePersonalizedCopy() {
    const photoCaption = qs('[data-photo-caption]'), storyIntroKicker = qs('.story-kicker'), nameReveal = qsa('.name-reveal span'), preLine = qs('.pre-line'), mysteryLine = qs('.mystery-line'), finalEyebrow = qs('.final-eyebrow');
    if (photoCaption) photoCaption.textContent = SITE_CONFIG.photoCaption;
    if (storyIntroKicker) storyIntroKicker.textContent = SITE_CONFIG.introHeader;
    if (preLine) preLine.textContent = SITE_CONFIG.openingLine;
    if (mysteryLine) mysteryLine.textContent = 'I made something for us, and I hope it feels like a secret worth keeping.';
    if (finalEyebrow) finalEyebrow.textContent = `for ${SITE_CONFIG.name} —`;
    const nameParts = SITE_CONFIG.name.split(' '); if (nameParts.length > 1) { nameReveal[0].textContent = nameParts[0]; nameReveal[1].textContent = nameParts[1]; }
    document.title = SITE_CONFIG.name;
    document.querySelectorAll('img[src="assets/images/our-photo.jpg"]').forEach((img) => { img.src = SITE_CONFIG.photo; img.alt = `A memory of ${SITE_CONFIG.name}`; });
    qsa('#final-message p').forEach((p, index) => { if (SITE_CONFIG.finalMessage[index]) p.textContent = SITE_CONFIG.finalMessage[index]; });
    const finalChoiceText = qs('.final-question-panel h3'); if (finalChoiceText) finalChoiceText.textContent = SITE_CONFIG.finalQuestion;
    const surpriseLine = qs('.surprise-line'); if (surpriseLine) surpriseLine.textContent = SITE_CONFIG.secretMessage;
  }

  function bindPhotoModal() {
    const modal = qs('#photo-modal'), closeButton = qs('#photo-modal-close'), cards = qsa('[data-photo-card]');
    const openModal = () => { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); };
    const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
    cards.forEach((card) => card.addEventListener('click', openModal)); closeButton.addEventListener('click', closeModal); modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); }); window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  function bindPhotoUpload() {
    const input = qs('#photo-input'), status = qs('#upload-status'); if (!input) return;
    input.addEventListener('change', (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { const base64Data = e.target.result; localStorage.setItem('arpiataPhotoData', base64Data); status.textContent = '✓ Photo saved!'; status.style.color = 'var(--gold-bright)'; qsa('img[src="assets/images/our-photo.jpg"]').forEach((img) => { img.src = base64Data; }); setTimeout(() => { input.value = ''; status.textContent = ''; }, 2500); }; reader.readAsDataURL(file); });
    const savedPhoto = localStorage.getItem('arpiataPhotoData'); if (savedPhoto) qsa('img[src="assets/images/our-photo.jpg"]').forEach((img) => { img.src = savedPhoto; });
  }

  document.addEventListener('DOMContentLoaded', () => { updatePersonalizedCopy(); bindPhotoModal(); bindPhotoUpload(); EmberField.init(); Glow.init(); Opening.init(); Journey.init(); Memory.render(); Future.render(); Final.init(); Sound.init(); });
})();
