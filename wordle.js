

var height = 6 // number of guesses
var width = 5 // length of the word

var row = 0 // current guess (attempt #) 
var col = 0 // current letter for that attempt

var gameOver = false
var word = "QUITS"

// words = ["SQUID", "APPLE"] //TODO: include array of words

window.onload = function(){
    initialize();
}
 

function initialize() {

    //Create the game board
    for(let r = 0; r < height; r++){
        for (let c=0; c< width; c++){
            // <span id=0-0 class="tile">P</span>
            let tile = document.createElement("span");//span is similiar to a paragraph with the exectionthat is doesnt end with a new line
            tile.id = r.toString () + "-" + c.toString();
            tile.classList.add("tile"); // includes class list from CSS
            tile.innerText = "";
            document.getElementById("board").appendChild(tile)
        }
    }

    //Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if(gameOver) return

        //alert(e.code)
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(col < width){ 
                let currtile = document.getElementById(row.toString () + "-" + col.toString());
                if (currtile.innerText == ""){
                    currtile.innerText = e.code[3]
                    col += 1
                }
            }
        }
        else if (e.code == "Backspace"){
            if (0 < col && col <= width) {
                col -= 1
            }
            let currtile = document.getElementById(row.toString () + "-" + col.toString());
            currtile.innerText = "";
        } 

        else if (e.code = "Enter"){
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0
    let letterCount = {}; // KENNY -> {K:1, E:2, N:3, N:4, Y:5}
    for (i=0; i<word.length; i++){
        if(letterCount[letter]){
            letterCount[letter] += 1
        }
        else {
            letterCount[letter] = 1
        }                                           
    }

    //first interation - check all the correct one
    for (let c = 0; c< width; c++){
        let currtile = document.getElementById(row.toString () + "-" + c.toString());
        let letter = currtile.innerText;

        //Is letter in correct position?
        if(word[c] == letter){
            currtile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }
        


        if (correct == width){
            gameOver = true
        }
    }

    //2nd interation - check which ones are present but in wrong position
    for (let c = 0; c< width; c++){
        let currtile = document.getElementById(row.toString () + "-" + c.toString());
        let letter = currtile.innerText;

       // is letter in word?
        if (word.includes(letter) && letterCount[letter] > 0){
            currtile.classList.add("present")
            letterCount[letter] -=1;
        }//no in the word
        else{
            currtile.classList.add("absent")
        }


        if (correct == width){
            gameOver = true
        }
    }
}