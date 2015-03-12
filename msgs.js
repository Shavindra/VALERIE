//IE9+
(function () {
    'use strict';

    function extend(target, source) {
        var a = Object.create(target);
        Object.keys(source).map(function (prop) {
            prop in a && (a[prop] = source[prop]);
        });
        return a;
    };

    // configure the inputs fot check for the following
    var checkFor = {

        text: {
            maxLength: false, // Maximum length of characters
            minLength: false, // Minimum length of characters
            spaces: false, // Spaces in input
            specialChar: false, // Special Chars
            match: false, // Match with another field
            email: [], // Array of objects single or multiple
            empty: false,
            format: false, // Text format types
            pattern: false, // Text format types


        },

        compare: {
            type: false,
            val: false,

        },

        number: {
            minVal: false, // Min Value
            maxVal: false, // Max Value 
            phone: false, // Phone number
            card: false, // Credit Card No
            number: false, // general number            
        },

        dateTime: {
            day: false, // Weekday Monday-Tuesday
            date: false, // Date 
            year: false, // Year
            format: false, // Date format types

        },

        password: {
            minLength: false, // 
            maxLength: false,


        },

        search: {
            maxLength: false, // Maximum length of characters
            minLength: false, // Minimum length of characters
            multiple: false //

        }
    }

    var defaults = {
        checkFor: checkFor,
        selectors: selectors

    };



    var options = {


    };
    
    //
    
    var msgs = {};

    
    msgs.prototype.error = function (){
    
        return 'error messages';
    }
    
    var message = msgs.error();
    
    console.log(message);

    var config = extend(defaults, options);

    console.log(config, defaults);


}());