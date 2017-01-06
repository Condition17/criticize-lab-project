var url = "data/movies.json";
var data = [];
var timeout;

window.onload = function(){
	section = document.getElementById("page-body");
	load();
	collectData("GET",url).then(store).catch(showError);
	searchbar = document.getElementById("searchbar");
	searchbar.addEventListener("keyup",findMovie.bind(searchbar));
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

var drawResults = function( infos, movie ){
	parent = document.getElementById("results");
	deleteChildren(parent);
	infos.forEach( function(item){

		review = document.createElement("article");
		review.classList.add("review");
		content = document.createElement("div");
		content.classList.add("review-text");
		imgwrapper = document.createElement("div");
		imgwrapper.classList.add("image");
		imgwrapper.innerHTML = "<img src=\""+item.picture+"\" >";
		review.appendChild(imgwrapper);

		title = splitBySeq(item.name,movie);
		content.innerHTML = "<div class=\"title\"><h3>"+title[0]+"<font color=red>"+title[1].toUpperCase()+"</font>"+
		title[2].toUpperCase()+"("+item.year+")"+"</h3><h4 class=\"rating\">Rating: "+item.ranking+"</h4></div>"+"<p>"+item.description+"</p>";
		review.appendChild(content);
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