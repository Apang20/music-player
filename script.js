const audio = document.querySelector('audio');
const prevBtn = document.getElementById('btn-prev');
const playBtn = document.getElementById('btn-play');
const nextBtn = document.getElementById('btn-next');
const volumeBtn = document.getElementById('btn-volume');
const volumeControl = document.getElementById('volume-control');
const songImage = document.querySelector('.song-image');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const durationTotal = document.querySelector('.duration__total');
const durationNow = document.querySelector('.duration__now');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');

//Playlist from youtube audio library
const playlist = [
    
    {name: 'dreams', displayName: 'Dreams', artist: 'Bensound'},
    {name: 'journey', displayName: 'Journey', artist: 'Bensound'},
    {name: 'arrival', displayName: 'Arrival', artist: 'Bensound'},
    {name: 'rumble', displayName: 'Rumble', artist: 'Bensound'},
    {name: 'strut', displayName: 'Strut', artist: 'Bensound'},
    {name: 'unpredictable', displayName: 'Unpredictable', artist: 'Bensound'},
    {name: 'adventure', displayName: 'Adventure', artist: 'Bensound'},
    {name: 'tenderness', displayName: 'Tenderness', artist: 'Bensound'},
    {name: 'memories', displayName: 'Memories', artist: 'Bensound'}
];


//Check if Playing
let isPlaying = false;
let musicIndex = 0;

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
  musicIndex = musicIndex === 0 ? 8 : musicIndex - 1;
  loadMusic(playlist[musicIndex]);
  playMusic();
}

// Next Music
function playNextMusic() {
  musicIndex = musicIndex === 8 ? 0 : musicIndex + 1;
  loadMusic(playlist[musicIndex]);
  playMusic();
}


function setVolume(value) {
  audio.volume = value;
}

//Update DOM
function loadMusic(music) {
  songImage.src = `img/${music.displayName}.jpg`;
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

