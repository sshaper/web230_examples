/*
This script is a slightly modified version of the following tutorial
http://www.thebuzzmedia.com/html5-drag-and-drop-and-file-api-tutorial/
*/
var dropbox = document.getElementById("dropbox")

function init(){
	// init event handlers
	dropbox.addEventListener("dragenter", dragEnter, false);
	dropbox.addEventListener("dragexit", dragExit, false);
	dropbox.addEventListener("dragover", dragOver, false);
	dropbox.addEventListener("drop", drop, false);
	clrBtn.addEventListener("click", clearDirectory, false);
}

//drag Enter, dragExit, and dragOver just stop the event from going any further.  They must be in place or the script will not work as intended.
//for an experiment comment them out and see what happens.
function dragEnter(e) {
	e.stopPropagation();
	e.preventDefault();
}

function dragExit(e) {
	e.stopPropagation();
	e.preventDefault();
}

function dragOver(e) {
	e.stopPropagation();
	e.preventDefault();
}



function drop(e) {
	//fire this before any new code.
	e.stopPropagation();
	e.preventDefault();

	var files = e.dataTransfer.files;
	var count = files.length;

	// Only call the handler if 1 or more files was dropped.
	if (count > 0){
		handleFiles(files);
	}
}


function handleFiles(files) {
	//only get the first file.
	file = files[0];

	var msg = document.getElementById("dropbox").firstChild.innerHTML = "Processing " + file.name;

	/*
		The FileReader object lets web applications asynchronously read the contents of files
		 (or raw data buffers) stored on the user's computer, using File or Blob objects to specify
		  the file or data to read.
	
		  File objects may be obtained from a FileList object returned as a result of a user
		   selecting files using the <input> element, from a drag and drop operation's DataTransfer object,
		    or from the mozGetAsFile() API on an HTMLCanvasElement.
		    
		    source and more information at https://developer.mozilla.org/en-US/docs/Web/API/FileReader
	*/
	var reader = new FileReader();

	//when read is done loading call handleReaderLoadEnd
	reader.onloadend = handleReaderLoadEnd;

	// begin the read operation
	reader.readAsDataURL(file);
	
}

function handleReaderLoadEnd(e) {
	//When file is done loading it encodesURIComponent and is sent
	//via Ajax to the server
	document.getElementById('image').innerHTML = '<img height="450" width="600" src="'+e.target.result+'" alt="test image"/>';
}

init();
