(function(Model) {

    Vue.component('map-space', {
        template: "#t_space",
        props: ['space'],
        computed: {
            resource: function() {
                if (this.space.symbol != undefined) {
                    return resourceAsTxt(this.space.symbol);
                }
                return undefined;
            }
        },

    });

    Vue.component('empty-space', {
        template: "#t_empty_space",
        props: ['x', 'y'],

        methods: {
            selectSpace: function(event) {
                app.$emit('createSpace', this.x, this.y, event.clientX, event.clientY);
            }
        }
    });

    Vue.component('main-popin', {
        template: "#t_popin",
        props: ['x', 'y','title'],
        data: function() {
            return {
                number: undefined,
                resource: 1,
                warningMessage: ""
            }
        },

        computed: {
            getCssPosition: function() {
                return 'top:' + this.y + "px;left:" + this.x + 'px';
            }
        },

        methods: {
            validate: function() {
                if (this.number != undefined && this.number.length == 3) {
                    app.$emit('createSpaceValidation', this.number, this.resource);
                } else {
                    this.warningMessage = "Not a valid card number"
                }
            },
            close: function() {
                app.$emit('closePopin');
            }
        }

    });

    var app = new Vue({
        el: "#main",

        data: {
            spaces: Model.spaces,
            myWidth: Model.width(),
            myHeight: Model.height(),

            currentX: 0,
            currentY: 0,

            displayPopin: false,
            titlePopin: "",
            xPopin: -1,
            yPopin: -1
        },

        computed: {
            width: function() {
                var w = this.myWidth;
                if (w != 0) {
                    var res = [];
                    for (var i = w[0]-1 ; i <= w[1]+1 ; i++) {
                        res.push(i);
                    }
                    return res;
                }
                return [];
            },
            height: function() {
                var w = this.myHeight;
                if (w != 0) {
                    var res = [];
                    for (var i = w[0]-1 ; i <= w[1]+1 ; i++) {
                        res.push(i);
                    }
                    return res;
                }
                return [];
            },
        },

        methods: {
            getSpace: function(x, y) {
                return Model.get(x,y);
            },
        },

        created : function() {
            this.$on('createSpace', function createSpace(x, y, cX, cY) {
                this.currentX = x;
                this.currentY = y;
                this.xPopin = cX + 10;
                this.yPopin = cY - 10;
                this.titlePopin = "Add a new space";
                this.displayPopin = true;
            });

            this.$on('closePopin', function() {
                this.displayPopin = false;
            });

            this.$on('createSpaceValidation', function(nb, res) {
                Model.addSpace(this.currentX, this.currentY, nb, res);
                this.myWidth = Model.width();
                this.myHeight = Model.height();
                this.displayPopin = false;
            });
        }

    });


})(window.Model || {});