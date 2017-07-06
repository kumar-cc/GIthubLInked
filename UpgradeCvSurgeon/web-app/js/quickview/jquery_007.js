/*
 * Boxer [Formstone Library]
 * @author Ben Plum
 * @version 1.6.6
 *
 * Copyright © 2013 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

if (jQuery)(function (c) {
    function B(a) {
        n.formatter = C;
        return c(this).on("click.boxer", c.extend({}, n, a || {}), u)
    }

    function u(b) {
        b.preventDefault();
        b.stopPropagation();
        var d = c(this), h = b.data.$object, g = d.attr("href") || "", k = g.toLowerCase().split("."), k = k[k.length - 1], f = d.data("type") || "", e = "image" == f || "jpeg" == k || "jpg" == k || "gif" == k || "png" == k || "data:image" == g.substr(0, 10), m = -1 < g.indexOf("youtube.com/embed") || -1 < g.indexOf("player.vimeo.com/video"), j = "url" == f || !e && !m && "http" == g.substr(0, 4), l = "element" == f || !e && !m && !j && "#" == g.substr(0, 1), p = "undefined" !== typeof h;
        if (1 > c("#boxer").length && (e || m || j || l || p)) {
            a = {$target: d, $object: h, gallery: {active: !1}, options: b.data};
            a.type = e ? "image" : m ? "video" : "element";
            if (e || m)b = a.$target.attr("rel"), "undefined" !== typeof b && !1 !== b && (a.gallery.active = !0, a.gallery.rel = b, a.gallery.$items = c("a[rel= " + a.gallery.rel + "]"), a.gallery.index = a.gallery.$items.index(a.$target), a.gallery.total = a.gallery.$items.length - 1);
            b = '<div id="boxer-overlay" class="' + a.options.customClass + '" style="opacity: 0"></div>';
            b += '<div id="boxer" class="' + a.options.customClass;
            j && (b += " iframe");
            if (l || p)b += " inline";
            b += '" style="opacity: 0;';
            !0 === a.options.fixed && (b += " position: fixed;");
            b += '"><span class="boxer-close">Close<i class="icon icon-remove-circle"></i></span>';
            b += '<div class="boxer-container" style="opacity: 0; height: ' + a.options.height + "px; width: " + a.options.width + 'px">';
            b += '<div class="boxer-content">';
            if (e || m)b += '<div class="boxer-meta">', a.gallery.active ? (b += '<p class="boxer-position"', 1 > a.gallery.total && (b += ' style="display: none;"'), b += ">", b += '<span class="current">' + (a.gallery.index + 1) + '</span> of <span class="total">' + (a.gallery.total + 1) + "</span>", b += "</p>", b += '<div class="boxer-arrow previous">Previous</div>', b += '<div class="boxer-arrow next">Next</div>', b += '<div class="boxer-caption gallery">') : b += '<div class="boxer-caption">', b += a.options.formatter.apply(c("body"), [a.$target]), b += "</div></div>";
            b += "</div></div></div>";
            c("body").append(b);
            a.$overlay = c("#boxer-overlay");
            a.$boxer = c("#boxer");
            a.$container = a.$boxer.find(".boxer-container");
            a.$content = a.$boxer.find(".boxer-content");
            a.$meta = a.$boxer.find(".boxer-meta");
            a.$position = a.$boxer.find(".boxer-position");
            a.$caption = a.$boxer.find(".boxer-caption");
            a.$arrows = a.$boxer.find(".boxer-arrow");
            a.$animatables = c("#boxer-overlay, #boxer");
            a.padding = 2 * parseInt(a.$boxer.css("paddingTop"), 10);
            v();
            a.gallery.active && w();
            c(window).on("resize.boxer", D).on("keydown.boxer", E);
            c("body").on("click.boxer", "#boxer-overlay, #boxer .boxer-close", q);
            if (a.gallery.active)a.$boxer.on("click.boxer", ".boxer-arrow", F);
            if (j || l || p)a.$boxer.on("resize.boxer", r.resize).on("close.boxer", q);
            a.$overlay.stop().animate({opacity: a.options.opacity}, a.options.duration);
            a.$boxer.stop().animate({opacity: 1}, a.options.duration, function () {
                if (e)x(g); else if (m)y(g); else if (j) {

                    var b = g, b = b + (-1 < b.indexOf("?") ? "&" + n.requestKey + "=true" : "?" + n.requestKey + "=true"),
                        b = c('<iframe class="boxer-iframe" src="' + b + '" />');
                    s(b)
                } else l ? (b = c(g).find(">:first-child").clone(), s(b)) : p ? s(a.$object) : c.error("BOXER: '" + g + "' is not valid.")
            })
        }
        if (p)return a.$boxer
    }

    function l() {
        var b = (c(window).width() - a.contentWidth - a.padding) / 2, d = 0 >= a.options.top ? (c(window).height() - a.contentHeight - a.padding) / 2 : a.options.top;
        !0 !== a.options.fixed && (d += c(window).scrollTop());
        var h = a.$arrows.outerHeight();
        a.$arrows.css({marginTop: (a.contentHeight - a.metaHeight - h) / 2});
        a.$boxer.stop().animate({left: b, top: d}, a.options.duration);
        a.$container.show().stop().animate({height: a.contentHeight, width: a.contentWidth}, a.options.duration, function () {
            a.$container.stop().animate({opacity: 1}, a.options.duration);
            a.$boxer.find(".boxer-close").stop().animate({opacity: 1}, a.options.duration);
            a.options.callback.apply(a.$boxer)
        })
    }

    function q(b) {
        b.preventDefault();
        b.stopPropagation();
        "undefined" !== typeof a.$animatables && (a.$animatables.stop().animate({opacity: 0}, a.options.duration, function () {
            c(this).remove()
        }), clearTimeout(j), j = null, c(window).off(".boxer"), c("body").off(".boxer"), a.gallery.active && a.$boxer.off(".boxer"), a = {})
    }

    function D() {
        null !== j && (clearTimeout(j), j = null);
        j = setTimeout(function () {
            v()
        }, 10)
    }

    function v() {
        var b = (c(window).width() - a.$boxer.width() - a.padding) / 2, d = 0 >= a.options.top ? (c(window).height() - a.$boxer.height() - a.padding) / 2 : a.options.top;
        !0 !== a.options.fixed && (d += c(window).scrollTop());
        a.$boxer.css({left: b, top: d})
    }

    function x(b) {
        a.$image = c("<img />");
        a.$image.one("load.boxer",function () {
            a.originalHeight = a.$image[0].height;
            a.originalWidth = a.$image[0].width;
            a.options.retina && (a.originalHeight /= 2, a.originalWidth /= 2);
            a.$content.prepend(a.$image);
            "" == a.$caption.html() ? a.$caption.hide() : a.$caption.show();
            t(0) && l()
        }).attr("src", b).addClass("boxer-image");
        a.$image[0].complete && a.$image.trigger("load")
    }

    function y(b) {
        a.$videoWrapper = c('<div class="boxer-video-wrapper" />');
        a.$video = c('<iframe class="boxer-video" />');
        a.$video.attr("src", b).addClass("boxer-video").prependTo(a.$videoWrapper);
        a.$content.prepend(a.$videoWrapper);
        z();
        l()
    }

    function C(a) {
        a = a.attr("title");
        return"" != a && void 0 !== a ? '<p class="caption">' + a + "</p>" : ""
    }

    function t(b) {
        var d = 0 == b ? a.originalHeight : a.$image.outerHeight(), h = 0 == b ? a.originalWidth : a.$image.outerWidth(), g = 0 == b ? 0 : a.metaHeight, k = c(window).width() - a.options.margin - a.padding, g = c(window).height() - a.options.margin - a.padding - g;
        d < a.options.minHeight && (a.options.minHeight = d);
        h < a.options.minWidth && (a.options.minWidth = h);
        var f = h, e = d;
        h > d ? (f = k, e = f * (d / h), e > g && (e = g, f = e * (h / d))) : (e = g, f = e * (h / d), f > k && (f = k, e = f * (d / h)));
        if (f > h || e > d)f = h, e = d;
        if (f < a.options.minWidth || e < a.options.minHeight)h < d ? (f = a.options.minWidth, e = f * (d / h)) : (e = a.options.minHeight, f = e * (h / d));
        a.$content.css({width: f});
        a.$meta.css({width: f});
        a.$image.css({height: e, width: f});
        a.metaHeight = a.$meta.outerHeight(!0);
        a.contentWidth = f;
        a.contentHeight = e + a.metaHeight;
        return a.contentHeight > g && 2 > b ? t(b + 1) : !0
    }

    function z() {
        var b = c(window).width() - a.options.margin - a.padding, b = a.options.videoWidth > b ? b : a.options.videoWidth, d = 0.5625 * b;
        a.$videoWrapper.css({height: d, width: b});
        a.$content.css({width: b});
        a.$meta.css({width: b});
        a.metaHeight = a.$meta.outerHeight(!0);
        a.contentWidth = b;
        a.contentHeight = d + a.metaHeight
    }

    function F(b) {
        b.preventDefault();
        b.stopPropagation();
        b = c(this);
        b.hasClass("disabled") || (a.gallery.index += b.hasClass("next") ? 1 : -1, a.gallery.index > a.gallery.total && (a.gallery.index = a.gallery.total), 0 > a.gallery.index && (a.gallery.index = 0), a.$container.stop().animate({opacity: 0}, a.options.duration, function () {
            "undefined" !== typeof a.$image && a.$image.remove();
            "undefined" !== typeof a.$videoWrapper && a.$videoWrapper.remove();
            a.$target = a.gallery.$items.eq(a.gallery.index);
            a.$caption.html(a.options.formatter.apply(c("body"), [a.$target]));
            a.$position.find(".current").html(a.gallery.index + 1);
            var b = a.$target.attr("href");
            -1 < b.indexOf("youtube.com/embed") || -1 < b.indexOf("player.vimeo.com/video") ? y(b) : x(b);
            w()
        }))
    }

    function w() {
        a.$arrows.removeClass("disabled");
        0 == a.gallery.index && a.$arrows.filter(".previous").addClass("disabled");
        a.gallery.index == a.gallery.total && a.$arrows.filter(".next").addClass("disabled")
    }

    function E(b) {
        a.gallery.active && (37 == b.keyCode || 39 == b.keyCode) ? (b.preventDefault(), b.stopPropagation(), a.$arrows.filter(37 == b.keyCode ? ".previous" : ".next").trigger("click")) : 27 == b.keyCode && a.$boxer.find(".boxer-close").trigger("click")
    }

    function s(b) {
        a.$content.append(b);
        A(b);
        l()
    }

    function A(b) {
        var d = b.outerHeight(!0), h = b.outerWidth(!0), g = c(window).height() - a.options.margin - a.padding, k = c(window).width() - a.options.margin - a.padding, f = a.$target.data("height"), e = a.$target.data("width"), j = 0 > g ? n.minHeight : g;
        b = b.is("iframe");
        a.contentHeight = void 0 != f ? f : b ? g : d;
        a.contentWidth = void 0 != e ? e : b ? k : h;
        a.contentHeight > j ? (a.contentHeight = j, b || a.$content.css({overflowY: "scroll"})) : a.$content.css({overflowY: "auto"});
        a.$content.css({height: a.contentHeight, width: a.contentWidth})
    }

    var n = {callback: c.noop, customClass: "", duration: 250, fixed: !1, formatter: c.noop, height: 100, margin: 100, minHeight: 200, minWidth: 200, opacity: 0.75, retina: !1, requestKey: "boxer", top: 0, videoWidth: 600, width: 100}, a = {}, j = null, r = {destroy: function () {
        q(c.Event("click"));
        return c(this).off(".boxer")
    }, resize: function () {
        "undefined" != typeof a.$boxer && ("element" == a.type ? A(a.$content.find(">:first-child")) : "image" == a.type ? t(1) : "video" == a.type && z(), l())
    }};
    c.fn.boxer = function (a) {
        return r[a] ? r[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" === typeof a || !a ? B.apply(this, arguments) : this
    };
    c.boxer = function (a, d) {
        return u(c.Event("click", {data: c.extend({$object: a}, n, d || {})}))
    }
})(jQuery);