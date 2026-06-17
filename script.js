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
        '<a href="#F2" style="color:var(--rope-l);text-decoration:none;letter-spacing:.1em">→ Work with me</a>';
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

var pillarsLabels = ['Structure', 'Tension', 'Flow'];

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
  buildCarousel('companions', companionOrder.map(function(key) {
    var c = companions[key];
    if (!c) return '';
    return '<div style="text-align:center;padding:.5rem 0 1.5rem">' +
      '<span class="rlx-kanji">' + c.kanji + '</span>' +
      '<div class="rlx-title">' + c.name + '</div>' +
      '<span class="rlx-reading">' + c.reading + '</span>' +
      '<p class="rlx-desc">' + c.desc + '</p>' +
      '<p class="rlx-note">' + c.rope + '</p>' +
    '</div>';
  }), 'companions-wrapper');

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

  var workshopOrder = ['fundamentals','bodymech','gote','tension','safety','nawajutsu','partial','suspension','intentionality','semenawa','do','festival','other'];
  buildCarousel('workshops', workshopOrder.map(function(key) {
    var w = workshops[key];
    if (!w) return '';
    return '<div style="padding:.5rem 0 1.5rem">' +
      '<div class="rlx-title" style="margin-bottom:.75rem">' + w.title + '</div>' +
      '<p class="rlx-desc">' + w.desc.replace(/\n\n/g, '<br><br>') + '</p>' +
      '<p class="rlx-note">' + w.note + '</p>' +
    '</div>';
  }), 'workshop-grid');
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
  document.querySelectorAll('#F1 .rate-card, #F1 [style*="border:.5px solid rgba(169,124,26"]').forEach(function(el) {
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
               Maru_Sankaku_Shikaku, Virtuvian_Man.
   ══════════════════════════════════════════════════════════ */

(function() {
  var lb    = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  if (!lb || !lbImg) return;

  /* Non-media filenames to exclude */
  var excludeFiles = [
    'Bokken', 'Maru_Sankaku_Shikaku', 'Virtuvian_Man', 'hero_01', 'og_preview'
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



