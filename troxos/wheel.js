const nodesHeight = 26;

var wheelsColorsNumber = 2;
var colorsNumberElement = document.getElementById("colorsNumber");

const originalColors = {
    2: ["url(#troxos-2-kitrino_2_)", "url(#troxos-2-kokkino_2_)"],
    4: ["url(#troxos-4-mple_2_)", "url(#troxos-4-kitrino_2_)", "url(#troxos-4-kokkino_2_)", "url(#troxos-4-mov_2_)"],
    6: ["url(#troxos-6-kitrino_2_)", "url(#troxos-6-portokali_2_)", "url(#troxos-6-kokkino_2_)", "url(#troxos-6-mov_2_)", "url(#troxos-6-mple_2_)", "url(#troxos-6-prasino_2_)"],
    8: ["url(#troxos-8-kitrino_2_)", "url(#troxos-8-portokali_2_)", "url(#troxos-8-kokkino_2_)", "url(#troxos-8-mov_2_)", "url(#troxos-8-mple_2_)", "url(#troxos-8-prasino_2_)", "url(#troxos-8-kokkino-2_1_)", "url(#troxos-8-prasino-2_2_)"]
}; 


var wheelColors = {
    2: ["url(#troxos-2-kitrino_2_)", "url(#troxos-2-kokkino_2_)"],
    4: ["url(#troxos-4-mple_2_)", "url(#troxos-4-kitrino_2_)", "url(#troxos-4-kokkino_2_)", "url(#troxos-4-mov_2_)"],
    6: ["url(#troxos-6-kitrino_2_)", "url(#troxos-6-portokali_2_)", "url(#troxos-6-kokkino_2_)", "url(#troxos-6-mov_2_)", "url(#troxos-6-mple_2_)", "url(#troxos-6-prasino_2_)"],
    8: ["url(#troxos-8-kitrino_2_)", "url(#troxos-8-portokali_2_)", "url(#troxos-8-kokkino_2_)", "url(#troxos-8-mov_2_)", "url(#troxos-8-mple_2_)", "url(#troxos-8-prasino_2_)", "url(#troxos-8-kokkino-2_1_)", "url(#troxos-8-prasino-2_2_)"]
};

const wheelSectionIds = {
    2: ["troxos-2-kitrino", "troxos-2-kokkino"],
    4: ["troxos-4-mple", "troxos-4-kitrino", "troxos-4-kokkino", "troxos-4-mov"],
    6: ["troxos-6-kitrino", "troxos-6-portokali", "troxos-6-kokkino", "troxos-6-mov", "troxos-6-mple", "troxos-6-prasino"],
    8: ["troxos-8-kitrino", "troxos-8-portokali", "troxos-8-kokkino", "troxos-8-mov", "troxos-8-mple", "troxos-8-kokkino-2", "troxos-8-prasino", "troxos-8-prasino-2"]
};
const pinelaIds = {
    2: ["troxos-2-kitrino", "troxos-2-kokkino"],
    4: ["troxos-4-mple", "troxos-4-kitrino", "troxos-4-kokkino", "troxos-4-mov"],
    6: ["troxos-6-kitrino", "troxos-6-portokali", "troxos-6-kokkino", "troxos-6-mov", "troxos-6-mple", "troxos-6-prasino"],
    8: ["troxos-8-kitrino", "troxos-8-portokali", "troxos-8-kokkino", "troxos-8-mov", "troxos-8-mple", "troxos-8-mple-2", "troxos-8-prasino-2", "troxos-8-prasino"]
};

var wheelIndexes = [0, 1, 2, 3, 4, 5, 6, 7];

const wheelRotationDegrees = [ 90, 180, 30, 45];

const maxGraphCount = 20;

var historyArray = document.getElementsByClassName("history");
var historyNumbers = document.getElementById("pinakaki").getElementsByTagName("text");

//var pencil = document.getElementById("molivi");

var spinSpeed;
var maxSpeed = 7199;

var spins = 0;

var selectedBrushIndex = -1;

var wheel;
var graph;
var graphs;
var graphsReverse;
var graphTable; 


