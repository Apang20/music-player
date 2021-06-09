const audio = document.querySelector('audio');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('btn-prev');
const playBtn = document.getElementById('btn-play');
const nextBtn = document.getElementById('btn-next');
const volumeBtn = document.getElementById('btn-volume');
const volumeControl = document.getElementById('volume-control');
const songImage = document.querySelector('.song-image');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const durationTotal = document.querySelector('.duration_total');
const durationNow = document.querySelector('.duration_now');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');

const playlist = [
    
    {name: 'strut', displayName: 'strut', artist: 'Ocean Sunrise', fileName: 'Strut'},
    {name: 'dreams', displayName: 'dreams', artist: 'Faded Rainbows', fileName: 'Dreams'},
    {name: 'lemon', displayName: 'lemon', artist: 'Citrus Drops', fileName: 'Lemon'},
    {name: 'tenderness', displayName: 'tenderness', artist: 'Marie Bolton', fileName: 'Tenderness'},
    {name: 'bloom', displayName: 'bloom', artist: 'Pink Satin', fileName: 'Velvet Bloom'},
    {name: 'phases', displayName: 'phases', artist: 'Elizabeth Snow', fileName: 'Phases'},
    {name: 'arrival', displayName: 'arrival', artist: 'Encrypted Cloud', fileName: 'The Arrival'},
    {name: 'journey', displayName: 'journey', artist: 'The Shortcut', fileName: 'Journey'},
    {name: 'action', displayName: 'action', artist: 'Wolf Pack 9', fileName: 'Action'},
    {name: 'saturn', displayName: 'saturn', artist: 'Solar Green', fileName: 'Saturns Rings'},
    {name: 'dawn', displayName: 'dawn', artist: 'Pensive Silence', fileName: 'Final Dawn'},
    {name: 'charming', displayName: 'charming', artist: 'Lily Rose', fileName: 'Charming'},
    {name: 'moment', displayName: 'moment', artist: 'Emily Glass', fileName: 'Little Moments'},
    {name: 'closer', displayName: 'closer', artist: 'Smith Brown', fileName: 'Closer'},
    {name: 'avenue', displayName: 'avenue', artist: 'Red Satin', fileName: 'NOLA Avenue'},
    {name: 'galaxy', displayName: 'galaxy', artist: 'OmniSounds', fileName: 'New Galaxies'},
    {name: 'memories', displayName: 'memories', artist: 'Bailey Rivers', fileName: 'Fading Memories'},
    {name: 'rumble', displayName: 'rumble', artist: 'The Plan', fileName: 'Richtor Scale'},
    {name: 'epic', displayName: 'epic', artist: 'Metal Spear', fileName: 'Stamford Bridge'}
];


//Check if Playing
let isPlaying = false;
let musicIndex = 0;

// Shuffle Songs
function shuffleSongs() { 
    isPlaying = true;
    loadMusic(playlist[Math.floor(Math.random() * playlist.length)]);
    playBtn.classList.replace('fa-play', 'fa-pause');
    audio.play();
};

// Play
function playMusic() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  songImage.classList.add('image-rotate');
  audio.play();
}

//Pause
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  songImage.classList.remove('image-rotate');
  audio.pause();
}

// Previous Music
function playPrevMusic() {
  musicIndex = musicIndex === 0 ? 18 : musicIndex - 1;
  loadMusic(playlist[musicIndex]);
  playMusic();
}

// Next Music
function playNextMusic() {
  musicIndex = musicIndex === 18 ? 0 : musicIndex + 1;
  loadMusic(playlist[musicIndex]);
  playMusic();
}


function setVolume(value) {
  audio.volume = value;
}

// //Update DOM
function loadMusic(music) {
  songImage.src = `img/${music.fileName}.jpg`;
  songTitle.textContent = music.displayName;
  songArtist.textContent = music.artist;
  audio.src = `music/${music.name}.mp3`;
}


function setDuration() {
  const musicDuration = audio.duration;
  const minute = Math.floor(musicDuration / 60);
  const second = ('0' + Math.floor(musicDuration % 60)).slice(-2);
  durationTotal.textContent = `${minute}:${second}`;
}
function updateProgress() {
  const musicCurrentTime = audio.currentTime;
  const minute = Math.floor(musicCurrentTime / 60);
  const second = ('0' + Math.floor(musicCurrentTime % 60)).slice(-2);
  durationNow.textContent = `${minute}:${second}`;
  progressBar.style.width = `${Math.floor((audio.currentTime * 100) / audio.duration)}%`;
}

function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = audio;
  audio.currentTime = (clickX * duration) / width;
}

shuffleBtn.addEventListener('click', shuffleSongs);

playBtn.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click', () => {
  playPrevMusic();
});

nextBtn.addEventListener('click', () => {
  playNextMusic();
});

audio.onloadedmetadata = function () {
  setDuration();
};

audio.addEventListener('timeupdate', () => {
  updateProgress();
});

audio.addEventListener('ended', () => {
  playNextMusic();
});
progressContainer.addEventListener('click', setProgressBar);

loadMusic(playlist[musicIndex]);

