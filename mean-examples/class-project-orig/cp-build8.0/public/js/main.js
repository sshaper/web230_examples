/*CREATE OBJECT*/
cp = {}

cp.init = function(){
	if(document.getElementById('savePage')){
		document.getElementById('savePage').addEventListener('click', cp.getContent, false);
	}
	if(document.getElementById('uploadfile')){
		document.getElementById('uploadfile').addEventListener('click', cp.uploadFile, false);
	}
	if(document.getElementById('table')){
		document.getElementById('table').addEventListener('click', cp.deleteFile, false);
	}
	
	/* EVENT LISTENERS ALLOW YOU TO ASSIGN THE SAME EVENT TO THE SAME OBJECT MORE THAN ONCE.  HERE I AM ASSIGNING AN ONCLICK EVENT TO THE TABLE TO BOTH DELETE A FILE AND SHOW A DOCUMENT.  BOTH METHODS ARE CALLED BUT ONLY ONE WILL FIRE BASED UPON WHAT IS BEING CLICKED. AND WHAT IS NEEDED TO BE DONE. */
	if(document.getElementById('table')){
		document.getElementById('table').addEventListener('click', cp.showDocument, false);
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

cp.uploadFile = function(){
	/* GET FILE NAME AND FILE*/
	var file = document.getElementById('file');
	var fileName = document.getElementById('filename');
	
	/* CREATE A NEW FORMDATA OBJECT*/
	var formData = new FormData();
	
	/* APPEND THE FILE NAME AND FILE*/
	var data = {fileName: filename.value, name: 'shawn'};
	data = JSON.stringify(data);


	formData.append('file', file.files[0]);
	formData.append('data', data);
	//formData.append('data','shawn');

	/* TELL USER THE DATA IS BEING SAVED */
	cp.ackMsg('Saving file please wait...', '#000', true);

	/*CLEAN FILE ENTRIES*/
	file.value = '';
	fileName.value = '';

	/*SEND AJAX REQUEST*/
	Ajax.sendRequest('/admin/adddoc/',function(res){
		/*IF ERROR DISPLAY GENERIC MESSAGE*/
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the file', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		/*IF NO ERROR THEN INFORM USER FILE SAVE WAS SUCCESSFUL*/
		else if (res.responseText === 'success'){
			cp.ackMsg('File was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	},formData, true);
	
}

cp.deleteFile = function(e){
		
	if(e.target.innerHTML === 'Delete'){
		/*THE MESSAGE WILL CONTAIN CONFIRMATION BUTTONS*/
		var msg = "<p>You are about to permanently delete this file.  If this is what you want to do click 'OK', otherwise click 'Cancel'</p>";
		msg += '<div id="buttons"><input type="button" value="OK" id="okay"><input type="button" value="Cancel" id="cancel"></div>';
		var tr = e.target.parentNode;
		cp.ackMsg(msg, '#000', true);
		
		/*CREATE A DATA OBJECT*/
		var data = {}

		/*ADD THE ID AND THE PATH TO THE FILE*/
		data.id = e.target.id;
		var pathArr = tr.firstElementChild.firstElementChild.href.split('/');
		data.path = pathArr[pathArr.length - 1];
		
		/*STRINGIFY THE OBJECT SO THAT WILL PASS AS A STRING TO THE SERVER*/
		data = JSON.stringify(data);
		
		/*ADD AND ONLICK EVENT TO THE BUTTONS OF THE ACKNOWLEDGEMENT BOX*/
		document.getElementById('buttons').addEventListener('click', addEvent, false);
		
		function addEvent(e){
			if(e.target.id === 'okay'){
				
				/*REMOVE EVENT LISTENER SO IT IS NOT SITTING IN MEMORY*/
				document.getElementById('buttons').removeEventListener('click', addEvent, false);

				/* TELL USER THE FILE IS BEING REMOVED */
				cp.ackMsg('Deleting file please wait...', '#000', true);
				
				/*SEND REQUEST TO SERVER VIA AJAX*/
				Ajax.sendRequest('/admin/deletedoc/',function(res){
					if(res.responseText === 'error'){
						cp.ackMsg('Sorry there was a problem deleting the file', '#F00', true);
						setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
					}
					else if (res.responseText === 'success'){
						

						cp.ackMsg('File was successfully deleted', '#000', true);
						/*REMOVE ROW THAT WAS CLICKED
						NOTE: IN THIS CASE I JUST REMOVED THE ROW FROM THE TABLE, BUT SOMETIMES YOU MAY HAVE TO RECREATE THE TABLE.  IN THOSE CASES YOU WOULD MAKE ANY CHANGES TO THE DATABASE FIRST AND THEN REQUERY THE DATABASE FOR THE UPDATED RECORDS AND RECREATE THE TABLE EITHER ON THE SERVER AND SEND IT (AN EXAMPLE OF THIS IS IN BUILD 8.1 AND ALL THE BUILDS AFTER THAT), OR SEND THE DATA AS A JSON STRING AND REBUILD THE TABLE ON THE CLIENT SIDE.*/
						tr.remove();

						setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
					}
				}, data, false);
			}
			else if(e.target.id === 'cancel'){

				/*REMOVE EVENT LISTENER SO IT IS NOT SITTING IN MEMORY*/
				document.getElementById('buttons').removeEventListener('click', addEvent, false);

				/*HIDE ACKNOWLEDGMENT MESSAGE*/
				cp.ackMsg('','#000',false);
			}
		}
	}
}

cp.showDocument = function(e){
	e.preventDefault();
	if(e.target.nodeName.toLowerCase() === 'a'){
		window.open(e.target.href, '_blank');
	}
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
