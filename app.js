/* ══════════════════════════════════════════════════════
   PawSwipe — app.js
   Self-contained: no build tools, works as GitHub Pages.
   Chat powered by Groq (llama-3.3-70b-versatile).
   Images: Dog CEO API + The Cat API (free, no auth).
   ══════════════════════════════════════════════════════ */

const GROQ_API_KEY = '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'

/* ──────────────────────────────────────────────────────
   PET PROFILE TEMPLATES  (images fetched from free APIs)
   ────────────────────────────────────────────────────── */
const DOG_TEMPLATES = [
  { name:'Mochi',    age:'2 yrs', breed:'Corgi Mix',            bio:'Will do backflips for peanut butter. Or anything, really.',              traits:['Energetic','Goofball']      },
  { name:'Waffles',  age:'3 yrs', breed:'Golden Retriever',     bio:'Loves everyone he has ever met. Including mail carriers.',                traits:['Loyal','Gentle']            },
  { name:'Buster',   age:'3 yrs', breed:'Jack Russell Terrier', bio:'High energy, high jumping, high probability of stealing your socks.',    traits:['Energetic','Smart']         },
  { name:'Tofu',     age:'1 yr',  breed:'Samoyed',              bio:'A literal cloud with a face. Loves snow, hates baths.',                  traits:['Fluffy','Happy']            },
  { name:'Olive',    age:'5 yrs', breed:'Mixed Breed',          bio:'A gentle soul looking for a quiet home and endless belly rubs.',         traits:['Gentle','Calm']             },
  { name:'Daisy',    age:'1 yr',  breed:'Beagle',               bio:"Follows her nose everywhere. Will find crumbs you didn't know existed.", traits:['Curious','Foodie']          },
  { name:'Cooper',   age:'2 yrs', breed:'Pug',                  bio:'Snorts when happy. Snorts when sad. Just snorts a lot.',                 traits:['Comical','Cuddly']          },
  { name:'Rosie',    age:'2 yrs', breed:'Dalmatian',            bio:'101 reasons to love me. I promise I am a very good girl.',               traits:['Active','Loyal']            },
  { name:'Barnaby',  age:'5 yrs', breed:'French Bulldog',       bio:'Basically a potato that breathes heavily. Excellent snuggler.',          traits:['Lazy','Affectionate']       },
  { name:'Rex',      age:'4 yrs', breed:'Labrador',             bio:'Absolutely wonderful boy. Will fetch anything, including your heart.',   traits:['Loyal','Athletic']          },
  { name:'Buddy',    age:'2 yrs', breed:'Border Collie',        bio:'Too smart for his own good. Needs lots of mental stimulation.',          traits:['Smart','Energetic']         },
  { name:'Charlie',  age:'3 yrs', breed:'Husky',                bio:'Howls dramatically at 6am. Is also extremely beautiful and knows it.',   traits:['Dramatic','Gorgeous']       },
  { name:'Max',      age:'6 yrs', breed:'German Shepherd',      bio:'Serious professional. Off duty he is a complete goofball.',              traits:['Brave','Loyal']             },
  { name:'Luna',     age:'1 yr',  breed:'Shiba Inu',            bio:'Much wow. Very good. Doge of your dreams.',                              traits:['Independent','Photogenic']  },
  { name:'Peanut',   age:'2 yrs', breed:'Chihuahua',            bio:'Tiny body, enormous attitude. Will sit on your laptop if you ignore him.',traits:['Bold','Cuddly']            },
  { name:'Noodles',  age:'3 yrs', breed:'Dachshund',            bio:'Long boi. Professional couch occupier.',                                 traits:['Chill','Snuggly']           },
  { name:'Pretzel',  age:'4 yrs', breed:'Basset Hound',         bio:'Ears so long they touch the ground. Sadface that hides a happy heart.',  traits:['Calm','Droopy']            },
  { name:'Biscuit',  age:'2 yrs', breed:'Cocker Spaniel',       bio:'Silky ears, silky personality. Just wants to be adored.',               traits:['Gentle','Sweet']            },
  { name:'Dumpling', age:'1 yr',  breed:'Chow Chow',            bio:'Looks like a tiny lion. Acts like a tiny lion. Has a purple tongue.',   traits:['Majestic','Stubborn']       },
  { name:'Ziggy',    age:'3 yrs', breed:'Australian Shepherd',  bio:'Herds everything, including your guests. Cannot be stopped.',            traits:['Clever','Active']           },
];

