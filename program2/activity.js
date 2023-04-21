/*
Copyright (C) 2019 
Alkis Georgopoulos <alkisg@gmail.com>,
Dimitris Nikolos <dnikolos@gmail.com>.
SPDX-License-Identifier: CC-BY-SA-4.0*/

let pxofem = 16;
const numRows = 4;
const numCols = 7;
const emsofcell = 6.5;
const blueish = '#DAF7FE';
const blackish = '#333';
const bordercolor = '#808aeb';
const MAXCMDS = 25;

const UP = 0;
const LEFT = 1;
const RIGHT = 2;
const DOWN = 3;

const FORWARD = 0;
//const LEFT = 1; //see above
//const RIGHT = 2;//see above 
const BACKWARD = 3;

const ctos = ['f','l','r','b'];//command to string
//the main object
act = { program:[], 
        paused:false, 
        plays:false, 
        orientation: UP, 
        row: 0, 
        col: 0, 
        delay:2, 
        curcommand:0, 
        timerId:[],
        numoftargets:4,
        target:1,
        wall: MAXCMDS,
        };


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


function ge(id) {
  return document.getElementById(id);
}


function onResize(event) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w / h < 640 / 360) 
    pxofem = 10 * w / 640;
  else 
    pxofem = 10 * h / 360;
  
  document.body.style.fontSize = sformat('{}px', pxofem);
}


window.onload = function(){init()};
window.onerror = onError;

// Call onResize even before the images are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onResize);
} else {  // DOMContentLoaded` already fired
  onResize();
}



function drawCell(ctx,row,col,makeblack){
//makeblack is true or false


  // Calculate the x and y coordinates of the cell
  cellWidth = ctx.canvas.width/numCols;
  cellHeight = ctx.canvas.height/numRows;
  
  x = (col-1) * cellWidth;
  y = (row-1) * cellHeight;
  
  
  // Draw the square
  if (makeblack){
    ctx.fillStyle = blackish;
  }
  else{
    ctx.fillStyle = blueish;
  }
  ctx.fillRect(x, y, cellWidth, cellHeight);
  
  // Add a border around the square
  ctx.strokeStyle = bordercolor;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, cellWidth, cellHeight);
}

function drawGrid(){
  // Set the fill color for the squares
  //ctx.fillStyle = blueish;

  var canvas = ge("mycanvas");
  var ctx = canvas.getContext("2d");
  canvasbkg = ge('canvasbkg')
  ctx.drawImage(canvasbkg,0,0,ctx.canvas.width,ctx.canvas.height);
  /* Loop through each row and column, drawing a square at each cell
  for (let row = 1; row <= numRows; row++) {
    for (let col = 1; col <= numCols; col++) {
        drawCell(ctx,row,col,false);
    }
  }*/
}


function initcanvas(){
  var canvas = ge("mycanvas");
  var ctx = canvas.getContext("2d");
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  drawGrid(ctx);
  restart();
  document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    ge('squidimg').style.display = "none";
  }
}
}

function init(){
  window.addEventListener("resize",onResize);
  initcanvas();
  ge('main').style.display = "";
  ge('loading').style.display = "none";  
  ge('forwardbtn').addEventListener('click',forwardbtnclicked);
  ge('backbtn').addEventListener('click',backbtnclicked);
  ge('leftbtn').addEventListener('click',leftbtnclicked);
  ge('rightbtn').addEventListener('click',rightbtnclicked);
  //controls
  ge('playbtn').addEventListener('click',play);
  ge('pausebtn').addEventListener('click',pause);
  ge('restartbtn').addEventListener('click',restart);
  ge('clearbtn').addEventListener('click',clear);
  //target
  ge('targetimg').addEventListener('click',rotatetarget);
}


function squidonCell(row,col){
  squidimg = ge('squidimg');
  squidimg.style.marginTop = sformat("{}em",emsofcell*(row-1)+0.5);
  squidimg.style.marginLeft = sformat("{}em",emsofcell*(col-1)+0.5);
  squidimg.style.display = "block";
  squidimg.style.transform = "rotate(0deg)";
  act.row=row;
  act.col=col;
}

function drawpcell(i){
  //draw without blink 
  for (k=0; k<4; k++){
    pcellcmdid = "pcell"+i.toString()+ctos[k];//ctos transforms 0,1,2,3, to f,l,r,b
    
    if (i<act.curcommand){
      ge(pcellcmdid).style.filter="brightness(180%)";
    }
    else{
      ge(pcellcmdid).style.filter="brightness(100%)";
    }

    if (k==act.program[i]){
      ge(pcellcmdid).style.display="block";
      ge(pcellcmdid).onclick = function(){
        runFast(i+1);
      }
    }
    else{
      ge(pcellcmdid).style.display="none";
    }
  
  }
  
}

function drawProgram(){
  for (i=0; i<MAXCMDS; i++){
    drawpcell(i);
  }
}


function addCommand(cmd){
  if (act.program.length<MAXCMDS){
    act.program.push(cmd);
    drawProgram();//drawing the whole program is fast
  }

}

function forwardbtnclicked(){
  addCommand(FORWARD);
}

function backbtnclicked(){
addCommand(BACKWARD);
}

function leftbtnclicked(){
addCommand(LEFT);
}

function rightbtnclicked(){
addCommand(RIGHT);
}


