const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const searchInput = document.getElementById("searchInput");

const songs = document.querySelectorAll(".song");

let currentSongIndex = 0;
let isPlaying = false;


/* LOAD SONG */

function loadSong(index) {

    const song = songs[index];

    const title = song.dataset.title;
    const artist = song.dataset.artist;
    const src = song.dataset.src;

    audio.src = src;

    currentTitle.textContent = title;
    currentArtist.textContent = artist;

    currentSongIndex = index;
}


/* PLAY */

function playSong() {

    if (!audio.src) {
        loadSong(currentSongIndex);
    }

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}


/* PAUSE */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


/* PLAY / PAUSE BUTTON */

playBtn.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});


/* SONG BUTTONS */

songs.forEach((song, index) => {

    const button = song.querySelector(".play-song");

    button.addEventListener("click", () => {

        loadSong(index);

        playSong();

    });

});


/* NEXT SONG */

nextBtn.addEventListener("click", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();

});


/* PREVIOUS SONG */

previousBtn.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    playSong();

});


/* UPDATE PROGRESS */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


/* CHANGE PROGRESS */

progressBar.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progressBar.value / 100) * audio.duration;

});


/* FORMAT TIME */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return minutes + ":" +
        (secs < 10 ? "0" : "") +
        secs;
}


/* VOLUME */

volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value;

});

audio.volume = 0.8;


/* AUTOMATICALLY PLAY NEXT */

audio.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();

});


/* LIKE BUTTON */

document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            button.style.color = "#ef4444";

        } else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

            button.style.color = "#777";

        }

    });

});


/* SEARCH */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();

    songs.forEach(song => {

        const title =
            song.dataset.title.toLowerCase();

        const artist =
            song.dataset.artist.toLowerCase();

        if (
            title.includes(search) ||
            artist.includes(search)
        ) {

            song.style.display = "flex";

        } else {

            song.style.display = "none";

        }

    });

});


/* START LISTENING */

document.getElementById("exploreBtn")
    .addEventListener("click", () => {

        loadSong(0);

        playSong();

    });


/* SEE ALL */

document.getElementById("seeAllBtn")
    .addEventListener("click", () => {

        songs.forEach(song => {
            song.style.display = "flex";
        });

        searchInput.value = "";

    });


/* SHUFFLE */

document.getElementById("shuffleBtn")
    .addEventListener("click", () => {

        let randomIndex =
            Math.floor(Math.random() * songs.length);

        currentSongIndex = randomIndex;

        loadSong(currentSongIndex);

        playSong();

    });


/* REPEAT */

let repeat = false;

document.getElementById("repeatBtn")
    .addEventListener("click", function () {

        repeat = !repeat;

        this.style.color =
            repeat ? "#a855f7" : "#888";

    });


/* HANDLE END */

audio.addEventListener("ended", () => {

    if (repeat) {

        audio.currentTime = 0;

        playSong();

    }

});


/* INITIAL SONG */

loadSong(0);