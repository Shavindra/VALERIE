/**
 * Author: Terence Tai
 */

/**
 * City Index Live Prices 
 */

; (function ($, window, document, undefined) {

    // Constructor
    var LivePrices = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;

        this.marketApi = this.$elem.data("marketApi");
        this.marketId = this.$elem.data("marketId");
        this.pricesTimer = null;
        this.priceIndex = 0;
    };

    // the plugin prototype
    LivePrices.prototype = {
        defaults: {
            marketData: null, // Allow to insert RAW JSON data without passing in API URL
            marketTradeLinkUrl: "http://www.cityindex.co.uk/log-in.aspx",
            tradeButtonTextPrefix: "Trade ",
            InitialDepositTextPrefix: "Initial deposit: ",
            loadingMessage: "Loading...",
            customErrorMessage: "Live Prices are currently unavailable.",
            pricesDuration: 10,
            pricesFromMinutesAgo: 10,
            pricesUpdateInterval: 1000,
            apiConnectionTimeout: 5000,
            onComplete: null
        },

        init: function () {
            var self = this;
            this.config = $.extend({}, this.defaults, this.options);
            $.when(this.getMarketData()).done(function () {
                self.showMarketInfo()
            });
            return this;
        },

        getMarketData: function() {
            var self = this;
            if (self.config.marketData == null) { // no raw JSON marketData available then only fallback to WebApi ajax request
                self.$elem.append('<div class="loading">' + self.config.loadingMessage + '</div>');
                return $.ajax({
                    type: 'GET',
                    url: self.marketApi + self.marketId + '&durationInMinutes=' + self.config.pricesFromMinutesAgo + '&upToMinutesAgo=' + self.config.pricesDuration,
                    dataType: "json",
                    crossDomain: true,
                    timeout: self.config.apiConnectionTimeout,
                    success: function (data) {
                        self.config.marketData = data;
                        self.$elem.find('.loading').fadeOut(function () { $(this).remove(); });
                    },
                    error: function (parsedjson, textStatus, errorThrown) {
                        self.$elem.find('.loading').remove();
                        self.$elem.hide();
                        console.log(self.config.customErrorMessage);
                        console.log("parsedJson: " + JSON.stringify(parsedjson));
                    }
                });
            }
            return true;
        },

        showMarketInfo: function () {
            var marketName = this.config.marketData.Name.replace("CFD", ""); // remove the CFD words from CFD
            this.$elem.find('.ciMarketName').html(marketName);
            var priceChangeCssClass = 'change-up';
            var priceChangePercent = this.config.marketData.DailyPriceChangePercentage;
            if (priceChangePercent < 0) {
                priceChangeCssClass = 'change-down';
            }
            this.$elem.find('.ciMarketChange').addClass(priceChangeCssClass);
            this.$elem.find('.ciMarketChange').html(this.config.marketData.DailyPriceChangePercentage.toFixed(1) + '%');
            this.$elem.find('.ciInitialDeposit').html(this.config.InitialDepositTextPrefix + ' ' +  this.config.marketData.MarginFactor + '%');
            this.$elem.find('.ciTradeButton').html(this.config.tradeButtonTextPrefix + ' ' + marketName);
            $('a[rel="ciTradeUrl"]').attr("href", this.config.marketTradeLinkUrl);

            // Setup Donut Chart
            this.$elem.find('.ciDonut').data('ciMarketPercent', this.config.marketData.Percentage);
            this.$elem.find('.ciDonut').data('ciMarketType', this.config.marketData.Type);
            this.$elem.find('.ciDonut').ciDonut();

            if (this.config.marketData.HistoricPriceTicks.length > 0) {
                var date = this.config.marketData.HistoricPriceTicks[0].TickDate; // avoid using new Date(this.config.marketData.HistoricPriceTicks[0].TickDate) as it will not works for IE7/8
                priceDate = new Date(date.substr(0, 4), parseInt(date.substr(5, 2)) - 1, date.substr(8, 2), date.substr(11, 2), date.substr(14, 2), date.substr(17, 2), date.substr(20, 3)); // Safer way to parse the date for older browser. Month value is in Index so start from zero
                this.$elem.find('.ciPriceDate').html('<p>' + priceDate.format('dddd, dd MMMM yyyy') + ' - <span>' + priceDate.format('h:mm tt') + '</span></p>')
                this.pricesTimer = setInterval($.proxy(this.showPrices, this), this.config.pricesUpdateInterval);
            }
            if (this.config.onComplete != null)
                this.config.onComplete.call(this.$elem);
        },

        showPrices: function () {
            this.$elem.find('.ciMarketPriceSell').html(this.config.marketData.HistoricPriceTicks[this.priceIndex].Sell.toFixed(2));
            this.$elem.find('.ciMarketPriceBuy').html(this.config.marketData.HistoricPriceTicks[this.priceIndex].Buy.toFixed(2));
            if (this.priceIndex < this.config.marketData.HistoricPriceTicks.length - 1) {
                this.priceIndex++;
            }
        }
    }

    LivePrices.defaults = LivePrices.prototype.defaults;

    $.fn.livePrices = function (options) {
        return this.each(function () {
            new LivePrices(this, options).init();
        });
    };

})(jQuery, window, document);


/**
 * City Index Market Sentiment Donut Chart
 */

