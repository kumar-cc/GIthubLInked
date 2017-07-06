//CSS Browser Selector, http://rafael.adm.br
;
function css_browser_selector(u) {
    var ua = u.toLowerCase(), is = function (t) {
        return ua.indexOf(t) > -1
    }, g = 'gecko', w = 'webkit', s = 'safari', o = 'opera', m = 'mobile', h = document.documentElement, b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3.6') ? g + ' ff3 ff3_6' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? m + ' j2me' : is('iphone') ? m + ' iphone' : is('ipod') ? m + ' ipod' : is('ipad') ? m + ' ipad' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js'];
    c = b.join(' ');
    h.className += ' ' + c;
    return c;
};
css_browser_selector(navigator.userAgent);

//TopZIndex 1.2, http://topzindex.googlecode.com
;
(function (a) {
    a.topZIndex = function (b) {
        return Math.max(0, Math.max.apply(null, a.map((b || "*") === "*" ? a.makeArray(document.getElementsByTagName("*")) : a(b), function (b) {
            return parseFloat(a(b).css("z-index")) || null
        })))
    };
    a.fn.topZIndex = function (b) {
        if (this.length === 0)return this;
        b = a.extend({increment: 1}, b);
        var c = a.topZIndex(b.selector), d = b.increment;
        return this.each(function () {
            this.style.zIndex = c += d
        })
    }
})(jQuery);

//jQuery Easing, http://gsgd.co.uk/sandbox/jquery/easing/
;
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {def: "easeOutQuad", swing: function (a, b, c, d, e) {
    return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
}, easeInQuad: function (a, b, c, d, e) {
    return d * (b /= e) * b + c
}, easeOutQuad: function (a, b, c, d, e) {
    return-d * (b /= e) * (b - 2) + c
}, easeInOutQuad: function (a, b, c, d, e) {
    if ((b /= e / 2) < 1)return d / 2 * b * b + c;
    return-d / 2 * (--b * (b - 2) - 1) + c
}, easeInCubic: function (a, b, c, d, e) {
    return d * (b /= e) * b * b + c
}, easeOutCubic: function (a, b, c, d, e) {
    return d * ((b = b / e - 1) * b * b + 1) + c
}, easeInOutCubic: function (a, b, c, d, e) {
    if ((b /= e / 2) < 1)return d / 2 * b * b * b + c;
    return d / 2 * ((b -= 2) * b * b + 2) + c
}, easeInQuart: function (a, b, c, d, e) {
    return d * (b /= e) * b * b * b + c
}, easeOutQuart: function (a, b, c, d, e) {
    return-d * ((b = b / e - 1) * b * b * b - 1) + c
}, easeInOutQuart: function (a, b, c, d, e) {
    if ((b /= e / 2) < 1)return d / 2 * b * b * b * b + c;
    return-d / 2 * ((b -= 2) * b * b * b - 2) + c
}, easeInQuint: function (a, b, c, d, e) {
    return d * (b /= e) * b * b * b * b + c
}, easeOutQuint: function (a, b, c, d, e) {
    return d * ((b = b / e - 1) * b * b * b * b + 1) + c
}, easeInOutQuint: function (a, b, c, d, e) {
    if ((b /= e / 2) < 1)return d / 2 * b * b * b * b * b + c;
    return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
}, easeInSine: function (a, b, c, d, e) {
    return-d * Math.cos(b / e * (Math.PI / 2)) + d + c
}, easeOutSine: function (a, b, c, d, e) {
    return d * Math.sin(b / e * (Math.PI / 2)) + c
}, easeInOutSine: function (a, b, c, d, e) {
    return-d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
}, easeInExpo: function (a, b, c, d, e) {
    return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
}, easeOutExpo: function (a, b, c, d, e) {
    return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
}, easeInOutExpo: function (a, b, c, d, e) {
    if (b == 0)return c;
    if (b == e)return c + d;
    if ((b /= e / 2) < 1)return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
    return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
}, easeInCirc: function (a, b, c, d, e) {
    return-d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
}, easeOutCirc: function (a, b, c, d, e) {
    return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
}, easeInOutCirc: function (a, b, c, d, e) {
    if ((b /= e / 2) < 1)return-d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
    return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
}, easeInElastic: function (a, b, c, d, e) {
    var f = 1.70158;
    var g = 0;
    var h = d;
    if (b == 0)return c;
    if ((b /= e) == 1)return c + d;
    if (!g)g = e * .3;
    if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
    } else var f = g / (2 * Math.PI) * Math.asin(d / h);
    return-(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
}, easeOutElastic: function (a, b, c, d, e) {
    var f = 1.70158;
    var g = 0;
    var h = d;
    if (b == 0)return c;
    if ((b /= e) == 1)return c + d;
    if (!g)g = e * .3;
    if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
    } else var f = g / (2 * Math.PI) * Math.asin(d / h);
    return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
}, easeInOutElastic: function (a, b, c, d, e) {
    var f = 1.70158;
    var g = 0;
    var h = d;
    if (b == 0)return c;
    if ((b /= e / 2) == 2)return c + d;
    if (!g)g = e * .3 * 1.5;
    if (h < Math.abs(d)) {
        h = d;
        var f = g / 4
    } else var f = g / (2 * Math.PI) * Math.asin(d / h);
    if (b < 1)return-.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
    return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
}, easeInBack: function (a, b, c, d, e, f) {
    if (f == undefined)f = 1.70158;
    return d * (b /= e) * b * ((f + 1) * b - f) + c
}, easeOutBack: function (a, b, c, d, e, f) {
    if (f == undefined)f = 1.70158;
    return d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
}, easeInOutBack: function (a, b, c, d, e, f) {
    if (f == undefined)f = 1.70158;
    if ((b /= e / 2) < 1)return d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c;
    return d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
}, easeInBounce: function (a, b, c, d, e) {
    return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
}, easeOutBounce: function (a, b, c, d, e) {
    if ((b /= e) < 1 / 2.75) {
        return d * 7.5625 * b * b + c
    } else if (b < 2 / 2.75) {
        return d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c
    } else if (b < 2.5 / 2.75) {
        return d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c
    } else {
        return d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    }
}, easeInOutBounce: function (a, b, c, d, e) {
    if (b < e / 2)return jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c;
    return jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c
}})

