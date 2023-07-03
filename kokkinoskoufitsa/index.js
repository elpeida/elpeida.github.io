let selectedLevel = 0;
let clickableBoxIndexes = [];
let eventListeners = [];
let selectListenersLevel4 = [];
let destinationListenersLevel4 = [];
let selectedMoveableIndex = null;
let editMode = false;
let randomdWolfPath = 0;
let boxes = document.getElementsByClassName('box-background');
const body = document.getElementsByTagName('body');
const edit = document.getElementById('edit');
const noEdit = document.getElementById('no-edit');
const audioWin = new Audio('assets/wingame.wav');
const audioLost = new Audio('assets/lostgame.wav');
const boardContainer = document.getElementsByClassName('board__container')


const paths = [ 
    { 
        id: 0, 
        type: 'eutheia1', 
        img: "url('assets/eutheia1.svg')",
    },
    { 
        id: 1, 
        type: 'eutheia2', 
        img: "url('assets/eutheia2.svg')",
    },
    { 
        id: 2, 
        type: 'strofi1', 
        img: "url('assets/strofi1.svg')",
    },
    { 
        id: 3, 
        type: 'strofi2', 
        img: "url('assets/strofi2.svg')",
    },
    { 
        id: 4, 
        type: 'strofi3', 
        img: "url('assets/strofi3.svg')",
    },
    { 
        id: 5, 
        type: 'strofi4', 
        img: "url('assets/strofi4.svg')",
    },
    { 
        id: 6, 
        type: 'grasidi', 
        img: "url('assets/grasidi.svg')",
    }
];


const trees = [
    "url('assets/tree1.svg')",
    "url('assets/tree2.svg')",
    "url('assets/tree3.svg')"
];


const levels = [
    {
        key: 'lvl1',
        positions: [
            {
                house: 0,
                kokkinoskoufitsa: 11,
                tree1: [8],
                tree2: [12],
                tree3: [6],
                grass: [1,2,3,4,5,7,9,10,13,14,15] 
            }
        ]
    },
    {
        key: 'lvl2',
        positions: [
            {
                house: 24,
                wolf: 0,
                wolfPaths: [ 
                    {
                        line1: [23],
                        line2: [8,15],
                        corner1: [],
                        corner2: [1],
                        corner3: [],
                        corner4: [22],
                        grass: [3,4,5,6,7,11,16,17,18,19,20,25,26,27]
                    },
                    {
                        line1: [],
                        line2: [8,15],
                        corner1: [16],
                        corner2: [1,17],
                        corner3: [23],
                        corner4: [22],
                        grass: [3,4,5,6,7,11,18,19,20,25,26,27]
                    },
                    {
                        line1: [23],
                        line2: [15],
                        corner1: [],
                        corner2: [8],
                        corner3: [],
                        corner4: [7,22],
                        grass: [1,3,4,5,6,11,16,17,18,19,20,25,26,27]
                    }
                ],
                kokkinoskoufitsa: 13,
                tree1: [2,14],
                tree2: [10,21],
                tree3: [9,12]
            }
        ]
    },
    {
        key: 'lvl3',
        positions: [
            {
                house: 24,
                wolf: 0,
                kokkinoskoufitsa: 13,
                tree1: [2,14],
                tree2: [10,21],
                tree3: [9,12],
                grass: [1,3,4,5,6,7,8,11,15,16,17,18,19,20,22,23,25,26,27]
            }
        ]
    },
    {
        key: 'lvl4',
        positions: [
            {
                house: 24,
                wolf: 0,
                kokkinoskoufitsa: 13,
                tree1: [],
                tree2: [],
                tree3: [9],
                grass: [1,2,3,4,5,6,7,8,10,11,12,14,15,16,17,18,19,20,21,22,23,25,26,27]
            }
        ]
    }
];


