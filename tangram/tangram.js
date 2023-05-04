var level = 0;
var shape_cnt = 0;

var wrong = "sounds/fail game lose level 20.wav";
var lvlWin = "sounds/win game level 282.wav";

var lvl1_info = "sounds/instructions/lvl1.mp3"; //to be changed
var lvl2_info = "sounds/instructions/lvl2.mp3"; //to be changed
var lvl3_info = "sounds/instructions/lvl3.mp3"; //to be changed

var winContainer = document.getElementById("win-container");
var win = document.getElementById("win");

const levelsHintsIds = {
    0: ["lvl1-stroke"],
    1: [
        "lvl_2_-_hint",
        "lvl_2_-_shape_2_-_hint",
        "lvl_2_-_shape_3_-_hint",
        "lvl_2_-_shape_4_-_hint",
        "lvl_2_-_shape_5_-_hint",
        "lvl_2_-_shape_6_-_hint"
    ],
    2: [
        "lvl3_bird_hint",
        "lvl3_fish_hint",
        "lvl3_rabbit_hint",
        "lvl3_cat_hint",
        "lvl3_crab_hint",
        "lvl3_duck_hint"
    ]
}


const levelsShapesIds = {
    0: ["lvl1-shapes"],
    1: [
        "lvl_2_-_shape1",
        "lvl_2_-_shape_2-2",
        "lvl_2_-_shape_3-2",
        "lvl_2_-_shape_4-2",
        "lvl_2_-_shape_5-2",
        "lvl_2_-_shape_6-2"
    ],
    2: [
        "lvl3_bird_shadow-2",
        "lvl3_fish_shadow-2",
        "lvl3_rabbit_shadow-2",
        "lvl3_cat_shadow-2",
        "lvl3_crab_shadow",
        "lvl3_duck_shadow-2"
    ]
}


const levelsRightSideButtonsIds = {
    0: ["lvl_1_-_shape_1"], //had to put something here to not get an error
    1: [
        "button_1",
        "button_2",
        "button_3",
        "button_4",
        "button_5",
        "button_6"
    ],
    2: [
        "button_bird",
        "button_fish",
        "button_rabbit",
        "button_fox",
        "button_crab",
        "button_cat"
    ]
}

$('.shape-container').draggable({
    start: function (event, ui) {
        $(this).find('.block').data('dragging', true);
    },
    stop: function (event, ui) {
        setTimeout(function () {
            $(event.target).find('.block').data('dragging', false);
            transformationEnded($(event.target).find('.block')[0]);
        }, 1);
    },
});

$('#ok_button').click(
    function () {
        checkWin();
    }
);

$('#hint_button').click(
    function () {
        var hint = document.getElementById(levelsHintsIds[level][shape_cnt]);
        if ((hint.style.display == "")||(hint.style.display == "none")){
            hint.style.display = "block";
        }
        else {
            hint.style.display = "none";            
        }
    }
);

