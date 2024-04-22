document.getElementById('form').addEventListener('submit', (event) =>
{
    for(let i = 0; i < Accounts.length; i++){
        if(Accounts.acc[i].Email == document.getElementById('email').value){
            if(Accounts.acc[i].Password == document.getElementById('pass').value){
                window.location.href = "../Content/basket.html"
                break;
            }
        }
    }
    window.location.href = "../Content/welcome.html"
});

let Accounts;

window.addEventListener("load", (event) => {
	console.log(window.location.href.substring(0, window.location.href.indexOf('?')) + window.location.search);
	fetch('../../JSON/Accounts.json')
		.then((response) => response.json())
		.then((json) => 
		{
            Accounts = json;
		});
});
document.getElementById('form').onsubmit = function (){
    for(let i = 0; i < Accounts.length; i++){
        if(Accounts.acc[i].Email == document.getElementById('email').value){
            if(Accounts.acc[i].Password == document.getElementById('pass').value){
                window.location.href = "../Content/basket.html"
                break;
            }
        }
    }
    window.location.href = "../Content/welcome.html"
}
