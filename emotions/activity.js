/*
Copyright (C) 2023 Myrto Georgopoulou <github.com/eltoukos>
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
  playAudio('resource/chest-open.mp3');
  setKeyframes(ge('photodiv'), [
    '0% { transform: translateX(-2em) scale(0.01); }',
    '40% { transform: translateX(-7em) translateY(-9em) scale(0.5); }'].join('\n'), '2s');
}

function onPhotodivClose(event) {
  playAudio('resource/click.mp3');
  setKeyframes(ge('photodiv'), [
    '50% { transform: scale(0.01); }',
    '100% { transform: scale(0.01); }'].join('\n'),
    '2s');
  setTimeout(photodivClosed, 1000);
}

function photodivClosed() {
  ge('photodiv').style.display = 'none';
  ge('chest').src = 'resource/chest-closed.svg';
  playAudio('resource/chest-close.mp3');
}

function onCameraClose(event) {
  playAudio('resource/click.mp3');
  setKeyframes(ge('cameradiv'), [
    '50% { transform: scale(0.01); }',
    '100% { transform: scale(0.01); }'].join('\n'),
    '1s');
  const videoTrack = act.stream.getVideoTracks()[0];
  videoTrack.stop();
  act.stream.removeTrack(videoTrack);
  setTimeout(cameraClosed, 500);
}

function cameraClosed() {
  ge('cameradiv').style.display = 'none';
  ge('shadow').style.display = 'none';
}

function onSpeaker(event) {
  playAudio(sformat('resource/emotion-{}.mp3', act.level + 1));
}

async function onCamera(event) {
  playAudio('resource/click.mp3');

  try {
    let newstream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (!act.stream) {
      act.stream = newstream;
    } else {
      const videoTrack = newstream.getVideoTracks()[0];
      act.stream.addTrack(videoTrack);
    }
    renderVideo();
    ge('shadow').style.display = 'flex';
    ge('cameradiv').style.display = 'block';
    ge('helpdiv').style.display = 'none';
    ge('canvas').style.display = 'none';
    ge('video').style.display = 'block';
    ge('retry').style.display = 'none';
    ge('shutter').style.display = '';
    ge('camera_save').style.display = 'none';
    setKeyframes(ge('cameradiv'), [
      '0% { transform: scale(0.01); }',
      '70% { transform: scale(1.1); }',
      '100% { transform: scale(1); }'].join('\n'), '1s');
      
    let stream_settings = act.stream.getVideoTracks()[0].getSettings();

    // actual width & height of the camera video
    let stream_width = stream_settings.width;
    let stream_height = stream_settings.height;

    console.log('Width: ' + stream_width + 'px');
    console.log('Height: ' + stream_height + 'px');
  } catch (err) {
    alert('Θα πρέπει να επιτρέψετε την χρήση της κάμερας για να βγάλετε φωτογραφία!');
    console.log(err);
  }
}

function renderVideo() {  
  const video = ge('video');
  video.srcObject = act.stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
}

function onRetry(event) {
  ge('video').style.display = 'block';
  ge('canvas').style.display = 'none';
  ge('retry').style.display = 'none';
  ge('shutter').style.display = '';
  ge('camera_save').style.display = 'none';
  playAudio('resource/click.mp3');
}

function onShutter(event) {
  let canvas = ge('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  ge('video').style.display = 'none';
  ge('canvas').style.display = 'block';
  ge('retry').style.display = '';
  ge('shutter').style.display = 'none';
  ge('camera_save').style.display = '';
  playAudio('resource/camera.mp3');
}

function onCameraSave(event) {
  const link = document.createElement('a');
  link.download = 'emotion.jpg';
  link.href = ge('canvas').toDataURL('image/jpeg');
  link.click();
  link.delete;
  ge('video').style.display = '';
  ge('canvas').style.display = 'none';
  ge('retry').style.display = 'none';
  ge('shutter').style.display = '';
  ge('camera_save').style.display = 'none';
  playAudio('resource/save.mp3');
}

function onMic(event) {
  playAudio('resource/click.mp3');
  ge('shadow').style.display = 'flex';
  ge('helpdiv').style.display = 'none';
  ge('audiodiv').style.display = 'block';
  ge('play_stop').src = 'resource/record.svg';
  ge('audio_close').style.display = '';
  ge('audio_save').style.display = '';
  ge('audio').style.display = 'block';
  setKeyframes(ge('audiodiv'), [
    '0% { transform: scale(0.01); }',
    '70% { transform: scale(1.1); }',
    '100% { transform: scale(1); }'].join('\n'), '1s');
}

function onPlayStop(event) {
  playAudio('resource/click.mp3');
  if (ge('play_stop').src.endsWith('/stop.svg')) {
    ge('play_stop').src = 'resource/record.svg';
  } else {
    ge('play_stop').src = 'resource/stop.svg';
  }
  ge('audio_save').style.filter = 'grayscale(0%)';
}

function onAudioSave(event) {
  ge('play_stop').src = 'resource/record.svg';
  ge('camera_save').style.display = 'none';
  playAudio('resource/save.mp3');
}

function onAudioClose(event) {
  playAudio('resource/click.mp3');
  setKeyframes(ge('audiodiv'), [
    '50% { transform: scale(0.01); }',
    '100% { transform: scale(0.01); }'].join('\n'),
    '1s');
  setTimeout(audioClosed, 500);
}

function audioClosed() {
  ge('audiodiv').style.display = 'none';
  ge('shadow').style.display = 'none';
}

function onHome(event) {
  window.history.back();
  playAudio('resource/click.mp3');
}

function onHelp(event) {
  ge('shadow').style.display = 'flex';
  ge('cameradiv').style.display = 'none';
  ge('helpdiv').style.display = 'block';
  ge('helpaudio').play();
  playAudio('resource/click.mp3');
}

function onShadow(event) {
  if (['helpdiv', 'shadow'].includes(event.srcElement.id)
    && ge('helpdiv').style.display == 'block') {
    ge('shadow').style.display = '';
  }
}

function onAbout(event) {
  //window.open('credits/index_DS_II.html');
  playAudio('resource/click.mp3');
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
  var numLevels = 10;
  act.level = (newLevel + numLevels) % numLevels;
  ge('photo').src = sformat('resource/photo{}.jpg', act.level);
  ge('level').innerHTML = (act.level + 1).toString();
}

function initActivity() {
  var i;
  act = {
    level: 0,
    sheet: null,
    stream: null,
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
  ge('photodiv_close').onclick = onPhotodivClose;
  ge('camera_close').onclick = onCameraClose;
  ge('audio_close').onclick = onAudioClose;
  ge('play_stop').onclick = onPlayStop;
  ge('speaker').onclick = onSpeaker;
  ge('mic').onclick = onMic;
  ge('camera').onclick = onCamera;
  ge('retry').onclick = onRetry;
  ge('shutter').onclick = onShutter;
  ge('camera_save').onclick = onCameraSave;
  ge('audio_save').onclick = onAudioSave;
  ge('bar_home').onclick = onHome;
  ge('bar_help').onclick = onHelp;
  ge('shadow').onclick = onShadow;
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
