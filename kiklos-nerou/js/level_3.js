function createLevel3_1() {
  let levelNumber = 3.1;
  let pencilInfo = "sounds/level_3_1.mp3";
  let mainContent = "<div class=\"row col-2 wind-div\" id=\"wind\">\
    <img src=\"images/wind.svg\" class=\"wind-asset\"/>\
  </div>\
  <div class=\"row col-2 cloud-div level3\" id=\"cloudRain\">\
    <img src=\"images/level_3/rain_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = ["images/hotspot_images/3.1/1.png", "images/hotspot_images/3.1/3.png"];
  let previousLevel = 2;
  let nextLevel = 4;
  let sounds = [["cloudRain", "sounds/3_1_cloud.mp3"], ["wind", "sounds/3_wind.mp3"]];
  let levelTitle = "ΚΑΤΑΚΡΗΜΝΙΣΗ - ΒΡΟΧΗ";
  let hotspotSound = "sounds/hotspot_3_1.mp3";
  let phenomena = [new Phenomenon("cloudRain", 0, [0.16, 0])];

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound, phenomena);
}

function createLevel3_2() {
  let levelNumber = 3.2;
  let pencilInfo = "sounds/level_3_2.mp3";
  let mainContent = "<div class=\"row col-2 wind-div\" id=\"wind\">\
    <img src=\"images/wind.svg\" class=\"wind-asset\"/>\
  </div>\
  <div class=\"row col-2 cloud-div level3\" id=\"cloudHail\">\
    <img src=\"images/level_3/hail_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = ["images/hotspot_images/3.2/1.png", "images/hotspot_images/3.2/2.png", "images/hotspot_images/3.2/3.png"];
  let previousLevel = 2;
  let nextLevel = 4;
  let sounds = [["cloudHail", "sounds/3_2_cloud.mp3"], ["wind", "sounds/3_wind.mp3"]];
  let levelTitle = "ΚΑΤΑΚΡΗΜΝΙΣΗ - ΧΑΛΑΖΙ";
  let hotspotSound = "";
  let phenomena = [new Phenomenon("cloudHail", 0, [0.16, 0])];

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound, phenomena);
}

function createLevel3_3() {
  let levelNumber = 3.3;
  let pencilInfo = "sounds/level_3_3.mp3";
  let mainContent = "<div class=\"row col-2 wind-div\" id=\"wind\">\
    <img src=\"images/wind.svg\" class=\"wind-asset\"/>\
  </div>\
  <div class=\"row col-2 cloud-div level3\" id=\"cloudSleet\">\
    <img src=\"images/level_3/sleet_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = [];
  let previousLevel = 2;
  let nextLevel = 4;
  let sounds = [["cloudSleet", "sounds/3_3_cloud.mp3"], ["wind", "sounds/3_wind.mp3"]];
  let levelTitle = "ΚΑΤΑΚΡΗΜΝΙΣΗ - ΧΙΟΝΟΝΕΡΟ";
  let hotspotSound = "";
  let phenomena = [new Phenomenon("cloudSleet", 0, [0.20, 0])];

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound, phenomena);
}

function createLevel3_4() {
  let levelNumber = 3.4;
  let pencilInfo = "sounds/level_3_4.mp3";
  let mainContent = "<div class=\"row col-2 wind-div\" id=\"wind\">\
    <img src=\"images/wind.svg\" class=\"wind-asset\"/>\
  </div>\
  <div class=\"row col-2 cloud-div level3\" id=\"cloudSnow\">\
    <img src=\"images/level_3/snow_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = ["images/hotspot_images/3.4/1.png", "images/hotspot_images/3.4/2.png"];
  let previousLevel = 2;
  let nextLevel = 4;
  let sounds = [["cloudSnow", "sounds/3_4_cloud.mp3"], ["wind", "sounds/3_wind.mp3"]];
  let levelTitle = "ΚΑΤΑΚΡΗΜΝΙΣΗ - ΧΙΟΝΙ";
  let hotspotSound = "";
  let phenomena = [new Phenomenon("cloudSnow", 0, [0.34, 0])];

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound, phenomena);
}

game.addLevel(createLevel3_1());
game.addLevel(createLevel3_2());
game.addLevel(createLevel3_3());
game.addLevel(createLevel3_4());