$('#next_lvl').click(
    function () {
        if (level < 2){
            document.getElementById(`_${level + 1}`).style.display = "none";
            document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "none";
            document.getElementById(levelsHintsIds[level][shape_cnt]).style.display = "none";
            for (var i = 0; i < levelsRightSideButtonsIds[level].length; i++) {
                document.getElementById(levelsRightSideButtonsIds[level][i]).style.display = "none";
            }

            level++;

            initializeLevelsBlocktray();
            shape_cnt = 0;
            document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "block";
            for (var i = 0; i < levelsRightSideButtonsIds[level].length; i++){
                document.getElementById(levelsRightSideButtonsIds[level][i]).style.display = "block";
            }
            document.getElementById(`_${level+1}`).style.display = "block";

            var shapes_containers = document.getElementsByClassName("shape-container");
            var shapes = document.getElementsByClassName("block");
            for (var i = 0; i < shapes_containers.length; i++){
                shapes_containers[i].style.left = "0px";
                shapes_containers[i].style.top = "0px";

                shapes[i].removeAttribute("transformorigin");
                shapes[i].style.backgroundColor = "";
                shapes[i].style.clipPath = "";
                shapes[i].style.transform = "scaleX(1) scaleY(1) rotate(0deg)";
                document.getElementById(shapes[i].id + "-stroke").style.transform = "scaleX(1) scaleY(1) rotate(0deg)";
                
                shapes[i].style.boxShadow = "";

                if (level == 0) {
                    shapes[i].style.width = "26.5vh";
                    shapes[i].style.height = "26.5vh";
                    document.getElementById(shapes[i].id + "-stroke").style.width = "26.5vh";
                    document.getElementById(shapes[i].id + "-stroke").style.height = "26.5vh";
                }
                else {
                    shapes[i].style.width = "25vh";
                    shapes[i].style.height = "25vh";
                    document.getElementById(shapes[i].id + "-stroke").style.width = "25vh";
                    document.getElementById(shapes[i].id + "-stroke").style.height = "25vh";
                }
            }

            document.getElementById("previous_lvl").style.filter = '';
            if (level == 2) {
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
        if (level > 0) {
            document.getElementById(`_${level + 1}`).style.display = "none";
            document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "none";
            document.getElementById(levelsHintsIds[level][shape_cnt]).style.display = "none";
            for (var i = 0; i < levelsRightSideButtonsIds[level].length; i++) {
                document.getElementById(levelsRightSideButtonsIds[level][i]).style.display = "none";
            }

            level--;

            initializeLevelsBlocktray();
            shape_cnt = 0;
            document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "block";
            for (var i = 0; i < levelsRightSideButtonsIds[level].length; i++) {
                document.getElementById(levelsRightSideButtonsIds[level][i]).style.display = "block";
            }
            document.getElementById(`_${level + 1}`).style.display = "block";

            var shapes = document.getElementsByClassName("shape-container");
            for (var i = 0; i < shapes.length; i++) {
                shapes[i].style.left = "0px";
                shapes[i].style.top = "0px";
            }

            var shapes_containers = document.getElementsByClassName("shape-container");
            var shapes = document.getElementsByClassName("block");
            for (var i = 0; i < shapes_containers.length; i++) {
                shapes_containers[i].style.left = "0px";
                shapes_containers[i].style.top = "0px";

                shapes[i].removeAttribute("transformorigin");
                shapes[i].style.backgroundColor = "";
                shapes[i].style.clipPath = "";
                shapes[i].style.transform = "scaleX(1) scaleY(1) rotate(0deg)";
                document.getElementById(shapes[i].id + "-stroke").style.transform = "scaleX(1) scaleY(1) rotate(0deg)";

                shapes[i].style.boxShadow = "";

                if (level == 0) {
                    shapes[i].style.width = "26.5vh";
                    shapes[i].style.height = "26.5vh";
                    document.getElementById(shapes[i].id + "-stroke").style.width = "26.5vh";
                    document.getElementById(shapes[i].id + "-stroke").style.height = "26.5vh";
                }
                else {
                    shapes[i].style.width = "25vh";
                    shapes[i].style.height = "25vh";
                    document.getElementById(shapes[i].id + "-stroke").style.width = "25vh";
                    document.getElementById(shapes[i].id + "-stroke").style.height = "25vh";
                }
            }

            document.getElementById("next_lvl").style.filter = '';
            if (level == 0) {
                document.getElementById("previous_lvl").style.filter = 'brightness(0.75)';
            }
            else {
                document.getElementById("previous_lvl").style.filter = '';
            }
            initiateLevel();
        }
        
    }
);

// $('polygon').draggable({
//     start: function (event, ui) {
//         $(this).data('dragging', true);
//     },
//     stop: function (event, ui) {
//         setTimeout(function () {
//             $(event.target).data('dragging', false);
//             transformationEnded($(event.target));
//         }, 1);
//     },
// });

function changeMiddleShape(button){
    document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "none";
    document.getElementById(levelsHintsIds[level][shape_cnt]).style.display = "none";
    shape_cnt = levelsRightSideButtonsIds[level].indexOf(button.id);
    document.getElementById(levelsShapesIds[level][shape_cnt]).style.display = "block";

    initializeLevelsBlocktray();
    
    var shapes_containers = document.getElementsByClassName("shape-container");
    var shapes = document.getElementsByClassName("block");
    for (var i = 0; i < shapes_containers.length; i++) {
        shapes_containers[i].style.left = "0px";
        shapes_containers[i].style.top = "0px";

        shapes[i].removeAttribute("transformorigin");
        shapes[i].style.backgroundColor = "";
        shapes[i].style.clipPath = "";
        shapes[i].style.transform = "scaleX(1) scaleY(1) rotate(0deg)";
        document.getElementById(shapes[i].id + "-stroke").style.transform = "scaleX(1) scaleY(1) rotate(0deg)";

        shapes[i].style.boxShadow = "";
    }

    initiateLevel();
}

var selectedButton;

var angle = -45;

$('.block').click(
    function(){
        if ($(this).data('dragging')) return;
        if (selectedButton){
            if ((this.style.transform.includes('scaleY(-1)')) && (this.style.transform.includes('scaleX(-1)'))) {
                angle = -45;
            }
            else if ((this.style.transform.includes('scaleY(-1)')) || (this.style.transform.includes('scaleX(-1)'))) {
                angle = 45;
            }
            else {
                angle = -45;
            }
            switch (selectedButton.id){
                case 'rotate':
                    if (this.style.transform.includes('rotate(')) {
                        var transform = this.style.transform;
                        var start = transform.indexOf('rotate(') + 'rotate('.length;
                        var end = transform.indexOf('deg)');

                        var before = transform.slice(0, start);
                        var between = transform.slice(start, end);
                        var after = transform.slice(end, transform.length);

                        this.style.transform = before + (parseInt(between) + angle) + after;
                        document.getElementById(this.id + "-stroke").style.transform = before + (parseInt(between) + angle) + after;                        
                    }
                    else {
                        this.style.transform += 'rotate(' + angle + 'deg)';
                        document.getElementById(this.id+"-stroke").style.transform += 'rotate(' + angle + 'deg)';
                    }

                    var currentRotate = parseInt(this.getAttribute("rotate"));
                    this.setAttribute("rotate", currentRotate - 45);  
                    // if (shapesEdges[this.id] == undefined){
                    //     shapesEdges[this.id] = initShapesEdges[this.id];
                    // }
                    break;
                case 'flip_vertical':
                    if (this.style.transform.includes('scaleX(-1)')){
                        this.style.transform = this.style.transform.replace('scaleX(-1)', 'scaleX(1)');
                        document.getElementById(this.id + "-stroke").style.transform = this.style.transform.replace('scaleX(-1)', 'scaleX(1)');
                    }
                    else if (this.style.transform.includes('scaleX(1)')) {
                        this.style.transform = this.style.transform.replace('scaleX(1)', 'scaleX(-1)');
                        document.getElementById(this.id + "-stroke").style.transform = this.style.transform.replace('scaleX(1)', 'scaleX(-1)');
                    }
                    flipHappened(this, true);
                    break;
                case 'flip_horizontical':
                    if (this.style.transform.includes('scaleY(-1)')) {
                        this.style.transform = this.style.transform.replace('scaleY(-1)', 'scaleY(1)');
                        document.getElementById(this.id + "-stroke").style.transform = this.style.transform.replace('scaleY(-1)', 'scaleY(1)');
                    }
                    else if (this.style.transform.includes('scaleY(1)')) {
                        this.style.transform = this.style.transform.replace('scaleY(1)', 'scaleY(-1)');
                        document.getElementById(this.id + "-stroke").style.transform = this.style.transform.replace('scaleY(1)', 'scaleY(-1)');
                    }
                    flipHappened(this, false);
                    break;
                case '':
                    this.style.backgroundColor = selectedButton.style.fill;
                    break;
            }
            transformationEnded(this);
        }
    }
);


$('#rotate').click(function () { buttonClicked(this); });
$('#flip_horizontical').click(function () { buttonClicked(this); });
$('#flip_vertical').click(function () { buttonClicked(this); });

var colorButtons = document.getElementById("colors").getElementsByTagName("rect");
for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click", function () { buttonClicked(this) });
}

document.getElementById("instructions").addEventListener("click", function () { instructionsClicked() });

function instructionsClicked(){
    if (level == 0){
        playSound(lvl1_info);
    }
    else if (level == 1) {
        playSound(lvl2_info);
    }
    else if (level == 2) {
        playSound(lvl3_info);
    }
}

var initShapesEdges = {};
var initShapesCenters = {};
var shapesEdges = {};

function initializeLevelsBlocktray(){

    var shapesPanelRect;
    if (level == 0){        
        shapesPanelRect = document.getElementById("white_spaces").getElementsByTagName("rect")[2].getBoundingClientRect();
    }
    else{
        shapesPanelRect = document.getElementById("white_spaces").getElementsByTagName("rect")[0].getBoundingClientRect();
    }

    var shapesPanelX = shapesPanelRect.x;
    var shapesPanelY = shapesPanelRect.y;

    blockTray.style.transform = '';
    if (level == 0){
        blockTray.style.left = 'calc(' + (shapesPanelX + shapesPanelRect.width / 2) + 'px - 13.25vh)';
        blockTray.style.top = 'calc(' + (shapesPanelY + shapesPanelRect.height / 2) + 'px - 13.25vh)';
    }
    else{
        blockTray.style.left = 'calc(' + (shapesPanelX + shapesPanelRect.width / 2) + 'px - 12.5vh)';
        blockTray.style.top = 'calc(' + (shapesPanelY + shapesPanelRect.height / 2) + 'px - 12.5vh)';
    }
}

initiateLevel();

function initiateLevel(){
    if (audio) {
        audio.pause();
    }
    if (selectedButton){
        selectedButton.style.transform = "";
        selectedButton = null;
    }
    if (level == 0){
        document.getElementById("previous_lvl").style.filter = 'brightness(0.75)';
    }

    if (level == 2) {
        document.getElementById("ok_button").style.display = "block";
    }
    else {
        document.getElementById("ok_button").style.display = "none";
    }

    for (var i=0; i < 6; i++){
        document.getElementById(levelsRightSideButtonsIds[1][i]).addEventListener("click", function () { changeMiddleShape(this) });
        document.getElementById(levelsRightSideButtonsIds[2][i]).addEventListener("click", function () { changeMiddleShape(this) });
    }

    angle = -45;
    initShapesEdges = {};
    initShapesCenters = {};
    shapesEdges = {};
    
    initializeLevelsBlocktray();    

    var shapes = document.getElementsByClassName("block");
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].setAttribute("rotate", 0);
        initializeShapesEdges(shapes[i]);
        initializeShapesCenters(shapes[i]);
    }
}

