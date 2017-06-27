/**
 * Planned upgrade 1:
 * 
 * Track the win rate of the player across multiple games 
 * and display this rate somewhere on the page.
 * 
 * 
 * Planned upgrade 2:
 * 
 * The original game was actually two player, and after a 
 * successful guess players could either pause or keep 
 * guessing. The first player that made it through all five
 * guesses without being incorrect won. Make the game 
 * support two different players.
 * 
 * Allow players to specify a name and keep track of each
 * player's win rate independently.
 */

/**
 * Q: what is our input?
 * A: a button press
 * Q: what is our output?
 * A: win/lose.
 * 
 * This will be several parts:
 * 1. Upon load, we need to start with a new "deck" and display a card upon the screen.
 * 2. Give player the choice to decide if next card will be higher or lower.
 * 3. if player chooses correctly, play again. Play until 5 wins are reached or
 *      a. create a function with an event listener for the "higher" button that, when clicked, causes a GET request
 *      that draws another card. The value of the new card is then compared to the value of the previous card. If it
 *      is higher, the player draws again. If it is not, the player loses.
 *      b. create a function for the "lower" button that does the same, but in reverse.
 * 4. if player chooses incorrectly, the game is over and the deck should be reshuffled.
 */

let deck;
let currentVal = 0;
let points = 0;
let score = 0;

window.addEventListener('load', function () {
    console.log('Hi Mom!');

    newGame(); //load newGame
    console.log(deck);
    console.log(currentVal);
    pickHigher();   // run pick higher

    pickLower();
});

function newGame() {
    let newDeck = new XMLHttpRequest();
    newDeck.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    newDeck.addEventListener('load', function () {
        let response = JSON.parse(newDeck.responseText);
        deck = response.deck_id;

        let newVal = response.cards[0].value;

        console.log("newVal = " + newVal);
        if (newVal === "JACK") {
            newVal = 11
        } else if (newVal === "QUEEN") {
            newVal = 12
        } else if (newVal === "KING") {
            newVal = 13
        } else if (newVal === "ACE") {
            newVal = 14
        } else {
            newVal = parseInt(newVal);
        }
        console.log("After 'if' statement, newVal = " + newVal);

        currentVal = newVal;
        let main = document.querySelector('.main');
        let fig = document.createElement('figure');
        main.appendChild(fig);
        let pic = document.createElement('img');
        pic.src = response.cards[0].image;
        fig.appendChild(pic);
        let figcap = document.createElement('figcaption');
        figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
        fig.appendChild(figcap);
        console.log("newGame loaded");
    });
    newDeck.send();
};

function pickHigher() {
    console.log('pickHigher loaded');
    let higher = document.querySelector('#higher');
    higher.addEventListener('click', function () {
        console.log('pickHigher running');
        let drawCard = new XMLHttpRequest();
        drawCard.open('GET', 'https://deckofcardsapi.com/api/deck/' + deck + '/draw/?count=1');
        drawCard.addEventListener('load', function () {
            let response = JSON.parse(drawCard.responseText);
            let newVal = response.cards[0].value;

            //Check face cards and set to int

            console.log("newVal = " + newVal);
            if (newVal === "JACK") {
                newVal = 11
            } else if (newVal === "QUEEN") {
                newVal = 12
            } else if (newVal === "KING") {
                newVal = 13
            } else if (newVal === "ACE") {
                newVal = 14
            } else {
                newVal = parseInt(newVal);
            }
            console.log("After 'if' statement, newVal = " + newVal);
            
            //Append to DOM
            let main = document.querySelector('.main');
            let fig = document.createElement('figure');
            main.appendChild(fig);
            let pic = document.createElement('img');
            pic.src = response.cards[0].image;
            fig.appendChild(pic);
            let figcap = document.createElement('figcaption');
            figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            fig.appendChild(figcap);

            if (newVal > currentVal) {
                console.log('YAY!')
                console.log(response.cards[0].value);
                currentVal = newVal;
                console.log(currentVal);
                //currentVal.push(newVal);
                console.log(currentVal);
                addPoint()
                winCheck()
            } else {
                console.log("wah wah");
                console.log(response.cards[0].value);
                lose = confirm("Sadly, you drew a " + response.cards[0].value + " of " + response.cards[0].suit + ". You lose. Play again?");
                if (lose === true) {
                    location.reload();
                }
            }
        });
        drawCard.send();
    });
}

function pickLower() {
    console.log('pickLower loaded');
    let higher = document.querySelector('#lower');
    higher.addEventListener('click', function () {
        console.log('pickLower running');
        let drawCard = new XMLHttpRequest();
        drawCard.open('GET', 'https://deckofcardsapi.com/api/deck/' + deck + '/draw/?count=1');
        drawCard.addEventListener('load', function () {
            let response = JSON.parse(drawCard.responseText);
            let newVal = response.cards[0].value;

            console.log("newVal = " + newVal);
            if (newVal === "JACK") {
                newVal = 11
            } else if (newVal === "QUEEN") {
                newVal = 12
            } else if (newVal === "KING") {
                newVal = 13
            } else if (newVal === "ACE") {
                newVal = 14
            } else {
                newVal = parseInt(newVal);
            }
            console.log("After 'if' statement, newVal = " + newVal);
            let main = document.querySelector('.main');
            let fig = document.createElement('figure');
            main.appendChild(fig);
            let pic = document.createElement('img');
            pic.src = response.cards[0].image;
            fig.appendChild(pic);
            let figcap = document.createElement('figcaption');
            figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            fig.appendChild(figcap);

            if (newVal < currentVal) {
                console.log('YAY!')
                currentVal = newVal;
                console.log(currentVal);
                addPoint();
                winCheck();
            } else {
                console.log("wah wah");
                lose = confirm("Sadly, you drew a " + response.cards[0].value + " of " + response.cards[0].suit + ". You lose. Play again?");
                if (lose === true) {
                    location.reload();
                }
            }
        });
        drawCard.send();
    });
}

function addPoint() {
    points++
    console.log("Points so far: " + points);
}

function winCheck() {
    if (points === 5) {
        let again = confirm("You won the match! New game?");
        if (again === true) {
            score++
            console.log("Overall score is " + score);
            let main = document.querySelector('.main');
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            newGame();
        }
    }
}

// function isFaceCard (card) {
//     console.log("Card value = " + card);
//         if  (val === "JACK") {
//             return val = 11
//         } else if  (val === "QUEEN") {
//             return val = 12
//         } else if  (val === "KING") {
//             return val = 13
//         } else if  (val === "ACE") {
//             return val = 14
//         } else {
//             val = parseInt(val);
//         }
//         console.log("After 'if' statement, val = " + val);
// }