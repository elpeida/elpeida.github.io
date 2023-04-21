var toysIds = [
    "butterfly",
    "raketa",
    "pirate_boat",
    "guitar",
    "train",
    "dino",
    "robot",
    "football",
    "duck",
    "soldier",
    "horse",
    "helicopter"
];
var panelToysIds = [
"butterfly-2",
"raketa-2",
"pirateboat",
"guitar-2",
"train-2",
"dinosaur-2",
"robot-2",
"football-2",
"duck-2",
"soldier-2",
"horse-2",
"elikoptero-2"
]

var lvl2LibArrangement = {
    "butterliy-_place": panelToysIds[0],
    "raketa-_place": panelToysIds[1],
    "pirate_boat_-_place": panelToysIds[2],
    "guitar_-_place": panelToysIds[3],
    "train_-_place": panelToysIds[4],
    "dino_-_place": panelToysIds[5],
    "robot_-_place" : panelToysIds[6],
    "football_-_place": panelToysIds[7],
    "duck_-_place": panelToysIds[8],
    "soldier_-_place": panelToysIds[9],
    "horse_-_place": panelToysIds[10],
    "helicopter_-_place": panelToysIds[11]
};

var directions = {
    "butterfly-2": "sounds/instructions/butterfly-2.mp3",
    "raketa-2": "sounds/instructions/raketa-2.mp3",
    "pirateboat": "sounds/instructions/pirateboat.mp3",
    "guitar-2": "sounds/instructions/guitar-2.mp3",
    "train-2": "sounds/instructions/train-2.mp3",
    "dinosaur-2": "sounds/instructions/dinosaur-2.mp3",
    "robot-2": "sounds/instructions/robot-2.mp3",
    "football-2": "sounds/instructions/football-2.mp3",
    "duck-2": "sounds/instructions/duck-2.mp3",
    "soldier-2": "sounds/instructions/soldier-2.mp3",
    "horse-2": "sounds/instructions/horse-2.mp3",
    "elikoptero-2": "sounds/instructions/elikoptero-2.mp3"
}

var arrowsIds = {
    "butterliy-_place": "_1c",
    "raketa-_place": "_2c",
    "pirate_boat_-_place": "_2a",
    "guitar_-_place": "_3c",
    "train_-_place": "_5a",
    "dino_-_place": "_4c",
    "robot_-_place": "_1b",
    "football_-_place": "_2b",
    "duck_-_place": "_1a",
    "soldier_-_place": "_4b",
    "horse_-_place": "_4a",
    "helicopter_-_place": "_3a"
}

var level = 1;
var lvlToysNumber = 6;

var toysFoundCount;
var selectedToy;

var audioPlaysAlready = false;
var audio;

var randomToysIds = []; 

var wrong = "sounds/wrong answer.wav";
var right = "sounds/right answer 2.wav";
var lvlWin = "sounds/win game level 282.wav";

var lvl1_info = "sounds/instructions/level_1.mp3";
var lvl2_info = "sounds/instructions/level_2.mp3";

var winContainer = document.getElementById("win-container");
var win = document.getElementById("win");


initiateLevel();

function increaseLevel(){
    if (level < 2){
        level++;
        lvlToysNumber = 12;
        initiateLevel();
    }
}


function decreaseLevel() {
    if (level > 1) {
        level--;
        lvlToysNumber = 6;
        initiateLevel();
    }
}

