(function (document, window) {


    var valerie = function (selector) {

        console.log(selector);

    }

    valerie.fn = valerie.prototype = {
        init: function (name) {
            return name + ' goes here';

        },

        options: function (color) {
            console.log(color);
            return color;
        },

        setGender: function (gender) {
            return this;
        }
    }



    window.Valerie = window.Valerie || function (config) {
        return new valerie(config);
    }

})(document, window);

console.log(Valerie('hgfhg').options('gjg'));