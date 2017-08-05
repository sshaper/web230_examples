var fs = require('fs'),
	xml2js = require('xml2js');
module.exports = {
	index: function(req, res){
        res.render('user/home',{title: 'Home Page', heading: 'Home Page', nav: true});
    },
    parsexml: function(req, res){
    	var parser = new xml2js.Parser();
    	fs.readFile('books.xml', function(err, data){
    		parser.parseString(data, function(err, result){
    			var jsonobj = JSON.stringify(result);
    			content = parsexml(result);
    			res.render('user/parsexml',{title: 'Parse XML', heading: 'Parse XML', nav: true, content: content, jsonobj: jsonobj})
    		});
    	});

    },
    parsejson: function(req, res){
    	fs.readFile('books.txt', function(err, data){
    		var content ="content", jsonobj = "jsonobj";
    		content = parsejson(JSON.parse(data))
    		res.render('user/parsejson',{title: 'Parse XML', heading: 'Parse XML', nav: true, content: content, jsonobj: data})
    	});
    }
}
/* WE ARE NOT ACTUALLY PARSING XML WE ARE PARSING THE JSON OBJECT RETURNED FROM THE XML2JS.PARSESTRING METHOD. */
function parsexml(obj){
	var len, i = 0, book, content = '', innerlen, j = 0;
	book = obj.books.book;
	len = obj.books.book.length;
	

	while(i < len){
		content += "<p><b>Title: </b>" + book[i].title[0]._ + "</p>";
		content += "<p><b>Author: </b>" + book[i].title[0].$.author + "</p>";
		content += "<p><b>Publisher: </b>" + book[i].publisher[0] + "</p>";
		content += "<p><b>Editions: </b></p><ul>";
		innerlen = book[i].editions[0].edition.length;
		j = 0;
		while(j < innerlen){
			content += "<li>" + book[i].editions[0].edition[j]._ + " - " + book[i].editions[0].edition[j].$.year + "</li>";
			j++;	
		}
		content += '</ul><hr>';
		i++;
	}
	return content;
}

/*HERE WE ARE PARSING THE JSON OJECT AS IT WAS WRITTEN (AS A JSON OBJECT).  AS YOU CAN SEE IT IS MUCH EASIER AND WITH DON'T NEED AN THIRD PARTY MODULE.*/
function parsejson(obj){
	var len, innerlen, i, j, books, content = '';
	books = obj;
	len = books.length;
	i = 0;
	while(i < len){
		content += "<p><b>Title: </b>" + books[i].title + "</p>";
		content += "<p><b>Author: </b>" + books[i].author + "</p>";
		content += "<p><b>Publisher: </b>" + books[i].publisher + "</p>";
		content += "<p>Edtions: </p><ul>";
		j = 0;
		innerlen = books[i].editions.length;
		while(j < innerlen){
			content += "<li>" + books[i].editions[j].edition + " - " + books[i].editions[j].year + "</li>";
			j++;
		}
		content += "</ul><hr>";
		i++;
	}

	return content;
}
