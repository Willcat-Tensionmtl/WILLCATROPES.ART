/**
 * willcatropes.art — script.js
 * William Desjardins · Shibari Educator · Artist · Author
 *
 * ── CONTENTS ────────────────────────────────────────────────
 * 1.  DATA           levels, workshops, companions
 * 2.  ROLODEX        showLevel, showWorkshop, showCompanion
 * 3.  CAROUSEL       Pillars (B2), Companions / Levels / Workshops (mobile)
 * 4.  NAVIGATION     menu, WIP banner, nav scroll state
 * 5.  HTR GRID       9-square tab + hover interactions
 * 6.  PARALLAX       Hero + break section scroll parallax
 * 7.  SCROLL SHIMMER Hero side indicator
 * 8.  OBSERVERS      Fade-in, sec-id glint
 * 9.  LIGHTBOX       Universal — all media images, keyboard + click
 * 10. LIST SHIMMER   Idle rolodex list animation
 * ────────────────────────────────────────────────────────────
 */

'use strict';


/* ══════════════════════════════════════════════════════════
   1. DATA
   ══════════════════════════════════════════════════════════ */

var levels = {
  lvl0: {
    badge: 'Beige · Lvl 0',
    title: 'Neophyte',
    desc:  'You are brand new to rope. You may have attended a beginner class, but the terminology hasn\'t stuck yet — names of knots, frictions, or harnesses still feel foreign. You\'re exploring, curious, and starting to notice how rope moves and feels in your hands.',
    skills: '',
    goal:  'Mindset: explore · notice · stay curious'
  },
  lvl1: {
    badge: 'Green · Lvl 1',
    title: 'Beginner',
    desc:  'You\'ve started your journey and can tie basic patterns, though they\'re not yet fluid. You\'re learning structure, friction, and form. No uplines yet — your work stays grounded.',
    skills: 'Single column · Futomomo · Wrapping with intention · Batten-Dome · Taiko-Dome · Kannuki · Larkshead · Basic body manipulation · Rope care · Consent foundations',
    goal:  'Goal: consistency · coordination · safety basics · Mindset: experiment · make mistakes · stay curious'
  },
  lvl2: {
    badge: 'Red · Lvl 2',
    title: 'Intermediate',
    desc:  'Your floorwork and frictions are becoming fluid; rope moves through your hands with more confidence. Some patterns still challenge you, but you can complete them. You may or may not be doing suspensions yet, but you know how uplines work. At this stage, you begin to study the why. Nerve pathways, circulation, skeletal and muscular awareness should be integrated from this point onward.',
    skills: 'Gote · Body manipulation · Ladder ties · Nodome · Takedome · Hojo cuffs · Hishi frictions · Reverse tension · Wadome · Double column · Upline theory · Partial load awareness',
    goal:  'Goal: balance technique with safety and intention'
  },
  lvl3: {
    badge: 'Black · Lvl 3',
    title: 'Intermediate / Advanced',
    desc:  'You are executing full suspensions. You have solid grounding in previous material and can reproduce a harness from start to finish with accuracy and functionality. Your frictions are firm, your tensions precise. You may be eager to explore dynamic transitions, even if the mechanics aren\'t yet second nature.',
    skills: '',
    goal:  'Goal: refinement · precision · confidence under load · Mindset: mastery through awareness, not ego'
  },
  lvl4: {
    badge: 'Beige · Lvl 4',
    title: 'Advanced +',
    desc:  'You\'ve done your ten thousand hours and ten thousand frictions. Your style now shows through your rope, recognizable to others. You didn\'t invent your "own" style to avoid discipline; rather, your flair, approach, and interpretation speak for themselves.',
    skills: '',
    goal:  'Goal: expression · mentorship · evolution · Mindset: humility through mastery — the rope now ties you as much as you tie it'
  }
};



var workshops = {
  fundamentals: {
    title: 'Fundamentals — Where It Begins',
    desc:  'Safety, consent, core frictions, body awareness. The single column. The double column. Why knots matter and which ones to use when. This is not beginner content to get through — it is the foundation everything else is built on. Taught the same way to someone in their first month as to someone returning after years.',
    note:  'Entry point for all paths. Adaptable as a 3-hour intro or a full-day intensive. No prior experience required.'
  },
  foundations: {
    title: 'Foundations: A Philosophy of Rope in Practice',
    desc:  'Rope asks more of you than almost anyone warns: more technical, more intimate, more demanding of your attention. This day is not about collecting more ties. It is about adapting how you see, so that whatever you tie, you understand what you are doing while you do it.\n\nThe whole practice fits inside three shapes. The square is structure, the form repeated until it is reliable. The triangle is tension, the moment you choose a direction and answer for the consequence. The circle is flow, the return and the dialogue, adapting when the body in front of you is not the body you planned for. We build something simple, read it by feel, choose what to do with it, then let it move. None of it is advanced. All of it is the whole practice, the part you return to at every level.',
    note:  'Open level. No suspension experience required. Runs as a full day, for anyone with rope in their hands and the willingness to slow down.'
  },
  bodymech: {
    title: 'Body Manipulation — Moving Your Partner',
    desc:  'Weight shifting, balance disruption, knee-walking, entry and exit mechanics. The martial-arts informed movement vocabulary that underpins Nawajutsu and carries through every other path. You stop thinking about what to do next and start reading what the body is doing now. The difference between someone who ties on a body and someone who ties with one.',
    note:  'Can be taught as a 2-hour class, half-day, or full-day intensive. No partner required. Connects directly into Nawajutsu.'
  },
  gote: {
    title: 'Gote & the Creativity Framework',
    desc:  'The Gote is not a technique to memorize. It is a structure to think inside of. What decisions are you making at every wrap? What are you building toward? What does this position ask of the person wearing it, and are you paying attention to the answer? This class uses the Gote as a lens on creativity itself — applicable to every tie you learn after.',
    note:  'Prerequisite: single column and basic frictions. 3–6 hours depending on depth.'
  },
  tension: {
    title: 'Tension, Intention & Rope Handling',
    desc:  'The invisible work. How rope behaves under load. How intention changes the quality of contact before a single knot is tied. How the same wrap can feel like restraint or support depending entirely on the quality of attention behind it. This is where Seme begins — not in the tie, but in the decision to apply pressure at all.',
    note:  'Adaptable to all levels. Works as a standalone or woven into any other workshop. No prerequisites.'
  },
  safety: {
    title: 'Safety as Practice — Physical & Emotional',
    desc:  'Not a disclaimer. Not a checklist at the front of class that everyone agrees to and forgets. Safety woven into every decision, at every level of the work. Nerve mapping and compression as context for every tie in your repertoire. Vasovagal response, circulation, altered states — what they look like, what they ask of you. Consent not as a gate but as an ongoing conversation that never fully closes.',
    note:  'Based on the Red and Yellow sections of Fundamentals. Can be extracted as a 3-hour focused session or expanded to a full-day intensive for experienced practitioners.'
  },
  nawajutsu: {
    title: 'Nawajutsu — Rope as Martial Discipline',
    desc:  'The martial path through rope. Movement, disruption, balance, pressure — not decoration, not suspension, not spectacle. Nawajutsu is about what happens between two people before anything is secured. Entry, transition, control, release. Drawing from body mechanics, Seme, and the martial arts tradition that shaped the early development of this practice. You learn to move someone, to feel initiative, to work with and against resistance in a way that is both safe and honest about what it is.',
    note:  'Prerequisite: Fundamentals plus Body Manipulation or equivalent movement background. This is its own path. Intermediate and advanced versions available.'
  },
  partial: {
    title: 'Partial Suspension & Static Work',
    desc:  'Position-based work — face up, face down, side, seated, kneeling, standing. Load paths that begin on the floor and learn to carry partial weight before anything leaves the ground entirely. The full body treated as a structural map. No one leaves having done a pretty tie they cannot replicate safely or explain. Structural understanding first. The aesthetic follows.',
    note:  'Prerequisite: solid Fundamentals + Floorplay equivalent. Extractable from the 9-class curriculum as a workshop or intensive. Leads directly into Suspension.'
  },
  suspension: {
    title: 'Suspension & Dynamics',
    desc:  'The geometry of a suspension is not a puzzle to solve. It is the physical expression of a dynamic that was either built across the whole session or wasn\'t. Load paths, anchor geometry, body positioning, transitions — all of it follows from what is already happening between two people before the first rope goes on. This class works both directions at once: the technical and the relational. You will not get one without the other here.',
    note:  'Serious prerequisites required. Contact before requesting. Not the first Suspension class to take — one of the last.'
  },
  loadpaths: {
    title: 'Living Structures: Load Paths in Motion',
    desc:  'Every tie is a structure, and every structure has a path that force travels through: into the body, along the lines, through the frictions, out to the floor or the point. Most people only see that path when it fails. This weekend is about seeing and feeling it before it does, testing it on purpose, then playing with it on purpose.\n\n□ Square: identify and establish. Build structures that can be read through touch. Which lines carry weight, which only look good. Locate where force enters and where it leaves, and build the path until it is reliable and known rather than hoped for. Kata first; you cannot play with a path you cannot yet draw.\n\n△ Triangle: test and stress. Load deliberately and find the edges. Leverage used to redirect force rather than fight it, the moment where forces meet and something has to give. A line that carries weight can carry torment, so the same path that serves the structure also serves seme.\n\n○ Circle: play and adapt. Floor into partials, partials into floating, dynamic throughout. Active and passive positioning, living structures built through leverage, locking, and weight migration.',
    note:  'A 12-hour weekend intensive. Intermediate to advanced: solid in frictions, partials, uplines, and load work. Includes the foundations for integrating bamboo and similar objects.'
  },
  intentionality: {
    title: 'Rope Intentionality & Emotional Connection',
    desc:  'The part of rope that technique alone cannot produce. Presence, pacing, the quality of attention that turns a well-executed tie into something that actually matters to the person wearing it. How to build trust before a single rope goes on. How to listen with your hands. What aftercare actually is and why it is part of the session, not the end of it. This class is not soft. It is the hardest thing to teach and the most frequently skipped.',
    note:  'Suitable for any level. Often the class people say shifted something they had been stuck on for years.'
  },
  semenawa: {
    title: 'Semenawa — Suffering and the Art of Pressure',
    desc:  'Semenawa is the rope of torment — the tradition of using rope to create a specific kind of physical and psychological pressure that is negotiated, consensual, and deeply demanding of skill from both people. Not decoration. Not suspension. The deliberate use of friction, position, and progressive tightening to bring someone into a particular state. This class covers the history, the ethics, the technical elements, and the significant responsibility that comes with working at this edge.',
    note:  'Advanced. Prerequisites required — contact to discuss readiness. This is not a beginner class framed as intermediate. Both Tori and Uke experience addressed.'
  },
  do: {
    title: 'The Dō — Rope as Path, Not Ladder',
    desc:  'Not a technique class. A framework class. Why does the colour system exist if there is no rank? What does it mean to return to Beige? Why do some people plateau and others don\'t? The Dō addresses the part of the practice that no single technique class covers: how you walk the path over time, what are you avoiding, what do you not know about, and whether your goals are honest ones. Could potentially be the most disruptive class people can take; not because it is difficult but because it asks questions you might not be prepared for.',
    note:  'Works at any level. Frequently requested as an opening session before a residential or intensive program.'
  },
  festival: {
    title: 'Festival Speakers & Demonstrations',
    desc:  'Atada, no callada — Que No Puede Verse Ni Censurarse. Bound, not silenced. What cannot be seen or censored.\n\nA Shibari demonstration at AEFEST LATAM (Festival Internacional de Artes Eróticas), Bogotá, August 2026. Theme: censorship. Rope as the thing meant to capture, used as an expression of... everything. Every context shapes the work. The knots are the same; the meaning is not.',
    note:  'Available for festival appearances, speaker slots, and demonstrations worldwide. Context shapes the work — bring the brief.'
  },
  other: {
    title: 'Something else entirely.',
    desc:  'You don\'t know what you need? That is the most honest place to start. Tell me where you are, what has been missing, what you have tried that didn\'t land. We will figure out what the class actually is. Most of the best workshops I have taught started with someone saying they weren\'t sure what they were looking for.',
    note:  '→ Get in touch.'
  }
};

