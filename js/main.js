(function(Model) {

    Vue.component('map-space', {
        template: "#t_space",
    });

    var app = new Vue({
        el: "#main",

        data: {
            spaces: Model.spaces
        }

    });


})(window.Model || {});