function buttonClicked(button) {

    button.style.transform = "scale(1.3)";

    if (selectedButton) {
        selectedButton.style.transform = "";
    }
    if (selectedButton == button){
        selectedButton = null;
    }
    else{
        selectedButton = button;
    }
    
}

var svgLeft = document.getElementsByTagName('svg')[0].getBoundingClientRect().left;
var svgWidth = document.getElementsByTagName('svg')[0].getBoundingClientRect().width;
var svgTop = document.getElementsByTagName('svg')[0].getBoundingClientRect().top;
var svgHeight = document.getElementsByTagName('svg')[0].getBoundingClientRect().height;

var fullShapePoints = {
    0: [[207, 168],
    [316, 168],
    [455, 308],
    [555, 312],
    [504, 370],
    [410, 370],
    [410, 462],
    [297, 462],
    [350, 410],
    [255, 315],
    [256, 221]],

    1: [[373, 213],
    [468, 311],
    [538, 245],
    [538, 392],
    [469, 330],
    [375, 427],
    [304, 427],
    [205, 318],
    [305, 213]],

    2: [[339, 130],
    [420, 130],
    [346, 207],
    [330, 207],
    [462, 335],
    [462, 475],
    [354, 475],
    [301, 419],
    [350, 374],
    [321, 344],
    [322, 390],
    [262, 334],
    [314, 285],
    [314, 272],
    [246, 272],
    [246, 197],
    [270, 197]],

    3: [[360, 104],
    [360, 205],
    [315, 252],
    [418, 355],
    [417, 259],
    [473, 312],
    [475, 414],
    [407, 484],
    [260, 484],
    [304, 438],
    [304, 252],
    [256, 203],
    [256, 102],
    [307, 150]],

    4: [[473, 172],
    [549, 245],
    [482, 314],
    [482, 456],
    [409, 387],
    [344, 387],
    [273, 452],
    [273, 314],
    [205, 246],
    [279, 169],
    [279, 244],
    [339, 304],
    [338, 241],
    [413, 241],
    [413, 303],
    [473, 244]],

    5: [[277, 163],
    [329, 214],
    [330, 285],
    [364, 319],
    [483, 319],
    [483, 249],
    [559, 326],
    [461, 425],
    [322, 425],
    [251, 352],
    [251, 283],
    [269, 269],
    [175, 269]]
};