var companions = {
  do:          { kanji: '道',       name: 'Dō',            reading: 'The Way · The Path',                desc: 'A path to be walked, not a destination to be reached. Dō implies that the practice itself is the point, not what it produces. You are always on the path. You never arrive.',                                                                                                                                                                          rope: 'In rope: every session is the practice. There is no graduation from beginner. There is only the path, and how honestly you walk it.' },
  kaizen:      { kanji: '改善',     name: 'Kaizen',        reading: 'Continuous improvement',             desc: 'Small, consistent improvement over time. Not revolution but evolution. The discipline of looking at what is, asking what it could be, and making one step toward it.',                                                                                                                                                                                rope: 'In rope: technique does not plateau, it deepens. Kaizen means returning to fundamentals not because you failed but because you understand them more now than before.' },
  ikigai:      { kanji: '生き甲斐', name: 'Ikigai',        reading: 'Reason for being',                  desc: 'The intersection of what you love, what you are good at, what the world needs, and what sustains you. Not a career framework. A question to sit with honestly.',                                                                                                                                                                                     rope: 'In rope: why are you here? What does this give you that nothing else does? Ikigai is not an excuse to avoid hard questions. It is the reason you answer them.' },
  shoshin:     { kanji: '初心',     name: 'Shoshin',       reading: "Beginner's mind",                   desc: "Approaching the familiar with the openness of someone encountering it for the first time. The expert's greatest danger is certainty. Shoshin is the antidote.",                                                                                                                                                                                    rope: 'In rope: the technique you have tied a thousand times still has something to teach you. Shoshin keeps the door open.' },
  shuhari:     { kanji: '守破離',   name: 'Shu-Ha-Ri',     reading: 'Follow · Break · Transcend',        desc: 'Three stages of mastery. First follow the rules exactly. Then understand them deeply enough to bend them. Finally move beyond them into your own expression. Each stage requires the last.',                                                                                                                                                          rope: 'In rope: you cannot transcend what you never learned. The improvisation that looks effortless was built on thousands of hours of strict repetition.' },
  wabisabi:    { kanji: '侘寂',     name: 'Wabi-Sabi',     reading: 'Impermanence · Incompleteness',     desc: 'Beauty in imperfection, impermanence, and incompleteness. The crack in the bowl. The asymmetry in the knot. Wabi-sabi refuses the tyranny of the perfect.',                                                                                                                                                                                        rope: 'In rope: the asymmetrical tie, the improvised adjustment, the mark left behind. None of it is a mistake. It is the evidence of something that actually happened.' },
  mononoaware: { kanji: '物の哀れ', name: 'Mono no Aware', reading: 'The pathos of things',              desc: 'The gentle sadness of impermanence. The beauty that is inseparable from the knowledge that it will end. Mono no aware is not despair. It is presence.',                                                                                                                                                                                             rope: 'In rope: the suspension that ends, the scene that closes, the partner you will not tie again. Mono no aware is why it matters that you were there for all of it.' },
  shikataganai:{ kanji: '仕方がない',name: 'Shikata ga nai',reading: 'It cannot be helped',              desc: 'Acceptance of what cannot be changed without surrender of responsibility for what can. Not fatalism. The wisdom to stop fighting what is already done and redirect energy to what is still possible.',                                                                                                                                                  rope: 'In rope: a nerve incident. A canceled event. A relationship that ends. Shikata ga nai is not indifference. It is how you stay functional when the unexpected arrives.' },
  gaman:       { kanji: '我慢',     name: 'Gaman',         reading: 'Endurance · Patience',              desc: 'The quiet endurance of difficulty without complaint. Not martyrdom. The internal discipline that does not demand recognition for every effort made.',                                                                                                                                                                                                 rope: 'In rope: the long learning curve, the slow building of trust, the patience required to be Uke and to be Tori. Gaman is what keeps you on the path when nothing is glamorous yet.' },
  ichigoichie: { kanji: '一期一会', name: 'Ichi-go ichi-e',reading: 'One time · One meeting',            desc: 'This moment will not come again. The person across from you today is not the same person you will tie tomorrow. Every encounter is singular and unrepeatable.',                                                                                                                                                                                       rope: 'In rope: full presence is not optional. The scene happening now has never happened before and will never happen again. Ichi-go ichi-e is why you put the phone down.' },
  ma:          { kanji: '間',       name: 'Ma',            reading: 'Negative space · Pause · Interval', desc: 'The space between. The pause in music that gives the notes meaning. The emptiness in the bowl that makes it useful. Ma is not absence, it is structure.',                                                                                                                                                                                          rope: 'In rope: the stillness between transitions, the breath before the next tie, the silence that holds the scene together. Ma is not wasted time. It is the shape of attention.' },
  sennosen:    { kanji: '先の先',   name: 'Sen no Sen',    reading: 'Initiative within initiative',      desc: 'From kenjutsu: responding to an attack before it is fully launched by reading the intention behind it. Anticipation so refined it appears to be simultaneous.',                                                                                                                                                                                      rope: 'In rope: reading a shift in the body before the person speaks. Feeling the approach of distress before it becomes distress. Sen no Sen is why experienced riggers seem to know before being told.' },
  mushin:      { kanji: '無心',     name: 'Mushin',        reading: 'No mind · Empty mind',              desc: 'The state in which the mind does not attach to any single thought, allowing complete responsiveness to what is. Not emptiness but fluidity. The expert acts without deliberating.',                                                                                                                                                                   rope: 'In rope: when the technique no longer requires conscious direction, what is left is pure attention to the person in front of you. Mushin is not the absence of skill. It is skill so fully integrated that it disappears.' }
};

