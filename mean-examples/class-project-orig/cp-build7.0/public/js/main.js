/*CREATE OBJECT*/
cp = {}

cp.init = function(){
	if(document.getElementById('savePage')){
		document.getElementById('savePage').addEventListener('click', cp.getContent, false);
	}
	if(document.getElementById('uploadfile')){
		document.getElementById('uploadfile').addEventListener('click', cp.uploadfile, false);
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

	/*TELL USER THE DATA IS BEING SAVED*/
	cp.ackMsg('Saving data please wait...', '#000', true);

	/* SEND AJAX REQUEST*/
	Ajax.sendRequest(page, function(res){
		/* IF THERE IS AN ERROR DISPLAY A GENERIC ERROR MESSAGE*/
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the data', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		/* UPON SUCCESS TELL USER IT WAS SUCCESSFUL, DISPLAY MESSAGE FOR 1.5 SECONDS */
		else if (res.responseText === 'success'){
			cp.ackMsg('Data was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	}, data);
}

cp.uploadfile = function(){
	/* GET FILE NAME AND FILE*/
	var file = document.getElementById('file');
	var fileName = document.getElementById('filename').value;
	
	/* CREATE A NEW FORMDATA OBJECT*/
	var formData = new FormData();
	
	/* APPEND THE FILE NAME AND FILE*/
	formData.append('file', file.files[0]);
	formData.append('data', fileName);

	/* TELL USER THE DATA IS BEING SAVED */
	cp.ackMsg('Saving file please wait...', '#000', true);

	/*SEND AJAX REQUEST*/
	Ajax.sendRequest('/admin/adddoc/',function(res){
		/*IF ERROR DISPLAY GENERIC MESSAGE*/
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the file', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		/*IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL*/
		else if (res.responseText === 'success'){
			cp.ackMsg('File was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	},formData, true);
	
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
