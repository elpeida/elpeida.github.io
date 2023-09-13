let selectedTab = null;
let selectedCategory = null;
let selectedDiagramLevel = 1;
let isMainContentDisplayed = false;

let canvas = document.getElementById("canvas");
const itemsContainer = document.getElementById("items-container");
const menuContent = document.getElementById("menu-content");
const mainContent = document.getElementById("main-content");
const level1 = document.getElementById("level1");
const level2 = document.getElementById("level2");
const level3 = document.getElementById("level3");
const level4 = document.getElementById("level4");
const colorsContainer = document.getElementById("colors-container");
const colorElements = document.getElementsByClassName("color");
const canvasButtons = document.getElementsByClassName("canvas-button");
const levelChangeAudio = new Audio("assets/levelchange.mp3");
const instructionsAudio = new Audio("assets/instructions.mp3");


const tabsInfo = {
    tab1: {
        total: 15
    },
    tab2: {
        total: 12
    },
    tab3: {
        total: 18
    },
    tab4: {
        total: 21
    },
    tab5: {
        total: 21
    },
    tab6: {
        total: 18
    },
    tab7: {
        total: 4
    }
};


const diagramsInfo = {
    omadopoiish: {
        total: 2
    },
    routinesskepsis: {
        total: 3
    },
    afigisi: {
        total: 3
    },
    diadoxigegonotwn: {
        total: 4
    },
    lipsiapofasis: {
        total: 1
    },
    aitiaapotelesma: {
        total: 3
    },
    diafora: {
        total: 3
    }
};


function showMainContent(category) {
    selectedCategory = category;
    menuContent.classList.add("hidden");
    mainContent.classList.remove("hidden");
    isMainContentDisplayed = true;

    loadDiagram(1);
}


function loadDiagram(number) {
    deleteAllItems();   
    selectedDiagramLevel = number;
    canvas.style.backgroundImage = "url('assets/diagrams/" + selectedCategory + "/" + number + ".png')";

    var printBgImgageSrc = 'assets/diagrams/' + selectedCategory + '/' + number + '.png';

    //console.log(printBgImgageSrc);
    //debugger;
    $("#printBgCavasHelper").val(printBgImgageSrc);
}


function loadTabItems(tabNumber) {
    if (tabNumber == selectedTab) {
        return;
    }

    clearTabItems();
    
    selectedTab = tabNumber;
    let selectedTabKey = "tab" + tabNumber;
    let tabElement = document.getElementById(selectedTabKey);
    tabElement.classList.add("selectedtab");

    for (let i=0; i<tabsInfo[selectedTabKey].total; i++) {
        let num = i + 1;
        let divElement = document.createElement("div");
        divElement.className = "items";

        let img = document.createElement("img");
        img.src = "assets/" + selectedTabKey + "/" + num + ".png";

        divElement.appendChild(img);

        itemsContainer.appendChild(divElement);
    }   

    InitDragableItems();
}


function clearTabItems() {
    if (selectedTab != null) {
        let tabElement = document.getElementById("tab" + selectedTab);
        tabElement.classList.remove("selectedtab");
    }
    
    let child = itemsContainer.firstElementChild ; 
    while (child) {
        itemsContainer.removeChild(child);
        child = itemsContainer.firstElementChild ;
    }
}


function goToMenu() {
    if (selectedButton != null) {
        clearSelectedButton();
    } 

    menuContent.classList.remove("hidden");
    mainContent.classList.add("hidden");
    isMainContentDisplayed = false;

    selectedCategory = null;
    selectedDiagramLevel = 1;
    resetLevels();
    stopAudioInstructions();
    loadTabItems(1);
}


function resetLevels() {
    level1.classList.remove("removed");
    level2.classList.add("removed");
    level3.classList.add("removed");
    level4.classList.add("removed");
}


function playAudioInstructions() {
    instructionsAudio.play();
}


function stopAudioInstructions() {
    instructionsAudio.pause();
    instructionsAudio.currentTime = 0;
}


function goToHome() {
    stopAudioInstructions();
    window.history.back();
}


function changeDiagram(arg) {
    if (arg == "prev") {
        if (selectedDiagramLevel == 1) {
            return;
        } else {
            setNextDiagram(selectedDiagramLevel, selectedDiagramLevel-1);
        }
    } else {
        if (selectedDiagramLevel == diagramsInfo[selectedCategory].total) {
            return;
        } else {
            setNextDiagram(selectedDiagramLevel, selectedDiagramLevel+1);
        }
    }
}


