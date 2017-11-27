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
        methods: {
            selectSpace: function(event) {
                app.$emit('updateSpace', this.space.x, this.space.y, event.clientX, event.clientY);
            }
        }

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
        props: ['x','y','title','space'],
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
            },
            initSpace: function() {
                if (this.space == undefined) {
                    this.number = undefined;
                    this.resource = 1;
                } else {
                    this.number = this.space.number;
                    this.resource = this.space.symbol;
                }
            }
        },

        /*beforeUpdate: function() {
           this.initSpace();
        },*/

        created: function() {
            this.initSpace();
        },

        /*beforeUpdate: function() {
            if (this.space != undefined && this.x == this.space.x && this.y == this.space.y ) {
                this.number = this.space.number;
            } else {
                this.number = undefined;
            }
        }*/

    });

    var app = new Vue({
        el: "#main",

        data: {
            spaces: Model.spaces,
            myWidth: Model.width(),
            myHeight: Model.height(),

            currentX: 0,
            currentY: 0,
            currentSpace: undefined,

            displayPopin: false,
            titlePopin: "",
            xPopin: -1,
            yPopin: -1,
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
                if (this.displayPopin == false) {
                    this.currentX = x;
                    this.currentY = y;
                    this.xPopin = cX + 10;
                    this.yPopin = cY - 10;
                    this.titlePopin = "Add a new space";
                    this.currentSpace = undefined;
                    this.displayPopin = true;
                } else {
                    this.displayPopin = false;
                }
            });

            this.$on('updateSpace', function (x, y, cX, cY) {
                if (this.displayPopin == false) {
                    this.currentX = x;
                    this.currentY = y;
                    this.xPopin = cX + 10;
                    this.yPopin = cY - 10;
                    this.titlePopin = "Update space";
                    this.currentSpace = Model.get(x, y);
                    this.displayPopin = true;
                } else {
                    this.displayPopin = false;
                }
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