/* ══════════════════════════════════════════════════════════
   2. ROLODEX
   ══════════════════════════════════════════════════════════ */

function pulseShimmer(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.transition = 'none';
  el.style.left       = '-30%';
  el.style.opacity    = '0';
  void el.offsetWidth;
  el.style.transition = 'left .7s ease-out, opacity .15s ease-out';
  el.style.opacity    = '1';
  el.style.left       = '110%';
  setTimeout(function() { el.style.opacity = '0'; }, 600);
}

function fadeInContent(el) {
  if (!el) return;
  el.style.display = 'block';
  el.style.opacity = '0';
  setTimeout(function() {
    el.style.transition = 'opacity .3s';
    el.style.opacity    = '1';
  }, 10);
}

function showLevel(id) {
  var l = levels[id];
  if (!l) return;
  pulseShimmer('levels-line-shimmer');
  document.querySelectorAll('.level-item').forEach(function(t) { t.classList.remove('active'); });
  var active = document.querySelector('.level-item[data-id="' + id + '"]');
  if (active) active.classList.add('active');
  document.getElementById('level-badge').textContent  = l.badge;
  document.getElementById('level-title').textContent  = l.title;
  document.getElementById('level-desc').textContent   = l.desc;
  document.getElementById('level-skills').textContent = l.skills;
  document.getElementById('level-goal').textContent   = l.goal;
  document.querySelectorAll('#level-icon img').forEach(function(img) {
    img.style.display = img.dataset.level === id ? 'block' : 'none';
  });
  document.getElementById('level-empty').style.display = 'none';
  document.getElementById('level-card').classList.remove('card-idle');
  fadeInContent(document.getElementById('level-content'));
}

function showWorkshop(id) {
  var w = workshops[id];
  if (!w) return;
  pulseShimmer('companions-line-shimmer');
  document.querySelectorAll('.workshop-item').forEach(function(t) { t.classList.remove('active'); });
  var active = document.querySelector('.workshop-item[data-id="' + id + '"]');
  if (active) active.classList.add('active');
  document.getElementById('workshop-title').textContent = w.title;
  document.getElementById('workshop-desc').innerHTML = w.desc.split('\n\n').map(function(p) {
    return '<span style="display:block;margin-bottom:.75rem">' + p + '</span>';
  }).join('');
  document.getElementById('workshop-note').textContent = w.note;
  document.getElementById('workshop-empty').style.display = 'none';
  document.getElementById('workshop-card').classList.remove('card-idle');
  fadeInContent(document.getElementById('workshop-content'));
  if (id === 'other') {
    setTimeout(function() {
      document.getElementById('workshop-note').innerHTML =
        '<a href="#contact" style="color:var(--rope-l);text-decoration:none;letter-spacing:.1em">→ Work with me</a>';
    }, 350);
  }
}

function showCompanion(id) {
  var c = companions[id];
  if (!c) return;
  pulseShimmer('companions-line-shimmer');
  document.querySelectorAll('.rolodex-item').forEach(function(t) { t.classList.remove('active'); });
  var active = document.querySelector('.rolodex-item[data-id="' + id + '"]');
  if (active) active.classList.add('active');
  document.getElementById('companion-kanji').textContent   = c.kanji;
  document.getElementById('companion-name').textContent    = c.name;
  document.getElementById('companion-reading').textContent = c.reading;
  document.getElementById('companion-desc').textContent    = c.desc;
  document.getElementById('companion-rope').textContent    = c.rope;
  document.getElementById('companion-empty').style.display = 'none';
  document.getElementById('companion-card').classList.remove('card-idle');
  fadeInContent(document.getElementById('companion-content'));
}

/* Delegated listener — companions */
(function() {
  var list = document.getElementById('companions-tags');
  if (!list) return;
  list.addEventListener('click', function(e) {
    var item = e.target.closest('.rolodex-item');
    if (item && item.dataset.id) showCompanion(item.dataset.id);
  });
})();

/* Delegated listener — levels */
(function() {
  var list = document.getElementById('level-list');
  if (!list) return;
  list.addEventListener('click', function(e) {
    var item = e.target.closest('.level-item');
    if (item && item.dataset.id) showLevel(item.dataset.id);
  });
})();

/* Delegated listener — workshops */
(function() {
  var list = document.getElementById('workshop-list');
  if (!list) return;
  list.addEventListener('click', function(e) {
    var item = e.target.closest('.workshop-item');
    if (item && item.dataset.id) showWorkshop(item.dataset.id);
  });
})();


/* ══════════════════════════════════════════════════════════
   3. CAROUSEL
   ══════════════════════════════════════════════════════════ */

/* ── A1 Pillars carousel (desktop rolodex, mobile swipe) ── */
var pillarsIndex = 0;

var pillarsLabels = ['Aesthetics', 'Purpose', 'Connection'];

function pillarsGo(n) {
  pillarsIndex = Math.max(0, Math.min(n, 2));
  var inner = document.getElementById('pillars-inner');
  if (!inner) return;
  inner.style.transform = 'translateX(-' + (pillarsIndex * 100) + '%)';
  var label = document.getElementById('pillars-label');
  if (label) label.textContent = pillarsLabels[pillarsIndex];

  /* Trigger ghost SVG trace on active slide */
  inner.querySelectorAll('.pillars-slide').forEach(function(slide) {
    slide.classList.remove('pillars-slide--active');
    var shape = slide.querySelector('.ghost-svg rect, .ghost-svg polygon, .ghost-svg circle');
    if (shape) {
      shape.style.animation = 'none';
      void shape.offsetWidth;
      shape.style.animation = '';
    }
  });
  var activeSlide = inner.querySelectorAll('.pillars-slide')[pillarsIndex];
  if (activeSlide) activeSlide.classList.add('pillars-slide--active');
}

(function() {
  document.querySelectorAll('[data-pillars-prev]').forEach(function(btn) {
    btn.addEventListener('click', function() { pillarsGo(pillarsIndex - 1); });
  });
  document.querySelectorAll('[data-pillars-next]').forEach(function(btn) {
    btn.addEventListener('click', function() { pillarsGo(pillarsIndex + 1); });
  });

  /* Touch swipe */
  var el = document.getElementById('pillars-inner');
  if (!el) return;
  var startX = 0;
  el.parentElement.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  el.parentElement.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) pillarsGo(pillarsIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();

/* ── A1 Shape cards carousel (mobile) ── */
var carouselIndex = 0;
var carouselTotal = 3;

var carouselLabels = ['Structure', 'Tension', 'Flow'];

function carouselGo(n) {
  carouselIndex = Math.max(0, Math.min(n, carouselTotal - 1));
  var inner = document.getElementById('carousel-inner');
  if (!inner) return;
  inner.style.transform = 'translateX(-' + (carouselIndex * 100) + '%)';
  document.querySelectorAll('.c-dot').forEach(function(d, i) {
    d.style.width      = i === carouselIndex ? '20px' : '8px';
    d.style.background = i === carouselIndex ? '#c9a84c' : 'rgba(201,168,76,.25)';
  });
  var lbl = document.getElementById('carousel-label');
  if (lbl) lbl.textContent = carouselLabels[carouselIndex];
}

function carouselNext() { if (carouselIndex < carouselTotal - 1) carouselGo(carouselIndex + 1); }
function carouselPrev() { if (carouselIndex > 0) carouselGo(carouselIndex - 1); }

/* Lock carousel track to tallest slide height — prevents jump on swipe */

/* Fire carouselGo(0) and pillarsGo(0) when carousels first become visible */
(function() {
  var firedA1 = false;
  var firedPillars = false;
  function activate() {
    var carousel = document.querySelector('.a1-carousel');
    if (!firedA1 && carousel && getComputedStyle(carousel).display !== 'none') {
      firedA1 = true;
      carouselGo(0);
    }
    var pillars = document.querySelector('.pillars-carousel');
    if (!firedPillars && pillars && getComputedStyle(pillars).display !== 'none') {
      firedPillars = true;
      pillarsGo(0);
    }
  }
  window.addEventListener('scroll', activate, { passive: true });
  window.addEventListener('resize', activate, { passive: true });
  activate();
  setTimeout(activate, 500);
})();


(function() {
  /* Prev / next buttons */
  document.querySelectorAll('[data-carousel-prev]').forEach(function(btn) {
    btn.addEventListener('click', carouselPrev);
  });
  document.querySelectorAll('[data-carousel-next]').forEach(function(btn) {
    btn.addEventListener('click', carouselNext);
  });

  /* Dot clicks — delegated via data-index */
  var dotsEl = document.getElementById('carousel-dots');
  if (dotsEl) {
    dotsEl.addEventListener('click', function(e) {
      var dot = e.target.closest('.c-dot');
      if (dot && dot.dataset.index !== undefined) carouselGo(parseInt(dot.dataset.index, 10));
    });
  }
})();

/* ── Rolodex carousels (mobile replacement) ── */
window.rlxGo = function(id, idx) {
  var wrap = document.getElementById(id + '-carousel');
  if (!wrap) return;
  wrap._idx = Math.max(0, Math.min(idx, wrap._total - 1));
  var inner = document.getElementById(id + '-inner');
  if (inner) inner.style.transform = 'translateX(-' + (wrap._idx * 100) + '%)';
  document.querySelectorAll('#' + id + '-dots .rlx-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === wrap._idx);
  });
  var menu = document.getElementById(id + '-ddmenu');
  if (menu) menu.querySelectorAll('.rlx-dd-item').forEach(function(d, i) {
    d.classList.toggle('active', i === wrap._idx);
  });
};

window.rlxPrev = function(id) {
  var w = document.getElementById(id + '-carousel');
  if (w) rlxGo(id, w._idx > 0 ? w._idx - 1 : w._total - 1);
};

window.rlxNext = function(id) {
  var w = document.getElementById(id + '-carousel');
  if (w) rlxGo(id, w._idx < w._total - 1 ? w._idx + 1 : 0);
};

/* Close dropdowns on outside click */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.rlx-dropdown')) {
    document.querySelectorAll('.rlx-dd-menu.open').forEach(function(m) {
      m.classList.remove('open');
    });
  }
});

