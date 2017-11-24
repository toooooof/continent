(function() {

    var Model = {
        spaces: []
    };

    Model.Space = function(x, y, number, symbol) {

        this.addComment = function(txt) {
            this.comment = txt;
        }

        this.addTitle = function(txt) {
            this.title = txt;
        }

        this.export = function() {
            var tab  = [];

            tab.push(x,y);
            tab.push(number);
            tab.push(symbol);
            tab.push(this.title);
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
            s.title = obj[4];
            s.comment = obj[5];
        }

        return s;
    };

    Model.addSpace = function(x, y, number, symbol) {
        this.spaces.push(new Model.Space(x, y, number, symbol));
    }

    Model.width = function() {
        if (this.spaces != undefined && this.spaces.length > 0) {
            var min = max = 0;
            for (var i = 0 ; i < this.spaces.length ; i++) {
                if (this.spaces[i].x < min) min = this.spaces[i].x;
                if (this.spaces[i].x > max) max = this.spaces[i].x;
            }
            return [min, max];
        } else {
            return 0;
        }
    }

    Model.height = function() {
        if (this.spaces != undefined && this.spaces.length > 0) {
            var min = max = 0;
            for (var i = 0 ; i < this.spaces.length ; i++) {
                if (this.spaces[i].y < min) min = this.spaces[i].y;
                if (this.spaces[i].y > max) max = this.spaces[i].y;
            }
            return [min, max]
        } else {
            return 0;
        }
    }

    Model.get = function(x, y) {
        if (this.spaces != undefined && this.spaces.length > 0) {
            for (var i = 0 ; i < this.spaces.length ; i++) {
                if (this.spaces[i].x === x && this.spaces[i].y === y) {
                    return this.spaces[i];
                }
            }
        }

        return undefined;
    }

    window.Model = Model;

})();