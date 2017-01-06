var fieldsCompleted = false;

var addBeforeBtn = function( type, className, placeholder){
	
	var newField = document.createElement("input");
	newField.type = type;
	newField.classList.add(className);
	newField.placeholder = placeholder;
	var form = document.querySelector("form");
	form.insertBefore(newField,this);

}
var changeIfEmpty = function(formField, cssAttr){
	console.log(formField);
	if( formField.value.length == ""){
		formField.setAttribute("style",cssAttr);
		return false;
	}
	return true;
}


var interpretData = function(completed){
	console.log("-->",completed);
	if(completed){
		fieldsCompleted = true;
		window.removeEventListener("keyup", checkFields);

	}else{
		window.onkeyup = verifyActiveField;
		fieldsCompleted = false;
	}
}

var checkFields = function(){

	var inputs = document.getElementsByTagName("input");
	var description = document.querySelector("textarea");
	var rating = document.querySelector("select");	
	var ok = true;
	for(i=0; i<inputs.length; i++){
		ok =  changeIfEmpty(inputs[i],"border-width: 2px; border-color: red;") && ok;
	}

	ok = changeIfEmpty(description,"border-width: 2px; border-color: red;") && ok;
	ok = changeIfEmpty(rating,"border-width: 2px; background-color: red;") && ok;
	
	return ok;
}
var arrayOfValues = function(collection){
	var result = [];
	for(i=0; i<collection.length; i++){
		result.push(collection[i].value);
	}
	return result;
}

var sotreInformations = function(){
	var movie = {};
	
	movie.name = document.getElementById("movie-name").value;
	movie.year = document.getElementById("year").value;
	movie.rating = document.getElementById("movie-rating").value;
	movie.description = document.getElementById("movie-description").value;	
	movie.directors = arrayOfValues(document.getElementsByClassName("director"));
	movie.writers = arrayOfValues(document.getElementsByClassName("writer"));
	movie.actors = arrayOfValues(document.getElementsByClassName("actor"));
	movie.picture = document.getElementById("poster").value;
	
	var info = JSON.stringify(movie);
	console.log(info);
}

var verifyActiveField = function(){
	console.log("check");
	var activeField = document.activeElement;
	if( activeField.value.length > 0){
		activeField.style.borderColor = "#17AA7B";
	}else{
		activeField.style.borderColor = "red";
	}
	
}

var emptyForm = function(){
	var inputs = document.getElementsByTagName("input");
	var description = document.querySelector("textarea");
	var rating = document.querySelector("select");
	description.value = "";
	rating.value = "";
	for(i=0; i<inputs.length; i++){
		inputs[i].value = "";
	}

}

var notify = function(){
	var notification = document.querySelector(".sent-notification");
	notification.style.display = "block";

	setTimeout(function(){ notification.style.display = "none"}, 9000);
}

var managePost = function(){
	
	result = checkFields();
	interpretData(result);
	if( fieldsCompleted ){
		sotreInformations();
		emptyForm();
		notify();
	}

}
window.onload = function(){

 var addDirectorBtn = document.getElementById("add-director");
 addDirectorBtn.onclick = addBeforeBtn.bind(addDirectorBtn,"text","director","Director");
 var addWriterBtn = document.getElementById("add-writer");
 addWriterBtn.onclick = addBeforeBtn.bind(addWriterBtn,"text","writer","Writer");
 var addActorBtn = document.getElementById("add-actor");
 addActorBtn.onclick = addBeforeBtn.bind(addActorBtn,"text","actor","Actor");

 var submitBtn = document.getElementById("submit");
 submitBtn.onclick = managePost;

}

