// SonicWave — Demo Data
// Sample tracks using royalty-free audio from various sources

export const DEMO_TRACKS = [
  {
    id: 't1',
    title: 'Midnight Groove',
    artist: 'Luna Nova',
    album: 'Neon Dreams',
    duration: 215,
    cover: null,
    color: '#6c5ce7',
    // Free sample audio
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hasLyrics: true
  },
  {
    id: 't2',
    title: 'Electric Sunset',
    artist: 'The Voltage',
    album: 'Pulse',
    duration: 188,
    cover: null,
    color: '#e17055',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hasLyrics: true
  },
  {
    id: 't3',
    title: 'Crystal Waters',
    artist: 'Aqua Dreams',
    album: 'Deep Blue',
    duration: 243,
    cover: null,
    color: '#00b894',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hasLyrics: true
  },
  {
    id: 't4',
    title: 'Purple Rain Falls',
    artist: 'Luna Nova',
    album: 'Neon Dreams',
    duration: 197,
    cover: null,
    color: '#a29bfe',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    hasLyrics: false
  },
  {
    id: 't5',
    title: 'Downtown Lights',
    artist: 'City Pulse',
    album: 'Urban Echoes',
    duration: 234,
    cover: null,
    color: '#fdcb6e',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    hasLyrics: true
  },
  {
    id: 't6',
    title: 'Starlight Serenade',
    artist: 'Astral',
    album: 'Cosmos',
    duration: 260,
    cover: null,
    color: '#74b9ff',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    hasLyrics: true
  },
  {
    id: 't7',
    title: 'Forest Whispers',
    artist: 'Nature Sound',
    album: 'Earth Songs',
    duration: 301,
    cover: null,
    color: '#00b894',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    hasLyrics: false
  },
  {
    id: 't8',
    title: 'Velocity',
    artist: 'The Voltage',
    album: 'Pulse',
    duration: 178,
    cover: null,
    color: '#e17055',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    hasLyrics: true
  },
  {
    id: 't9',
    title: 'Morning Dew',
    artist: 'Aqua Dreams',
    album: 'Deep Blue',
    duration: 210,
    cover: null,
    color: '#55efc4',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    hasLyrics: false
  },
  {
    id: 't10',
    title: 'Neon Boulevard',
    artist: 'City Pulse',
    album: 'Urban Echoes',
    duration: 226,
    cover: null,
    color: '#ff7675',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    hasLyrics: true
  },
  {
    id: 't11',
    title: 'Gravity Pull',
    artist: 'Astral',
    album: 'Cosmos',
    duration: 245,
    cover: null,
    color: '#0984e3',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    hasLyrics: true
  },
  {
    id: 't12',
    title: 'Summer Memories',
    artist: 'Luna Nova',
    album: 'Golden Hour',
    duration: 192,
    cover: null,
    color: '#ffeaa7',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    hasLyrics: true
  },
  {
    id: 't13',
    title: 'Waves of Time',
    artist: 'Nature Sound',
    album: 'Earth Songs',
    duration: 278,
    cover: null,
    color: '#81ecec',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    hasLyrics: false
  },
  {
    id: 't14',
    title: 'Digital Love',
    artist: 'The Voltage',
    album: 'Circuit',
    duration: 205,
    cover: null,
    color: '#fd79a8',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    hasLyrics: true
  },
  {
    id: 't15',
    title: 'Aurora Borealis',
    artist: 'Astral',
    album: 'Cosmos',
    duration: 312,
    cover: null,
    color: '#a29bfe',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    hasLyrics: true
  },
  {
    id: 't16',
    title: 'Echoes in the Dark',
    artist: 'City Pulse',
    album: 'Nightlife',
    duration: 199,
    cover: null,
    color: '#636e72',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    hasLyrics: false
  }
];

export const DEMO_ARTISTS = [
  { id: 'a1', name: 'Luna Nova', color: '#6c5ce7', tracks: ['t1', 't4', 't12'] },
  { id: 'a2', name: 'The Voltage', color: '#e17055', tracks: ['t2', 't8', 't14'] },
  { id: 'a3', name: 'Aqua Dreams', color: '#00b894', tracks: ['t3', 't9'] },
  { id: 'a4', name: 'City Pulse', color: '#fdcb6e', tracks: ['t5', 't10', 't16'] },
  { id: 'a5', name: 'Astral', color: '#74b9ff', tracks: ['t6', 't11', 't15'] },
  { id: 'a6', name: 'Nature Sound', color: '#55efc4', tracks: ['t7', 't13'] }
];