const solutionslvl1 = [
    [{ boxIndex: 7, selectedPath: '1'}, { boxIndex: 3, selectedPath: '3'}, { boxIndex: 2, selectedPath :'0'}, { boxIndex: 1, selectedPath : '0'},],
    [{ boxIndex: 7, selectedPath: '1'}, { boxIndex: 3, selectedPath: '3'}, { boxIndex: 2, selectedPath :'0'}, { boxIndex: 1, selectedPath : '2'}, { boxIndex: 1, selectedPath : '2'}, { boxIndex: 5, selectedPath : '4'}, { boxIndex: 4, selectedPath : '5'}],
    [{ boxIndex: 15, selectedPath: '4'}, { boxIndex: 14, selectedPath: '0'}, { boxIndex: 13, selectedPath :'5'}, { boxIndex: 9, selectedPath : '1'}, { boxIndex: 5, selectedPath : '3'}, { boxIndex: 4, selectedPath : '5'}],
    [{ boxIndex: 15, selectedPath: '4'}, { boxIndex: 14, selectedPath: '0'}, { boxIndex: 13, selectedPath :'5'}, { boxIndex: 9, selectedPath : '1'}, { boxIndex: 5, selectedPath : '1'}, { boxIndex: 1, selectedPath : '3'}],
    [{ boxIndex: 15, selectedPath: '4'}, { boxIndex: 14, selectedPath: '5'}, { boxIndex: 10, selectedPath :'3'}, { boxIndex: 9, selectedPath : '5'}, { boxIndex: 5, selectedPath : '3'}, { boxIndex: 4, selectedPath : '5'}],
    [{ boxIndex: 15, selectedPath: '4'}, { boxIndex: 14, selectedPath: '5'}, { boxIndex: 10, selectedPath :'3'}, { boxIndex: 9, selectedPath : '5'}, { boxIndex: 5, selectedPath : '1'}, { boxIndex: 1, selectedPath : '3'}],
    [{ boxIndex: 10, selectedPath :'0'}, { boxIndex: 9, selectedPath : '5'}, { boxIndex: 5, selectedPath : '1'}, { boxIndex: 1, selectedPath : '3'}],
    [{ boxIndex: 10, selectedPath :'0'}, { boxIndex: 9, selectedPath : '5'}, { boxIndex: 5, selectedPath : '3'}, { boxIndex: 4, selectedPath : '5'}],
    [{ boxIndex: 10, selectedPath :'2'}, { boxIndex: 14, selectedPath : '4'}, { boxIndex: 13, selectedPath : '5'}, { boxIndex: 9, selectedPath : '1'}, { boxIndex: 5, selectedPath : '3'}, { boxIndex: 4, selectedPath : '5'}],
    [{ boxIndex: 10, selectedPath :'2'}, { boxIndex: 14, selectedPath : '4'}, { boxIndex: 13, selectedPath : '5'}, { boxIndex: 9, selectedPath : '1'}, { boxIndex: 5, selectedPath : '1'}, { boxIndex: 1, selectedPath : '3'}],
];


const solutionslvl2 = [
    [
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'0'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '2'}, { boxIndex: 26, selectedPath :'4'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'2'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'0'}, { boxIndex: 17, selectedPath : '2'}]
    ],
    [
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'0'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '2'}, { boxIndex: 26, selectedPath :'4'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'2'}, { boxIndex: 25, selectedPath : '4'}],     
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'5'}, { boxIndex: 19, selectedPath : '3'}, { boxIndex: 18, selectedPath : '2'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 6, selectedPath: '3'}, { boxIndex: 5, selectedPath: '0'}, { boxIndex: 4, selectedPath :'2'}, { boxIndex: 11, selectedPath : '1'}, { boxIndex: 18, selectedPath : '1'}, { boxIndex: 25, selectedPath : '4'}]
    ],
    [
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'0'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '2'}, { boxIndex: 26, selectedPath :'4'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'2'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'0'}, { boxIndex: 17, selectedPath : '2'}]
    ],
];


