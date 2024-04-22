window.addEventListener('URLChange', function (event) {
	// The URL changed...
	console.log("url changes ");
	DeleteChildren();
	//fetch('../JSON/AllGames.json')
	//	.then((response) => response.json())
	//	.then((json) => 
	//	{
			//AvailableGames = json.Games;
			var filterdList = filterList(AvailableGames);
			
			ConstructContainers(filterdList);
	//	});

});

var AvailableGames;
const ContentHolder = document.getElementById("Content");
var GameType;
window.addEventListener("load", (event) => {
	console.log(window.location.href.substring(0, window.location.href.indexOf('?')) + window.location.search);
	fetch('../JSON/AllGames.json')
		.then((response) => response.json())
		.then((json) => 
		{
			AvailableGames = json.Games;
			var filterdList = filterList(AvailableGames);
			
			ConstructContainers(filterdList);
		});
});

function DeleteChildren(){
	//for(let i = 0; i < ContentHolder.childElementCount; i++){
	//	ContentHolder.childNodes[i].remove();
	//}
	while(ContentHolder.lastChild){
		ContentHolder.removeChild(ContentHolder.lastChild);
	}
}

function filterList(listOfGames){
	if(getQueryParam('q') == ''){
		console.log("returning");
		return listOfGames
	}
	let query = getQueryParam('q').toUpperCase();
	var filteredList = [];
	for(let i = 0; i < listOfGames.length; i++){
		if(listOfGames[i].Name.toUpperCase().indexOf(query) == 0){
			if(filteredList.includes(listOfGames[i]) == false){
				filteredList.push(listOfGames[i]);
				GameType = 0;
			}
		}
	}
	for(let i = 0; i < listOfGames.length; i++){
		if(query.indexOf('PC') > -1 && listOfGames[i].Platforms.Computer.indexOf('y') > -1){
			if(filteredList.includes(listOfGames[i]) == false){
				filteredList.push(listOfGames[i]);
			}
		}
		else if(query.indexOf('XBOX') > -1 && listOfGames[i].Platforms.Xbox == 'y'){
			if(filteredList.includes(listOfGames[i]) == false){
				filteredList.push(listOfGames[i]);
				GameType = 1;
			}
		}
		else if(query.indexOf('PLAYSTATION') > -1 && listOfGames[i].Platforms.Playstation == 'y'){
			if(filteredList.includes(listOfGames[i]) == false){
				filteredList.push(listOfGames[i]);
				GameType = 2;
			}
		}
		else if(query.indexOf('NINTENDO') > -1 && listOfGames[i].Platforms.Nintendo == 'y'){
			if(filteredList.includes(listOfGames[i]) == false){
				filteredList.push(listOfGames[i]);
				GameType = 3;
			}
		}
	}

	return filteredList;
	
}

function CreateAddingContainer(){
	AddingContainer = document.createElement("div");
	AddingContainer.classList.add("row", "Adding");
	ContentHolder.append(AddingContainer);
	return AddingContainer;
}

function ConstructContainers(listGames){
	let max;
	let childCount = ContentHolder.childElementCount;
	let AddingContainer = null;
	if(listGames.length > 15){
		max = 15;
	}
	else{
		max = listGames.length;
	}

	for (let i = 0; i < childCount; i++) {
        if (hasClass(ContentHolder.childNodes[i], "Adding")) {
            AddingContainer = ContentHolder.childNodes[i];
            break;
        }
    }
	if(AddingContainer == null){
		AddingContainer = CreateAddingContainer();
	}

	for (let index = 0; index < max; index++) {
		var element = listGames[index];

		const column = document.createElement("a");
		column.classList.add("col-sm-4");
		column.href = "Game.html?q=" + listGames[index].Name;

			const imagePane = document.createElement("div");
			imagePane.classList.add("ImagePaneBlur");

			const PrimaryPannel = document.createElement("div");
			PrimaryPannel.classList.add("panel", "panel-primary");

				const body = document.createElement("div");
				body.classList.add("panel-body");

					const image = document.createElement("img");
					image.classList.add("img-responsive");
					image.src = listGames[index].thumbnail;
					image.style = "width:100%";
					body.appendChild(image);

				const heading = document.createElement("div");
				heading.classList.add("panel-heading");
					const headingNode = document.createTextNode(element.Name);
					heading.appendChild(headingNode);

				const footer = document.createElement("div");
				footer.classList.add("panel-footer");
					var price;
					switch (GameType) {
						case 0:
							price = element.Price.Computer;							
							break;
						case 1:
							price = element.Price.Xbox;							
							break;
						case 2:
							price = element.Price.Playstation;							
							break;
						case 3:
							price = element.Price.Nintendo;							
							break;
						default:
							price = element.Price.Computer;
							break;
					}
					const footerNode = document.createTextNode(price);
					footer.appendChild(footerNode);
				
				PrimaryPannel.appendChild(body);
				PrimaryPannel.appendChild(heading);
				PrimaryPannel.appendChild(footer);

			column.appendChild(imagePane);
			column.appendChild(PrimaryPannel);
		AddingContainer.appendChild(column);

		if(AddingContainer.childElementCount >= 3){
			AddingContainer.classList.remove('Adding');
			AddingContainer = null;
			AddingContainer = CreateAddingContainer();
		}
	}
}