/* Touch swipe on rolodex carousels */
document.addEventListener('touchstart', function(e) {
  var c = e.target.closest('.rolodex-carousel');
  if (c) c._touchX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
  var c = e.target.closest('.rolodex-carousel');
  if (!c || c._touchX === undefined) return;
  var dx = e.changedTouches[0].clientX - c._touchX;
  var id = c.id.replace('-carousel', '');
  if (Math.abs(dx) > 40) { dx < 0 ? rlxNext(id) : rlxPrev(id); }
  c._touchX = undefined;
}, { passive: true });

/* Carousel builder — no inline onclick strings */
(function() {
  function buildCarousel(id, slides, targetId) {
    var target = document.getElementById(targetId);
    if (!target) return;

    var wrap = document.createElement('div');
    wrap.className = 'rolodex-carousel';
    wrap.id = id + '-carousel';

    /* Dots */
    var dotsDiv = document.createElement('div');
    dotsDiv.className = 'rlx-dots';
    dotsDiv.id = id + '-dots';
    slides.forEach(function(_, i) {
      var dot = document.createElement('span');
      dot.className = 'rlx-dot' + (i === 0 ? ' active' : '');
      dot.dataset.idx = i;
      dot.addEventListener('click', function() { rlxGo(id, i); });
      dotsDiv.appendChild(dot);
    });

    /* Dropdown */
    var ddMenu = document.createElement('div');
    ddMenu.className = 'rlx-dd-menu';
    ddMenu.id = id + '-ddmenu';
    slides.forEach(function(s, i) {
      var m = s.match(/class="rlx-title"[^>]*>([^<]+)</);
      var label = m ? m[1] : String(i + 1);
      var btn = document.createElement('button');
      btn.className = 'rlx-dd-item' + (i === 0 ? ' active' : '');
      btn.textContent = label;
      btn.addEventListener('click', function() {
        rlxGo(id, i);
        ddMenu.classList.remove('open');
      });
      ddMenu.appendChild(btn);
    });

    var ddBtn = document.createElement('button');
    ddBtn.className = 'rlx-dd-btn';
    ddBtn.setAttribute('aria-label', 'Jump to');
    ddBtn.innerHTML = '<svg viewBox="0 0 8 5" fill="none" width="8" height="5"><polyline points="1,1 4,4 7,1" stroke="#c9a84c" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/></svg>';
    ddBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      ddMenu.classList.toggle('open');
    });

    var ddWrap = document.createElement('div');
    ddWrap.className = 'rlx-dropdown';
    ddWrap.appendChild(ddBtn);
    ddWrap.appendChild(ddMenu);

    var dotsCol = document.createElement('div');
    dotsCol.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px';
    dotsCol.appendChild(dotsDiv);
    dotsCol.appendChild(ddWrap);

    var prevBtn = document.createElement('button');
    prevBtn.className = 'rlx-btn';
    prevBtn.textContent = '←';
    prevBtn.addEventListener('click', function() { rlxPrev(id); });

    var nextBtn = document.createElement('button');
    nextBtn.className = 'rlx-btn';
    nextBtn.textContent = '→';
    nextBtn.addEventListener('click', function() { rlxNext(id); });

    var nav = document.createElement('div');
    nav.className = 'rlx-nav';
    nav.appendChild(prevBtn);
    nav.appendChild(dotsCol);
    nav.appendChild(nextBtn);

    var inner = document.createElement('div');
    inner.className = 'rlx-inner';
    inner.id = id + '-inner';
    slides.forEach(function(s) {
      var slide = document.createElement('div');
      slide.className = 'rlx-slide';
      slide.innerHTML = s;
      inner.appendChild(slide);
    });

    var track = document.createElement('div');
    track.className = 'rlx-track';
    track.appendChild(inner);

    wrap.appendChild(nav);
    wrap.appendChild(track);

    var title = document.getElementById(targetId + '-carousel-title');
    var ref = title || target;
    ref.parentNode.insertBefore(wrap, ref.nextSibling);

    wrap._idx   = 0;
    wrap._total = slides.length;
  }


  var companionOrder = ['do','ikigai','shuhari','ma','kaizen','shoshin','gaman','wabisabi','ichigoichie','shikataganai','mononoaware','sennosen','mushin'];
  var compIntro = document.getElementById('companion-intro');
  buildCarousel('companions', (compIntro ? ['<div style="text-align:center;padding:.5rem 0 1.5rem">' +
      '<span class="rlx-kanji">道</span>' +
      '<p class="rlx-desc">' + compIntro.innerHTML + '</p>' +
    '</div>'] : []).concat(companionOrder.map(function(key) {
    var c = companions[key];
    if (!c) return '';
    return '<div style="text-align:center;padding:.5rem 0 1.5rem">' +
      '<span class="rlx-kanji">' + c.kanji + '</span>' +
      '<div class="rlx-title">' + c.name + '</div>' +
      '<span class="rlx-reading">' + c.reading + '</span>' +
      '<p class="rlx-desc">' + c.desc + '</p>' +
      '<p class="rlx-note">' + c.rope + '</p>' +
    '</div>';
  })), 'companions-wrapper');

  var levelOrder = ['lvl0','lvl1','lvl2','lvl3','lvl4'];
  buildCarousel('levels', levelOrder.map(function(key) {
    var l = levels[key];
    if (!l) return '';
    var iconSrc = { lvl0:'img/Lvl_0_Neophyte.webp', lvl1:'img/Lvl_1_Beginner.webp', lvl2:'img/Lvl_2_Intermediate.webp', lvl3:'img/Lvl_3_Advanced.webp', lvl4:'img/Lvl_4_AdvancedPlus.webp' };
    return '<div style="text-align:center;padding:.5rem 0 1.5rem">' +
      '<img src="' + (iconSrc[key]||'') + '" class="level-img" style="margin:0 auto .75rem;display:block;" alt="' + l.title + '">' +
      '<div class="rlx-reading">' + (l.badge || '') + '</div>' +
      '<div class="rlx-title">' + l.title + '</div>' +
      '<p class="rlx-desc" style="margin-top:.75rem">' + l.desc + '</p>' +
      '<p class="rlx-note">' + (l.skills || '') + '</p>' +
    '</div>';
  }), 'level-grid');

  var workshopOrder = ['fundamentals','foundations','bodymech','gote','tension','safety','nawajutsu','partial','suspension','loadpaths','intentionality','semenawa','do','festival','other'];
  buildCarousel('workshops', workshopOrder.map(function(key) {
    var w = workshops[key];
    if (!w) return '';
    return '<div style="padding:.5rem 0 1.5rem">' +
      '<div class="rlx-title" style="margin-bottom:.75rem">' + w.title + '</div>' +
      '<p class="rlx-desc">' + w.desc.replace(/\n\n/g, '<br><br>') + '</p>' +
      '<p class="rlx-note">' + w.note + '</p>' +
    '</div>';
  }), 'workshop-grid');

  // Companions open on the intro text in #companion-empty (no random pick).
  // Workshops still open on a random pick instead of an empty prompt.
  var wPool = workshopOrder.filter(function (k) { return k !== 'other'; });
  var pickW = wPool[Math.floor(Math.random() * wPool.length)];
  if (pickW && typeof showWorkshop === 'function') showWorkshop(pickW);
})();


