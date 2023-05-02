function createLevel1() {
  let levelNumber = 1;
  let pencilInfo = "sounds/level_1.mp3";
  let mainContent =
    "<div id=\"thermometer-div\" class=\"row col-2\">\
    <img src=\"images/level_1/therm.svg\"/>\
  </div>\
  <div id=\"eksatmisi\" class=\"row col-1 level1-button\">\
    <img src=\"images/level_1/eksatmisi.svg\" style=\"transform: scale(1.5)\"/>\
  </div>\
  <div id=\"diapnoi\" class=\"row col-1 level1-button\">\
    <img src=\"images/level_1/diapnoi.svg\" style=\"transform: scale(1.5)\"/>\
    </div>\
  <div id=\"eksaxnosi\" class=\"row col-1 level1-button\">\
    <img src=\"images/level_1/eksaxnosi.svg\" style=\"transform: scale(1.5)\"/>\
    </div>\
  <div id=\"pagetonas\" class=\"row col-1 level1-button\">\
    <img src=\"images/level_1/pagetonas.svg\" style=\"transform: scale(1.5)\"/>\
    </div>\
  <div id=\"ydratmoi\" class=\"row col-1 level1-button\">\
    <img src=\"images/level_1/ydratmoi.svg\" style=\"transform: scale(1.5)\"/>\
  </div>";
  let background = "images/level_1/bg.svg";
  let hotSpotImages = ["images/hotspot_images/1/1.png", "images/hotspot_images/1/2.png"];
  let previousLevel = 0;
  let nextLevel = 2;
  let sounds = [["thermometer-div", "sounds/1_thermometro.mp3"],
  ["eksatmisi", "sounds/1_eksatmisi.mp3"],
  ["diapnoi", "sounds/1_diapnoi.mp3"],
  ["eksaxnosi", "sounds/1_eksaxnosi.mp3"],
  ["pagetonas", "sounds/1_pagetonas.mp3"],
  ["ydratmoi", "sounds/1_ydratmoi.mp3"]
  ];
  let levelTitle = "ΕΞΑΤΜΙΣΗ";
  let hotspotSound = "sounds/hotspot_1.mp3";

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound);
}

game.addLevel(createLevel1());