const solutionslvl3 = [
    [
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'0'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '2'}, { boxIndex: 26, selectedPath :'4'}, { boxIndex: 25, selectedPath : '0'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'2'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '0'}, { boxIndex: 18, selectedPath :'0'}, { boxIndex: 17, selectedPath : '2'}],
        [{ boxIndex: 6, selectedPath: '3'}, { boxIndex: 5, selectedPath: '0'}, { boxIndex: 4, selectedPath :'2'}, { boxIndex: 11, selectedPath : '1'}, { boxIndex: 18, selectedPath : '1'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'5'}, { boxIndex: 19, selectedPath : '3'}, { boxIndex: 18, selectedPath : '2'}, { boxIndex: 25, selectedPath : '4'}],
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'0'}, { boxIndex: 25, selectedPath : '5'}, { boxIndex: 18, selectedPath : '3'}, { boxIndex: 17, selectedPath : '2'}],
        [{ boxIndex: 20, selectedPath: '4'}, { boxIndex: 19, selectedPath: '2'}, { boxIndex: 26, selectedPath :'4'}, { boxIndex: 25, selectedPath : '5'}, { boxIndex: 18, selectedPath : '3'}, { boxIndex: 17, selectedPath : '2'}],
        [{ boxIndex: 6, selectedPath: '3'}, { boxIndex: 5, selectedPath: '0'}, { boxIndex: 4, selectedPath :'2'}, { boxIndex: 11, selectedPath : '1'}, { boxIndex: 18, selectedPath : '4'}, { boxIndex: 17, selectedPath : '2'}],
        [{ boxIndex: 20, selectedPath: '1'}, { boxIndex: 27, selectedPath: '4'}, { boxIndex: 26, selectedPath :'5'}, { boxIndex: 19, selectedPath : '3'}, { boxIndex: 18, selectedPath : '0'}, { boxIndex: 17, selectedPath : '2'}],
    ],
    [
        [{ boxIndex: 1, selectedPath: '3'}, { boxIndex: 8, selectedPath: '1'}, { boxIndex: 15, selectedPath :'1'}, { boxIndex: 22, selectedPath : '5'}, { boxIndex: 23, selectedPath : '0'}],
        [{ boxIndex: 7, selectedPath: '5'}, { boxIndex: 8, selectedPath: '3'}, { boxIndex: 15, selectedPath :'1'}, { boxIndex: 22, selectedPath : '5'}, { boxIndex: 23, selectedPath : '0'}],
        [{ boxIndex: 1, selectedPath: '3'}, { boxIndex: 8, selectedPath: '1'}, { boxIndex: 15, selectedPath :'5'}, { boxIndex: 16, selectedPath : '0'}, { boxIndex: 17, selectedPath : '3'}],
        [{ boxIndex: 7, selectedPath: '5'}, { boxIndex: 8, selectedPath: '3'}, { boxIndex: 15, selectedPath :'5'}, { boxIndex: 16, selectedPath : '0'}, { boxIndex: 17, selectedPath : '3'}],
        [{ boxIndex: 7, selectedPath: '5'}, { boxIndex: 8, selectedPath: '3'}, { boxIndex: 15, selectedPath :'5'}, { boxIndex: 16, selectedPath : '3'}, { boxIndex: 23, selectedPath : '5'}],
        [{ boxIndex: 1, selectedPath: '3'}, { boxIndex: 8, selectedPath: ''}, { boxIndex: 15, selectedPath :'5'}, { boxIndex: 16, selectedPath : '3'}, { boxIndex: 23, selectedPath : '5'}],
        [{ boxIndex: 1, selectedPath: '3'}, { boxIndex: 8, selectedPath: '1'}, { boxIndex: 15, selectedPath :'1'}, { boxIndex: 22, selectedPath : '5'}, { boxIndex: 23, selectedPath : '4'}, { boxIndex: 16, selectedPath : '2'}, { boxIndex: 17, selectedPath : '3'}],
        [{ boxIndex: 7, selectedPath: '5'}, { boxIndex: 8, selectedPath: '3'}, { boxIndex: 15, selectedPath :'1'}, { boxIndex: 22, selectedPath : '5'}, { boxIndex: 23, selectedPath : '4'}, { boxIndex: 16, selectedPath : '2'}, { boxIndex: 17, selectedPath : '3'}],
        [{ boxIndex: 1, selectedPath: '3'}, { boxIndex: 8, selectedPath: '1'}, { boxIndex: 15, selectedPath :'5'}, { boxIndex: 16, selectedPath : '3'}, { boxIndex: 23, selectedPath : '5'}]
    ]
];


