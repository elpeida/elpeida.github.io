/*
Copyright (C) 2023 Dimitris Nikolos <dnikolos@gmail.com>.
SPDX-License-Identifier: CC-BY-SA-4.0
*/
var act = null;  // activity object, see initActivity()

function onError(message, source, lineno, colno, error) {
  alert(sformat('Σφάλμα προγραμματιστή!\n'
    + 'message: {}\nsource: {}\nlineno: {}\ncolno: {}\nerror: {}',
  message, source, lineno, colno, error));
}

// ES6 string templates don't work in old Android WebView
function sformat(format) {
  var args = arguments;
  var i = 0;
  return format.replace(/{(\d*)}/g, function sformatReplace(match, number) {
    i += 1;
    if (typeof args[number] !== 'undefined') {
      return args[number];
    }
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
    return match;
  });
}


function ge(element) {
  return document.getElementById(element);
}

function setAnimation(eleName,aniName,aniDur){
  // Code for Chrome, Safari, and Opera
  ge(eleName).style.WebkitAnimationName = aniName;
  // Standard syntax
  ge(eleName).style.animationName = aniName;
  ge(eleName).style.animationDuration = aniDur;
}

function onResize(event) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w / h < 16 / 9) {
    document.body.style.fontSize = sformat('{}px', w / (16*4));
  } else {
    document.body.style.fontSize = sformat('{}px', h / (9*4));
  }
}

function doPreventDefault(event) {
  event.preventDefault();
}

function onPrevious(event) {
  if (act.level!=0)
    initLevel((act.level - 1) % act.numLevels)
}

function onNext(event) {
  initLevel((act.level + 1) % act.numLevels);
}

function onHome(event) {
  window.history.back();
}

function onHelp(event) {
  ge('dialog').style.display = 'flex';
  ge('feedback').style.display = 'none';
  ge('help').style.display = 'flex';
  ge('helpaudio').play();
}

function onHelpHide(event) {
  ge('help').style.display = '';
  ge('helpaudio').pause();
  ge('helpaudio').currentTime = 0;
  resetplaylist();//onhelphide hide feedback too
}


