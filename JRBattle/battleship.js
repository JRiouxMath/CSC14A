var view = {
        displayMessage: function (msg) {
            var messageArea = document.getElementById("messageArea");
            messageArea.innerHTML = msg;
        },
        displayHit: function (location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
        },
        displayMiss: function (location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "miss");
        }
    };//end view

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    
    ships: [{locations: [0, 0, 0], hits: ["", "", ""]},// end ship1
            {locations: [0, 0, 0], hits: ["", "", ""]},// end ship2
            {locations: [0, 0, 0], hits: ["", "", ""]}],// end ship3

    collision: function(locations)
    {
        for (var i =  0; i < this.numShips; i++)
        {
            var ship = this.ships[i];
            for(var j = 0; j < locations.length; j++)
            {
                if (ship.locations.indexOf(locations[j]) >= 0)
                {
                    return true;
                }//end if
            }// end inner for loop
        }//end outer for loop
        return false;
    },//end method collision
                
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if(this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }//end if have a hit
        }//end for loop
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },//end function fire
    
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit"){
                return false;
            }// end if
        }//end for loop
        return true;
    },// end function isSunk
    
    generateShipLocations: function()
    {
        var locations;
        for (var i = 0; i < this.numShips; i++)
            {
                do{
                    locations = this.generateShip()
                } while(this.collision(locations));
                this.ships[i].locations = locations;
            }// end for loop
    },// end function to generate ships locs
    
    generateShip: function()
    {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction === 1)
            {
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));

            }// end if
        else
            {
                row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                col = Math.floor(Math.random() * this.boardSize);
            }// end else
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++)
            {
                if (direction === 1)
                    {
                        newShipLocations.push(row + "" + (col + i));
                    }// end if inside for
                    
                else
                    {
                        newShipLocations.push((row + i) + "" + col);
   
                    }// end else inside for
            }// end for loop
        
        return newShipLocations;
        
    }// end function to generate a ship

};// end object model


////////////////Controller/////////////////
var controller = {
    guesses: 0,
    
    processGuess: function(guess) 
    {
        var location = parseGuess(guess);
        if(location)
            {
                this.guesses++;
                var hit = model.fire(location);
                if (hit && model.shipsSunk === model.numShips)
                    {
                        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses!");
                    }//end inner if
            }//end if
    }// end function processGuess
}// end controller object

function parseGuess(guess){
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    
    if (guess === null || guess.length !== 2)
        {
            alert("Oops, please enter aletter and anumber on the board.");
        }// end inner if
    else
        {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1)
            
            if(isNaN(row) || isNaN(column))
                {
                    alert("Oops, that isn't on the board.");
                }// end inner if
            else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize)
                {
                    alert("Oops, that's off the board!");
                }// end inner else if
            else
                {
                    return row + column;
                }// end inner else
        }// end outer else
    return null;
}// end function parseGuess


function init()
{
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}//end init function 

function handleFireButton()
{
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    
    guessInput.value = "";
}//end function firebutton handler

function handleKeyPress(e)
{
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13)
        {
            fireButton.click();
            return false;
        }
}// end function keyPress handler

window.onload = init;
//////////////////////TESTING AREA
/*
controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

*/