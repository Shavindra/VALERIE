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
    var selectors = {

        parent: 'input-',
        
        messages: {
            
            requrired: '.msg-required',
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
        
        
        },
        
        fields: {
            text: '.input-text',
            password: '.input-pwd',
            dateTime: {
                day: '.input-day', // Weekday Monday-Tuesday
                date: '.input-date', // Date 
                year: '.input-year', // Year
                fields: '.input',
            },
            search: '.input-search',
            tel: '.input-tel',
            name: '.input-name',
            radio: '.input-radio',
            checkbox: '.input-checkbox',
            inputGrp: '.input-grp',
            dob: '.input-dob',
            passwords: [{
                orig: '.input-pwd',
                confirm: '.input-confirmPwd',
        }],
            compare: [
                {
                    orig: '',
                    confirm: '',
            },
                {
                    orig: '',
                    confirm: '',
            },


        ],
        }

    }
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



    var config = extend(defaults, options);

    console.log(config, defaults);


}());