// $(document).on("mousemove", function (event) {
//     $("#doc").text("pageX: " + (event.pageX - svgLeft) + ", pageY: " + (event.pageY - svgTop));
//     //$("#doc").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
// });

function initializeShapesEdges(shape){
    var cp;
    if (document.getElementById(shape.id).style.clipPath != ""){
        cp = document.getElementById(shape.id).style.clipPath;
    }
    else{
        cp = window.getComputedStyle(document.getElementById(shape.id)).getPropertyValue('clip-path');
    }
    cp = cp.substring("polygon(".length, cp.length - 1);
    var cpValues = new Array();
    // This will return an array with strings "1", "2", etc.
    cpValues = cp.split(", ");

    var shapesCoords = [];

    for (var j = 0; j < cpValues.length; j++) {
        var pointCoord = cpValues[j].split(" ");
        var pointCoordX = pointCoord[0].slice(0, -1) / 100;
        var pointCoordY = pointCoord[1].slice(0, -1) / 100;

        shapesCoords.push(
        [
            shape.getBoundingClientRect().left + shape.getBoundingClientRect().width * pointCoordX,
            shape.getBoundingClientRect().top + shape.getBoundingClientRect().height * pointCoordY
        ]);

    }

    initShapesEdges[shape.id] = shapesCoords;
    //shapesEdges[shape.id] = initShapesEdges[shape.id];
}

