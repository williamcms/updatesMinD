//Script verificado
/**
 * Avanti ComunicaÃ§Ã£o <contato@penseavanti.com.br>
 * lojamindesigns
 * @date Wed Nov 24 2021 13:47:20 GMT-0300 (GMT-03:00)
 */
"use strict";

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function n() {
    var r = !1, a = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    window.ClassAvanti = function() {}, ClassAvanti.extend = function(t) {
        var s = this.prototype;
        r = !0;
        var e, i = new this();
        for (e in r = !1, t) i[e] = "function" == typeof t[e] && "function" == typeof s[e] && a.test(t[e]) ? function(i, o) {
            return function() {
                var t = this._super;
                this._super = s[i];
                var e = o.apply(this, arguments);
                return this._super = t, e;
            };
        }(e, t[e]) : t[e];
        function o() {
            !r && this.init && this.init.apply(this, arguments);
        }
        return ((o.prototype = i).constructor = o).extend = n, o;
    };
}();

var APP = {
    core: {},
    component: {},
    controller: {},
    i: {}
};

$(document).ready(function() {
    new APP.core.Main();
}), APP.core.Util = ClassAvanti.extend({
    getController: function() {
        var t = $("meta[name=controller]").attr("content");
        return t || !1;
    }
}), APP.core.Main = ClassAvanti.extend({
    init: function() {
        this.start();
    },
    start: function() {
        APP.i.util = new APP.core.Util(), APP.i.general = new APP.controller.General(), 
        this.loadPageController();
    },
    loadPageController: function() {
        var t = APP.i.util.getController();
        t && (APP.i.currentController = new APP.controller[t]());
    }
});

var _typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : _typeof2(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t);
};

