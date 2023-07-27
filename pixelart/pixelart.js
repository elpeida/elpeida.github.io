var level = 1;

var lvl1_info = "sounds/instructions/lvl1.mp3"; //to be changed
var lvl2_info = "sounds/instructions/lvl2.mp3"; //to be changed
var lvl3_info = "sounds/instructions/lvl3.mp3"; //to be changed

var gridSize = 10;
var grid20x20data = [];
var svgBCR;

var characterIDs = ["girl", "boy"];
var characterIndex = 0;
var character;

var lastClickedSquare = null;

var zoomWindow = document.getElementById("zoom_window");
var zoom = 2;
var zoomSquares = [];
var zoomIndexI = 0;
var zoomIndexJ = 0;

var commandsButtonsIDs = [
    "make_rectangle_00000041253033728485605990000006623464735127943552_",
    "make_triangle",
    "repeat"
];

var commandsIDs = {
    rectangle : "RECTANGLE_-_ORDER",
    square: "LVL1_ORDER",
    triangle: "triangle_order",
    repeat: "repeat_order"
};

var sampleImagesIDs = [
    "duck",
    "dog",
    "house",
    "flowers",
    "penguin"
];

var sampleImagesIndex = 0;

var symmetricSquaresGrid = [
    [ 
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)","rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", 
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(254, 241, 2)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(254, 241, 2)", "rgb(0, 0, 0)", "rgb(254, 241, 2)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(254, 241, 2)", "rgb(254, 241, 2)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(254, 241, 2)", "rgb(254, 241, 2)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(254, 241, 2)", "rgb(254, 241, 2)", "rgb(254, 241, 2)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(254, 241, 2)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"

    ],

    [
        "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(35, 64, 155)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(0, 0, 0)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(35, 64, 155)", "rgb(242, 102, 35)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(236, 28, 36)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"
    ],
    [
        "rgb(39, 170, 226)", "rgb(39, 170, 226)", "rgb(39, 170, 226)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(39, 170, 226)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(255, 255, 255)", "rgb(127, 63, 152)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(127, 63, 152)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(39, 170, 226)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(127, 63, 152)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(127, 63, 152)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(0, 161, 75)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"
    ],
    [
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"
    ],
    [
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(35, 64, 155)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)",
        "rgb(255, 255, 255)", "rgb(242, 102, 35)", "rgb(242, 102, 35)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"
    ]
];

var selectedPositions = [];

var selectedColor;
var selectedCommand;
var selectedSquares = [];

var commandsBlocks = 0;

var commandsContainer = document.getElementById("commands_container");

var greekRowsLetters = ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ"];

var r = document.querySelector(':root');

var undoSquaresData = [];
var gridIsVisible = true;

initializeEventListeners();
initializeData();
initializeGame();

var commands = document.getElementById("ORDERS").querySelectorAll("g");

$('#next_lvl').click(
    function () {
        if (level < 3){
            document.getElementById(`_${level}`).style.display = "none";

            level++;
            document.getElementById(`_${level}`).style.display = "block";

            document.getElementById("previous_lvl").style.filter = 'brightness(1)';
            if (level == 3) {
                document.getElementById("next_lvl").style.filter = 'brightness(0.75)';
            }
            else {
                document.getElementById("next_lvl").style.filter = 'brightness(1)';
            }
            initializeLevel();
        }
    }
);


$('#previous_lvl').click(
    function () {
        if (level > 1) {
            document.getElementById(`_${level}`).style.display = "none";

            level--;
            document.getElementById(`_${level}`).style.display = "block";

            document.getElementById("next_lvl").style.filter = 'brightness(1)';
            if (level == 1) {
                document.getElementById("previous_lvl").style.filter = 'brightness(0.75)';
            }
            else {
                document.getElementById("previous_lvl").style.filter = 'brightness(1)';
            }
            initializeLevel();
        }
        
    }
);

function instructionsClicked(){
    if (level == 1){
        playSound(lvl1_info);
    }
    else if (level == 2) {
        playSound(lvl2_info);
    }
    else if (level == 3) {
        playSound(lvl3_info);
    }
}


var audio;

function playSound(src) {
    if (audio) {
        audio.pause();
    }
    audio = new Audio(src);
    audio.play();
}

window.addEventListener('resize', function (event) {
    initializeGame();
}, true);


function initializeData(){
    for (var i = 0; i < 20; i++) {
        grid20x20data.push([]);
        for (var j = 0; j < 20; j++) {
            grid20x20data[i].push("#fff");
        }
    }
}