const CAT_TEMPLATES = [
  { name:'Biscuit',     age:'8 mos', breed:'Orange Tabby',       bio:'Professional keyboard warmer. 10/10 purr motor.',                         traits:['Cuddly','Vocal']       },
  { name:'Noodle',      age:'4 yrs', breed:'Siamese',            bio:'I have opinions and I will share them with you at 3 AM.',                  traits:['Talkative','Sassy']    },
  { name:'Luna',        age:'2 yrs', breed:'Domestic Shorthair', bio:'Will judge you silently, but secretly wants lap time.',                    traits:['Independent','Sweet']  },
  { name:'Clementine',  age:'4 yrs', breed:'Calico',             bio:'Queen of the house. Requires tribute in the form of treats.',             traits:['Regal','Playful']      },
  { name:'Chester',     age:'7 yrs', breed:'Maine Coon',         bio:'Very large and in charge. Excellent listener.',                            traits:['Giant','Chill']        },
  { name:'Shadow',      age:'3 yrs', breed:'Black Cat',          bio:'Professional ninja. Will appear out of nowhere for head scratches.',      traits:['Sneaky','Sweet']       },
  { name:'Smokey',      age:'4 yrs', breed:'Russian Blue',       bio:'Sophisticated gentleman. Enjoys classical music and fine dining.',         traits:['Elegant','Quiet']      },
  { name:'Mittens',     age:'2 yrs', breed:'Persian',            bio:'Luxurious fur, luxurious personality. Requires daily brushing.',           traits:['Fluffy','Pampered']    },
  { name:'Whiskers',    age:'6 yrs', breed:'Tabby',              bio:'Old enough to know better, young enough to knock things off shelves.',     traits:['Mischievous','Lovable']},
  { name:'Mochi',       age:'1 yr',  breed:'Scottish Fold',      bio:'Round face, round eyes, round folded ears. Absolutely perfect.',          traits:['Adorable','Calm']      },
  { name:'Pumpkin',     age:'2 yrs', breed:'Tortoiseshell',      bio:'Tortie attitude. 100% your problem now.',                                  traits:['Feisty','Loyal']       },
  { name:'Duchess',     age:'5 yrs', breed:'Ragdoll',            bio:'Goes limp when picked up. The perfect cuddle partner.',                    traits:['Floppy','Gentle']      },
  { name:'Olive',       age:'3 yrs', breed:'Abyssinian',         bio:'Fastest cat in the shelter. Needs a fast family.',                        traits:['Athletic','Curious']   },
  { name:'Peaches',     age:'1 yr',  breed:'Birman',             bio:'Blue eyes, silky coat, zero concept of personal space.',                  traits:['Cuddly','Chatty']      },
  { name:'Hazel',       age:'2 yrs', breed:'Exotic Shorthair',   bio:'Has the face of someone who has seen some things. Still very sweet.',     traits:['Squishy','Calm']       },
];

// Small pets use verified stable image URLs
const SMALL_PET_DATA = [
  { id:'sp1', name:'Barnaby',  age:'1 yr',  species:'Rabbit',  breed:'Holland Lop',  bio:'Ears flop down, spirits always high. Loves kale.',               traits:['Curious','Shy'],      imageUrl:'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5030?w=800&h=1000&fit=crop' },
  { id:'sp2', name:'Pip',      age:'6 mos', species:'Bird',    breed:'Cockatiel',    bio:'Can whistle the Star Wars theme song perfectly.',                 traits:['Musical','Social'],   imageUrl:'https://images.unsplash.com/photo-1552728089-57105a25a127?w=800&h=1000&fit=crop'  },
  { id:'sp3', name:'Gus',      age:'2 yrs', species:'Hamster', breed:'Syrian',       bio:'Running a marathon every night in my wheel.',                     traits:['Active','Night Owl'], imageUrl:'https://images.unsplash.com/photo-1425082661705-1834bfd08dca?w=800&h=1000&fit=crop' },
  { id:'sp4', name:'Nibbles',  age:'1 yr',  species:'Rabbit',  breed:'Lionhead',     bio:'Has better hair than you. Demands carrots.',                      traits:['Fluffy','Demanding'], imageUrl:'https://images.unsplash.com/photo-1518796745738-41048802f99a?w=800&h=1000&fit=crop' },
];

/* ──────────────────────────────────────────────────────
   APP STATE
   ────────────────────────────────────────────────────── */
const state = {
  pets:          [],
  currentIndex:  0,
  likedPets:     [],
  history:       [],
  matchPet:      null,
  chatPet:       null,
  speciesFilter: 'all',
  distanceFilter:'any',
  soundEnabled:  true,
  draftSpecies:  'all',
  draftDistance: 'any',
  draftSound:    true,
  chatHistory:   [],
  chatLoading:   false,
  loadingMore:   false,
  // rotating template indices so names don't repeat too fast
  _dogIdx:       0,
  _catIdx:       0,
};

/* ──────────────────────────────────────────────────────
   FREE PET IMAGE APIs  (no keys, CORS-enabled)
   ────────────────────────────────────────────────────── */
async function fetchDogImages(count = 20) {
  try {
    const res  = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    const data = await res.json();
    return Array.isArray(data.message) ? data.message : [];
  } catch { return []; }
}

