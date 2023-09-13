let selectedFrame = null;

const tableContainer = document.getElementById("table-container");
const frameContainer = document.getElementById("frame-container");
const frameContent = document.getElementById("frame-content");
const wrapper = document.getElementById("wrapper");
const pencilImg = document.getElementById("pencil");
const homeButton = document.getElementById("home");
const previousButton = document.getElementById("previous");
const iframe = document.createElement('iframe');
const tableItems = document.getElementsByClassName("list-item");
const emptyListText = document.getElementById("empty-list-text");
const notFoundImg = document.getElementById("not-found-img");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const audio = new Audio("assets/instructions.mp3");

const iFrameSources = {
    "1" : "https://app.Lumi.education/api/v1/run/2nTtWe/embed",
    "2" : "https://app.Lumi.education/api/v1/run/x64CkP/embed",
    "3" : "https://app.Lumi.education/api/v1/run/ClsCMn/embed",
    "4" : "https://app.Lumi.education/api/v1/run/Aucgiy/embed",
    "5" : "https://app.Lumi.education/api/v1/run/XKqv3U/embed"
}


function playAudioInstructions() {
    audio.play();
}


function stopAudioInstructions() {
    audio.pause();
    audio.currentTime = 0;
}


function loadFrame(frame) {
    stopAudioInstructions();
    selectedFrame = frame;
    
    setFrame();
    displayFrame();
    resetSearch();
}


function setFrame() {
    iframe.src = iFrameSources[selectedFrame];
    iframe.setAttribute("allowfullscreen", true);
    iframe.setAttribute("frameborder", "0");

    frameContainer.appendChild(iframe);
}


function displayFrame() {
    tableContainer.classList.add("hide");
    pencilImg.classList.add("hide");
    homeButton.classList.add("hide");
    frameContainer.classList.remove("hide");
    previousButton.classList.remove("hide");
    loader.classList.remove("hide");
}


function backToTable() {
    tableContainer.classList.remove("hide");
    pencilImg.classList.remove("hide");
    homeButton.classList.remove("hide");
    frameContainer.classList.add("hide");
    previousButton.classList.add("hide");
    loader.classList.add("hide");

    frameContainer.removeChild(iframe);
    selectedFrame = null;
}


function resetSearch() {
    searchInput.value = '';

    for (let i=0; i<tableItems.length; i++) {
          tableItems[i].classList.remove('hide'); 
    }
}


function searchTitles() {
    let filter;
    let itemTitle;
    let hiddenTableItems = 0;

    emptyListText.classList.add('hide');
    notFoundImg.classList.add('hide');

    filter = searchInput.value.toUpperCase();
    filter = normalizeGreek(filter.replace(/\s/g, ""));

    for (let i=0; i<tableItems.length; i++) {
        itemTitle = tableItems[i].textContent || tableItems[i].innerText;
        itemTitle = itemTitle.replace(/\s/g, "");
        itemTitle = normalizeGreek(itemTitle);
        if (itemTitle.toUpperCase().indexOf(filter) > -1) {
          tableItems[i].classList.remove('hide');
        } else {
          tableItems[i].classList.add('hide');
          hiddenTableItems = hiddenTableItems + 1;
        }       
    }

    if (hiddenTableItems == tableItems.length) {
        emptyListText.classList.remove('hide');
        notFoundImg.classList.remove('hide');
    }
}


function normalizeGreek(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


function goToHome() {
    stopAudioInstructions();
    window.history.back();
}