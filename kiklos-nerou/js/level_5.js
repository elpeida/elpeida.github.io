function createLevel5() {
  let levelNumber = 5;
  let pencilInfo = "sounds/level_5.mp3";
  let mainContent = "<div class=\"quizAnswerField\"  id=\"katakrimnisi\">\
      <img class=\"col speaker field-speaker\" src=\"images/speaker.svg\"  id=\"katakrimnisi_sound\"/>\
      <p class=\"quiz-answer-text\"></p>\
    </div>\
    <div class=\"quizAnswerField \"  id=\"eksatmisi\">\
      <img class=\"col speaker field-speaker\" src=\"images/speaker.svg\"  id=\"eksatmisi_sound\"/>\
      <p class=\"quiz-answer-text\"></p>\
    </div>\
    <div class=\"quizAnswerField \"  id=\"sympiknwsi\">\
      <img class=\"col speaker field-speaker\" src=\"images/speaker.svg\"  id=\"sympiknwsi_sound\"/>\
      <p class=\"quiz-answer-text\"></p>\
    </div>\
    <div class=\"quizAnswerField \"  id=\"sygkentrwsi\">\
      <img class=\"col speaker field-speaker\" src=\"images/speaker.svg\"  id=\"sygkentrwsi_sound\"/>\
      <p class=\"quiz-answer-text\"></p>\
    </div>";

  let background = "images/quiz_bg.svg";
  let hotSpotImages = "";
  let previousLevel = 4;
  let nextLevel = 6;
  let sounds = [
    ["katakrimnisi_sound", "sounds/quiz_katakrimnisi_erotisi.mp3"],
    ["eksatmisi_sound", "sounds/quiz_eksatmisi_erotisi.mp3"],
    ["sympiknwsi_sound", "sounds/quiz_sympiknosi_erotisi.mp3"],
    ["sygkentrwsi_sound", "sounds/quiz_sygkentrosi_erotisi.mp3"]
  ];

  let quizSounds = [
    ["katakrimnisi-speaker", "sounds/quiz_katakrimnisi.mp3"],
    ["eksatmisi-speaker", "sounds/quiz_eksatmisi.mp3"],
    ["sympiknwsi-speaker", "sounds/quiz_sympiknosi.mp3"],
    ["sygkentrwsi-speaker", "sounds/quiz_sygkentrosi.mp3"]
  ];

  let phenomenaCheckList = [
    ["katakrimnisi", "ΚΑΤΑΚΡΗΜΝΙΣΗ"],
    ["eksatmisi", "ΕΞΑΤΜΙΣΗ"],
    ["sympiknwsi", "ΣΥΜΠΥΚΝΩΣΗ"],
    ["sygkentrwsi", "ΣΥΓΚΕΝΤΡΩΣΗ"]
  ]

  let phenomenaList = "<div class=\"level5 col phenomenon\" id=\"katakrimnisiP\">\
                          <p>ΚΑΤΑΚΡΗΜΝΙΣΗ</p></div>\
  <img class=\"col game_buttons speaker phenomenon-speaker\" src=\"images/speaker.svg\" id=\"katakrimnisi-speaker\" />\
  <div class=\"level5 col phenomenon\" id=\"eksatmisiP\">\
    <p>ΕΞΑΤΜΙΣΗ</p></div>\
  <img class=\"col game_buttons speaker phenomenon-speaker\" src=\"images/speaker.svg\" id=\"eksatmisi-speaker\" />\
  <div class=\"level5 col phenomenon\" id=\"sympiknwsiP\">\
    <p>ΣΥΜΠΥΚΝΩΣΗ</p></div>\
  <img class=\"col game_buttons speaker phenomenon-speaker\" src=\"images/speaker.svg\" id=\"sympiknwsi-speaker\" />\
  <div class=\"level5 col phenomenon\" id=\"sygkentrwsiP\">\
    <p>ΣΥΓΚΕΝΤΡΩΣΗ</p></div>\
  <img class=\"col game_buttons speaker phenomenon-speaker\" src=\"images/speaker.svg\" id=\"sygkentrwsi-speaker\" />"

  let levelTitle = "ΑΣ ΠΑΙΞΟΥΜΕ...";
  let hotspotSound = "";

  return new QuizLevel(phenomenaCheckList, phenomenaList, quizSounds, levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound);
}

game.addLevel(createLevel5());