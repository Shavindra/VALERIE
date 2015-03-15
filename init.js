(function (document, window) {


    var valerie = function (selector) {
        console.log(this);
        this.elems = document.querySelectorAll(selector);
        this.config = valerie.prototype.config;

        //        for (var i = 0; i < this.elems.length; i++) {
        //            var elem = this.elems[i];
        //            this.init(elem);
        //
        //        }

    };


    valerie.prototype = {

        utils: {
            extend: function () {
                console.log(this.config);

            },

            setConfig: function (opts) {

                valerie.prototype.config.options = opts

            }

        },

        config: {
            defaults: {
                id: 23423,
                country: 'UK',
                city: 'London'

            }


        },

        init: function (elem) {

            console.log(elem);

        },

    }

    valerie.prototype.validate = function (options) {
        var self = this;

        //        Element.prototype.init = function () {
        //
        //            return self.init();
        //        }

        for (var i = 0; i < this.elems.length; i++) {


            self.init(this.elems[i]);

        };
    }


    window.Valerie = window.Valerie || function (selector) {
        return new valerie(selector);
    }

})(document, window);

window.onload = function () {
    Valerie('.form').validate({
        id: 3234,
        country: 'UK',
        city: 'London'

    });


}