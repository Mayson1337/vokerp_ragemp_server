var webView = mp.browsers.new('package://files/xmenu/webView.html');
var inXMenu = false;
var disableAllControl = false;
let xMenuActive = false;
var circeMenuActive = false;

// CircleMenu

class Raycast {
	constructor() {
		this.camera = mp.cameras.new("gameplay");
	}

	getCameraHitCoord() {
		let position = this.camera.getCoord();
		let direction = this.camera.getDirection();
		let farAway = new mp.Vector3(direction.x * 12 + position.x, direction.y * 12 + position.y, direction.z * 12 + position.z);
		let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);

		if (hitData != undefined) {
			return hitData;
		}
		return null;
	}

	createRaycast() {
		let obj = this.getCameraHitCoord();
		if (obj != null) {
			if (obj.entity == null || obj.entity == undefined) return null;
			if (obj.entity.handle == null || obj.entity.handle == undefined) return null;

			let entityCheck = mp.game.entity.isAnEntity(obj.entity.handle);
			if (entityCheck) {
				return obj;
			}

			return null;
		}
		return null;
	}
}

const rc = new Raycast();

function closeCircleMenu() {
	if (circeMenuActive) {
		mp.gui.cursor.visible = false;
		circeMenuActive = false;
		webView.execute('closeCircleMenu();');
	}
}

function openCirlceMenu(menukey, menudata) {
	mp.gui.cursor.visible = true;
	circeMenuActive = true;
	webView.execute(`openCircleMenu('${menukey}', '${menudata}');`);
}

mp.events.add("openCircleMenu", (...args) => {
	openCirlceMenu(...args);
});

function getDistance(pos1, pos2) {
	return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, true);
}

mp.keys.bind(0x4E, true, () => {

	if (xMenuActive || mp.gui.cursor.visible || mp.players.local.vehicle) {
      return;
    };

     mp.events.call("openCircleMenu", 'AnimMenu', JSON.stringify({
		'Anim1': {
			title: 'Abbrechen',
			desc: 'Bricht Animation ab',
			'image': 'close'
		},

		'Anim2': {
			title: 'Security',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim3': {
			title: 'Arme verschränkt',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim4': {
			title: 'Wand anlehnen',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim5': {
			title: 'Hinlegen',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim6': {
			title: 'Daumen hoch',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim7': {
			title: 'Ergeben',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim8': {
			title: 'Arme an Gürtel',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim9': {
			title: 'Klatschen',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim10': {
			title: 'Salutieren',
			desc: 'Animation abspielen',
			'image': 'info'
		},
		'Anim11': {
			title: 'Rauchen',
			desc: 'Animation abspielen',
			'image': 'info'
		},

		
	 }));
})

mp.keys.bind(0x4E, false, function () {
	closeCircleMenu();
});

mp.events.add("selectedItem_AnimMenu", (itemkey) => {
    switch (itemkey) {
        case 'Anim1':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 0);
            break;
        case 'Anim2':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 1);
            break;
		case 'Anim3':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 2);
            break;
		case 'Anim4':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 3);
            break;
		case 'Anim5':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 4);
            break;
		case 'Anim6':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 7);
            break;
		case 'Anim7':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 9);
            break;
		case 'Anim8':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 12);
            break;
		case 'Anim9':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 14);
            break;
		case 'Anim10':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 18);
            break;
		case 'Anim11':
            mp.events.call("customServerEvent", "server:playAnimationCircle", 22);
            break;			
    }
});
mp.keys.bind(0x58, true, function () {
	//Raycast
	if (xMenuActive) {
      return;
    }
  
	if (mp.players.local.getVariable("gefesselt")) {
		mp.events.call("openCircleMenu", 'cantInteract', JSON.stringify({
			'close': {
				title: 'Schließen',
				desc: 'Schließt das Menü',
				'image': 'close'
			}
		}));
	} else {
		if (mp.players.local.vehicle) {
			mp.events.call("getRaycast", "vehicleInside", mp.players.local.vehicle);
		} else {
			let obj = rc.createRaycast();

			if (obj != null) {
				let distance = getDistance(mp.players.local.position, obj.position);

				if (obj.entity.isAVehicle()) {
					if (!distance || distance < 0 || distance > 3) {
						return;
					}
					mp.events.call("getRaycast", "vehicleOutside", obj.entity);
				} else if (obj.entity.isAPed()) {
					if (!distance || distance < 0 || distance > 2) {
						return;
					}

					mp.events.call("getRaycast", "player", obj.entity);
				}
			}
		}
	}
});