function _defineProperty(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

!function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function(d) {
    var o, r = window.Slick || {};
    o = 0, (r = function(t, e) {
        var i = this;
        i.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: d(t),
            appendDots: d(t),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(t, e) {
                return d('<button type="button" />').text(e + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, i.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, d.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, 
        i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, 
        i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, 
        i.rowCount = 1, i.shouldClick = !0, i.$slider = d(t), i.$slidesCache = null, i.transformType = null, 
        i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, 
        i.windowTimer = null, t = d(t).data("slick") || {}, i.options = d.extend({}, i.defaults, e, t), 
        i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", 
        i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", 
        i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = d.proxy(i.autoPlay, i), 
        i.autoPlayClear = d.proxy(i.autoPlayClear, i), i.autoPlayIterator = d.proxy(i.autoPlayIterator, i), 
        i.changeSlide = d.proxy(i.changeSlide, i), i.clickHandler = d.proxy(i.clickHandler, i), 
        i.selectHandler = d.proxy(i.selectHandler, i), i.setPosition = d.proxy(i.setPosition, i), 
        i.swipeHandler = d.proxy(i.swipeHandler, i), i.dragHandler = d.proxy(i.dragHandler, i), 
        i.keyHandler = d.proxy(i.keyHandler, i), i.instanceUid = o++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, 
        i.registerBreakpoints(), i.init(!0);
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, r.prototype.addSlide = r.prototype.slickAdd = function(t, e, i) {
        var o = this;
        if ("boolean" == typeof e) i = e, e = null; else if (e < 0 || e >= o.slideCount) return !1;
        o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? d(t).appendTo(o.$slideTrack) : i ? d(t).insertBefore(o.$slides.eq(e)) : d(t).insertAfter(o.$slides.eq(e)) : !0 === i ? d(t).prependTo(o.$slideTrack) : d(t).appendTo(o.$slideTrack), 
        o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), 
        o.$slideTrack.append(o.$slides), o.$slides.each(function(t, e) {
            d(e).attr("data-slick-index", t);
        }), o.$slidesCache = o.$slides, o.reinit();
    }, r.prototype.animateHeight = function() {
        var t, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (t = e.$slides.eq(e.currentSlide).outerHeight(!0), 
        e.$list.animate({
            height: t
        }, e.options.speed));
    }, r.prototype.animateSlide = function(t, e) {
        var i = {}, o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), 
        !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), 
        d({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(t) {
                t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate(" + t + "px, 0px)" : i[o.animType] = "translate(0px," + t + "px)", 
                o.$slideTrack.css(i);
            },
            complete: function() {
                e && e.call();
            }
        })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", 
        o.$slideTrack.css(i), e && setTimeout(function() {
            o.disableTransition(), e.call();
        }, o.options.speed));
    }, r.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t = t && null !== t ? d(t).not(this.$slider) : t;
    }, r.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" === (void 0 === t ? "undefined" : _typeof(t)) && t.each(function() {
            var t = d(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
        });
    }, r.prototype.applyTransition = function(t) {
        var e = this, i = {};
        !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, 
        (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(t)).css(i);
    }, r.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
    }, r.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }, r.prototype.autoPlayIterator = function() {
        var t = this, e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, 
        t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e));
    }, r.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = d(t.options.prevArrow).addClass("slick-arrow"), 
        t.$nextArrow = d(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), 
        t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), 
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), 
        !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, r.prototype.buildDots = function() {
        var t, e, i = this;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), e = d("<ul />").addClass(i.options.dotsClass), 
            t = 0; t <= i.getDotCount(); t += 1) e.append(d("<li />").append(i.options.customPaging.call(this, i, t)));
            i.$dots = e.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active");
        }
    }, r.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
        t.slideCount = t.$slides.length, t.$slides.each(function(t, e) {
            d(e).attr("data-slick-index", t).data("originalStyling", d(e).attr("style") || "");
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? d('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), 
        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), 
        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), 
        d("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), 
        t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), 
        !0 === t.options.draggable && t.$list.addClass("draggable");
    }, r.prototype.buildRows = function() {
        var t, e, i, o = this, s = document.createDocumentFragment(), n = o.$slider.children();
        if (0 < o.options.rows) {
            for (i = o.options.slidesPerRow * o.options.rows, e = Math.ceil(n.length / i), t = 0; t < e; t++) {
                for (var r = document.createElement("div"), a = 0; a < o.options.rows; a++) {
                    for (var l = document.createElement("div"), d = 0; d < o.options.slidesPerRow; d++) {
                        var c = t * i + (a * o.options.slidesPerRow + d);
                        n.get(c) && l.appendChild(n.get(c));
                    }
                    r.appendChild(l);
                }
                s.appendChild(r);
            }
            o.$slider.empty().append(s), o.$slider.children().children().children().css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, r.prototype.checkResponsive = function(t, e) {
        var i, o, s, n = this, r = !1, a = n.$slider.width(), l = window.innerWidth || d(window).width();
        if ("window" === n.respondTo ? s = l : "slider" === n.respondTo ? s = a : "min" === n.respondTo && (s = Math.min(l, a)), 
        n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (i in o = null, n.breakpoints) n.breakpoints.hasOwnProperty(i) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[i] && (o = n.breakpoints[i]) : s > n.breakpoints[i] && (o = n.breakpoints[i]));
            null !== o ? null !== n.activeBreakpoint && o === n.activeBreakpoint && !e || (n.activeBreakpoint = o, 
            "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = d.extend({}, n.originalSettings, n.breakpointSettings[o]), 
            !0 === t && (n.currentSlide = n.options.initialSlide), n.refresh(t)), r = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, 
            n.options = n.originalSettings, !0 === t && (n.currentSlide = n.options.initialSlide), 
            n.refresh(t), r = o), t || !1 === r || n.$slider.trigger("breakpoint", [ n, r ]);
        }
    }, r.prototype.changeSlide = function(t, e) {
        var i, o = this, s = d(t.currentTarget);
        switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), i = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, 
        t.data.message) {
          case "previous":
            n = 0 == i ? o.options.slidesToScroll : o.options.slidesToShow - i, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - n, !1, e);
            break;

          case "next":
            n = 0 == i ? o.options.slidesToScroll : i, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + n, !1, e);
            break;

          case "index":
            var n = 0 === t.data.index ? 0 : t.data.index || s.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(n), !1, e), s.children().trigger("focus");
            break;

          default:
            return;
        }
    }, r.prototype.checkNavigable = function(t) {
        var e = this.getNavigableIndexes(), i = 0;
        if (t > e[e.length - 1]) t = e[e.length - 1]; else for (var o in e) {
            if (t < e[o]) {
                t = i;
                break;
            }
            i = e[o];
        }
        return t;
    }, r.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (d("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", d.proxy(t.interrupt, t, !0)).off("mouseleave.slick", d.proxy(t.interrupt, t, !1)), 
        !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), 
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), 
        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), 
        t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), 
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), 
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), 
        d(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), 
        !0 === t.options.focusOnSelect && d(t.$slideTrack).children().off("click.slick", t.selectHandler), 
        d(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), 
        d(window).off("resize.slick.slick-" + t.instanceUid, t.resize), d("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), 
        d(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
    }, r.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", d.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", d.proxy(t.interrupt, t, !1));
    }, r.prototype.cleanUpRows = function() {
        var t;
        0 < this.options.rows && ((t = this.$slides.children().children()).removeAttr("style"), 
        this.$slider.empty().append(t));
    }, r.prototype.clickHandler = function(t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
    }, r.prototype.destroy = function(t) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), d(".slick-cloned", e.$slider).detach(), 
        e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"));
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), 
        e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), 
        e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), 
        e.unslicked = !0, t || e.$slider.trigger("destroy", [ e ]);
    }, r.prototype.disableTransition = function(t) {
        var e = {};
        e[this.transitionType] = "", (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(t)).css(e);
    }, r.prototype.fadeSlide = function(t, e) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call();
        }, i.options.speed));
    }, r.prototype.fadeSlideOut = function(t) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }));
    }, r.prototype.filterSlides = r.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), 
        e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
    }, r.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var e = d(this);
            setTimeout(function() {
                i.options.pauseOnFocus && (i.focussed = e.is(":focus"), i.autoPlay());
            }, 0);
        });
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, r.prototype.getDotCount = function() {
        var t = this, e = 0, i = 0, o = 0;
        if (!0 === t.options.infinite) if (t.slideCount <= t.options.slidesToShow) ++o; else for (;e < t.slideCount; ) ++o, 
        e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else if (!0 === t.options.centerMode) o = t.slideCount; else if (t.options.asNavFor) for (;e < t.slideCount; ) ++o, 
        e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else o = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return o - 1;
    }, r.prototype.getLeft = function(t) {
        var e, i, o = this, s = 0;
        return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, 
        i = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? i = -1.5 : 1 === o.options.slidesToShow && (i = -2)), 
        s = e * o.options.slidesToShow * i), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (s = t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, 
        (o.options.slidesToShow - (t - o.slideCount)) * e * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, 
        o.slideCount % o.options.slidesToScroll * e * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, 
        s = (t + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (s = o.slideOffset = 0), 
        !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, 
        o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * e * -1 + s, 
        !0 === o.options.variableWidth && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), 
        e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, 
        !0 === o.options.centerMode && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), 
        e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, 
        e += (o.$list.width() - s.outerWidth()) / 2)), e;
    }, r.prototype.getOption = r.prototype.slickGetOption = function(t) {
        return this.options[t];
    }, r.prototype.getNavigableIndexes = function() {
        for (var t = this, e = 0, i = 0, o = [], s = !1 === t.options.infinite ? t.slideCount : (e = -1 * t.options.slidesToScroll, 
        i = -1 * t.options.slidesToScroll, 2 * t.slideCount); e < s; ) o.push(e), e = i + t.options.slidesToScroll, 
        i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o;
    }, r.prototype.getSlick = function() {
        return this;
    }, r.prototype.getSlideCount = function() {
        var i, o = this, s = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0;
        return !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(t, e) {
            if (e.offsetLeft - s + d(e).outerWidth() / 2 > -1 * o.swipeLeft) return i = e, !1;
        }), Math.abs(d(i).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll;
    }, r.prototype.goTo = r.prototype.slickGoTo = function(t, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e);
    }, r.prototype.init = function(t) {
        var e = this;
        d(e.$slider).hasClass("slick-initialized") || (d(e.$slider).addClass("slick-initialized"), 
        e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), 
        e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), t && e.$slider.trigger("init", [ e ]), 
        !0 === e.options.accessibility && e.initADA(), e.options.autoplay && (e.paused = !1, 
        e.autoPlay());
    }, r.prototype.initADA = function() {
        var i = this, o = Math.ceil(i.slideCount / i.options.slidesToShow), s = i.getNavigableIndexes().filter(function(t) {
            return 0 <= t && t < i.slideCount;
        });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(t) {
            var e = s.indexOf(t);
            d(this).attr({
                role: "tabpanel",
                id: "slick-slide" + i.instanceUid + t,
                tabindex: -1
            }), -1 !== e && (e = "slick-slide-control" + i.instanceUid + e, d("#" + e).length && d(this).attr({
                "aria-describedby": e
            }));
        }), i.$dots.attr("role", "tablist").find("li").each(function(t) {
            var e = s[t];
            d(this).attr({
                role: "presentation"
            }), d(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + t,
                "aria-controls": "slick-slide" + i.instanceUid + e,
                "aria-label": t + 1 + " of " + o,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var t = i.currentSlide, e = t + i.options.slidesToShow; t < e; t++) i.options.focusOnChange ? i.$slides.eq(t).attr({
            tabindex: "0"
        }) : i.$slides.eq(t).removeAttr("tabindex");
        i.activateADA();
    }, r.prototype.initArrowEvents = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), 
        t.$nextArrow.on("keydown.slick", t.keyHandler)));
    }, r.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && (d("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), 
        !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && t.slideCount > t.options.slidesToShow && d("li", t.$dots).on("mouseenter.slick", d.proxy(t.interrupt, t, !0)).on("mouseleave.slick", d.proxy(t.interrupt, t, !1));
    }, r.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", d.proxy(t.interrupt, t, !0)), 
        t.$list.on("mouseleave.slick", d.proxy(t.interrupt, t, !1)));
    }, r.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), d(document).on(t.visibilityChange, d.proxy(t.visibility, t)), 
        !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && d(t.$slideTrack).children().on("click.slick", t.selectHandler), 
        d(window).on("orientationchange.slick.slick-" + t.instanceUid, d.proxy(t.orientationChange, t)), 
        d(window).on("resize.slick.slick-" + t.instanceUid, d.proxy(t.resize, t)), d("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), 
        d(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), d(t.setPosition);
    }, r.prototype.initUI = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), 
        t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show();
    }, r.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }));
    }, r.prototype.lazyLoad = function() {
        var t, e, i, n = this;
        function o(t) {
            d("img[data-lazy]", t).each(function() {
                var t = d(this), e = d(this).attr("data-lazy"), i = d(this).attr("data-srcset"), o = d(this).attr("data-sizes") || n.$slider.attr("data-sizes"), s = document.createElement("img");
                s.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", e).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), n.$slider.trigger("lazyLoaded", [ n, t, e ]);
                    });
                }, s.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                    n.$slider.trigger("lazyLoadError", [ n, t, e ]);
                }, s.src = e;
            });
        }
        if (!0 === n.options.centerMode ? i = !0 === n.options.infinite ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), 
        n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, 
        i = Math.ceil(e + n.options.slidesToShow), !0 === n.options.fade && (0 < e && e--, 
        i <= n.slideCount && i++)), t = n.$slider.find(".slick-slide").slice(e, i), "anticipated" === n.options.lazyLoad) for (var s = e - 1, r = i, a = n.$slider.find(".slick-slide"), l = 0; l < n.options.slidesToScroll; l++) s < 0 && (s = n.slideCount - 1), 
        t = (t = t.add(a.eq(s))).add(a.eq(r)), s--, r++;
        o(t), n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
    }, r.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
    }, r.prototype.next = r.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, r.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition();
    }, r.prototype.pause = r.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0;
    }, r.prototype.play = r.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1;
    }, r.prototype.postSlide = function(t) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [ e, t ]), e.animating = !1, e.slideCount > e.options.slidesToShow && e.setPosition(), 
        e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && (e.initADA(), 
        e.options.focusOnChange && d(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()));
    }, r.prototype.prev = r.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, r.prototype.preventDefault = function(t) {
        t.preventDefault();
    }, r.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var e, i, o, s, n = this, r = d("img[data-lazy]", n.$slider);
        r.length ? (e = r.first(), i = e.attr("data-lazy"), o = e.attr("data-srcset"), s = e.attr("data-sizes") || n.$slider.attr("data-sizes"), 
        (r = document.createElement("img")).onload = function() {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), 
            !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [ n, e, i ]), 
            n.progressiveLazyLoad();
        }, r.onerror = function() {
            t < 3 ? setTimeout(function() {
                n.progressiveLazyLoad(t + 1);
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
            n.$slider.trigger("lazyLoadError", [ n, e, i ]), n.progressiveLazyLoad());
        }, r.src = i) : n.$slider.trigger("allImagesLoaded", [ n ]);
    }, r.prototype.refresh = function(t) {
        var e = this, i = e.slideCount - e.options.slidesToShow;
        !e.options.infinite && e.currentSlide > i && (e.currentSlide = i), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), 
        i = e.currentSlide, e.destroy(!0), d.extend(e, e.initials, {
            currentSlide: i
        }), e.init(), t || e.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1);
    }, r.prototype.registerBreakpoints = function() {
        var t, e, i, o = this, s = o.options.responsive || null;
        if ("array" === d.type(s) && s.length) {
            for (t in o.respondTo = o.options.respondTo || "window", s) if (i = o.breakpoints.length - 1, 
            s.hasOwnProperty(t)) {
                for (e = s[t].breakpoint; 0 <= i; ) o.breakpoints[i] && o.breakpoints[i] === e && o.breakpoints.splice(i, 1), 
                i--;
                o.breakpoints.push(e), o.breakpointSettings[e] = s[t].settings;
            }
            o.breakpoints.sort(function(t, e) {
                return o.options.mobileFirst ? t - e : e - t;
            });
        }
    }, r.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, 
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), 
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), 
        t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), 
        t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), 
        t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && d(t.$slideTrack).children().on("click.slick", t.selectHandler), 
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), 
        t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [ t ]);
    }, r.prototype.resize = function() {
        var t = this;
        d(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = d(window).width(), t.checkResponsive(), t.unslicked || t.setPosition();
        }, 50));
    }, r.prototype.removeSlide = r.prototype.slickRemove = function(t, e, i) {
        var o = this;
        if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : o.slideCount - 1 : !0 === e ? --t : t, 
        o.slideCount < 1 || t < 0 || t > o.slideCount - 1) return !1;
        o.unload(), (!0 === i ? o.$slideTrack.children() : o.$slideTrack.children(this.options.slide).eq(t)).remove(), 
        o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), 
        o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit();
    }, r.prototype.setCSS = function(t) {
        var e, i, o = this, s = {};
        !0 === o.options.rtl && (t = -t), e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px", 
        i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px", s[o.positionProp] = t, 
        !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + i + ")" : s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)"), 
        o.$slideTrack.css(s);
    }, r.prototype.setDimensions = function() {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), 
        !0 === t.options.centerMode && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), 
        t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), 
        t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
    }, r.prototype.setFade = function() {
        var i, o = this;
        o.$slides.each(function(t, e) {
            i = o.slideWidth * t * -1, !0 === o.options.rtl ? d(e).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : d(e).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            });
        }), o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        });
    }, r.prototype.setHeight = function() {
        var t, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (t = e.$slides.eq(e.currentSlide).outerHeight(!0), 
        e.$list.css("height", t));
    }, r.prototype.setOption = r.prototype.slickSetOption = function() {
        var t, e, i, o, s, n = this, r = !1;
        if ("object" === d.type(arguments[0]) ? (i = arguments[0], r = arguments[1], s = "multiple") : "string" === d.type(arguments[0]) && (i = arguments[0], 
        o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), 
        "single" === s) n.options[i] = o; else if ("multiple" === s) d.each(i, function(t, e) {
            n.options[t] = e;
        }); else if ("responsive" === s) for (e in o) if ("array" !== d.type(n.options.responsive)) n.options.responsive = [ o[e] ]; else {
            for (t = n.options.responsive.length - 1; 0 <= t; ) n.options.responsive[t].breakpoint === o[e].breakpoint && n.options.responsive.splice(t, 1), 
            t--;
            n.options.responsive.push(o[e]);
        }
        r && (n.unload(), n.reinit());
    }, r.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), 
        t.$slider.trigger("setPosition", [ t ]);
    }, r.prototype.setProps = function() {
        var t = this, e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), 
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), 
        t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), 
        void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", 
        t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), 
        void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", 
        t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), 
        void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", 
        t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), 
        void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", 
        t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), 
        void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", 
        t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType;
    }, r.prototype.setSlideClasses = function(t) {
        var e, i, o, s = this, n = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        s.$slides.eq(t).addClass("slick-current"), !0 === s.options.centerMode ? (i = s.options.slidesToShow % 2 == 0 ? 1 : 0, 
        o = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (o <= t && t <= s.slideCount - 1 - o ? s.$slides.slice(t - o + i, t + o + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = s.options.slidesToShow + t, 
        n.slice(e - o + 1 + i, e + o + 2).addClass("slick-active").attr("aria-hidden", "false")), 
        0 === t ? n.eq(n.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && n.eq(s.options.slidesToShow).addClass("slick-center")), 
        s.$slides.eq(t).addClass("slick-center")) : 0 <= t && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= s.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, 
        e = !0 === s.options.infinite ? s.options.slidesToShow + t : t, (s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? n.slice(e - (s.options.slidesToShow - o), e + o) : n.slice(e, e + s.options.slidesToShow)).addClass("slick-active").attr("aria-hidden", "false")), 
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad();
    }, r.prototype.setupInfinite = function() {
        var t, e, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (e = null, 
        o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, 
            t = o.slideCount; t > o.slideCount - i; --t) d(o.$slides[e = t - 1]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < i + o.slideCount; t += 1) e = t, d(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "");
            });
        }
    }, r.prototype.interrupt = function(t) {
        t || this.autoPlay(), this.interrupted = t;
    }, r.prototype.selectHandler = function(t) {
        t = d(t.target).is(".slick-slide") ? d(t.target) : d(t.target).parents(".slick-slide"), 
        t = parseInt(t.attr("data-slick-index")) || 0;
        this.slideCount <= this.options.slidesToShow ? this.slideHandler(t, !1, !0) : this.slideHandler(t);
    }, r.prototype.slideHandler = function(t, e, i) {
        var o, s, n, r, a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === t)) if (!1 === e && a.asNavFor(t), 
        o = t, n = a.getLeft(o), e = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? e : a.swipeLeft, 
        !1 === a.options.infinite && !1 === a.options.centerMode && (t < 0 || t > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
        !0 !== i && a.slideCount > a.options.slidesToShow ? a.animateSlide(e, function() {
            a.postSlide(o);
        }) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (t < 0 || t > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, 
        !0 !== i && a.slideCount > a.options.slidesToShow ? a.animateSlide(e, function() {
            a.postSlide(o);
        }) : a.postSlide(o)); else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, 
            a.animating = !0, a.$slider.trigger("beforeChange", [ a, a.currentSlide, s ]), e = a.currentSlide, 
            a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (r = (r = a.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(a.currentSlide), 
            a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== i ? (a.fadeSlideOut(e), 
            a.fadeSlide(s, function() {
                a.postSlide(s);
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== i && a.slideCount > a.options.slidesToShow ? a.animateSlide(n, function() {
                a.postSlide(s);
            }) : a.postSlide(s);
        }
    }, r.prototype.startLoad = function() {
        var t = this;
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), 
        t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), 
        t.$slider.addClass("slick-loading");
    }, r.prototype.swipeDirection = function() {
        var t = this, e = t.touchObject.startX - t.touchObject.curX, i = t.touchObject.startY - t.touchObject.curY, e = Math.atan2(i, e), e = Math.round(180 * e / Math.PI);
        return (e = e < 0 ? 360 - Math.abs(e) : e) <= 45 && 0 <= e || e <= 360 && 315 <= e ? !1 === t.options.rtl ? "left" : "right" : 135 <= e && e <= 225 ? !1 === t.options.rtl ? "right" : "left" : !0 === t.options.verticalSwiping ? 35 <= e && e <= 135 ? "down" : "up" : "vertical";
    }, r.prototype.swipeEnd = function(t) {
        var e, i, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1;
        if (o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [ o, o.swipeDirection() ]), 
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
              case "left":
              case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), 
                o.currentDirection = 0;
                break;

              case "right":
              case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), 
                o.currentDirection = 1;
            }
            "vertical" != i && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [ o, i ]));
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), 
        o.touchObject = {});
    }, r.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, 
        e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), 
        t.data.action) {
          case "start":
            e.swipeStart(t);
            break;

          case "move":
            e.swipeMove(t);
            break;

          case "end":
            e.swipeEnd(t);
        }
    }, r.prototype.swipeMove = function(t) {
        var e, i, o = this, s = void 0 !== t.originalEvent ? t.originalEvent.touches : null;
        return !(!o.dragging || o.scrolling || s && 1 !== s.length) && (e = o.getLeft(o.currentSlide), 
        o.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, o.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, 
        o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))), 
        i = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))), 
        !o.options.verticalSwiping && !o.swiping && 4 < i ? !(o.scrolling = !0) : (!0 === o.options.verticalSwiping && (o.touchObject.swipeLength = i), 
        s = o.swipeDirection(), void 0 !== t.originalEvent && 4 < o.touchObject.swipeLength && (o.swiping = !0, 
        t.preventDefault()), i = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1), 
        !0 === o.options.verticalSwiping && (i = o.touchObject.curY > o.touchObject.startY ? 1 : -1), 
        t = o.touchObject.swipeLength, (o.touchObject.edgeHit = !1) === o.options.infinite && (0 === o.currentSlide && "right" === s || o.currentSlide >= o.getDotCount() && "left" === s) && (t = o.touchObject.swipeLength * o.options.edgeFriction, 
        o.touchObject.edgeHit = !0), !1 === o.options.vertical ? o.swipeLeft = e + t * i : o.swipeLeft = e + t * (o.$list.height() / o.listWidth) * i, 
        !0 === o.options.verticalSwiping && (o.swipeLeft = e + t * i), !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? (o.swipeLeft = null, 
        !1) : void o.setCSS(o.swipeLeft))));
    }, r.prototype.swipeStart = function(t) {
        var e, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
        void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), 
        i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, 
        i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, 
        i.dragging = !0;
    }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), 
        t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
    }, r.prototype.unload = function() {
        var t = this;
        d(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), 
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, r.prototype.unslick = function(t) {
        this.$slider.trigger("unslick", [ this, t ]), this.destroy();
    }, r.prototype.updateArrows = function() {
        var t = this;
        Math.floor(t.options.slidesToShow / 2);
        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode || t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, r.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"));
    }, r.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1);
    }, d.fn.slick = function() {
        for (var t, e = this, i = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = e.length, n = 0; n < s; n++) if ("object" == (void 0 === i ? "undefined" : _typeof(i)) || void 0 === i ? e[n].slick = new r(e[n], i) : t = e[n].slick[i].apply(e[n].slick, o), 
        void 0 !== t) return t;
        return e;
    };
}), APP.component.Modal = ClassAvanti.extend({
    init: function(t) {
        this.setup(t), this.start(), this.bind();
    },
    setup: function(t) {
        this.options = $.extend({
            $modal: $(".avanti-modal"),
            classClose: "modal-header__close",
            classBodyLock: "body-lock",
            width: "300px",
            height: "400px",
            activeModifier: "--active"
        }, t);
    },
    start: function() {
        this.setUpModal();
    },
    setUpModal: function() {
        var t = this.options, e = t.$modal, i = t.width, t = t.height;
        e.find(".avanti-modal__content").css({
            width: i,
            height: t
        });
    },
    openModal: function(t) {
        var e = this.options, i = e.$modal, o = e.classBodyLock, e = e.activeModifier;
        $("body").addClass("" + o), i.addClass("avanti-modal" + e).find(".avanti-modal__content").addClass("avanti-modal__content" + e), 
        t && t();
    },
    closeModal: function() {
        var t = this.options, e = t.$modal, i = t.classBodyLock, t = t.activeModifier;
        $("body").removeClass("" + i), e.removeClass("avanti-modal" + t).find(".avanti-modal__content").removeClass("avanti-modal__content" + t);
    },
    bind: function() {
        this.bindCloseModal();
    },
    bindCloseModal: function() {
        var e = this, t = this.options, i = t.$modal, t = t.classClose;
        i.find("." + t).on("click", function(t) {
            t.preventDefault(), e.closeModal();
        });
    }
}), APP.component.Popup = ClassAvanti.extend({
    init: function() {
        this.setup(), this.start(), this.bind();
    },
    setup: function() {
        this.popupModal = new APP.component.Modal({
            $modal: $(".popup-promocao"),
            $quantityInput: $(".quantity-input, .quantitySelector input"),
            $buyButton: $(".buy-button.buy-button-ref"),
            width: "280px",
            height: "auto"
        });
        var t = this.popupModal.options.$modal;
        this.$slickSlider = t.find(".popup-promocao__products"), this.productQuantity = this.getProductQuantity();
    },
    getProductQuantity: function() {
        return this.popupModal.options.$modal.find(".popup-promocao__product").length;
    },
    start: function() {
        this.setupSingleProduct();
    },
    setupSingleProduct: function() {
        if (1 < this.productQuantity) return !1;
        var t = this.popupModal.options.$modal, e = t.find(".popup-promocao__product"), t = t.find(".popup-promocao__button--accept"), e = e.data("sku");
        t.html("QUERO!!"), this.buildBuyButton(e);
    },
    triggerModal: function() {
        var t = this;
        this.popupModal.openModal(function() {
            1 < t.productQuantity && t.startSlickProducts();
        });
    },
    startSlickProducts: function() {
        this.$slickSlider.slick({
            autoplay: !1,
            dots: !0,
            arrows: !0,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    },
    buildBuyButton: function(t) {
        var e = this.popupModal.options, i = e.$modal, o = e.$quantityInput, e = e.$buyButton, o = parseInt(o.val()), o = e.attr("href").replace(/qty=\d+/, "qty=" + o);
        o += "&sku=" + t + "&qty=1&seller=1&redirect=true&sc=3", i.find(".popup-promocao__button--accept").attr("href", o);
    },
    bind: function() {
        this.bindCloseModal(), this.bindSelectProduct(), this.bindBuyButton();
    },
    bindCloseModal: function() {
        var e = this;
        this.popupModal.options.$modal.find(".modal-header__close").on("click", function(t) {
            t.preventDefault(), e.popupModal.closeModal(), window.location.href = $(".buy-button.buy-button-ref").attr("href");
        });
    },
    bindSelectProduct: function() {
        var o = this;
        if (this.productQuantity < 2) return !1;
        var s = this.popupModal.options.$modal, n = s.find(".popup-promocao__product");
        n.find("> .popup-promocao__product-image").on("click", function(t) {
            t.preventDefault();
            var e = $(t.currentTarget).parent(".popup-promocao__product"), i = s.find(".popup-promocao__button--accept"), t = e.data("sku");
            n.removeClass("selected"), e.addClass("selected"), i.html("QUERO!!"), o.buildBuyButton(t);
        });
    },
    bindBuyButton: function() {
        var i = this.popupModal.options.$modal.find(".popup-promocao__button--accept");
        i.on("click", function(t) {
            t.preventDefault();
            var e = i.attr("href");
            if ("#" === e) return !1;
            i.attr("href", "").html('<i class="fa fa-check"></i>'), setTimeout(function() {
                window.location.href = e;
            }, 1e3);
        });
    }
}), APP.component.Select = ClassAvanti.extend({
    init: function(t) {
        this.options = t, this.options.className || (this.options.className = "custom-select"), 
        this.firstOption = "Select", this.titleElement = this.options.className + "__selected", 
        this.wrapSelect();
    },
    wrapSelect: function() {
        var o = this;
        if (0 === this.options.selector.length) return !1;
        this.options.selector.each(function(t, e) {
            var i = $(e), e = i.find("option:first-child").text();
            if (i.parent("div").hasClass(o.options.className) || i.is(":hidden")) return !0;
            "" === e && (e = o.firstOption), i.wrap('<div class="' + o.options.className + '" />').parent().prepend('<span class="' + o.titleElement + '">' + e + "</span>"), 
            o.bindChange(i);
        });
    },
    bindChange: function(t) {
        t.on("change", function(t) {
            t = $(t.currentTarget).find("option:selected").text();
            $("." + this.titleElement).text(t);
        });
    }
}), APP.component.Shelf = ClassAvanti.extend({
    init: function() {}
}), APP.controller.Account = ClassAvanti.extend({
    init: function() {
        this.start(), this.bind();
    },
    start: function() {},
    bind: function() {}
}), $(window).width() < 768 && ($("br").remove(), $(".minus-icon").hide(), $(".toggle-mobile").on("click", function() {
    $(this).nextAll().slideToggle(), $(this).find(".plus-icon").hide(), $(this).find(".minus-icon").show();
}));

var SurrealFriday = {
    init: function() {
        SurrealFriday.events(), SurrealFriday.methods.hideShelf(), SurrealFriday.methods.clickPriceRange(), 
        $(".e-ate-99").trigger("click"), $(".e-list-by-category.vasos .slick-prev").trigger("click"), 
        $(".e-vitrine-ate-99").show(), $(".e-price-range-slick > :not(.e-vitrine-ate-99)").hide();
    },
    methods: {
        hideShelf: function() {
            $(".e-list-by-category.vasos").show(), $(".e-list-by-category.porta-vinhos").hide(), 
            $(".e-list-by-category.cadeiras").hide(), $("body").on("click", ".e-select", function() {
                $(this).find("ul").slideToggle();
            }), $("body").on("click", ".e-select .e-option", function() {
                $(".e-option").hasClass("active") && $(".e-option").removeClass("active"), $(this).addClass("active");
            }), $("body").on("click", ".e-option", function() {
                var t, e;
                "Vasos" == $(this).text() ? ($(".e-select h2").html($(this).text()), $(".e-list-by-category.vasos .slick-prev").trigger("click"), 
                $(".e-list-by-category.porta-vinhos").hide(), $(".e-list-by-category.cadeiras").hide(), 
                $(".e-list-by-category.vasos").show(), t = $(".e-list-by-category.vasos").attr("data-colecao"), 
                $(".e-list-by-category.vasos ul.last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + t)) : "Porta vinhos" == $(this).text() ? ($(".e-select h2").html($(this).text()), 
                $(".e-list-by-category.porta-vinhos .slick-prev").trigger("click"), $(".e-list-by-category.vasos").hide(), 
                $(".e-list-by-category.cadeiras").hide(), $(".e-list-by-category.porta-vinhos").show(), 
                e = $(".e-list-by-category.porta-vinhos").attr("data-colecao"), $(".e-list-by-category.porta-vinhos ul.last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + e)) : ($(".e-select h2").html($(this).text()), 
                $(".e-list-by-category.cadeiras .slick-prev").trigger("click"), $(".e-list-by-category.vasos").hide(), 
                $(".e-list-by-category.porta-vinhos").hide(), $(".e-list-by-category.cadeiras").show(), 
                e = $(".e-list-by-category.cadeiras").attr("data-colecao"), $(".e-list-by-category.cadeiras ul.last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + e));
            }), $("body").on("click", ".e-price-range-bottom button", function() {
                var t, e;
                $(this).hasClass("e-ate-99") ? ($(".e-vitrine-ate-99 .slick-prev").trigger("click"), 
                $(".e-vitrine-ate-99").show(), $(".e-price-range-slick > :not(.e-vitrine-ate-99)").hide(), 
                t = $(".e-vitrine-ate-99").attr("data-colecao"), $(".e-vitrine-ate-99 .last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + t), 
                $(".e-vitrine-ate-99").find(".has-shelf--default").attr("data-colecao", "" + t)) : $(this).hasClass("e-ate-199") ? ($(".e-vitrine-de-100-a-199 .slick-prev").trigger("click"), 
                $(".e-vitrine-de-100-a-199").show(), $(".e-price-range-slick > :not(.e-vitrine-de-100-a-199)").hide(), 
                t = $(".e-vitrine-de-100-a-199").attr("data-colecao"), $(".e-vitrine-de-100-a-199 .last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + t), 
                $(".e-vitrine-de-100-a-199").find(".has-shelf--default").attr("data-colecao", "" + t)) : $(this).hasClass("e-ate-299") ? ($(".e-vitrine-de-200-a-299 .slick-prev").trigger("click"), 
                $(".e-vitrine-de-200-a-299").show(), $(".e-price-range-slick > :not(.e-vitrine-de-200-a-299)").hide(), 
                e = $(".e-vitrine-de-200-a-299").attr("data-colecao"), $(".e-vitrine-de-200-a-299 .last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + e), 
                $(".e-vitrine-de-200-a-299").find(".has-shelf--default").attr("data-colecao", "" + e)) : ($(".e-vitrine-partir-de-300 .slick-prev").trigger("click"), 
                $(".e-vitrine-partir-de-300").show(), $(".e-price-range-slick > :not(.e-vitrine-partir-de-300)").hide(), 
                e = $(".e-vitrine-partir-de-300").attr("data-colecao"), $(".e-vitrine-partir-de-300 .last").find("a").attr("href", "https://www.casamind.com.br/busca/?fq=H:" + e), 
                $(".e-vitrine-partir-de-300").find(".has-shelf--default").attr("data-colecao", "" + e));
            });
        },
        clickPriceRange: function() {
            $("body").on("click", ".e-price-range-bottom button", function() {
                $(".e-price-range-bottom button").hasClass("active") && $(".e-price-range-bottom button").removeClass("active"), 
                $(this).addClass("active");
            });
        }
    },
    events: function() {
        var t;
        $(".e-slick-top").slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: !0,
            dots: !1,
            arrows: !1,
            lazyLoad: "ondemand"
        }), $(window).innerWidth() < 768 && $(".e-slick-top").slick("unslick"), $(".e-banners-desktop").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !1,
            arrows: !0,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".e-banners-mobile").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !1,
            arrows: !0,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".has-shelf--default > h2").remove(), 768 < window.innerWidth && ($(".has-shelf--default").append('\n                <ul class="last">\n                    <li>\n                        <a class="e-see-more" href="" target="_blank">ver tudo</a>\n                    </li>\n                </ul>\n            '), 
        $(".e-price-range-slick > div > div.has-shelf--default ul").append('\n                <li class="last see-more">\n                    <a class="e-see-more" href="" target="_blank">ver tudo</a>\n                </li>\n            ')), 
        $(".e-list-by-category .has-shelf--default").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: !1,
            arrows: !0,
            infinite: !1,
            lazyLoad: "ondemand",
            responsive: [ {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: !1,
                    dots: !1,
                    arrows: !0,
                    lazyLoad: "ondemand"
                }
            } ]
        }), $(".e-middle-banner .e-banner-middle-desktop").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !0,
            arrows: !1,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".e-middle-banner .e-banner-middle-mobile").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !1,
            arrows: !0,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".e-bottom-banner .e-banner-bottom-desktop").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !0,
            arrows: !1,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".e-bottom-banner .e-banner-bottom-mobile").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: !1,
            arrows: !0,
            infinite: !0,
            lazyLoad: "ondemand"
        }), $(".e-slick-bottom .e-list-slick").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: !0,
            infinite: !0,
            dots: !1,
            centerMode: !0,
            centerPadding: "0px",
            lazyLoad: "ondemand",
            responsive: [ {
                breakpoint: 600,
                settings: (_defineProperty(t = {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: !0,
                    dots: !0,
                    arrows: !0
                }, "infinite", !0), _defineProperty(t, "dots", !1), _defineProperty(t, "centerMode", !0), 
                _defineProperty(t, "lazyLoad", "ondemand"), t)
            } ]
        }), $(".e-price-range-slick > div > div > ul.last").remove(), $(".e-price-range-slick > div > div > ul").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
            infinite: !1,
            lazyLoad: "ondemand",
            responsive: [ {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: !1,
                    dots: !1,
                    arrows: !0,
                    lazyLoad: "ondemand"
                }
            } ]
        }), $("body").on("click", ".has-shelf--default .slick-next", function() {
            var t = $(this).parents()[1].getAttribute("data-colecao");
            $(this).hasClass("slick-disabled") && $(this).html('\n                        <a href="https://www.casamind.com.br/busca/?fq=H:' + t + '" class="e-see-more-shelf-mobile">ver tudo</a>\n                    ');
        });
    }
};

