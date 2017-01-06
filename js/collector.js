var dataUser = function(information){
	information.forEach(function(item, index){
		console.log(item);
	})
}

var req = new XMLHttpRequest();

req.onreadystatechange = function(){
	
	if( this.readyState == 4 && this.status == 200){
		var data = JSON.parse( this.responseText );
		dataUser(data);
		return data;
	}else{
		console.log("not found");
	}
};

req.open("GET", "data/movies.json", true);
req.send();