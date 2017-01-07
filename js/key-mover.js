var selectedPos = -1;

window.addEventListener("keydown",parseKey);
 var triggerButton = function(){
 	var area = document.getElementById("results");
 	var reviews = area.getElementsByClassName("review");
 	button = reviews[selectedPos].querySelector(".more").style.display == "block" ? reviews[selectedPos].querySelector(".more") : reviews[selectedPos].querySelector(".hide");
 	button.click();
 }

var parseKey = function(event){
	if( event.keyCode == 13 && selectedPos > -1) {triggerButton();}
	else if( !(event.keyCode == 38 || event.keyCode == 40 )) return;
	console.log(selectedPos);
	document.activeElement.blur()
	var area = document.getElementById("results");
	var reviews = area.getElementsByClassName("review");
	
	if( event.keyCode == 38){
			if(selectedPos >= 0 ) {
				reviews[selectedPos].classList.remove("selected");
			}
	 		if(selectedPos > 0){
	 			selectedPos -=1;
	 			reviews[selectedPos].classList.add("selected");
	 			window.scrollTo(0, reviews[selectedPos].offsetTop - 100);
	 		}else{ 
	 			document.getElementById("searchbar").focus();
	 			selectedPos -=1;
	 		}
	}

	if( event.keyCode == 40){
		if(selectedPos < reviews.length-1 ) selectedPos +=1 ;
		if(reviews.length > selectedPos){
			if(selectedPos >= 1){
				reviews[selectedPos-1].classList.remove("selected");
			}
			reviews[selectedPos].classList.add("selected");
			window.scrollTo(0, reviews[selectedPos].offsetTop - 200);
			
		}
	}

}