var defaultLang = "en";

var WOOD = 0;
var STONE = 1;


function resourceAsTxt(val, lang) {
    if (lang == undefined) lang = defaultLang;
    return RESOURCES[lang][val];
}

var RESOURCES = {
    "en": ["Wood", "Stone"],

    "fr": ["Bois", "Pierre"]
}