function initializeShapesCenters(shape) {
    var cp;
    if (shape.getAttribute("transformOrigin")){
        cp = shape.getAttribute("transformOrigin");
    }
    else{
        cp = shape.style.transformOrigin;
    }

    var cpValues = new Array();
    // This will return an array with strings "1", "2", etc.
    cpValues = cp.split(" ");

    var pointCoordX = shape.getBoundingClientRect().left + ((shape.getBoundingClientRect().right - shape.getBoundingClientRect().left) * cpValues[0].slice(0, -1) / 100);
    var pointCoordY = shape.getBoundingClientRect().top + ((shape.getBoundingClientRect().bottom - shape.getBoundingClientRect().top) *cpValues[1].slice(0, -1) / 100);

    initShapesCenters[shape.id] = [pointCoordX, pointCoordY];
}

function getShapesRotation(shapeId){
    var shape = document.getElementById(shapeId);
    var shapeRotation;

    var shapeTransform = shape.style.transform;
    if (shapeTransform.indexOf("rotate(") != -1) {
        var shapeRotationStr = shapeTransform.substring(shapeTransform.indexOf("rotate(") + "rotate(".length, shapeTransform.indexOf("deg)"));
        shapeRotation = parseInt(shapeRotationStr);
    }
    else {
        shapeRotation = 0;
    }
    return shapeRotation;
}

