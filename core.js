// Configs
(function (VALERIE) {


    // Allow creation of methods for VALERIE modules
    // http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
    VALERIE.createNS = function (namespaces) {

        var nsparts = namespaces.split(".");
        var parent = VALERIE;

        // we want to be able to include or exclude the root namespace so we strip
        // it if it's in the namespace
        if (nsparts[0] === "VALERIE" || nsparts[0] === "V" || nsparts === "VA") {
            nsparts = nsparts.slice(1);
        }

        // loop through the parts and create a nested namespace if necessary
        for (var i = 0; i < nsparts.length; i++) {
            var partname = nsparts[i];
            // check if the current parent already has the namespace declared
            // if it isn't, then create it
            if (typeof parent[partname] === "undefined") {
                parent[partname] = {};
            }
            // get a reference to the deepest element in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now constructed with empty namespaces and can be used.
        // we return the outermost namespace
        return parent;

    };
    console.log(VALERIE);

})(window.VALERIE = window.VALERIE || {});

(function (VALERIE) {

    var utilsMethods = "VALERIE.Utils";
    VALERIE.createNS(utilsMethods);

    VALERIE.Utils = {
        extend: function (target, source) {
            var a = Object.create(target);
            Object.keys(source).map(function (prop) {
                prop in a && (a[prop] = source[prop]);
            });
            return a;

        }
    };


})(VALERIE);


(function (VALERIE) {

    var configMethods = "VALERIE.Config.options";
    VALERIE.createNS(configMethods);

    VALERIE.createNS("VALERIE.Config.defaults");

    var utils = VALERIE.Utils,
        config = {};
    config = {
        defaults: {
            id: 234,
            city: 'London',
            Country: 'UK'
        },

        options: function (setOptions) {
            return utils.extend(config.defaults, setOptions);
        }
    };

    VALERIE.Config = config;


})(VALERIE);

var opt1 = {
    id: 234,
    city: 'Barca'

}


var opt2 = {
    id: 58978,
    city: 'NY'

}

var field1 = new VALERIE.Config.options(opt1);

var field2 = new VALERIE.Config.options(opt2);

console.log(field1, field2, VALERIE.Config.defaults);


(function (VALERIE) {

        var Valerie = function () {

            Valerie.prototype.msgs

        })

})(VALERIE);
