/*
Copyright (C) 2018 Alkis Georgopoulos <alkisg@gmail.com>.
SPDX-License-Identifier: CC-BY-SA-4.0*/

var act = null;
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

// Return an integer from 0 to num-1.
function random(num) {
  return Math.floor(Math.random() * num);
}

// Return a shuffled copy of an array.
function shuffle(a) {
  var result = a;
  var i;
  var j;
  var temp;

  for (i = 0; i < result.length; i += 1) {
    j = random(result.length);
    temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function ge(element) {
  return document.getElementById(element);
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

function onHome(event) {
  window.history.back();
}

function onHelp(event) {
  ge('help').style.display = 'flex';
  ge('helpaudio').play();
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

function reset(event) {
  act.page = 0;
  ge('pagenum').innerHTML = sformat('{}/4', act.page + 1);
  var pnames = document.getElementsByClassName('pname');
  for (var i = 0; i < pnames.length; i++) {
    pnames[i].value = "";
  }

  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 4; j++) {
      act.cells[i][j].innerHTML = "";
    }
  }
  for (var i = 0; i < 28; i++) {
    for (var j = 0; j < 4; j++) {
      act.weather[i][j] = 0;
    }
  }
  act.answered = 0;
  ge('answered').innerHTML = sformat("Μαθητές που απάντησαν: {}", act.answered);
  graph();
}

function nextPage() {
  act.page = (act.page + 1) % 4;

  ge('pagenum').innerHTML = sformat('{}/4', act.page + 1);
  for (var i = 0; i < 4; i++) {
    ge(sformat('page{}', i)).style.display = "none";
  }
  ge(sformat('page{}', act.page)).style.display = "inline";


  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 4; j++) {
      if (act.weather[act.page * 7 + i][j] == 1) {
        if (j == 0) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/not_like.svg'/>", i, j);
        } else if (j == 1) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/not_like_2.svg'/>", i, j);
        } else if (j == 2) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/like.svg'/>", i, j);
        } else if (j == 3) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/superlike.svg'/>", i, j);
        }
      }
      else {
        act.cells[i][j].innerHTML = "";
      }
    }
  }
}

function previousPage() {
  act.page = (act.page + 3) % 4;

  ge('pagenum').innerHTML = sformat('{}/4', act.page + 1);
  for (var i = 0; i < 4; i++) {
    ge(sformat('page{}', i)).style.display = "none";
  }
  ge(sformat('page{}', act.page)).style.display = "inline";

  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 4; j++) {
      if (act.weather[act.page * 7 + i][j] == 1) {
        if (j == 0) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/not_like.svg'/>", i, j);
        } else if (j == 1) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/not_like_2.svg'/>", i, j);
        } else if (j == 2) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/like.svg'/>", i, j);
        } else if (j == 3) {
          act.cells[i][j].innerHTML = sformat("<img id='im{}{}' src='resource/superlike.svg'/>", i, j);
        }
      }
      else {
        act.cells[i][j].innerHTML = "";
      }
    }
  }
}

