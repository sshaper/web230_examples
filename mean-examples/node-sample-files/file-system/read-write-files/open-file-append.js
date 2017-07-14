// I open the file and callback an error and a file. The fd variable
// is the file descriptor.  It does not have to be fd
var fs = require('fs');

var txt = "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sollicitudin elit in ex viverra interdum. Mauris rhoncus dui id nulla gravida, quis varius metus commodo. Nunc purus tellus, sodales non rutrum quis, tristique et mauris. Curabitur nec turpis ut leo congue suscipit quis eget leo. Vivamus semper lectus elementum placerat maximus. Morbi libero neque, hendrerit eu maximus eu, faucibus eget magna. Proin non fermentum eros. Fusce id felis feugiat, laoreet nisi in, maximus mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras consequat sem sit amet euismod fermentum. Sed imperdiet vel dui vitae efficitur. Morbi tempus vel enim vitae accumsan. Fusce vel convallis ligula, ac sodales augue.\n\nNam diam augue, efficitur ut laoreet eu, laoreet sed tellus. Nam vestibulum, arcu quis condimentum venenatis, erat lectus interdum enim, rutrum blandit metus lorem a nunc. Duis euismod arcu orci, sit amet elementum tortor cursus a. Sed molestie, sem id suscipit mollis, sem diam porttitor dolor, et dignissim sem ante id sem. Nulla facilisi. Sed augue justo, varius quis quam quis, luctus scelerisque odio. Nullam auctor fringilla felis a dapibus. Donec aliquet metus fringilla erat porta, ac hendrerit ante dictum. Aenean quam ligula, interdum eu consectetur eget, auctor commodo ligula. Fusce egestas diam vitae lorem interdum ullamcorper. Cras tellus felis, pellentesque at massa nec, ultricies euismod arcu. In ac lectus orci. Sed venenatis sagittis lacus, rhoncus ultrices eros efficitur vitae. Mauris quis tincidunt diam. Curabitur pharetra est a dolor condimentum, a fermentum quam posuere. Phasellus mattis ac tortor ut lacinia.\n\nPraesent semper erat orci, ut euismod diam iaculis id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque ut molestie arcu. Duis tristique auctor augue, non pulvinar libero scelerisque a. Vestibulum consequat lacinia dui ultricies consequat. Pellentesque eu mattis ipsum. Morbi viverra, arcu eget sollicitudin ornare, ex ante pulvinar libero, a pretium ligula tellus et nisi. Maecenas pharetra dui massa, non maximus nulla sollicitudin eget. Curabitur consequat ut sem at fringilla. Cras et porta urna.";


//This will open and create the sample.txt file
fs.open('sample.txt','a',function(err, fd){
	
	if(err){
		
		//The return is used so the function terminates
		return console.log(err);
	}
	
	//This is written in the callback because we want the file to be created
	//and opened before we write to it.
	fs.write(fd, txt, function(err){
		if(err){
			return console.log(err);
		}
		fs.close(fd,function(err){
			if(err){
				return console.log(err);
			}
			
			console.log('File opened, appended to, and closed');
		});
	});
});