/* ══════════════════════════════════════════════════════════
   4. NAVIGATION
   ══════════════════════════════════════════════════════════ */

function openMenu() {
  var menu = document.getElementById('nav-menu');
  if (!menu) return;
  menu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  var menu = document.getElementById('nav-menu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMenu() {
  var menu = document.getElementById('nav-menu');
  if (!menu) return;
  menu.classList.contains('open') ? closeMenu() : openMenu();
}

(function() {
  /* Menu button opens */
  var btn = document.getElementById('menu-btn');
  if (btn) btn.addEventListener('click', toggleMenu);

  /* Overlay click closes — but only if click landed on overlay, not panel */
  var overlay = document.getElementById('nav-menu');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeMenu();
    });
  }

  /* Close button */
  var closeBtn = document.querySelector('.nav-menu__close');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  /* Nav links — close menu on any anchor click */
  var nav = document.querySelector('#nav-menu-panel nav');
  if (nav) {
    nav.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }
})();

/* WIP banner */
(function() {
  var banner  = document.getElementById('wip');
  var spacer  = document.getElementById('wip-spacer');
  var dismiss = document.getElementById('wip-dismiss');
  if (!banner || !dismiss) return;

  function setNavTop() {
    var nav = document.querySelector('.site-nav');
    var menu = document.getElementById('nav-menu');
    var bannerVisible = banner.style.display !== 'none';
    var offset = bannerVisible ? banner.offsetHeight + 'px' : '0';
    if (nav) nav.style.top = offset;
    if (menu) menu.style.top = offset;
  }

  dismiss.addEventListener('click', function() {
    banner.style.display = 'none';
    if (spacer) spacer.style.height = '0';
    setNavTop();
  });

  setNavTop();
  setTimeout(setNavTop, 100);
  window.addEventListener('resize', setNavTop, { passive: true });
  window.addEventListener('resize', setNavTop);
})();

/* Nav stays transparent — no scroll state */


/* ══════════════════════════════════════════════════════════
   5. HTR GRID
   ══════════════════════════════════════════════════════════ */

function htrShow(slide, axis) {
  var pillarView  = document.getElementById(slide + '-view-pillar');
  var contextView = document.getElementById(slide + '-view-context');
  var pillarBtn   = document.getElementById(slide + '-btn-pillar');
  var contextBtn  = document.getElementById(slide + '-btn-context');
  if (!pillarView || !contextView) return;

  if (axis === 'pillar') {
    pillarView.classList.add('htr-view--active');
    contextView.classList.remove('htr-view--active');
    pillarBtn.classList.add('htr-tab-btn--active');
    pillarBtn.classList.remove('htr-tab-btn--inactive');
    contextBtn.classList.add('htr-tab-btn--inactive');
    contextBtn.classList.remove('htr-tab-btn--active');
  } else {
    contextView.classList.add('htr-view--active');
    pillarView.classList.remove('htr-view--active');
    contextBtn.classList.add('htr-tab-btn--active');
    contextBtn.classList.remove('htr-tab-btn--inactive');
    pillarBtn.classList.add('htr-tab-btn--inactive');
    pillarBtn.classList.remove('htr-tab-btn--active');
  }
}

/* Delegated HTR tab buttons */
(function() {
  ['sq', 'tri', 'circ'].forEach(function(slide) {
    var pillarBtn  = document.getElementById(slide + '-btn-pillar');
    var contextBtn = document.getElementById(slide + '-btn-context');
    if (pillarBtn)  pillarBtn.addEventListener('click',  function() { htrShow(slide, 'pillar'); });
    if (contextBtn) contextBtn.addEventListener('click', function() { htrShow(slide, 'context'); });
  });
})();

