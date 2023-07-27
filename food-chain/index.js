let difficultyIndex = 0;
let difficulties = [1, 2];

let animals = null;
let boxes = null;

let selectedAnimal = null;
const audioPencil = new Audio('assets/info.mp3');

const foodChain = {
    wolf: [],
    sheep: ['wolf'],
    fox: [],
    chicken: ['wolf', 'fox'],
    frog: [],
    worm: ['chicken', 'frog']
};

const neighboringYardsIndexLevel1 = {
    box2: [3],
    box4: [1, 4],
    box5: [3, 5],
    box6: [4]
};

const neighboringYardsIndexLevel2 = {
    box1: [1, 2],
    box2: [0, 2, 3, 4],
    box3: [0, 1, 4, 5],
    box4: [1, 4],
    box5: [1, 2, 3, 5],
    box6: [2, 4]
};

function switchDifficulty(value) {
    var audio = new Audio('assets/levelUp.mp3');
    audio.play();

    audioPencil.pause();
    audioPencil.currentTime = 0;

    difficultyIndex = value;
    setDifficulty();
    updatedDifficulty();
    resetCheck();
    moveAllAnimalsFromBoxesToNest();
    repositionAnimals();
}

function setDifficulty() {
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('difficulty1');
    body[0].classList.remove('difficulty2');
    body[0].classList.add('difficulty' + difficulties[difficultyIndex]);
    const difficultyValue = document.getElementById('difficultyValue');
    difficultyValue.innerHTML = difficulties[difficultyIndex];
    const arrowLeft = document.getElementById('arrow-left');
    const arrowRight = document.getElementById('arrow-right');
    arrowLeft.disabled = false;
    arrowRight.disabled = false;
    if (difficultyIndex == 0) {
        arrowLeft.disabled = true;
    }
    if (difficultyIndex == (difficulties.length - 1)) {
        arrowRight.disabled = true;
    }
}

function updatedDifficulty() {
    const circles3 = document.getElementsByClassName('circle3');
    for (let i = 0; i < circles3.length; i++) {
        circles3[i].classList.remove('enter');
    }
    const circle3 = document.getElementById('circle3level' + difficulties[difficultyIndex]);
    circle3.classList.add('enter');
}

function goToHome() {
    window.history.back();
}

function resetCheck() {
    const allBoxes = document.getElementsByClassName('box');
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].classList.remove('empty-box');
        allBoxes[i].classList.remove('danger-box');
    }
}

function moveAnimalToNest(animal) {
    resetCheck();
    const id = animal.getAttribute('id');
    const animalContainer = document.getElementById(id + '-container');
    if (animal.classList.contains('moved') == true) {
        const animalGray = animalContainer.firstElementChild;
        animal.ontransitionend = (e) => {
            animalGray.style.visibility = 'hidden';
            animal.ontransitionend = null;
        }
    }
    if (id == selectedAnimal?.getAttribute('id')) {
        selectedAnimal = null;
    }
    animal.classList.remove('moved');
    animal.classList.remove('selected');
    
    const top = animalContainer.getBoundingClientRect().top + document.documentElement.scrollTop;
    const left = animalContainer.getBoundingClientRect().left + document.documentElement.scrollLeft;
    animal.style.top = top + 'px';
    animal.style.left = left + 'px';
}
  
function moveAnimalToBox(box, animal) {
    resetCheck();
    const animalContainer = document.getElementById(animal.id + '-container');
    const animalGray = animalContainer.firstElementChild;
    animalGray.style.visibility = 'visible';
    // Find box coordinates relative to top-left corner of the body
    const top = box.getBoundingClientRect().top + document.documentElement.scrollTop;
    const left = box.getBoundingClientRect().left + document.documentElement.scrollLeft;
    // Apply box coordinates to the selected animal (position: absolute)    
    animal.style.top = top + ((box.offsetHeight - animal.clientHeight) / 2) + 'px';
    animal.style.left = left + ((box.offsetWidth - animal.clientWidth) / 2) + 'px';
}

function moveAnimalFromBoxToNest(boxId) {
    const boxContainer = document.getElementById(boxId);
    const animalToRemove = document.getElementById(boxContainer.dataset.animalId);
    moveAnimalToNest(document.getElementById(boxContainer.dataset.animalId));
    delete boxContainer.dataset.animalId;
    delete animalToRemove.dataset.boxId;
}

function moveAllAnimalsFromBoxesToNest() {
    for (let i = 0; i < boxes.length; i++) {
        const box = document.getElementById(boxes[i])
        if (boxes[i].dataset.animalId != null) {
            moveAnimalFromBoxToNest((boxes[i]).getAttribute('id'));
        }
    }
}