function initBoard() {
    clickableBoxIndexes = [];
    let index = 0

    boxes[levels[selectedLevel].positions[index].house].style.backgroundImage = "url('assets/spiti.svg')";
    boxes[levels[selectedLevel].positions[index].kokkinoskoufitsa].style.backgroundImage = "url('assets/kokkinoskoufitsa.svg')";
    
    for (let i=0; i<levels[selectedLevel].positions[index].tree1.length; i++) {
        boxes[levels[selectedLevel].positions[index].tree1[i]].style.backgroundImage = "url('assets/tree1.svg')";
    }
    for (let i=0; i<levels[selectedLevel].positions[index].tree2.length; i++) {
        boxes[levels[selectedLevel].positions[index].tree2[i]].style.backgroundImage = "url('assets/tree2.svg')";
    }
    for (let i=0; i<levels[selectedLevel].positions[index].tree3.length; i++) {
        boxes[levels[selectedLevel].positions[index].tree3[i]].style.backgroundImage = "url('assets/tree3.svg')";
    }
    if (selectedLevel != 0) {
        boxes[levels[selectedLevel].positions[index].wolf].style.backgroundImage = "url('assets/likos.svg')";
    }

    if (selectedLevel !=1) {
        for (let i=0; i<levels[selectedLevel].positions[index].grass.length; i++) {
            boxes[levels[selectedLevel].positions[index].grass[i]].style.backgroundImage = "url('assets/grasidi.svg')";
            clickableBoxIndexes.push(levels[selectedLevel].positions[index].grass[i]);
        }
    }

    if (selectedLevel == 1) {
        randomdWolfPath = Math.floor(Math.random() * levels[selectedLevel].positions[index].wolfPaths.length);

        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].line1.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].line1[i]].style.backgroundImage = "url('assets/eutheia1.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].line2.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].line2[i]].style.backgroundImage = "url('assets/eutheia2.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner1.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner1[i]].style.backgroundImage = "url('assets/strofi1.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner2.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner2[i]].style.backgroundImage = "url('assets/strofi2.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner3.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner3[i]].style.backgroundImage = "url('assets/strofi3.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner4.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].corner4[i]].style.backgroundImage = "url('assets/strofi4.svg')";
        }
        for (let i=0; i<levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].grass.length; i++) {
            boxes[levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].grass[i]].style.backgroundImage = "url('assets/grasidi.svg')";
            clickableBoxIndexes.push(levels[selectedLevel].positions[index].wolfPaths[randomdWolfPath].grass[i]);
        }
    }

    initClickableBoxes()
}


function initClickableBoxes() {
    for (let i=0; i<boxes.length; i++){
        if (clickableBoxIndexes.includes(i)){
            const listener = (event) => {
                selectPath(event, i);
            };
            boxes[i].addEventListener("click", listener);
            eventListeners.push({box: boxes[i], listener: listener});
        } 
    }
}


function clearClickableBoxes() {
    for (let {box, listener} of eventListeners) {
        box.removeEventListener("click", listener);
        box.removeAttribute('data-path');
    }

    clickableBoxIndexes = [];
    eventListeners = [];
}
  
 
function selectPath(event, boxIndex) {
    let pathIndex = 0;

    if (boxes[boxIndex].dataset.path != undefined && boxes[boxIndex].dataset.path != null) {
        pathIndex = (parseInt(boxes[boxIndex].dataset.path) + 1) % 7;
    } 
        
    boxes[boxIndex].setAttribute('data-path', pathIndex);
    boxes[boxIndex].style.backgroundImage = paths[pathIndex].img;
}