function initializeZoomWindow(){

    for (var i = 0; i < 20; i++) {
        zoomSquares.push([]);
        for (var j = 0; j < 20; j++) {
            zoomSquares[i].push(document.getElementById(`zoom_${number2Letter(i)}${j + 1}`));
        }
    }    
    
    resizeZoomWindow();

    var zoomWindowBCR = zoomWindow.getBoundingClientRect();
    var zoomGridBCR = document.getElementById("plegma_zoom_20x20").getBoundingClientRect();
    
    $(zoomWindow).draggable({
        containment: [zoomGridBCR.x, zoomGridBCR.y, zoomGridBCR.x + zoomGridBCR.width - zoomWindowBCR.width + 1, zoomGridBCR.y + zoomGridBCR.height - zoomWindowBCR.height + 1],
        stop: function (event, ui) {
            setTimeout(function () {
                $(event.target).data('dragging', false);

                for (var i = 0; i < 19; i++) {
                    for (var j=0; j<19; j++){
                        var currSquareBCR = zoomSquares[i][j].getBoundingClientRect();

                        var nextRowSquareBCR = zoomSquares[i][j + 1].getBoundingClientRect();
                        var nextColumnSquareBCR = zoomSquares[i + 1][j].getBoundingClientRect();
                        
                        var uiHelperBCR = ui.helper[0].getBoundingClientRect();
                        if ((currSquareBCR.x - uiHelperBCR.x <= 2 && nextRowSquareBCR.x - uiHelperBCR.x >= 2 ) &&
                            (currSquareBCR.y - uiHelperBCR.y <= 2 && nextColumnSquareBCR.y - uiHelperBCR.y >= 2)){
                            ui.helper.css('left', currSquareBCR.x);
                            ui.helper.css('top', currSquareBCR.y);

                            zoomIndexI = i;
                            zoomIndexJ = j;
                            redrawGridFromWindow();
                            redrawRowAndColumnsLetters();

                            if (lastClickedSquare != null) {
                                if ((zoomIndexI - 1 < lastClickedSquare[0] && lastClickedSquare[0] < zoomIndexI + gridSize) && 
                                    (zoomIndexJ - 1 < lastClickedSquare[1] && lastClickedSquare[1] < zoomIndexJ + gridSize)) {
                                    moveCharacter(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(lastClickedSquare[0] - zoomIndexI)}${lastClickedSquare[1] + 1 - zoomIndexJ}`));
                                }
                                else{
                                    character.style.display = "none";
                                }
                            }
                            return;
                        }
                    }
                }
            }, 1);
        }
    });
    
}

function initializeGame() {
    svgBCR = document.getElementById("mainSVG").getBoundingClientRect();

    var sampleCommand = document.getElementById("orders_space");

    commandsContainer.parentElement.style.width = `calc(${sampleCommand.getBoundingClientRect().width}px - 2vh)`;
    commandsContainer.parentElement.style.height = `calc(${sampleCommand.getBoundingClientRect().height}px - 10vh)`;

    commandsContainer.parentElement.style.left = sampleCommand.getBoundingClientRect().x;
    commandsContainer.parentElement.style.top = `calc(${sampleCommand.getBoundingClientRect().y}px + 5vh)`;

    if (character != null){
        character.remove();
    }
    character = document.getElementById(`${characterIDs[characterIndex]}`).cloneNode(true);
    character.removeAttribute("id");
    $(character).appendTo($(document.getElementById(`plegma_${gridSize}x${gridSize}`)));

    document.getElementById(`zoom${zoom}`).style.display = "block";
    document.getElementById(`plegma_${gridSize}x${gridSize}`).style.display = "block";
        
    initializeZoomWindow();

    initializeLevel();

    redrawRowAndColumnsLetters();

}

function initializeLevel(){

    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            grid20x20data[i][j] = "#fff";
            zoomSquares[i][j].style.fill = "#fff";
        }
    }
    redrawGridFromWindow();
    undoSquaresData = [];

    switch(level){
        case 1:
            document.getElementById("lvl2").style.display = "none";

            document.getElementById("plegma_zoom_20x20").style.opacity = "1";
            document.getElementById("zoom_in_out").style.display = "block";
            document.getElementById("zoom_window").style.display = "block";

            for (var i = 0; i < commandsButtonsIDs.length; i++){
                document.getElementById(commandsButtonsIDs[i]).style.display = "none";
            }
            break;
        case 2:
            document.getElementById("lvl2").style.display = "block";
            if (zoom > 2){
                zoomClicked(1 / 2);
            }
            else if (zoom < 2){
                zoomClicked(2);
            }
            changeSampleImage(0);

            document.getElementById("plegma_zoom_20x20").style.opacity = "0.000001";
            document.getElementById("zoom_in_out").style.display = "none";
            document.getElementById("zoom_window").style.display = "none";

            for (var i = 0; i < commandsButtonsIDs.length; i++) {
                document.getElementById(commandsButtonsIDs[i]).style.display = "block";
            }
            break;
        case 3:
            document.getElementById("lvl2").style.display = "none";
            
            document.getElementById("plegma_zoom_20x20").style.opacity = "1";
            document.getElementById("zoom_in_out").style.display = "block";
            document.getElementById("zoom_window").style.display = "block";
            
            break;
    }

    document.getElementById("square_name_rects_container").innerHTML = "";
    document.getElementById("commands_container").innerHTML = "";
    document.getElementById("commands_container").setAttribute("viewBox","1420 100 470 162");
    commandsBlocks = 0;

    if (audio) {
        audio.pause();
    }

}

function initializeEventListeners() {
    
    var squares20x20 = document.getElementById(`plegma_20x20`).querySelectorAll("rect");
    for (var i = 0; i < squares20x20.length; i++){
        squares20x20[i].addEventListener("click", function () { squareClicked(this) });
    }

    var squares10x10 = document.getElementById("plegma_10x10").querySelectorAll("rect");
    for (var i = 0; i < squares10x10.length; i++) {
        squares10x10[i].addEventListener("click", function () { squareClicked(this) });
    }

    var squares5x5 = document.getElementById("plegma_5x5").querySelectorAll("rect");
    for (var i = 0; i < squares5x5.length; i++) {
        squares5x5[i].addEventListener("click", function () { squareClicked(this) });
    }


    for (var i=0; i<commandsButtonsIDs.length; i++){
        document.getElementById(commandsButtonsIDs[i]).addEventListener("click", function () { commandClicked(this) });
    }

    var colorSquares = document.getElementById("colors").querySelectorAll("rect");
    for (var i = 0; i<colorSquares.length; i++){
        colorSquares[i].addEventListener("click", function () { colorClicked(this) });
    }

    document.getElementById(characterIDs[characterIndex]).parentElement.lastElementChild.style.display = "block";
    for (var i=0; i<characterIDs.length; i++){
        document.getElementById(characterIDs[i]).addEventListener("click", function () { changeSelectedCharacter(this) });
    }

    document.getElementById("_1-up-green").addEventListener("click", function () { changeSampleImage(-1) });
    document.getElementById("_1-down-green-2").addEventListener("click", function () { changeSampleImage(+1) });

    document.getElementById("instructions").addEventListener("click", function () { instructionsClicked() });

    document.getElementById("hide_grid").addEventListener("click", function () { toggleGridVisibilityClicked() });
    document.getElementById("upload_image").addEventListener("click", function () { uploadImageClicked() });
    document.getElementById("undo").addEventListener("click", function () { undoClicked() });
    document.getElementById("clear_canvas").addEventListener("click", function () { clearCanvasClicked() });
    document.getElementById("save_file").addEventListener("click", function () { saveFileClicked() });
    document.getElementById("load_file").addEventListener("click", function () { loadFileClicked() });
    document.getElementById("export_image").addEventListener("click", function () { exportClicked() });
    
    document.getElementById("_x2B_").addEventListener("click", function () { zoomClicked(2) });
    document.getElementById("_x2B_bg").addEventListener("click", function () { zoomClicked(2) });
    document.getElementById("_-").addEventListener("click", function () { zoomClicked(1 / 2) });
    document.getElementById("_-bg").addEventListener("click", function () { zoomClicked(1 / 2) });
    
}

function resizeZoomWindow(){
    var firstZoomSquareBCR = document.getElementById(`zoom_${number2Letter(zoomIndexI)}${zoomIndexJ + 1}`).getBoundingClientRect();
    var lastZoomSquareBCR = document.getElementById(`zoom_${number2Letter(gridSize - 1 + zoomIndexI)}${gridSize + zoomIndexJ}`).getBoundingClientRect();

    zoomWindow.style.width = lastZoomSquareBCR.x - firstZoomSquareBCR.x + firstZoomSquareBCR.width - 2 + "px";
    zoomWindow.style.height = lastZoomSquareBCR.y - firstZoomSquareBCR.y + firstZoomSquareBCR.height - 2 + "px";
    zoomWindow.style.left = firstZoomSquareBCR.x + "px";
    zoomWindow.style.top = firstZoomSquareBCR.y + "px";

}

function redrawGridFromWindow(){
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++){
            document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`).style.fill = grid20x20data[i + zoomIndexI][j + zoomIndexJ];
        }
    }
}

function zoomClicked(multiplier){
    if ((zoom > 1 && multiplier < 1) || (zoom < 3 && multiplier > 1)){
        
        document.getElementById(`zoom${zoom}`).style.display = "none";
        if (multiplier > 1){
            zoom ++;
        }
        else{
            zoom--;
        }
        
        document.getElementById(`zoom${zoom}`).style.display = "block";

        var squares = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelectorAll("rect");
        for (var i = 0; i < squares.length; i++) {
            $(squares[i]).unbind('mouseenter').unbind('mouseleave');
        }

        document.getElementById(`plegma_${gridSize}x${gridSize}`).style.display = "none";
        gridSize /= multiplier;
        document.getElementById(`plegma_${gridSize}x${gridSize}`).style.display = "block";

        if (zoomIndexI + gridSize > 20){
            zoomIndexI = 20 - gridSize;
        }
        if (zoomIndexJ + gridSize > 20) {
            zoomIndexJ = 20 - gridSize;
        }

        resizeZoomWindow();
        redrawGridFromWindow();

        var zoomWindowBCR = zoomWindow.getBoundingClientRect();
        var zoomGridBCR = document.getElementById("plegma_zoom_20x20").getBoundingClientRect();

        $(zoomWindow).draggable("option", "containment", [zoomGridBCR.x, zoomGridBCR.y, zoomGridBCR.x + zoomGridBCR.width - zoomWindowBCR.width + 1, zoomGridBCR.y + zoomGridBCR.height - zoomWindowBCR.height + 1]);

        redrawRowAndColumnsLetters();
        if (lastClickedSquare != null){
            if ((zoomIndexI - 1 < lastClickedSquare[0] && lastClickedSquare[0] < zoomIndexI + gridSize) &&
                (zoomIndexJ - 1 < lastClickedSquare[1] && lastClickedSquare[1] < zoomIndexJ + gridSize)) {
                    moveCharacter(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(lastClickedSquare[0] - zoomIndexI)}${lastClickedSquare[1] + 1 - zoomIndexJ}`));
            }
        }

        gridIsVisible = !gridIsVisible
        toggleGridVisibilityClicked();

        var commandToExecuteBlocks = document.getElementsByClassName("commandToExecute");
        if (commandToExecuteBlocks.length != 0){
            cancelSelectedCommand();
        }
    }
}

function redrawRowAndColumnsLetters() {
    var rowsContainer = document.getElementById("grid_rows");
    rowsContainer.innerHTML = "";
    var columnsContainer = document.getElementById("grid_columns");
    columnsContainer.innerHTML = "";

    if (gridSize != 20){

        var firstInitLetterX = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#init_row_0`).getBoundingClientRect().x;
        for (var i = 0; i < gridSize; i++) {
            rowLetter = document.createElement('text');
            rowLetter.id = `row_${i}`;
            rowLetter.innerHTML = greekRowsLetters[i + zoomIndexI];

            var initialRowLetter = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#init_row_${i}`);
            rowLetter.style.transform = `translate(${firstInitLetterX}px, ${initialRowLetter.getBoundingClientRect().y}px)`;

            rowsContainer.appendChild(rowLetter);
        }

        for (var i = 0; i < gridSize; i++) {
            colLetter = document.createElement('text');
            colLetter.id = `col_${i}`;
            colLetter.innerHTML = i + 1 + zoomIndexJ;

            var initialColLetter = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#init_col_${i}`);
            colLetter.style.transform = `translate(${initialColLetter.getBoundingClientRect().x}px, ${initialColLetter.getBoundingClientRect().y}px)`;

            initialColLetter.parentNode.insertBefore(colLetter, initialColLetter.nextSibling);

            columnsContainer.appendChild(colLetter);
        }

        if (gridSize == 5){
            r.style.setProperty("--rowFontSize", "4vh");
        }
        else{
            r.style.setProperty("--rowFontSize", "2.3vh");
        }
    }
}

function changeSelectedCharacter(selectedCharacter){
    document.getElementById(characterIDs[characterIndex]).parentElement.lastElementChild.style.display = "none";

    characterIndex = characterIDs.indexOf(selectedCharacter.id);
    document.getElementById(characterIDs[characterIndex]).parentElement.lastElementChild.style.display = "block";
    //document.getElementById("plegma_20x20").style.cursor = `url(images/${ character.id}.gif), auto`;

    character.remove();
    character = selectedCharacter.cloneNode(true);
    
    character.removeAttribute("id");

    $(character).appendTo($(document.getElementById(`plegma_${gridSize}x${gridSize}`)));
}

function changeSampleImage(d){
    if ((d < 0 && sampleImagesIndex == 0) || ((d > 0 && sampleImagesIndex == sampleImagesIDs.length -1))){
        return;
    }

    var symmetricImageSize = Math.sqrt(symmetricSquaresGrid[0].length);

    if (gridSize < symmetricImageSize){
        return;
    }

    document.getElementById(sampleImagesIDs[sampleImagesIndex]).style.display = "none";
    sampleImagesIndex += d;
    document.getElementById(sampleImagesIDs[sampleImagesIndex]).style.display = "block";

    
    for (var i = 0; i < symmetricImageSize; i++) {
        for (var j = 0; j < symmetricImageSize; j++) {
            
            if (i < gridSize && j < gridSize){
                document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`).style.fill = symmetricSquaresGrid[sampleImagesIndex][i * symmetricImageSize + j];
            }

            document.getElementById(`zoom_${number2Letter(i + zoomIndexI)}${j + 1 + zoomIndexJ}`).style.fill = symmetricSquaresGrid[sampleImagesIndex][i * symmetricImageSize + j];
        
            grid20x20data[i + zoomIndexI][j + zoomIndexJ] = symmetricSquaresGrid[sampleImagesIndex][i * symmetricImageSize + j];
        }
    }
}

function moveCharacter(square){
    character.style.display = "block";
    var squareBCR = square.getBoundingClientRect();
    var characterBCR = document.getElementById(`${characterIDs[characterIndex]}`).getBoundingClientRect();

    var translateX = (squareBCR.x - characterBCR.x) * 1920 / svgBCR.width + squareBCR.width / 2 - characterBCR.width / 2;
    var translateY = (squareBCR.y - characterBCR.y - characterBCR.height) * 1080 / svgBCR.height + squareBCR.height / 2;
    character.style.transform = `translate(${translateX}px, ${translateY}px)`;
    $(character).appendTo($(document.getElementById(`plegma_${gridSize}x${gridSize}`)));
}

function fillSquareNameRect(square, commandToExecuteBlocks){
    

    var newSquareName = document.createElement('text');
    var squareIdIndexes = squareId2Numbers(square.id);
    newSquareName.innerHTML = `${greekRowsLetters[squareIdIndexes[0] + zoomIndexI]}${squareIdIndexes[1] + 1 + zoomIndexJ}`;

    var squareNamesContainer = document.getElementById("square_name_rects_container");
    var squareNamesContainerBCR = document.getElementById("square_name_rects_container").getBoundingClientRect();
    
    if (selectedSquares.length == 1){
        var newSquareNameDiv = document.createElement('div');
        newSquareNameDiv.appendChild(newSquareName);
        squareNamesContainer.appendChild(newSquareNameDiv);
    }
    else{
        squareNamesContainer.lastElementChild.appendChild(newSquareName);
    }
    

    var newSquareNameBCR = newSquareName.getBoundingClientRect();

    var commandSquareNameBCR = commandToExecuteBlocks[0].querySelector(`#square_name_rect${selectedSquares.length}`).getBoundingClientRect();

    newSquareName.style.left = `${(commandSquareNameBCR.x - newSquareNameBCR.x + commandSquareNameBCR.width / 2 - newSquareNameBCR.width / 2) * 100 / squareNamesContainerBCR.width}%`;
    newSquareName.style.top = `${(commandSquareNameBCR.y - newSquareNameBCR.y + commandSquareNameBCR.height / 2 - newSquareNameBCR.height / 2) * 100 / squareNamesContainerBCR.height}%`;
}

function squareClicked(square){
    lastClickedSquare = squareId2Numbers(square.id);
    lastClickedSquare[0] += zoomIndexI;
    lastClickedSquare[1] += zoomIndexJ;
    
    var commandToExecuteBlocks = document.getElementsByClassName("commandToExecute");

    if (square.classList.contains("selected-square")){
        cancelSelectedCommand(); 
        return;
        
    }
    else{
        moveCharacter(square);

        square.classList.add("selected-square");
        selectedSquares.push(square);
    }

    if (selectedCommand != null){
        switch (selectedCommand.id){
            case "make_rectangle_00000041253033728485605990000006623464735127943552_":
                if (selectedSquares.length == 1){
                    if (document.getElementsByClassName("commandToExecute").length == 0){
                        makeCommandBlock("rectangle");
                    }
                    
                    for (var i = 0; i < gridSize; i++) {
                        for (var j = 0; j < gridSize; j++) {
                            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j+1}`)).hover(function () { makeRectangle(selectedSquares[0], this); });
                        }
                    }

                    fillSquareNameRect(square, commandToExecuteBlocks);

                }
                else {
                    fillSquareNameRect(square, commandToExecuteBlocks);
                    paintSquares();
                    $(".commandToExecute:first").attr("class", "executedCommand");
                    //selectedCommand = null;
                }
                break;
            case "make_triangle":
                if (selectedSquares.length == 1) {
                    if (document.getElementsByClassName("commandToExecute").length == 0) {
                        makeCommandBlock("triangle");
                    }
                    
                    for (var i = 0; i < gridSize; i++) {
                        for (var j = 0; j < gridSize; j++) {
                            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`)).unbind('mouseenter').unbind('mouseleave');
                        }
                    }

                    for (var i = 0; i < gridSize; i++) {
                        for (var j = 0; j < gridSize; j++) {
                            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`)).hover(function () { drawLine(selectedSquares[0], this); });
                        }
                    }

                    fillSquareNameRect(square, commandToExecuteBlocks);
                }
                else if (selectedSquares.length == 2) {
                    for (var i = 0; i < gridSize; i++) {
                        for (var j = 0; j < gridSize; j++) {
                            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`)).hover(function () { drawTriangle(selectedSquares[0], selectedSquares[1], this); });
                        }
                    }

                    fillSquareNameRect(square, commandToExecuteBlocks);
                }
                else {
                    fillSquareNameRect(square, commandToExecuteBlocks);
                    paintSquares();
                    $(".commandToExecute:first").attr("class", "executedCommand");
                    //selectedCommand = null;
                }
                break;
            case "repeat":
                if (selectedSquares.length == 1) {
                    if (document.getElementsByClassName("commandToExecute").length == 0) {
                        makeCommandBlock("repeat");
                    }

                    for (var i = 0; i < gridSize; i++) {
                        for (var j = 0; j < gridSize; j++) {
                            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`)).hover(function () { drawRepeat(selectedSquares[0], this); });
                        }
                    }

                    fillSquareNameRect(square, commandToExecuteBlocks);
                }
                else {
                    fillSquareNameRect(square, commandToExecuteBlocks);
                    paintSquares();
                    $(".commandToExecute:first").attr("class", "executedCommand");
                    //selectedCommand = null;
                }
                break;
            default:   
                for (var i = 0; i < selectedSquares.length; i++) {
                    selectedSquares[i].classList.remove("selected-square");
                }
                selectedSquares = [];
        }
    }
    else {
        makeCommandBlock("square");
        
        var selectedSquareIndexes = squareId2Numbers(selectedSquares[0].id); 
        undoSquaresData.push([[`${number2Letter(selectedSquareIndexes[0] + zoomIndexI)}${selectedSquareIndexes[1] + 1 + zoomIndexJ}`, selectedSquares[0].style.fill]]);
        if (undoSquaresData.length > 10) {
            undoSquaresData.shift();
        }

        var color = selectedColor != null ? $(selectedColor).css('fill') : "#fff";
        selectedSquares[0].style.fill = color;

        var selectedSquaresIndexes = squareId2Numbers(selectedSquares[0].id);
        document.getElementById(`zoom_${number2Letter(selectedSquaresIndexes[0] + zoomIndexI)}${selectedSquaresIndexes[1] + 1 + zoomIndexJ}`).style.fill = color;
        selectedSquares[0].classList.remove("selected-square");

        var row = letter2Number(selectedSquares[0].id[0]);
        var column = parseInt(selectedSquares[0].id.slice(1)) - 1;
        grid20x20data[row + zoomIndexI][column + zoomIndexJ] = color;

        fillSquareNameRect(square, commandToExecuteBlocks);
        
        $(".commandToExecute:first").attr("class", "executedCommand");
        
        selectedSquares = [];

    }
}

function number2Letter(number) {
    var char;
    
    if (Math.floor(number / 26) - 1 > -1) {
        char = String.fromCharCode(65 + (Math.floor(number / 26) - 1));
    }
    else {
        char = "";
    }
    number = number - Math.floor(number / 26) * 26;
    char += String.fromCharCode(65 + number);
    return char;
}

function letter2Number(letter) {
    return letter.charCodeAt(0) - 65;
    // if (letter.length == 2) {
    //     return (letter.charCodeAt(0) - 64) * 26 + (letter.charCodeAt(1) - 65);
    // }
    // else {
    //     return letter.charCodeAt(0) - 65;
    // }
}

function squareId2Numbers(id){
    return [letter2Number(id[0]), parseInt(id.slice(1)) - 1];
}

function paintSquares(){

    var hoveredSquares = document.querySelectorAll(".hovered-square");
    var color = selectedColor != null ? $(selectedColor).css('fill') : "#fff";

    var historyLength = undoSquaresData.length;

    undoSquaresData.push([]);
    
    for (var i = 0; i < hoveredSquares.length; i++) {
        var hoveredSquareIndexes = squareId2Numbers(hoveredSquares[i].id);
        undoSquaresData[historyLength].push([`${number2Letter(hoveredSquareIndexes[0] + zoomIndexI)}${hoveredSquareIndexes[1] + 1 + zoomIndexJ}`, hoveredSquares[i].style.fill]);    

        hoveredSquares[i].style.fill = color;
        hoveredSquares[i].classList.remove("hovered-square");

        document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${hoveredSquares[i].id}`).style.fill = color;
        var hoveredSquaresIndexes = squareId2Numbers(hoveredSquares[i].id);
        document.getElementById(`zoom_${number2Letter(hoveredSquaresIndexes[0] + zoomIndexI)}${hoveredSquaresIndexes[1] + 1 + zoomIndexJ}`).style.fill = color;

        grid20x20data[hoveredSquaresIndexes[0] + zoomIndexI][hoveredSquaresIndexes[1] + zoomIndexJ] = color;

        // var gridData;

        // switch (gridSize){
        //     case 20:
        //         gridData = grid20x20data;
        //         break;
        //     case 10:
        //         gridData = grid10x10data;
        //         break;
        //     case 5:
        //         gridData = grid5x5data;
        //         break;
        // }

        // var row = letter2Number(hoveredSquares[i].id[0]);
        // var column = parseInt(hoveredSquares[i].id.slice(1)) - 1;
        // if (row < 5 && column < 5){
        //     grid5x5data[row][column] = color;
        // }
        // if (row < 10 && column < 10) {
        //     grid10x10data[row][column] = color;
        // }
        // grid20x20data[row][column] = color;
    }

    if (undoSquaresData.length > 10) {
        undoSquaresData.shift();
    }

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            $(document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`)).unbind('mouseenter').unbind('mouseleave');
        }
    }

    for (var i = 0; i < selectedSquares.length; i++) {
        selectedSquares[i].classList.remove("selected-square");
    }
    selectedSquares = [];
}

function makeRectangle(s1, s2){
    
    var hoveredSquares = document.querySelectorAll(".hovered-square");
    
    for (var i = 0; i < hoveredSquares.length; i++) {
        hoveredSquares[i].classList.remove("hovered-square");
    }

    if (s1 == s2){
        return;
    }

    var s1i = letter2Number(s1.id[0]);
    var s1j = parseInt(s1.id.slice(1)) - 1;
    var s2i = letter2Number(s2.id[0]);
    var s2j = parseInt(s2.id.slice(1)) - 1;

    iBegin = Math.min(s1i, s2i);
    iEnd = Math.max(s1i, s2i);
    jBegin = Math.min(s1j, s2j);
    jEnd = Math.max(s1j, s2j);


    for (var i = iBegin; i <= iEnd; i++) {
        for (var j= jBegin; j <= jEnd; j++){
            var rowLetter = number2Letter(i);
            document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
        }
    }
}

function drawRepeat(s1, s2) {

    var hoveredSquares = document.querySelectorAll(".hovered-square");

    for (var i = 0; i < hoveredSquares.length; i++) {
        hoveredSquares[i].classList.remove("hovered-square");
    }

    if (s1 == s2) {
        return;
    }

    var s1i = letter2Number(s1.id[0]);
    var s1j = parseInt(s1.id.slice(1)) - 1;
    var s2i = letter2Number(s2.id[0]);
    var s2j = parseInt(s2.id.slice(1)) - 1;

    iBegin = Math.min(s1i, s2i);
    iEnd = Math.max(s1i, s2i);
    jBegin = Math.min(s1j, s2j);
    jEnd = Math.max(s1j, s2j);

    if (iBegin == iEnd){
        for (var j = jBegin; j <= jEnd; j++) {
            var rowLetter = number2Letter(iBegin);
            document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
        }
    }
    else{
        for (var j = jBegin; j < gridSize; j++) {
            var rowLetter = number2Letter(iBegin);
            document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
        }

        for (var i = iBegin + 1; i <= iEnd - 1; i++) {
            for (var j = 0; j < gridSize; j++) {
                var rowLetter = number2Letter(i);
                document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
            }
        }

        for (var j = 0; j <= jEnd; j++) {
            var rowLetter = number2Letter(iEnd);
            document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
        }
    }
}

function diagonal_distance(p0i, p0j, p1i, p1j) {
    let dx = p1i - p0i, dy = p1j - p0j;
    return Math.max(Math.abs(dx), Math.abs(dy));
}

function round_point(p) {
    return [Math.round(p[0]), Math.round(p[1])];
}

function lerp_point(p0i, p0j, p1i, p1j, t) {
    return [lerp(p0i, p1i, t), lerp(p0j, p1j, t)];
}

function lerp(start, end, t) {
    return start * (1.0 - t) + t * end;
}

function line(p0i, p0j, p1i, p1j) {
    let points = [];
    let N = diagonal_distance(p0i, p0j, p1i, p1j);
    for (let step = 0; step <= N; step++) {
        let t = N === 0 ? 0.0 : step / N;
        points.push(round_point(lerp_point(p0i, p0j, p1i, p1j, t)));
    }
    return points;
}

function drawLine(s1, s2){
    var hoveredSquares = document.querySelectorAll(".hovered-square");

    for (var i = 0; i < hoveredSquares.length; i++) {
        hoveredSquares[i].classList.remove("hovered-square");
    }

    if (s1 == s2) {
        return;
    }

    var s1i = letter2Number(s1.id[0]);
    var s1j = parseInt(s1.id.slice(1)) - 1;
    var s2i = letter2Number(s2.id[0]);
    var s2j = parseInt(s2.id.slice(1)) - 1;

    var lineSquares = line(s1i, s1j, s2i, s2j);
    for (var i=0; i<lineSquares.length; i++){
        var rowLetter = number2Letter(lineSquares[i][0]);
        document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${lineSquares[i][1] + 1}`).classList.add("hovered-square");
    }
}

function drawTriangle(s1, s2, s3){
    var hoveredSquares = document.querySelectorAll(".hovered-square");

    for (var i = 0; i < hoveredSquares.length; i++) {
        hoveredSquares[i].classList.remove("hovered-square");
    }

    if (s1 == s2 || s2 == s3 || s1 == s3) {
        return;
    }

    var s1i = letter2Number(s1.id[0]);
    var s1j = parseInt(s1.id.slice(1)) - 1;
    var s2i = letter2Number(s2.id[0]);
    var s2j = parseInt(s2.id.slice(1)) - 1;
    var s3i = letter2Number(s3.id[0]);
    var s3j = parseInt(s3.id.slice(1)) - 1;

    var lineSquares1 = line(s1i, s1j, s2i, s2j);
    var lineSquares2 = line(s2i, s2j, s3i, s3j);
    var lineSquares3 = line(s1i, s1j, s3i, s3j);

    //draw between
    var allSquares = lineSquares1.concat(lineSquares2, lineSquares3);
    var sortedSquares = allSquares.sort(function (a, b) {
        if (a[0] == b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    
    for (var i=0; i<sortedSquares.length -1; i++){
        var i1 = sortedSquares[i][0];
        var j1 = sortedSquares[i][1];
        var i2 = sortedSquares[i + 1][0];
        var j2 = sortedSquares[i + 1][1];

        if (i1 == i2){
            for (var j=j1; j<=j2; j++){
                var rowLetter = number2Letter(i1);
                document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${rowLetter}${j + 1}`).classList.add("hovered-square");
            }
        }
    }
}

function colorClicked(colorSquare){

    colorSquare.style.transform = "scale(1.4)";

    if (selectedColor) {
        selectedColor.style.transform = "";
    }
    if (selectedColor == colorSquare) {
        selectedColor = null;
    }
    else {
        selectedColor = colorSquare;
    }
    
    var color = $(colorSquare).css('fill');
    if (color == ""){
        color = "#000";
    }

    r.style.setProperty("--selectedColor", color);

    var commandToExecuteBlocks = document.getElementsByClassName("commandToExecute");
    if (commandToExecuteBlocks.length != 0){
        commandToExecuteBlocks[0].querySelector("[id$=_square]").style.fill = color;
    }
}

function makeCommandBlock(commandName){
    var command = $(`#${commandsIDs[commandName]}`).clone().css('display', 'block');
    var commandBg = $('#command_bg').clone().css('display', 'block');
    command.prepend(commandBg);
    command.appendTo(commandsContainer);

    var color = selectedColor != null ? $(selectedColor).css('fill') : "#fff";
    $(command)[0].querySelector("[id$=_square]").style.fill = color;
    
    command.attr("transform", `translate(0 ${commandsBlocks * 100})`);

    $(command)[0].classList.add('commandToExecute');

    commandsBlocks++;

    commandsContainer.setAttribute("viewBox", `1420 100 470 ${62 + commandsBlocks * 100}`);
    commandsContainer.parentElement.scrollTop = commandsContainer.parentElement.scrollHeight;
    //commandsContainer.scrollTop = commandsContainer.scrollHeight;
}

function cancelSelectedCommand(){

    var commandToExecuteBlocks = document.getElementsByClassName("commandToExecute");
    if (commandToExecuteBlocks.length != 0) {
        commandToExecuteBlocks[0].remove();
    }
    else{
        return;
    }

    commandsBlocks--;

    var hoveredSquares = document.querySelectorAll(".hovered-square");

    for (var i = 0; i < hoveredSquares.length; i++) {
        hoveredSquares[i].classList.remove("hovered-square");
    }

    var squares = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelectorAll("rect");
    for (var i = 0; i < squares.length; i++) {
        $(squares[i]).unbind('mouseenter').unbind('mouseleave');
    }

    for (var i = 0; i < selectedSquares.length; i++) {
        selectedSquares[i].classList.remove("selected-square");
    }

    selectedSquares = [];

    var squareNamesContainer = document.getElementById("square_name_rects_container");
    if (squareNamesContainer.childNodes.length != commandsBlocks){
        squareNamesContainer.lastElementChild.remove();
    }

}

function commandClicked(command){

    command.style.transform = "scale(1.5)";

    if (selectedCommand) {
        selectedCommand.style.transform = "";

        cancelSelectedCommand();
    }
    if (selectedCommand == command) {
        selectedCommand = null;
    }
    else {
        selectedCommand = command;

        switch(selectedCommand.id){
            case "make_rectangle_00000041253033728485605990000006623464735127943552_":
                makeCommandBlock("rectangle");
                break;
            case "make_triangle":
                makeCommandBlock("triangle");
                break;
            case "repeat":
                makeCommandBlock("repeat");
                break;
        }
    }

}

function toggleGridVisibilityClicked(){
    var gridSquares = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelectorAll("rect");
    
    if (gridIsVisible){
        if (gridSize == 10){
            for (var i=0; i<gridSquares.length; i++){
                if (gridSquares[i].id != "") {
                    gridSquares[i].style.strokeWidth = 0;
                }
            }
        }
        else{
            for (var i = 0; i < gridSquares.length; i++) {
                if (gridSquares[i].id != ""){
                    gridSquares[i].nextElementSibling.style.display = "none";
                }
            }
        }
    }
    else{
        if (gridSize == 10) {
            for (var i = 0; i < gridSquares.length; i++) {
                if (gridSquares[i].id != "") {
                  gridSquares[i].style.strokeWidth = 2;
                }
            }
        }
        else{
            for (var i = 0; i < gridSquares.length; i++) {
                gridSquares[i].nextElementSibling.style.display = "block";
            }
        }
    }

    gridIsVisible = !gridIsVisible;
}

function undoClicked(){

    if (selectedCommand){
        selectedCommand.style.transform = "";
        cancelSelectedCommand();
        selectedCommand = null;
    }

    var historyLength = undoSquaresData.length - 1;
    
    if (historyLength != -1){
        for (var i=0; i<undoSquaresData[historyLength].length; i++){

            document.getElementById(`zoom_${undoSquaresData[historyLength][i][0]}`).style.fill = undoSquaresData[historyLength][i][1];

            var undoSquaresIndexes = squareId2Numbers(undoSquaresData[historyLength][i][0]);            
            grid20x20data[undoSquaresIndexes[0]][undoSquaresIndexes[1]] = undoSquaresData[historyLength][i][1];
            
            redrawGridFromWindow();
        }
    }
    else{
        return;
    }

    undoSquaresData.pop();

    var executedCommandsBlocks = document.getElementsByClassName("executedCommand");
    if (executedCommandsBlocks.length != 0){
        if (executedCommandsBlocks[executedCommandsBlocks.length - 1].style.display != "none"){
            commandsBlocks--;
        }
        executedCommandsBlocks[executedCommandsBlocks.length - 1].remove();
        
        var squareNamesContainer = document.getElementById("square_name_rects_container");
        squareNamesContainer.lastElementChild.remove();

        commandsContainer.setAttribute("viewBox", `1420 100 470 ${62 + commandsBlocks * 100}`);
    }
}

function clearCanvasClicked(){

    var historyLength = undoSquaresData.length;

    undoSquaresData.push([]);

    for (var i = 0; i < gridSize; i++) {
        for (var j=0; j<gridSize; j++){
            var row = number2Letter(i + zoomIndexI);
            var column = j + 1 + zoomIndexJ;

            var square = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`);

            undoSquaresData[historyLength].push([`${row}${column}`, square.style.fill]);    

            square.style.fill = "#fff";
            document.getElementById(`zoom_${row}${column}`).style.fill = "#fff";

            grid20x20data[i + zoomIndexI][j + zoomIndexJ] = "#fff";
        }
    }


    if (undoSquaresData.length > 10) {
        undoSquaresData.shift();
    }

    var hiddenCommand = $(`#${commandsIDs['rectangle']}`).clone().css('display', 'none');
    hiddenCommand.appendTo($('#commands_container'));
    $(hiddenCommand)[0].classList.add('executedCommand');

    var emptySqureNamesDiv = document.createElement('div');
    document.getElementById("square_name_rects_container").appendChild(emptySqureNamesDiv);

}


var uploadImage = function (event) {
    var image = document.getElementById('uploaded_image');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.parentElement.style.display = "block";

    setTimeout(function(){
        drawImageToGrid(URL.createObjectURL(event.target.files[0]));
    },100);
    
};

function drawImageToGrid(url) {
    var image = document.getElementById('uploaded_image');
    var imageWidth = image.naturalWidth;
    var imageHeight = image.naturalHeight;

    var canvas = document.createElement("canvas");
    canvas.width = imageWidth;
    canvas.height = imageHeight;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {

            var square = document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(i)}${j + 1}`);
            square.style.fill = "#000";
            document.getElementById(`zoom_${number2Letter(i + zoomIndexI) }${j + 1 + zoomIndexJ}`).style.fill = "#fff";

            grid20x20data[i + zoomIndexI][j + zoomIndexJ] = color;
        }
    }

    var pixelArr = ctx.getImageData(0, 0, imageWidth, imageHeight).data;
    if (imageWidth >= imageHeight) {
        var sample_size = Math.floor(imageWidth / gridSize);
    }
    else if (imageWidth < imageHeight) {
        var sample_size = Math.floor(imageHeight / gridSize);
    }

    for (i = 0; i < imageHeight / sample_size; i++) {
        for (j = 0; j < imageWidth/sample_size; j++) {
            var p = ((j * sample_size) + (i * sample_size * imageWidth)) * 4;

            var row = i + Math.floor((gridSize - Math.floor(imageHeight / sample_size)) / 2);
            var column = j + Math.floor((gridSize - Math.floor(imageWidth / sample_size)) / 2);

            if (row < gridSize && column < gridSize){
                var color = `rgba(${pixelArr[p]},${pixelArr[p + 1]},${pixelArr[p + 2]},${pixelArr[p + 3]})`;
                document.getElementById(`plegma_${gridSize}x${gridSize}`).querySelector(`#${number2Letter(row)}${column + 1}`).style.fill = color;
                document.getElementById(`zoom_${number2Letter(row + zoomIndexI)}${column + 1 + zoomIndexJ}`).style.fill = color;
                
                grid20x20data[row + zoomIndexI][column + zoomIndexJ] = color;
            }
        }
    }
}

function uploadImageClicked() {
    document.getElementById('upload_input').click();
}

function saveFileClicked() {
    var file = new Blob([document.getElementById(`plegma_zoom_20x20`).innerHTML], { type: "text/plain" });
    var timestamp = new Date().getUTCMilliseconds();
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, "PixelArt" + timestamp + ".pxl");
    else { // Others
        var a = document.createElement("a");
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = "PixelArt" + timestamp + ".pxl";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

var loadFile = function (event) {

    var fr = new FileReader();
    fr.onload = function () {
        document.getElementById("plegma_zoom_20x20").innerHTML = fr.result;

        for (var i = 0; i < 20; i++) {
            grid20x20data[i] = []
            for (var j = 0; j < 20; j++) {
                var zoomSquare = document.getElementById(`zoom_${number2Letter(i)}${j + 1}`);
                var zoomSquareColor = zoomSquare.style.fill != "" ? zoomSquare.style.fill : "#fff"
                grid20x20data[i].push(zoomSquareColor);
            }
        }

        zoomSquares = [];
        initializeZoomWindow();
        redrawGridFromWindow();
    }

    fr.readAsText(event.target.files[0]);
};

function loadFileClicked() {
    document.getElementById('load_file_input').click();
}

function exportClicked() {
    var imageSize = 20;
    var download_canvas = document.createElement("canvas");
    download_canvas.setAttribute("width", 1000 - imageSize);
    download_canvas.setAttribute("height", 1000 - imageSize);
    var ctx = download_canvas.getContext("2d");
    for (i = 0; i < imageSize; i++) {
        for (j = 0; j < imageSize; j++) {
            //ctx.fillStyle = document.getElementById("plegma_20x20").querySelector(`#${number2Letter(i)}${j + 1}`).style.fill;
            ctx.fillStyle = grid20x20data[i][j];
            ctx.fillRect(j * 1000 / imageSize - j, i * 1000 / imageSize - i, 1000 / imageSize, 1000 / imageSize);
        }
    }

    var a = document.createElement('a');

    a.href = download_canvas.toDataURL("");
    a.download = "Pixel Art.png";
    a.click();
}