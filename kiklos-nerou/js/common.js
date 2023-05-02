"use strict";
class Game {
  constructor() {
    this.levels = new Map();
    this.currentLevel = null;
    this.loadedPhenomena = [];
  }

  addLevel(level) {
    this.levels.set(level.levelNumber, level);
  }

  nextLevel() {
    if (this.levels.size) {
      this.currentLevel = this.levels.get(this.currentLevel.nextLevel);
      this.loadedPhenomena = this.currentLevel.load();
      this.initializePhenomena();
    }
  }

  previousLevel() {
    if (this.levels.size) {
      this.currentLevel = this.levels.get(this.currentLevel.previousLevel);
      this.loadedPhenomena = this.currentLevel.load();
      this.initializePhenomena();
    }
  }

  start() {
    if (this.levels.size) {
      this.currentLevel = this.levels.get(0);
      this.loadedPhenomena = this.currentLevel.load();
      this.initializePhenomena();
    }
  }

  initializePhenomena() {
    for (let phenomenon of this.loadedPhenomena) {
      document.getElementById(phenomenon.id).addEventListener('click', function () {
        game.startPhenomenon(phenomenon);
      });
    }
  }

  startPhenomenon(phenomenon) {
    let id = phenomenon.play();

    if (id > 0) {
      this.currentLevel = this.levels.get(id);
      this.loadedPhenomena = this.currentLevel.load();
      this.initializePhenomena();
    }
  }
}

let game = new Game();
let audio = new Audio();

class Level {
  constructor(levelNumber, pencilSound, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotSpotSound, phenomena = []) {
    this.levelTitle = levelTitle;
    this.levelNumber = levelNumber;
    this.pencilSound = pencilSound;
    this.mainContent = mainContent;
    this.background = background;
    this.hotSpotImages = hotSpotImages;
    this.previousLevel = previousLevel;
    this.nextLevel = nextLevel;
    this.phenomena = phenomena;
    this.hotSpotSound = hotSpotSound;
    this.sounds = sounds;
  }

  load() {
    document.body.style.backgroundImage = "url(" + this.background + ")";
    document.getElementById("level-title").innerHTML = this.levelTitle;
    document.getElementById("main-content").innerHTML = this.mainContent;
    document.getElementById("level-number").innerText = parseInt(this.levelNumber) + 1;
    document.getElementById("hotspot").style.visibility = "hidden";
    document.getElementById("phenomena-list").innerHTML = "";
    audio.pause();

    if (this.hotSpotImages.length) {
      this.loadHotSpotImage();
    }

    let gameButtons = document.getElementsByClassName("game_buttons")
    for (let button of gameButtons) {
      button.style.visibility = "hidden";
    }

    this.loadSounds();
    return this.phenomena;
  }

  loadSounds() {
    for (let sound of this.sounds) {
      document.getElementById(sound[0]).addEventListener("click", function () {
        audio.src = sound[1];
        audio.play();
      });
    }
  }

  loadHotSpotImage(enableButton = true) {
    // clear previous images and load the new ones
    document.getElementById("hotspot-carousel-inner").innerHTML = "";
    let activeImage = true; // needed only for the first image

    for (let img of this.hotSpotImages) {
      let carouselImage = document.createElement('div');

      Object.assign(carouselImage, {
        className: "carousel-item" + (activeImage ? " active" : ""),
        innerHTML: "<img src=\"" + img + "\" id=\"hotspot-modal-image\">"
      })
      activeImage = false;

      document.getElementById("hotspot-carousel-inner").appendChild(carouselImage);
    }

    document.getElementById("hotspot").style.visibility = enableButton ? "visible" : "hidden";
  }
}

class Phenomenon {
  constructor(id, redirect, moves = []) {
    this.id = id;
    this.redirect = redirect;
    this.moves = moves;
  }

  play() {
    if (this.redirect > 0) {
      return this.redirect;
    }

    let newX = window.innerWidth * this.moves[0];
    let newY = window.innerHeight * this.moves[1];

    let resetPosition = move(document.getElementById(this.id)).translate(0, 0).duration('0s');

    move(document.getElementById(this.id))
      .translate(newX, newY)
      .duration('8s')
      .then(resetPosition)
      .end();

    return 0;
  }
}