export const DEMO_ALBUMS = [
  { id: 'al1', title: 'Neon Dreams', artist: 'Luna Nova', color: '#6c5ce7', tracks: ['t1', 't4'] },
  { id: 'al2', title: 'Pulse', artist: 'The Voltage', color: '#e17055', tracks: ['t2', 't8'] },
  { id: 'al3', title: 'Deep Blue', artist: 'Aqua Dreams', color: '#00b894', tracks: ['t3', 't9'] },
  { id: 'al4', title: 'Urban Echoes', artist: 'City Pulse', color: '#fdcb6e', tracks: ['t5', 't10'] },
  { id: 'al5', title: 'Cosmos', artist: 'Astral', color: '#74b9ff', tracks: ['t6', 't11', 't15'] },
  { id: 'al6', title: 'Earth Songs', artist: 'Nature Sound', color: '#55efc4', tracks: ['t7', 't13'] },
  { id: 'al7', title: 'Golden Hour', artist: 'Luna Nova', color: '#ffeaa7', tracks: ['t12'] },
  { id: 'al8', title: 'Circuit', artist: 'The Voltage', color: '#fd79a8', tracks: ['t14'] },
  { id: 'al9', title: 'Nightlife', artist: 'City Pulse', color: '#636e72', tracks: ['t16'] }
];

