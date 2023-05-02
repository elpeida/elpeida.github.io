function createLevel0() {
  let levelNumber = 0;
  let pencilInfo = "sounds/level_0.mp3";
  let mainContent = "";
  let background = "images/dinosaurs.svg";
  let hotSpotImages = [];
  let previousLevel = 0;
  let nextLevel = 1;
  let sounds = "";
  let levelTitle = "";
  let hotspotSound = "";

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound);
}

game.addLevel(createLevel0());
