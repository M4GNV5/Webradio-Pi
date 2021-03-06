var currentPage;
var currentContent;
function loadPage(name, obj)
{
	if(currentPage)
		currentPage.setAttribute("class", "");
	currentPage = obj;
	currentPage.setAttribute("class", "active");

	if(currentContent)
		currentContent.setAttribute("class", "hidden");
	currentContent = document.getElementById(name);
	currentContent.setAttribute("class", "");
}

function play(name)
{
	player.play(name);
	updatePlayer();
	loadPage("play", document.getElementById("play-icon"));
}
function stop()
{
	player.stop();
	updatePlayer();
}

var favouriteIndicator = document.getElementById("favourite-indicator");
function toggleFavourite()
{
	if(player.favourites.hasOwnProperty(player.current))
	{
		delete player.favourites[player.current];
		player.unfavor(player.current);
		favouriteIndicator.setAttribute("class", "fa fa-heart-o fa-fw");
	}
	else
	{
		player.favourites[player.current] = player.stations[player.current];
		player.favor(player.current);
		favouriteIndicator.setAttribute("class", "fa fa-heart fa-fw");
	}

	updatePlayer();

	//reload the favourites tab
	displayList(document.getElementById("list-grid"), player.favourites);
}

var image = document.getElementById("play-img");
function updatePlayer()
{
	if(player.stations.hasOwnProperty(player.current))
		image.src = player.stations[player.current].image;
	else
		image.src = "black.png";

	if(player.favourites.hasOwnProperty(player.current))
		favouriteIndicator.setAttribute("class", "fa fa-heart fa-fw");
	else
		favouriteIndicator.setAttribute("class", "fa fa-heart-o fa-fw");
}

function displayList(list, stations)
{
	list.innerHTML = "";

	for(var name in stations)
	{
		list.innerHTML += "<li>" +
			"<a onclick=\"play('" + name + "')\">" +
				"<img class=\"list-img\" src=\"" + stations[name].image + "\" alt=\"" + name + "\" />" +
			"</a>" +
		"</li>";
	}
}

function searchFor(query)
{
	player.search(query, function(err, stations)
	{
		if(err)
			alert(err);
		else
			displayList(document.getElementById("search-grid"), stations);
	});
}

player.init(function(err)
{
	if(err)
		return alert(err);

	//initialize the play tab
	updatePlayer();
	loadPage("play", document.getElementById("play-icon"));

	//initialize the favourites tab
	displayList(document.getElementById("list-grid"), player.favourites);
});

