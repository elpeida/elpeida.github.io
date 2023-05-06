let leftSelected = null;
let rightSelected = null;

let selectedLevel = 0;
const audioLevel1 = new Audio('assets/info1.mp3');
const audioLevel2 = new Audio('assets/info2.mp3');

const levels = [
    {
        key: 'lvl1',
        backgroundColor: '#EFC844',
        cardBackgroundImage: "url('assets/lvl1/bgcard.svg')",
        cardsLength: 9,
        cardsExtraStyle: (card, side) => {
            if (side == 'right') {
                const degOptions = [30, 45, 60, 90, 135, 150, 180];
                card.style.transform = `rotate(${degOptions[Math.floor(Math.random() * degOptions.length)]}deg)`;
            }
        },
        cardsClearExtraStyle: () => {
            const allCardsFrontInner = document.querySelectorAll('.card-front__inner');
            allCardsFrontInner.forEach(card => {
                card.style.transform = `rotate(0deg)`;
            });
        }
    },
    {
        key: 'lvl2',
        backgroundColor: '#D76537',
        cardBackgroundImage: "url('assets/lvl2/bgcard.svg')",
        cardsLength: 9
    }
];

let rightMatches = 0;

const wonBackgroundOptionsLength = 2;

const shuffleNumbers = (max) => {
    let arrNumbers = [];
    for (let i = 0; i < max; i++) {
        arrNumbers.push(i + 1);
    }
    let shuffledNumbers = arrNumbers.sort(function () {
        return Math.random() - 0.5;
    });
    return shuffledNumbers;
};

const mixCards = () => {
    const mixRandomly = (side) => {
        const section = document.getElementById(`cards__container-${side}`);
        const mixed = shuffleNumbers(9);
        const cards = section.querySelectorAll('.card');
        cards.forEach((card, i) => {
            card.dataset.value = mixed[i];
            const cardFrontInner = card.getElementsByClassName('card-front__inner')[0];
            cardFrontInner.style.backgroundImage = `url('assets/${levels[selectedLevel].key}/${side}/${mixed[i]}.svg')`;
            if (levels[selectedLevel]?.cardsExtraStyle != null) {
                levels[selectedLevel].cardsExtraStyle(cardFrontInner, side);
            }
        });

    }
    
    mixRandomly('left');
    mixRandomly('right');
};

const setWonBackgrounds = () => {
    const setBackground = (side, folderNumber) => {
        const section = document.getElementById(`cards__container-${side}`);
        const cards = section.querySelectorAll('.card');
        cards.forEach((card, i) => {
            const cardPuzzle = card.getElementsByClassName('card-puzzle');
            cardPuzzle[0].style.backgroundImage = `url('assets/won/${folderNumber}/${parseInt(card.dataset.index) + 1}.svg')`;
        });

    };

    const mixedNumbers = shuffleNumbers(wonBackgroundOptionsLength);

    setBackground('left', mixedNumbers[0]);
    setBackground('right', mixedNumbers[1]);
};

const enableDisableSection = (left, right) => {
   
    if (left != null) {
        const leftSection = document.getElementById('cards__container-left');
        leftSection.dataset.enabled = left;
    }

    if (right != null) {
        const rightSection = document.getElementById('cards__container-right');
        rightSection.dataset.enabled = right;
    }
};

const turnSelectedCards = (turnWons) => {
    const selectedCards = document.querySelectorAll('.card');
    selectedCards.forEach(selectedCard => {
        selectedCard.classList.remove('selected');
        if (turnWons == true) {
            selectedCard.classList.remove('won');
        }
    });
 
    leftSelected = null;
    rightSelected = null;
};

const changeLevel = (levelIndex) => {
    audioLevel1.pause();
    audioLevel1.currentTime = 0;

    audioLevel2.pause();
    audioLevel2.currentTime = 0;

    if (levelIndex != null) {
        var audio = new Audio('assets/levelUp.mp3');
        audio.play();
    }
    const selectedLevelBackup = selectedLevel;
    selectedLevel = levelIndex ?? 0;
    const level = levels[selectedLevel];
    const wrapper = document.getElementById('wrapper');

    wrapper.dataset.level = level.key;

    rightMatches = 0;

    turnSelectedCards(true);

    enableChecks(false);

    wrapper.style.backgroundColor = level.backgroundColor;

    const cardsBackground = document.querySelectorAll('.card-background');
    cardsBackground.forEach(cardBackground => {
        cardBackground.style.backgroundImage = level.cardBackgroundImage;
    });

    if (levels[selectedLevelBackup]?.cardsClearExtraStyle != null) {
        levels[selectedLevelBackup].cardsClearExtraStyle();
    }
    setTimeout(() => {
        mixCards();
        setWonBackgrounds();
    }, 600);

    enableDisableSection(true, true);
};

const selectCard = (index, section) => {
 
    const id = `card-${section}-${index}`;
    const currentCard = document.getElementById(id);
    currentCard.classList.add('selected');

    if (section == 'left') {
        enableDisableSection(false);
        leftSelected = {
            id: id,
            value: currentCard.dataset.value
        };
        if (rightSelected != null) {
            enableChecks(true);
        }
    }
    else {
        enableDisableSection(null, false);
        rightSelected = {
            id: id,
            value: currentCard.dataset.value
        };
        if (leftSelected != null) {
            enableChecks(true);
        }
    }
};

const enableChecks = (isEnable) => {
    document.getElementById('yes').disabled = !isEnable;
    document.getElementById('no').disabled = !isEnable;
};

const check = (response) => {
    if ((response == 'yes') && (leftSelected?.value == rightSelected?.value)) {
        const leftCard = document.getElementById(leftSelected.id);
        leftCard.classList.remove('selected');
        leftCard.classList.add('won');
        const rightCard = document.getElementById(rightSelected.id);
        rightCard.classList.remove('selected');
        rightCard.classList.add('won');
        rightMatches = rightMatches + 1;
    }
    else {
        turnSelectedCards();
    }
    if (rightMatches == levels[selectedLevel].cardsLength) {
        const body = document.getElementsByTagName('body');
        body[0].classList.add('win');
        var audio = new Audio('assets/winsound.wav');
        audio.play();
    }
    else {
        enableChecks(false);
        enableDisableSection(true, true);
    }
};

function closeSplash() {
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('win');
    body[0].classList.remove('lost');
}

function playInstructions() {
    if (selectedLevel == 0) {
        audioLevel1.play();
    } else {
        audioLevel2.play();
    }
}

(function() {
    changeLevel();
})();