function initiateEventListeners() {
    document.getElementById("level-1").querySelector("#next_lvl").style.filter = 'brightness(0.75)';
    document.getElementById("level-1").querySelector("#previous_lvl").addEventListener("click", function () { decreaseLevel() });
    document.getElementById("level-2").querySelector("#next_lvl").addEventListener("click", function () { increaseLevel() });
    document.getElementById("level-2").querySelector("#previous_lvl").addEventListener("click", function () { decreaseLevel() });
    
    document.getElementById("level-1").querySelector("#info").addEventListener("click", function () { playSound(lvl1_info) });
    document.getElementById("level-2").querySelector("#info").addEventListener("click", function () { playSound(lvl2_info) });

    var libRectKeys = Object.keys(lvl2LibArrangement);
    for (var i = 0; i < 12; i++) {
        document.getElementById("level-2").querySelector("#" + toysIds[i]).style.display = "none";
        document.getElementById("level-2").querySelector("#" + libRectKeys[i]).addEventListener("click", function () {
            libraryClicked(this.id)
        });

        document.getElementById("level-2").querySelector("#" + libRectKeys[i]).addEventListener("mouseover", function () {
            libraryHovered(this.id)
        });

        document.getElementById("level-2").querySelector("#" + libRectKeys[i]).addEventListener("mouseout", function () {
            libraryHoverEnded(this.id)
        });
    }

    for (var i = 0; i < 12; i++) {
        var toy = document.getElementById("level-2").querySelector("#" + panelToysIds[i]);

        toy.addEventListener("click", function () {
            toySelected(this)
        });
        // svg.addEventListener('mousedown', startDrag);
        // svg.addEventListener('mousemove', drag);
        // svg.addEventListener('mouseup', endDrag);
        //svg.addEventListener('mouseleave', endDrag);
    }

    document.getElementById("level-1").querySelector("#search").addEventListener("click", onHelpClicked);
}

initiateEventListeners();

function initiateLevel(){

    document.getElementById("level-1").style.display = "none";
    document.getElementById("level-2").style.display = "none";
    document.getElementById("level-" + level).style.display = "block";

    toysFoundCount = 0;
    selectedToy = null;

    for (var i = 0; i < 12; i++){
        var panelToy = document.getElementById("level-" + level).querySelector("#" + panelToysIds[i])
        panelToy.classList.remove("selected-toy");
        panelToy.style.transform = "";
        panelToy.style.filter = '';
        
        var roomToy = document.getElementById("level-" + level).querySelector("#" + toysIds[i])
        if (level == 1){
            roomToy.style.transform = "";
            roomToy.style.opacity = 1;
            roomToy.style.display = "block";
        }
        else{
            roomToy.style.display = "none";
        }

    }

    lvlToysNumber = level * 6;

    randomToysIds = [];

    for (var i = 0; (i < 12) && (randomToysIds.length < lvlToysNumber); i++) {
        var rand = Math.floor(Math.random() * 12);
        while (randomToysIds.indexOf(panelToysIds[rand]) != -1) {
            rand = Math.floor(Math.random() * 12);
        }
        randomToysIds.push(panelToysIds[rand]);
        document.getElementById("level-" + level).querySelector("#"+panelToysIds[rand]).classList.add("selected-toy");
    }

    if (level == 1){
        for (var i = 0; i < randomToysIds.length; i++) {
            var toy = document.getElementById("level-1").querySelector("#" + getToyIDFromRandomToyIndex(i));
            
            toy.removeEventListener("click", function () {
                toyFound(this)
            });

            toy.addEventListener("click", function () {
                toyFound(this)
            }, { once: true });
        }
        document.getElementById("level-1").querySelector("#next_lvl").style.filter = 'brightness(0.75)';
        
    }

    initiateToysPanel();

}

function initiateToysPanel(){
    var menuPanel = document.getElementById("level-" + level).querySelector("#" + "menu-2");
    var panelPaddingLeft = document.getElementById("level-" + level).querySelector("#" +randomToysIds[0]).getBBox().x - menuPanel.getBBox().x;
    var panelToysFreeSpace = menuPanel.getBBox().width - 2 * panelPaddingLeft;
    for (var i = 0; i < lvlToysNumber; i++) {
        var toyWidth = document.getElementById("level-" + level).querySelector("#" +randomToysIds[i]).getBBox().width;
        panelToysFreeSpace -= toyWidth;
    }
    var panelToysDX = panelToysFreeSpace / (lvlToysNumber - 1);
    var prevToysWidths = 0;
    var prevTranslate = 0;
    for (var i = 1; i < lvlToysNumber; i++) {
        var prevToy = document.getElementById("level-" + level).querySelector("#" +randomToysIds[i - 1]);
        var prevToyPosition = prevTranslate + prevToy.getBBox().width;
        if ((randomToysIds[i] == "butterfly-2")&&(level == 2)){
            document.getElementById("level-" + level).querySelector("#" +randomToysIds[i]).style.transform = `translateX(${(panelToysDX - 75 + prevToyPosition)}px)`;
        }
        else{
            document.getElementById("level-" + level).querySelector("#" +randomToysIds[i]).style.transform = `translateX(${(panelToysDX + prevToyPosition)}px)`;
        }
        prevTranslate = panelToysDX + prevToyPosition;
    }
}