var spin = false;
var infiniteSpinInterval;
var wheelSpiningTimeout;
var gameOver = false;

var currentBrush;
var instructions = "instructions.mp3";

//var wheel = document.getElementById("wheel");
// wheelParts = document.getElementsByTagName("li");
// for (var i=0; i<wheelsColorsNumber; i++){
//     wheelParts[i].style.transform = `rotate(${i*360/wheelsColorsNumber}deg) skewY(-${90 - 360/wheelsColorsNumber}deg)`;
//     wheelParts[i].style.backgroundColor = colors[i];
// }

var audio;
audioToggle = false;

function playInstructions() {
    if (audio) {
        audio.pause();
    }
    if (audioToggle == false){
        audio = new Audio(instructions);
        audio.play();
        audioToggle = true;
    }
    else{
        audio.pause();
        audioToggle = false;
    }
}

initializeData();

function initializeData(increased){
    spins = 0;

    wheelIndexes = [0, 1, 2, 3, 4, 5, 6, 7];

    wheelColors = {
        2: ["url(#troxos-2-kitrino_2_)", "url(#troxos-2-kokkino_2_)"],
        4: ["url(#troxos-4-mple_2_)", "url(#troxos-4-kitrino_2_)", "url(#troxos-4-kokkino_2_)", "url(#troxos-4-mov_2_)"],
        6: ["url(#troxos-6-kitrino_2_)", "url(#troxos-6-portokali_2_)", "url(#troxos-6-kokkino_2_)", "url(#troxos-6-mov_2_)", "url(#troxos-6-mple_2_)", "url(#troxos-6-prasino_2_)"],
        8: ["url(#troxos-8-kitrino_2_)", "url(#troxos-8-portokali_2_)", "url(#troxos-8-kokkino_2_)", "url(#troxos-8-mov_2_)", "url(#troxos-8-mple_2_)", "url(#troxos-8-prasino_2_)", "url(#troxos-8-kokkino-2_1_)", "url(#troxos-8-prasino-2_2_)"]
    };

    /*stop the wheel if it's spinning*/
    if (wheelSpiningTimeout){
        clearTimeout(wheelSpiningTimeout);
    }

    spin = false;
    /*stop the infinite spinning*/
    if (infiniteSpinInterval) {
        clearInterval(infiniteSpinInterval);
    }

    /*clear the graphTablr*/
    graphTable = [];
    
    /*show the right graphs table*/
    if (graph != null) {
        graph.style.display = "none";
    }
    graph = document.getElementById(`troxos-${wheelsColorsNumber}-pithanotites`);

    /*remove the graphs blocks*/
    var graphElements = graph.getElementsByClassName("graphs");
    while (graphElements.length > wheelsColorsNumber) {
        graphElements[graphElements.length-1].remove();
    }
    
    graph.style.display = "block";
    
    /*remove the 20-graph-blocks line above the graphs*/
    var graph20Lines = document.getElementById(`_x35_ades_gia_${increased ? wheelsColorsNumber - 2 : wheelsColorsNumber + 2}troxo`).getElementsByTagName("path");
    for (var i = 0; i < graph20Lines.length; i++){
        graph20Lines[i].style.display = "none";
    }

    /*initialize the graphs array with the elements*/
    graphs = [];
    graphsReverse = graph.getElementsByClassName("graphs");
    for (var i = graphsReverse.length - 1; i >= 0; i--){
        graphs.push(graphsReverse[i]);
    }

    /*initialize the graphs counts*/
    for (var i = 0; i < wheelsColorsNumber; i++) {
        graphTable[i] = 0;
    }

    /*show the right wheel*/
    if (wheel != null){
        wheel.style.display = "none";
        wheel.style.transform = "";
    }
    wheel = document.getElementById("troxos-" + wheelsColorsNumber);
    if (wheel.getAttribute("transform") == null) {
        wheel.setAttribute("transform", `rotate(${wheelRotationDegrees[wheelsColorsNumber / 2 - 1]})`);
    }
    wheel.style.display = "block";

    /*initialize the wheel colors*/
    for (var i = 0; i < wheelSectionIds[wheelsColorsNumber].length; i++){
        document.getElementById(`troxos-${wheelsColorsNumber}`).querySelector("#" + wheelSectionIds[wheelsColorsNumber][i]).style.fill = originalColors[wheelsColorsNumber][i];
    } 
    
    /*show the right brushes*/
    if (currentBrush != null) {
        currentBrush.style.display = "none";
    }
    currentBrush = document.getElementById(`troxos-${wheelsColorsNumber}-pinela`);
    currentBrush.style.display = "block";

    //pencil.setAttribute("transform","");

    /*initialize the history colors*/
    for (var i = 0; i<historyArray.length; i++){
        historyArray[i].style.fill = "";
    }

    /*initialize history numbers*/
    for (var i = 0; i < historyNumbers.length; i++) {
        historyNumbers[i].innerHTML = i + 1;

        var transformStr = historyNumbers[i].getAttribute("transform");
        var translateIndex = transformStr.indexOf(" translate");
        if (translateIndex != -1){
            historyNumbers[i].setAttribute("transform", transformStr.substring(0, translateIndex));
        }
    }

    /*if the previous game has ended, initialize game over var*/
    gameOver = false;

    /*initialize play and replay buttons colors*/
    document.getElementById("Play").getElementsByTagName("path")[0].style.fill = "#00A4E9";
    document.getElementById("Replay").getElementsByTagName("path")[0].style.fill = "#00A4E9";
    document.getElementById("Replay").getElementsByTagName("path")[1].style.fill = "#FFFFFF";
}