$(document).on("ready", function() {
    SurrealFriday.init(), $("body").addClass("loaded"), $(".e-banners-mobile .slick-prev").trigger("click"), 
    $(".e-banner-middle-mobile .slick-prev").trigger("click"), $(".e-banner-bottom-mobile .slick-prev").trigger("click");
}), APP.controller.Category = ClassAvanti.extend({
    init: function() {
        this.start(), this.bind();
    },
    start: function() {
        this.buyInShelf();
    },
    bind: function() {},
    buyInShelf: function() {}
}), APP.controller.General = ClassAvanti.extend({
    init: function() {
        this.setup(), this.start(), this.bind();
    },
    setup: function() {},
    start: function() {
        this.scrollMenu(), this.searchFixed(), this.menuOpen(), this.subMenuDrop(), this.minicartMain(), 
        this.minicartOpen();
    },
    bind: function() {
        this.addtoBag();
    },
    addtoBag: function() {
        $("body").on("click", ".js--shelf-buy", function(t) {
            t.preventDefault(), t.stopPropagation();
            var e = $(this).parents(".csm-shelf__product").data("sku"), t = document.cookie.split("; VTEXSC=").pop().split(";").shift().split("sc=")[1];
            return vtexjs.checkout.addToCart([ {
                id: e,
                quantity: 1,
                seller: "1"
            } ], null, t).done(function(t) {
                console.log(t), $("#popup-adicionando, #barratempo").addClass("active"), setTimeout(function() {
                    $("#popup-adicionando, #barratempo").removeClass("active");
                }, 2200);
            }), !1;
        });
    },
    scrollMenu: function() {
        var t = 0;
        $(document).ready(function() {
            $(window).on("scroll", function() {
                $(window).scrollTop() > t && 1 < $(window).scrollTop() ? ($("#csm-header").addClass("hidemenu"), 
                $(".csm-minicart").addClass("hidemicart"), $(".csm-middle .csm-center").addClass("scrollMenu"), 
                $(".csm-navigation .csm-center").addClass("scrollMenuNave"), $(".csm-benefits").hide()) : 0 == $(window).scrollTop() ? ($(".csm-benefits").show(), 
                $(".csm-middle .csm-center").removeClass("scrollMenu"), $(".csm-navigation .csm-center").removeClass("scrollMenuNave"), 
                $(".csm-minicart").removeClass("hidemicart")) : $("#csm-header").removeClass("hidemenu"), 
                t = $(window).scrollTop();
            });
        });
    },
    searchFixed: function() {
        var e = $(".csm-search-cart .js--search-fixed");
        e.on("click", function(t) {
            t.preventDefault(), e.parent().hasClass("csm-active") ? e.parent().removeClass("csm-active") : e.parent().addClass("csm-active"), 
            $(".ui-autocomplete.ui-menu.ui-corner-all").addClass("csm-fixed");
        });
    },
    menuOpen: function() {
        var t = $(".csm-header .csm-mobile .js--open-menu"), e = $(".csm-header .csm-mobile .csm-menu__close"), i = $(".csm-header .csm-mobile .csm-overlay");
        t.click(function(t) {
            $(".csm-header .csm-mobile .csm-center .csm-menu").addClass("csm-active"), e.addClass("csm-active"), 
            i.addClass("csm-active");
        }), e.click(function(t) {
            $(this).removeClass("csm-active"), $(".csm-header .csm-mobile .csm-center .csm-menu").removeClass("csm-active"), 
            i.removeClass("csm-active");
        }), i.click(function(t) {
            $(this).removeClass("csm-active"), e.removeClass("csm-active"), $(".csm-header .csm-mobile .csm-center .csm-menu").removeClass("csm-active");
        });
    },
    subMenuDrop: function() {
        var e = $(".csm-header .csm-mobile .csm-menu__bottom >ul li");
        e.each(function() {
            var t = $(this);
            t.hasClass("csm-has-sub") && t.find(">a").click(function() {
                return e.removeClass("csm-active"), t.toggleClass("csm-active"), e.find(".csm-dropdown").slideUp(), 
                t.find(".csm-dropdown").stop(!0, !1).slideToggle(), !1;
            });
        });
    },
    minicartMain: function() {
        function e(t) {
            var c = jQuery.extend({
                container: ".csm-minicart__products",
                items: ".amount-items",
                list: ".product-list",
                price_label: "R$ ",
                total_price_currency: "",
                total_price_container: "",
                total_price_label: "",
                cart_conclude: null,
                remove_btn: !1,
                finish_order_btn: ".finish-order-btn",
                finish_order_btn_link: "/Site/Carrinho.aspx",
                finish_order_btn_text: "Finalizar compra",
                empty_cart_message: "Carrinho vazio",
                items_text: [ "nenhum item", "", "" ],
                hover: ".tpl-cart",
                callback: null,
                cart_empty_cb: null,
                quantity: !0,
                total_price_class: ".csm-sub",
                total_price_label_class: ".total-priccsm-label",
                dropdown: !0,
                show_images: !0
            }, t), p = {
                checkoutURL: "/api/checkout/pub/orderForm/",
                temp: null,
                total_itens: 0,
                total: "0,00",
                empty_cart: null,
                itens: 0,
                data: null,
                init: function(t) {
                    p.get.cart.update(t);
                },
                checkoutUpdateURL: function() {
                    return p.checkoutURL + p.orderFormId + "/items/update/";
                },
                get: {
                    cart: {
                        update: function(t) {
                            var e = {
                                expectedOrderFormSections: [ "items", "paymentData", "totalizers" ]
                            }, t = t ? ($.extend(e, t), p.checkoutUpdateURL()) : p.checkoutURL;
                            $.ajax({
                                url: t,
                                data: JSON.stringify(e),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                type: "POST",
                                success: function(t) {
                                    p.total_itens = t.items.length, $(".menu-entrar .item .qty").text(t.items.length), 
                                    0 < p.total_itens ? (p.orderFormId = t.orderFormId, p.data = t.items, p.set.cart.items(), 
                                    p.total = _.intAsCurrency(t.value), $(".menu-entrar .valor .vl").text(_.intAsCurrency(t.value)), 
                                    p.set.cart.total(), c.dropdown && p.mount.cart.dropdown()) : p.set.cart.empty(), 
                                    i(p.total_itens);
                                }
                            });
                        },
                        text: function() {
                            var t = c.items_text.length - 1, e = c.items_text.length - 1 == 2 ? 1 : 0, i = void 0 === c.items_text[t] ? "" : " ", o = void 0 === c.items_text[e] ? "" : " ";
                            return 1 < parseInt(p.total_itens) ? p.total_itens + i + c.items_text[t] : 0 == p.total_itens ? c.items_text[0] : p.total_itens + o + c.items_text[e];
                        }
                    }
                },
                mount: {
                    cart: {
                        dropdown: function() {
                            var t, e = 0, i = c.list.split(".")[1] || "", o = jQuery("<ul/>").addClass(i);
                            for (t in p.data) {
                                if ("function" == typeof p.data[t]) break;
                                var s = p.data[t].productId, n = jQuery("<li>").addClass("row").addClass("row-" + e).attr("sku", s), r = jQuery("<div>").addClass("col").addClass("col-0"), a = jQuery("<div>").addClass("_qc-img").addClass("_qc-img-" + e).attr("sku", s), l = jQuery("<div>").addClass("_qc-product").addClass("_qc-product-" + e);
                                jQuery(l).text(p.data[t].name), jQuery(r).append(a.html('<img src="' + p.data[t].imageUrl.replace("55-55", "300-300") + '" />')), 
                                c.show_images && jQuery(r).append(l);
                                var d = jQuery("<div>").addClass("col").addClass("col-1"), a = p.data[t].quantity, l = jQuery('<input type="text" value="' + a + '" maxlength="2" />').attr("ndx", e).addClass("_qty").addClass("_qty-" + e).attr("sku", s), a = jQuery("<a>", {
                                    ndx: e
                                }).addClass("_add").addClass("_add-" + e).text("+"), s = jQuery("<a>", {
                                    ndx: e
                                }).addClass("_remove").addClass("_removcsm-" + e).text("-");
                                jQuery(d).append(s).append(l).append(a);
                                s = (p.data[t].sellingPrice / 100).toFixed(2).toString().replace(/\./, ","), l = c.price_label + s, 
                                a = jQuery("<div>").addClass("col").addClass("col-2").html(l), s = p.data[t].id, 
                                l = jQuery("<a>").addClass("removcsm-link").addClass("removcsm-link-" + e).attr({
                                    sku: s,
                                    index: e
                                }).html("X"), s = jQuery("<div>").addClass("col").addClass("col-3");
                                jQuery(s).append(l), jQuery(n).append(r).append(d).append(a).append(s), jQuery(o).append(n), 
                                e++;
                            }
                            jQuery(c.container).html(o), p.set.events(), p.set.cart.conclusion(), p.set.cart.active(), 
                            c.show_images;
                        }
                    }
                },
                set: {
                    cart: {
                        items: function() {
                            var t = p.get.cart.text();
                            jQuery(c.items).html(t);
                        },
                        total: function() {
                            var t = c.total_price_currency + p.total;
                            jQuery(c.total_price_container).html(t);
                        },
                        empty: function() {
                            jQuery(c.hover).unbind().removeClass("active").addClass("empty");
                            var t = p.get.cart.text();
                            p.set.cart.items(t), 0 < jQuery(c.container).length && jQuery(c.container).html(""), 
                            "function" == typeof c.cart_empty_cb && c.cart_empty_cb();
                        },
                        conclusion: function() {
                            var t = jQuery("<div/>").addClass("cart_conclude");
                            0 < jQuery(c.cart_conclude).length && (t = jQuery(c.cart_conclude));
                            var e = c.finish_order_btn.substring(1) || "", e = jQuery("<a/>").addClass(e).attr("href", c.finish_order_btn_link).html(c.finish_order_btn_text);
                            jQuery(t).append(e);
                            e = c.total_price_currency + p.total;
                            $('<div class="csm-finish"><div class="csm-total"><div class="csm-valorTotal">' + e + '</div><div class="csm-actions"><div class="csm-tocart"><a href="/checkout/#/cart">Finalizar compra</a></div></div></div></div>').appendTo("#quickCartDropdown");
                        },
                        active: function() {
                            jQuery(c.hover).removeClass("empty").addClass("available"), "function" == typeof c.callback && c.callback();
                        }
                    },
                    events: function() {
                        jQuery(c.hover).hover(function() {
                            jQuery(this).addClass("active");
                        }, function() {
                            jQuery(c.hover).removeClass("active");
                        }), jQuery(c.container).find(".removcsm-link").click(function() {
                            var t;
                            t = $(this).attr("index"), p.init({
                                orderItems: [ {
                                    index: t,
                                    quantity: 0
                                } ]
                            });
                        }), jQuery(c.container).find('._qty:not(".keydown_binding")').addClass("keydown_binding").keydown(function(t) {
                            t = t.charCode || t.keyCode || 0;
                            return 8 == t || 9 == t || 46 == t || 37 <= t && t <= 40 || 48 <= t && t <= 57 || 96 <= t && t <= 105;
                        }), jQuery(c.container).find('._add:not(".active")').addClass("active").click(function() {
                            _ndx = jQuery(this).attr("ndx"), _val = parseInt(jQuery("._qty-" + _ndx).val()), 
                            _val = 99 <= _val ? 99 : _val + 1, jQuery("._qty-" + _ndx).val(_val).change();
                        }), jQuery(c.container).find('._remove:not(".active")').addClass("active").click(function() {
                            _ndx = jQuery(this).attr("ndx"), _val = parseInt(jQuery("._qty-" + _ndx).val()), 
                            _val = _val <= 1 ? 1 : _val - 1, jQuery("._qty-" + _ndx).val(_val).change();
                        }), jQuery(c.container).find('._qty:not(".active")').addClass("active").keyup(function() {
                            jQuery(this).val() < 1 ? jQuery(this).val(1) : 99 < jQuery(this).val() && jQuery(this).val(99);
                        }).change(function() {
                            var t, e;
                            t = jQuery(this).attr("ndx"), e = jQuery(this).val(), jQuery(c.container).find("._qty,._add,._remove").removeClass("active").removeClass("keydown_binding"), 
                            jQuery(c.container).find("._qty").attr("readonly", !0), p.init({
                                orderItems: [ {
                                    index: t,
                                    quantity: e
                                } ]
                            });
                        });
                    }
                },
                refresh: function() {
                    p.init();
                }
            };
            return p.init(), {
                refresh: p.refresh
            };
        }
        function i(t) {
            0 < t ? ($(".csm-group-cart").addClass("csm-active"), $(".amount-items-em").addClass("amount-items-action")) : $(".csm-group-cart").removeClass("csm-active");
        }
        jQuery.vtex_quick_cart = function(t) {
            return new e(t);
        }, jQuery.vtex_quick_cart({
            items_text: [ '<em class="amount-items-em">0</em>', "", "" ],
            callback: function() {
                vtexjs.checkout.getOrderForm().done(function(t) {
                    i(t.items[0].quantity);
                });
            }
        });
    },
    minicartOpen: function() {
        var t = $(".csm-header .csm-cart >a"), e = $(".csm-minicart"), i = $(".portal-totalizers-ref .amount-items-em").eq(0).text();
        $(".js--minicart-close__amount").text(i), $(".js--minicart-count").text(i), 768 <= $("body").width() ? (t.hover(function(t) {
            if ($(".csm-minicart__products li").length) return e.addClass("is--active"), !1;
        }), e.hover(function() {}, function() {
            e.removeClass("is--active");
        })) : t.click(function(t) {
            if ($(".csm-minicart__products li").length) return e.toggleClass("is--active"), 
            !1;
        });
    }
}), APP.controller.Home = ClassAvanti.extend({
    init: function() {
        this.start(), this.bind();
    },
    start: function() {
        this.countdown();
    },
    bind: function() {},
    countdown: function() {
        $(document).ready(function() {
            $("body").on("click", ".btn_link--bg_black", function(t) {
                t.preventDefault(), t.stopPropagation();
                var e = $(this).data("sku"), t = document.cookie.split("; VTEXSC=").pop().split(";").shift().split("sc=")[1];
                return vtexjs.checkout.addToCart([ {
                    id: e,
                    quantity: 1,
                    seller: "1"
                } ], null, t).done(function(t) {
                    console.log(t), $(".vtexsc-cart").show(), $("#popup-adicionando, #barratempo").addClass("active"), 
                    setTimeout(function() {
                        $(".vtexsc-cart").hide(), $("#popup-adicionando, #barratempo").removeClass("active");
                    }, 2200);
                }), !1;
            });
        });
    }
}), APP.controller.Orders = ClassAvanti.extend({
    init: function() {
        this.start();
    },
    start: function() {
        this.removeBoostrap();
    },
    removeBoostrap: function() {
        $('link[href$="bootstrap.min.css"]').remove();
    }
}), APP.controller.Product = ClassAvanti.extend({
    init: function() {
        this.setup(), this.start(), this.bind();
    },
    setup: function() {
        APP.i.Popup = new APP.component.Popup(), this.orderForm = null;
    },
    start: function() {
        this.DescktopImg(), this.FixerBotoom(), this.getOrderForm(), this.availableAlert(), 
        this.realidadeAl(), this.pdfDowlond();
    },
    bind: function() {
        this.bindBuyButton();
    },
    DescktopImg: function() {
        $("#botaoZoom img").each(function() {
            $(this).attr("src", $(this).attr("src").replace("-350-303", "-400-600"));
        });
    },
    FixerBotoom: function() {
        var t = 0;
        $(document).ready(function() {
            $(window).width() < 450 && $(window).scroll(function() {
                $(window).scrollTop() > t && 1 < $(window).scrollTop() ? $(".product-buy").addClass("fixerBotoom") : 0 == $(window).scrollTop() || $(".product-buy").removeClass("fixerBotoom"), 
                t = $(window).scrollTop();
            });
        });
    },
    getOrderForm: function() {
        var e = this;
        vtexjs.checkout.getOrderForm().done(function(t) {
            e.orderForm = t;
        });
    },
    //verificado até aqui
    isSkuInOrderForm: function(t) {
        var e = this.orderForm.items, i = !0, o = !1, s = void 0;
        try {
            for (var n, r = e[Symbol.iterator](); !(i = (n = r.next()).done); i = !0) if (n.value.id === t) return !0;
        } catch (t) {
            o = !0, s = t;
        } finally {
            try {
                !i && r.return && r.return();
            } finally {
                if (o) throw s;
            }
        }
        return !1;
    },
    activePromotion: function() {
        var t = this.orderForm.value, e = $(".buy-button.buy-button-ref").attr("href"), e = this._getParameterByName(e, "sku"), t = t;
        return this.isSkuInOrderForm(e) || (t += parseInt($(".price-best-price").text().replace(/^\D+/g, "")) * (e = parseInt($(".quantity-input, .quantitySelector input").val())) * 100, 
        console.log(e)), t >= $(".popup-promocao").data("price");
    },
    bindBuyButton: function() {
        var e = this;
        $("body").on("click", ".buy-button, .btn-buy-prod", function(t) {
            return e.activePromotion() ? (console.log("ativo"), APP.i.Popup.triggerModal()) : (/qty=0/.test($(".buy-button.buy-button-ref").attr("href")) && $(".buy-button.buy-button-ref").replace(/qty=\d+/, "qty=1"), 
            window.location.href = $(".buy-button.buy-button-ref").attr("href")), !1;
        });
    },
    _getParameterByName: function(t, e) {
        t = RegExp("[?&]" + e + "=([^&]*)").exec(t);
        return t && decodeURIComponent(t[1].replace(/\+/g, " "));
    },
    availableAlert: function() {
        var t = skuJson.productId;
        $.ajax({
            url: "/api/catalog_system/pub/products/search/?fq=productId:" + t,
            method: "GET",
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function(t) {
            var e = t[0].items[0].sellers[0].commertialOffer.AvailableQuantity, t = t[0].brand;
            0 < e && e <= 5 && $(".price-quanty").after('<div class="available-alert"><p>Corre que só tem <strong>' + e + "</strong> unidades disponÃ­veis!</p></div>"), 
            $(".product-aside-top").after('<div class="available-alert"><p>Produzido e entregue por: <strong>' + t + "</strong></p></div>");
        });
    },
    realidadeAl: function() {
        var t = navigator.userAgent || navigator.vendor || window.opera, e = $(".value-field.3D-ios").text(), i = $(".value-field.3D-android").text(), o = $(".value-field.3D-ios").text(), s = $(".value-field.3D-desktop").text();
        $(".value-field.3D-desktop-ios").text();
        $(".name-field.3D-android").closest("tr").hide(), $(".name-field.3D-ios").closest("tr").hide(), 
        $(".productAugmentedRealityBox").hide(), $(".value-field.3D-desktop").closest("tr").hide(), 
        $(".value-field.3D-desktop-ios").closest("tr").hide(), "" != o && $("#csm-realidadeAumentada").show(), 
        "" != s && ($(".productAugmentedRealityBox").show(), $(".productAugmentedRealityBox").attr("src", s)), 
        /android/i.test(t) && ($("#botaoAndroid").attr("href", i), $("#botaoAndroid").closest("button").show()), 
        /iPad|iPhone|iPod/.test(t) && !window.MSStream && ($("#botaoiOS").attr("href", e), 
        $("#botaoiOS").closest("button").show(), $(".productAugmentedRealityBox").hide());
    },
    pdfDowlond: function() {
        var t = $(".value-field.pdf-dowload").text();
        $(".value-field.pdf-dowload").closest("tr").hide(), "" != t && (console.log("testeaqi"), 
        $(".csm-dowload-pdf").show(), $("#csm-pdf-to-download").attr("href", t));
    }
});