(function() {

    var Model = {
        spaces: []
    };

    Model.Space = function(x, y, number, symbol) {

        this.addComment = function(txt) {
            this.comment = txt;
        }

        this.export = function() {
            var tab  = [];

            tab.push(x,y);
            tab.push(number);
            tab.push(symbol);
            tab.push(this.comment);

            return tab;
        }

        this.x = x;
        this.y = y;
        this.number = number;
        this.symbol = symbol;

    };

    Model.importSpace = function(obj) {
        var s = new Model.Space();

        if (obj != undefined && obj.length != undefined) {
            s.x = obj[0];
            s.y = obj[1];
            s.number = obj[2];
            s.symbol = obj[3];
            s.comment = obj[4];
        }

        return s;
    };

    Model.addSpace = function(x, y, number, symbol) {
        this.spaces.push(new Model.Space(x, y, number, symbol));
    }

    window.Model = Model;

})();