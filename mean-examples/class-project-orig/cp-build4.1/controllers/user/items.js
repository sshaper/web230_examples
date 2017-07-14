module.exports = {
	/* UPDATES THE BOOK LIST AND STORES THE SELECTED BOOKS IN A SESSION*/
	updateBooksList: function(req, res){
		checkSession(req);
		var selectedBooks = req.body.books;
		req.session.books = selectedBooks;
		var bookList = listItemsCheckbox(books, 'books', req.session.books);
		res.render('user/books', {title: "Books Page", heading: "Books Page", nav: true, books: bookList});
	},
	/* GETS THE BOOKS LIST*/
	getBooksList: function(req, res){
		if(req.session.books){
			/* IF THERE IS A SESSION THE DISPLAY ALL BOOKS WITH THE SELECTED BOOKS FROM THE SESSION HAVING THE CHECK BOX CHECKED */
			var bookList = listItemsCheckbox(books, 'books', req.session.books);
			res.render('user/books', {title: "Books Page", heading: "Books Page", nav: true, books: bookList});
		}
		else{
			/* IF THERE IS NO SESSION THEN JUST CREATE THE BOOK LIST WITH THE CHECK BOXES.*/
			var bookList = listItemsCheckbox(books, 'books', '');
			res.render('user/books', {title: "Books Page", heading: "Books Page", nav: true, books: bookList});
		}
		
	},
	/*UPDATEMOVIESLIST AND GETMOVIESLIST WORK THE SAME AS THE CORRESPONDING BOOK FUNCTIONS ABOVE*/
	updateMoviesList: function(req, res){
		checkSession(req);
		var selectedmovies = req.body.movies;
		req.session.movies = selectedmovies;
		var movieList = listItemsCheckbox(movies, 'movies', req.session.movies);
		res.render('user/movies', {title: "Movies Page", heading: "Movies Page", nav: true, movies: movieList});
	},

	getMoviesList: function(req, res){
		if(req.session.movies){
			/* IF THERE IS A SESSION THE DISPLAY ALL MOVIES WITH THE SELECTED MOVIES FROM THE SESSION HAVING THE CHECK BOX CHECKED */
			var movieList = listItemsCheckbox(movies, 'movies', req.session.movies);
			res.render('user/movies', {title: "Movies Page", heading: "Movies Page", nav: true, movies: movieList});
		}
		else{
			/* IF THERE IS NO SESSION THEN JUST CREATE THE movie LIST WITH THE CHECK BOXES.*/
			var movieList = listItemsCheckbox(movies, 'movies', '');
			res.render('user/movies', {title: "Movies Page", heading: "Movies Page", nav: true, movies: movieList});
		}
 	},
}

var books = [
	{"title": "book1", "id": "b1"},
	{"title": "book2", "id": "b2"},
	{"title": "book3", "id": "b3"},
	{"title": "book4", "id": "b4"},
	{"title": "book5", "id": "b5"}
]

var movies = [
	{"title": "movie1", "id": "m1"},
	{"title": "movie2", "id": "m2"},
	{"title": "movie3", "id": "m3"},
	{"title": "movie4", "id": "m4"},
	{"title": "movie5", "id": "m5"}
]

/* IF THERE IS NO SESSION THEN CREATE IT */
function checkSession(req){
	if(!req.session){
		req.session.regenerate(function(err){
            if(err){
                 console.log(err)
            }
       });
	}
}

/* LISTS ALL ITEMS WITH CHECKBOXES*/
function listItemsCheckbox(itemsArray, name, session){
	var i = 0;
	var j = 0;
	var match = false;
	var list = "";
	

	/* IF THERE IS NO SESSION THEN JUST LIST THE ITEM*/
	if(session == ""){
		while(i < itemsArray.length){
			list += '<label><input type="checkbox" name="' + name + '" value="' + itemsArray[i].id + 
			'"> ' + itemsArray[i].title + '</label>';
			i ++;
		}
	}
	else{
		while(i < itemsArray.length){
			/* RESET J AND MATCH */
			j = 0;
			match = false;

			/* LOOP THROUGH ALL THE SELECTED ITEMS FROM THE SESSION AND CHECK THE BOXES FOR THE ITEM THAT WERE SELECTED */
			while(j < session.length){
				/* IF THE ID'S FOR THE ITEMS ARRAY AND THE SESSION ARRAY MATCH THEN THAT ITEM IS SELECTED */
				if(itemsArray[i].id == session[j]){
					list += '<label><input checked="checked" type="checkbox" name="' + name + '" value="' + itemsArray[i].id + '"> ' + itemsArray[i].title + '</label>';
					match = true;
					break;
				}
				j++;
			}
			if(!match){
				list += '<label><input type="checkbox" name="' + name + '" value="' +itemsArray[i].id + '"> ' + itemsArray[i].title + '</label>';
			}

			i++;
		}
	}
	return list;
}