function repositionAnimals() {
    for (let i = 0; i < animals.length; i++) {
        if (animals[i]?.dataset?.boxId != null) {
            moveAnimalToBox(document.getElementById(animals[i]?.dataset?.boxId), animals[i]);
        }
        else {
            moveAnimalToNest(animals[i]);
        }
    }

}

function onAnimalClick(animal) {
    if (animal.classList.contains('moved') == false) {
        const id = animal.getAttribute('id');
        for (let i = 0; i < animals.length; i++) {
            animals[i].classList.remove('selected');
        }
        if (id == selectedAnimal?.getAttribute('id')) {
            selectedAnimal = null;
            return;
        }
        selectedAnimal = animal;
        animal.classList.add('selected');
    }
};

function onBoxClick(box) {
    if (selectedAnimal !== null) {
        // If an animal is already in the box remove it
        if (box.dataset.animalId != null) {
            moveAnimalFromBoxToNest(box.getAttribute('id'));
        }
        moveAnimalToBox(box, selectedAnimal);
        selectedAnimal.classList.add('moved');
        // Add data key to box for keep in memory the dropped animal
        box.dataset.animalId = selectedAnimal.getAttribute('id');
        selectedAnimal.dataset.boxId = box.getAttribute('id');
        // Deselect every animal
        for (let i = 0; i < animals.length; i++) {
            animals[i].classList.remove('selected');
        }
        selectedAnimal = null;
    }
};

function check() {
    let boxRelationships = (difficulties[difficultyIndex] == 1 ? neighboringYardsIndexLevel1 : neighboringYardsIndexLevel2); 
    let inDanger = false;
    let win = true;

    for (let i = 0; i < boxes.length; i++) {
        if (difficulties[difficultyIndex] == 1 && (i==0 || i == 2)) {
            continue;
        }
        if (boxes[i]?.dataset?.animalId == null) {
            boxes[i].classList.add('empty-box');
            win = false;
        } else { //check if animal is in danger
            let animal = boxes[i].dataset.animalId;
            let neighboringYards = boxRelationships[boxes[i].id];
            for (let i = 0; i < neighboringYards.length; i++) {
                let neighboringAnimal = boxes[neighboringYards[i]]?.dataset?.animalId;
                if (foodChain[animal].includes(neighboringAnimal)) {
                    inDanger = true;
                    win = false;
                    break;
                }
            }
        }
        if (inDanger) {
            boxes[i].classList.add('danger-box');
        }
        inDanger = false;
    }

    const body = document.getElementsByTagName('body');
    if (win == true) {
        body[0].classList.add('win');
        var audio = new Audio('assets/winGame.wav');
        audio.play();
    }
    else {
        body[0].classList.add('lost');
        var audio = new Audio('assets/failGame.wav');
        audio.play();
    }
}

function closeSplash() {
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('win');
    body[0].classList.remove('lost');
}

(function() {
    window.addEventListener('resize', repositionAnimals);

    const body = document.getElementsByTagName('body');

    // Difficulty
    setDifficulty();

    // Select animals elements
    animals = document.getElementsByClassName('animal');

    // Select box elements
    boxes = document.getElementsByClassName('box');

    // Animations
    const pencil = document.getElementById('pencil');
    const circle1 = document.getElementById('circle1');
        circle1.classList.add('enter');
        circle1.ontransitionend = (e) => {
            circle1.ontransitionend = null;
            const circle2 = document.getElementById('circle2');
            circle2.classList.add('enter');
            circle2.ontransitionend = (e) => {
                circle2.ontransitionend = null;
                const circle3 = document.getElementById('circle3level' + difficulties[difficultyIndex]);
                circle3.classList.add('enter');
                circle3.ontransitionend = (e) => {
                    circle3.ontransitionend = null;
                    const circleButtons = document.getElementsByClassName('circle-button');
                    for (let i = 0; i < circleButtons.length; i++) {
                        circleButtons[i].classList.add('enter');
                        // Place animals in nest
                        for (let i = 0; i < animals.length; i++) {
                            moveAnimalToNest(animals[i]);
                        }
                    }
                }
            }
        }
    

    // Bind animal click
    for (let i = 0; i < animals.length; i++) {
        animals[i].addEventListener('click', function() { onAnimalClick(this); }, false);
    }

    // Bind box click
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function() { onBoxClick(this); }, false);
    }

    body[0].classList.remove('loading');
 })();


function playInstructions() {
    audioPencil.play();  
}