function getToyIDFromRandomToyIndex(i){
    return toysIds[panelToysIds.indexOf(randomToysIds[i])];
}

function checkWin(){
    if (toysFoundCount == lvlToysNumber){
        return true;
    }
    return false;
}

function showCup(){
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

function removeToyFromPanel(toy){
    toy.style.filter = 'brightness(0.25)';
}

function toyFound(toy) {
    playSound(right);
    
    toysFoundCount++;

    toy.style.transform = "scale(2)";
    setTimeout(
        function () {
            toy.style.opacity = 0;
        }, 500 
    );

    setTimeout(
        function () {
            toy.style.display = "none";
            var panelToy = document.getElementById("level-" + level).querySelector("#" +panelToysIds[toysIds.indexOf(toy.id)]);
            removeToyFromPanel(panelToy);

            if (checkWin()) {
                playSound(lvlWin);
                showCup();
                document.getElementById("level-1").querySelector("#next_lvl").style.filter = '';
                document.getElementById("level-1").querySelector("#next_lvl").addEventListener("click", function () {
                    increaseLevel();
                }, { once: true });
            }
        }, 1500
    );
}

function toySelected(toy){
    if (selectedToy != toy){
        unselectToy(selectedToy);
        selectedToy = toy;
        selectedToy.style.transform += " scale(1.5)";
        playSound(directions[toy.id]);
    }
    else{
        unselectToy(selectedToy);
    }
}

function unselectToy(toy){
    if (toy != null){
        var transform = toy.style.transform;
        toy.style.transform = transform.substring(0, transform.indexOf(" scale"));
        selectedToy = null;
    }
}

function onHelpClicked(){
    if (!checkWin()){
        var rand = Math.floor(Math.random() * lvlToysNumber);
        console.log(randomToysIds[rand]);
        while (document.getElementById("level-" + level).querySelector("#" + randomToysIds[rand]).style.filter == 'brightness(0.25)') {
            rand = Math.floor(Math.random() * lvlToysNumber);
            console.log(randomToysIds[rand]);
        }

        document.getElementById("level-" + level).querySelector("#" + getToyIDFromRandomToyIndex(rand) +"_-_white").style.opacity = 1;
        setTimeout(
            function () {
                document.getElementById("level-" + level).querySelector("#" + getToyIDFromRandomToyIndex(rand) + "_-_white").style.opacity = 0;
            }, 2000
        );
    }
}

function playSound(src){
    if (audioPlaysAlready){
        audio.pause();
    }
    audio = new Audio(src);
    audio.play();
    audioPlaysAlready = true;
}

function libraryHovered(positionId){
    document.getElementById("level-" + level).querySelector("#" +arrowsIds[positionId]).style.fill = "#e35751";
}

function libraryHoverEnded(positionId) {
    document.getElementById("level-" + level).querySelector("#" +arrowsIds[positionId]).style.fill = "#000";
}

function libraryClicked(positionId){
    if (selectedToy != null){
        if (lvl2LibArrangement[positionId] == selectedToy.id){
            playSound(right);
            removeToyFromPanel(selectedToy);
            unselectToy(selectedToy);
            document.getElementById("level-" + level).querySelector("#" +toysIds[Object.keys(lvl2LibArrangement).indexOf(positionId)]).style.display = "block";
            toysFoundCount++;
            
            if (checkWin()) {
                showCup();
                playSound(lvlWin);
            }
        }
        else{
            playSound(wrong);
            unselectToy(selectedToy);
        }
    }
}


// var selectedToyX = 0;
// var selectedToyY = 0;

// function startDrag(e){
//     selectedElement = document.getElementById("level-"+level).querySelector("#"+e.target.parentElement.id);
//     selectedToyX = e.clientX;
//     selectedToyY = e.clientY;
// }

// function drag(e){
//     if (selectedElement){
//         selectedElement.style.transform = `translate(${e.clientX - selectedToyX}px, ${e.clientY - selectedToyY}px)`;
//     }
// }

// function endDrag(){
//     selectedElement = null;
// }
