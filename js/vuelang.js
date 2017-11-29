(function () {

    Vue.mixin({
        methods: {
            label: function(key) {
                if (translations != undefined && defaultLang != undefined && translations[defaultLang] != undefined) {
                    return translations[defaultLang][key];
                } else {
                    return undefined;
                }
            }
        }
    });

})();