/* HTR row/col hover */
(function() {
  var grid = document.getElementById('htr-grid');
  if (!grid) return;
  var cells = Array.from(grid.children);
  cells.forEach(function(cell, i) {
    cell.addEventListener('mouseenter', function() {
      var col = i % 3;
      var row = Math.floor(i / 3);
      cells.forEach(function(c, j) {
        if (j % 3 === col && j !== i) c.classList.add('htr-col');
      });
      var rowStart = row * 3;
      for (var j = rowStart; j < rowStart + 3; j++) {
        if (cells[j]) cells[j].classList.add('htr-row-active');
      }
    });
    cell.addEventListener('mouseleave', function() {
      cells.forEach(function(c) { c.classList.remove('htr-col', 'htr-row-active'); });
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   6. PARALLAX
   ══════════════════════════════════════════════════════════ */

(function() {
  var heroBg = document.querySelector('.hero__bg');
  var brkBgs = document.querySelectorAll('.brk__bg');

  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    if (heroBg) heroBg.style.transform = 'translateY(' + (sy * 0.25) + 'px)';
    brkBgs.forEach(function(bg) {
      var rect = bg.closest('.brk').getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var center = rect.top + rect.height / 2 - window.innerHeight / 2;
        bg.style.transform = 'translateY(' + (center * 0.25) + 'px)';
      }
    });
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════
   7. SCROLL SHIMMER
   ══════════════════════════════════════════════════════════ */

(function() {
  var shimmer = document.getElementById('scroll-shimmer');
  var hero    = document.querySelector('.hero');
  if (!shimmer || !hero) return;

  window.addEventListener('scroll', function() {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var past = window.scrollY > heroBottom - 100;
    shimmer.style.opacity       = past ? '0' : '1';
    shimmer.style.pointerEvents = past ? 'none' : '';
  }, { passive: true });

  /* Align shimmer under menu button */
  function positionShimmer() {
    var btn = document.getElementById('menu-btn');
    if (!btn) return;
    var rect    = btn.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    shimmer.style.right = 'auto';
    shimmer.style.left  = (centerX - 1) + 'px';
  }
  positionShimmer();
  window.addEventListener('resize', positionShimmer);
})();


/* ══════════════════════════════════════════════════════════
   8. OBSERVERS
   ══════════════════════════════════════════════════════════ */

var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.fade-in').forEach(function(el) {
  fadeObserver.observe(el);
});

var glintObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var el = e.target;
      el.classList.add('glint');
      glintObserver.unobserve(el);
      setTimeout(function() { el.classList.remove('glint'); }, 2500);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sec-id').forEach(function(el) {
  glintObserver.observe(el);
});


/* F1 rows — rising shimmer class */
(function() {
  document.querySelectorAll('#F2 .rate-card, #F2 [style*="border:.5px solid rgba(169,124,26"]').forEach(function(el) {
    el.classList.add('f1-row');
  });
})();

/* Pillar cards — class, cursor, ghost SVG, click to scroll to break section */
(function() {
  var pillarLinks = ['#break-sq', '#break-tri', '#break-circ'];
  document.querySelectorAll('#pillars-grid > div').forEach(function(card, i) {
    card.classList.add('pillar-card');
    card.style.cursor = 'pointer';
    var ghost = card.querySelector('svg.ghost-svg') || card.querySelector('svg:first-of-type');
    if (ghost) ghost.classList.add('ghost-svg');
    card.addEventListener('click', function() {
      var target = document.querySelector(pillarLinks[i]);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* Break shimmer divs — inject with staggered delay */
(function() {
  document.querySelectorAll('.brk').forEach(function(brk) {
    var s = document.createElement('div');
    s.className = 'brk__shimmer';
    s.style.animationDelay = (Math.random() * 2) + 's';
    brk.appendChild(s);
  });
})();

/* Sec-id — mouseenter replays glint */
(function() {
  document.querySelectorAll('.sec-id').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      el.classList.remove('glint');
      void el.offsetWidth;
      el.classList.add('glint');
      setTimeout(function() { el.classList.remove('glint'); }, 2500);
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   IDLE GLOW CYCLE — cycles shapeGlow down each list to
   encourage clicking. Stops when user clicks any item.
   ══════════════════════════════════════════════════════════ */
(function() {
  var HOLD = 2500;   /* ms per item — one shapeGlow cycle */
  var PAUSE = 1500;  /* ms pause after completing a full pass before restarting */

  function cycleList(items) {
    var idx = 0;
    var timer = null;
    var stopped = false;

    function next() {
      if (stopped) return;
      items.forEach(function(el) { el.classList.remove('glow-pulse'); });
      items[idx].classList.add('glow-pulse');
      idx = (idx + 1) % items.length;
      var delay = idx === 0 ? HOLD + PAUSE : HOLD;
      timer = setTimeout(next, delay);
    }

    /* Stop cycling on any click */
    items.forEach(function(el) {
      el.addEventListener('click', function() {
        stopped = true;
        clearTimeout(timer);
        items.forEach(function(i) { i.classList.remove('glow-pulse'); });
      }, { once: false });
    });

    next();
  }

  /* Wire each list independently */
  var companions = Array.from(document.querySelectorAll('.rolodex-item'));
  var levels     = Array.from(document.querySelectorAll('.level-item'));
  var workshops  = Array.from(document.querySelectorAll('.workshop-item:not(.workshop-item--other)'));

  if (companions.length) cycleList(companions);
  if (levels.length)     cycleList(levels);
  if (workshops.length)  cycleList(workshops);
})();

/* ══════════════════════════════════════════════════════════
   9. LIGHTBOX
   Universal — wires to all media images automatically.
   Exclusions: data-no-lightbox, .hero__bg, .brk__bg,
               .level-img, SVG icons, favicon, Bokken,
               Maru_Sankaku_Shikaku, Virtuvian_Man,
               nawa-vitruvian (B3 figure: only its dots are clickable).
   ══════════════════════════════════════════════════════════ */

(function() {
  var lb    = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  if (!lb || !lbImg) return;

  /* Non-media filenames to exclude */
  var excludeFiles = [
    'Bokken', 'Maru_Sankaku_Shikaku', 'Virtuvian_Man', 'nawa-vitruvian', 'hero_01', 'og_preview'
  ];

  /* Non-media parent selectors to exclude */
  var excludeParents = ['.hero__bg', '.brk__bg'];

  function isMedia(img) {
    if (img.hasAttribute('data-no-lightbox'))  return false;
    if (img.classList.contains('level-img'))   return false;
    var src = img.getAttribute('src') || '';
    for (var i = 0; i < excludeFiles.length; i++) {
      if (src.indexOf(excludeFiles[i]) !== -1) return false;
    }
    for (var j = 0; j < excludeParents.length; j++) {
      if (img.closest(excludeParents[j])) return false;
    }
    return true;
  }

  function openLightbox(src) {
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  /* Wire all media images */
  document.querySelectorAll('img').forEach(function(img) {
    if (!isMedia(img)) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() { openLightbox(img.src); });
  });

  /* Wire data-lightbox-src triggers (divs/arrows that reference an image) */
  document.querySelectorAll('[data-lightbox-src]').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() { openLightbox(el.dataset.lightboxSrc); });
  });

  /* Wire extremes arrows */
  var arrowL = document.querySelector('.extremes-arrow-l[data-lightbox-arrow]');
  var arrowR = document.querySelector('.extremes-arrow-r[data-lightbox-arrow]');
  if (arrowL) arrowL.addEventListener('click', function() {
    var img = document.querySelector('#extremes-block img:first-of-type');
    if (img) openLightbox(img.src);
  });
  if (arrowR) arrowR.addEventListener('click', function() {
    var img = document.querySelector('#extremes-block img:last-of-type');
    if (img) openLightbox(img.src);
  });

  /* Close handlers */
  lb.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
  });
})();




/* ── Roving nav highlight: one clickable item lights at a time ──
   The three shapes step quickly in sequence so a visitor sees three
   separate lines and reads them as three separate links. Runs on the
   top nav (where the hamburger joins the cycle) and on the shape
   trio at the foot of the page.                                   */
(function () {
  var SHAPE = 720, WORD = 2500;

  function rove(root, items) {
    if (!root || !items.length) return;
    var i = -1, paused = false, timer = null;
    function dwell(el) { return el.classList.contains('nav-shape-link') ? SHAPE : WORD; }
    function clear() { items.forEach(function (el) { el.classList.remove('nav-rove'); }); }
    function step() {
      clear();
      if (paused) return;
      i = (i + 1) % items.length;
      var el = items[i];
      void el.offsetWidth;               // restart the blink animation
      el.classList.add('nav-rove');
      timer = setTimeout(step, dwell(el));
    }
    function pause() { paused = true; clearTimeout(timer); clear(); }
    function resume() { if (!paused) return; paused = false; step(); }
    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    step();
    return { pause: pause, resume: resume };
  }

  // top nav: words hold, shapes step quickly, hamburger closes the loop
  var nav = document.querySelector('.site-nav__links');
  if (nav) {
    var items = Array.prototype.slice.call(nav.querySelectorAll('a'));
    var btn = document.getElementById('menu-btn');
    if (btn) items.push(btn);
    var top = rove(nav, items);
    if (btn && top) {
      btn.addEventListener('mouseenter', top.pause);
      btn.addEventListener('mouseleave', top.resume);
    }
  }

  // foot of the page: the three shapes on their own cycle
  var svq = document.querySelector('.svq-nav');
  if (svq) rove(svq, Array.prototype.slice.call(svq.querySelectorAll('.nav-shape-link')));
})();

/* ══════════════════════════════════════════════════════════
   WORLD MAP (E4)                                added 2026-09-24
   To add a place, add one line to PLACES. Nothing else to edit.
     type: 'presented' △  |  'attended' □  |  'planned' ◉  |  'visit' ○
     'planned' = planned / in discussion to visit.   (planned added 2026-09-25)
     Places sharing the same city string share one pin; the
     highest shape wins (presented > attended > planned > visit).
   Map is img/world-land.svg, equirectangular, lat 84 to -58.
   Regenerate with _build/gen_world.mjs (world-atlas land-110m).
   ══════════════════════════════════════════════════════════ */
var PLACES = [
  // △ Presented
  { place: 'AEfest',                  city: 'Bogotá, Colombia',     lat: 4.71,  lon: -74.07,  type: 'presented', when: 'Aug 14 to 17' },
  { place: 'Friction Fest',           city: 'Calgary',              lat: 51.05, lon: -114.07, type: 'presented', when: 'Nov 2025' },
  { place: 'Friction Fiber Arts',     city: 'Ottawa',               lat: 45.42, lon: -75.70,  type: 'presented', when: '2025 · Closed' },
  { place: 'Birdhaus',                city: 'Toronto',              lat: 43.65, lon: -79.38,  type: 'presented', when: '2025' },
  { place: 'Untangled',               city: 'Toronto',              lat: 43.65, lon: -79.38,  type: 'presented', when: 'at Toronto Kinbaku Salon · Jan 2024' },
  { place: 'Montreal Fetish Weekend', city: 'Montréal',             lat: 45.50, lon: -73.57,  type: 'presented', when: 'Every year since 2019!?' },
  // □ Attended
  { place: 'L.A.B.',                  city: 'Quebec City',          lat: 46.81, lon: -71.21,  type: 'attended',  when: 'Class' },
  { place: 'Toronto Kinbaku Salon',   city: 'Toronto',              lat: 43.65, lon: -79.38,  type: 'attended',  when: 'Open space' },
  { place: 'Oasis Aqua Lounge',       city: 'Toronto',              lat: 43.65, lon: -79.38,  type: 'attended',  when: '' },
  // ◉ Planned / in discussion to visit
  { place: 'Studio TIEY',             city: 'Antwerp, Belgium',     lat: 51.22, lon: 4.40,    type: 'planned',   when: 'Upcoming · Oct 30 to Nov 1' },
  { place: 'Provence',                city: 'Provence, France',     lat: 43.90, lon: 5.80,    type: 'planned',   when: '2027 · in discussion' },
  // ○ Want to visit
  { place: 'FetishBar Zoo',           city: 'Osaka, Japan',         lat: 34.69, lon: 135.50,  type: 'visit',     when: '' },
  { place: 'Titty Twister',           city: 'Tokyo, Japan',         lat: 35.68, lon: 139.69,  type: 'visit',     when: 'TBC' },
  { place: 'Arcadia Osaka',           city: 'Osaka, Japan',         lat: 34.69, lon: 135.50,  type: 'visit',     when: '' },
  { place: 'Cordespace',              city: 'Quebec City',          lat: 46.81, lon: -71.21,  type: 'visit',     when: '' },
  { place: 'Yaritori',                city: 'Colombia · city TBC',  lat: 6.50,  lon: -75.00,  type: 'visit',     when: '' }
];

(function () {
  var svg = document.getElementById('wmap-svg');
  var layer = document.getElementById('wmap-pins');
  var list = document.getElementById('wmap-list');
  var card = document.getElementById('wmap-card');
  var reset = document.getElementById('wmap-reset');
  if (!svg || !layer || !list || typeof PLACES === 'undefined') return;

  var NS = 'http://www.w3.org/2000/svg';
  var W = 1000, H = 394.4, ZOOM = 8, ZOOM_TOUCH = 12, PIN = 1.8, LENS = 40, LOUPE_PX = 200;
  var TOUCH = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var RANK = { presented: 4, attended: 3, planned: 2, visit: 1 };
  var WORD = { presented: 'Presented', attended: 'Attended', planned: 'Planned / in discussion to visit', visit: 'Want to visit' };
  var ORDER = ['presented', 'attended', 'planned', 'visit'];
  var view = { x: 0, y: 0, w: W, h: H };
  var anim = null;

  function px(p) { return { x: (p.lon + 180) * W / 360, y: (84 - p.lat) * W / 360 }; }

  function shape(type) {
    var el;
    if (type === 'presented') { el = document.createElementNS(NS, 'polygon'); el.setAttribute('points', '0,-6.5 6,4 -6,4'); }
    else if (type === 'attended') { el = document.createElementNS(NS, 'rect'); el.setAttribute('x', -4.8); el.setAttribute('y', -4.8); el.setAttribute('width', 9.6); el.setAttribute('height', 9.6); }
    else if (type === 'planned') {
      el = document.createElementNS(NS, 'g');
      var ring = document.createElementNS(NS, 'circle'); ring.setAttribute('r', 5); ring.setAttribute('class', 'wmap__ring');
      var dot = document.createElementNS(NS, 'circle'); dot.setAttribute('r', 2); dot.setAttribute('class', 'wmap__dot');
      el.appendChild(ring); el.appendChild(dot);
    }
    else { el = document.createElementNS(NS, 'circle'); el.setAttribute('r', 5); }
    el.setAttribute('class', 'wmap__shape wmap__shape--' + type);
    return el;
  }
  function icon(type) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '-8 -8 16 16'); s.setAttribute('class', 'wmap__ico'); s.setAttribute('aria-hidden', 'true');
    s.appendChild(shape(type));
    return s;
  }

  /* group places into locations by city string */
  var locs = {}, locOrder = [];
  PLACES.forEach(function (p) {
    var L = locs[p.city];
    if (!L) { L = locs[p.city] = { city: p.city, lat: p.lat, lon: p.lon, items: [], top: p.type }; locOrder.push(L); }
    L.items.push(p);
    if (RANK[p.type] > RANK[L.top]) L.top = p.type;
  });

  /* pins: lowest rank drawn first so the highest sits on top */
  locOrder.slice().sort(function (a, b) { return RANK[a.top] - RANK[b.top]; }).forEach(function (L) {
    var c = px(L);
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'wmap__pin');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', L.city + ', ' + WORD[L.top]);
    var inner = document.createElementNS(NS, 'g');
    var halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('class', 'wmap__halo'); halo.setAttribute('r', 10);
    var hit = document.createElementNS(NS, 'circle');
    hit.setAttribute('class', 'wmap__hit'); hit.setAttribute('r', TOUCH ? 16 : 11);
    inner.appendChild(hit);
    inner.appendChild(halo);
    inner.appendChild(shape(L.top));
    var t = document.createElementNS(NS, 'text');
    t.setAttribute('class', 'wmap__city'); t.setAttribute('x', 0); t.setAttribute('y', 19); t.setAttribute('text-anchor', 'middle');
    t.textContent = L.city.split(',')[0].split(' · ')[0].toUpperCase();
    inner.appendChild(t);
    g.appendChild(inner);
    L.el = g; L.inner = inner; L.cx = c.x; L.cy = c.y;
    layer.appendChild(g);
    g.addEventListener('click', function (e) {
      e.stopPropagation();
      if (TOUCH && !isZoomed()) { zoomAt(L.cx, L.cy, ZOOM_TOUCH); return; }
      select(L);
    });
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(L); } });
  });

  /* list, grouped by type */
  ORDER.forEach(function (type) {
    var rows = PLACES.filter(function (p) { return p.type === type; });
    if (!rows.length) return;
    var grp = document.createElement('div'); grp.className = 'wmap__group';
    var lbl = document.createElement('div'); lbl.className = 'wmap__group-lbl';
    lbl.appendChild(icon(type)); lbl.appendChild(document.createTextNode(WORD[type]));
    grp.appendChild(lbl);
    var ul = document.createElement('ul'); ul.className = 'wmap__list';
    rows.forEach(function (p) {
      var li = row(p, false);
      li.addEventListener('click', function () { select(locs[p.city]); });
      p.li = li;
      ul.appendChild(li);
    });
    grp.appendChild(ul);
    list.appendChild(grp);
  });

  /* lists fold under the map behind 'See lists'.   added 2026-09-25 */
  var seeLists = document.createElement('button');
  seeLists.type = 'button'; seeLists.className = 'wmap__see';
  seeLists.setAttribute('aria-expanded', 'false'); seeLists.setAttribute('aria-controls', 'wmap-list');
  seeLists.textContent = 'See lists';
  list.hidden = true;
  list.parentNode.insertBefore(seeLists, list);
  seeLists.addEventListener('click', function () {
    list.hidden = !list.hidden;
    seeLists.setAttribute('aria-expanded', list.hidden ? 'false' : 'true');
    seeLists.textContent = list.hidden ? 'See lists' : 'Hide lists';
  });

  function row(p, withIcon) {
    var li = document.createElement('li'); li.className = 'wmap__item';
    if (withIcon) li.appendChild(icon(p.type));
    var box = document.createElement('div');
    var nm = document.createElement('span'); nm.className = 'wmap__item-place'; nm.textContent = p.place;
    var meta = document.createElement('span'); meta.className = 'wmap__item-meta';
    meta.textContent = withIcon ? [WORD[p.type], p.when].filter(Boolean).join(' · ') : [p.city, p.when].filter(Boolean).join(' · ');
    box.appendChild(nm); box.appendChild(meta); li.appendChild(box);
    return li;
  }

  function setView(v) {
    view = v;
    svg.setAttribute('viewBox', v.x + ' ' + v.y + ' ' + v.w + ' ' + v.h);
    var s = PIN * v.w / W;
    locOrder.forEach(function (L) { L.el.setAttribute('transform', 'translate(' + L.cx + ',' + L.cy + ') scale(' + s + ')'); });
    svg.classList.toggle('is-zoomed', v.w < W * 0.9);
  }
  function animateTo(t) {
    if (anim) cancelAnimationFrame(anim);
    var f = { x: view.x, y: view.y, w: view.w, h: view.h }, t0 = null, D = 450;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / D), e = 1 - Math.pow(1 - k, 3);
      setView({ x: f.x + (t.x - f.x) * e, y: f.y + (t.y - f.y) * e, w: f.w + (t.w - f.w) * e, h: f.h + (t.h - f.h) * e });
      if (k < 1) anim = requestAnimationFrame(step);
    }
    anim = requestAnimationFrame(step);
  }
  function focusOn(L) {
    var w = W / ZOOM, h = H / ZOOM;
    var x = Math.max(0, Math.min(W - w, L.cx - w / 2));
    var y = Math.max(0, Math.min(H - h, L.cy - h / 2));
    animateTo({ x: x, y: y, w: w, h: h });
  }

  function isZoomed() { return view.w < W * 0.9; }
  function zoomAt(x, y, z) {
    var w = W / z, h = H / z;
    animateTo({ x: Math.max(0, Math.min(W - w, x - w / 2)), y: Math.max(0, Math.min(H - h, y - h / 2)), w: w, h: h });
    reset.hidden = false;
    hideLens();
  }
  function svgPoint(e) {
    var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  /* hover lens (desktop): a square on the map plus a magnified loupe of it.
     Phone has no hover: a tap on the map zooms into that area instead. */
  var stage = svg.parentNode;
  var lens = document.createElementNS(NS, 'rect');
  lens.setAttribute('class', 'wmap__lens'); lens.setAttribute('width', LENS); lens.setAttribute('height', LENS);
  svg.insertBefore(lens, layer);
  var loupe = document.createElement('div'); loupe.className = 'wmap__loupe'; loupe.setAttribute('aria-hidden', 'true');
  var lsvg = document.createElementNS(NS, 'svg');
  var limg = document.createElementNS(NS, 'image');
  limg.setAttribute('href', 'img/world-land.svg'); limg.setAttribute('width', W); limg.setAttribute('height', H);
  lsvg.appendChild(limg);
  var lscale = 12 / (6.5 * (LOUPE_PX / LENS));
  locOrder.forEach(function (L) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(' + L.cx + ',' + L.cy + ') scale(' + lscale + ')');
    g.appendChild(shape(L.top));
    lsvg.appendChild(g);
  });
  loupe.appendChild(lsvg);
  stage.appendChild(loupe);

  function hideLens() { lens.classList.remove('is-on'); loupe.classList.remove('is-on'); }
  if (!TOUCH) {
    svg.addEventListener('mousemove', function (e) {
      if (isZoomed()) { hideLens(); return; }
      var p = svgPoint(e);
      var x = Math.max(0, Math.min(W - LENS, p.x - LENS / 2)), y = Math.max(0, Math.min(H - LENS, p.y - LENS / 2));
      lens.setAttribute('x', x); lens.setAttribute('y', y);
      lsvg.setAttribute('viewBox', x + ' ' + y + ' ' + LENS + ' ' + LENS);
      var r = stage.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
      var lx = mx + 24, ly = my - LOUPE_PX - 24;
      if (lx + LOUPE_PX > r.width) lx = mx - LOUPE_PX - 24;
      if (ly < 0) ly = my + 24;
      loupe.style.left = lx + 'px'; loupe.style.top = ly + 'px';
      lens.classList.add('is-on'); loupe.classList.add('is-on');
    });
    svg.addEventListener('mouseleave', hideLens);
  }
  svg.addEventListener('click', function (e) {
    if (isZoomed()) return;
    var p = svgPoint(e);
    zoomAt(p.x, p.y, TOUCH ? ZOOM_TOUCH : ZOOM);
  });

  function select(L) {
    locOrder.forEach(function (o) { o.el.classList.toggle('is-active', o === L); });
    PLACES.forEach(function (p) { if (p.li) p.li.classList.toggle('is-active', p.city === L.city); });
    card.innerHTML = '';
    var h = document.createElement('div'); h.className = 'wmap__card-city'; h.textContent = L.city;
    card.appendChild(h);
    var ul = document.createElement('ul'); ul.className = 'wmap__list';
    L.items.slice().sort(function (a, b) { return RANK[b.type] - RANK[a.type]; }).forEach(function (p) { ul.appendChild(row(p, true)); });
    card.appendChild(ul);
    card.hidden = false;
    reset.hidden = false;
    focusOn(L);
  }

  reset.addEventListener('click', function () {
    animateTo({ x: 0, y: 0, w: W, h: H });
    locOrder.forEach(function (o) { o.el.classList.remove('is-active'); });
    PLACES.forEach(function (p) { if (p.li) p.li.classList.remove('is-active'); });
    card.hidden = true;
    reset.hidden = true;
  });

  setView(view);
})();


