var url = "data/movies.json";
var data = [];
var timeout;

window.onload = function(){
	section = document.getElementById("page-body");
	load();
	collectData("GET",url).then(store).catch(showError);
	searchbar = document.getElementById("searchbar");
	searchbar.addEventListener("keyup",findMovie.bind(searchbar));
	window.addEventListener("keydown",parseKey);
	searchbar.addEventListener("focus",function(){ document.body.style.backgroundColor = "#696969"});
	searchbar.addEventListener("blur",function(){ document.body.style.backgroundColor = "#D1D6CE"});

}


var load = function(){
	searchbar = document.getElementById("searchbar");
	searchbar.setAttribute("style","display: none");
}

var showSearch = function(){
	searchbar = document.getElementById("searchbar");
	searchbar.style.display = "block";
}

var hideLoadingBar = function(){
 	loader = document.getElementById("loader");
	loader.style.display = "none";
	showSearch();
}

var store = function( info ){
	data = info;
	setTimeout(hideLoadingBar,1000);
	
}

var showError = function( message ){
	alert(message);
}

var find = function( movie ){
	var results = [];
	data.forEach(function(item){
		name = item.name.toLowerCase();
		movie = movie.toLowerCase();
		console.log(name,movie);
		if(name.indexOf(movie) != -1){
			results.push(item);
		}
	});
	return results;
}

var deleteChildren = function(parentNode){
	while(parentNode.firstChild){
		parentNode.removeChild( parentNode.firstChild );
	}
}

var splitBySeq = function( string, seq){
	str = [];
	string = string.toLowerCase();
	seq = seq.toLowerCase();
	str.push( string.substring(0, string.indexOf(seq)).toUpperCase());
	str.push( string.substring( string.indexOf(seq), string.indexOf(seq)+ seq.length).toUpperCase());
	str.push( string.substring(string.indexOf(seq)+ seq.length, string.length).toUpperCase());
	return str;
}

var showDetails = function(item){
	this.style.display = "none";
	var review = this.parentNode;
	review.querySelector(".hide").style.display = "block";
	var reviewContent = review.querySelector(".review-text");
	var p = document.createElement("p");
	p.classList.add("details");
	p.innerHTML = "<b>Director: </b>"+item.director.join(", ")+"<br><br>";
	p.innerHTML += "<b>Writers: </b>"+item.writer.join(", ")+"<br><br>";
	p.innerHTML += "<b>Actors: </b>"+item.actor.join(", ");
	reviewContent.appendChild(p);
}

var hideDetails = function(){
	this.style.display = "none";
	var review = this.parentNode;
	review.querySelector(".more").style.display = "block";
	var details = review.querySelector(".details");
	var reviewContent = review.querySelector(".review-text");
	reviewContent.removeChild(details);
}

var detailsButton = function(item){
	button = document.createElement("button");
	button.style.display = "block";
	button.classList.add("more");
	button.appendChild(document.createTextNode("MORE DETAILS"));
	button.onclick = showDetails.bind(button,item);
	return button;
}

var hideDetailsButton = function(){
	button = document.createElement("button");
	button.classList.add("hide");
	button.appendChild(document.createTextNode("HIDE DETAILS"));
	button.style.display = "none";
	button.onclick = hideDetails.bind(button);
	return button;	
}

var createReview = function(item){
	review = document.createElement("article");
	review.classList.add("review");
	content = document.createElement("div");
	content.classList.add("review-text");
	imgwrapper = document.createElement("div");
	imgwrapper.classList.add("image");
	imgwrapper.innerHTML = "<img src=\""+item.picture+"\" >";
	review.appendChild(imgwrapper);

	title = splitBySeq(item.name,movie);
	content.innerHTML = "<div class=\"title\"><h3>"+title[0]+"<font color=#17AA7B>"+title[1].toUpperCase()+"</font>"+
	title[2].toUpperCase()+"("+item.year+")"+"</h3><h4 class=\"rating\">Rating: "+item.rating+"</h4></div>"+"<p>"+item.description+"</p>";
	review.appendChild(content);
	return review;
}

var drawResults = function( infos, movie ){
	parent = document.getElementById("results");
	deleteChildren(parent);
	infos.forEach( function(item){
		review = createReview(item);
		more = detailsButton(item);
		hide = hideDetailsButton();
		review.appendChild(more);
		review.appendChild(hide);
		parent.appendChild(review);
	});
}

var resultsMessage = function(){
	document.getElementById("found").style.display = "block";
	document.getElementById("noresult").style.display = "none";
}

var noResults = function(){
	document.getElementById("found").style.display = "none";
	document.getElementById("noresult").style.display = "block";
}

var deleteResultMessages = function(){
	document.getElementById("noresult").style.display = "none";	
	document.getElementById("found").style.display = "none";
}
var findMovie = function(event){
	if(event.keyCode >= 37 && event.keyCode <= 40) return;
	selectedPos = -1;
	movie = this.value;
	if(movie.length > 0){
		clearTimeout(timeout);
		timeout = setTimeout(function() {

			results = find(movie);
			if( results.length > 0){
				resultsMessage();
				drawResults(results, movie);}
			else{
				deleteChildren(document.getElementById("results"));
				noResults();
			}},400);

	 }else{
	 	deleteResultMessages();
	 	deleteChildren(document.getElementById("results"));
	 }

}

