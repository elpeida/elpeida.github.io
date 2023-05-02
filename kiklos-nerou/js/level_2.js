function createLevel2() {
  let levelNumber = 2;
  let pencilInfo = "sounds/level_2.mp3";
  let mainContent = "<div id=\"cloudRain\" class=\"row col-2 cloud-div rain level2\">\
    <img src=\"images/level_2/rain_cloud.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudHail\" class=\"row col-2 cloud-div hail level2\">\
    <img src=\"images/level_2/hail_cloud.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudSleet\" class=\"row col-2 cloud-div sleet level2\">\
    <img src=\"images/level_2/snow_cloud.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudSnow\" class=\"row col-2 cloud-div snow level2\">\
    <img src=\"images/level_2/snow_cloud.svg\" class=\"cloud-asset\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = ["images/hotspot_images/2/1.png", "images/hotspot_images/2/2.png"];
  let previousLevel = 1;
  let nextLevel = 3.1;
  let sounds = "";
  let levelTitle = "ΣΥΜΠΥΚΝΩΣΗ";
  let hotspotSound = "sounds/hotspot_2.mp3";
  let phenomena = [new Phenomenon("cloudRain", 3.1), new Phenomenon("cloudHail", 3.2), new Phenomenon("cloudSleet", 3.3), new Phenomenon("cloudSnow", 3.4)]

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound, phenomena);
}

game.addLevel(createLevel2());