function transformationEnded(shape){
    // var cp = window.getComputedStyle(document.getElementById(shape.id)).getPropertyValue('clip-path');
    // cp = cp.substring("polygon(".length,cp.length-1);
    // var cpValues = new Array();
    // // This will return an array with strings "1", "2", etc.
    // cpValues = cp.split(", ");
    
    // var shapesCoords = []

    // for (var i=0; i<cpValues.length; i++){
    //     var pointCoord = cpValues[i].split(" ");
    //     var pointCoordX = pointCoord[0].slice(0, -1) / 100;
    //     var pointCoordY = pointCoord[1].slice(0, -1) / 100;

    //     shapesCoords.push(
    //     [
    //             shape.getBoundingClientRect().left + shape.getBoundingClientRect().width * pointCoordX, 
    //             shape.getBoundingClientRect().top + shape.getBoundingClientRect().height * pointCoordY
    //     ]);
    // }

    if (shape.style.boxShadow != ""){
        shape.style.boxShadow = "";
    }
    
    var shapesCoords = getPoints(shape.id);

    shapesEdges[shape.id] = shapesCoords;

    checkShapesOverlap();
    //checkWin();
    
}

function checkShapesOverlap(){
    var shapeIdKeys = Object.keys(shapesEdges);
    for (var k = 0; k < shapeIdKeys.length; k++) {
        if (shapesOverlap(shapesEdges[shapeIdKeys[k]], shapeIdKeys[k])) {
            document.getElementById(shapeIdKeys[k]).style.boxShadow = "inset 0 0 0 1000px rgba(182, 182, 182,.75)";
        }
        else {
            if (document.getElementById(shapeIdKeys[k]).style.boxShadow != "") {
                document.getElementById(shapeIdKeys[k]).style.boxShadow = "";
            }
        }
    }
}

function shapesOverlap(shapesCoords, shapeId){

    var shapeIdKeys = Object.keys(shapesEdges);
    if (shapeIdKeys.indexOf(shapeId) != -1) {
        shapeIdKeys.splice(shapeIdKeys.indexOf(shapeId), 1);
    }    

    for (var k = 0; k < shapeIdKeys.length; k++) {
        for (var c = 0; c < shapesEdges[shapeIdKeys[k]].length; c++) {
            for (var d = 0; d < shapesEdges[shapeIdKeys[k]].length; d++) {
                if ((shapesEdges[shapeIdKeys[k]][c][0] == shapesEdges[shapeIdKeys[k]][d][0]) && (shapesEdges[shapeIdKeys[k]][c][1] == shapesEdges[shapeIdKeys[k]][d][1])) {
                    continue;
                }
                for (var a = 0; a < shapesCoords.length; a++) {
                    for (var b = 0; b < shapesCoords.length; b++) {
                        if ((shapesCoords[a][0] == shapesCoords[b][0]) && (shapesCoords[a][1] == shapesCoords[b][1])) {
                            continue;
                        }

                        if (linesIntersect(shapesCoords[a][0], shapesCoords[a][1], shapesCoords[b][0], shapesCoords[b][1],
                            shapesEdges[shapeIdKeys[k]][c][0], shapesEdges[shapeIdKeys[k]][c][1], shapesEdges[shapeIdKeys[k]][d][0], shapesEdges[shapeIdKeys[k]][d][1])){
                            return true;
                        }
                    }
                }    
            }
        }

    }
     
    return false;
    // overlap = -1;
    // for (var i = 0; i < shapesCoords.length; i++) {
    //     if (pointInsideAnyShape(shapesCoords[i], shapeId)){
    //         overlap = i;
    //         break;
    //     }
    // }
    // return overlap;
}

// function pointInsideAnyShape(point, shapeId) {
//     // ray-casting algorithm based on
//     // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

//     var x = point[0], y = point[1];

//     var inside = false;
//     var shapeIdKeys = Object.keys(shapesEdges);
//     if (shapeIdKeys.indexOf(shapeId) != -1){
//         shapeIdKeys.splice(shapeIdKeys.indexOf(shapeId), 1);
//     }
//     for (var k = 0; k < shapeIdKeys.length; k++){
//         for (var i = 0, j = shapesEdges[shapeIdKeys[k]].length - 1; i < shapesEdges[shapeIdKeys[k]].length; j = i++) {
//             var xi = shapesEdges[shapeIdKeys[k]][i][0], yi = shapesEdges[shapeIdKeys[k]][i][1];
//             var xj = shapesEdges[shapeIdKeys[k]][j][0], yj = shapesEdges[shapeIdKeys[k]][j][1];