function setNextDiagram(previous, current) {
    levelChangeAudio.pause();
    levelChangeAudio.currentTime = 0;
    
    let previousLevel = document.getElementById("level" + previous);
    let currentLevel = document.getElementById("level" + current);
    previousLevel.classList.add("removed");
    currentLevel.classList.remove("removed");

    levelChangeAudio.play();

    loadTabItems(1);
    clearSelectedButton();
    loadDiagram(current);
}


function uploadImage() {
    if (selectedButton != null) {
        clearSelectedButton();
    } 

    UploadImageByUser();

    canvasmode="";
}


function draw() {
    if (selectedButton == "draw") {
        clearSelectedButton();
        return;
    } 
    
    clearSelectedButton();
    selectedButton = "draw";
    setSelectedButton();

    colorsContainer.classList.remove("removed");
    
    for (let i=0; i<canvasButtons.length; i++) {
        canvasButtons[i].style.width = "9%";
    }

        
    canvasmode = "draw";
}


function erase() {
    if (selectedButton == "erase") {
        clearSelectedButton();
        return;
    } 
    
    clearSelectedButton();
    selectedButton = "erase";
    setSelectedButton();
        
    canvasmode = "erase";
}


function deleteItem() {
    if (selectedButton == "delete") {
        clearSelectedButton();
        return;
    } 
   
    clearSelectedButton();
    selectedButton = "delete";
    setSelectedButton();

    canvasmode = "eraseItem";
}


function download() {
    if (selectedButton != null) {
        clearSelectedButton();
    } 

    // note: add functionality
    // $("#PrintArea").printThis();
    PrintCanvas();
}


function addText() {
    if (selectedButton != null) {
        clearSelectedButton();
    } 

    canvasmode = "text";
    ShowTextInput();
}


function resizeBigger() {
    if (selectedButton == "resize-bigger") {
        clearSelectedButton();
        return;
    } 
   
    clearSelectedButton();
    selectedButton = "resize-bigger";
    setSelectedButton();

    // note: add functionality
    canvasmode = "resizeBigger";
}

function resizeSmaller() {
    if (selectedButton == "resize-smaller") {
        clearSelectedButton();
        return;
    } 
   
    clearSelectedButton();
    selectedButton = "resize-smaller";
    setSelectedButton();

    canvasmode = "resizeSmaller";
}


function deleteAllItems() {
    if (selectedButton != null) {
        clearSelectedButton();
    } 
   
    deleteAllItemsCanvas();

    canvasmode = "eraseAll";
}


function setDrawColor(color, hexValue) {
    if (selectedColor == color) {
        return;
    }

    for (let i=0; i<colorElements.length; i++){
        colorElements[i].style.transform = "scale(1)";
        colorElements[i].style.border = "1px solid #000000";
    }

    let colorElement = document.getElementById(color + "-color");
    colorElement.style.border = "1px solid #80C41C";
    colorElement.style.transform = "scale(0.8)";
    selectedColor = color;
    selectedHexColor = hexValue;
}


function setSelectedButton() {
    let selectedButtonElement = document.getElementById(selectedButton + "-btn");
    selectedButtonElement.classList.add("selectedBtn");
}


function canvasResize() {
    if (!isMainContentDisplayed) { 
        return;
    }

    const canvasContainer = document.getElementsByClassName("canvas-container");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvasContainer[0].clientWidth;
    tempCanvas.height = canvasContainer[0].clientHeight;

    const widthRatio = canvasContainer[0].clientWidth / canvas.width;
    const heightRatio = canvasContainer[0].clientHeight / canvas.height;

    tempCtx.drawImage(canvas, 0, 0,  tempCanvas.width , tempCanvas.height);

    canvas.width = canvasContainer[0].clientWidth;
    canvas.height = canvasContainer[0].clientHeight;
    canvas.lineThickness = 1;

    canvas.getContext("2d").drawImage(tempCanvas, 0, 0);

    const elements = document.getElementsByClassName("draggableItem");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const oldLeft = parseFloat(element.style.left);
        const oldTop = parseFloat(element.style.top);

        const newLeft = oldLeft * widthRatio;
        const newTop = oldTop * heightRatio;

        element.style.left = newLeft + "px";
        element.style.top = newTop + "px";
    }

    tempCanvas.remove();
}




window.onresize = canvasResize;

loadTabItems(1);