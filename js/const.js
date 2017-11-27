var defaultLang = "en";

var EMPTY = 0;
var WOOD = 1;
var STONE = 2;


function resourceAsTxt(val, lang) {
    if (lang == undefined) lang = defaultLang;
    return RESOURCES[lang][val];
}

var RESOURCES = {
    "en": ["Empty", "Wood", "Stone"],

    "fr": ["Vide", "Bois", "Pierre"]
}