class MeteorEmoji {
  constructor() {
    this.initiate();
  }

  initiate() {
    let emojiInputs = document.querySelectorAll('[data-meteor-emoji="true"], [data-meteor-emoji-large="true"]');

    emojiInputs.forEach(element => {
      this.generateElements(element);
    });
  }

  generateElements(emojiInput) {

    let clickLink = event => {
      var caretPos = emojiInput.selectionStart;
      emojiInput.value =
      emojiInput.value.substring(0, caretPos) + " " + event.target.innerHTML + emojiInput.value.substring(caretPos);
      emojiPicker.style.display = "block";

      //trigger ng-change for angular
      if (typeof angular !== "undefined") {
        angular.element(emojiInput).triggerHandler("change");
      }
    };

    let clickCategory = event => {
      var caretPos = emojiInput.selectionStart;
     
      emojiPicker.style.display = "block";

      var hideUls = emojiPicker.querySelectorAll("ul"),
      i = 1,
      l = hideUls.length;

      for (i; i < l; i++) {
          hideUls[i].style.display = "none";
      }

      var backgroundToggle = emojiPicker.querySelectorAll(".category a");

      i = 0,
      l = backgroundToggle.length;

      for (i; i < l; i++) {
          backgroundToggle[i].style.background = "none";
      }
    
      emojiPicker.querySelector("."+event.target.id).style.display = "block";
      emojiPicker.querySelector("#"+event.target.id).style.background = "#111111";

    };

    // emojiInput.style.width = "500px";

    let emojiContainer = document.createElement("div");
    emojiContainer.style.position = "relative";

    let parent = emojiInput.parentNode;
    parent.replaceChild(emojiContainer, emojiInput);
    emojiContainer.appendChild(emojiInput);

    let emojiPicker = document.createElement("div");
    emojiPicker.tabIndex = 0;

    if (emojiInput.hasAttribute("data-meteor-emoji-large")) {
      emojiPicker.style.zIndex = "999";
      emojiPicker.style.display = "block";
      emojiPicker.style.width = "100%";
      emojiPicker.style.marginBottom = "15px";
    } else {
      emojiPicker.style.position = "absolute";
      emojiPicker.style.right = "2px";
      emojiPicker.style.top = "-215px";
      emojiPicker.style.display = "none";
      emojiPicker.style.width = "280px";
      emojiPicker.style.height = "200px";
    }
    emojiPicker.style.zIndex = "999";
    emojiPicker.style.overflow = "auto";
    emojiPicker.style.background = "#888888";
    emojiPicker.style.borderRadius = "5px";
    emojiPicker.style.boxShadow = "0 3px 6px rgba(0,0,0,0.36), 0 3px 6px rgba(0,0,0,0.43)";
    emojiPicker.style.borderRadius = "2px;";
    emojiPicker.style.marginTop = "5px";
    emojiPicker.style.outline = "none";
    emojiPicker.style.overflowY = "scroll";
    emojiPicker.style.opacity = "0.85";
    emojiPicker.classList.add("noneScrollBar");

    let emojiTrigger = document.createElement("a");
    emojiTrigger.style.position = "absolute";
    emojiTrigger.style.top = "14px";
    emojiTrigger.style.right = "12px";
    emojiTrigger.style.textDecoration = "none";
    emojiTrigger.setAttribute("href", "javascript:void(0)");

    emojiTrigger.innerHTML = '<i id="faces" class="fal fa-smile-wink" style="color: #888;"></i>';
    emojiTrigger.onclick = () => {
      if (emojiPicker.style.display === "none") {
        emojiPicker.style.display = "block";
      } else if (emojiPicker.style.display === "block") {
        emojiPicker.style.display = "none";
      }
      emojiPicker.focus();
    };
    
    if (!emojiInput.hasAttribute("data-meteor-emoji-large")) {
      emojiContainer.appendChild(emojiTrigger);
    }


    window.addEventListener('click', function(e){
      if (!emojiInput.hasAttribute("data-meteor-emoji-large")) {
        if (emojiPicker.style.display === "block") {
          if (emojiPicker.contains(e.target) || emojiTrigger.contains(e.target)){

          } else {
            emojiPicker.style.display = "none";
          }

        }
      }
    });


    let facesCategory = document.createElement("ul");
    facesCategory.style.padding = "10px 0px";
    facesCategory.style.margin = "0";
    facesCategory.style.listStyle = "none";
    facesCategory.style.textAlign = "left";
    facesCategory.style.marginLeft = "3%";
    facesCategory.classList.add("faces");

    let animalsCategory = document.createElement("ul");
    animalsCategory.style.padding = "10px 0px";
    animalsCategory.style.margin = "0";
    animalsCategory.style.listStyle = "none";
    animalsCategory.style.textAlign = "left";
    animalsCategory.style.marginLeft = "3%";
    animalsCategory.classList.add("animals");
    animalsCategory.style.display = "none";

    let foodCategory = document.createElement("ul");
    foodCategory.style.padding = "10px 0px";
    foodCategory.style.margin = "0";
    foodCategory.style.listStyle = "none";
    foodCategory.style.textAlign = "left";
    foodCategory.style.marginLeft = "3%";
    foodCategory.classList.add("food2");
    foodCategory.style.display = "none";

    let sportCategory = document.createElement("ul");
    sportCategory.style.padding = "10px 0px";
    sportCategory.style.margin = "0";
    sportCategory.style.listStyle = "none";
    sportCategory.style.textAlign = "left";
    sportCategory.style.marginLeft = "3%";
    sportCategory.classList.add("sport");
    sportCategory.style.display = "none";

    let transportCategory = document.createElement("ul");
    transportCategory.style.padding = "10px 0px";
    transportCategory.style.margin = "0";
    transportCategory.style.listStyle = "none";
    transportCategory.style.textAlign = "left";
    transportCategory.style.marginLeft = "3%";
    transportCategory.classList.add("transport");
    transportCategory.style.display = "none";

    let objectsCategory = document.createElement("ul");
    objectsCategory.style.padding = "10px 0px";
    objectsCategory.style.margin = "0";
    objectsCategory.style.listStyle = "none";
    objectsCategory.style.textAlign = "left";
    objectsCategory.style.marginLeft = "3%";
    objectsCategory.classList.add("objects");
    objectsCategory.style.display = "none";

    let emojiCategory = document.createElement("ul");
    emojiCategory.style.padding = "0px";
    emojiCategory.style.margin = "0";
    emojiCategory.style.display = "table";
    emojiCategory.style.width = "100%";
    emojiCategory.style.background = "#888888";
    emojiCategory.style.listStyle = "none";
    emojiCategory.classList.add("category");


    let emojiCategories = new Array();
    emojiCategories.push({name:'faces',svg:'<i id="faces" class="fal fa-smile-wink" style="color: #fff; font-size: 16px;"></i>'});
    emojiCategories.push({name:'animals', svg: '<i id="animals" class="fad fa-squirrel" style="color: #fff; font-size: 16px;"></i>'});
    emojiCategories.push({name:'food2', svg: '<i id="food2" class="fal fa-sandwich" style="color: #fff; font-size: 16px;"></i>'});
    emojiCategories.push({name:'sport', svg: '<i id="sport" class="fad fa-futbol" style="color: #fff; font-size: 16px;"></i>'});
    emojiCategories.push({name:'transport', svg: '<i id="transport" class="fad fa-dolly" style="color: #fff; font-size: 16px;"></i>'});
    emojiCategories.push({name:'objects', svg: '<i id="objects" class="fad fa-draw-circle" style="color: #fff; font-size: 16px;"></i>'});
    
    let faces = [
       0x1f601,
       0x1f602,
       0x1f603,
       0x1f604,
       0x1f605,
       0x1f606,
       0x1f609,
       0x1f60a,
       0x1f60b,
       0x1f60c,
       0x1f60d,
       0x1f60f,
       0x1f612,
       0x1f613,
       0x1f614,
       0x1f616,
       0x1f618,
       0x1f61a,
       0x1f61c,
       0x1f61d,
       0x1f61e,
       0x1f620,
       0x1f621,
       0x1f622,
       0x1f623,
       0x1f624,
       0x1f625,
       0x1f628,
       0x1f629,
       0x1f62a,
       0x1f62b,
       0x1f62d,
       0x1f630,
       0x1f631,
       0x1f632,
       0x1f633,
       0x1f635,
       0x1f637,
       0x1f638,
       0x1f639,
       0x1f63a,
       0x1f63b,
       0x1f63c,
       0x1f63d,
       0x1f63e,
       0x1f63f,
       0x1f640,
       0x1f645,
       0x1f646,
       0x1f647,
       0x1f648,
       0x1f649,
       0x1f64a,
       0x1f64b,
       0x1f64c,
       0x1f64d,
       0x1f64e,
       0x1f64f,
    ];


    let animals = [
      0x1F40C,
      0x1F40D,
      0x1F40E,
      0x1F411,
      0x1F412,
      0x1F414,
      0x1F417,
      0x1F418,
      0x1F419,
      0x1F41A,
      0x1F41B,
      0x1F41C,
      0x1F41D,
      0x1F41E,
      0x1F41F,
      0x1F420,
      0x1F421,
      0x1F422,
      0x1F423,
      0x1F424,
      0x1F425,
      0x1F426,
      0x1F427,
      0x1F428,
      0x1F429,
      0x1F42B,
      0x1F42C,
      0x1F42D,
      0x1F42E,
      0x1F42F,
      0x1F430,
      0x1F431,
      0x1F432,
      0x1F433,
      0x1F434,
      0x1F435,
      0x1F436,
      0x1F437,
      0x1F438,
      0x1F439,
      0x1F43A,
      0x1F43B,
      0x1F43C,
    ];


    let food2 = [
      0x1F345,
      0x1F346,
      0x1F347,
      0x1F348,
      0x1F349,
      0x1F34A,
      0x1F34C,
      0x1F34D,
      0x1F34E,
      0x1F34F,
      0x1F351,
      0x1F352,
      0x1F353,
      0x1F354,
      0x1F355,
      0x1F356,
      0x1F357,
      0x1F358,
      0x1F35C,
      0x1F35D,
      0x1F35E,
      0x1F35F,
      0x1F360,
      0x1F361,
      0x1F362,
      0x1F363,
      0x1F364,
      0x1F366,
      0x1F368,
      0x1F369,
      0x1F36A,
      0x1F36B,
      0x1F36C,
      0x1F36D,
      0x1F370,
      0x1F372,
      0x1F373,
      0x1F374,
      0x1F377,
      0x1F378,
      0x1F37B,
    ];


    let sport = [
      0x1F3B1,
      0x1F3B3,
      0x1F3BE,
      0x1F3BF,
      0x1F3C0,
      0x1F3C1,
      0x1F3C2,
      0x1F3C3,
      0x1F3C4,
      0x1F3C6,
      0x1F3C8,
      0x1F3CA,
      0x1F6A3,
      0X1F6B4,
      0X1F6B5,
      0X26BD,
      0x26BE,
      0x26FA,
      0x1F3A3,
      0x1F3AF,
      0x26F3,
    ];

    let transport = [
      0x1F681,
      0x1F682,
      0x1F686,
      0x1F688,
      0x1F68A,
      0x1F68D,
      0x1F68E,
      0x1F690,
      0x1F694,
      0x1F696,
      0x1F698,
      0x1F69B,
      0x1F69C,
      0x1F69D,
      0x1F69E,
      0x1F69F,
      0x1F6A0,
      0x1F6A1,
      0x1F680,
      0x1F683,
      0x1F684,
      0x1F685,
      0x1F687,
      0x1F689,
      0x1F68C,
      0x1F691,
      0x1F692,
      0x1F693,
      0x1F695,
      0x1F697,
      0x1F699,
      0x1F69A,
      0x1F6A2,
      0x1F6A4,
      0x1F6B2,
    ];


    let objects = [
      0x1F392,
      0x1F388,
      0x1F389,
      0x1F38F,
      0x1F393,
      0x1F3A1,
      0x1F3A2,
      0x1F3A4,
      0x1F3A5,
      0x1F3A7,
      0x1F3A8,
      0x1F3AB,
      0x1F3AC,
      0x1F3AE,
      0x1F3AF,
      0x1F3B6,
      0x1F3B7,
      0x1F3B8,
      0x1F3B9,
      0x1F3BA,
      0x1F3BB,
      0x1F3BC,
      0x1F3E0,
      0x1F3E5,
      0x1F3EA,
      0x1F493,
      0x1F494,
      0x1F495,
      0x1F496,
      0x1F497,
      0x1F498,
      0x1F4BB,
      0x1F4BA,
      0x1F4C5,
      0x1F4D5,
      0x1F4F7,
    ];


    emojiCategories.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.padding = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.style.display = "table-cell";
      emojiLink.style.textAlign = "center";
      emojiLink.id = String(item['name']);

      if (String(item["name"]) == "faces") {
        emojiLink.style.background = "#111111";
      }
      emojiLink.innerHTML = String(item['svg']);
   
      emojiLink.onmousedown = clickCategory;

      emojiCategory.appendChild(emojiLink);
    });

    faces.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      facesCategory.appendChild(emojiLink);
    });

    animals.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      animalsCategory.appendChild(emojiLink);
    });


    food2.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      foodCategory.appendChild(emojiLink);
    });


    sport.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      sportCategory.appendChild(emojiLink);
    });

    transport.map(item => {
      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      transportCategory.appendChild(emojiLink);
    });

    objects.map(item => {
      let emojiLi = document.createElement("li");
      emojiLi.style.display = "inline-block";
      emojiLi.style.margin = "5px";

      let emojiLink = document.createElement("a");
      emojiLink.style.textDecoration = "none";
      emojiLink.style.margin = "5px";
      emojiLink.style.position = "initial";
      emojiLink.style.fontSize = "24px";
      emojiLink.setAttribute("href", "javascript:void(0)");
      emojiLink.innerHTML = String.fromCodePoint(item);
      emojiLink.onmousedown = clickLink;

      objectsCategory.appendChild(emojiLink);
    });

    emojiPicker.appendChild(emojiCategory);
    emojiPicker.appendChild(facesCategory);
    emojiPicker.appendChild(animalsCategory);
    emojiPicker.appendChild(foodCategory);
    emojiPicker.appendChild(sportCategory);
    emojiPicker.appendChild(transportCategory);
    emojiPicker.appendChild(objectsCategory);
    emojiContainer.appendChild(emojiPicker);
  }
};