//             var intersect = ((yi > y) != (yj > y))
//                 && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//             if (intersect) inside = !inside;
//         }
//     }
//     return inside;
// };

function pointInsidePolygon(point, polygon) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0] / 1182 * svgWidth + svgLeft, yi = polygon[i][1] / 739 * svgHeight + svgTop;
        var xj = polygon[j][0] / 1182 * svgWidth + svgLeft, yj = polygon[j][1] / 739 * svgHeight + svgTop;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function linesIntersect(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

var audio;

function playSound(src) {
    if (audio){
        audio.pause();
    }
    audio = new Audio(src);
    audio.play();
}

function showCup() {
    winContainer.style.display = "block";
    setTimeout(
        function () {
            win.style.height = "75vh";
        }, 50
    );
    setTimeout(
        function () {
            win.style.opacity = "0";
        }, 1000
    );

    setTimeout(
        function () {
            winContainer.style.display = "none";
            win.style.height = "50vh";
            win.style.opacity = "1";

        }, 1500
    );
}

function checkWin(){
    var shapeIdKeys = Object.keys(shapesEdges);
    if (shapeIdKeys.length != 7) {
        playSound(wrong);
        return;
    }
    var errorFound = false;
    for (var k = 0; k < shapeIdKeys.length; k++) {
        if (document.getElementById(shapeIdKeys[k]).style.boxShadow != ""){
            playSound(wrong);
            return;
        }
        
        for (var i = 0; i < shapesEdges[shapeIdKeys[k]].length; i++){
            if (!pointInsidePolygon(shapesEdges[shapeIdKeys[k]][i], fullShapePoints[shape_cnt])){
                console.log("Win failed in " + shapeIdKeys[k] +", "+i);
                document.getElementById(shapeIdKeys[k]).style.boxShadow = "inset 0 0 0 1000px rgba(182, 182, 182,.75)";
                errorFound = true;
            }
        }

    }
    if (errorFound){
        playSound(wrong);
    }
    else{
        playSound(lvlWin);
        showCup();
    }
}

function invertRotationDegrees(shape, isHorizontal){
    var rotation = parseInt(shape.getAttribute("rotate"));
    // if (isHorizontal) {
    //     shape.setAttribute("rotate", - rotation);
    // }
    // else {
    //     shape.setAttribute("rotate", - rotation);
    // }
    shape.setAttribute("rotate", - rotation);
}

function invertClipPathPolygon(shape, isHorizontal){
    var cp;
    if (shape.style.clipPath != "") {
        cp = shape.style.clipPath;
    }
    else {
        cp = window.getComputedStyle(document.getElementById(shape.id)).getPropertyValue('clip-path');
    }

    cp = cp.substring("polygon(".length, cp.length - 1);
    var cpValues = new Array();
    // This will return an array with strings "1", "2", etc.
    cpValues = cp.split(", ");

    var clipPathStr = "polygon("
    for (var j = 0; j < cpValues.length; j++) {
        var pointCoord = cpValues[j].split(" ");
        var pointCoordX = pointCoord[0].slice(0, -1);
        var pointCoordY = pointCoord[1].slice(0, -1);

        if (isHorizontal) {
            pointCoordX = 100 - pointCoordX;
        }
        else {
            pointCoordY = 100 - pointCoordY;
        }

        clipPathStr += `${pointCoordX}% ${pointCoordY}%, `
    }

    clipPathStr = clipPathStr.substring(0, clipPathStr.length - 2) + ")";

    shape.style.clipPath = clipPathStr;
}

function invertTransformOrigin(shape, isHorizontal){
    var to;
    if (shape.getAttribute("transformOrigin")) {
        to = shape.getAttribute("transformOrigin");
    }
    else {
        to = shape.style.transformOrigin;
    }
    
    var toValues = new Array();
    // This will return an array with strings "1", "2", etc.
    toValues = to.split(" ");
    var transformOriginX = toValues[0].slice(0, -1);
    var transformOriginY = toValues[1].slice(0, -1);

    if (isHorizontal){
        transformOriginX = 100 - transformOriginX;
    }
    else {
        transformOriginY = 100 - transformOriginY;
    }

    shape.setAttribute("transformOrigin", `${transformOriginX}% ${transformOriginY}% 0px`);
}

function flipHappened(shape, isHorizontal){
    //TODO turn degrees to its negative value?
    //HOWTODO degrees % 360. degrees= - degrees
    invertRotationDegrees(shape, isHorizontal);
    invertClipPathPolygon(shape, isHorizontal);
    invertTransformOrigin(shape, isHorizontal);
    


    // if (document.getElementById(shape.id).style.clipPath != "") {
    //     document.getElementById(shape.id).style.clipPath = "";
    // }
    // else{
    //     if (isHorizontal){
    //         switch (shape.id) {
    //             case "square":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(75% 25%, 50% 0%, 25% 25%, 50% 50%)";
    //                 break;
    //             case "triangle1":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 50%, 100% 100%, 0% 100%)";
    //                 break;
    //             case "triangle2":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 50%, 100% 0%, 100% 100%)";
    //                 break;
    //             case "triangle3":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(0% 50%, 0% 0%, 50% 0%)";
    //                 break;
    //             case "triangle4":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 0%, 75% 25%, 100% 0%)";
    //                 break;
    //             case "triangle5":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(25% 75%, 25% 25%, 50% 50%)";
    //                 break;
    //             case "parallelogram":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(25% 75%, 25% 25%, 0% 50%, 0% 100%)";
    //                 break;
    //         }
    //     }
    //     else{
    //         switch (shape.id) {
    //             case "square":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(75% 75%, 50% 100%, 25% 75%, 50% 50%)";
    //                 break;
    //             case "triangle1":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 50%, 0% 0%, 100% 0%)";
    //                 break;
    //             case "triangle2":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 50%, 0% 100%, 0% 0%)";
    //                 break;
    //             case "triangle3":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(100% 50%, 100% 100%, 50% 100%)";
    //                 break;
    //             case "triangle4":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(50% 100%, 25% 75%, 0% 100%)";
    //                 break;
    //             case "triangle5":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(75% 25%, 75% 75%, 50% 50%)";
    //                 break;
    //             case "parallelogram":
    //                 document.getElementById(shape.id).style.clipPath = "polygon(75% 25%, 75% 75%, 100% 50%, 100% 0%)";
    //                 break;
    //         }
    //     }
    // }
}

function getPoints(shapeId){

    var shapeRotation = getShapesRotation(shapeId);
    var shapeTransform = document.getElementById(shapeId).style.transform;
    var shapeRotationStr = shapeTransform.substring(0, shapeTransform.indexOf("rotate(") - 1 ) + shapeTransform.substring(shapeTransform.indexOf("deg)") + "deg)".length, shapeTransform.length);
    document.getElementById(shapeId).style.transform = shapeRotationStr;

    initializeShapesEdges(document.getElementById(shapeId));
    initializeShapesCenters(document.getElementById(shapeId));

    document.getElementById(shapeId).style.transform += ` rotate(${shapeRotation}deg)`;

    var shapesCoords = [];
    
    var shapeRotation = parseInt(document.getElementById(shapeId).getAttribute("rotate"));//getShapesRotation(shapeId);
    var shapeRotationRads = shapeRotation * Math.PI / 180;

    for (var i = 0; i < initShapesEdges[shapeId].length; i++){
        var pointX = initShapesEdges[shapeId][i][0] - initShapesCenters[shapeId][0];
        var pointY = initShapesEdges[shapeId][i][1] - initShapesCenters[shapeId][1];
    
        var newX = pointX * Math.cos(shapeRotationRads) - pointY * Math.sin(shapeRotationRads) + initShapesCenters[shapeId][0];
        var newY = pointX * Math.sin(shapeRotationRads) + pointY * Math.cos(shapeRotationRads) + initShapesCenters[shapeId][1];

        shapesCoords.push([newX, newY]);
    }

    return shapesCoords;

}

function midpoint(ax, ay, bx, by, per) {
    return [ax + (bx - ax) * per, ay + (by - ay) * per];
}
//Array [ 905.6458511352539, 12