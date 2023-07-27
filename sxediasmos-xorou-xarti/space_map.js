var instructions = "sounds/instructions/instructions.mp3";

const items = document.getElementById("items");
var itemsContainer;

const items_sources_count = {
    1: 8,
    2: 12,
    3: 7,
    4: 4,
    5: 4,
    6: 15
}

const items_grid = {
    1: [3, 3],
    2: [3, 4],
    3: [2, 4],
    4: [2, 2],
    5: [3, 2],
    6: [4, 4]
}

var tabIndex = 1;
var level = 1;

var selectedButtonId = null;

const buttonsIds = [
    "rotate-2",
    "rotate",
    "expand",
    "flip_vertical",
    "flip_horizontical",
    "buttons-2",
    "erase",
    "bin",
    "save"
]

const canvasContainer = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var floors = document.getElementById('change_floors').querySelectorAll('*');

window.addEventListener('resize', function (event) {
    initializeGame();
}, true);

initializeGame();

function initializeGame(){
    itemsContainer = document.getElementById("items-container");
    itemsContainer.innerHTML = "";
    itemsContainer.style.left = items.getBoundingClientRect().x;
    itemsContainer.style.top = items.getBoundingClientRect().y;
    itemsContainer.style.width = items.getBoundingClientRect().width;
    itemsContainer.style.height = items.getBoundingClientRect().height;

    initiateLevel();
    document.getElementById(`lvl2`).style.display = "none";
    document.getElementById(`lvl3`).style.display = "none";

    var initialKatopsi = document.getElementById(`katopsi_${level}`);
    canvas.setAttribute("width", initialKatopsi.getBoundingClientRect().width);
    canvas.setAttribute("height", initialKatopsi.getBoundingClientRect().height);

    canvasContainer.style.left = initialKatopsi.getBoundingClientRect().x;
    canvasContainer.style.top = initialKatopsi.getBoundingClientRect().y;
    canvasContainer.style.width = initialKatopsi.getBoundingClientRect().width;
    canvasContainer.style.height = initialKatopsi.getBoundingClientRect().height;

    loadTab(tabIndex);

    initiateEventListeners();
}

function setDraggble(el, isClone){

    if (!isClone){
        $(function () {
            $(el).draggable(
            {
                helper: "clone",
                revert: 'invalid'
            });
        });
    }
    else{
        $(function () {
            $(el).draggable(
            {
                start: function(event, ui){if (selectedButtonId != buttonsIds[0]) return false;},
                revert: 'invalid'
            });
        });
    }
}

$(function () {
    $("#canvas").droppable({
        drop: function (event, ui) {
            if ((ui.draggable).parent().parent().attr('id') == "items-container"){                
                if ((ui.draggable)[0].classList.contains('bg_item')){
                    if (level != 3){
                        for (var i = 0; i < floors.length; i++) {
                            if (floors[i].style.display == "block") {
                                floors[i].style.display = "none";
                            }
                        }
                        document.getElementById("katopsi_"+level).firstElementChild.style.display = "none";
                        document.getElementById(`katopsi_${level}_-_floor_${(ui.draggable).attr('floor_number')}`).style.display = "block";
                    }
                }
                else{
                    $ui_clone = (ui.helper).clone().attr('id', $(ui.draggable).attr('id') + '_clone').appendTo($('#canvas-container'));
                    $ui_clone.css("position", "absolute");
                    $ui_clone.css("left", (ui.helper)[0].getBoundingClientRect().x - canvas.getBoundingClientRect().x);
                    $ui_clone.css("top", (ui.helper)[0].getBoundingClientRect().y - canvas.getBoundingClientRect().y);
                    setDraggble($ui_clone, true);

                    document.getElementById($(ui.draggable).attr('id') + '_clone').addEventListener("click", function () { canvasItemClicked(this); });
                
                }
            }
            else if ((ui.draggable).parent().attr('id') == "canvas-container"){
                if (selectedButtonId == buttonsIds[0]){
                    (ui.draggable).appendTo((ui.draggable).parent());
                }
            }
        },
        accept: ".item"
    });
});