function increaseCircleColorsNumber(){
    if (wheelsColorsNumber + 2 <= 8) {
        wheelsColorsNumber += 2;
        colorsNumberElement.innerHTML = wheelsColorsNumber;
        initializeData(true);
        if (audio) {
            audio.pause();
            audioToggle = false;
        }
    }
}


function decreaseCircleColorsNumber() {
    if (wheelsColorsNumber - 2 >= 2) {
        wheelsColorsNumber -= 2;
        colorsNumberElement.innerHTML = wheelsColorsNumber;
        initializeData(false);
        if (audio) {
            audio.pause();
            audioToggle = false;
        }
    }
}

function brushClicked(brushIndex) {
    document.getElementById(`troxos-${wheelsColorsNumber}-pinela`).querySelector("#"+pinelaIds[wheelsColorsNumber][brushIndex]).style.transform = "scale(1.5)";
    
    if (selectedBrushIndex != -1) {
        document.getElementById(`troxos-${wheelsColorsNumber}-pinela`).querySelector("#"+pinelaIds[wheelsColorsNumber][selectedBrushIndex]).style.transform = "";
    }
    
    if (brushIndex == selectedBrushIndex){
        selectedBrushIndex = -1;
    }
    else{
        selectedBrushIndex = brushIndex;
    }
}

function wheelSectionClicked(wheelSectionIndex){
    if (selectedBrushIndex != -1){
        document.getElementById(`troxos-${wheelsColorsNumber}`).querySelector("#" + wheelSectionIds[wheelsColorsNumber][wheelSectionIndex]).style.fill = originalColors[wheelsColorsNumber][selectedBrushIndex];
        wheelColors[wheelsColorsNumber][wheelSectionIndex] = originalColors[wheelsColorsNumber][selectedBrushIndex];
        wheelIndexes[wheelSectionIndex] = selectedBrushIndex; 
        
        document.getElementById(`troxos-${wheelsColorsNumber}-pinela`).querySelector("#"+pinelaIds[wheelsColorsNumber][selectedBrushIndex]).style.transform = "";
        selectedBrushIndex = -1;
    }
}

function checkGameOver(){
    graphTable.forEach(g => {
        if (g >= 100) {
            clearInterval(infiniteSpinInterval);
            gameOver = true;


            document.getElementById("Play").getElementsByTagName("path")[0].style.fill = "#81BBD2";
            document.getElementById("Replay").getElementsByTagName("path")[0].style.fill = "#81BBD2";
        }
    });
}

