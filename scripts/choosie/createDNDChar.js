var api;
var storage;

var dndData = {
    classes: [
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard"
    ],
    races: {
        "Earth Pony":   23,
        "Pegasus":      23,
        "Unicorn":      23,
        "Bat Pony":     3,
        "Crystal Pony": 7,
        "Seapony":      4,
        "Zebra":        4,
        "Changeling":   3,
        "Gryphon":      6,
        "Breezie":      4
    },
    subclass: {
        "Barbarian": ["Berserker", "Totem Warrior"],
        "Bard": ["College of Lore", "College of Valor"],
        "Cleric": ["Knowledge", "Life", "Light", "Moon", "Nature", "Tempest", "Trickery", "War"],
        "Druid": ["Circle of the Land", "Circle of the Moon"],
        "Fighter": ["Champion", "Battle Master", "Eldritch Knight"],
        "Monk": ["Way of the Open Hand", "Way of Shadow", "Way of the Four Elements"],
        "Paladin": ["Oath of Devotion", "Oath of the Ancients", "Oath of Vengeance"],
        "Ranger": ["Hunter", "Beast Master"],
        "Rogue": ["Thief", "Assassin", "Arcane Trickster"],
        "Sorcerer": ["Wild Magic", "Draconic Bloodline", "Alicorn Ancestry"],
        "Warlock": ["Archfey Patron", "Fiend Patron", "Great Old One Patron", "Changeling Queen Patron"],
        "Wizard": ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation", ]
    },
    gender: {
        "male": 7,
        "female": 7,
        "trap male": 1,
        "trap female": 1
    },
    alignment: [
        "Lawful Good",
        "Neutral Good",
        "Chaotic Good",
        "Lawful Neutral",
        "True Neutral",
        "Chaotic Neutral",
        "Lawful Evil",
        "Neutral Evil",
        "Chaotic Evil"
    ]
}



// return random array element
function rae(array){
    return array[Math.floor(Math.random() * array.length)];
}

// return random element of a weighted associative array
function rwae(assocArray){
    var tempArray = [];
    var i;
    var item;
    for(item in assocArray){
        for(i = 0; i < assocArray[item]; i++){
            tempArray.push(item);
        }
    }
    return rae(tempArray);
}



function createPoner(ponerType) {
    // init empty character
    var character = {
        class: "",
        subclass: "",
        race: "",
        gender: "",
        alignment: "",
    }

    character.class = rae(dndData.classes);
    character.subclass = rae(dndData.subclass[character.class]); 
    character.race = rwae(dndData.races);
    character.gender = rwae(dndData.gender);
    character.alignment = rae(dndData.alignment);

    var msg =   "You should make a " + character.alignment + " " +
                character.gender + " " + character.race + " who is a " +
                character.subclass + " " + character.class + "!";
    return msg;
}

function command_handler(data){
    if(data.cmd === "dndpone" || data.cmd === "dndpony"){
        var message = createPoner();
        api.Messages.send(data.channelID, message);
    }
}



module.exports = {
    meta_inf: {
        name: "Random D&D Poners",
        version: "1.0.0",
        description: "Make a random D&D Poner",
        author: "Sea",
    },
    load: function (_api, _storage) {
        api = _api;
        storage = _storage;
    },
    start: function () {
		api.Events.on("chatCmd", command_handler);
    },
    stop: function () {
		api.Events.removeListener("chatCmd", command_handler);
    },
}