function loadTab(tab){
    
    document.getElementById(`tab_${tabIndex}_white`).style.display = "block";
    tabIndex = tab;
    document.getElementById(`tab_${tab}_white`).style.display = "none";

    itemsContainer.innerHTML = "";

    var bgRectHeight = 0;
    if (tab == 5){
        bgRectHeight = itemsContainer.getBoundingClientRect().height * 0.1;
        itemsContainer.innerHTML = `
        <div style="padding: 5px 10px;">
            <img id='bg_1' floor_number='1' class='item bg_item' src='images/bg_1.png'/>
            <img id='bg_2' floor_number='2' class='item bg_item' src='images/bg_2.png'/>
            <img id='bg_3' floor_number='3' class='item bg_item' src='images/bg_3.png'/>
            <img id='bg_4' floor_number='4' class='item bg_item' src='images/bg_4.png'/>
        </div>`;
        setDraggble($(".bg_item"), false);
    }

    for (var i = 1; i <= items_sources_count[tab]; i++){
        var row;
        if ((i - 1) % items_grid[tab][0] == 0) {
            row = document.createElement('div');
            row.classList = "items-row";
            row.style.height = (itemsContainer.getBoundingClientRect().height / items_grid[tab][1] - bgRectHeight - 10) + "px";
        }
        
        var item = document.createElement('img');
        item.id = `${tab}_${i}`;
        item.classList = "item";
        item.style.maxWidth = (itemsContainer.getBoundingClientRect().width / items_grid[tab][0] - 10) + "px";
        item.style.maxHeight = (itemsContainer.getBoundingClientRect().height / items_grid[tab][1] - bgRectHeight - 10) + "px";
        item.src = `images/${tab}_${i}.png`;
        
        row.appendChild(item);

        if ((i - 1) % items_grid[tab][0] == 0) {
            itemsContainer.appendChild(row);
        }
        
    }

    setDraggble($(".items-row > .item"), false);
}

$('#next_lvl').click(
    function () {
        if (level < 3){
            document.getElementById(`lvl${level}`).style.display = "none";

            level++;

            document.getElementById("previous_lvl").style.filter = '';
            if (level == 3) {
                document.getElementById("next_lvl").style.filter = 'brightness(0.75)';
            }
            else {
                document.getElementById("next_lvl").style.filter = '';
            }
            initiateLevel();
        }
    }
);


$('#previous_lvl').click(
    function () {
        if (level > 1) {
            document.getElementById(`lvl${level}`).style.display = "none";

            level--;

            document.getElementById("next_lvl").style.filter = '';
            if (level == 1) {
                document.getElementById("previous_lvl").style.filter = 'brightness(0.75)';
            }
            else {
                document.getElementById("previous_lvl").style.filter = '';
            }
            initiateLevel();
        }
        
    }
);

function instructionsClicked(){
    playSound(instructions);
}

var audio;

function playSound(src) {
    if (audio) {
        audio.pause();
    }
    audio = new Audio(src);
    audio.play();
}