/* ───────────────────────────────────────────────────────────────
   NAWAJUTSU · □ △ ○ box (D3)                    added 2026-09-14
   Tabs and states are pure CSS. This only drives the foot slider
   in the triangle pane. Markup renders at Wide with no JS.
   ─────────────────────────────────────────────────────────────── */
(function () {
  var slider = document.getElementById('nwb-t');
  if (!slider) return;

  var FOOT = 250;
  /* wide (horse) -> close -> kamae right foot forward -> kamae left foot forward.
     Close is solved so the outlines just touch and the heels sit one inch wider
     than the toes. Kamae left is kamae right mirrored across x = 500.
     u is where each state sits on the slider. The four labelled stops are at
     0, 1/3, 2/3 and 1. The walk-through (2/3 to 1) passes through the feet
     together at centre (the close state again) at 5/6: the back foot comes in
     beside the front, then carries on forward.                   2026-09-25 */
  var ST = [
    { u: 0,     lx: 200,   ly: 580,   rx: 800,   ry: 580,   la: -18,  ra: 18,  tgt: 500 },
    { u: 1 / 3, lx: 451.1, ly: 580,   rx: 548.9, ry: 580,   la: -4.1, ra: 4.1, tgt: 500 },
    { u: 2 / 3, lx: 363.6, ly: 930.2, rx: 620,   ry: 430,   la: -45,  ra: -1,  tgt: 589 },
    { u: 5 / 6, lx: 451.1, ly: 580,   rx: 548.9, ry: 580,   la: -4.1, ra: 4.1, tgt: 500 },
    { u: 1,     lx: 380,   ly: 430,   rx: 636.4, ry: 930.2, la: 1,    ra: 45,  tgt: 411 }
  ];
  var KEY = [[-30,-58],[10,-50],[38,-24],[43,12],[42,30],[36,92],[33,138],[29,158],
             [0,190],[-26,160],[-27,104],[-30,62],[-48,0],[-46,-36],[-42,-46]];

  var el = {};
  ['square','diag','tgt','footL','footR','bL','bR','mae','sumi','maeL','sumiL',
   'r-k','r-tilt','r-f','r-b'].forEach(function (k) { el[k] = document.getElementById('nwb-' + k); });

  function n1(v) { return Math.round(v * 10) / 10; }
  function set(e, o) { if (e) for (var k in o) e.setAttribute(k, o[k]); }

  function draw(u) {
    /* find the pair of states this slider value sits between */
    var i = 0;
    while (i < ST.length - 2 && u > ST[i + 1].u) i++;
    var t = (u - ST[i].u) / (ST[i + 1].u - ST[i].u);
    var A = ST[i], B = ST[i + 1], s = {};
    ['lx','ly','rx','ry','la','ra','tgt'].forEach(function (k) { s[k] = A[k] + (B[k] - A[k]) * t; });

    var cx = (s.lx + s.rx) / 2, cy = (s.ly + s.ry) / 2;
    var dx = (s.rx - s.lx) / 2, dy = (s.ry - s.ly) / 2;
    var k = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    var ux = dy / k, uy = -dx / k;
    var maeX = cx + dy, maeY = cy - dx, sumiX = cx - dy, sumiY = cy + dx;

    /* base of support projected onto the otoshi axis, from the real outlines */
    var lo = 1e9, hi = -1e9, j, n, f, r, co, si, px, py, qx, qy, p;
    for (j = 0; j < 2; j++) {
      f = j ? { bx: s.rx, by: s.ry, a: s.ra, m: false } : { bx: s.lx, by: s.ly, a: s.la, m: true };
      r = f.a * Math.PI / 180; co = Math.cos(r); si = Math.sin(r);
      for (n = 0; n < KEY.length; n++) {
        px = f.m ? -KEY[n][0] : KEY[n][0]; py = KEY[n][1];
        qx = f.bx + co * px - si * py; qy = f.by + si * px + co * py;
        p = (qx - cx) * ux + (qy - cy) * uy;
        if (p < lo) lo = p;
        if (p > hi) hi = p;
      }
    }

    set(el.square, { points: n1(s.lx) + ',' + n1(s.ly) + ' ' + n1(maeX) + ',' + n1(maeY) + ' ' +
                             n1(s.rx) + ',' + n1(s.ry) + ' ' + n1(sumiX) + ',' + n1(sumiY) });
    set(el.diag, { x1: n1(s.lx), y1: n1(s.ly), x2: n1(s.rx), y2: n1(s.ry) });
    set(el.tgt,  { x1: n1(s.tgt), x2: n1(s.tgt), y2: n1(cy) });
    set(el.footL, { transform: 'translate(' + n1(s.lx) + ',' + n1(s.ly) + ') rotate(' + n1(s.la) + ') scale(-1,1)' });
    set(el.footR, { transform: 'translate(' + n1(s.rx) + ',' + n1(s.ry) + ') rotate(' + n1(s.ra) + ')' });
    set(el.bL, { cx: n1(s.lx), cy: n1(s.ly) });
    set(el.bR, { cx: n1(s.rx), cy: n1(s.ry) });
    set(el.mae,  { cx: n1(maeX),  cy: n1(maeY) });
    set(el.sumi, { cx: n1(sumiX), cy: n1(sumiY) });
    var ld = Math.max(k + 90, 250);
    set(el.maeL,  { x: n1(cx + ux * ld), y: n1(cy + uy * ld + 6) });
    set(el.sumiL, { x: n1(cx - ux * ld), y: n1(cy - uy * ld + 6) });

    el['r-k'].textContent    = (2 * k / FOOT).toFixed(2) + ' × foot length';
    el['r-tilt'].textContent = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI).toFixed(0) + '°';
    el['r-f'].textContent    = Math.round(100 * hi / k) + '%';
    el['r-b'].textContent    = Math.round(100 * -lo / k) + '%';
  }

  slider.addEventListener('input', function () { draw(this.value / 100); });
  draw(slider.value / 100);
})();