function changeLevel(arg) {
    const wrapper = document.getElementById('wrapper');
    const audio = new Audio('assets/levelchange.mp3');
     
    if (arg == 'prev') {
        if (selectedLevel == 0) {
            return;
        } else {
            audio.play();
            clearClickableBoxes();
            removeStyleFromEditBoard();
            showEditButton();
            selectedLevel = selectedLevel - 1;
            if (selectedLevel != 3) {
                clearListenersLevel4();
            }
            wrapper.dataset.level = levels[selectedLevel].key;
            initBoard();
        }
    } else {
        if (selectedLevel == 3) {
            return;
        } else {
            audio.play();
            clearClickableBoxes();
            selectedLevel = selectedLevel + 1;
            if (selectedLevel != 3) {
                clearListenersLevel4();
            }
            wrapper.dataset.level = levels[selectedLevel].key;
            initBoard();
        }
    }
}


function clearBoard() {
    for (let i=0; i<clickableBoxIndexes.length; i++) {
        boxes[clickableBoxIndexes[i]].style.backgroundImage = "url('assets/grasidi.svg')";
        boxes[clickableBoxIndexes[i]].removeAttribute('data-path');
    }

    if (editMode) {
        for (let i=0; i<boxes.length; i++) {
            if (boxes[i].style.backgroundImage.includes('tree')) {
                boxes[i].style.backgroundImage = "url('assets/grasidi.svg')";
            }
        }
    }
}


function checkBoard() {
    if (selectedLevel == 0 ) {
        check(solutionslvl1);
    } else if (selectedLevel == 1) {
        check(solutionslvl2[randomdWolfPath]);
    } else if (selectedLevel == 2) {
        check(solutionslvl3[0], solutionslvl3[1]);
    }
}


function check(solutionsArray, solutionsArray2) {
    let won = false;
    let correct = 0;
    let stepsKokkinoskoufitsa = 0;
    let kokkinoskoufitsaCorrectPath = false;
    let stepsWolf = 0;
    let wolfCorrectPath = false;
    
    if (solutionsArray2 != null && solutionsArray2 != undefined) {
        for(let i=0; i<solutionsArray.length; i++) {
            for(let j=0; j<solutionsArray[i].length; j++) {
                if(boxes[solutionsArray[i][j].boxIndex].dataset.path == solutionsArray[i][j].selectedPath){
                    correct = correct + 1;
                } else {
                    correct = 0;
                    break;
                }
            }
            if (correct == solutionsArray[i].length){
                kokkinoskoufitsaCorrectPath = true;
                stepsKokkinoskoufitsa = correct;
                break;
            }
        }

        correct = 0;

        for(let i=0; i<solutionsArray2.length; i++) {
            for(let j=0; j<solutionsArray2[i].length; j++) {
                if(boxes[solutionsArray2[i][j].boxIndex].dataset.path == solutionsArray2[i][j].selectedPath){
                    correct = correct + 1;
                } else {
                    correct = 0;
                    break;
                }
            }
            if (correct == solutionsArray2[i].length){
                wolfCorrectPath = true;
                stepsWolf = correct;
                break;
            }
        }

        if (wolfCorrectPath && kokkinoskoufitsaCorrectPath && (stepsKokkinoskoufitsa < stepsWolf)) {
            body[0].classList.add('win');
            audioWin.play();
        } else {
            body[0].classList.add('lost');
            audioLost.play();
        }
    } else {
        for(let i=0; i<solutionsArray.length; i++) {
            for(let j=0; j<solutionsArray[i].length; j++) {
                if(boxes[solutionsArray[i][j].boxIndex].dataset.path == solutionsArray[i][j].selectedPath){
                    correct = correct + 1;
                } else {
                    correct = 0;
                    break;
                }
            }
            if (correct == solutionsArray[i].length){
                won = true;
                break;
            }
        }
        if (won == true) {
            body[0].classList.add('win');
            audioWin.play();
        } else {
            body[0].classList.add('lost');
            audioLost.play();
        }
    }
}


