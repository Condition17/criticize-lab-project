var collectData = function(method, url){
	return new Promise(function(resolve,reject){
		var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
			if( this.readyState == 4 && this.status == 200){
				resolve(JSON.parse(this.responseText));
			}
			 this.onerror = function () {
      			reject("Something went wrong! Please, refresh the page!");
      		}
		};

		request.open(method, url, true);
		request.send();
	});

}