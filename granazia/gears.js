var level = 0;

var wrong = "sounds/fail game lose level 20.wav";
var lvlWin = "sounds/win game level 282.wav";

var lvl1_info = "sounds/instructions/lvl1.mp3"; //to be changed
var lvl2_info = "sounds/instructions/lvl2.mp3"; //to be changed
var lvl3_info = "sounds/instructions/lvl3.mp3"; //to be changed

var winContainer = document.getElementById("win-container");
var win = document.getElementById("win");

var loseContainer = document.getElementById("lose-container");
var lose = document.getElementById("lose");

const gearsIds = ["granazi_1", "granazi_1-2"];
const gridHolesIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

var selectedPositions = [];

var gearsAreSpinning = false;

var selectedGear;

var switch1 = false;
var switch2 = false;

var fan;


$('#next_lvl').click(
    function () {
        if (level < 2){
            document.getElementById(`lvl${level + 1}`).style.display = "none";

            level++;

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
            document.getElementById(`lvl${level + 1}`).style.display = "none";

            level--;

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

initiateEventListeners();
initiateLevel();

var audio;

function playSound(src) {
    if (audio) {
        audio.pause();
    }
    audio = new Audio(src);
    audio.play();
}

function initiateLevel(){
    
    var windmillCenter = document.getElementById("windmill-center");
    var halfWindmillCenterWidth = windmillCenter.getBoundingClientRect().width / 2;

    document.getElementById("windmill-1").style.transformOrigin = `${halfWindmillCenterWidth}px calc(100% + ${halfWindmillCenterWidth}px)`;
    document.getElementById("windmill-2").style.transformOrigin = `calc(100% + ${halfWindmillCenterWidth}px) calc(0% + ${halfWindmillCenterWidth}px)`;
    document.getElementById("windmill-3").style.transform = `translateX(-${document.getElementById("windmill-3").getBoundingClientRect().x - (windmillCenter.getBoundingClientRect().x + windmillCenter.getBoundingClientRect().width)}px)`;
    document.getElementById("windmill-3").style.transformOrigin = `calc(100% + ${halfWindmillCenterWidth})px calc(0% + ${halfWindmillCenterWidth}px)`;


    document.getElementById("_1").style.display = "none";
    document.getElementById("_2").style.display = "none";
    document.getElementById("_3").style.display = "none";
    document.getElementById("_"+(level+1)).style.display = "block";

    if (audio) {
        audio.pause();
    }
    if (selectedGear){
        selectedGear.style.transform = "";
        selectedGear = null;
    }
    if (level == 0){
        document.getElementById("previous_lvl").style.filter = 'brightness(0.75)';

        document.getElementById(`lvl${level + 1}`).querySelector("#switch1_ON").style.display = "block";
        document.getElementById(`lvl${level + 1}`).querySelector("#switch1_OFF").style.display = "none";
        switch1 = true;
    }
    else{
        document.getElementById(`lvl${level + 1}`).querySelector("#switch1_ON").style.display = "none";
        document.getElementById(`lvl${level + 1}`).querySelector("#switch1_OFF").style.display = "block";
        switch1 = false;
    }
    
    document.getElementById(`lvl${level + 1}`).style.display = "block";

    document.getElementById(`lvl${level + 1}`).querySelector("#lamp_on").style.display = "none";

    if (level != 0) {
        document.getElementById(`lvl${level + 1}`).querySelector("#switch2_ON").style.display = "none";
        document.getElementById(`lvl${level + 1}`).querySelector("#switch2_OFF").style.display = "block";
        switch2 = false;
        fan = document.getElementById("fan-" + level);

        turnFanOff();
    }

    turnLampOff();
    //removePositionedGears();

}

function initiateEventListeners() {
    document.getElementById("done").addEventListener("click", function () { showWinOrLose() });

    document.getElementById("instructions").addEventListener("click", function () { instructionsClicked() });

    for (var i = 0; i < gearsIds.length; i++) {
        document.getElementById(gearsIds[i]).addEventListener("click", function () { gearClicked(this) });
    }

    for (var i = 0; i < gridHolesIds.length; i++) {
        document.getElementById(gridHolesIds[i]).addEventListener("click", function () { gridHoleClicked(this) });
    }

    document.getElementById("lvl1").querySelector("#switch1_ON").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl1").querySelector("#switch1_OFF").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl1").querySelector("#switch1_inner_top").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl1").querySelector("#switch1_inner_bottom").addEventListener("click", function () { toggleSwitch(1) });

    document.getElementById("lvl2").querySelector("#switch1_ON").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl2").querySelector("#switch1_OFF").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl2").querySelector("#switch1_inner_top").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl2").querySelector("#switch1_inner_bottom").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl2").querySelector("#switch2_ON").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl2").querySelector("#switch2_OFF").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl2").querySelector("#switch2_inner_top").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl2").querySelector("#switch2_inner_bottom").addEventListener("click", function () { toggleSwitch(2) });

    document.getElementById("lvl3").querySelector("#switch1_ON").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl3").querySelector("#switch1_OFF").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl3").querySelector("#switch1_inner_top").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl3").querySelector("#switch1_inner_bottom").addEventListener("click", function () { toggleSwitch(1) });
    document.getElementById("lvl3").querySelector("#switch2_ON").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl3").querySelector("#switch2_OFF").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl3").querySelector("#switch2_inner_top").addEventListener("click", function () { toggleSwitch(2) });
    document.getElementById("lvl3").querySelector("#switch2_inner_bottom").addEventListener("click", function () { toggleSwitch(2) });
}

//to remove if not needed later
function removePositionedGears(){
    var gearCopys = document.querySelector("[gridHole]");
    if (gearCopys != null){
        for (var i = 0; i < gearCopys.length; i++){
            gearCopys[i].remove();
        }
        selectedPositions = [];
    }
}

function gearClicked(gear) {

    gear.style.transform = "scale(1.3)";

    if (selectedGear) {
        selectedGear.style.transform = "";
    }
    if (selectedGear == gear){
        selectedGear = null;
    }
    else{
        selectedGear = gear;
    }
    
}

// $(document).on("mousemove", function (event) {
//     $("#doc").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
// });

function showCupOrLose(isWin) {
    var container;
    var result;

    if (isWin){
        container = winContainer;
        result = win;
    }
    else{
        container = loseContainer;
        result = lose;
    }
    container.style.display = "block";
    setTimeout(
        function () {
            result.style.height = "75vh";
        }, 50
    );
    setTimeout(
        function () {
            result.style.opacity = "0";
        }, 1000
    );

    setTimeout(
        function () {
            container.style.display = "none";
            result.style.height = "50vh";
            result.style.opacity = "1";

        }, 1500
    );
}

function stopWinAnimations() {
    gearsAreSpinning = false;
    
    var gearCopys = document.querySelectorAll(`[gridHole]`);
    for (var i = 0; i < gearCopys.length; i++){
        gearCopys[i].style.animation = "";
        document.getElementById("Layer_10").style.animation = "";
    }

    if (switch1){
        turnLampOff();
    }
    if (switch2){
        turnFanOff();
    }
}

function showWinOrLose(){
    var isWin = false;
    if (gearsAreSpinning && checkSwitches()) {
        playSound(lvlWin);
        showCupOrLose(true);
    }
    else{
        playSound(wrong);
        showCupOrLose(false);
    }
}

function checkWin(){
    if (checkGearsSpin()) {
        spinGearsIfNotAlready();
        gearsAreSpinning = true;
        switch (level){
            case 0:
                if (switch1){
                    turnLightOn();
                }
                break;
            case 1:
                if (switch1) {
                    turnLightOn();
                    if (switch2) {
                        turnFanOn();
                    }
                }
                break;
            case 2:
                if (switch1) {
                    turnLightOn();
                }
                if (switch2) {
                    turnFanOn();
                }
                break;
        }
    }
    
}

function turnLightOn() {
    document.getElementById(`lvl${level + 1}`).querySelector("#lamp_on").style.display = "block";
}

function turnLampOff() {
    document.getElementById(`lvl${level + 1}`).querySelector("#lamp_on").style.display = "none";
}

function turnFanOn() {
    fan.style.animation = "1s rotate360 infinite linear";
}

function turnFanOff(){
    fan.style.animation = "";
}

function gridHoleClicked(hole){

    var svgWidth = document.getElementsByTagName('svg')[0].getBoundingClientRect().width;
    var svgHeight = document.getElementsByTagName('svg')[0].getBoundingClientRect().height;

    if (selectedGear != null){
        selectedGear.style.transform = "";

        var gearCopy = selectedGear.cloneNode(true);

        gearCopy.addEventListener("click", function () { gearCopyClicked(this) });

        hole.parentElement.appendChild(gearCopy);
        var translateLeft = (hole.getBoundingClientRect().left + hole.getBoundingClientRect().width / 2) - (gearCopy.getBoundingClientRect().left + gearCopy.getBoundingClientRect().width / 2);
        var translateTop = (hole.getBoundingClientRect().top + hole.getBoundingClientRect().height / 2) - (gearCopy.getBoundingClientRect().top + gearCopy.getBoundingClientRect().height / 2);
        gearCopy.style.transform = `translate(${translateLeft * 1920 / svgWidth}px, ${translateTop * 1080 / svgHeight}px)`;
        gearCopy.style.transformOrigin = `calc(50% + ${translateLeft * 1920 / svgWidth}px) calc(50% + ${translateTop * 1080 / svgHeight}px)`;

        if ((selectedGear.id == "granazi_1-2")){
            switch (hole.id) {
                case "0":
                case "1":
                case "2":
                case "12":
                case "13":
                case "14":
                    break;
                default:
                    gearCopy.querySelector("path").style.fill = "#be7272";
                    setTimeout(function () {
                        gearCopy.style.transform = "";
                    }, 1000);
                    setTimeout(function () {
                        gearCopy.remove();
                    },1500);
                    return false;
            }
        }
        else{
            switch (hole.id) {
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":
                case "11":
                    break;
                default:
                    gearCopy.querySelector("path").style.fill = "#be7272";
                    setTimeout(function () {
                        gearCopy.style.transform = "";
                    }, 1000);
                    setTimeout(function () {
                        gearCopy.remove();
                    }, 1500);
                    return false;
            }
        }

        selectedPositions.push(parseInt(hole.id));
        gearCopy.setAttribute("gridHole", hole.id);
        selectedGear = null;
        checkWin();
        // if (checkGearsSpin()) {
        //     spinGearsIfNotAlready();
        //     gearsAreSpinning = true;
        //     if (checkSwitches()) {
        //         switchesAreDone = true;
        //     }
        //     else {
        //         switchesAreDone = false;
        //     }
        // }
        // else {
        //     gearsAreSpinning = false;
        // }
    }
}

function toggleSwitch(switchNumber){
    var switchElement;
    if (switchNumber == 1){
        switch1 = !switch1;
        switchElement = switch1;
    }
    else {
        switch2 = !switch2;
        switchElement = switch2;
    }

    if (switchElement == true){
        document.getElementById(`lvl${level + 1}`).querySelector(`#switch${switchNumber}_OFF`).style.display = "none";
        document.getElementById(`lvl${level + 1}`).querySelector(`#switch${switchNumber}_ON`).style.display = "block";
        checkWin();
        // if (checkSwitches()) {
        //     switchesAreDone = true;
        //     if (checkGearsSpin()){
        //         spinGearsIfNotAlready();
        //         gearsAreSpinning = true;
        //     }
        //     else{
        //         gearsAreSpinning = false;
        //     }
        // }
        // else{
        //     switchesAreDone = false;
        // }
    }
    else {
        if (switchNumber == 1) {
            turnLampOff();
            if (level == 1){
                turnFanOff();
            }
        }
        else{
            turnFanOff();
        }
        
        document.getElementById(`lvl${level + 1}`).querySelector(`#switch${switchNumber}_OFF`).style.display = "block";
        document.getElementById(`lvl${level + 1}`).querySelector(`#switch${switchNumber}_ON`).style.display = "none";
        //stop light or fan
    }
}

function checkSwitches(){
    switch (level){
        case 0:
            if (switch1){
                return true;
            }
        default:
            return switch1 && switch2;
    }
    return false;
}

function checkGearsSpin(){
    if (selectedPositions.length == 5){
        selectedPositions.sort(function (a, b) {
            return a - b;
        });

        if ((selectedPositions[0] % 3) - (selectedPositions[1] % 3) != 0) {
            return false;
        }
        for (var i = 1; i < selectedPositions.length - 2; i++){
            if (Math.abs((selectedPositions[i] % 3) - (selectedPositions[i + 1] % 3)) != 1){
                return false;
            }
        }
        if ((selectedPositions[3] % 3) - (selectedPositions[4] % 3) != 0) {
            return false;
        }
    }
    else{
        return false;
    }
    return true;
}

function spinGearsIfNotAlready(){
    if(gearsAreSpinning == false){
        selectedPositions.sort(function (a, b) {
            return a - b;
        });
        var i = 0;
        selectedPositions.forEach(p => {
            var gear = document.querySelector(`[gridHole='${p}']`);

            if (i % 2 == 0) {
                gear.style.animation = "4s rotate360 infinite linear";
            }
            else {
                gear.style.animation = "4s rotateminus360 infinite linear";
            }
            i++;
            gearsAreSpinning = true;
        });
        document.getElementById("Layer_10").style.animation = "4s rotate360 infinite linear";
    }
}

function gearCopyClicked(gearCopy){
    if (gearsAreSpinning) {
        stopWinAnimations();
    }
    selectedPositions.splice(selectedPositions.indexOf(parseInt(gearCopy.getAttribute("gridHole"))), 1);
    gearCopy.style.transformOrigin = "50% 50%";
    gearCopy.style.transform = "";
    setTimeout(function(){
        gearCopy.remove();
    }, 500);
    //stop gear spinning
}