//jQuery Calculation Plug-in, http://www.pengoworks.com/workshop/jquery/calculation/calculation.plugin.htm
;
(function ($) {
    var defaults = {reNumbers: /(-?\$?)(\d+(,\d{3})*(\.\d{1,})?|\.\d{1,})/g, cleanseNumber: function (v) {
        return v.replace(/[^0-9.\-]/g, "")
    }, useFieldPlugin: (!!$.fn.getValue), onParseError: null, onParseClear: null};
    $.Calculation = {version: "0.4.09", setDefaults: function (options) {
        $.extend(defaults, options)
    }};
    $.fn.parseNumber = function (options) {
        var aValues = [];
        options = $.extend(options, defaults);
        this.each(function () {
            var $el = $(this), sMethod = ($el.is(":input") ? (defaults.useFieldPlugin ? "getValue" : "val") : "text"), v = $.trim($el[sMethod]()).match(defaults.reNumbers, "");
            if (v == null) {
                v = 0;
                if (jQuery.isFunction(options.onParseError))options.onParseError.apply($el, [sMethod]);
                $.data($el[0], "calcParseError", true)
            } else {
                v = options.cleanseNumber.apply(this, [v[0]]);
                if ($.data($el[0], "calcParseError") && jQuery.isFunction(options.onParseClear)) {
                    options.onParseClear.apply($el, [sMethod]);
                    $.data($el[0], "calcParseError", false)
                }
            }
            aValues.push(parseFloat(v, 10))
        });
        return aValues
    };
    $.fn.calc = function (expr, vars, cbFormat, cbDone) {
        var $this = this, exprValue = "", precision = 0, $el, parsedVars = {}, tmp, sMethod, _, bIsError = false;
        for (var k in vars) {
            expr = expr.replace((new RegExp("(" + k + ")", "g")), "_.$1");
            if (!!vars[k] && !!vars[k].jquery) {
                parsedVars[k] = vars[k].parseNumber()
            } else {
                parsedVars[k] = vars[k]
            }
        }
        this.each(function (i, el) {
            var p, len;
            $el = $(this);
            sMethod = ($el.is(":input") ? (defaults.useFieldPlugin ? "setValue" : "val") : "text");
            _ = {};
            for (var k in parsedVars) {
                if (typeof parsedVars[k] == "number") {
                    _[k] = parsedVars[k]
                } else if (typeof parsedVars[k] == "string") {
                    _[k] = parseFloat(parsedVars[k], 10)
                } else if (!!parsedVars[k] && (parsedVars[k]instanceof Array)) {
                    tmp = (parsedVars[k].length == $this.length) ? i : 0;
                    _[k] = parsedVars[k][tmp]
                }
                if (isNaN(_[k]))_[k] = 0;
                p = _[k].toString().match(/\.\d+$/gi);
                len = (p) ? p[0].length - 1 : 0;
                if (len > precision)precision = len
            }
            try {
                exprValue = eval(expr);
                if (precision)exprValue = Number(exprValue.toFixed(Math.max(precision, 4)));
                if (jQuery.isFunction(cbFormat)) {
                    var tmp = cbFormat.apply(this, [exprValue]);
                    if (!!tmp)exprValue = tmp
                }
            } catch (e) {
                exprValue = e;
                bIsError = true
            }
            $el[sMethod](exprValue.toString())
        });
        if (jQuery.isFunction(cbDone))cbDone.apply(this, [this]);
        return this
    };
    $.each(["sum", "avg", "min", "max"], function (i, method) {
        $.fn[method] = function (bind, selector) {
            if (arguments.length == 0)return math[method](this.parseNumber());
            var bSelOpt = selector && (selector.constructor == Object) && !(selector instanceof jQuery);
            var opt = bind && bind.constructor == Object ? bind : {bind: bind || "keyup", selector: (!bSelOpt) ? selector : null, oncalc: null};
            if (bSelOpt)opt = jQuery.extend(opt, selector);
            if (!!opt.selector)opt.selector = $(opt.selector);
            var self = this, sMethod, doCalc = function () {
                var value = math[method](self.parseNumber(opt));
                if (!!opt.selector) {
                    sMethod = (opt.selector.is(":input") ? (defaults.useFieldPlugin ? "setValue" : "val") : "text");
                    opt.selector[sMethod](value.toString())
                }
                if (jQuery.isFunction(opt.oncalc))opt.oncalc.apply(self, [value, opt])
            };
            doCalc();
            return self.bind(opt.bind, doCalc)
        }
    });
    var math = {sum: function (a) {
        var total = 0, precision = 0;
        $.each(a, function (i, v) {
            var p = v.toString().match(/\.\d+$/gi), len = (p) ? p[0].length - 1 : 0;
            if (len > precision)precision = len;
            total += v
        });
        if (precision)total = Number(total.toFixed(precision));
        return total
    }, avg: function (a) {
        return math.sum(a) / a.length
    }, min: function (a) {
        return Math.min.apply(Math, a)
    }, max: function (a) {
        return Math.max.apply(Math, a)
    }}
})(jQuery);
/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function (e) {
    e.fn.hoverIntent = function (t, n, r) {
        var i = {interval: 100, sensitivity: 7, timeout: 0};
        if (typeof t === "object") {
            i = e.extend(i, t)
        } else if (e.isFunction(n)) {
            i = e.extend(i, {over: t, out: n, selector: r})
        } else {
            i = e.extend(i, {over: t, out: t, selector: n})
        }
        var s, o, u, a;
        var f = function (e) {
            s = e.pageX;
            o = e.pageY
        };
        var l = function (t, n) {
            n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
            if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
                e(n).off("mousemove.hoverIntent", f);
                n.hoverIntent_s = 1;
                return i.over.apply(n, [t])
            } else {
                u = s;
                a = o;
                n.hoverIntent_t = setTimeout(function () {
                    l(t, n)
                }, i.interval)
            }
        };
        var c = function (e, t) {
            t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
            t.hoverIntent_s = 0;
            return i.out.apply(t, [e])
        };
        var h = function (t) {
            var n = jQuery.extend({}, t);
            var r = this;
            if (r.hoverIntent_t) {
                r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
            }
            if (t.type == "mouseenter") {
                u = n.pageX;
                a = n.pageY;
                e(r).on("mousemove.hoverIntent", f);
                if (r.hoverIntent_s != 1) {
                    r.hoverIntent_t = setTimeout(function () {
                        l(n, r)
                    }, i.interval)
                }
            } else {
                e(r).off("mousemove.hoverIntent", f);
                if (r.hoverIntent_s == 1) {
                    r.hoverIntent_t = setTimeout(function () {
                        c(n, r)
                    }, i.timeout)
                }
            }
        };
        return this.on({"mouseenter.hoverIntent": h, "mouseleave.hoverIntent": h}, i.selector)
    }
})(jQuery)