class QuizLevel extends Level {
  constructor(phenomenaCheckList, phenomenaList, quizSounds, levelNumber, pencilSound, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, phenomena = []) {
    super(levelNumber, pencilSound, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, phenomena);
    this.quizClickedPhenomenon = "";
    this.quizClickedPhenomenonBox = "";
    this.quizSounds = quizSounds;
    this.phenomenaList = phenomenaList;
    this.phenomenaCheckList = phenomenaCheckList;
  }

  load(enableAssist = false) {
    let loadedPhenomena = super.load();
    this.enableAssist = enableAssist;
    document.getElementById("hotspot").style.visibility = "hidden";

    document.getElementById("phenomena-list").innerHTML = this.phenomenaList;
    let gameButtons = document.getElementsByClassName("game_buttons")
    let level5Elements = document.getElementsByClassName("level5");

    for (let element of level5Elements) {
      element.style.visibility = "visible";
      // reset colors
      element.style.color = "#333399";
      element.className = "level5 col phenomenon";
    }

    for (let button of gameButtons) {
      button.style.visibility = "visible";
    }

    let previousPhenomenon;
    let phenomena = document.getElementsByClassName("phenomenon");
    for (let element of phenomena) {
      element.addEventListener("click", function () {
        if (previousPhenomenon) {
          previousPhenomenon.className = "level5 col phenomenon"
        }

        game.currentLevel.quizClickedPhenomenonBox = element;
        game.currentLevel.quizClickedPhenomenon = element.getElementsByTagName("p")[0].textContent;
        element.className = "level5 col phenomenon selected";
        previousPhenomenon = element;
      });
    }

    let quizAnswerText = document.getElementsByClassName("quiz-answer-text");
    for (let element of quizAnswerText) {
      element.addEventListener("click", function () {

        // ensure that the same phenomenon (if pressed again) is not going to be displayed
        if (game.currentLevel.quizClickedPhenomenonBox.style.color === "grey") {
          game.currentLevel.quizClickedPhenomenon = "";
        }
        // ensure that the same phenomenon is not going to be displayed (if another field is pressed)
        if (game.currentLevel.quizClickedPhenomenon) {
          element.innerHTML = game.currentLevel.quizClickedPhenomenon;
        }
        game.currentLevel.quizClickedPhenomenonBox.style.color = "grey";
        game.currentLevel.quizClickedPhenomenon = "";
      });
    }

    this.loadQuizSounds();
    return loadedPhenomena;
  }

  reset() {
    game.currentLevel.load(this.enableAssist);
    this.loadHotSpotImage(false);
  }

  check() {
    let rightAnswer = true;
    for (let phenomeno of this.phenomenaCheckList) {
      rightAnswer &= (phenomeno[1] === document.getElementById(phenomeno[0]).innerText);
    }

    // Win/fail sounds must be played after any (even empty) hotspot sound,
    // thus hotspot must be clicked before changing the audio source in the following if-statement.
    // Otherwise, the check button will play hotspot's sound instead of the win/fail sound.
    this.hotSpotImages = [rightAnswer ? "images/win.png" : "images/lost.png"];
    this.loadHotSpotImage(false);
    document.getElementById("hotspot").click();

    if (rightAnswer) {
      audio.src = "sounds/win.wav";
    } else {
      audio.src = "sounds/fail.wav";

      if (this.enableAssist) {
        for (let phenomeno of this.phenomenaCheckList) {
          if (phenomeno[1] !== document.getElementById(phenomeno[0]).innerText) {
            document.getElementById(phenomeno[0]).lastElementChild.innerText = "";
            document.getElementById(phenomeno[0] + "P").style.color = "#333399";
          }
        }
      }

      this.enableAssist = true;
    }

    audio.play();
  }

  loadQuizSounds() {
    for (let sound of this.quizSounds) {
      document.getElementById(sound[0]).addEventListener("click", function () {
        audio.src = sound[1];
        audio.play();
      });
    }
  }
}