; (function ($, window, document, undefined) {

    // Constructor
    var CiDonut = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;

        this.marketPercent = this.$elem.data("ciMarketPercent");
        this.marketType = this.$elem.data("ciMarketType");
        this.donutTimer = null;
        this.counter = 0;
    };

    // the plugin prototype
    CiDonut.prototype = {
        defaults: {
            animateSpeed: 600
        },

        init: function () {
            this.config = $.extend({}, this.defaults, this.options);
            var donutType = this.getDonutType(this.marketType, this.marketPercent); // Based on percent/marketType to find out the DonutType - Long/Short/Both
            this.$elem.addClass(donutType);

            if ($('.ie7, .ie8').length > 0) { // if IE7/8 fall back to image donut instead of CSS3
                this.$elem.find('.donut').css('background', 'url(/WebAssets/img/ci-uk/contents/live-prices/' + donutType + '-' + this.getRoundedPercent(this.marketPercent) + '.jpg) no-repeat');
                this.$elem.find('.ciMarketPercent').html(parseInt(this.marketPercent) + '%');
                return this;
            }

            var self = this;
            if (donutType == "donut-long-short") {
                this.$elem.find('.donut-nofill').delay(400).animate({ 0: this.marketPercent }, {
                    step: function (now) {
                        $(this).css('clip', 'rect(0, 130px, ' + (130 * 2 * now / 100) + 'px, 0)');
                        self.$elem.find('.ciMarketPercent').html(parseInt(now) + '%');
                    },
                    duration: self.config.animateSpeed
                });
            }
            else {
                this.$elem.find('.donut-fill').delay(400).animate({ 0: this.marketPercent }, {
                    step: function (now) {
                        if (now > 50) {
                            self.$elem.find('.donut').addClass('over-50');
                        }
                        $(this).css('transform', 'rotate(' + self.getRotateDeg(self.marketType, now) + 'deg)');
                        self.$elem.find('.ciMarketPercent').html(parseInt(now) + '%');
                    },
                    duration: self.config.animateSpeed
                });
            }
            if ($('.light-effect').length > 0)
                setInterval(this.showLightEffect, 5000);
            return this;
        },

        getDonutType: function (marketType, marketPercent) {
            if (marketPercent == 50) {
                return 'donut-long-short';
            }
            else if (marketType.toLowerCase() == 'buy') {
                return 'donut-long';
            }
            return 'donut-short'
        },

        getRoundedPercent: function (marketPercent) {
            if (marketPercent > 90)
                return Math.floor(marketPercent / 10) * 10;
            return Math.ceil(marketPercent / 10) * 10;
        },

        getRotateDeg: function (marketType, counter) {
            if (marketType.toLowerCase() == 'buy') {
                return 180 - (360 * counter / 100);
            }
            return 360 * counter / 100;
        },

        showLightEffect: function () {
            var startLeft = -Math.abs(($('.light-effect').parent().width())/2);
            if (startLeft == parseInt($('.light-effect').css('left')))
                $('.light-effect').show(function () {
                    $(this).css('left', parseInt($('.light-effect').parent().width()) + parseInt($('.light-effect').width()));
                });
            else
                $('.light-effect').hide(function () {
                    $(this).css('left', startLeft);
                });
        }
    }

    CiDonut.defaults = CiDonut.prototype.defaults;

    $.fn.ciDonut = function (options) {
        return this.each(function () {
            new CiDonut(this, options).init();
        });
    };

})(jQuery, window, document);


/**
 * Date formatter
 */

// a global month names array
var gsMonthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// a global day names array
var gsDayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

// the date format prototype
Date.prototype.format = function (f) {
    if (!this.valueOf())
        return ' ';

    var d = this;

    return f.replace(/(yyyy|yy|MMMM|MMM|MM|dddd|ddd|dd|hh|h|mm|ss|tt)/gi,
        function (val) {
            switch (val) {
                case 'yy': return d.getFullYear().substr(2);
                case 'yyyy': return d.getFullYear();
                case 'MMMM': return gsMonthNames[d.getMonth()];
                case 'MMM': return gsMonthNames[d.getMonth()].substr(0, 3);
                case 'MM': return (d.getMonth() + 1).zf(2);
                case 'dddd': return gsDayNames[d.getDay()];
                case 'ddd': return gsDayNames[d.getDay()].substr(0, 3);
                case 'dd': return d.getDate().zf(2);
                case 'hh': return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case 'h': return ((h = d.getHours() % 12) ? h : 12).zf(1);
                case 'mm': return d.getMinutes().zf(2);
                case 'ss': return d.getSeconds().zf(2);
                case 'tt': return d.getHours() < 12 ? 'AM' : 'PM';
            }
        }
    );
}

// string date parse function
String.prototype.parse = function (delim) {
    var parts = this.split(delim);
    if (parts.length == 3) {
        return new Date(
			parseInt(parts[0], 10), // year
			parseInt(parts[1] ? parts[1] - 1 : 0, 10), // month
			parseInt(parts[2], 10), // date
			0, // hours
			0, // mins
			0, // secs
			0 // millisec
		);
    }
}

// Zero-Fill
Number.prototype.zf = function (l) { return '0'.string(l - this.toString().length) + this; }

//return the sub of an integer
Number.prototype.substr = function (l) { return this.toString().substr(l); }

// VB-like string
String.prototype.string = function (l) { var s = '', i = 0; while (i++ < l) { s += this; } return s; }