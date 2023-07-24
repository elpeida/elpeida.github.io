let selectedGame = null;
let currentSlideNum = 1;
let isSelectSlideOpen = false;

const menuElements = document.getElementById("menu-container");
const gameContainer = document.getElementById("game-container");
const videoContent = document.getElementById("video-content");
const videoContainer = document.getElementById("video-container");
const video = document.getElementsByTagName("video");
const wrapper = document.getElementById("wrapper");
const instructions = document.getElementById("instructions-download");
const materialsImg = document.getElementById("materials-bg");
const materialsLink = document.getElementById("materials-link");
const playButton = document.getElementById("play");
const compressButton = document.getElementById("compress");
const slidesImg = document.getElementById("slides-img");
const selectSlideContainer = document.getElementById("select-slide-container");
const currentSlideContainer = document.getElementById("current-slide-container");
const currentSlideImg = document.getElementById("current-slide-img");
const optionsSlides = document.getElementsByClassName("select-item");
const downArrow = document.getElementById("down-arrow");
const upArrow = document.getElementById("up-arrow");
const audio = new Audio("assets/instructions.mp3");

const slidesInfo = {
    feggari: {
        numOfSlides: 29
    },
    keraunoi: {
        numOfSlides: 15
    },
    mpasketa: {
        numOfSlides: 25
    },
    mpilies: {
        numOfSlides: 23
    },
    podosfairo: {
        numOfSlides: 24
    },
    robot: {
        numOfSlides: 11
    }
};


function loadGame(game) {
    stopAudioInstructions();
    selectedGame = game;
    currentSlideNum = 1;

    setVideoSource(game);
    setInstructionsSource(game);
    setMaterialsSources(game);
    setSlidesSources(game, currentSlideNum); 
    setGame();
    setSlideOptions();

    displayGame();
}


function setGame() {
    wrapper.dataset.game = selectedGame;
}


function setSlideOptions() {
    for(let i=0; i<optionsSlides.length; i++) {
        optionsSlides[i].classList.remove("hide");
    }

    for(let i=slidesInfo[selectedGame].numOfSlides; i<optionsSlides.length; i++) {
        optionsSlides[i].classList.add("hide");
    }
}


function displayGame() {
    menuElements.classList.add("hide");
    gameContainer.classList.remove("hide");
}


function backToMenu() {
    stopAudioInstructions();
    menuElements.classList.remove("hide");
    gameContainer.classList.add("hide");

    pauseVideo();   
}


function setVideoSource(game) {
    videoContent.innerHTML = "";
  
    const updatedVideo = document.createElement("video");
    updatedVideo.controls = true;

    const source = document.createElement("source");
    source.src = "assets/" + game + "/video.mp4";
    source.type = "video/mp4";

    videoContent.appendChild(updatedVideo);
    updatedVideo.appendChild(source);  
}


function setInstructionsSource(game) {
    instructions.href = "assets/" + game + "/odigies.pdf"; 
}


function setMaterialsSources(game) {
    materialsImg.src = "assets/" + game + "/slides/3.jpg";
    materialsLink.href = "assets/" + game + "/ulika.pdf";
}


function setSlidesSources(game, slideNum) {
    slidesImg.src = "assets/" + game + "/slides/" + slideNum + ".jpg";
    currentSlideImg.src = "assets/numbers/" + slideNum + ".svg";

    currentSlideNum = slideNum;

    closeSelectSlide();
}


function loadPreviousSlide() {
    if (currentSlideNum == 1) {
        return;
    } else {
        setSlidesSources(selectedGame, currentSlideNum - 1);
    }
}


function loadNextSlide() {
    if (currentSlideNum == slidesInfo[selectedGame].numOfSlides) {
        return;
    } else {
        setSlidesSources(selectedGame, currentSlideNum + 1);
    }
}


function goToSlide(num) {
    setSlidesSources(selectedGame, num);
}


function openSelectSlide() {
    if (isSelectSlideOpen == true) {
        closeSelectSlide();
    } else {
        isSelectSlideOpen = true;
        selectSlideContainer.classList.remove("hide");
        downArrow.classList.add("hide");
        upArrow.classList.remove("hide");
    }
}


function closeSelectSlide() {
    if (isSelectSlideOpen == true) {
        isSelectSlideOpen = false;
        selectSlideContainer.classList.add("hide");
        downArrow.classList.remove("hide");
        upArrow.classList.add("hide");
    } else {
        return;
    }
}


function playAudioInstructions() {
    audio.play();
}


function stopAudioInstructions() {
    audio.pause();
    audio.currentTime = 0;
}


function closeSplash() {
    gameContainer.classList.remove("materials-screen");
}


function showMaterials() {
    stopAudioInstructions();
    pauseVideo();
    closeSelectSlide();

    gameContainer.classList.add("materials-screen");
}


function playVideo() {
    stopAudioInstructions();
    closeSelectSlide();

    video[0].play();
    playButton.classList.add("hide");

    video[0].onended = function(e) {
        playButton.classList.remove("hide");
    };
}


function pauseVideo() {
    closeSelectSlide();

    video[0].pause();
    playButton.classList.remove("hide");
}


function expandVideo() {
    stopAudioInstructions();
    closeSelectSlide();

    videoContainer.classList.add("overlapping-video");
    videoContent.classList.add("video-expanded");
    compressButton.classList.remove("hide");
}


function compressVideo() {
    videoContainer.classList.remove("overlapping-video");
    videoContent.classList.remove("video-expanded");
    compressButton.classList.add("hide");
}