// Simulated time-synced lyrics (time in seconds)
export const DEMO_LYRICS = {
  t1: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 5, text: 'Walking through the midnight streets' },
    { time: 10, text: 'Neon lights beneath my feet' },
    { time: 15, text: 'The city hums a gentle song' },
    { time: 20, text: 'As I drift along' },
    { time: 28, text: '' },
    { time: 30, text: 'Feel the rhythm in the air' },
    { time: 35, text: 'Music flowing everywhere' },
    { time: 40, text: "Got that midnight groove tonight" },
    { time: 45, text: 'Everything feels right' },
    { time: 53, text: '' },
    { time: 55, text: 'Under the stars we dance' },
    { time: 60, text: 'Lost in this sweet romance' },
    { time: 65, text: 'The night is young and free' },
    { time: 70, text: 'Just you and me' },
    { time: 78, text: '' },
    { time: 80, text: 'Midnight groove, feel the beat' },
    { time: 85, text: 'Moving to the city heat' },
    { time: 90, text: 'Every moment feels so new' },
    { time: 95, text: 'Dancing with you' },
    { time: 103, text: '' },
    { time: 105, text: 'The world fades to a blur' },
    { time: 110, text: 'Only music can be heard' },
    { time: 115, text: 'In this velvet night so true' },
    { time: 120, text: "I'm dancing into you" },
    { time: 128, text: '' },
    { time: 130, text: 'Midnight groove, midnight groove' },
    { time: 135, text: 'Finding our eternal move' },
    { time: 140, text: 'In this city made of light' },
    { time: 145, text: 'We own the night' },
    { time: 153, text: '' },
    { time: 155, text: 'The bass drops low, the melody soars' },
    { time: 160, text: 'Opening up invisible doors' },
    { time: 165, text: 'To a world where music reigns' },
    { time: 170, text: 'And nothing else remains' },
    { time: 180, text: '♪ ♪ ♪' }
  ],
  t2: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 5, text: 'Driving down the coastal way' },
    { time: 10, text: 'As the sun ends another day' },
    { time: 15, text: 'Colors bleed across the sky' },
    { time: 20, text: 'Electric sunset high' },
    { time: 28, text: '' },
    { time: 30, text: 'Orange, purple, gold and red' },
    { time: 35, text: 'Like a painting overhead' },
    { time: 40, text: 'The horizon catches fire' },
    { time: 45, text: 'Taking us higher' },
    { time: 53, text: '' },
    { time: 55, text: 'Electric sunset, burning bright' },
    { time: 60, text: 'A symphony of fading light' },
    { time: 65, text: 'Every end becomes a start' },
    { time: 70, text: 'A masterpiece of art' },
    { time: 80, text: '♪ ♪ ♪' }
  ],
  t3: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 8, text: 'Beneath the surface, calm and clear' },
    { time: 14, text: 'Crystal waters drawing near' },
    { time: 20, text: 'Reflections dance on gentle waves' },
    { time: 26, text: 'In sapphire-colored caves' },
    { time: 34, text: '' },
    { time: 36, text: 'Dive into the deep unknown' },
    { time: 42, text: 'Where the currents call you home' },
    { time: 48, text: 'Whispers of the ocean floor' },
    { time: 54, text: 'Always wanting more' },
    { time: 62, text: '' },
    { time: 64, text: 'Crystal waters heal the soul' },
    { time: 70, text: 'Making broken pieces whole' },
    { time: 76, text: 'In the depths we find our way' },
    { time: 82, text: 'A brand new day' },
    { time: 90, text: '♪ ♪ ♪' }
  ],
  t5: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 6, text: 'Street lamps glow in amber hue' },
    { time: 12, text: 'Downtown lights in every view' },
    { time: 18, text: 'Skyscrapers touch the clouded sky' },
    { time: 24, text: 'As taxis rush on by' },
    { time: 32, text: '' },
    { time: 34, text: 'The city never sleeps at night' },
    { time: 40, text: 'A million windows burning bright' },
    { time: 46, text: 'Stories hidden floor by floor' },
    { time: 52, text: 'Behind each numbered door' },
    { time: 60, text: '' },
    { time: 62, text: 'Downtown lights, illuminate' },
    { time: 68, text: 'The dreams of those who stay up late' },
    { time: 74, text: 'In this concrete jungle maze' },
    { time: 80, text: 'We set the night ablaze' },
    { time: 90, text: '♪ ♪ ♪' }
  ],
  t6: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 7, text: 'Look up at the endless night' },
    { time: 13, text: 'A billion stars shining bright' },
    { time: 19, text: 'Each one singing its own song' },
    { time: 25, text: "Inviting us along" },
    { time: 33, text: '' },
    { time: 35, text: 'Starlight serenade above' },
    { time: 41, text: 'A cosmic declaration of love' },
    { time: 47, text: 'The universe plays its tune' },
    { time: 53, text: 'Under the silver moon' },
    { time: 65, text: '' },
    { time: 67, text: 'Galaxies spin in waltz time' },
    { time: 73, text: 'Every orbit so sublime' },
    { time: 79, text: 'We are stardust, we are light' },
    { time: 85, text: 'Children of the night' },
    { time: 95, text: '♪ ♪ ♪' }
  ],
  t8: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 4, text: 'Zero to a hundred, fast' },
    { time: 8, text: 'Every second flying past' },
    { time: 12, text: 'Velocity is my middle name' },
    { time: 16, text: 'Nothing stays the same' },
    { time: 22, text: '' },
    { time: 24, text: 'Chasing horizons at full speed' },
    { time: 28, text: 'This rush is all I need' },
    { time: 32, text: 'Wind through my hair, wheels on the ground' },
    { time: 36, text: 'The sweetest sound' },
    { time: 44, text: '' },
    { time: 46, text: 'Velocity, take me away' },
    { time: 50, text: 'Breaking the limits every day' },
    { time: 54, text: 'No brakes, no fear, just go' },
    { time: 58, text: 'Let the engines flow' },
    { time: 66, text: '♪ ♪ ♪' }
  ],
  t10: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 6, text: 'Walking down the neon strip' },
    { time: 12, text: 'Every sign a glowing tip' },
    { time: 18, text: 'Pink and blue and emerald green' },
    { time: 24, text: 'The brightest streets I\'ve seen' },
    { time: 32, text: '' },
    { time: 34, text: 'Neon boulevard of dreams' },
    { time: 40, text: 'Nothing is quite what it seems' },
    { time: 46, text: 'Behind the lights a world awaits' },
    { time: 52, text: 'Beyond the city gates' },
    { time: 60, text: '♪ ♪ ♪' }
  ],
  t11: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 8, text: 'Feel the pull beneath your skin' },
    { time: 14, text: 'Gravity is pulling in' },
    { time: 20, text: 'Closer to the center core' },
    { time: 26, text: 'What are we waiting for' },
    { time: 34, text: '' },
    { time: 36, text: 'Gravity pull, holding tight' },
    { time: 42, text: 'Through the vacuum of the night' },
    { time: 48, text: 'Two bodies in an orbit dance' },
    { time: 54, text: 'Give love a chance' },
    { time: 62, text: '♪ ♪ ♪' }
  ],
  t12: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 6, text: 'Sunlight on the garden wall' },
    { time: 12, text: 'Summer memories, I recall' },
    { time: 18, text: 'Ice cream trucks and barefoot days' },
    { time: 24, text: 'Through a golden haze' },
    { time: 32, text: '' },
    { time: 34, text: 'Laughter echoes through the years' },
    { time: 40, text: 'Washing away all the tears' },
    { time: 46, text: 'Those golden days will never fade' },
    { time: 52, text: 'In the summer shade' },
    { time: 60, text: '♪ ♪ ♪' }
  ],
  t14: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 5, text: 'Pixels forming on the screen' },
    { time: 10, text: 'The most beautiful I\'ve seen' },
    { time: 15, text: 'Digital love, binary heart' },
    { time: 20, text: 'A technological art' },
    { time: 28, text: '' },
    { time: 30, text: 'Connected through the wire' },
    { time: 35, text: 'Electric desire' },
    { time: 40, text: 'In ones and zeros we confide' },
    { time: 45, text: 'Side by side' },
    { time: 55, text: '♪ ♪ ♪' }
  ],
  t15: [
    { time: 0, text: '♪ ♪ ♪' },
    { time: 10, text: 'Curtains of light in the polar sky' },
    { time: 18, text: 'Green and violet dancing high' },
    { time: 26, text: 'Aurora borealis gleams' },
    { time: 34, text: 'More beautiful than dreams' },
    { time: 44, text: '' },
    { time: 46, text: 'The atmosphere comes alive' },
    { time: 54, text: 'Solar winds arrive' },
    { time: 62, text: 'Painting heaven with their glow' },
    { time: 70, text: 'A celestial show' },
    { time: 80, text: '' },
    { time: 82, text: 'Stand in awe beneath the light' },
    { time: 90, text: 'The most magnificent sight' },
    { time: 98, text: 'Nature plays its finest card' },
    { time: 106, text: 'Written in the stars' },
    { time: 116, text: '♪ ♪ ♪' }
  ]
};

