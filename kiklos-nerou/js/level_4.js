function createLevel4() {
  let levelNumber = 4;
  let pencilInfo = "sounds/level_4.mp3";
  let mainContent = "<div id=\"cloudRain\" class=\"row col-2 cloud-div rain level4\">\
    <img src=\"images/level_4/rain_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudHail\" class=\"row col-2 cloud-div hail level4\">\
    <img src=\"images/level_4/hail_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudSleet\" class=\"row col-2 cloud-div sleet level4\">\
    <img src=\"images/level_4/sleet_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"cloudSnow\" class=\"row col-2 cloud-div snow level4\">\
    <img src=\"images/level_4/snow_cloud_with_drops.svg\" class=\"cloud-asset\"/>\
  </div>\
  <div id=\"limni\" class=\"row col-1 level4-button\">\
    <img src=\"images/level_4/limni.svg\" style=\"transform: scale(1.3)\"/>\
  </div>\
  <div id=\"thalassa\" class=\"row col-1 level4-button\">\
    <img src=\"images/level_4/thalassa.svg\" style=\"transform: scale(1.5)\"/>\
  </div>\
  <div id=\"potami\" class=\"row col-1 level4-button\">\
    <img src=\"images/level_4/potami.svg\" style=\"transform: scale(1.3)\"/>\
  </div>\
  <div id=\"ydroforeas\" class=\"row col-1 level4-button\">\
    <img src=\"images/level_4/ydroforeas.svg\" style=\"transform: scale(2.7)\"/>\
  </div>";
  let background = "images/background.svg";
  let hotSpotImages = ["images/hotspot_images/4/1.png", "images/hotspot_images/4/2.png", "images/hotspot_images/4/3.png", "images/hotspot_images/4/4.png"];
  let previousLevel = 3.1;
  let nextLevel = 5;
  let sounds = [["limni", "sounds/4_limni.mp3"],
  ["thalassa", "sounds/4_thalassa.mp3"],
  ["potami", "sounds/4_potami.mp3"],
  ["ydroforeas", "sounds/4_ydroforeas.mp3"]];
  let hotspotSound = "";
  let levelTitle = "ΣΥΓΚΕΝΤΡΩΣΗ";

  return new Level(levelNumber, pencilInfo, mainContent, background, hotSpotImages, previousLevel, nextLevel, sounds, levelTitle, hotspotSound);
}

game.addLevel(createLevel4());