function selectElement(event, boxIndex) {
    if (selectedMoveableIndex == boxIndex) {
        boxes[boxIndex].style.border = "none";
        selectedMoveableIndex = null;
        return;
    } else if ( (selectedMoveableIndex != null) && (selectedMoveableIndex != boxIndex)) {
        boxes[selectedMoveableIndex].style.border = "none";
    }

    boxes[boxIndex].style.border = '4px solid #ffa600';
    selectedMoveableIndex = boxIndex;
}


function addListenersToBoardLevel4() {
    for (let i=0; i<boxes.length; i++){
        if (boxes[i].style.backgroundImage.includes('spiti') || boxes[i].style.backgroundImage.includes('kokkinoskoufitsa') || boxes[i].style.backgroundImage.includes('likos')){
            let listener = (event) => {
                selectElement(event, i);
            };
            boxes[i].addEventListener("click", listener);
            selectListenersLevel4.push({box: boxes[i], listener: listener});
        } else {
            const listener = (event) => {
                destination(event, i);
            };
            boxes[i].addEventListener("click", listener);
            destinationListenersLevel4.push({box: boxes[i], listener: listener});
        }
    }
}


function destination(event, boxIndex) {
    if (selectedMoveableIndex != null) {
        boxes[boxIndex].style.backgroundImage = boxes[selectedMoveableIndex].style.backgroundImage;
        boxes[selectedMoveableIndex].style.backgroundImage = "url('assets/grasidi.svg')";
        boxes[selectedMoveableIndex].style.border = "none";
        selectedMoveableIndex = null;
        clearListenersLevel4();
        addListenersToBoardLevel4();
    } else {
        if (boxes[boxIndex].style.backgroundImage.includes('grasidi')) {
            boxes[boxIndex].style.backgroundImage = trees[Math.floor(Math.random() * trees.length)];
        } else {
            boxes[boxIndex].style.backgroundImage = "url('assets/grasidi.svg')"
        }
    }
    return ;
}


function clearMoveableElements() {
    for (let {box, listener} of selectListenersLevel4) {
        box.removeEventListener("click", listener);
    }

    selectListenersLevel4 = [];
}


function clearDestinationElements() {
    for (let {box, listener} of destinationListenersLevel4) {
        box.removeEventListener("click", listener);
    }

    destinationListenersLevel4 = [];
}


function clearListenersLevel4() {
    clearMoveableElements();
    clearDestinationElements();
}


function addStyleToEditBoard() {
    boardContainer[0].style.border = '4px dashed #ffa600';
    boardContainer[0].style.padding = '1.2%';
}


function removeStyleFromEditBoard() {
    boardContainer[0].style.border = 'none';
    boardContainer[0].style.padding = '0px';
}


function showNoEditButton() {
    editMode = true;

    edit.classList.add('hide');
    noEdit.classList.remove('hide');
}


function showEditButton() {
    editMode = false;

    edit.classList.remove('hide');
    noEdit.classList.add('hide');
}


function editBoard() {
    showNoEditButton();
    addStyleToEditBoard();

    clearClickableBoxes();
    addListenersToBoardLevel4();
}


function stopEditBoard() {
    showEditButton();
    removeStyleFromEditBoard();

    clearListenersLevel4();


    for (let i=0; i<boxes.length; i++) {
        if(boxes[i].style.backgroundImage.includes('grasidi')) {
            clickableBoxIndexes.push(i);
        }
        for (let j=0; j<paths.length; j++) {
            if(boxes[i].style.backgroundImage.includes(paths[j].type)) {
                clickableBoxIndexes.push(i);
            }
        }
    }

    initClickableBoxes();
}


function closeSplash() {
    body[0].classList.remove('win');
    body[0].classList.remove('lost');
}


initBoard();