async function fetchCatImages(count = 15) {
  try {
    const res  = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}&mime_types=jpg,png`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(c => c.url) : [];
  } catch { return []; }
}

function randDist() {
  const n = 1 + Math.floor(Math.random() * 14);
  return n === 1 ? '1 mi away' : `${n} mi away`;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build pet objects by pairing API images with profile templates
function makeDogPet(imageUrl) {
  const t = DOG_TEMPLATES[state._dogIdx % DOG_TEMPLATES.length];
  state._dogIdx++;
  return { ...t, id: `dog-${Date.now()}-${state._dogIdx}`, species:'Dog', imageUrl, distance: randDist() };
}
function makeCatPet(imageUrl) {
  const t = CAT_TEMPLATES[state._catIdx % CAT_TEMPLATES.length];
  state._catIdx++;
  return { ...t, id: `cat-${Date.now()}-${state._catIdx}`, species:'Cat', imageUrl, distance: randDist() };
}

function buildFilteredDeck(dogImgs, catImgs, filter) {
  let pets = [];
  if (filter === 'all' || filter === 'dog') pets.push(...dogImgs.map(makeDogPet));
  if (filter === 'all' || filter === 'cat') pets.push(...catImgs.map(makeCatPet));
  if (filter === 'all' || filter === 'small') {
    SMALL_PET_DATA.forEach(p => pets.push({ ...p, distance: randDist() }));
  }
  return shuffle(pets);
}

/* ──────────────────────────────────────────────────────
   SOUND ENGINE  (Web Audio API — zero audio files)
   ────────────────────────────────────────────────────── */
let audioCtx = null;
function getAudioCtx() {
  try {
    if (!audioCtx || audioCtx.state === 'closed')
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch { return null; }
}
function note(ctx, freq, startTime, vol, dur, type = 'sine') {
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = type; osc.frequency.setValueAtTime(freq, startTime);
  g.gain.setValueAtTime(0, startTime);
  g.gain.linearRampToValueAtTime(vol, startTime + 0.015);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
  osc.start(startTime); osc.stop(startTime + dur + 0.02);
}
const sounds = {
  pass() {
    const ctx = getAudioCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination); osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(85, ctx.currentTime + 0.32);
    g.gain.setValueAtTime(0.28, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  },
  like() {
    const ctx = getAudioCtx(); if (!ctx) return;
    [{freq:523,delay:0,dur:0.5},{freq:784,delay:0.1,dur:0.55}].forEach(({freq,delay,dur}) =>
      note(ctx, freq, ctx.currentTime + delay, 0.22, dur));
  },
  superLike() {
    const ctx = getAudioCtx(); if (!ctx) return;
    [523,659,784,1046].forEach((freq,i) => note(ctx, freq, ctx.currentTime + i*0.09, 0.2, 0.5));
  },
  match() {
    const ctx = getAudioCtx(); if (!ctx) return;
    const t = ctx.currentTime;
    note(ctx,392,t,      0.18,0.22,'triangle');
    note(ctx,784,t+0.18, 0.20,0.25,'triangle');
    note(ctx,523,t+0.42, 0.20,0.90,'triangle');
    note(ctx,659,t+0.42, 0.18,0.85,'triangle');
    note(ctx,784,t+0.42, 0.18,0.85,'triangle');
    note(ctx,1046,t+0.46,0.16,0.95,'triangle');
  },
  woof() {
    const ctx = getAudioCtx(); if (!ctx) return;
    const t = ctx.currentTime;
    const bufSize = Math.floor(ctx.sampleRate * 0.22);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random()*2-1;
    const ns = ctx.createBufferSource(); ns.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=220; bp.Q.value=1.8;
    const ng = ctx.createGain();
    ns.connect(bp); bp.connect(ng); ng.connect(ctx.destination);
    ng.gain.setValueAtTime(0.45,t); ng.gain.exponentialRampToValueAtTime(0.001,t+0.2);
    ns.start(t); ns.stop(t+0.22);
    const osc = ctx.createOscillator(), og = ctx.createGain();
    osc.connect(og); og.connect(ctx.destination); osc.type='sine';
    osc.frequency.setValueAtTime(190,t); osc.frequency.exponentialRampToValueAtTime(105,t+0.22);
    og.gain.setValueAtTime(0,t); og.gain.linearRampToValueAtTime(0.28,t+0.01);
    og.gain.exponentialRampToValueAtTime(0.001,t+0.24);
    osc.start(t); osc.stop(t+0.26);
    [880,1108].forEach((freq,i) => note(ctx,freq,t+0.2+i*0.1,0.15,0.35,'triangle'));
  }
};
function playSound(name) { if (state.soundEnabled && sounds[name]) sounds[name](); }

/* ──────────────────────────────────────────────────────
   DOM REFS
   ────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const els = {
  loading:         $('loading-state'),
  cardStack:       $('card-stack'),
  emptyState:      $('empty-state'),
  actionButtons:   $('action-buttons'),
  likedBadge:      $('liked-badge'),
  btnSettings:     $('btn-settings'),
  btnProfile:      $('btn-profile'),
  btnUndo:         $('btn-undo'),
  btnPass:         $('btn-pass'),
  btnLike:         $('btn-like'),
  btnSuperlike:    $('btn-superlike'),
  btnUndoEmpty:    $('btn-undo-empty'),
  btnReset:        $('btn-reset'),
  matchOverlay:    $('match-overlay'),
  matchParticles:  $('match-particles'),
  matchPetName:    $('match-pet-name'),
  matchPetImg:     $('match-pet-img'),
  btnWoof:         $('btn-woof'),
  btnKeepSwiping:  $('btn-keep-swiping'),
  woofParticles:   $('woof-particles'),
  settingsSheet:   $('settings-sheet'),
  settingsBackdrop:$('settings-backdrop'),
  speciesPills:    $('species-pills'),
  distancePills:   $('distance-pills'),
  soundToggle:     $('sound-toggle'),
  soundStatus:     $('sound-status'),
  iconVol:         $('icon-vol'),
  iconMute:        $('icon-mute'),
  btnCloseSettings:$('btn-close-settings'),
  btnApplySettings:$('btn-apply-settings'),
  profileSheet:    $('profile-sheet'),
  profileBackdrop: $('profile-backdrop'),
  btnCloseProfile: $('btn-close-profile'),
  statSwiped:      $('stat-swiped'),
  statAdopted:     $('stat-adopted'),
  statPassed:      $('stat-passed'),
  adoptedHeading:  $('adopted-heading'),
  likedPetsGrid:   $('liked-pets-grid'),
  chatSheet:       $('chat-sheet'),
  chatBackdrop:    $('chat-backdrop'),
  chatPetImg:      $('chat-pet-img'),
  chatPetName:     $('chat-pet-name'),
  chatStatus:      $('chat-status'),
  chatMessages:    $('chat-messages'),
  chatInput:       $('chat-input'),
  btnSend:         $('btn-send'),
  btnCloseChat:    $('btn-close-chat'),
  sendIcon:        $('send-icon'),
  pawIcon:         $('paw-icon'),
};

/* ──────────────────────────────────────────────────────
   INIT  — fetches images before showing first card
   ────────────────────────────────────────────────────── */
async function init() {
  els.loading.classList.remove('hidden');
  bindEvents();

  const [dogImgs, catImgs] = await Promise.all([
    fetchDogImages(20),
    fetchCatImages(15),
  ]);

  state.pets = buildFilteredDeck(dogImgs, catImgs, state.speciesFilter);
  state.currentIndex = 0;

  els.loading.classList.add('hidden');
  showSwiping();
  renderDeck();
}

function showSwiping() {
  els.cardStack.classList.remove('hidden');
  els.actionButtons.classList.remove('hidden');
  els.emptyState.classList.add('hidden');
}

function showEmpty() {
  els.cardStack.classList.add('hidden');
  els.actionButtons.classList.add('hidden');
  els.emptyState.classList.remove('hidden');
  els.btnUndoEmpty.classList.toggle('hidden', state.history.length === 0);
}

function updateUI() {
  const n = state.likedPets.length;
  els.likedBadge.textContent = n;
  els.likedBadge.classList.toggle('hidden', n === 0);
  els.btnUndo.disabled = state.history.length === 0;
  els.btnUndo.classList.toggle('undo-active', state.history.length > 0);
}

/* ──────────────────────────────────────────────────────
   AUTO-LOAD MORE  — fetch extra cards when deck runs low
   ────────────────────────────────────────────────────── */
async function maybeLoadMore() {
  const remaining = state.pets.length - state.currentIndex;
  if (remaining >= 5 || state.loadingMore) return;
  state.loadingMore = true;
  try {
    const filter = state.speciesFilter;
    const needsDogs = filter === 'all' || filter === 'dog';
    const needsCats = filter === 'all' || filter === 'cat';
    const [dogImgs, catImgs] = await Promise.all([
      needsDogs ? fetchDogImages(10) : Promise.resolve([]),
      needsCats ? fetchCatImages(8)  : Promise.resolve([]),
    ]);
    const newPets = buildFilteredDeck(dogImgs, catImgs, filter)
      .filter(p => p.species !== 'Rabbit' && p.species !== 'Bird' && p.species !== 'Hamster');
    state.pets = [...state.pets, ...newPets];

    // If the UI landed on empty state while we were fetching, restore the deck
    if (!els.emptyState.classList.contains('hidden') && state.pets.length > state.currentIndex) {
      showSwiping();
      renderDeck();
    }
  } finally {
    state.loadingMore = false;
  }
}

/* ──────────────────────────────────────────────────────
   CARD STACK  — full rebuild on render, promote on swipe
   ────────────────────────────────────────────────────── */
function renderDeck() {
  els.cardStack.innerHTML = '';
  // Build back→front: slot 2 appended first, slot 0 (top) last
  for (let slot = 2; slot >= 0; slot--) {
    const petIdx = state.currentIndex + slot;
    if (petIdx >= state.pets.length) continue;
    els.cardStack.appendChild(buildCard(state.pets[petIdx], slot, slot === 0));
  }
  updateUI();
  if (state.currentIndex >= state.pets.length) showEmpty();
}

function cardTransform(slot) {
  const scale = slot === 0 ? 1 : Math.max(0.90, 1 - slot * 0.05);
  const yOff  = slot === 0 ? 0 : slot * 16;
  return `scale(${scale}) translateY(${yOff}px)`;
}

function buildCard(pet, slot, isDraggable) {
  const wrapper = document.createElement('div');
  wrapper.className = 'pet-card-wrapper';
  wrapper.style.cssText = `
    position: absolute; inset: 0;
    transform-origin: bottom center;
    transform: ${cardTransform(slot)};
    z-index: ${10 - slot};
    pointer-events: ${isDraggable ? 'auto' : 'none'};
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease;
    will-change: transform;
  `;

  // Limit traits to 2 to keep card body compact
  const traits = (pet.traits || []).slice(0, 2);

  wrapper.innerHTML = `
    <div class="pet-card">
      <div class="pet-card-img-area">
        <img src="${pet.imageUrl}" alt="${pet.name}" draggable="false" loading="eager"
          onerror="this.src='https://placedog.net/800/1000?id=${Math.ceil(Math.random()*99)}'" />
        <div class="stamp stamp-adopt">ADOPT ❤️</div>
        <div class="stamp stamp-pass">PASS ✕</div>
        <div class="pet-card-gradient"></div>
      </div>
      <div class="pet-card-body">
        <div class="pet-name-row">
          <div>
            <h2 class="pet-name">${pet.name}, <span class="pet-age">${pet.age}</span></h2>
            <p class="pet-breed">${pet.breed}</p>
          </div>
        </div>
        <div class="pet-traits">
          ${traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
        </div>
        <p class="pet-bio">${pet.bio}</p>
        <div class="pet-distance">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${pet.distance}
        </div>
      </div>
    </div>
  `;

  if (isDraggable) attachDrag(wrapper, pet);
  return wrapper;
}

/* ──────────────────────────────────────────────────────
   DRAG
   ────────────────────────────────────────────────────── */
function attachDrag(wrapper, pet) {
  const card       = wrapper.querySelector('.pet-card');
  const stampAdopt = wrapper.querySelector('.stamp-adopt');
  const stampPass  = wrapper.querySelector('.stamp-pass');
  let startX = 0, startY = 0, curX = 0, curY = 0, dragging = false, lastDir = null;

  function xy(e) { const s = e.touches ? e.touches[0] : e; return {x: s.clientX, y: s.clientY}; }

  function onDown(e) {
    if (wrapper._swiped) return;
    const {x, y} = xy(e);
    startX = x; startY = y; curX = 0; curY = 0; dragging = true; lastDir = null;
    card.style.transition = 'none';
    e.preventDefault();
    document.addEventListener('mousemove', onMove, {passive:false});
    document.addEventListener('touchmove', onMove, {passive:false});
    document.addEventListener('mouseup',   onUp);
    document.addEventListener('touchend',  onUp);
  }

  function onMove(e) {
    if (!dragging || wrapper._swiped) return;
    const {x, y} = xy(e);
    curX = x - startX; curY = y - startY;
    card.style.transform = `translateX(${curX}px) translateY(${curY * 0.3}px) rotate(${curX / 15}deg)`;
    stampAdopt.style.opacity = Math.min(1, Math.max(0, (curX  - 20) / 80));
    stampPass.style.opacity  = Math.min(1, Math.max(0, (-curX - 20) / 80));
    if      (curX >  80 && lastDir !== 'r') { lastDir = 'r'; playSound('like'); }
    else if (curX < -80 && lastDir !== 'l') { lastDir = 'l'; playSound('pass'); }
    else if (Math.abs(curX) < 60) lastDir = null;
    e.preventDefault();
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('mouseup',   onUp);
    document.removeEventListener('touchend',  onUp);
    if (!dragging) return;
    dragging = false;
    if      (curX >  100) flyAway(wrapper, pet, 'right');
    else if (curX < -100) flyAway(wrapper, pet, 'left');
    else {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform  = 'none';
      stampAdopt.style.opacity = stampPass.style.opacity = 0;
    }
  }

  wrapper.addEventListener('mousedown',  onDown, {passive:false});
  wrapper.addEventListener('touchstart', onDown, {passive:false});
}

/* ──────────────────────────────────────────────────────
   SWIPE
   ────────────────────────────────────────────────────── */
function triggerSwipe(dir, forceMatch = false) {
  if (state.currentIndex >= state.pets.length) return;
  const top = els.cardStack.querySelector('.pet-card-wrapper:last-child');
  if (!top) return;
  flyAway(top, state.pets[state.currentIndex], dir, forceMatch);
}

function flyAway(wrapper, pet, dir, forceMatch = false) {
  if (wrapper._swiped) return;
  wrapper._swiped = true;
  const card = wrapper.querySelector('.pet-card');
  const flyX = dir === 'right' ? window.innerWidth + 200 : -(window.innerWidth + 200);
  card.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
  card.style.transform  = `translateX(${flyX}px) translateY(50px) rotate(${dir === 'right' ? 20 : -20}deg)`;
  wrapper.style.pointerEvents = 'none';
  setTimeout(() => { wrapper.remove(); recordSwipe(dir, pet, forceMatch); }, 420);
}

function recordSwipe(dir, pet, forceMatch) {
  state.currentIndex++;
  state.history.push({ dir, pet });

  if (dir === 'right') {
    state.likedPets.push(pet);
    if (forceMatch || Math.random() < 0.30) {
      state.matchPet = pet;
      setTimeout(() => { playSound('match'); showMatch(pet); }, 280);
    }
  }

  updateUI();
  promoteCards();
  maybeLoadMore(); // fetch more in background when running low
}

function promoteCards() {
  const remaining = state.pets.length - state.currentIndex;
  if (remaining <= 0) { showEmpty(); return; }

  // Re-index surviving wrappers (highest z→slot 0, next→slot 1)
  const alive = [...els.cardStack.querySelectorAll('.pet-card-wrapper')]
    .sort((a, b) => parseInt(b.style.zIndex) - parseInt(a.style.zIndex));

  alive.forEach((w, newSlot) => {
    w.style.zIndex        = 10 - newSlot;
    w.style.pointerEvents = newSlot === 0 ? 'auto' : 'none';
    w.style.transition    = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease';
    w.style.transform     = cardTransform(newSlot);
    if (newSlot === 0 && !w._dragAttached) {
      w._dragAttached = true;
      attachDrag(w, state.pets[state.currentIndex]);
    }
  });

  // Append a new back card if there's a pet for slot 2
  const newSlot   = alive.length;
  const newPetIdx = state.currentIndex + newSlot;
  if (newSlot < 3 && newPetIdx < state.pets.length) {
    const card = buildCard(state.pets[newPetIdx], newSlot, false);
    card.style.transition = 'none';
    card.style.transform  = cardTransform(newSlot);
    els.cardStack.insertBefore(card, els.cardStack.firstChild);
    requestAnimationFrame(() => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease';
    });
  }
}

/* ──────────────────────────────────────────────────────
   UNDO
   ────────────────────────────────────────────────────── */
function undo() {
  if (state.history.length === 0) return;
  const { dir } = state.history.pop();
  state.currentIndex = Math.max(0, state.currentIndex - 1);
  if (dir === 'right') state.likedPets.pop();
  showSwiping();
  renderDeck();
}

/* ──────────────────────────────────────────────────────
   MATCH OVERLAY
   ────────────────────────────────────────────────────── */
let woofSent = false;

function showMatch(pet) {
  woofSent = false;
  els.matchPetName.textContent = pet.name;
  els.matchPetImg.src = pet.imageUrl;
  els.matchPetImg.alt = pet.name;
  els.matchPetImg.style.animation = 'gentle-rock 5s ease-in-out infinite';
  els.btnWoof.textContent = 'Send a Woof 🐾';
  els.btnWoof.className   = 'btn-primary match-action-btn';
  els.btnWoof.disabled    = false;
  els.woofParticles.innerHTML = '';

  // Falling hearts
  els.matchParticles.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const h = document.createElement('div');
    h.className = 'falling-heart';
    const dur = 2 + Math.random() * 2;
    h.style.cssText = `left:${Math.random()*100}vw; top:${-20-Math.random()*100}px; font-size:${10+Math.random()*20}px; --rot:${Math.random()*360}deg; animation-duration:${dur}s;`;
    h.textContent = '❤️';
    els.matchParticles.appendChild(h);
  }
  els.matchOverlay.classList.remove('hidden', 'closing');
}

function closeMatch() {
  els.matchOverlay.classList.add('closing');
  setTimeout(() => {
    els.matchOverlay.classList.add('hidden');
    els.matchOverlay.classList.remove('closing');
    els.matchParticles.innerHTML = '';
    state.matchPet = null;
  }, 250);
}

function handleWoof() {
  if (woofSent) return;
  woofSent = true;
  playSound('woof');

  const EMOJIS = ['🐾','🐾','🐾','🐾','💕','🐾','🐾','💕'];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * 360;
    const dist  = 70 + Math.random() * 30;
    const p = document.createElement('div');
    p.className = 'woof-particle';
    p.style.cssText = `--dx:${Math.cos(angle*Math.PI/180)*dist}px; --dy:${Math.sin(angle*Math.PI/180)*dist}px; font-size:${22+Math.random()*10}px; animation-delay:${i*0.035}s;`;
    p.textContent = EMOJIS[i % EMOJIS.length];
    els.woofParticles.appendChild(p);
  }

  els.matchPetImg.style.animation = 'woof-shake 0.6s ease-in-out forwards';
  els.btnWoof.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Woof Sent!</span>`;
  els.btnWoof.classList.add('woof-sent');
  els.btnWoof.disabled = true;

  const pet = state.matchPet;
  setTimeout(() => { closeMatch(); if (pet) openChat(pet); }, 1400);
}

/* ──────────────────────────────────────────────────────
   SETTINGS SHEET
   ────────────────────────────────────────────────────── */
function openSettings() {
  state.draftSpecies  = state.speciesFilter;
  state.draftDistance = state.distanceFilter;
  state.draftSound    = state.soundEnabled;
  highlightPills(els.speciesPills,  state.draftSpecies);
  highlightPills(els.distancePills, state.draftDistance);
  syncSoundUI(state.draftSound);
  showSheet(els.settingsSheet, els.settingsBackdrop);
}
function closeSettings() { hideSheet(els.settingsSheet, els.settingsBackdrop); }

async function applySettings() {
  state.speciesFilter  = state.draftSpecies;
  state.distanceFilter = state.draftDistance;
  state.soundEnabled   = state.draftSound;
  state.currentIndex   = 0;
  state.history        = [];
  state.likedPets      = [];
  state.matchPet       = null;
  state._dogIdx        = 0;
  state._catIdx        = 0;
  closeSettings();

  // Fetch fresh images for the new filter
  els.loading.classList.remove('hidden');
  showSwiping();
  els.cardStack.innerHTML = '';

  const filter = state.speciesFilter;
  const [dogImgs, catImgs] = await Promise.all([
    (filter === 'all' || filter === 'dog') ? fetchDogImages(20) : Promise.resolve([]),
    (filter === 'all' || filter === 'cat') ? fetchCatImages(15) : Promise.resolve([]),
  ]);
  state.pets = buildFilteredDeck(dogImgs, catImgs, filter);
  els.loading.classList.add('hidden');
  renderDeck();
}

function highlightPills(container, val) {
  [...container.querySelectorAll('.pill')].forEach(p =>
    p.classList.toggle('active', p.dataset.value === val));
}
function syncSoundUI(on) {
  els.soundToggle.classList.toggle('active', on);
  els.soundToggle.setAttribute('aria-checked', String(on));
  els.soundStatus.textContent = on ? 'On' : 'Off';
  els.iconVol.classList.toggle('hidden',  !on);
  els.iconMute.classList.toggle('hidden', on);
}

/* ──────────────────────────────────────────────────────
   PROFILE SHEET
   ────────────────────────────────────────────────────── */
function openProfile() {
  const adopted = state.likedPets.length;
  const passed  = Math.max(0, state.currentIndex - adopted);
  els.statSwiped.textContent  = state.currentIndex;
  els.statAdopted.textContent = adopted;
  els.statPassed.textContent  = passed;
  els.adoptedHeading.textContent = `Adopted (${adopted})`;
  els.likedPetsGrid.innerHTML = adopted === 0
    ? `<div class="no-pets-empty"><div class="empty-paw-icon">🐾</div><p>No pets adopted yet. Start swiping!</p></div>`
    : state.likedPets.map(p => `
        <div class="liked-pet-thumb">
          <img src="${p.imageUrl}" alt="${p.name}" loading="lazy" />
          <div class="liked-pet-name">${p.name}</div>
        </div>`).join('');
  showSheet(els.profileSheet, els.profileBackdrop);
}
function closeProfile() { hideSheet(els.profileSheet, els.profileBackdrop); }

/* ──────────────────────────────────────────────────────
   SHEET HELPERS
   ────────────────────────────────────────────────────── */
function showSheet(sheet, backdrop) {
  backdrop.classList.remove('hidden');
  sheet.classList.remove('hidden');
  requestAnimationFrame(() => sheet.classList.add('open'));
}
function hideSheet(sheet, backdrop) {
  sheet.classList.remove('open');
  backdrop.classList.add('closing');
  setTimeout(() => {
    sheet.classList.add('hidden');
    backdrop.classList.remove('closing');
    backdrop.classList.add('hidden');
  }, 360);
}

/* ──────────────────────────────────────────────────────
   CHAT SHEET
   ────────────────────────────────────────────────────── */
let typewriterTimer = null;

function openChat(pet) {
  state.chatPet     = pet;
  state.chatHistory = [];
  state.chatLoading = false;
  els.chatPetImg.src          = pet.imageUrl;
  els.chatPetImg.alt          = pet.name;
  els.chatPetName.textContent = pet.name;
  els.chatInput.placeholder   = `Message ${pet.name}…`;
  els.chatMessages.innerHTML  = '';
  els.chatStatus.textContent  = 'Online';
  els.chatStatus.classList.remove('typing');
  els.chatInput.disabled = false;
  refreshSendBtn();
  showSheet(els.chatSheet, els.chatBackdrop);
  callGroq([]);
}

function closeChat() {
  clearInterval(typewriterTimer);
  els.chatSheet.classList.remove('open');
  els.chatBackdrop.classList.add('closing');
  setTimeout(() => {
    els.chatSheet.classList.add('hidden');
    els.chatBackdrop.classList.remove('closing');
    els.chatBackdrop.classList.add('hidden');
  }, 360);
  state.chatPet = null;
}

function refreshSendBtn() {
  const has = els.chatInput.value.trim().length > 0;
  els.sendIcon.classList.toggle('hidden', !has);
  els.pawIcon.classList.toggle('hidden',   has);
  els.btnSend.disabled = !has || state.chatLoading;
}

function sendChat() {
  const text = els.chatInput.value.trim();
  if (!text || state.chatLoading) return;
  els.chatInput.value = '';
  refreshSendBtn();
  const updated = [...state.chatHistory, {role:'user', content:text}];
  state.chatHistory = updated;
  appendMsg('user', text);
  callGroq(updated);
}

function appendMsg(role, text) {
  const row = document.createElement('div');
  row.className = `msg-row ${role}`;
  if (role === 'assistant') {
    const av = document.createElement('img');
    av.src = state.chatPet?.imageUrl || '';
    av.className = 'msg-avatar';
    row.appendChild(av);
  }
  const b = document.createElement('div');
  b.className = `msg-bubble ${role}`;
  b.textContent = text;
  row.appendChild(b);
  els.chatMessages.appendChild(row);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function showTypingDots() {
  const row = document.createElement('div');
  row.id = 'typing-row'; row.className = 'msg-row assistant';
  const av = document.createElement('img');
  av.src = state.chatPet?.imageUrl || ''; av.className = 'msg-avatar';
  row.appendChild(av);
  const b = document.createElement('div');
  b.className = 'msg-bubble assistant';
  b.innerHTML = `<div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  row.appendChild(b);
  els.chatMessages.appendChild(row);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}
function removeTypingDots() { document.getElementById('typing-row')?.remove(); }

function typewrite(text) {
  clearInterval(typewriterTimer);
  removeTypingDots();
  const row = document.createElement('div');
  row.className = 'msg-row assistant';
  const av = document.createElement('img');
  av.src = state.chatPet?.imageUrl || ''; av.className = 'msg-avatar';
  row.appendChild(av);
  const b = document.createElement('div');
  b.className = 'msg-bubble assistant';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  b.appendChild(cursor);
  row.appendChild(b);
  els.chatMessages.appendChild(row);
  let i = 0;
  typewriterTimer = setInterval(() => {
    i++;
    b.textContent = text.slice(0, i);
    b.appendChild(cursor);
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
    if (i >= text.length) {
      clearInterval(typewriterTimer);
      cursor.remove();
      state.chatHistory.push({role:'assistant', content:text});
      state.chatLoading = false;
      els.chatInput.disabled = false;
      els.chatStatus.textContent = 'Online';
      els.chatStatus.classList.remove('typing');
      refreshSendBtn();
      els.chatInput.focus();
    }
  }, 22);
}

async function callGroq(messages) {
  if (!state.chatPet) return;
  state.chatLoading = true;
  els.chatInput.disabled = true;
  els.chatStatus.textContent = 'typing…';
  els.chatStatus.classList.add('typing');
  showTypingDots();
  let reply = '';
  try {
    const noKey = !GROQ_API_KEY || GROQ_API_KEY.includes('YOUR_GROQ');
    if (noKey) {
      await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
      reply = getOfflineReply(state.chatPet, messages.length === 0);
    } else {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role:'system', content: buildSystemPrompt(state.chatPet) }, ...messages],
          max_tokens: 200,
          temperature: 0.9,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      reply = data.choices?.[0]?.message?.content?.trim() || '…';
    }
  } catch {
    reply = '*whimpers* I lost the signal for a second… try again? 🐾';
    state.chatLoading = false;
    removeTypingDots();
    els.chatInput.disabled = false;
    els.chatStatus.textContent = 'Online';
    els.chatStatus.classList.remove('typing');
    appendMsg('assistant', reply);
    refreshSendBtn();
    return;
  }
  typewrite(reply);
}

function buildSystemPrompt(pet) {
  const hints = {
    dog:    `You're an excited, loving dog. Occasionally say "Woof!" or "Arf!". You love EVERYONE. Ask about walks, treats, and belly rubs.`,
    cat:    `You're a cat — aloof on the surface, secretly delighted. Use "Mrrrow..." or "Purrrr" occasionally. Act slightly unimpressed but let warmth slip through.`,
    rabbit: `You're a shy, sweet rabbit. Use "*thump*" when excited. Talk about carrots, hay, and cozy hutches. Easily startled but very loving once comfortable.`,
    hamster:`You're a hyperactive hamster. Use "*squeak!*" a lot. Mention your wheel, your seed stash, and how busy you are.`,
    bird:   `You're a chatty bird. Occasionally repeat a word you like. Talk about perches, seeds, and singing. Very sociable and curious.`,
  };
  const hint = hints[pet.species?.toLowerCase()] || `You're a charming ${pet.species || 'pet'}.`;
  return `You are ${pet.name}, a ${pet.age} ${pet.breed} ${pet.species} at a shelter hoping for a forever home.\n\n${hint}\n\nPersonality: ${(pet.traits || []).join(', ')}.\nYour story: ${pet.bio}\n\nRules:\n- NEVER break character or mention being an AI.\n- Keep replies SHORT: 2–3 sentences max.\n- Add 1–2 relevant emojis per message.\n- Be charming, warm, and a little funny.\n- First message (empty history): give an excited greeting upon learning someone swiped right on you.`;
}

function getOfflineReply(pet, isGreeting) {
  const greetings = {
    Dog:    [`Woof woof! Oh my gosh, you swiped right on ME?! 🐾 I'm ${pet.name} and I'm SO excited to meet you!`, `ARF! Someone actually picked me! I'm ${pet.name}, and I promise I will love you unconditionally forever! 🐕`],
    Cat:    [`Mrrrow… oh, it's you. *acts surprised* I suppose I could allow your company. I'm ${pet.name}. 🐱`, `…*yawns slowly* I was not waiting for this. But here you are. I'm ${pet.name}. Purrrr.`],
    Rabbit: [`*thump thump* Oh! Someone noticed me! Hi, I'm ${pet.name}! 🐰 I'm a little nervous but very happy!`, `*ears perk up* You swiped right?! I'm ${pet.name} — please have a carrot ready, it helps me feel safe! 🥕`],
    Hamster:[`*SQUEAK!* Oh wow oh wow oh wow! I'm ${pet.name}! *runs in wheel excitedly* You really picked ME?! 🐹`, `*squeak squeak!* HI! I'm ${pet.name}! I have so much energy! Did I mention I'm VERY busy? But not too busy for you! 🐹`],
    Bird:   [`HELLO! Hello hello! I'm ${pet.name}! Did you know I can whistle? WHISTLE! 🐦 I'm so happy you're here!`, `Tweet! I'm ${pet.name}! I was just singing and then — oh! A new friend! FRIEND! 🦜`],
  };
  const responses = [
    `That's so interesting! I love hearing about that. Tell me more? 🐾`,
    `*excited noises* Really?! You seem amazing. I think we'd get along perfectly! 💕`,
    `Oh wow, you're so thoughtful. I already feel like we have a special connection! 🌟`,
    `I completely agree! That's exactly how I feel too. We're going to be best friends! 🐾`,
    `Ha! That made me so happy. You're going to give me the best life, I just know it! 💕`,
  ];
  const list = isGreeting ? (greetings[pet.species] || greetings['Dog']) : responses;
  return list[Math.floor(Math.random() * list.length)];
}

/* ──────────────────────────────────────────────────────
   EVENT BINDINGS
   ────────────────────────────────────────────────────── */
function bindEvents() {
  els.btnSettings.addEventListener('click', openSettings);
  els.btnProfile.addEventListener('click',  openProfile);

  els.btnPass.addEventListener('click',      () => { playSound('pass');      triggerSwipe('left');        });
  els.btnLike.addEventListener('click',      () => { playSound('like');      triggerSwipe('right');       });
  els.btnSuperlike.addEventListener('click', () => { playSound('superLike'); triggerSwipe('right', true); });
  els.btnUndo.addEventListener('click', undo);

  els.btnReset.addEventListener('click',    applySettings); // re-uses applySettings for a clean reset
  els.btnUndoEmpty.addEventListener('click', undo);

  els.btnWoof.addEventListener('click', handleWoof);
  els.btnKeepSwiping.addEventListener('click', closeMatch);

  els.btnCloseSettings.addEventListener('click', closeSettings);
  els.settingsBackdrop.addEventListener('click', closeSettings);
  els.btnApplySettings.addEventListener('click', applySettings);
  els.speciesPills.addEventListener('click', e => {
    const p = e.target.closest('.pill'); if (!p) return;
    state.draftSpecies = p.dataset.value;
    highlightPills(els.speciesPills, state.draftSpecies);
  });
  els.distancePills.addEventListener('click', e => {
    const p = e.target.closest('.pill'); if (!p) return;
    state.draftDistance = p.dataset.value;
    highlightPills(els.distancePills, state.draftDistance);
  });
  els.soundToggle.addEventListener('click', () => {
    state.draftSound = !state.draftSound;
    syncSoundUI(state.draftSound);
  });

  els.btnCloseProfile.addEventListener('click', closeProfile);
  els.profileBackdrop.addEventListener('click', closeProfile);

  els.btnCloseChat.addEventListener('click', closeChat);
  els.chatInput.addEventListener('input',   refreshSendBtn);
  els.chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
  });
  els.btnSend.addEventListener('click', sendChat);
}

/* ──────────────────────────────────────────────────────
   BOOT
   ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);
