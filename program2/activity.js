/*Copyright (C) 2023
Dimitris Nikolos <dnikolos@gmail.com>.
SPDX-License-Identifier: CC-BY-SA-4.0*/

let pxofem = 16;
const numRows = 4;
const numCols = 7;
const emsofcell = 6.5;
const blueish = '#7EA5F2';/*'#DAF7FE';*/
const blackish = '#333';
const bordercolor = '#7777ff';/*#808aeb';*/
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
        plays:false, 
        orientation: UP, 
        row: 0, 
        col: 0, 
        delay:2, 
        curcommand:0, 
        timerId:[],
        numoftargets:4,
        target:0,
        targets: [[0,0,0,0,0,0,1,
           0,0,0,0,0,0,1,
           1,1,1,1,1,1,1,
           1,0,0,0,0,0,0],//target0.svg
          [0,0,1,1,1,1,1,
           0,1,1,0,0,0,0,
           1,1,0,0,0,0,0,
           1,0,0,0,0,0,0],//target1.svg
          [1,1,1,1,1,1,1,
           1,0,0,0,0,0,0,
           1,0,0,0,0,0,0,
           1,0,0,0,0,0,0,],//target2.svg
          [1,1,1,0,0,0,0,
           1,0,1,0,0,0,0,
           1,0,1,0,0,0,0,
           1,0,1,1,1,1,1,],//target3.svg
         ],
        blacks: new Array(28).fill(0),
        wall: MAXCMDS,
        selected: -1,
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
    act.blacks[7*(row-1)+col-1] = 1;
  }
  else{
    ctx.fillStyle = blueish;
  }
  ctx.fillRect(x, y, cellWidth, cellHeight);
  
  // Add a border around the square
  ctx.strokeStyle = bordercolor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, cellWidth, cellHeight);
}

function drawGrid(){
  // Set the fill color for the squares
  //ctx.fillStyle = blueish;

  var canvas = ge("mycanvas");
  var ctx = canvas.getContext("2d");
  // Loop through each row and column, drawing a square at each cell
  for (let row = 1; row <= numRows; row++) {
    for (let col = 1; col <= numCols; col++) {
        drawCell(ctx,row,col,false);
    }
  }
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
  removeallborders();
  document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {

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
  ge('restartbtn').addEventListener('click',stop);
  ge('clearbtn').addEventListener('click',clear);
  ge('delete1').addEventListener('click',delete1);
  //target
  ge('targetimg').addEventListener('click',rotatetarget);
  //help
  ge('bar_help').addEventListener('click',onHelp);
  ge('help').addEventListener('click',onHelpHide);
  ge('dialog').addEventListener('click',onHelpHide);
  
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
      if (i!=act.selected){
        removeallborders();
        //border only selected
        for (k=0; k<4; k++){
          pcellcmdid = "pcell"+i.toString()+ctos[k];
          ge(pcellcmdid).classList.add("bordered");
        }
        act.selected = i;
        showdelete1();
        act.curcommand = i;//play goes from selected
        runFast(i+1);
      }
      else{
        removeallborders();
      }
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
  if (act.selected == -1){
    if (act.program.length<MAXCMDS){
      act.program.push(cmd);
    }
  }
  else{
    act.program[act.selected]=cmd;
    runFast(act.selected+1);
  }
  drawProgram();//drawing the whole program is fast

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

function checkforprize(){
    //check for prize
    //needs toString for comparison ¯\_(ツ)_/¯
    if (act.blacks.toString() == act.targets[act.target].toString()){
      setTimeout(function(){ge('win').style.display = "block";},500)
      setTimeout(function(){ge('win').style.display = "none";},3500);
    }
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
  checkforprize();
}

function runProgram(start){
  var timerId;

  act.plays = true;
  act.playfinished = false;
  for (let i = start; i < act.program.length && i< act.wall; i++) {
    act.timerId.push(setTimeout(function timer() {
        runCommand(i);
        if (i==act.wall)
          checkforprize();

        //finish program
        if (i==act.program.length-1){
          act.plays = false;
          //after transition make last cell squid is in black
          setTimeout(function(){
            var canvas = ge("mycanvas");
            var ctx = canvas.getContext("2d");
            drawCell(ctx,act.row,act.col,true);
            checkforprize();
          },act.delay * 500);
        }

      }, (i-start) * act.delay * 500));
  }
}

function play(){
  ge('squidimg').classList.remove('notransition');
  if (!act.plays)//if act.plays play btn does nothing
    runProgram(act.curcommand);
}

function clear(){
  act.program = [];
  removeallborders();
  restart();
}

function pause(){
  act.plays = false;
  //stop the programmed runs of the next commands
  for (i=0; i<act.timerId.length; i++)
    clearTimeout(act.timerId[i])
}

function restart(){
  ge('squidimg').classList.add('notransition');
  //stop the programmed runs of the next commands
  for (i=0; i<act.timerId.length; i++)
    clearTimeout(act.timerId[i])

  drawGrid();
  act.blacks = new Array(28).fill(0);
  squidonCell(4,1);
  act.orientation = UP;
  act.curcommand = 0;
  drawProgram();
  act.plays = false;
  act.wall = MAXCMDS;
}

function hidedelete1(){
  ge('delete1').src = "./imgs/x1gray.svg"
}

function showdelete1(){
  ge('delete1').src = "./imgs/x1.svg"
}

function delete1(){
  if (act.selected!=-1)
    act.program.splice(act.selected,1);
  drawProgram();
  removeallborders();
}

function rotatetarget(){
  act.target = (act.target+1)%act.numoftargets
  ge('targetimg').src = './imgs/target'+act.target.toString()+'.png'
}

function removeallborders(){
  act.selected = -1;
  for (i=0; i<MAXCMDS; i++)
    for (k=0; k<4; k++){
      pcellcmdid = "pcell"+i.toString()+ctos[k];//ctos transforms 0,1,2,3, to f,l,r,b
      ge(pcellcmdid).classList.remove("bordered");
    }
  hidedelete1();
}

function stop(){
  removeallborders();
  restart();
}


function onHelp(event) {
  ge('dialog').style.display = 'flex';
  ge('help').style.display = 'flex';
}

function onHelpHide(event) {
  ge('help').style.display = '';
}


