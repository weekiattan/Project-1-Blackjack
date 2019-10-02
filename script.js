
var deck = [];
var values = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

function createDeck(){
    deck = [];
    for (var i = 0 ; i < values.length; i++){
        for(var x = 0; x < suits.length; x++){
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
             weight = 10;
         if (values[i] == "A")
            weight = 11;
             var card = { Value: values[i], Suit: suits[x], Weight:
                weight };
                deck.push(card);
            }
        }
    }



//function to shuffle the deck
shuffle = function() {
    var temp, i, random;
    for (i = 0; i < deck.length; i ++ ) {
        random = Math.floor(Math.random() * deck.length);
        temp = deck[i];
        deck[i] = deck[random];
        deck[random] = temp;
    }
}

var hand =[];
var players =[];

//create player with objects.
createPlayers = function(num){
    players = [];
    for(var i = 0; i <= num; i++){
         hand = [];
        var player = {Name: 'Player ' + i, ID: i, Points: 0, Hand: hand }
        players.push(player);
    }
}


function createPlayersUI(){
    document.querySelectorAll('players').innerHTML = "";
    for(var i = 0; i < players.length; i++){
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div')
        var div_points = document.createElement('div');
        var div_hand = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_hand.id = 'hand_' + i;
        div_player.className = 'player';
        div_player.id = 'player_' + i;

        div_playerid.innerHTML = players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points)
        document.getElementById('players').appendChild(div_player);
    }
}

function startBlackJack(){
    document.getElementById('btnStart').value = ""
    // deal card to player and dealer object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(1);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

// deal the cards to the players in their player.hand object.
function dealHands(){
    for (i = 0; i < 2; i++){
        for ( x = 0; x < players.length; x++){
            var card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
            end();
            numOfCard(0);
            numOfCard(1);
            updateDeck();
        }
    }
}

//display player cards
function renderCard(card, player){
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

//create Display for card value and their icons.
//http://www.ams.org/STIX/fnewtable16.html
function getCardUI(card){
    var element = document.createElement('div');
    var icon = "";
    if (card.Suit == 'Hearts')
        icon='&hearts;';
    else if (card.Suit == 'Spades')
        icon = '&spades;';
    else if (card.Suit == 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';
    element.className = 'card';
    element.innerHTML = card.Value + '<br/>' + icon;
    return element;
}

//Pop a card to the current player after dealhand
function hitPlayer(){
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    numOfCard(0);
    numOfCard(1);
    end();
}


//count the number of cards left in the deck
function updateDeck(){
    document.getElementById('deckcount').innerHTML = deck.length + 'Cards left';
}


//get the points for each player.
function getPoints(player){
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++){
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

//get the number of cards in a hand for each player.
function numOfCard(player){
    var numOfCard = players[player].Hand.length;
    return numOfCard;
}

//display the points
function updatePoints(){
    for (var i = 0; i < players.length; i++){
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

 // move on to next player
function stay(){
    if (currentPlayer != players.length - 1 ){
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
        end();
    }
}


function restart(){
    location.reload();
}

//the winning conditions for the game to end.
function end(){
    var player0 = getPoints(0);
    var player1= getPoints(1);
    var numOfCardForPlayer0 = numOfCard(0);
    var numOfCardForPlayer1 = numOfCard(1);

    if(player1 >= 17 && player0 === player1 && player0 <= 21){
            console.log(player0);
            console.log(player1);
            document.getElementById('status').innerHTML ='TIED';
            document.getElementById('status').style.display = "inline-block"; }

            //to check for player 1 blackjack.
        else if(player0 === 21 && numOfCardForPlayer0 === 2){
        console.log(player0);
        console.log(player1);
        console.log(numOfCardForPlayer0);
        console.log(numOfCardForPlayer1);
        document.getElementById('status').innerHTML = 'Player ' + 1 + ' : BLACKJACK';
        document.getElementById('status').style.display = "inline-block";
        //check for player 2 blackjack.
    }else if(player1 === 21 && numOfCardForPlayer1 === 2){
        console.log(player0);
        console.log(player1);
        console.log(numOfCardForPlayer0);
        console.log(numOfCardForPlayer1);
        document.getElementById('status').innerHTML = 'Player ' + 2 + ' : BLACKJACK';
        document.getElementById('status').style.display = "inline-block";
        //if player 1 score more than 21 = lose
    }else if(player0 > 21 && player1 <= 21){
        console.log(player0);
        console.log(player1);
        console.log(numOfCardForPlayer0);
        console.log(numOfCardForPlayer1);
        document.getElementById('status').innerHTML = 'Player ' + 1 + ' : LOST';
        document.getElementById('status').style.display = "inline-block";
        //if player 2 score more than 21 = lose
    }else if(player1 > 21 && player0 <= 21){
            console.log(player0);
            console.log(player1);
            console.log(numOfCardForPlayer0);
            console.log(numOfCardForPlayer1);
            document.getElementById('status').innerHTML = 'Player ' + 2 + ' : LOST';
            document.getElementById('status').style.display = "inline-block";
        }else if(player1 >=17 && player0 > player1 && player0 < 21 && player1 >= 17 && numOfCardForPlayer0 != 2 && numOfCardForPlayer1 != 2 ){
            console.log(player0);
            console.log(player1);
            console.log(numOfCardForPlayer0);
            console.log(numOfCardForPlayer1);
            document.getElementById('status').innerHTML = 'Player ' + 1 + ' : WON';
            document.getElementById('status').style.display = "inline-block";
        }else if(player1 >= 17 && player0 < player1 && player1 < 21 && numOfCardForPlayer0 != 2 && numOfCardForPlayer1 != 2 ){
            console.log(player0);
            console.log(player1);
            console.log(numOfCardForPlayer0);
            console.log(numOfCardForPlayer1);
            document.getElementById('status').innerHTML = 'Player ' + 2 + ' : WON';
            document.getElementById('status').style.display = "inline-block";
        }else if(player1 >= 17 && player0 < player1 && player1 < 21 && numOfCardForPlayer0 >= 2 && numOfCardForPlayer1 >= 3 ){
            console.log(player0);
            console.log(player1);
            console.log(numOfCardForPlayer0);
            console.log(numOfCardForPlayer1);
            document.getElementById('status').innerHTML = 'Player ' + 2 + ' : WON';
            document.getElementById('status').style.display = "inline-block";
        }else if(player1 > player0 && numOfCardForPlayer1>2){
            console.log(player0);
            console.log(player1);
            console.log(numOfCardForPlayer0);
            console.log(numOfCardForPlayer1);
            document.getElementById('status').innerHTML = 'Player ' + 2 + ' : WON';
            document.getElementById('status').style.display = "inline-block"
        }
    }