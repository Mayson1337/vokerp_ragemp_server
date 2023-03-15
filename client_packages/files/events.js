let EventList = {};
let eventCode = "AlphaAndKissMeBeidesHurensöhne";
let blackList = ["setInvData", "buyFlagerItem", "server:callClothing", "Server:Funk:Talk", "Server:Voice:SwitchRange", "playAnimation", "stopAnimation", "Server:Funk:ChangeFunkTyp", "server:showProp", "server:buyProp"];
let lastEvent = new Date();

let eventCount = 0;

mp.events.add("setEventCode", (c) => {
    eventCode = c;
    mp.events.call("setEventCode2");
});

function getSecondsDiff(date) {
    var diff = Math.abs(new Date() - new Date(date));
    var seconds = Math.floor((diff / 1000));

    return seconds;
}

mp.events.add("client:successLogin", () => {
    setTimeout(() => {
        setInterval(() => {
            if (eventCount >= 25) {
                mp.events.call("customServerEvent", "kickAC", "Event Spam");
            }
            eventCount = 0;
        }, 5000);
    }, 5000);
});

mp.events.add("customServerEvent", (...args) => {
    try {
        // mp.game.graphics.notify(`callRemoteFirst(${args})`);

        // for (let i = 0; i < args.length; i++) {
        //     args[i] = args[i].toString();
        // }

        // if (getSecondsDiff(lastEvent) < 3) return;

        // mp.game.graphics.notify(`callRemoteSecond(${args})`);

        lastEvent = new Date();

        let ev = args[0];

        args.splice(0, 1);

        if (EventList[ev] == undefined) {
            EventList[ev] = new Date();
            if (args.length > 0) {
                mp.events.callRemote(`${eventCode}_${ev}`, ...args);
                // mp.game.graphics.notify(`${eventCount}_${ev}`);
                eventCount++;
                lastEvent = new Date();
            } else {
                mp.events.callRemote(`${eventCode}_${ev}`);
                // mp.game.graphics.notify(`${eventCount}_${ev}`);
                eventCount++;
                lastEvent = new Date();
            }
        } else {
            if (getSecondsDiff(EventList[ev]) >= 2 || blackList.includes(ev)) {
                EventList[ev] = new Date();

                if (args.length > 0) {
                    mp.events.callRemote(`${eventCode}_${ev}`, ...args);
                    // mp.game.graphics.notify(`${eventCount}_${ev}`);
                    eventCount++;
                    lastEvent = new Date();
                } else {
                    mp.events.callRemote(`${eventCode}_${ev}`);
                    // mp.game.graphics.notify(`${eventCount}_${ev}`);
                    eventCount++;

                    lastEvent = new Date();
                }
            }
        }

    } catch (err) {
        mp.game.graphics.notify(`callRemote Error(${err})`);
    }
});