function initiateLevel(){

    document.getElementById(`lvl${level}`).style.display = "block";

    document.getElementById("katopsi_1").style.display = "none";
    document.getElementById("katopsi_2").style.display = "none";
    document.getElementById("katopsi_3").style.display = "none";
    document.getElementById("katopsi_" + level).style.display = "block";
    document.getElementById("katopsi_" + level).firstElementChild.style.display = "block";

    for (var i = 1; i <= 2; i++) {
        for (var j = 1; j <= 4; j++){
            document.getElementById(`katopsi_${i}_-_floor_${j}`).style.display = "none";
        }
    }

    var clones = document.querySelectorAll("[id$=_clone]");
    for (var clone of clones) {
        clone.remove();
    }

    var katopsi = document.getElementById(`katopsi_${level}`);
    canvas.setAttribute("width", katopsi.getBoundingClientRect().width);
    canvas.setAttribute("height", katopsi.getBoundingClientRect().height);

    canvasContainer.style.left = katopsi.getBoundingClientRect().x;
    canvasContainer.style.top = katopsi.getBoundingClientRect().y;
    canvasContainer.style.width = katopsi.getBoundingClientRect().width;
    canvasContainer.style.height = katopsi.getBoundingClientRect().height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function rotateItem(item) {
    var rotate;

    if (item.getAttribute('rotate') == undefined){
        rotate = 45;
    }
    else{
        rotate = item.getAttribute('rotate') == "360" ? 45 : parseInt(item.getAttribute('rotate')) + 45;
    }
    item.setAttribute("rotate", rotate);

    if (item.style.transform != null){
        if (item.style.transform.indexOf('rotate') != -1){
            var curTransform = item.style.transform;
            item.style.transform = curTransform.substring(0, curTransform.indexOf('rotate')) + ` rotate(${rotate}deg)`;
        }
        else{
            item.style.transform += `rotate(${rotate}deg)`;
        }
    }
    else{
        item.style.transform = `rotate(${rotate}deg)`;
    }
}

function scaleItem(item) {
    var scale;

    if (item.getAttribute('scale') == undefined) {
        scale = 1.5;
    }
    else {
        scale = item.getAttribute('scale') == "2" ? 0.5 : parseFloat(item.getAttribute('scale')) + 0.5;
    }
    item.setAttribute("scale", scale);

    var curTransform = item.style.transform;
    if (curTransform != null) {
        if (curTransform.indexOf('scale(') != -1) {
            if (curTransform.indexOf(" ") != -1){
                item.style.transform = `scale(${scale}) ` + curTransform.substring(curTransform.indexOf(' '), curTransform.length);
            }
            else{
                item.style.transform = `scale(${scale})`;
            }
        }
        else {
            item.style.transform = `scale(${scale}) ` + curTransform;
        }
    }
    else {
        item.style.transform = `scale(${scale})`;
    }
}

function flipItemHorizontal(item) {
    var scaleX;

    if (item.getAttribute('scaleX') == undefined) {
        scaleX = -1;
    }
    else {
        scaleX = -1 * parseInt(item.getAttribute('scaleX'));
    }
    item.setAttribute("scaleX", scaleX);

    var curTransform = item.style.transform;
    if (curTransform != null) {
        var sXIndex = curTransform.indexOf('scaleX(');
        if (sXIndex != -1) {
            // previous scaleX exists
            var firstSpaceAftersX = curTransform.substring(sXIndex, curTransform.length).indexOf(" ");
            if (firstSpaceAftersX != -1) {
                // a rotation exists
                item.style.transform = curTransform.substring(0, sXIndex) + ` scaleX(${scaleX}) ` + curTransform.substring(sXIndex + firstSpaceAftersX, curTransform.length);
            }
            else {
                //no rotation exists, just scale and scaleX or just scaleX
                item.style.transform = curTransform.substring(0, sXIndex) + ` scaleX(${scaleX}) `;
            }
        }
        else {
            // no previous scaleX exists
            var rIndex = curTransform.indexOf('rotate');
            if (rIndex != -1){
                // a rotation exists
                item.style.transform = curTransform.substring(0, rIndex) + ` scaleX(${scaleX}) ` + curTransform.substring(rIndex, curTransform.length);
            }
            else{
                //no rotation exists, just scale
                item.style.transform = curTransform + ` scaleX(${scaleX}) `;
            }
        }
    }
    else {
        item.style.transform = `scaleX(${scaleX})`;
    }
}

function flipItemVertical(item) {
    var scaleY;

    if (item.getAttribute('scaleY') == undefined) {
        scaleY = -1;
    }
    else {
        scaleY = -1 * parseInt(item.getAttribute('scaleY'));
    }
    item.setAttribute("scaleY", scaleY);

    var curTransform = item.style.transform;
    if (curTransform != null) {
        var sYIndex = curTransform.indexOf('scaleY(');
        if (sYIndex != -1) {
            // previous scaleY exists
            var firstSpaceAftersY = curTransform.substring(sYIndex, curTransform.length).indexOf(" ");
            if (firstSpaceAftersY != -1) {
                // a rotation exists
                item.style.transform = curTransform.substring(0, sYIndex) + ` scaleY(${scaleY}) ` + curTransform.substring(sYIndex + firstSpaceAftersY, curTransform.length);
            }
            else {
                //no rotation exists, just scale and scaleY or just scaleY
                item.style.transform = curTransform.substring(0, sYIndex) + ` scaleY(${scaleY}) `;
            }
        }
        else {
            // no previous scaleY exists
            var sXIndex = curTransform.indexOf('scaleX');
            if (sXIndex != -1) {
                // a scaleX exists
                item.style.transform = curTransform.substring(0, sXIndex) + ` scaleY(${scaleY}) ` + curTransform.substring(sXIndex, curTransform.length);
            }
            else {
                //no scaleX exists, just scale
                item.style.transform = curTransform + ` scaleY(${scaleY}) `;
            }
        }
    }
    else {
        item.style.transform = `scaleY(${scaleY})`;
    }
}


let isPainting = false;
let lineWidth = 2;
let posX;
let posY;

// toolbar.addEventListener('click', e => {
//     if (e.target.id === 'clear') {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
// });

// $(document).on("mousemove", function (event) {
//     $("#doc").text("pageX: " + (event.pageX) + ", pageY: " + (event.pageY));
//     //$("#doc").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
// });


function drawOrErase(e) {
    mouseX = parseInt(e.clientX - canvas.getBoundingClientRect().x);
    mouseY = parseInt(e.clientY - canvas.getBoundingClientRect().y);

    // Put your mousemove stuff here
    if (isPainting) {
        ctx.beginPath();
        if (selectedButtonId == buttonsIds[5]) {
            ctx.lineWidth = 3;
            ctx.globalCompositeOperation = "source-over";
            ctx.moveTo(posX, posY);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
        else if (selectedButtonId == buttonsIds[6]){
            ctx.globalCompositeOperation = "destination-out";
            ctx.arc(posX, posY, 10, 0, Math.PI * 2, false);
            ctx.fill();
        }
        posX = mouseX;
        posY = mouseY;
    }
}

function drawOrEraseStart(e){
    if ((selectedButtonId == buttonsIds[5]) || (selectedButtonId == buttonsIds[6])) {
        isPainting = true;
        posX = e.clientX - canvas.getBoundingClientRect().x;
        posY = e.clientY - canvas.getBoundingClientRect().y;
    }
}

function drawOrEraseEnd(e) {
    isPainting = false;
}

// function emptyCanvas(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     var clones = document.querySelectorAll("[id$=_clone]");
//     for (var i = 0; clones.length; i++){
//         clones[i].remove();
//     }
// }

function removeCanvasItem(item){
    item.remove();
}

function downloadCanvas(){
    
    var katopsiSVG = document.getElementById("katopsi");
    var svg = document.getElementsByTagName("svg")[0];
    var defs = document.getElementsByTagName("defs")[0];

    var svgBRect = svg.getBoundingClientRect();
    var katopsiSVGBRect = katopsiSVG.getBoundingClientRect();

    var viewBoxX = (katopsiSVGBRect.x - svgBRect.x) * 1920 / svgBRect.width;
    var viewBoxY = (katopsiSVGBRect.y - svgBRect.y) * 1080 / svgBRect.height;
    var viewBoxWidth = katopsiSVGBRect.width * 1920 / svgBRect.width;
    var viewBoxHeight = katopsiSVGBRect.height * 1080 / svgBRect.height;

    var canvasImage = new Image();
    canvasImage.src = canvas.toDataURL();
    canvasImage.style.position = "absolute";
    canvasImage.style.top = "0";
    canvasImage.style.left = "0";
    canvasImage.style.width = "800px";

    var canvasClone = canvasContainer.cloneNode(true);
    var canvasCloneChildren = canvasClone.querySelectorAll("img");
    
    var scale = 800 / katopsiSVGBRect.width;
    for (var  i = 0; i < canvasCloneChildren.length; i++){
        canvasCloneChildren[i].style.left = `${parseFloat(canvasCloneChildren[i].style.left.slice(0, -2)) * scale}px`;
        canvasCloneChildren[i].style.top = `${parseFloat(canvasCloneChildren[i].style.top.slice(0, -2)) * scale}px`;
        canvasCloneChildren[i].style.maxWidth = `${parseFloat(canvasCloneChildren[i].style.maxWidth.slice(0, -2)) * scale}px`;
        canvasCloneChildren[i].style.maxHeight = `${parseFloat(canvasCloneChildren[i].style.maxHeight.slice(0, -2)) * scale}px`;
    }
    
    canvasClone.insertBefore(canvasImage, canvasClone.firstChild);

    var katopsiClone = `
    /*removing margin from printing, to remove filepath from printing area*/
    <style type="text/css" media="print">
    @page {
        size: auto;   /* auto is the initial value */
        margin: 0;  /* this affects the margin in the printer settings */
    }
    </style>

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    style="position:absolute; left: 0; top: 0; /*width:${katopsiSVGBRect.width}px;  height:${katopsiSVGBRect.height}px;*/"
    viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}">
    ${defs.innerHTML}
    <g>${katopsiSVG.parentElement.innerHTML}</g>
    </svg>`;


    var WinPrint = window.open('', '', `left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0`);
    WinPrint.document.write(katopsiClone + canvasClone.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();  

    canvasClone.remove();
    canvasImage.remove();
}

// function downloadCanvas_old() {
//     var a = document.createElement('a');

//     var tmpCanvas = canvas.cloneNode();
//     var tmpCtx = tmpCanvas.getContext("2d");
//     canvasContainer.appendChild(tmpCanvas);

//     var canvasX = tmpCanvas.getBoundingClientRect().x;
//     var canvasY = tmpCanvas.getBoundingClientRect().y;

//     var katopsi = document.getElementById("katopsi_" + level);
//     var data = (new XMLSerializer()).serializeToString(katopsi);
//     var DOMURL = window.URL || window.webkitURL || window;
//     var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
//     console.log(svgBlob);
//     var url = DOMURL.createObjectURL(svgBlob);
    
//     var img = new Image();
//     img.src = url;

//     canvasContainer.appendChild(img);
//     tmpCtx.drawImage(img, katopsi.getBoundingClientRect().x - canvasX, katopsi.getBoundingClientRect().y - canvasY, katopsi.width, katopsi.height);

//     var clones = document.querySelectorAll("[id$=_clone]");
//     for (let clone of clones) {
//         tmpCtx.drawImage(clone, clone.getBoundingClientRect().x - canvasX, clone.getBoundingClientRect().y - canvasY, clone.width, clone.height);
//     }

//     var dt = tmpCanvas.toDataURL('image/png');
//     /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
//     dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

//     /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
//     dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

//     a.href = dt;
//     a.download = "Canvas.png"
//     a.click();

//     tmpCanvas.remove();
// }

function canvasItemClicked(item){
    if (selectedButtonId){
        switch (selectedButtonId) {
            case buttonsIds[0]:
                //move
                break;
            case buttonsIds[1]:
                //rotate
                rotateItem(item);
                break;
            case buttonsIds[2]:
                //expand
                scaleItem(item);
                break;
            case buttonsIds[3]:
                //flip_vertical
                flipItemHorizontal(item);
                break;
            case buttonsIds[4]:
                //flip_horizontical
                flipItemVertical(item)
                break;
            case buttonsIds[5]:
                //paint
                break;
            case buttonsIds[6]:
                //erase
                break;
            case buttonsIds[7]:
                //bin
                removeCanvasItem(item);
                break;
            case buttonsIds[8]:
                //save
                //downloadCanvas();
                break;
        }
    }

}

function buttonClicked(buttonId) {
    if (buttonId == buttonsIds[8]){
        downloadCanvas();
        return;
    }
    document.getElementById(buttonId).style.transform = "scale(1.3)";

    if (selectedButtonId) {
        document.getElementById(selectedButtonId).style.transform = "";
    }
    if (selectedButtonId == buttonId) {
        selectedButtonId = null;
    }
    else {
        selectedButtonId = buttonId;
    }

}

function initiateEventListeners() {
    document.getElementById("instructions").addEventListener("click", function () { instructionsClicked() });

    document.getElementById("tab_1_white").addEventListener("click", function () { if (tabIndex != 1) { loadTab(1) }});
    document.getElementById("tab_2_white").addEventListener("click", function () { if (tabIndex != 2) { loadTab(2) }});
    document.getElementById("tab_3_white").addEventListener("click", function () { if (tabIndex != 3) { loadTab(3) }});
    document.getElementById("tab_4_white").addEventListener("click", function () { if (tabIndex != 4) { loadTab(4) }});
    document.getElementById("tab_5_white").addEventListener("click", function () { if (tabIndex != 5) { loadTab(5) }});
    document.getElementById("tab_6_white").addEventListener("click", function () { if (tabIndex != 6) { loadTab(6) }});

    for (var i = 0; i < buttonsIds.length; i++){
        document.getElementById(buttonsIds[i]).addEventListener("click", function () { buttonClicked(this.id) });
    }

    canvas.addEventListener('mousedown', drawOrEraseStart);
    canvas.addEventListener('mouseup', drawOrEraseEnd);
    canvas.addEventListener('mousemove', drawOrErase);
}


// $(document).on("mousemove", function (event) {
//     $("#doc").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
// });

// function showCupOrLose(isWin) {
//     var container;
//     var result;

//     if (isWin){
//         container = winContainer;
//         result = win;
//     }
//     else{
//         container = loseContainer;
//         result = lose;
//     }
//     container.style.display = "block";
//     setTimeout(
//         function () {
//             result.style.height = "75vh";
//         }, 50
//     );
//     setTimeout(
//         function () {
//             result.style.opacity = "0";
//         }, 1000
//     );

//     setTimeout(
//         function () {
//             container.style.display = "none";
//             result.style.height = "50vh";
//             result.style.opacity = "1";

//         }, 1500
//     );
// }

// function showWinOrLose(){
//     var isWin = false;
//     if (gearsAreSpinning && checkSwitches()) {
//         playSound(lvlWin);
//         showCupOrLose(true);
//     }
//     else{
//         playSound(wrong);
//         showCupOrLose(false);
//     }
// }
