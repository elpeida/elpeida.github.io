function createLevel6() {
  let levelNumber = 6;
  let pencilInfo = "sounds/level_6.mp3";
  let mainContent = "";
  let background = "images/dinosaurs.svg";
  let hotSpotImages = [];
  let previousLevel = 5;
  let nextLevel = 6;
  let sounds = "";
  let levelTitle = "";
  let hotspotSound = "";

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound);
}

game.addLevel(createLevel6());