mp.keys.bind(0x58, false, function () {
	closeCircleMenu();
});

mp.events.add('selectedItem_vehicleOutsideMenu', (item, value) => {
  mp.gui.chat.push("triggger");
  switch(item) {
    case "carinfo":
      mp.events.callRemote('server:getInfoAboutCar', value);
  };
});

mp.events.add("getRaycast", (type, entity) => {
  mp.gui.chat.push(type);

  if (type == "player") {

    let menuItem = {};

    lastPlayer = entity;

    menuItem['close'] = {
      title: 'Schließen',
      desc: 'Schließt das Menü',
      'image': 'close'
    };

    menuItem['givemoney'] = {
      title: 'Geld geben',
      desc: 'Gebe dem Spieler Geld',
      'image': 'givemoney'
    };

    if (entity.getVariable("isDead") != true) {
      menuItem['tieup'] = {
        title: 'Fesseln',
        desc: 'Fesselt den Spieler wenn du ein Seil hast',
        'image': 'tieup'
      };
      if (entity.getVariable("gefesselt") == true) {
        // menuItem['changetieup'] = {
        //     title: 'Fesseln umlegen',
        //     desc: 'Legt die Fesseln nach Vorne/Hinten',
        //     'image': 'changetieup'
        // };
      }
    }

    // menuItem['giveitem'] = {
    //     title: 'Item geben',
    //     desc: 'Gebe dem Spieler Items',
    //     'image': 'giveitem'
    // };

    menuItem['showidcard'] = {
      title: 'Personalausweis zeigen',
      desc: 'Zeigt dem Spieler deinem Personalausweis',
      'image': 'idcard'
    };

    if (mp.players.local.getVariable("frakMedic") == true && entity.getVariable("isDead") == true && entity.getVariable("faction_") == mp.players.local.getVariable("faction")) {
      menuItem['stabilize'] = {
        title: 'Person Stabilisieren',
        desc: 'Stabilisiert die Person',
        'image': 'stabilize'
      };
    }

    if (entity.getVariable("gefesselt") == true || entity.getVariable("dead") == true) {
      menuItem['search'] = {
        title: 'Durchsuchen',
        desc: 'Durchsuche den Spieler',
        'image': 'search'
      };
      menuItem['getidcard'] = {
        title: 'Personalausweis nehmen',
        desc: 'Nehme den Personalausweis des Spielers',
        'image': 'getidcard'
      };
    }

    mp.events.call("openCircleMenu", 'playerMenu', JSON.stringify(menuItem));
  } else if (type == "vehicleInside") {
    let menuItem = {};

    veh = entity;

    menuItem['close'] = {
      title: 'Schließen',
      desc: 'Schließt das Menü',
      'image': 'close'
    };

    menuItem['motor'] = {
      title: 'Motor',
      desc: 'Motor starten/stoppen',
      'image': 'engine-stop'
    };
    mp.events.call("openCircleMenu", 'vehicleInsideMenu', JSON.stringify(menuItem));
  } else if (type == "vehicleOutside") {
    let menuItem = {};

    veh = entity;

    menuItem['close'] = {
      title: 'Schließen',
      desc: 'Schließt das Menü',
      'image': 'close'
    };

    menuItem['carinfo'] = {
      title: 'Information',
      desc: 'Mehr Informationen über das Fahrzeug',
      'image': 'info'
    };
    mp.events.call("openCircleMenu", 'vehicleOutsideMenu', JSON.stringify(menuItem));
  }
});

