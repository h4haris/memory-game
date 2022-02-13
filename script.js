document.addEventListener('DOMContentLoaded', () => {

    //card options
    let imagesArray = [{
            name: '1',
            img: 'images/1.png'
        },
        {
            name: '2',
            img: 'images/2.png'
        },
        {
            name: '3',
            img: 'images/3.png'
        },
        {
            name: '4',
            img: 'images/4.png'
        },
        {
            name: '5',
            img: 'images/5.png'
        },
        {
            name: '6',
            img: 'images/6.png'
        },
        {
            name: '7',
            img: 'images/7.png'
        },
        {
            name: '8',
            img: 'images/8.png'
        },
        {
            name: '9',
            img: 'images/9.png'
        },
        {
            name: '10',
            img: 'images/10.png'
        },
        {
            name: '11',
            img: 'images/11.png'
        },
        {
            name: '12',
            img: 'images/12.png'
        },
        {
            name: '13',
            img: 'images/13.png'
        },
        {
            name: '14',
            img: 'images/14.png'
        },
        {
            name: '15',
            img: 'images/15.png'
        },
        {
            name: '16',
            img: 'images/16.png'
        }
    ];

    const cardArray = [...imagesArray, ...imagesArray];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const moveDisplay = document.querySelector('#moves');
    const restartButton = document.querySelector('.restartButton');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let movesCounter = 0;

    //create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'card down');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches when two cards chosen
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            cards[optionOneId].classList.replace('up', 'down');
            cards[optionTwoId].classList.replace('up', 'down');
            cards[optionOneId].addEventListener('click', flipCard);
            cards[optionTwoId].addEventListener('click', flipCard);
        }
        moves
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        moveDisplay.textContent = ++movesCounter;
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = cardsWon.length + ' - Congratulations! You found them all!';
            restartButton.classList.remove('hide');
        }
    }

    //flip card
    function flipCard() {
        if (cardsChosen.length === 2) {
            return; // don't flip if two cards are already flipped and waiting for match check
        }

        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        this.classList.replace('down', 'up');
        this.removeEventListener('click', flipCard); //removing click event for already flipped image
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    restartButton.addEventListener('click', restartGame);

    //Restart Game
    function restartGame() {
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        movesCounter = 0;

        cardArray.sort(() => 0.5 - Math.random());

        const cards = document.querySelectorAll('img');
        cards.forEach((img) => {
            img.setAttribute('src', 'images/blank.png');
            img.addEventListener('click', flipCard);
            img.classList.replace('up', 'down');
        });

        restartButton.classList.add('hide');
    }

    createBoard();
})