export const DEFAULT_PLAYLISTS = [
  {
    id: 'p1',
    name: 'Chill Vibes',
    description: 'Brani rilassanti per ogni momento',
    tracks: ['t1', 't3', 't6', 't9', 't12', 't15'],
    color: '#6c5ce7'
  },
  {
    id: 'p2',
    name: 'Energy Boost',
    description: 'Musica ad alta energia per i tuoi allenamenti',
    tracks: ['t2', 't5', 't8', 't10', 't14'],
    color: '#e17055'
  },
  {
    id: 'p3',
    name: 'Night Drive',
    description: 'La colonna sonora perfetta per guidare di notte',
    tracks: ['t1', 't4', 't5', 't10', 't16'],
    color: '#0984e3'
  }
];

// Theme presets
export const THEME_PRESETS = [
  {
    id: 'dark',
    name: 'Oscuro',
    colors: {
      '--bg-primary': '#0a0a0f',
      '--bg-secondary': '#12121a',
      '--bg-tertiary': '#1a1a2e',
      '--bg-elevated': '#1e1e32',
      '--accent': '#6c5ce7',
      '--accent-hover': '#7c6ff0',
      '--accent-secondary': '#a29bfe',
      '--accent-glow': 'rgba(108, 92, 231, 0.3)',
      '--text-primary': '#ffffff',
      '--text-secondary': '#8b8b9e',
      '--text-tertiary': '#5a5a6e'
    }
  },
  {
    id: 'light',
    name: 'Chiaro',
    colors: {
      '--bg-primary': '#f5f5f7',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#e8e8ed',
      '--bg-elevated': '#d8d8e0',
      '--accent': '#6c5ce7',
      '--accent-hover': '#5b4bd5',
      '--accent-secondary': '#8578e8',
      '--accent-glow': 'rgba(108, 92, 231, 0.2)',
      '--text-primary': '#1a1a2e',
      '--text-secondary': '#5a5a6e',
      '--text-tertiary': '#8b8b9e'
    }
  },
  {
    id: 'midnight',
    name: 'Blu Notte',
    colors: {
      '--bg-primary': '#0a1628',
      '--bg-secondary': '#0f1f3d',
      '--bg-tertiary': '#162d54',
      '--bg-elevated': '#1c3a6b',
      '--accent': '#4fc3f7',
      '--accent-hover': '#29b6f6',
      '--accent-secondary': '#81d4fa',
      '--accent-glow': 'rgba(79, 195, 247, 0.3)',
      '--text-primary': '#e3f2fd',
      '--text-secondary': '#90a4ae',
      '--text-tertiary': '#546e7a'
    }
  },
  {
    id: 'sunset',
    name: 'Tramonto',
    colors: {
      '--bg-primary': '#1a0a0f',
      '--bg-secondary': '#2d1218',
      '--bg-tertiary': '#3d1a22',
      '--bg-elevated': '#4d222c',
      '--accent': '#ff6b6b',
      '--accent-hover': '#ff5252',
      '--accent-secondary': '#ffa07a',
      '--accent-glow': 'rgba(255, 107, 107, 0.3)',
      '--text-primary': '#fff5f5',
      '--text-secondary': '#c9a0a0',
      '--text-tertiary': '#8b6969'
    }
  },
  {
    id: 'forest',
    name: 'Foresta',
    colors: {
      '--bg-primary': '#0a150f',
      '--bg-secondary': '#0f2418',
      '--bg-tertiary': '#163322',
      '--bg-elevated': '#1c422c',
      '--accent': '#00b894',
      '--accent-hover': '#00a885',
      '--accent-secondary': '#55efc4',
      '--accent-glow': 'rgba(0, 184, 148, 0.3)',
      '--text-primary': '#e8f5e9',
      '--text-secondary': '#81c784',
      '--text-tertiary': '#4a7c5c'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: {
      '--bg-primary': '#0a0a0a',
      '--bg-secondary': '#111111',
      '--bg-tertiary': '#1a1a1a',
      '--bg-elevated': '#222222',
      '--accent': '#ff00ff',
      '--accent-hover': '#e600e6',
      '--accent-secondary': '#ff66ff',
      '--accent-glow': 'rgba(255, 0, 255, 0.4)',
      '--text-primary': '#ffffff',
      '--text-secondary': '#bb86fc',
      '--text-tertiary': '#7c4dff'
    }
  }
];

// Simulated users for group session
export const DEMO_USERS = [
  { id: 'u1', name: 'Tu', color: '#6c5ce7', isHost: true },
  { id: 'u2', name: 'Marco', color: '#00b894' },
  { id: 'u3', name: 'Laura', color: '#e17055' },
  { id: 'u4', name: 'Alex', color: '#fdcb6e' },
  { id: 'u5', name: 'Sara', color: '#74b9ff' }
];

// Simulated chat messages
export const DEMO_CHAT_MESSAGES = [
  { userId: 'u2', text: 'Questa canzone è fantastica! 🔥', time: '09:15' },
  { userId: 'u3', text: 'Alziamo il volume! 🎵', time: '09:16' },
  { userId: 'u4', text: 'Qualcuno conosce l\'artista?', time: '09:17' },
  { userId: 'u5', text: 'Sì! Luna Nova, sono bravissimi', time: '09:17' },
  { userId: 'u2', text: 'Aggiungiamola alla playlist del gruppo!', time: '09:18' }
];

// Simulated import data
export const SPOTIFY_IMPORT_TRACKS = [
  { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200 },
  { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203 },
  { title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: 215 },
  { title: 'Physical', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 194 },
  { title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 183 },
  { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: 230 },
  { title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: 238 },
  { title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: 167 }
];

export const YOUTUBE_IMPORT_TRACKS = [
  { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
  { title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
  { title: 'Comfortably Numb', artist: 'Pink Floyd', album: 'The Wall', duration: 383 },
  { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 187 },
  { title: 'Yesterday', artist: 'The Beatles', album: 'Help!', duration: 125 }
];

// Helper to generate cover gradient
export function generateCoverGradient(color) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -40));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 200, 200);

  // Decorative circles
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(150, 50, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(50, 160, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffffff';
  // Music note shape
  ctx.font = '64px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('♪', 100, 100);

  return canvas.toDataURL();
}

function adjustColor(hex, amount) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function generateId() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}