function checkGraphMoreThan20(index){
    moreFound = 0;

    if ((graphTable[index] % maxGraphCount == 1) && (graphTable[index] >= 20)) {
        var graph20 = document.getElementsByClassName("graphs");
        for (var j = 0; j < graph20.length; j++) {
            if (graph20[j].classList[1] == graphs[index].classList[1]){
                if (moreFound > 1){
                    graph20[j].style.display = "none";    
                }
                moreFound++;
            }
        }
    }

    if (moreFound > 0){
        document.getElementById(`_x35_ades_gia_${wheelsColorsNumber}troxo`).getElementsByTagName("g")[index].getElementsByTagName("path")[((graphTable[index] -1) / 20) -1].style.display = "block";
        checkGameOver();
        return true;
    }
    else{
        return false;
    }
}

function toggleSpin(){
    spin = spin ? false : true;
}

function infiniteSpin(){
    toggleSpin();
    if (spin){
        if (!gameOver){
            document.getElementById("Replay").getElementsByTagName("path")[0].style.fill = "#0085BD";
            document.getElementById("Replay").getElementsByTagName("path")[1].style.fill = "#E1E1E1";
        }
        spinTheWheel();
        infiniteSpinInterval = setInterval(spinTheWheel, 3500);
    }
    else{
        document.getElementById("Replay").getElementsByTagName("path")[0].style.fill = "#00A4E9";
        document.getElementById("Replay").getElementsByTagName("path")[1].style.fill = "#FFFFFF";

        clearInterval(infiniteSpinInterval);
    }
}

function historyNumberTranslate(index){
    var strTransform = historyNumbers[index].getAttribute("transform");
    historyNumbers[index].setAttribute("transform", `${strTransform} translate(-8.33)`);
}

function spinTheWheel(){
    if (!gameOver){
        spinSpeed = Math.floor(Math.random() * maxSpeed) + 1;
        wheel.style.transform = `rotate(${spinSpeed + wheelRotationDegrees[wheelsColorsNumber/2 - 1]}deg)`;

        oneSpinConversion = 360 - spinSpeed % 360;

        for (var i=1; i<=wheelsColorsNumber; i++){
            if ((oneSpinConversion >= (i - 1) * 360 / wheelsColorsNumber) && (oneSpinConversion <= i*360/wheelsColorsNumber)){
                wheelSpiningTimeout = setTimeout(
                    function () {

                        console.log("We got "+i);
                        graphTable[wheelIndexes[i-1]]++;
                        

                        if (checkGraphMoreThan20(wheelIndexes[i - 1]) == false){
                            var newNode = graphs[wheelIndexes[i - 1]].cloneNode(true);
                            newNode.setAttribute("transform", `translate(0 -${((graphTable[wheelIndexes[i - 1]] - 1) % maxGraphCount) * (nodesHeight + 6)})`);
                            graph.appendChild(newNode);
                        }

                        if (spins < 19){
                            historyArray[spins].style.fill = wheelColors[wheelsColorsNumber][i - 1];
                            //pencil.setAttribute("transform", `translate(${(spins * 90.31)} 0)`);
                        }
                        else{
                            for (var j=0; j < 18; j++){
                                var newBoxCounter = parseInt(historyNumbers[j].innerHTML) + 1; 
                                historyArray[j].style.fill = historyArray[j+1].style.fill;
                                historyNumbers[j].innerHTML = newBoxCounter;
                                if (newBoxCounter == 10){
                                    historyNumberTranslate(j);
                                }
                                else if (newBoxCounter == 100) {
                                    historyNumberTranslate(j);
                                }
                            }
                            historyArray[18].style.fill = wheelColors[wheelsColorsNumber][i - 1];
                            historyNumbers[18].innerHTML = spins+1;
                            if (spins + 1 == 10) {
                                historyNumberTranslate(18);
                            }
                            else if (spins + 1 == 100) {
                                historyNumberTranslate(18);
                            }
                        }
                        spins++;
                        // var newRow = graphs.children[i-1].insertRow(0);
                        // var newCell = newRow.insertCell(0);
                        // newCell.style.backgroundColor = colors[i-1];
                    }, 3000);
                break;
            }
        }
    }
}