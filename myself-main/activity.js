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

function onSpeaker(event) {
  playSound(sformat('resource/myself-{}.mp3', act.level + 1));
}

function onHome(event) {
  window.history.back();
  playSound('resource/click.mp3');
}

function onHelp(event) {
  ge('help').style.display = 'flex';
  ge('helpaudio').play();
  playSound('resource/click.mp3');
}

function onHelpHide(event) {
  if (['help'].includes(event.srcElement.id)
    && ge('help').style.display == 'flex') {
    ge('help').style.display = 'none';
    ge('helpaudio').pause();
    ge('helpaudio').currentTime = 0;
  }
}

function onFullScreen(event) {
  playSound('resource/click.mp3');
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

function playSound(soundFile) {
  if (!act.sound) {
    act.sound = new Audio(soundFile);
  } else {
    act.sound.src = soundFile;
  }
  act.sound.play();
}

function stopSound() {
  if (act.sound) {
    act.sound.pause();
    act.sound.currentTime = 0;
  }
}

function onThumbnail(event) {
  // convert "t12" to 12
  initLevel(parseInt(event.target.id.substring(1)));
  playSound('resource/click.mp3');
  ge('photodiv').style.display = 'block';
  ge('bar_previous').style.display = 'block';
  ge('level').style.display = 'inline';
  ge('bar_next').style.display = 'block';
  ge('thumbnails').style.display = 'none';
  setKeyframes(ge('photodiv'), [
    '0% { transform: scale(0.2); }',
    '100% { transform: scale(1); }'].join('\n'), '1.5s');
}

function onClose(event) {
  playSound('resource/click.mp3');
  ge('bar_previous').style.display = 'none';
  ge('level').style.display = 'none';
  ge('bar_next').style.display = 'none';
  setKeyframes(ge('photodiv'), [
    '50% { transform: scale(0.01); }',
    '100% { transform: scale(0.01); }'].join('\n'),
    '1.5s');
  setTimeout(Closed, 700);
}

function Closed() {
  ge('photodiv').style.display = 'none';
  ge('thumbnails').style.display = '';
  setKeyframes(ge('thumbnails'), [
    '0% { transform: scale(0.01); }',
    '100% { transform: scale(1); }'].join('\n'), '1.5s');
}

function applyVote() {
  v = act.votes[act.level];
  for (i = 1; i <= 5; i++) {
    if (i == v) {
      ge(sformat('v{}', i)).src = sformat('resource/v{}-on.svg', i);
    }
    else {
      ge(sformat('v{}', i)).src = sformat('resource/v{}-off.svg', i);
    }
  }
}

function onVote(event) {
  playSound('resource/click.mp3');
  act.votes[act.level] = parseInt(event.target.id.substring(1));
  applyVote();
}

function onSave(event) {
  playSound('resource/save.mp3');
  const iframe = document.createElement('iframe');

  iframe.style.height = 0;
  iframe.style.visibility = 'hidden';
  iframe.style.width = 0;

  var body = `<html>
<style>
#ifr {
  display: flex;
}
#ifr > img {
  width: 20em;
  left:3em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-right: 5em;
}
.vote > img {
  margin-top: 6em;
  width: 3em;
}
</style>
<body>`;
  for (i = 0; i < 15; i += 1) {
    body += `<div id="ifr">
  <img src="resource/photo${i}.jpg" alt="">
  <div class="vote">`
    v = act.votes[i];
    for (j = 1; j <= 5; j++) {
      if (j == v) {
        body += sformat('<img src="resource/v{}-on.svg">', j);
        break;
      }
      else {
        body += sformat('<img src="resource/v{}-off.svg">', j);
      }
    }
    body += '</div></div>';
  }
  body += '</body></html>';
  iframe.setAttribute('srcdoc', body);
  document.body.appendChild(iframe);
  iframe.contentWindow.onafterprint = function(){
    stopSound();
  }
  iframe.addEventListener('load', function () {
    iframe.contentWindow.print();
  }
  );
}

function onPrint(event) {
  // Create a fake iframe
  playSound('resource/print.mp3');
  const iframe = document.createElement('iframe');

  // Make it hidden
  iframe.style.height = 0;
  iframe.style.visibility = 'hidden';
  iframe.style.width = 0;

  // Set the iframe's source
  iframe.setAttribute('srcdoc', '<html><body></body></html>');

  document.body.appendChild(iframe);

  iframe.addEventListener('load', function () {
    // Clone the image
    const image = ge('photo').cloneNode();
    image.style.maxWidth = '100%';

    // Append the image to the iframe's body
    const body = iframe.contentDocument.body;
    body.style.textAlign = 'center';
    body.appendChild(image);
    iframe.contentWindow.onafterprint = function(){
      stopSound();
    }
    image.addEventListener('load', function () {
      // Invoke the print when the image is ready
      iframe.contentWindow.print();
    });
  });
}

function onPrevious(event) {
  initLevel(act.level - 1);
  playSound('resource/click.mp3');
}

function onNext(event) {
  initLevel(act.level + 1);
  playSound('resource/click.mp3');
}

function playSound(soundFile) {
  if (!act.sound) {
    act.sound = new Audio(soundFile);
  } else {
    act.sound.src = soundFile;
  }
  act.sound.play();
}

function initLevel(newLevel) {
  var numLevels = 15;
  act.level = (newLevel + numLevels) % numLevels;
  ge('photo').src = sformat('resource/photo{}.jpg', act.level);
  ge('level').innerHTML = (act.level + 1).toString();
  applyVote();
}

function initActivity() {
  var i;
  act = {
    level: 0,
    sound: null,
    sheet: null,
    votes: new Array(15),
    mouseX: 0,  // The ontouchend event doesn't contain any coords,
    mouseY: 0,  // so we keep the last ontouchmove ones.
  };
  console.log(act.votes);
  onResize();
  // Create a <style> element for animations, to avoid CORS issues on Chrome
  act.sheet = document.styleSheets[0];
  // TODO: dynamically? document.head.appendChild(document.createElement('style'));
  // Install event handlers
  document.body.onresize = onResize;
  //document.body.oncontextmenu = doPreventDefault;
  for (i = 0; i < 15; i += 1) {
    ge(sformat('t{}', i)).onclick = onThumbnail;
    act.votes[i] = 0;
  }
  for (i = 1; i < 6; i += 1) {
    ge(sformat('v{}', i)).onclick = onVote;
  }
  ge('close').onclick = onClose;
  ge('print').onclick = onPrint;
  ge('save').onclick = onSave;
  ge('speaker').onclick = onSpeaker;
  ge('bar_home').onclick = onHome;
  ge('molivis').onclick = onHelp;
  ge('help').onclick = onHelpHide;
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
