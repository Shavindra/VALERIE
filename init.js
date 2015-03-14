(function (document, window) {


    var Valerie = function () {

};
Valerie.fn = Valerie.prototype = {
    init: function (name) {
        console.log('my name goes here');
        console.log(this);

        return this;

    },

    setColor: function (color) {
        return this;
    },

    setGender: function (gender) {
        return this;
    }
}


var Valerie = new Valerie().init('Bob')


})(document, window);

