let Game;
window.addEventListener("load", (event) =>{
    fetch('../JSON/Games/' + getQueryParam('q').replace(/ /g,"_").toUpperCase() + '.json').then((response) => {
        if(response.ok){
            return response.json();
        }
        return null;
    })
    .then((json) => 
    {
        Game = json;
        document.getElementById('title').textContent = Game? Game.Name : 'N/A';
        document.body.style.backgroundImage =  Game? "url('"+ Game.img +"')" : "https://placehold.it/150x80?text=IMAGE";
        document.getElementById('displayImage').style.backgroundImage = Game? "url('"+ Game.displayImage +"')" : "https://placehold.it/150x80?text=IMAGE";
        if(Game){
            SwitchGameType(Game.defaultGameType);
            //reloadGraph();
            document.getElementById('displayName').textContent = Game.Name;
            document.getElementById('DescriptionBox').textContent = Game.description;

            ConstructPlatformButtons();
        }
        console.log(json);
    });
});
function SwitchGameType(NewgameType){
    var price;
    var currentPlatform;
    var graph;
    switch (NewgameType) {
        case 0:
            price = Game.Price.Computer;	
            currentPlatform = 'PC';	
            if(hasClass(document.body, 'Xbox_selected')){
                document.body.classList.remove('Xbox_selected');
            }
            if(hasClass(document.body, 'Playstation_selected')){
                document.body.classList.remove('Playstation_selected');
            }
            if(hasClass(document.body, 'Nintendo_selected')){
                document.body.classList.remove('Nintendo_selected');
            }
            document.body.classList.add('PC_selected');	
            graph = Game.Graph.Computer? Game.Graph.Computer : "https://placehold.it/150x80?text=IMAGE";				
            break;
        case 1:
            price = Game.Price.Xbox;
            currentPlatform = 'Xbox';
            if(hasClass(document.body, 'PC_selected')){
                document.body.classList.remove('PC_selected');
            }
            if(hasClass(document.body, 'Playstation_selected')){
                document.body.classList.remove('Playstation_selected');
            }
            if(hasClass(document.body, 'Nintendo_selected')){
                document.body.classList.remove('Nintendo_selected');
            }
            document.body.classList.add('Xbox_selected');	
            graph= Game.Graph.Xbox? Game.Graph.Xbox : "https://placehold.it/150x80?text=IMAGE";							
            break;
        case 2:
            price = Game.Price.Playstation;		
            currentPlatform = 'Playstation';
            if(hasClass(document.body, 'PC_selected')){
                document.body.classList.remove('PC_selected');
            }
            if(hasClass(document.body, 'Xbox_selected')){
                document.body.classList.remove('Xbox_selected');
            }
            if(hasClass(document.body, 'Nintendo_selected')){
                document.body.classList.remove('Nintendo_selected');
            }
            document.body.classList.add('Playstation_selected');	
            graph = Game.Graph.Playstation? Game.Graph.Playstation : "https://placehold.it/150x80?text=IMAGE";			
            break;
        case 3:
            price = Game.Price.Nintendo;
            currentPlatform = 'Nintendo';
            if(hasClass(document.body, 'PC_selected')){
                document.body.classList.remove('PC_selected');
            }
            if(hasClass(document.body, 'Xbox_selected')){
                document.body.classList.remove('Xbox_selected');
            }
            if(hasClass(document.body, 'Playstation_selected')){
                document.body.classList.remove('Playstation_selected');
            }
            document.body.classList.add('Nintendo_selected');	
            graph = Game.Graph.Nintendo? Game.Graph.Nintendo : "https://placehold.it/150x80?text=IMAGE";							
            break;
        default:
            price = Game.Price.Computer;
            currentPlatform = 'PC';
            graphc = "https://placehold.it/150x80?text=IMAGE";
            break;
    }
    document.getElementById('PriceHolder').textContent = price;
    document.getElementById('CurrentGameType').textContent = currentPlatform;
    document.getElementById('graphHistory').src = graph
    //FrameGraph();
}


function ConstructPlatformButtons(){
    const master = document.getElementById('PlatformButtonHolder');

    if(Game.Platforms.Computer == 'y'){
        var element = CreateButton("PC", 0);
        master.appendChild(element);
    }
    if(Game.Platforms.Playstation == 'y'){
        var element = CreateButton("Playstation", 2);
        master.appendChild(element);
    }
    if(Game.Platforms.Xbox == 'y'){
        var element = CreateButton("Xbox", 1);
        master.appendChild(element);
    }
    if(Game.Platforms.Nintendo == 'y'){
        var element = CreateButton("Nintendo", 3);
        master.appendChild(element);
    }

}

function CreateButton(Button, indexer){
    var button = document.createElement('div');
    button.classList.add('v1_28', Button + '_plaform');
        
        var container = document.createElement('div');
        container.classList.add('v1_25', Button + '_plaform');
            
            var name = document.createElement('span');
            name.classList.add('v1_26', Button + '_plaform');
                var nameTxt = document.createTextNode(Button);
                name.appendChild(nameTxt);
            
            var breakElement = document.createElement('br');

            var price = document.createElement('span');
            price.classList.add('v1_27', Button + '_plaform');
                var amount;
                switch (indexer) {
                    case 0:
                        amount = Game.Price.Computer;						
                        break;
                    case 1:
                        amount = Game.Price.Xbox;							
                        break;
                    case 2:
                        amount = Game.Price.Playstation;						
                        break;
                    case 3:
                        amount = Game.Price.Nintendo;						
                        break;
                    default:
                        amount = Game.Price.Computer;
                        break;
                }
                var priceTxt = document.createTextNode(amount)
                price.appendChild(priceTxt);
            
            container.appendChild(name);
            container.appendChild(breakElement);
            container.appendChild(price);

        button.appendChild(container);
    
    return button;
}

document.onclick = function (e){
    if(hasClass(e.target, 'PC_plaform')){
        SwitchGameType(0);
    }
    else if(hasClass(e.target, 'Xbox_plaform')){
        SwitchGameType(1);
    }
    else if(hasClass(e.target, 'Playstation_plaform')){
        SwitchGameType(2);
    }
    else if(hasClass(e.target, 'Nintendo_plaform')){
        SwitchGameType(3);
    }
}

