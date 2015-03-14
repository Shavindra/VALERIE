(function (document, window) {


    var valerie = function (selector) {

        this.elems = document.querySelectorAll(selector);

        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i];
            this.init(elem);
        }

    };

    valerie.prototype = {

        utils: {
            extend: function (target, source) {
                return target;
            }

        },

        config: function (opts) {
            console.log(opts);
            return opts;


        },

        init: function (elem) {
            elem.innerHTML = this.options;


        },

        options: function (opt) {
            var opts = opt
            return opts;
        },

        setGender: function (gender) {
            return this;
        }
    }



    window.Valerie = window.Valerie || function (selector) {
        return new valerie(selector);
    }

})(document, window);

window.onload = function () {
    Valerie('.form').config({
        id: 3234,
        country: 'UK',
        city: 'London'

    });


}