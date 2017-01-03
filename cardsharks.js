/**
 * Many moons ago there was a game show called Card Sharks. The most gripping part of the game was when contestants 
 * were given a playing card and asked to guess whether the next one from the deck would be higher or lower 
 * (I was young, don't judge). If they successfully guessed five times in a row then they won the match. If they 
 * guessed incorrectly at any point they lost the match. Recreate a web-based version of Card Sharks for the world 
 * to enjoy.
 * 
 * Focus primarily on functionality on this project, though feel free to spend time on improving the design as well.
 * 
 * Tier 1: crust edition
 * 
 * Display a card when the page first loads, and give users a "higher" and "lower" button. When they click, a new 
 * card should be chosen and displayed along with the player's guess. If the player was correct they should be able 
 * to guess again. If they were wrong then they should lose the round.
 * The same card should not be able to come up more than once in a single match.
 * 
 * Tier 2: mantle edition
 * 
 * Give the player a "play again" button when the game ends. Track the win rate of the player across multiple games 
 * and display this rate somewhere on the page.
 * 
 * Use the Deck of Cards API to fetch new cards.
 * 
 * Tier 3: core edition
 * 
 * The original game was actually two player, and after a successful guess players could either pause or keep 
 * guessing. The first player that made it through all five guesses without being incorrect won. Make your game 
 * support two different players.
 * 
 * Allow players to specify a name and keep track of each player's win rate independently.
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

let deck = [];
let values = [];
// if (values = "JACK") {
//     values = 11
// };
// if (values = "QUEEN") {
//     values = 12
// };
// if (values = "KING") {
//     values = 13
// };
// if (values = "ACE") {
//     values = 14
// };
let JACK = 11;
let QUEEN = 12;
let KING = 13;
let ACE = 14;
window.addEventListener('load', function () {
    console.log('Hi Mom!');

    newGame(); //load newGame
    console.log(deck);
    console.log(values);
    pickHigher();   // run pick higher

    pickLower();
});

function newGame() {
    let newDeck = new XMLHttpRequest();
    newDeck.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    newDeck.addEventListener('load', function () {
        let response = JSON.parse(newDeck.responseText);
        deck.push(response.deck_id);     

        values.push(response.cards[0].value)
        let main = document.querySelector('.main');
        let sec = document.createElement('ul');
        main.appendChild(sec);
        let pic = document.createElement('img');
        pic.src = response.cards[0].image;
        sec.appendChild(pic);
        let desc = document.createElement('h3');
        desc.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
        sec.appendChild(desc);
        console.log("newGame loaded")

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
            console.log(response.cards[0].value);
            // if  (response.cards[0].value === "JACK") {
            //     response.cards[0].value === 11
            // };
            // if  (response.cards[0].value === "QUEEN") {
            //     response.cards[0].value === 12
            // };
            // if  (response.cards[0].value === "KING") {
            //     response.cards[0].value === 13
            // };
            // if  (response.cards[0].value === "ACE") {
            //     response.cards[0].value === 14
            // };
            console.log(response.cards[0].value);
            let main = document.querySelector('.main');
            let sec = document.createElement('ul');
            main.appendChild(sec);
            let pic = document.createElement('img');
            pic.src = response.cards[0].image;
            sec.appendChild(pic);
            let desc = document.createElement('h3');
            desc.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            sec.appendChild(desc);


            if (response.cards[0].value > values[0]) {
                console.log('YAY!')
                console.log(response.cards[0].value);
                values.shift();
                console.log(values);
                values.push(response.cards[0].value);
                console.log(values);
            } else {
                console.log("wah wah");
                console.log(response.cards[0].value);
                lose = confirm("You lose. Play again?");
                 if (lose === true) {
                     location.reload();
                }
            }
        });

        drawCard.send();

    });


}

function pickLower() {
    // let JACK = 11;
    // let QUEEN = 12;
    // let KING = 13;
    // let ACE = 14;
    console.log('pickLower loaded');
    let higher = document.querySelector('#lower');
    higher.addEventListener('click', function () {
        console.log('pickLower running');
        let drawCard = new XMLHttpRequest();
        drawCard.open('GET', 'https://deckofcardsapi.com/api/deck/' + deck + '/draw/?count=1');
        drawCard.addEventListener('load', function () {
            let response = JSON.parse(drawCard.responseText);
            //console.log(response);
            let main = document.querySelector('.main');
            let sec = document.createElement('ul');
            main.appendChild(sec);
            let pic = document.createElement('img');
            pic.src = response.cards[0].image;
            sec.appendChild(pic);
            let desc = document.createElement('h3');
            desc.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            sec.appendChild(desc);


            if (response.cards[0].value < values[0]) {
                console.log('YAY!')
                console.log(response.cards[0].value);
                values.shift();
                console.log(values);
                values.push(response.cards[0].value);
                console.log(values);
            } else {
                console.log("wah wah");
                console.log(response.cards[0].value);
                lose = confirm("You lose. Play again?");
                if (lose === true) {
                location.reload();
                }
            }
        });

        drawCard.send();

    });


}