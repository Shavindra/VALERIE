(function (document, window, Valerie) {


    var Valerie = function () {

        return
    }

    Valerie.fn = Valerie.prototype = {
        init: function (name) {
            return name + 'goes here';

        },

        setColor: function (color) {
            return this;
        },

        setGender: function (gender) {
            return this;
        }
    }

    var valerie = function() {
        return new Valerie('someting').init('Bob')
    }

    console.log(valerie());

})(document, window, window.Valerie = window.Valerie || function (something) {});