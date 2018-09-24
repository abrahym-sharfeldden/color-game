// selectors
var h1 				= document.querySelector("h1");
var squares 		= document.querySelectorAll(".square");
var colorDisplay 	= document.querySelector(".color-display");
var messageDisplay 	= document.querySelector(".message");
var btnReset 		= document.querySelector(".btn-reset");
var btnMode 		= document.querySelectorAll(".btn-mode");

// variables
var numOfSquares 	= 9;
var colors, pickedColor;
init()

function init(){
	//begins the game on DOM load
	playGame();
	//mode button event listeners
	for(i = 0; i < btnMode.length; i++){
		btnMode[i].addEventListener("click", function(){
			//removes selected class from all btnMode buttons
			for(var i = 0; i < btnMode.length; i++){
				btnMode[i].classList.remove("selected");
			}
			//adds selected class to clicked button
			this.classList.add("selected");
			//sets `numOfSquares` based on textContent of clicked button
			(this.textContent === "Easy") ? numOfSquares = 3 : (this.textContent === "Medium") ? numOfSquares = 6 : numOfSquares = 9;
			//begins the game
			playGame();
		})
	}
	//resets game if reset button is pressed
	btnReset.addEventListener("click", init);
}

function playGame(){
	//sets reset button's text to its initial value
	btnReset.textContent = "New Colors";
	//sets h1 to have default color
	h1.style.backgroundColor = "#164ba0";
	//removes display message
	messageDisplay.textContent = "";
	//generate `numOfSquares` random colors
	colors = generateRandomColors(numOfSquares);
	//pick a random color out of the 6 generated numbers above
	pickedColor = pickRandomColor();
	//displays rgb of picked color
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++){
		//iterates each color and sets to each available square
		if(colors[i]){
			//sets all squares to display
			squares[i].style.display = "block";
			//sets each square to a corresponding color
			squares[i].style.backgroundColor = colors[i];
		} else {
			//hides squares that do not have a designated color
			squares[i].style.display = "none";
		}
	}
	//styles each square with each generated color
	setSquareColors();
	//checks if the picked color is won or lost
	gameStateCheck();	
}
function generateRandomColors(num){
	//make an empty array
	var arr = [];
	//add num random colors to arr
	for(var i = 0; i < num; i++) arr.push(randomColor());
	//return array
	return arr;
}

function randomColor(){
	//pick red from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick red from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick red from 0 - 255
	var blue = Math.floor(Math.random() * 256);
	//returns color as string
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}


function pickRandomColor(){
	//picks random number out of the `num` generated numbers 
	var random = Math.floor(Math.random() * colors.length);
	//returns random color
	return colors[random];
}

function setSquareColors(){
	//loops through each square and sets color
	for(var i = 0; i < squares.length; i++){
		// add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
	}
}

function gameStateCheck(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;

			if(clickedColor === pickedColor){
				//when correct square picked
				messageDisplay.textContent = "Correct!";
				// when correct square picked - Play Again?
				btnReset.textContent = "Play Again?"
				// changes h1 color to clickedColor
				h1.style.backgroundColor = clickedColor;
				//changes all squares to clickedColor
				changeColors(clickedColor);
			} else {
				//when wrong square picked - Try Again
				messageDisplay.textContent = "Try Again";
				//hides picked square
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function changeColors(color){
	// loop through all squares
	for(var i = 0; i < colors.length; i++){
		squares[i].style.backgroundColor = color;
	}
}