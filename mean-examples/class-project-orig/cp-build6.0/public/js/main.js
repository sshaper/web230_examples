/*CREATE OBJECT*/
cp = {}

cp.init = function(){
	if(document.getElementById('savePage')){
		document.getElementById('savePage').addEventListener('click', cp.getContent, false);
	}
}

cp.getContent = function(){
	/*GET CONTENT OF A SPECIFIC EDITOR:*/
	var pageArr = window.location.href.split("/");
	var page = "/"+pageArr[pageArr.length - 1];
	switch(page){
		case "/" : page = '/admin/'; break;
		case "/about" : page = '/admin/about/'; break;
	}
	var data = tinymce.get('editor').getContent();
	/* I HAD TO USE THE ENCODEURICOMPONENT TO FILTER MY DATA BECAUSE THINGS LIKE AMPERSANDS & CAUSE PROBLEMS WITH NODE.*/
	data = encodeURIComponent(data);

	cp.ackMsg('Saving data please wait...', '#000', true);
	
	Ajax.sendRequest(page, function(res){
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the data', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		else if (res.responseText === 'success'){
			cp.ackMsg('Data was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	}, data);
}

cp.ackMsg = function(msg, color, show){
	var acknowledgment = document.getElementById('ack');
	acknowledgment.style.color = color;
	acknowledgment.innerHTML = msg;


	if(show){
		acknowledgment.style.display = 'block';
	}
	else {
		acknowledgment.style.display = 'none';
	}
}

cp.init();
