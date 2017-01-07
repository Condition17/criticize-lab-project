var selectedPos = -1;

window.addEventListener("keydown",parseKey);
 	var triggerButton = function(){
 	var area = document.getElementById("results");
 	var reviews = area.getElementsByClassName("review");
 	button = reviews[selectedPos].querySelector(".more").style.display == "block" ? reviews[selectedPos].querySelector(".more") : reviews[selectedPos].querySelector(".hide");
 	button.click();
 }

var markAsSelected = function( review, posError ){
	review.classList.add("selected");
	window.scrollTo(0, review.offsetTop - posError);
}


var deselect = function( review ){
	review.classList.remove("selected");
}

var upArrowPressed = function( reviews ){
	if(selectedPos >= 0 ) {
		deselect(reviews[selectedPos]);
	}
	if(selectedPos > 0){
	 	selectedPos -=1;
	 	markAsSelected(reviews[selectedPos], 100);
	}else{ 
	 	document.getElementById("searchbar").focus();
	 	selectedPos -=1;
	}

}

var downArrowPressed = function( reviews ){
	if(selectedPos < reviews.length-1 ) selectedPos +=1 ;
	if(reviews.length > selectedPos){
		if(selectedPos >= 1){
			deselect(reviews[selectedPos-1]);
		}
		markAsSelected(reviews[selectedPos], 200);
	}
}

var parseKey = function(event){
	if( event.keyCode == 13 && selectedPos > -1) { triggerButton();}
	else if( !(event.keyCode == 38 || event.keyCode == 40 )) return;

	document.activeElement.blur()
	var area = document.getElementById("results");
	var reviews = area.getElementsByClassName("review");
	
	if( event.keyCode == 38) upArrowPressed( reviews );
	if( event.keyCode == 40) downArrowPressed( reviews);

}
