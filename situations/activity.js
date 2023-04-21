/*
Copyright (C) 2023 Myrto Georgopoulou <myrto.georgopoulou@gmail.com>.
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

function setKeyframes(element, rule, duration) {
  var e = element;
  var i;
  var name = sformat('{}_animation', e.id);

  // The webkit* stuff is for old android webview versions
  e.style.animationName = '';
  e.style.webkitAnimationName = '';
  // First, delete the old animation for this element, if it exists
  for (i = 0; i < act.sheet.cssRules.length; i += 1) {
    if (act.sheet.cssRules[i].name === name) {
      act.sheet.deleteRule(i);
    }
  }
  // Now add the rule
  try {
    act.sheet.insertRule(sformat('@keyframes {} { {} }', name, rule), act.sheet.cssRules.length);
  } catch (err) {
    act.sheet.insertRule(sformat('@-webkit-keyframes {} { {} }', name, rule), act.sheet.cssRules.length);
  }
  void e.offsetWidth;  // https://css-tricks.com/restart-css-animation/
  // IE needs animationDuration before animationName
  e.style.animationDuration = duration || '2s';
  e.style.webkitAnimationDuration = e.style.animationDuration;
  e.style.animationName = name;
  e.style.webkitAnimationName = e.style.animationName;
}

function onResize(event) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w / h < 640 / 360) {
    document.body.style.fontSize = sformat('{}px', 10 * w / 640);
  } else {
    document.body.style.fontSize = sformat('{}px', 10 * h / 360);
  }
}

function doPreventDefault(event) {
  event.preventDefault();
}

function onChest(event) {
  ge('chest').src = 'resource/chest-open.svg';
  ge('photodiv').style.display = 'block';
  playAudio('resource/chest.mp3');
  setKeyframes(ge('photodiv'), [
    '0% { transform: translateX(-2em) scale(0.01); }',
    '40% { transform: translateX(-7em) translateY(-9em) scale(0.5); }'].join('\n'), '2s');
}

function onClose(event) {
  playAudio('resource/click.mp3');
  setKeyframes(ge('photodiv'), [
    '50% { transform: scale(0.01); }',
    '100% { transform: scale(0.01); }'].join('\n'),
     '2s');
  setTimeout(closed, 1000);
}

function closed() {
  ge('photodiv').style.display = 'none';
  ge('chest').src = 'resource/chest-closed.svg';
}

function onSpeaker(event) {
playAudio(sformat('resource/situation-{}.mp3', act.level + 1));
}

function onFace(event) {
  playAudio('resource/faceclick.mp3');
  f = event.target;
  if (f.src.endsWith('off.svg')) {
    f.src = f.src.replace('off.svg', 'on.svg');
    if (act.lastf.id != f.id) {
      act.lastf.src = act.lastf.src.replace('on.svg', 'off.svg');
    }
  } else {
    f.src = f.src.replace('on.svg', 'off.svg');
  }
  act.lastf = f;
}

function onHome(event) {
  window.history.back();
  playAudio('resource/click.mp3');
}

function onHelp(event) {
  ge('help').style.display = 'flex';
  ge('helpaudio').play();
  playAudio('resource/click.mp3');
}

function onHelpHide(event) {
  ge('help').style.display = '';
}

function onAbout(event) {
  //window.open('credits/index_DS_II.html');
  playAudio('resource/click.mp3');
}

function onFullScreen(event) {
  playAudio('resource/click.mp3');
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

function onPrevious(event) {
  initLevel(act.level - 1);
  playAudio('resource/click.mp3');
}

function onNext(event) {
  initLevel(act.level + 1);
  playAudio('resource/click.mp3');
}

function playAudio(audioFile) {
  var audio = new Audio(audioFile);
  audio.play();
}

function initLevel(newLevel) {
  var numLevels = 12;
  act.level = (newLevel + numLevels) % numLevels;
  ge('photo').src = sformat('resource/photo{}.jpg', act.level);
  ge('level').innerHTML = (act.level + 1).toString();
  act.lastf.src = act.lastf.src.replace('on.svg', 'off.svg');
}

function initActivity() {
  var i;
  act = {
    level: 0,
    sheet: null,
    lastf: ge('f0'),
    mouseX: 0,  // The ontouchend event doesn't contain any coords,
    mouseY: 0,  // so we keep the last ontouchmove ones.
  };
  onResize();
  // Create a <style> element for animations, to avoid CORS issues on Chrome
  act.sheet = document.styleSheets[0];
  // TODO: dynamically? document.head.appendChild(document.createElement('style'));
  // Install event handlers
  document.body.onresize = onResize;
  document.body.oncontextmenu = doPreventDefault;
  ge('chest').onclick = onChest;
  for (i = 0; i < 8; i += 1) {
    ge(sformat('f{}', i)).onclick = onFace;
  }
  ge('close').onclick = onClose;
  ge('speaker').onclick = onSpeaker;
  ge('bar_home').onclick = onHome;
  ge('bar_help').onclick = onHelp;
  ge('help').onclick = onHelpHide;
  ge('bar_about').onclick = onAbout;
  ge('bar_fullscreen').onclick = onFullScreen;
  ge('bar_previous').onclick = onPrevious;
  ge('bar_next').onclick = onNext;
  for (i = 0; i < document.images.length; i += 1) {
    document.images[i].ondragstart = doPreventDefault;
  }
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