function computeCommand(i){
  var offsetX,offsetY,orientation;
  var ortoangle = [0,-90,90,-180];
  offsetX = 0;
  offsetY = 0;
  orientation = act.orientation;
  switch (act.program[i]) {
    case FORWARD:
      switch (act.orientation) {
        case UP:
          offsetY = -1;
          break;
        case RIGHT:
          offsetX = 1;
          break;
        case DOWN:
          offsetY = 1;
          break;
        case LEFT:
          offsetX = -1;
          break;
      }
      break;
    case BACKWARD:
      switch (act.orientation) {
        case UP:
          offsetY = 1;
          break;
        case RIGHT:
          offsetX = -1;
          break;
        case DOWN:
          offsetY = -1;
          break;
        case LEFT:
          offsetX = 1;
          break;
      }
      break;
    case LEFT:
      switch (act.orientation) {
        case UP:
          orientation = LEFT;
          break;
        case RIGHT:
          orientation = UP;
          break;
        case DOWN:
          orientation = RIGHT;
          break;
        case LEFT:
          orientation = DOWN;
          break;
      }
      break;
    case RIGHT:
      switch (act.orientation) {
        case UP:
          orientation = RIGHT;
          break;
        case RIGHT:
          orientation = DOWN;
          break;
        case DOWN:
          orientation = LEFT;
          break;
        case LEFT:
          orientation = UP;
          break;
      }
      break;
  }
  return([offsetX,offsetY,orientation]);
}



function runCommand(i){
  var pcellcmdid;
  var offsetX,offsetY,orientation;
  [offsetX,offsetY,orientation] = computeCommand(i)
  if (offsetX || offsetY){//squid moves
    var canvas = ge("mycanvas");
    var ctx = canvas.getContext("2d");
    drawCell(ctx,act.row,act.col,true);//make current blackish
                                       //before updating
  }
  //act is updated only if it row and col are valid
  //else nothing else happens
  var row = act.row;
  var col = act.col;
  row += offsetY;
  col += offsetX;
  if (row>=1 && row <=4)
  {
    act.row = row;
  }
  else{
    act.wall = i;
    pause();
    return;//program stops
  }
  if (col>=1 && col<=7)
  {
    act.col = col;
  }
  else{
    act.wall = i;
    pause();
    return;//program stops
  }

  //left or right
  var matrix = window.getComputedStyle(ge('squidimg')).getPropertyValue('transform');
  
  if (act.program[i]==LEFT)
    matrix = new DOMMatrix(matrix).rotate(-90);
  if (act.program[i]==RIGHT)
    matrix = new DOMMatrix(matrix).rotate(90);
  //otherwise matrix remains

  ge('squidimg').style.transform = matrix.toString();
  


  act.orientation = orientation;

  //visualize things
  squidimg.style.marginTop = sformat("{}em",emsofcell*(act.row-1)+0.5);
  squidimg.style.marginLeft = sformat("{}em",emsofcell*(act.col-1)+0.5);
  
  pcellcmdid = "pcell"+i+ctos[act.program[i]];//ctos transforms 0,1,2,3, to f,l,r,b
  ge(pcellcmdid).style.filter = "brightness(180%)";

  //set current command for next command
  act.curcommand = i+1;
}


function runFast(end){
  restart();
  for (let i = 0; i < end && i < act.wall; i++) {
        runCommand(i);
  }
  var canvas = ge("mycanvas");
  var ctx = canvas.getContext("2d");
  drawCell(ctx,act.row,act.col,true);

}

function runProgram(start){
  var timerId;

  console.log(start,act.program.length);
  act.paused = false;
  if (start == act.program.length){
    restart();
  }
  act.plays = true;
  act.playfinished = false;
  for (let i = start; i < act.program.length && i< act.wall; i++) {
    console.log(i,act.program.length,act.wall);
    act.timerId.push(setTimeout(function timer() {
        runCommand(i);
        //finish program
        if (i==act.program.length-1){
          act.plays = false;
          //after transition make last cell squid is in black
          setTimeout(function(){
            var canvas = ge("mycanvas");
            var ctx = canvas.getContext("2d");
            drawCell(ctx,act.row,act.col,true);
          },act.delay * 500);
        }

      }, (i-start) * act.delay * 500));
  }
}

function play(){
  ge('squidimg').classList.remove('notransition');
  act.paused = false;
  if (!act.plays)//if act.plays play btn does nothing
    runProgram(act.curcommand);
}

function clear(){
  act.program = [];
  restart();
}

function pause(){
  act.paused = true;
  act.plays = false;
  //stop the programmed runs of the next commands
  for (i=0; i<act.timerId.length; i++)
    clearTimeout(act.timerId[i])
}

function restart(){
  ge('squidimg').classList.add('notransition');
  console.log(ge('squidimg').classList);
  //stop the programmed runs of the next commands
  for (i=0; i<act.timerId.length; i++)
    clearTimeout(act.timerId[i])

  drawGrid();
  squidonCell(4,1);
  act.orientation = UP;
  act.curcommand = 0;
  drawProgram();
  act.plays = false;
  act.paused = true;
  act.wall = MAXCMDS;
}

function rotatetarget(){
  act.target = (act.target+1)%act.numoftargets
  ge('targetimg').src = './imgs/target'+act.target.toString()+'.png'
}