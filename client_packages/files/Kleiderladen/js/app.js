var masks = "";
var tops = "";
var undershirts = "";
var torsos = "";
var legs = "";
var shoes = "";

var chosenCat;

var chosenMask = [];
var chosenTop = [];
var chosenUndershirt = [];
var chosenTorso = [];
var chosenLeg = [];
var chosenShoe = [];

function setClothingItems(mask, top, undershirt, torso, leg, shoe) {
	if(mask != "")
		masks = mask.split(";");
	
	if(top != "")
		tops = top.split(";");
	
    if(undershirt != "")
		undershirts = undershirt.split(";");
	
	if(torso != "")
		torsos = torso.split(";");

	if(leg != "")
		legs = leg.split(";");

	if(shoe != "")
		shoes = shoe.split(";");
}

// WIE DIE CLOTHINGS AUSSEHEN SOLLEN:
// ID:Name:Preis

function selectCat(slotid) {
	document.getElementById("sidebar").classList.remove("hidden");
	document.getElementById("catbar").classList.remove("hidden");
	var sidebar = document.getElementById("sidebar2");
	var catname = document.getElementById("catname");

    if (slotid == 1) {
		if(chosenCat != 1){
			chosenCat = 1;
			catname.innerHTML = "Masken";
			sidebar.innerHTML = "";
			if(masks != "")
			for (i = 0; i < masks.length; i++) {
				var itemMasks = masks[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`1`, `' + itemMasks[0] + '`, `' + itemMasks[1] + '`, `' + itemMasks[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemMasks[0] + '" class="btn btn-4"><span>' + itemMasks[1] + ' - ' + itemMasks[2] + ' $</span></a>';
			}		
		}
    } else if (slotid == 2) {
		if(chosenCat != 2){
			chosenCat = 2;
			catname.innerHTML = "Oberteile";
			sidebar.innerHTML = "";
						
			if(tops != "")
			for (i = 0; i < tops.length; i++) {
				var itemTops = tops[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`2`, `' + itemTops[0] + '`, `' + itemTops[1] + '`, `' + itemTops[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemTops[0] + '" class="btn btn-4"><span>' + itemTops[1] + ' - ' + itemTops[2] + ' $</span></a>';
			}		
		}
    } else if (slotid == 3) {
		if(chosenCat != 3){
			chosenCat = 3;
			catname.innerHTML = "Unterteil";
			sidebar.innerHTML = "";
			if(undershirts != "")
			for (i = 0; i < undershirts.length; i++) {
				var itemUndershirt = undershirts[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`3`, `' + itemUndershirt[0] + '`, `' + itemUndershirt[1] + '`, `' + itemUndershirt[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemUndershirt[0] + '" class="btn btn-4"><span>' + itemUndershirt[1] + ' - ' + itemUndershirt[2] + ' $</span></a>';
			}		
		}
    } else if (slotid == 5) {
		if(chosenCat != 5){
			chosenCat = 5;
			catname.innerHTML = "Körper";
			sidebar.innerHTML = "";
			if(torsos != "")
			for (i = 0; i < torsos.length; i++) {
				var itemTorsos = torsos[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`5`, `' + itemTorsos[0] + '`, `' + itemTorsos[1] + '`, `' + itemTorsos[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemTorsos[0] + '" class="btn btn-4"><span>' + itemTorsos[1] + ' - ' + itemTorsos[2] + ' $</span></a>';
			}		
		}
    } else if (slotid == 6) {
		if(chosenCat != 6){
			chosenCat = 6;
			catname.innerHTML = "Hosen";
			sidebar.innerHTML = "";
			if(legs != "")
			for (i = 0; i < legs.length; i++) {
				var itemLegs = legs[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`6`, `' + itemLegs[0] + '`, `' + itemLegs[1] + '`, `' + itemLegs[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemLegs[0] + '" class="btn btn-4"><span>' + itemLegs[1] + ' - ' + itemLegs[2] + ' $</span></a>';
			}		
		}
    } else if (slotid == 7) {
		if(chosenCat != 7){
			chosenCat = 7;
			catname.innerHTML = "Schuhe";
			sidebar.innerHTML = "";
			if(shoes != "")
			for (i = 0; i < shoes.length; i++) {
				var itemShoes = shoes[i].split(":");
				sidebar.innerHTML += '<a onclick="selectClothing(`7`, `' + itemShoes[0] + '`, `' + itemShoes[1] + '`, `' + itemShoes[2] + '`);" style="/* margin-left: 6vw; */width: 25vw" id="' + itemShoes[0] + '" class="btn btn-4"><span>' + itemShoes[1] + ' - ' + itemShoes[2] + ' $</span></a>';
			}		
		}
    }
}

let bilanz = 0;

function updateBilanz(){
	bilanz = 0;
	
	if(isNumeric(chosenMask[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenMask[2]);
	}
	
	if(isNumeric(chosenTop[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenTop[2]);
	}
	
	if(isNumeric(chosenUndershirt[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenUndershirt[2]);
	}
	
	if(isNumeric(chosenTorso[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenTorso[2]);
	}
	
	if(isNumeric(chosenLeg[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenLeg[2]);
	}
	
	if(isNumeric(chosenShoe[2])) {
		bilanz = parseInt(bilanz) + parseInt(chosenShoe[2]);
	}
	
	document.getElementById('bilanz').innerHTML = bilanz;
}

function isNumeric( $probe )
{
    return parseFloat( String( $probe ) ) == $probe;
}

function selectClothing(cat, one, two, three){
	if(cat == 1){
		if(isNumeric(chosenMask[0])) {
			document.getElementById(chosenMask[0]).classList.remove("activebutton");
		}
		chosenMask = [one, two, three];
		document.getElementById('choosenmasks').innerHTML =  chosenMask[1] + " | Preis: " + chosenMask[2] + " $";
		document.getElementById(chosenMask[0]).classList.add("activebutton");
		updateBilanz();
		console.log(chosenMask);
		mp.trigger('client:callShopClothing', chosenMask[0]);

	}else if(cat == 2){
		if(isNumeric(chosenTop[0])) {
			document.getElementById(chosenTop[0]).classList.remove("activebutton");
		}
		chosenTop = [one, two, three];
		document.getElementById('choosentops').innerHTML =  chosenTop[1] + " | Preis: " + chosenTop[2] + " $";
		document.getElementById(chosenTop[0]).classList.add("activebutton");
		updateBilanz();
		console.log(chosenTop);
		mp.trigger('client:callShopClothing', chosenTop[0]);

	}else if(cat == 3){
		if(isNumeric(chosenUndershirt[0])) {
			document.getElementById(chosenUndershirt[0]).classList.remove("activebutton");
		}
		chosenUndershirt = [one, two, three];
		document.getElementById('choosenundershirts').innerHTML =  chosenUndershirt[1] + " | Preis: " + chosenUndershirt[2] + " $";
		document.getElementById(chosenUndershirt[0]).classList.add("activebutton");
		updateBilanz();
		console.log(chosenUndershirt);		
		mp.trigger('client:callShopClothing', chosenUndershirt[0]);
	}else if(cat == 5){
		if(isNumeric(chosenTorso[0])) {
			document.getElementById(chosenTorso[0]).classList.remove("activebutton");
		}
		chosenTorso = [one, two, three];
		document.getElementById('choosentorsos').innerHTML =  chosenTorso[1] + " | Preis: " + chosenTorso[2] + " $";
		document.getElementById(chosenTorso[0]).classList.add("activebutton");
		updateBilanz();
		console.log(chosenTorso);		
		mp.trigger('client:callShopClothing', chosenTorso[0]);

	}else if(cat == 6){
		if(isNumeric(chosenLeg[0])) {
			document.getElementById(chosenLeg[0]).classList.remove("activebutton");
		}
		chosenLeg = [one, two, three];
		document.getElementById('choosenlegs').innerHTML =  chosenLeg[1] + " | Preis: " + chosenLeg[2] + " $";
		document.getElementById(chosenLeg[0]).classList.add("activebutton");	
		updateBilanz();
		console.log(chosenLeg);
		mp.trigger('client:callShopClothing', chosenLeg[0]);

	}else if(cat == 7){
		if(isNumeric(chosenShoe[0])) {
			document.getElementById(chosenShoe[0]).classList.remove("activebutton");
		}
		chosenShoe = [one, two, three];
		document.getElementById('choosenshoes').innerHTML =  chosenShoe[1] + " | Preis: " + chosenShoe[2] + " $";
		document.getElementById(chosenShoe[0]).classList.add("activebutton");	
		updateBilanz();
		console.log(chosenShoe);
		mp.trigger('client:callShopClothing', chosenShoe[0]);

	}
}

function buyClothes() {
	
		if(!isNumeric(chosenMask[0])) {
			chosenMask = [0,0,0];
		}
		
		if(!isNumeric(chosenTop[0])) {
			chosenTop = [0,0,0];
		}
		
		if(!isNumeric(chosenUndershirt[0])) {
			chosenUndershirt = [0,0,0];
		}
		
		if(!isNumeric(chosenTorso[0])) {
			chosenTorso = [0,0,0];
		}
		
		if(!isNumeric(chosenLeg[0])) {
			chosenLeg = [0,0,0];
		}
		
		if(!isNumeric(chosenShoe[0])) {
			chosenShoe = [0,0,0];
		}

		mp.trigger('client:buyClothes', chosenMask[0] + ":" + chosenMask[1] + ":" + chosenMask[2], 
				chosenTop[0] + ";" + chosenTop[1] + ";" + chosenTop[2],
				chosenUndershirt[0] + ";" + chosenUndershirt[1] + ";" + chosenUndershirt[2],
				chosenTorso[0] + ";" + chosenTorso[1] + ";" + chosenTorso[2],
				chosenLeg[0] + ";" + chosenLeg[1] + ";" + chosenLeg[2],
				chosenShoe[0] + ";" + chosenShoe[1] + ";" + chosenShoe[2]);
}