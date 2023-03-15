let clothingBrowser = null;

mp.events.add('client:openKleiderladen', (mask, top, undershirt, torso, leg, shoe) => {
	if(clothingBrowser) return;
	
	clothingBrowser = mp.browsers.new('package://Kleiderladen/index.html');
	mp.gui.cursor.show(true, true);
	setTimeout(function () {
		mp.gui.cursor.show(true, true);
	}, 500);
	mp.gui.chat.activate(false);
	mp.players.local.freezePosition(true);
	mp.gui.chat.show(false);
	
	clothingBrowser.execute(`setClothingItems("` + mask + `", "` + top + `", "` + undershirt + `", "` + torso + `", "` + leg + `", "` + shoe + `");`);
});

mp.events.add('client:closeKleiderladen', () => {	
	clothingBrowser.destroy();
	clothingBrowser = null;
	mp.gui.cursor.show(false, false);
	if(mp.players.local.getVariable('aduty') || mp.players.local.getVariable("togglechat")){
			mp.gui.chat.activate(false);
			mp.gui.chat.show(false);
	}
	mp.players.local.freezePosition(false);
	mp.events.call("customServerEvent", 'server:resetClothes');

});

mp.events.add('client:buyClothes', (mask, top, undershirt, torso, leg, shoe) => {	
	clothingBrowser.destroy();
	clothingBrowser = null;
	mp.gui.cursor.show(false, false);
	if(mp.players.local.getVariable('aduty') || mp.players.local.getVariable("togglechat")){
			mp.gui.chat.activate(false);
			mp.gui.chat.show(false);
	}
	mp.players.local.freezePosition(false);
	mp.events.call("customServerEvent", 'server:buyClothes', mask, top, undershirt, torso, leg, shoe);

});

mp.events.add('client:callShopClothing', (clothingid) => {	
	mp.events.call("customServerEvent", 'server:callShopClothing', clothingid);
});