function graph() {
  daysOfWeather = [];
  for (var j = 0; j < 4; j++) {
    daysOfWeather.push(0);
    for (i = 0; i < 28; i++) {
      daysOfWeather[j] += act.weather[i][j];
    }
  }

  if (act.pie) {
    act.pie.data.datasets.forEach((dataset) => {
      dataset.data = daysOfWeather;
    });
    act.pie.update();
  } else {
    act.pie = new Chart(ge('pie'), {
      type: 'pie',
      data: {
        labels: ['Δεν μου αρέσει καθόλου', 'Μου αρέσει λίγο...', 'Μου αρέσει!', 'Μου αρέσει πολύ!'],
        datasets: [{
          label: 'ψήφοι',
          data: daysOfWeather,
          backgroundColor: [
            'rgba(255, 32, 32, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(75, 192, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        layout: {
          padding: 0
        },
        scales: {
          y: {
            display: false
          },
          x: {
            display: false
          }
        },
        plugins: {
          legend: {
            position: 'left',
            align: 'start',
            display: false
          }
        }
      }
    })
  };

  if (act.bar) {
    act.bar.data.datasets.forEach((dataset) => {
      dataset.data = daysOfWeather;
    });
    act.bar.update();
  } else {
    act.bar = new Chart(ge('bar'), {
      type: 'bar',
      data: {
        labels: ['Δεν μου αρέσει καθόλου', 'Μου αρέσει λίγο...', 'Μου αρέσει!', 'Μου αρέσει πολύ!'],
        datasets: [{
          label: 'ψήφοι',
          data: daysOfWeather,
          backgroundColor: [
            'rgba(255, 32, 32, 0.8)',
            'rgba(255, 128, 64, 0.8)',
            'rgba(75, 192, 64, 0.8)',
            'rgba(255, 205, 64, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            display: false
          },

        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

function cellIndex(obj, isImage) {
  if (isImage) {
    rowString = obj.id[2];
    row = parseInt(rowString);
    colString = obj.id[3];
    col = parseInt(colString);
    return ([row, col]);
  }
  else {
    rowString = obj.id[1];
    row = parseInt(rowString);
    colString = obj.id[2];
    col = parseInt(colString);
    return ([row, col]);
  }
}

function cellClick(event) {
  var cellij;
  if (event.target.tagName.toUpperCase() == 'IMG') {
    cellij = cellIndex(event.target, true);
  }
  else {
    cellij = cellIndex(event.target, false);
  }

  var i = cellij[0];
  var j = cellij[1];
  if (act.weather[act.page * 7 + i][j] == 1) {
    act.cells[i][j].innerHTML = "";
    act.weather[act.page * 7 + i][j] = 0;
    act.answered -= 1;
  }
  else {//remember to erase the other 1 if it's there
    for (var k = 0; k < 4; k++) {
      if ((act.weather[act.page * 7 + i][k] == 1) && k != j) {
        act.weather[act.page * 7 + i][k] = 0;
        act.cells[i][k].innerHTML = "";
        act.answered -= 1;
      }
    }
    if (j == 0) {
      act.cells[i][j].innerHTML = sformat("<img id='im{}{}' class='fadein' src='resource/not_like.svg'/>", i, j);
    } else if (j == 1) {
      act.cells[i][j].innerHTML = sformat("<img id='im{}{}' class='fadein' src='resource/not_like_2.svg'/>", i, j);
    } else if (j == 2) {
      act.cells[i][j].innerHTML = sformat("<img id='im{}{}' class='fadein' src='resource/like.svg'/>", i, j);
    } else if (j == 3) {
      act.cells[i][j].innerHTML = sformat("<img id='im{}{}' class='fadein' src='resource/superlike.svg'/>", i, j);
    }
    new Audio('resource/faceclick.mp3').play()
    act.weather[act.page * 7 + i][j] = 1;
    act.answered += 1;
  }
  ge('answered').innerHTML = sformat("Μαθητές που απάντησαν: {}", act.answered);
  graph();
}

function init() {
  var i, j;
  act = {
    answered: 0,
    weather: [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],
    cells: [],
    page: 0,
    pie: null,
    bar: null,
  }
  for (i = 0; i < 7; i++) {
    act.cells.push([])
    for (j = 0; j < 4; j++) {
      act.cells[i].push(ge(sformat('i{}{}', i, j)));
      act.cells[i][j].onclick = cellClick;
      act.cells[i][j].innerHTML = "";
    }
  }
  // Internal level number is zero-based; but we display it as 1-based.
  // We allow/fix newLevel if it's outside its proper range.
  onResize();
  // Create a <style> element for animations, to avoid CORS issues on Chrome
  // TODO: dynamically? document.head.appendChild(document.createElement('style'));
  // Install event handlers
  document.body.onresize = onResize;
  ge('bar_home').onclick = onHome;
  ge('bar_help').onclick = onHelp;
  ge('help').onclick = onHelpHide;
  ge('bar_fullscreen').onclick = onFullScreen;
  ge('bar_reset').onclick = reset;
  ge('pagenum').innerHTML = sformat("{}/4", act.page + 1);
  ge('npButton').onclick = nextPage;
  ge('ppButton').onclick = previousPage;
  for (i = 0; i < document.images.length; i += 1) {
    document.images[i].ondragstart = doPreventDefault;
  }
}

window.onerror = onError;
window.onload = init;
// Call onResize even before the images are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onResize);
} else {  // `DOMContentLoaded` already fired
  onResize();
}
