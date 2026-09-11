// characters.js — SVG graphics and character models for Annante Pava

const PLUSH_DEFINITIONS = {
  dinosaur: {
    id: 'dinosaur',
    name: 'Green Dinosaur',
    color: '#52C77A',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="dinoGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#80EAA3"/>
            <stop offset="60%" stop-color="#52C77A"/>
            <stop offset="100%" stop-color="#349E58"/>
          </radialGradient>
          <radialGradient id="dinoBelly" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#E8F8F0"/>
            <stop offset="100%" stop-color="#B2E7C6"/>
          </radialGradient>
        </defs>
        <polygon points="26,20 34,8 40,24" fill="#F4D03F" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/>
        <polygon points="18,34 22,22 30,36" fill="#F4D03F" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/>
        <polygon points="14,50 16,38 24,52" fill="#F4D03F" stroke="#222" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M 22 72 Q 10 74 6 62 Q 12 58 24 64" fill="url(#dinoGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="56" cy="64" rx="34" ry="28" fill="url(#dinoGrad)" stroke="#222" stroke-width="3"/>
        <circle cx="56" cy="38" r="28" fill="url(#dinoGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="68" cy="44" rx="18" ry="14" fill="url(#dinoGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="60" cy="68" rx="20" ry="18" fill="url(#dinoBelly)" stroke="#222" stroke-width="1.8"/>
        <ellipse cx="44" cy="88" rx="10" ry="7" fill="url(#dinoGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="70" cy="88" rx="10" ry="7" fill="url(#dinoGrad)" stroke="#222" stroke-width="2.5"/>
        <path d="M 64 58 Q 74 62 68 68 Q 60 68 62 60 Z" fill="url(#dinoGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="50" cy="32" rx="4" ry="5.5" fill="#222"/>
        <circle cx="51.5" cy="30.5" r="1.5" fill="#FFF"/>
        <ellipse cx="68" cy="32" rx="4" ry="5.5" fill="#222"/>
        <circle cx="69.5" cy="30.5" r="1.5" fill="#FFF"/>
        <ellipse cx="44" cy="39" rx="4" ry="2.5" fill="#FFAAA6" opacity="0.75"/>
        <ellipse cx="76" cy="39" rx="4" ry="2.5" fill="#FFAAA6" opacity="0.75"/>
        <path d="M 70 48 Q 74 52 78 47" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="76" cy="42" r="1.2" fill="#2E7D32"/>
        <circle cx="80" cy="42" r="1.2" fill="#2E7D32"/>
      </svg>`
  },

  penguin: {
    id: 'penguin',
    name: 'Blue Penguin',
    color: '#3498DB',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="pengGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#5DADE2"/>
            <stop offset="60%" stop-color="#2E86C1"/>
            <stop offset="100%" stop-color="#1B4F72"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="88" rx="10" ry="6" fill="#F39C12" stroke="#222" stroke-width="2"/>
        <ellipse cx="62" cy="88" rx="10" ry="6" fill="#F39C12" stroke="#222" stroke-width="2"/>
        <path d="M 22 50 Q 8 60 16 75 Q 26 70 28 58 Z" fill="url(#pengGrad)" stroke="#222" stroke-width="2.5"/>
        <path d="M 78 50 Q 92 60 84 75 Q 74 70 72 58 Z" fill="url(#pengGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="50" cy="56" rx="34" ry="32" fill="url(#pengGrad)" stroke="#222" stroke-width="3"/>
        <path d="M 50 30 Q 32 30 32 46 Q 32 74 50 78 Q 68 74 68 46 Q 68 30 50 30 Z" fill="#FFFFFF" stroke="#222" stroke-width="2.2"/>
        <ellipse cx="43" cy="42" rx="3.5" ry="5" fill="#222"/>
        <circle cx="44.2" cy="40.5" r="1.3" fill="#FFF"/>
        <ellipse cx="57" cy="42" rx="3.5" ry="5" fill="#222"/>
        <circle cx="58.2" cy="40.5" r="1.3" fill="#FFF"/>
        <polygon points="50,45 43,51 57,51" fill="#F39C12" stroke="#222" stroke-width="1.8" stroke-linejoin="round"/>
        <ellipse cx="36" cy="50" rx="3.5" ry="2" fill="#FFAAA6" opacity="0.8"/>
        <ellipse cx="64" cy="50" rx="3.5" ry="2" fill="#FFAAA6" opacity="0.8"/>
      </svg>`
  },

  chick: {
    id: 'chick',
    name: 'Yellow Chick',
    color: '#F4D03F',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="chickGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF5A5"/>
            <stop offset="60%" stop-color="#F7DC6F"/>
            <stop offset="100%" stop-color="#E59866"/>
          </radialGradient>
        </defs>
        <ellipse cx="42" cy="87" rx="8" ry="5" fill="#E67E22" stroke="#222" stroke-width="2"/>
        <ellipse cx="58" cy="87" rx="8" ry="5" fill="#E67E22" stroke="#222" stroke-width="2"/>
        <ellipse cx="20" cy="56" rx="8" ry="12" transform="rotate(-20 20 56)" fill="url(#chickGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="80" cy="56" rx="8" ry="12" transform="rotate(20 80 56)" fill="url(#chickGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="54" r="34" fill="url(#chickGrad)" stroke="#222" stroke-width="3"/>
        <path d="M 48 20 Q 50 10 54 12 Q 52 20 50 20" fill="url(#chickGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="40" cy="48" rx="3.8" ry="5" fill="#222"/>
        <circle cx="41.2" cy="46.5" r="1.4" fill="#FFF"/>
        <ellipse cx="60" cy="48" rx="3.8" ry="5" fill="#222"/>
        <circle cx="61.2" cy="46.5" r="1.4" fill="#FFF"/>
        <polygon points="50,50 44,56 56,56" fill="#E67E22" stroke="#222" stroke-width="1.8" stroke-linejoin="round"/>
        <ellipse cx="32" cy="56" rx="5" ry="3.5" fill="#FF8A80" opacity="0.8"/>
        <ellipse cx="68" cy="56" rx="5" ry="3.5" fill="#FF8A80" opacity="0.8"/>
      </svg>`
  },

  bunny: {
    id: 'bunny',
    name: 'Pink Bunny',
    color: '#FF8DA1',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="bunnyGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFB6C1"/>
            <stop offset="60%" stop-color="#FF8DA1"/>
            <stop offset="100%" stop-color="#E91E63"/>
          </radialGradient>
        </defs>
        <ellipse cx="36" cy="22" rx="9" ry="20" transform="rotate(-10 36 22)" fill="url(#bunnyGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="36" cy="22" rx="4.5" ry="14" transform="rotate(-10 36 22)" fill="#FFFFFF" opacity="0.9"/>
        <ellipse cx="64" cy="22" rx="9" ry="20" transform="rotate(10 64 22)" fill="url(#bunnyGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="64" cy="22" rx="4.5" ry="14" transform="rotate(10 64 22)" fill="#FFFFFF" opacity="0.9"/>
        <ellipse cx="38" cy="88" rx="10" ry="7" fill="url(#bunnyGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="62" cy="88" rx="10" ry="7" fill="url(#bunnyGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="62" r="30" fill="url(#bunnyGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="50" cy="65" rx="12" ry="9" fill="#FFF" stroke="#222" stroke-width="1.8"/>
        <ellipse cx="38" cy="54" rx="3.5" ry="4.8" fill="#222"/>
        <circle cx="39.2" cy="52.5" r="1.3" fill="#FFF"/>
        <ellipse cx="62" cy="54" rx="3.5" ry="4.8" fill="#222"/>
        <circle cx="63.2" cy="52.5" r="1.3" fill="#FFF"/>
        <ellipse cx="50" cy="63" rx="2.5" ry="1.8" fill="#D81B60"/>
        <path d="M 50 64.8 L 50 67 M 47 67 Q 50 70 53 67" fill="none" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
        <ellipse cx="32" cy="64" rx="4.5" ry="3" fill="#FF4081" opacity="0.5"/>
        <ellipse cx="68" cy="64" rx="4.5" ry="3" fill="#FF4081" opacity="0.5"/>
      </svg>`
  },

  bear: {
    id: 'bear',
    name: 'Brown Bear',
    color: '#8D6E63',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="bearGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#BCAAA4"/>
            <stop offset="60%" stop-color="#8D6E63"/>
            <stop offset="100%" stop-color="#4E342E"/>
          </radialGradient>
        </defs>
        <circle cx="30" cy="28" r="12" fill="url(#bearGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="30" cy="28" r="6" fill="#D7CCC8"/>
        <circle cx="70" cy="28" r="12" fill="url(#bearGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="70" cy="28" r="6" fill="#D7CCC8"/>
        <ellipse cx="38" cy="88" rx="10" ry="7" fill="url(#bearGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="62" cy="88" rx="10" ry="7" fill="url(#bearGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="58" r="32" fill="url(#bearGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="50" cy="63" rx="14" ry="11" fill="#D7CCC8" stroke="#222" stroke-width="2"/>
        <ellipse cx="38" cy="50" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="39.2" cy="48.5" r="1.3" fill="#FFF"/>
        <ellipse cx="62" cy="50" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="63.2" cy="48.5" r="1.3" fill="#FFF"/>
        <ellipse cx="50" cy="59" rx="4" ry="2.8" fill="#3E2723"/>
        <path d="M 50 62 L 50 66 M 46 66 Q 50 70 54 66" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
  },

  whiteCat: {
    id: 'whiteCat',
    name: 'White Cat',
    color: '#FDFEFE',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="catGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F2F4F4"/>
            <stop offset="100%" stop-color="#D5DBDB"/>
          </radialGradient>
        </defs>
        <polygon points="26,36 30,12 46,28" fill="url(#catGrad)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="30,32 32,18 42,28" fill="#FFCDD2"/>
        <polygon points="74,36 70,12 54,28" fill="url(#catGrad)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="70,32 68,18 58,28" fill="#FFCDD2"/>
        <ellipse cx="38" cy="87" rx="10" ry="6" fill="url(#catGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="62" cy="87" rx="10" ry="6" fill="url(#catGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="50" cy="58" rx="33" ry="29" fill="url(#catGrad)" stroke="#222" stroke-width="3"/>
        <path d="M 35 50 Q 40 45 45 50" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 55 50 Q 60 45 65 50" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <polygon points="50,56 48,54 52,54" fill="#FF8A80"/>
        <path d="M 50 56 Q 47 61 44 58 M 50 56 Q 53 61 56 58" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="32" cy="58" rx="4.5" ry="2.8" fill="#FFAB91" opacity="0.6"/>
        <ellipse cx="68" cy="58" rx="4.5" ry="2.8" fill="#FFAB91" opacity="0.6"/>
      </svg>`
  },

  purpleCat: {
    id: 'purpleCat',
    name: 'Purple Cat',
    color: '#9B89B3',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="purpCatGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#C5B6DD"/>
            <stop offset="60%" stop-color="#9B89B3"/>
            <stop offset="100%" stop-color="#6F5B88"/>
          </radialGradient>
        </defs>
        <polygon points="26,38 32,16 48,32" fill="url(#purpCatGrad)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="30,34 34,22 44,32" fill="#E1BEE7"/>
        <polygon points="74,38 68,16 52,32" fill="url(#purpCatGrad)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="70,34 66,22 56,32" fill="#E1BEE7"/>
        <ellipse cx="50" cy="62" rx="34" ry="26" fill="url(#purpCatGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="38" cy="86" rx="8" ry="5" fill="url(#purpCatGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="62" cy="86" rx="8" ry="5" fill="url(#purpCatGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="38" cy="56" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="39.2" cy="54.5" r="1.3" fill="#FFF"/>
        <ellipse cx="62" cy="56" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="63.2" cy="54.5" r="1.3" fill="#FFF"/>
        <ellipse cx="50" cy="62" rx="2.5" ry="1.8" fill="#4A148C"/>
        <path d="M 50 64 Q 46 68 43 65 M 50 64 Q 54 68 57 65" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="30" cy="64" rx="4.5" ry="2.5" fill="#F48FB1" opacity="0.6"/>
        <ellipse cx="70" cy="64" rx="4.5" ry="2.5" fill="#F48FB1" opacity="0.6"/>
      </svg>`
  },

  panda: {
    id: 'panda',
    name: 'Cute Panda',
    color: '#E0E0E0',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="pandaBody" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="75%" stop-color="#EEEEEE"/>
            <stop offset="100%" stop-color="#BDBDBD"/>
          </radialGradient>
        </defs>
        <circle cx="28" cy="24" r="11" fill="#222" stroke="#111" stroke-width="2"/>
        <circle cx="72" cy="24" r="11" fill="#222" stroke="#111" stroke-width="2"/>
        <ellipse cx="36" cy="88" rx="10" ry="7" fill="#222" stroke="#111" stroke-width="2"/>
        <ellipse cx="64" cy="88" rx="10" ry="7" fill="#222" stroke="#111" stroke-width="2"/>
        <circle cx="50" cy="58" r="33" fill="url(#pandaBody)" stroke="#222" stroke-width="3"/>
        <ellipse cx="37" cy="50" rx="9" ry="11" transform="rotate(-18 37 50)" fill="#222"/>
        <ellipse cx="63" cy="50" rx="9" ry="11" transform="rotate(18 63 50)" fill="#222"/>
        <circle cx="38" cy="49" r="3.2" fill="#FFF"/>
        <circle cx="39" cy="49" r="1.8" fill="#000"/>
        <circle cx="62" cy="49" r="3.2" fill="#FFF"/>
        <circle cx="61" cy="49" r="1.8" fill="#000"/>
        <ellipse cx="50" cy="62" rx="3.5" ry="2.2" fill="#222"/>
        <path d="M 50 64.5 L 50 67 M 47 67 Q 50 70 53 67" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="28" cy="62" rx="4" ry="2.5" fill="#FF8A80" opacity="0.6"/>
        <ellipse cx="72" cy="62" rx="4" ry="2.5" fill="#FF8A80" opacity="0.6"/>
      </svg>`
  },

  blueWhale: {
    id: 'blueWhale',
    name: 'Blue Whale',
    color: '#4FC3F7',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="whaleGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#81D4FA"/>
            <stop offset="60%" stop-color="#29B6F6"/>
            <stop offset="100%" stop-color="#0288D1"/>
          </radialGradient>
        </defs>
        <path d="M 48 18 Q 45 8 38 12 M 52 18 Q 55 8 62 12 M 50 18 L 50 10" fill="none" stroke="#80D8FF" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 18 56 Q 8 46 6 56 Q 8 66 18 62 Z" fill="url(#whaleGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="54" cy="58" rx="36" ry="26" fill="url(#whaleGrad)" stroke="#222" stroke-width="3"/>
        <path d="M 28 66 Q 52 82 82 66 Q 52 74 28 66 Z" fill="#FFF" stroke="#222" stroke-width="1.8"/>
        <ellipse cx="52" cy="68" rx="8" ry="5" transform="rotate(-15 52 68)" fill="url(#whaleGrad)" stroke="#222" stroke-width="2"/>
        <circle cx="70" cy="52" r="3.8" fill="#222"/>
        <circle cx="71.5" cy="50.5" r="1.3" fill="#FFF"/>
        <path d="M 76 60 Q 80 62 82 58" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="64" cy="58" rx="3.5" ry="2" fill="#FFAAA6" opacity="0.8"/>
      </svg>`
  },

  elephant: {
    id: 'elephant',
    name: 'Small Elephant',
    color: '#90A4AE',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="eleGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#CFD8DC"/>
            <stop offset="60%" stop-color="#90A4AE"/>
            <stop offset="100%" stop-color="#607D8B"/>
          </radialGradient>
        </defs>
        <ellipse cx="22" cy="48" rx="14" ry="20" fill="url(#eleGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="24" cy="48" rx="8" ry="13" fill="#FFCDD2"/>
        <ellipse cx="78" cy="48" rx="14" ry="20" fill="url(#eleGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="76" cy="48" rx="8" ry="13" fill="#FFCDD2"/>
        <ellipse cx="38" cy="88" rx="10" ry="7" fill="url(#eleGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="62" cy="88" rx="10" ry="7" fill="url(#eleGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="56" r="30" fill="url(#eleGrad)" stroke="#222" stroke-width="3"/>
        <path d="M 46 54 Q 44 72 56 70 Q 56 64 52 60" fill="url(#eleGrad)" stroke="#222" stroke-width="2"/>
        <ellipse cx="38" cy="48" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="39.2" cy="46.5" r="1.2" fill="#FFF"/>
        <ellipse cx="62" cy="48" rx="3.5" ry="4.5" fill="#222"/>
        <circle cx="63.2" cy="46.5" r="1.2" fill="#FFF"/>
        <ellipse cx="32" cy="55" rx="4" ry="2.5" fill="#FFAB91" opacity="0.6"/>
        <ellipse cx="68" cy="55" rx="4" ry="2.5" fill="#FFAB91" opacity="0.6"/>
      </svg>`
  },

  cuteDog: {
    id: 'cuteDog',
    name: 'Cute Dog',
    color: '#FFB74D',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="dogGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE0B2"/>
            <stop offset="60%" stop-color="#FFB74D"/>
            <stop offset="100%" stop-color="#F57C00"/>
          </radialGradient>
        </defs>
        <ellipse cx="22" cy="42" rx="10" ry="18" transform="rotate(20 22 42)" fill="#8D6E63" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="78" cy="42" rx="10" ry="18" transform="rotate(-20 78 42)" fill="#8D6E63" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="38" cy="88" rx="10" ry="7" fill="url(#dogGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="62" cy="88" rx="10" ry="7" fill="url(#dogGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="58" r="32" fill="url(#dogGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="50" cy="65" rx="14" ry="11" fill="#FFF" stroke="#222" stroke-width="2"/>
        <circle cx="38" cy="50" r="4" fill="#222"/>
        <circle cx="39.5" cy="48.5" r="1.3" fill="#FFF"/>
        <circle cx="62" cy="50" r="4" fill="#222"/>
        <circle cx="63.5" cy="48.5" r="1.3" fill="#FFF"/>
        <ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="#3E2723"/>
        <path d="M 50 63 L 50 67 M 46 66 Q 50 70 54 66" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="50" cy="71" rx="3" ry="4" fill="#FF5252"/>
        <ellipse cx="30" cy="60" rx="4" ry="2.5" fill="#FFAB91" opacity="0.6"/>
        <ellipse cx="70" cy="60" rx="4" ry="2.5" fill="#FFAB91" opacity="0.6"/>
      </svg>`
  },

  frog: {
    id: 'frog',
    name: 'Green Frog',
    color: '#81C784',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="frogGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#A5D6A7"/>
            <stop offset="60%" stop-color="#66BB6A"/>
            <stop offset="100%" stop-color="#388E3C"/>
          </radialGradient>
        </defs>
        <circle cx="34" cy="30" r="14" fill="url(#frogGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="34" cy="30" r="9" fill="#FFF"/>
        <circle cx="35" cy="30" r="5" fill="#222"/>
        <circle cx="36.5" cy="28.5" r="1.8" fill="#FFF"/>
        <circle cx="66" cy="30" r="14" fill="url(#frogGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="66" cy="30" r="9" fill="#FFF"/>
        <circle cx="65" cy="30" r="5" fill="#222"/>
        <circle cx="66.5" cy="28.5" r="1.8" fill="#FFF"/>
        <ellipse cx="36" cy="88" rx="10" ry="6" fill="url(#frogGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="64" cy="88" rx="10" ry="6" fill="url(#frogGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="50" cy="62" rx="34" ry="28" fill="url(#frogGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="50" cy="68" rx="20" ry="16" fill="#E8F5E9" stroke="#222" stroke-width="1.8"/>
        <path d="M 34 56 Q 50 68 66 56" fill="none" stroke="#222" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="28" cy="54" rx="4.5" ry="2.8" fill="#FF8A80" opacity="0.75"/>
        <ellipse cx="72" cy="54" rx="4.5" ry="2.8" fill="#FF8A80" opacity="0.75"/>
      </svg>`
  },

  seal: {
    id: 'seal',
    name: 'White Seal',
    color: '#ECEFF1',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="sealGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#ECEFF1"/>
            <stop offset="100%" stop-color="#CFD8DC"/>
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="66" rx="8" ry="14" transform="rotate(-30 20 66)" fill="url(#sealGrad)" stroke="#222" stroke-width="2.5"/>
        <ellipse cx="80" cy="66" rx="8" ry="14" transform="rotate(30 80 66)" fill="url(#sealGrad)" stroke="#222" stroke-width="2.5"/>
        <circle cx="50" cy="58" r="33" fill="url(#sealGrad)" stroke="#222" stroke-width="3"/>
        <ellipse cx="38" cy="50" rx="4.5" ry="6" fill="#111"/>
        <circle cx="39.5" cy="48" r="1.8" fill="#FFF"/>
        <circle cx="37" cy="52" r="0.8" fill="#FFF"/>
        <ellipse cx="62" cy="50" rx="4.5" ry="6" fill="#111"/>
        <circle cx="63.5" cy="48" r="1.8" fill="#FFF"/>
        <circle cx="61" cy="52" r="0.8" fill="#FFF"/>
        <ellipse cx="50" cy="58" rx="3.5" ry="2.5" fill="#37474F"/>
        <path d="M 50 60.5 L 50 64 M 46 64 Q 50 67 54 64" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="30" cy="58" rx="4" ry="2.5" fill="#FFAAA6" opacity="0.65"/>
        <ellipse cx="70" cy="58" rx="4" ry="2.5" fill="#FFAAA6" opacity="0.65"/>
      </svg>`
  },

  starPlush: {
    id: 'starPlush',
    name: 'Star Plush',
    color: '#FFEE58',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <radialGradient id="starGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFF9C4"/>
            <stop offset="60%" stop-color="#FFEE58"/>
            <stop offset="100%" stop-color="#FDD835"/>
          </radialGradient>
        </defs>
        <polygon points="50,12 61,38 89,38 66,56 75,84 50,67 25,84 34,56 11,38 39,38" fill="url(#starGrad)" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
        <ellipse cx="43" cy="48" rx="3" ry="4.5" fill="#222"/>
        <circle cx="44" cy="46.5" r="1.2" fill="#FFF"/>
        <ellipse cx="57" cy="48" rx="3" ry="4.5" fill="#222"/>
        <circle cx="58" cy="46.5" r="1.2" fill="#FFF"/>
        <path d="M 46 56 Q 50 60 54 56" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="37" cy="54" rx="3.5" ry="2.2" fill="#FF8A80" opacity="0.75"/>
        <ellipse cx="63" cy="54" rx="3.5" ry="2.2" fill="#FF8A80" opacity="0.75"/>
      </svg>`
  },

  giftBoxPink: {
    id: 'giftBoxPink',
    name: 'Sweet Gift Box',
    color: '#FF80AB',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <linearGradient id="boxPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF80AB"/>
            <stop offset="100%" stop-color="#C51162"/>
          </linearGradient>
        </defs>
        <rect x="20" y="38" width="60" height="50" rx="8" fill="url(#boxPink)" stroke="#222" stroke-width="2.5"/>
        <rect x="16" y="30" width="68" height="14" rx="5" fill="#FF4081" stroke="#222" stroke-width="2.5"/>
        <rect x="44" y="30" width="12" height="58" fill="#FFFDE7" stroke="#222" stroke-width="1.5"/>
        <rect x="20" y="54" width="60" height="12" fill="#FFFDE7" stroke="#222" stroke-width="1.5"/>
        <path d="M 50 30 C 35 15 35 30 50 30 C 65 15 65 30 50 30 Z" fill="#FFFDE7" stroke="#222" stroke-width="2"/>
      </svg>`
  },

  giftBoxCyan: {
    id: 'giftBoxCyan',
    name: 'Sparkle Box',
    color: '#4DD0E1',
    svg: `
      <svg viewBox="0 0 100 100" class="plush-svg">
        <defs>
          <linearGradient id="boxCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#80DEEA"/>
            <stop offset="100%" stop-color="#00ACC1"/>
          </linearGradient>
        </defs>
        <rect x="20" y="38" width="60" height="50" rx="8" fill="url(#boxCyan)" stroke="#222" stroke-width="2.5"/>
        <rect x="16" y="30" width="68" height="14" rx="5" fill="#26C6DA" stroke="#222" stroke-width="2.5"/>
        <rect x="44" y="30" width="12" height="58" fill="#E1BEE7" stroke="#222" stroke-width="1.5"/>
        <rect x="20" y="54" width="60" height="12" fill="#E1BEE7" stroke="#222" stroke-width="1.5"/>
        <path d="M 50 30 C 35 15 35 30 50 30 C 65 15 65 30 50 30 Z" fill="#E1BEE7" stroke="#222" stroke-width="2"/>
      </svg>`
  }
};

// ===================================================================
// GROUNDED PLUSH PILE AT THE BOTTOM OF THE MACHINE
// ===================================================================
// STRICT REQUIREMENTS (Section 7):
// - 20–25 visible plush toys (here: 22 items)
// - Toys MUST NOT float in mid-air
// - All toys sit on the bottom platform/floor (y between 52% and 82%)
// - Realistic overlap, tilt, and natural stacking resembling the reference image
// - Natural distribution matching reference:
//   - Chute is on the BOTTOM LEFT (x: 5% to 26%)
//   - Blue penguin sits right behind/next to the chute (x: 22%, y: 64%)
//   - Green dinosaur, yellow chick, white cat, brown bear, pink bunny, purple cat fill the floor
const INITIAL_PLUSH_POCKET = [
  // Background depth tier (peeking out behind front plushies)
  { type: 'giftBoxCyan', x: 12, y: 56, scale: 0.85, zIndex: 6, rotation: -6 },
  { type: 'blueWhale',   x: 26, y: 54, scale: 0.96, zIndex: 7, rotation: 7 },
  { type: 'elephant',    x: 40, y: 53, scale: 0.92, zIndex: 8, rotation: -5 },
  { type: 'whiteCat',    x: 53, y: 54, scale: 0.98, zIndex: 9, rotation: 3 },
  { type: 'bear',        x: 69, y: 53, scale: 1.10, zIndex: 9, rotation: -4 },
  { type: 'giftBoxPink', x: 86, y: 56, scale: 0.88, zIndex: 7, rotation: 6 },

  // Mid-tier plushies (main featured plushies matching reference image)
  { type: 'penguin',     x: 22, y: 64, scale: 1.08, zIndex: 12, rotation: 4 },
  { type: 'dinosaur',    x: 37, y: 58, scale: 1.20, zIndex: 11, rotation: -3 },
  { type: 'panda',       x: 50, y: 63, scale: 0.95, zIndex: 13, rotation: -6 },
  { type: 'bunny',       x: 64, y: 65, scale: 1.12, zIndex: 14, rotation: 7 },
  { type: 'cuteDog',     x: 77, y: 62, scale: 0.98, zIndex: 12, rotation: -8 },
  { type: 'starPlush',   x: 86, y: 68, scale: 0.84, zIndex: 13, rotation: 14 },

  // Foreground lower pile (resting directly on the bottom platform and faceted balls)
  { type: 'seal',        x: 18, y: 76, scale: 0.88, zIndex: 18, rotation: -8 },
  { type: 'chick',       x: 34, y: 73, scale: 1.06, zIndex: 20, rotation: -5 },
  { type: 'frog',        x: 48, y: 75, scale: 0.94, zIndex: 19, rotation: 6 },
  { type: 'purpleCat',   x: 63, y: 74, scale: 1.04, zIndex: 21, rotation: 4 },
  { type: 'whiteCat',    x: 78, y: 77, scale: 0.88, zIndex: 22, rotation: 9 },

  // Extra grounded accent plushies along the front floor rim
  { type: 'chick',       x: 27, y: 81, scale: 0.76, zIndex: 24, rotation: 12 },
  { type: 'dinosaur',    x: 43, y: 81, scale: 0.74, zIndex: 25, rotation: -12 },
  { type: 'panda',       x: 56, y: 82, scale: 0.75, zIndex: 25, rotation: 8 },
  { type: 'starPlush',   x: 71, y: 82, scale: 0.72, zIndex: 24, rotation: -15 },
  { type: 'cuteDog',     x: 84, y: 80, scale: 0.75, zIndex: 23, rotation: 10 }
];

window.PLUSH_DEFINITIONS = PLUSH_DEFINITIONS;
window.INITIAL_PLUSH_POCKET = INITIAL_PLUSH_POCKET;