function onFullScreen(event) {
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen
    || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen
    || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement
    && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

function resetplaylist(){
  ge('plusR').removeEventListener('ended',playlistplay);
  ge('plusY').removeEventListener('ended',playlistplay);
  ge('plusB').removeEventListener('ended',playlistplay);
  ge('minusR').removeEventListener('ended',playlistplay);
  ge('minusY').removeEventListener('ended',playlistplay);
  ge('minusB').removeEventListener('ended',playlistplay);

  ge('plusR').pause();
  ge('plusY').pause();
  ge('plusB').pause();
  ge('minusR').pause();
  ge('minusY').pause();
  ge('minusB').pause();

  ge('plusR').currentTime = 0;
  ge('plusY').currentTime = 0;
  ge('plusB').currentTime = 0;
  ge('minusR').currentTime = 0;
  ge('minusY').currentTime = 0;
  ge('minusB').currentTime = 0;
}

function playlistplay(){
  if (act.tracknum < act.idsplaylist.length) {
    const currentAudio = act.idsplaylist[act.tracknum];
    currentAudio.play();
    act.tracknum++;
  }
}

function onColorChange(event) {
  ge('path_colour_1').style.fill = ryb2rgb(act.workingColor,act.colorStep[act.level]);
}

function changeColor(event,color,add){
  //color is 'R','Y','B'
  //add True for plus False for minus
  var maxClicks = Math.floor(255.0/act.colorStep[act.level]);
  if (!add){
    if (act.workingColor[color] > 0){
      act.workingColor[color] -= 1;
    }
  }
  else{
    if (act.workingColor[color] < maxClicks){
      act.workingColor[color] += 1;
    } 
  }
  onColorChange(event);
}
function onPlusRed(event){
  changeColor(event,'R',true );
}

function onMinusRed(event){
  changeColor(event,'R',false);
}

function onPlusYellow(event){
  changeColor(event,'Y',true );
}

function onMinusYellow(event){
  changeColor(event,'Y',false);
}

function onPlusBlue(event){
  changeColor(event,'B',true );
}

function onMinusBlue(event){
  changeColor(event,'B',false);
}

function onButtonOk(event){
  var msg = "Χρειάζεται:<br/>";
  var cnames = {'R':'κόκκινο','Y':'κίτρινο','B':'μπλε'};
  var enCnames = {'R':'red','Y':'yellow','B':'blue'};
  act.idsplaylist = [];
  for (i = 0; i<Object.keys(cnames).length; i++){
    var item = Object.keys(cnames)[i];
    if (act.workingColor[item]<act.targetColor[item]){
      msg += "<div style='color:" + enCnames[item] + ";text-shadow:1px 1px gray'> + " + cnames[item] + "</div><br/>";
      act.idsplaylist.push(ge('plus'+item)); //plusR,plusY or plusB since we have <audio id="plusR"> in the html
    }
    else{
      if (act.workingColor[item]>act.targetColor[item]){
        msg += "<div style='color:" + enCnames[item] + ";text-shadow:1px 1px gray'> - " + cnames[item] + "</div><br/>";
        act.idsplaylist.push(ge('minus'+item)); //minusR,minusY or minusB since we have <audio id="minusR"> in the html
      }
    }
    
  }
  if (ryb2rgb(act.workingColor,act.colorStep[act.level]) != ryb2rgb(act.targetColor,act.colorStep[act.level])){
    ge('dialog').style.display = 'none';
    ge('feedback').innerHTML = msg;
    ge('feedback').style.display = '';
    ge('help').style.display = 'flex';
    act.idsplaylist.forEach(audio => {
      audio.addEventListener('ended', playlistplay);
    });
    act.tracknum = 0;
    playlistplay();
  }
  else{
    setTimeout(function(){ge('win').style.display = "block";},500)
    setTimeout(function(){ge('win').style.display = "none";},3500);
    setTimeout(onNext,3500);
  }
}
function initLevel(newLevel) {
  

  if (newLevel == 0){
    act.targetColors = [];
  }
  act.level = newLevel;//newLevel is from 0 to max
  ge('leveltext').innerHTML = act.level + 1;
  t = getRandomColor(act.colorNum[act.level],act.colorStep[act.level]);
  var safety = 0;//safety mechanism, new color must be found in 10 tries
  while (act.targetColors.indexOf(ryb2rgb(t,act.colorStep[act.level])) >= 0 && safety<10){
    t = getRandomColor(act.colorNum[act.level],act.colorStep[act.level]);
    safety++;
  }
  act.targetColor = t;
  act.targetColors.push(ryb2rgb(t,act.colorStep[act.level]));
  ge('path_colour_2').style.fill = ryb2rgb(act.targetColor,act.colorStep[act.level]);
  act.workingColor = {'R':0,'Y':0,'B':0};
  onColorChange();
}


function initActivity() {
  document.body.onresize = onResize;
  document.body.oncontextmenu = doPreventDefault;

  ge('bar_home').onclick = onHome;
  ge('bar_help').onclick = onHelp;
  ge('bar_previous').onclick = onPrevious;
  ge('bar_next').onclick = onNext;
  ge('help').onclick = onHelpHide;
  ge('redplus').onclick = onPlusRed;
  ge('redminus').onclick = onMinusRed;
  ge('yellowplus').onclick = onPlusYellow;
  ge('yellowminus').onclick = onMinusYellow;
  ge('blueplus').onclick = onPlusBlue;
  ge('blueminus').onclick = onMinusBlue;
  ge('button_ok').onclick = onButtonOk;
  for (i = 0; i < document.images.length; i += 1) {
    document.images[i].ondragstart = doPreventDefault;
  }
  act = {
    level: 0,
    colorStep: [255, 255, 255, 255, 255, 255,125,125,125,125, 75, 75, 75, 75],
    colorNum:  [  1,   1,   2,   2,   3,   3,  2,  2,  3,  3,  2,  3,  3,  3],
    numLevels: 14,
    workingColor: {'R':0,'Y':0,'B':0},
    targetColor: {'R':0,'Y':0,'B':0},
    targetColors : [],
    sheet:  null,
    idsplaylist: [],
    tracknum: 0,
  };




  onColorChange();
  onResize();
  act.sheet = document.styleSheets[0];
  initLevel(act.level);
}

window.onerror = onError;
window.onload = initActivity;
// Call onResize even before the images are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onResize);
} else {  // `DOMContentLoaded` already fired
  onResize();
}



