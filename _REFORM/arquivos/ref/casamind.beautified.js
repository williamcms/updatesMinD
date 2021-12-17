// Script verificado
var _____WB$wombat$assign$function_____ = function(name) {
    return self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name) || self[name];
};

if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    };
}

{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");
    !function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define([ "jquery" ], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery);
    }(function(t) {
        "use strict";
        var e = window.Slick || {};
        (e = function() {
            var e = 0;
            return function(i, o) {
                var s, n, a = this;
                if (a.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, e) {
                        return '<button type="button" data-role="none">' + (e + 1) + "</button>";
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    onBeforeChange: null,
                    onAfterChange: null,
                    onInit: null,
                    onReInit: null,
                    onSetPosition: null,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rtl: !1,
                    slide: "div",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    waitForAnimate: !0
                }, a.initials = {
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
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                }, t.extend(a, a.initials), a.activeBreakpoint = null, a.animType = null, a.animProp = null, 
                a.breakpoints = [], a.breakpointSettings = [], a.cssTransitions = !1, a.paused = !1, 
                a.positionProp = null, a.respondTo = null, a.shouldClick = !0, a.$slider = t(i), 
                a.$slidesCache = null, a.transformType = null, a.transitionType = null, a.windowWidth = 0, 
                a.windowTimer = null, a.options = t.extend({}, a.defaults, o), a.currentSlide = a.options.initialSlide, 
                a.originalSettings = a.options, (s = a.options.responsive || null) && s.length > -1) {
                    for (n in a.respondTo = a.options.respondTo || "window", s) s.hasOwnProperty(n) && (a.breakpoints.push(s[n].breakpoint), 
                    a.breakpointSettings[s[n].breakpoint] = s[n].settings);
                    a.breakpoints.sort(function(t, e) {
                        return e - t;
                    });
                }
                a.autoPlay = t.proxy(a.autoPlay, a), a.autoPlayClear = t.proxy(a.autoPlayClear, a), 
                a.changeSlide = t.proxy(a.changeSlide, a), a.clickHandler = t.proxy(a.clickHandler, a), 
                a.selectHandler = t.proxy(a.selectHandler, a), a.setPosition = t.proxy(a.setPosition, a), 
                a.swipeHandler = t.proxy(a.swipeHandler, a), a.dragHandler = t.proxy(a.dragHandler, a), 
                a.keyHandler = t.proxy(a.keyHandler, a), a.autoPlayIterator = t.proxy(a.autoPlayIterator, a), 
                a.instanceUid = e++, a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, a.init(), a.checkResponsive();
            };
        }()).prototype.addSlide = function(e, i, o) {
            var s = this;
            if ("boolean" == typeof i) o = i, i = null; else if (0 > i || i >= s.slideCount) return !1;
            s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? t(e).appendTo(s.$slideTrack) : o ? t(e).insertBefore(s.$slides.eq(i)) : t(e).insertAfter(s.$slides.eq(i)) : !0 === o ? t(e).prependTo(s.$slideTrack) : t(e).appendTo(s.$slideTrack), 
            s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), 
            s.$slideTrack.append(s.$slides), s.$slides.each(function(e, i) {
                t(i).attr("index", e);
            }), s.$slidesCache = s.$slides, s.reinit();
        }, e.prototype.animateSlide = function(e, i) {
            var o = {}, s = this;
            if (1 === s.options.slidesToShow && !0 === s.options.adaptiveHeight && !1 === s.options.vertical) {
                var n = s.$slides.eq(s.currentSlide).outerHeight(!0);
                s.$list.animate({
                    height: n
                }, s.options.speed);
            }
            !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                left: e
            }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
                top: e
            }, s.options.speed, s.options.easing, i) : !1 === s.cssTransitions ? t({
                animStart: s.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function(t) {
                    !1 === s.options.vertical ? (o[s.animType] = "translate(" + t + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + t + "px)", 
                    s.$slideTrack.css(o));
                },
                complete: function() {
                    i && i.call();
                }
            }) : (s.applyTransition(), o[s.animType] = !1 === s.options.vertical ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(0px," + e + "px, 0px)", 
            s.$slideTrack.css(o), i && setTimeout(function() {
                s.disableTransition(), i.call();
            }, s.options.speed));
        }, e.prototype.asNavFor = function(e) {
            var i = null != this.options.asNavFor ? t(this.options.asNavFor).getSlick() : null;
            null != i && i.slideHandler(e, !0);
        }, e.prototype.applyTransition = function(t) {
            var e = this, i = {};
            i[e.transitionType] = !1 === e.options.fade ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : "opacity " + e.options.speed + "ms " + e.options.cssEase, 
            !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
        }, e.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && !0 !== t.paused && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
        }, e.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        }, e.prototype.autoPlayIterator = function() {
            var t = this;
            !1 === t.options.infinite ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), 
            t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (0 == t.currentSlide - 1 && (t.direction = 1), 
            t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll);
        }, e.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow = t(e.options.prevArrow), 
            e.$nextArrow = t(e.options.nextArrow), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.appendTo(e.options.appendArrows), 
            e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), 
            !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled"));
        }, e.prototype.buildDots = function() {
            var e, i, o = this;
            if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
                for (i = '<ul class="' + o.options.dotsClass + '">', e = 0; e <= o.getDotCount(); e += 1) i += "<li>" + o.options.customPaging.call(this, o, e) + "</li>";
                i += "</ul>", o.$dots = t(i).appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active");
            }
        }, e.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
            e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
                t(i).attr("index", e);
            }), e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), 
            e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), 
            !0 === e.options.centerMode && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), 
            e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), !0 === e.options.accessibility && e.$list.prop("tabIndex", 0), 
            e.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), 
            !0 === e.options.draggable && e.$list.addClass("draggable");
        }, e.prototype.checkResponsive = function() {
            var e, i, o, s = this, n = s.$slider.width(), a = window.innerWidth || t(window).width();
            if ("window" === s.respondTo ? o = a : "slider" === s.respondTo ? o = n : "min" === s.respondTo && (o = Math.min(a, n)), 
            s.originalSettings.responsive && s.originalSettings.responsive.length > -1 && null !== s.originalSettings.responsive) {
                for (e in i = null, s.breakpoints) s.breakpoints.hasOwnProperty(e) && o < s.breakpoints[e] && (i = s.breakpoints[e]);
                null !== i ? null !== s.activeBreakpoint ? i !== s.activeBreakpoint && (s.activeBreakpoint = i, 
                s.options = t.extend({}, s.originalSettings, s.breakpointSettings[i]), s.refresh()) : (s.activeBreakpoint = i, 
                s.options = t.extend({}, s.originalSettings, s.breakpointSettings[i]), s.refresh()) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, 
                s.options = s.originalSettings, s.refresh());
            }
        }, e.prototype.changeSlide = function(e, i) {
            var o, s, n, a, r = this;
            switch (t(e.target).is("a") && e.preventDefault(), o = 0 != r.slideCount % r.options.slidesToScroll ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, 
            e.data.message) {
              case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, i);
                break;

              case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, i);
                break;

              case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || t(e.target).parent().index() * r.options.slidesToScroll;
                if (a = 0, (n = r.getNavigableIndexes())[l] && n[l] === l) if (l > n[n.length - 1]) l = n[n.length - 1]; else for (var c in n) {
                    if (l < n[c]) {
                        l = a;
                        break;
                    }
                    a = n[c];
                }
                r.slideHandler(l, !1, i);

              default:
                return;
            }
        }, e.prototype.clickHandler = function(t) {
            !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
        }, e.prototype.destroy = function() {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), 
            e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), 
            e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), 
            e.$slides.parent().hasClass("slick-track") && e.$slides.unwrap().unwrap(), e.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css({
                position: "",
                left: "",
                top: "",
                zIndex: "",
                opacity: "",
                width: ""
            }), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), 
            e.$list.off(".slick"), t(window).off(".slick-" + e.instanceUid), t(document).off(".slick-" + e.instanceUid);
        }, e.prototype.disableTransition = function(t) {
            var e = this, i = {};
            i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
        }, e.prototype.fadeSlide = function(t, e, i) {
            var o = this;
            !1 === o.cssTransitions ? (o.$slides.eq(e).css({
                zIndex: 1e3
            }), o.$slides.eq(e).animate({
                opacity: 1
            }, o.options.speed, o.options.easing, i), o.$slides.eq(t).animate({
                opacity: 0
            }, o.options.speed, o.options.easing)) : (o.applyTransition(e), o.applyTransition(t), 
            o.$slides.eq(e).css({
                opacity: 1,
                zIndex: 1e3
            }), o.$slides.eq(t).css({
                opacity: 0
            }), i && setTimeout(function() {
                o.disableTransition(e), o.disableTransition(t), i.call();
            }, o.options.speed));
        }, e.prototype.filterSlides = function(t) {
            var e = this;
            null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), 
            e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
        }, e.prototype.getCurrent = function() {
            return this.currentSlide;
        }, e.prototype.getDotCount = function() {
            var t = this, e = 0, i = 0, o = 0;
            if (!0 === t.options.infinite) o = Math.ceil(t.slideCount / t.options.slidesToScroll); else for (;e < t.slideCount; ) ++o, 
            e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return o - 1;
        }, e.prototype.getLeft = function(t) {
            var e, i, o, s = this, n = 0;
            return s.slideOffset = 0, i = s.$slides.first().outerHeight(), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = -1 * s.slideWidth * s.options.slidesToShow, 
            n = -1 * i * s.options.slidesToShow), 0 != s.slideCount % s.options.slidesToScroll && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = -1 * (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth, 
            n = -1 * (s.options.slidesToShow - (t - s.slideCount)) * i) : (s.slideOffset = -1 * s.slideCount % s.options.slidesToScroll * s.slideWidth, 
            n = -1 * s.slideCount % s.options.slidesToScroll * i))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth, 
            n = (t + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, 
            n = 0), !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, 
            s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = !1 === s.options.vertical ? -1 * t * s.slideWidth + s.slideOffset : -1 * t * i + n, 
            !0 === s.options.variableWidth && (e = (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow))[0] ? -1 * o[0].offsetLeft : 0, 
            !0 === s.options.centerMode && (e = (o = !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1))[0] ? -1 * o[0].offsetLeft : 0, 
            e += (s.$list.width() - o.outerWidth()) / 2)), e;
        }, e.prototype.getNavigableIndexes = function() {
            for (var t = this, e = 0, i = 0, o = []; e < t.slideCount; ) o.push(e), e = i + t.options.slidesToScroll, 
            i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return o;
        }, e.prototype.getSlideCount = function() {
            var e = this;
            if (!0 === e.options.swipeToSlide) {
                var i = null;
                return e.$slideTrack.find(".slick-slide").each(function(o, s) {
                    return s.offsetLeft + t(s).outerWidth() / 2 > -1 * e.swipeLeft ? (i = s, !1) : void 0;
                }), Math.abs(t(i).attr("index") - e.currentSlide);
            }
            return e.options.slidesToScroll;
        }, e.prototype.init = function() {
            var e = this;
            t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), 
            e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), 
            e.updateArrows(), e.updateDots()), null !== e.options.onInit && e.options.onInit.call(this, e);
        }, e.prototype.initArrowEvents = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.on("click.slick", {
                message: "next"
            }, t.changeSlide));
        }, e.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && !0 === e.options.autoplay && t("li", e.$dots).on("mouseenter.slick", function() {
                e.paused = !0, e.autoPlayClear();
            }).on("mouseleave.slick", function() {
                e.paused = !1, e.autoPlay();
            });
        }, e.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), !0 === e.options.pauseOnHover && !0 === e.options.autoplay && (e.$list.on("mouseenter.slick", function() {
                e.paused = !0, e.autoPlayClear();
            }), e.$list.on("mouseleave.slick", function() {
                e.paused = !1, e.autoPlay();
            })), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), 
            !0 === e.options.focusOnSelect && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), 
            t(window).on("orientationchange.slick.slick-" + e.instanceUid, function() {
                e.checkResponsive(), e.setPosition();
            }), t(window).on("resize.slick.slick-" + e.instanceUid, function() {
                t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                    e.windowWidth = t(window).width(), e.checkResponsive(), e.setPosition();
                }, 50));
            }), t("*[draggable!=true]", e.$slideTrack).on("dragstart", function(t) {
                t.preventDefault();
            }), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition);
        }, e.prototype.initUI = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), 
            t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show(), 
            !0 === t.options.autoplay && t.autoPlay();
        }, e.prototype.keyHandler = function(t) {
            var e = this;
            37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                data: {
                    message: "next"
                }
            });
        }, e.prototype.lazyLoad = function() {
            function e(e) {
                t("img[data-lazy]", e).each(function() {
                    var e = t(this), i = t(this).attr("data-lazy");
                    e.load(function() {
                        e.animate({
                            opacity: 1
                        }, 200);
                    }).css({
                        opacity: 0
                    }).attr("src", i).removeAttr("data-lazy").removeClass("slick-loading");
                });
            }
            var i, o, s = this;
            !0 === s.options.centerMode ? !0 === s.options.infinite ? o = (i = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (i = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), 
            o = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (o = (i = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide) + s.options.slidesToShow, 
            !0 === s.options.fade && (i > 0 && i--, o <= s.slideCount && o++)), e(s.$slider.find(".slick-slide").slice(i, o)), 
            s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow));
        }, e.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
        }, e.prototype.postSlide = function(t) {
            var e = this;
            null !== e.options.onAfterChange && e.options.onAfterChange.call(this, e, t), e.animating = !1, 
            e.setPosition(), e.swipeLeft = null, !0 === e.options.autoplay && !1 === e.paused && e.autoPlay();
        }, e.prototype.progressiveLazyLoad = function() {
            var e, i = this;
            t("img[data-lazy]", i.$slider).length > 0 && (e = t("img[data-lazy]", i.$slider).first()).attr("src", e.attr("data-lazy")).removeClass("slick-loading").load(function() {
                e.removeAttr("data-lazy"), i.progressiveLazyLoad();
            }).error(function() {
                e.removeAttr("data-lazy"), i.progressiveLazyLoad();
            });
        }, e.prototype.refresh = function() {
            var e = this, i = e.currentSlide;
            e.destroy(), t.extend(e, e.initials), e.init(), e.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !0);
        }, e.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, 
            e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), 
            e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.setProps(), e.setupInfinite(), 
            e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), 
            e.initDotEvents(), !0 === e.options.focusOnSelect && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), 
            e.setSlideClasses(0), e.setPosition(), null !== e.options.onReInit && e.options.onReInit.call(this, e);
        }, e.prototype.removeSlide = function(t, e, i) {
            var o = this;
            return "boolean" == typeof t ? t = !0 === (e = t) ? 0 : o.slideCount - 1 : t = !0 === e ? --t : t, 
            !(o.slideCount < 1 || 0 > t || t > o.slideCount - 1) && (o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(), 
            o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), 
            o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit());
        }, e.prototype.setCSS = function(t) {
            var e, i, o = this, s = {};
            !0 === o.options.rtl && (t = -t), e = "left" == o.positionProp ? t + "px" : "0px", 
            i = "top" == o.positionProp ? t + "px" : "0px", s[o.positionProp] = t, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, 
            !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + i + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)", 
            o.$slideTrack.css(s)));
        }, e.prototype.setDimensions = function() {
            var e = this;
            if (!1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), 
            !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth) e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), 
            e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length)); else if (!0 === e.options.variableWidth) {
                var i = 0;
                e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.children(".slick-slide").each(function() {
                    i += Math.ceil(t(this).outerWidth(!0));
                }), e.$slideTrack.width(Math.ceil(i) + 1);
            } else e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length));
            var o = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - o);
        }, e.prototype.setFade = function() {
            var e, i = this;
            i.$slides.each(function(o, s) {
                e = -1 * i.slideWidth * o, !0 === i.options.rtl ? t(s).css({
                    position: "relative",
                    right: e,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                }) : t(s).css({
                    position: "relative",
                    left: e,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                });
            }), i.$slides.eq(i.currentSlide).css({
                zIndex: 900,
                opacity: 1
            });
        }, e.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e);
            }
        }, e.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), 
            null !== t.options.onSetPosition && t.options.onSetPosition.call(this, t);
        }, e.prototype.setProps = function() {
            var t = this, e = document.body.style;
            t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), 
            (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && !0 === t.options.useCSS && (t.cssTransitions = !0), 
            void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", 
            t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), 
            void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", 
            t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), 
            void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", 
            t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), 
            void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", 
            t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), 
            void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", 
            t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && !1 !== t.animType;
        }, e.prototype.setSlideClasses = function(t) {
            var e, i, o, s, n = this;
            n.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), 
            i = n.$slider.find(".slick-slide"), !0 === n.options.centerMode ? (e = Math.floor(n.options.slidesToShow / 2), 
            !0 === n.options.infinite && (t >= e && t <= n.slideCount - 1 - e ? n.$slides.slice(t - e, t + e + 1).addClass("slick-active") : (o = n.options.slidesToShow + t, 
            i.slice(o - e + 1, o + e + 2).addClass("slick-active")), 0 === t ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")), 
            n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active") : i.length <= n.options.slidesToShow ? i.addClass("slick-active") : (s = n.slideCount % n.options.slidesToShow, 
            o = !0 === n.options.infinite ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? i.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active") : i.slice(o, o + n.options.slidesToShow).addClass("slick-active")), 
            "ondemand" === n.options.lazyLoad && n.lazyLoad();
        }, e.prototype.setupInfinite = function() {
            var e, i, o, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (i = null, 
            s.slideCount > s.options.slidesToShow)) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, 
                e = s.slideCount; e > s.slideCount - o; e -= 1) i = e - 1, t(s.$slides[i]).clone(!0).attr("id", "").attr("index", i - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (e = 0; o > e; e += 1) i = e, t(s.$slides[i]).clone(!0).attr("id", "").attr("index", i + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "");
                });
            }
        }, e.prototype.selectHandler = function(e) {
            var i = this, o = parseInt(t(e.target).parents(".slick-slide").attr("index"));
            return o || (o = 0), i.slideCount <= i.options.slidesToShow ? (i.$slider.find(".slick-slide").removeClass("slick-active"), 
            i.$slides.eq(o).addClass("slick-active"), !0 === i.options.centerMode && (i.$slider.find(".slick-slide").removeClass("slick-center"), 
            i.$slides.eq(o).addClass("slick-center")), void i.asNavFor(o)) : void i.slideHandler(o);
        }, e.prototype.slideHandler = function(t, e, i) {
            var o, s, n, a, r = null, l = this;
            return e = e || !1, !0 === l.animating && !0 === l.options.waitForAnimate || !0 === l.options.fade && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (!1 === e && l.asNavFor(t), 
            o = t, r = l.getLeft(o), a = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? a : l.swipeLeft, 
            !1 === l.options.infinite && !1 === l.options.centerMode && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void (!1 === l.options.fade && (o = l.currentSlide, 
            !0 !== i ? l.animateSlide(a, function() {
                l.postSlide(o);
            }) : l.postSlide(o))) : !1 === l.options.infinite && !0 === l.options.centerMode && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void (!1 === l.options.fade && (o = l.currentSlide, 
            !0 !== i ? l.animateSlide(a, function() {
                l.postSlide(o);
            }) : l.postSlide(o))) : (!0 === l.options.autoplay && clearInterval(l.autoPlayTimer), 
            s = 0 > o ? 0 != l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + o : o >= l.slideCount ? 0 != l.slideCount % l.options.slidesToScroll ? 0 : o - l.slideCount : o, 
            l.animating = !0, null !== l.options.onBeforeChange && t !== l.currentSlide && l.options.onBeforeChange.call(this, l, l.currentSlide, s), 
            n = l.currentSlide, l.currentSlide = s, l.setSlideClasses(l.currentSlide), l.updateDots(), 
            l.updateArrows(), !0 === l.options.fade ? void (!0 !== i ? l.fadeSlide(n, s, function() {
                l.postSlide(s);
            }) : l.postSlide(s)) : void (!0 !== i ? l.animateSlide(r, function() {
                l.postSlide(s);
            }) : l.postSlide(s))));
        }, e.prototype.startLoad = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), 
            t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), 
            t.$slider.addClass("slick-loading");
        }, e.prototype.swipeDirection = function() {
            var t, e, i, o, s = this;
            return t = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, 
            i = Math.atan2(e, t), 0 > (o = Math.round(180 * i / Math.PI)) && (o = 360 - Math.abs(o)), 
            45 >= o && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : 360 >= o && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && 225 >= o ? !1 === s.options.rtl ? "right" : "left" : "vertical";
        }, e.prototype.swipeEnd = function() {
            var t = this;
            if (t.dragging = !1, t.shouldClick = !(t.touchObject.swipeLength > 10), void 0 === t.touchObject.curX) return !1;
            if (t.touchObject.swipeLength >= t.touchObject.minSwipe) switch (t.swipeDirection()) {
              case "left":
                t.slideHandler(t.currentSlide + t.getSlideCount()), t.currentDirection = 0, t.touchObject = {};
                break;

              case "right":
                t.slideHandler(t.currentSlide - t.getSlideCount()), t.currentDirection = 1, t.touchObject = {};
            } else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), 
            t.touchObject = {});
        }, e.prototype.swipeHandler = function(t) {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, 
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, t.data.action) {
              case "start":
                e.swipeStart(t);
                break;

              case "move":
                e.swipeMove(t);
                break;

              case "end":
                e.swipeEnd(t);
            }
        }, e.prototype.swipeMove = function(t) {
            var e, i, o, s = this;
            return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!s.dragging || o && 1 !== o.length) && (e = s.getLeft(s.currentSlide), 
            s.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, s.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, 
            s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2))), 
            "vertical" !== s.swipeDirection() ? (void 0 !== t.originalEvent && s.touchObject.swipeLength > 4 && t.preventDefault(), 
            i = (!1 === s.options.rtl ? 1 : -1) * (s.touchObject.curX > s.touchObject.startX ? 1 : -1), 
            s.swipeLeft = !1 === s.options.vertical ? e + s.touchObject.swipeLength * i : e + s.touchObject.swipeLength * (s.$list.height() / s.listWidth) * i, 
            !0 !== s.options.fade && !1 !== s.options.touchMove && (!0 === s.animating ? (s.swipeLeft = null, 
            !1) : void s.setCSS(s.swipeLeft))) : void 0);
        }, e.prototype.swipeStart = function(t) {
            var e, i = this;
            return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, 
            !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), 
            i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, 
            i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, 
            void (i.dragging = !0));
        }, e.prototype.unfilterSlides = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), 
            t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
        }, e.prototype.unload = function() {
            var e = this;
            t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), 
            e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), 
            e.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "");
        }, e.prototype.updateArrows = function() {
            var t, e = this;
            t = Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && !0 !== e.options.infinite && e.slideCount > e.options.slidesToShow && (e.$prevArrow.removeClass("slick-disabled"), 
            e.$nextArrow.removeClass("slick-disabled"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled"), 
            e.$nextArrow.removeClass("slick-disabled")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled"), 
            e.$prevArrow.removeClass("slick-disabled")) : e.currentSlide > e.slideCount - e.options.slidesToShow + t && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled"), 
            e.$prevArrow.removeClass("slick-disabled")));
        }, e.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"));
        }, t.fn.slick = function(t) {
            return this.each(function(i, o) {
                o.slick = new e(o, t);
            });
        }, t.fn.slickAdd = function(t, e, i) {
            return this.each(function(o, s) {
                s.slick.addSlide(t, e, i);
            });
        }, t.fn.slickCurrentSlide = function() {
            return this.get(0).slick.getCurrent();
        }, t.fn.slickFilter = function(t) {
            return this.each(function(e, i) {
                i.slick.filterSlides(t);
            });
        }, t.fn.slickGoTo = function(t, e) {
            return this.each(function(i, o) {
                o.slick.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(t)
                    }
                }, e);
            });
        }, t.fn.slickNext = function() {
            return this.each(function(t, e) {
                e.slick.changeSlide({
                    data: {
                        message: "next"
                    }
                });
            });
        }, t.fn.slickPause = function() {
            return this.each(function(t, e) {
                e.slick.autoPlayClear(), e.slick.paused = !0;
            });
        }, t.fn.slickPlay = function() {
            return this.each(function(t, e) {
                e.slick.paused = !1, e.slick.autoPlay();
            });
        }, t.fn.slickPrev = function() {
            return this.each(function(t, e) {
                e.slick.changeSlide({
                    data: {
                        message: "previous"
                    }
                });
            });
        }, t.fn.slickRemove = function(t, e) {
            return this.each(function(i, o) {
                o.slick.removeSlide(t, e);
            });
        }, t.fn.slickRemoveAll = function() {
            return this.each(function(t, e) {
                e.slick.removeSlide(null, null, !0);
            });
        }, t.fn.slickGetOption = function(t) {
            return this.get(0).slick.options[t];
        }, t.fn.slickSetOption = function(t, e, i) {
            return this.each(function(o, s) {
                s.slick.options[t] = e, !0 === i && (s.slick.unload(), s.slick.reinit());
            });
        }, t.fn.slickUnfilter = function() {
            return this.each(function(t, e) {
                e.slick.unfilterSlides();
            });
        }, t.fn.unslick = function() {
            return this.each(function(t, e) {
                e.slick && e.slick.destroy();
            });
        }, t.fn.getSlick = function() {
            var t = null;
            return this.each(function(e, i) {
                t = i.slick;
            }), t;
        };
    }), function(t, e, i, o) {
        function s(e, i) {
            this.settings = null, this.options = t.extend({}, s.Defaults, i), this.$element = t(e), 
            this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, 
            this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, 
            this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, 
            this._pipe = [], this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            }, this._states = {
                current: {},
                tags: {
                    initializing: [ "busy" ],
                    animating: [ "busy" ],
                    dragging: [ "interacting" ]
                }
            }, t.each([ "onResize", "onThrottledResize" ], t.proxy(function(e, i) {
                this._handlers[i] = t.proxy(this[i], this);
            }, this)), t.each(s.Plugins, t.proxy(function(t, e) {
                this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
            }, this)), t.each(s.Workers, t.proxy(function(e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                });
            }, this)), this.setup(), this.initialize();
        }
        s.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            checkVisibility: !0,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: "swing",
            slideTransition: "",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        }, s.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        }, s.Type = {
            Event: "event",
            State: "state"
        }, s.Plugins = {}, s.Workers = [ {
            filter: [ "width", "settings" ],
            run: function() {
                this._width = this.$element.width();
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function(t) {
                t.current = this._items && this._items[this.relative(this._current)];
            }
        }, {
            filter: [ "items", "settings" ],
            run: function() {
                this.$stage.children(".cloned").remove();
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function(t) {
                var e = this.settings.margin || "", i = !this.settings.autoWidth, o = this.settings.rtl, s = {
                    width: "auto",
                    "margin-left": o ? e : "",
                    "margin-right": o ? "" : e
                };
                !i && this.$stage.children().css(s), t.css = s;
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function(t) {
                var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, i = null, o = this._items.length, s = !this.settings.autoWidth, n = [];
                for (t.items = {
                    merge: !1,
                    width: e
                }; o--; ) i = this._mergers[o], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, 
                t.items.merge = i > 1 || t.items.merge, n[o] = s ? e * i : this._items[o].width();
                this._widths = n;
            }
        }, {
            filter: [ "items", "settings" ],
            run: function() {
                var e = [], i = this._items, o = this.settings, s = Math.max(2 * o.items, 4), n = 2 * Math.ceil(i.length / 2), a = o.loop && i.length ? o.rewind ? s : Math.max(s, n) : 0, r = "", l = "";
                for (a /= 2; a > 0; ) e.push(this.normalize(e.length / 2, !0)), r += i[e[e.length - 1]][0].outerHTML, 
                e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l, 
                a -= 1;
                this._clones = e, t(r).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage);
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function() {
                for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, o = 0, s = 0, n = []; ++i < e; ) o = n[i - 1] || 0, 
                s = this._widths[this.relative(i)] + this.settings.margin, n.push(o + s * t);
                this._coordinates = n;
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function() {
                var t = this.settings.stagePadding, e = this._coordinates, i = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
                this.$stage.css(i);
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function(t) {
                var e = this._coordinates.length, i = !this.settings.autoWidth, o = this.$stage.children();
                if (i && t.items.merge) for (;e--; ) t.css.width = this._widths[this.relative(e)], 
                o.eq(e).css(t.css); else i && (t.css.width = t.items.width, o.css(t.css));
            }
        }, {
            filter: [ "items" ],
            run: function() {
                this._coordinates.length < 1 && this.$stage.removeAttr("style");
            }
        }, {
            filter: [ "width", "items", "settings" ],
            run: function(t) {
                t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), 
                this.reset(t.current);
            }
        }, {
            filter: [ "position" ],
            run: function() {
                this.animate(this.coordinates(this._current));
            }
        }, {
            filter: [ "width", "position", "items", "settings" ],
            run: function() {
                var t, e, i, o, s = this.settings.rtl ? 1 : -1, n = 2 * this.settings.stagePadding, a = this.coordinates(this.current()) + n, r = a + this.width() * s, l = [];
                for (i = 0, o = this._coordinates.length; i < o; i++) t = this._coordinates[i - 1] || 0, 
                e = Math.abs(this._coordinates[i]) + n * s, (this.op(t, "<=", a) && this.op(t, ">", r) || this.op(e, "<", a) && this.op(e, ">", r)) && l.push(i);
                this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), 
                this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
            }
        } ], s.prototype.initializeStage = function() {
            this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), 
            this.$stage = t("<" + this.settings.stageElement + ">", {
                class: this.settings.stageClass
            }).wrap(t("<div/>", {
                class: this.settings.stageOuterClass
            })), this.$element.append(this.$stage.parent()));
        }, s.prototype.initializeItems = function() {
            var e = this.$element.find(".owl-item");
            return e.length ? (this._items = e.get().map(function(e) {
                return t(e);
            }), this._mergers = this._items.map(function() {
                return 1;
            }), void this.refresh()) : (this.replace(this.$element.children().not(this.$stage.parent())), 
            this.isVisible() ? this.refresh() : this.invalidate("width"), void this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass));
        }, s.prototype.initialize = function() {
            var t, e, i;
            (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), 
            this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), 
            e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : o, 
            i = this.$element.children(e).width(), t.length && i <= 0 && this.preloadAutoWidthImages(t));
            this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), 
            this.trigger("initialized");
        }, s.prototype.isVisible = function() {
            return !this.settings.checkVisibility || this.$element.is(":visible");
        }, s.prototype.setup = function() {
            var e = this.viewport(), i = this.options.responsive, o = -1, s = null;
            i ? (t.each(i, function(t) {
                t <= e && t > o && (o = Number(t));
            }), "function" == typeof (s = t.extend({}, this.options, i[o])).stagePadding && (s.stagePadding = s.stagePadding()), 
            delete s.responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + o))) : s = t.extend({}, this.options), 
            this.trigger("change", {
                property: {
                    name: "settings",
                    value: s
                }
            }), this._breakpoint = o, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            });
        }, s.prototype.optionsLogic = function() {
            this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
        }, s.prototype.prepare = function(e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), 
            this.trigger("prepared", {
                content: i.data
            }), i.data;
        }, s.prototype.update = function() {
            for (var e = 0, i = this._pipe.length, o = t.proxy(function(t) {
                return this[t];
            }, this._invalidated), s = {}; e < i; ) (this._invalidated.all || t.grep(this._pipe[e].filter, o).length > 0) && this._pipe[e].run(s), 
            e++;
            this._invalidated = {}, !this.is("valid") && this.enter("valid");
        }, s.prototype.width = function(t) {
            switch (t = t || s.Width.Default) {
              case s.Width.Inner:
              case s.Width.Outer:
                return this._width;

              default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin;
            }
        }, s.prototype.refresh = function() {
            this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), 
            this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), 
            this.leave("refreshing"), this.trigger("refreshed");
        }, s.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
        }, s.prototype.onResize = function() {
            return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), 
            this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), 
            this.refresh(), this.leave("resizing"), void this.trigger("resized")));
        }, s.prototype.registerEventHandlers = function() {
            t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), 
            !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), 
            this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), 
            this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return !1;
            })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), 
            this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)));
        }, s.prototype.onDragStart = function(e) {
            var o = null;
            3 !== e.which && (t.support.transform ? o = {
                x: (o = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === o.length ? 12 : 4],
                y: o[16 === o.length ? 13 : 5]
            } : (o = this.$stage.position(), o = {
                x: this.settings.rtl ? o.left + this.$stage.width() - this.width() + this.settings.margin : o.left,
                y: o.top
            }), this.is("animating") && (t.support.transform ? this.animate(o.x) : this.$stage.stop(), 
            this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), 
            this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = t(e.target), 
            this._drag.stage.start = o, this._drag.stage.current = o, this._drag.pointer = this.pointer(e), 
            t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
                var o = this.difference(this._drag.pointer, this.pointer(e));
                t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), 
                Math.abs(o.x) < Math.abs(o.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), 
                this.trigger("drag"));
            }, this)));
        }, s.prototype.onDragMove = function(t) {
            var e = null, i = null, o = null, s = this.difference(this._drag.pointer, this.pointer(t)), n = this.difference(this._drag.stage.start, s);
            this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), 
            i = this.coordinates(this.maximum() + 1) - e, n.x = ((n.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), 
            i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), 
            o = this.settings.pullDrag ? -1 * s.x / 5 : 0, n.x = Math.max(Math.min(n.x, e + o), i + o)), 
            this._drag.stage.current = n, this.animate(n.x));
        }, s.prototype.onDragEnd = function(e) {
            var o = this.difference(this._drag.pointer, this.pointer(e)), s = this._drag.stage.current, n = o.x > 0 ^ this.settings.rtl ? "left" : "right";
            t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== o.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), 
            this.current(this.closest(s.x, 0 !== o.x ? n : this._drag.direction)), this.invalidate("position"), 
            this.update(), this._drag.direction = n, (Math.abs(o.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
                return !1;
            })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
        }, s.prototype.closest = function(e, i) {
            var s = -1, n = this.width(), a = this.coordinates();
            return this.settings.freeDrag || t.each(a, t.proxy(function(t, r) {
                return "left" === i && e > r - 30 && e < r + 30 ? s = t : "right" === i && e > r - n - 30 && e < r - n + 30 ? s = t + 1 : this.op(e, "<", r) && this.op(e, ">", a[t + 1] !== o ? a[t + 1] : r - n) && (s = "left" === i ? t + 1 : t), 
                -1 === s;
            }, this)), this.settings.loop || (this.op(e, ">", a[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", a[this.maximum()]) && (s = e = this.maximum())), 
            s;
        }, s.prototype.animate = function(e) {
            var i = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), 
            t.support.transform3d && t.support.transition ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
            }) : i ? this.$stage.animate({
                left: e + "px"
            }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                left: e + "px"
            });
        }, s.prototype.is = function(t) {
            return this._states.current[t] && this._states.current[t] > 0;
        }, s.prototype.current = function(t) {
            if (t === o) return this._current;
            if (0 === this._items.length) return o;
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                e.data !== o && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), 
                this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                });
            }
            return this._current;
        }, s.prototype.invalidate = function(e) {
            return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), 
            t.map(this._invalidated, function(t, e) {
                return e;
            });
        }, s.prototype.reset = function(t) {
            (t = this.normalize(t)) !== o && (this._speed = 0, this._current = t, this.suppress([ "translate", "translated" ]), 
            this.animate(this.coordinates(t)), this.release([ "translate", "translated" ]));
        }, s.prototype.normalize = function(t, e) {
            var i = this._items.length, s = e ? 0 : this._clones.length;
            return !this.isNumeric(t) || i < 1 ? t = o : (t < 0 || t >= i + s) && (t = ((t - s / 2) % i + i) % i + s / 2), 
            t;
        }, s.prototype.relative = function(t) {
            return t -= this._clones.length / 2, this.normalize(t, !0);
        }, s.prototype.maximum = function(t) {
            var e, i, o, s = this.settings, n = this._coordinates.length;
            if (s.loop) n = this._clones.length / 2 + this._items.length - 1; else if (s.autoWidth || s.merge) {
                if (e = this._items.length) for (i = this._items[--e].width(), o = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > o); );
                n = e + 1;
            } else n = s.center ? this._items.length - 1 : this._items.length - s.items;
            return t && (n -= this._clones.length / 2), Math.max(n, 0);
        }, s.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2;
        }, s.prototype.items = function(t) {
            return t === o ? this._items.slice() : (t = this.normalize(t, !0), this._items[t]);
        }, s.prototype.mergers = function(t) {
            return t === o ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t]);
        }, s.prototype.clones = function(e) {
            var i = this._clones.length / 2, s = i + this._items.length, n = function(t) {
                return t % 2 == 0 ? s + t / 2 : i - (t + 1) / 2;
            };
            return e === o ? t.map(this._clones, function(t, e) {
                return n(e);
            }) : t.map(this._clones, function(t, i) {
                return t === e ? n(i) : null;
            });
        }, s.prototype.speed = function(t) {
            return t !== o && (this._speed = t), this._speed;
        }, s.prototype.coordinates = function(e) {
            var i, s = 1, n = e - 1;
            return e === o ? t.map(this._coordinates, t.proxy(function(t, e) {
                return this.coordinates(e);
            }, this)) : (this.settings.center ? (this.settings.rtl && (s = -1, n = e + 1), i = this._coordinates[e], 
            i += (this.width() - i + (this._coordinates[n] || 0)) / 2 * s) : i = this._coordinates[n] || 0, 
            i = Math.ceil(i));
        }, s.prototype.duration = function(t, e, i) {
            return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
        }, s.prototype.to = function(t, e) {
            var i = this.current(), o = null, s = t - this.relative(i), n = (s > 0) - (s < 0), a = this._items.length, r = this.minimum(), l = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(s) > a / 2 && (s += -1 * n * a), 
            (o = (((t = i + s) - r) % a + a) % a + r) !== t && o - s <= l && o - s > 0 && (i = o - s, 
            t = o, this.reset(i))) : this.settings.rewind ? t = (t % (l += 1) + l) % l : t = Math.max(r, Math.min(l, t)), 
            this.speed(this.duration(i, t, e)), this.current(t), this.isVisible() && this.update();
        }, s.prototype.next = function(t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t);
        }, s.prototype.prev = function(t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t);
        }, s.prototype.onTransitionEnd = function(t) {
            return (t === o || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), 
            void this.trigger("translated"));
        }, s.prototype.viewport = function() {
            var o;
            return this.options.responsiveBaseElement !== e ? o = t(this.options.responsiveBaseElement).width() : e.innerWidth ? o = e.innerWidth : i.documentElement && i.documentElement.clientWidth && (o = i.documentElement.clientWidth), 
            o;
        }, s.prototype.replace = function(e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), 
            this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), 
            e.filter(function() {
                return 1 === this.nodeType;
            }).each(t.proxy(function(t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
            }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), 
            this.invalidate("items");
        }, s.prototype.add = function(e, i) {
            var s = this.relative(this._current);
            i = i === o ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), 
            this.trigger("add", {
                content: e,
                position: i
            }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 
            0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), 
            this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), 
            this._items[s] && this.reset(this._items[s].index()), this.invalidate("items"), 
            this.trigger("added", {
                content: e,
                position: i
            });
        }, s.prototype.remove = function(t) {
            (t = this.normalize(t, !0)) !== o && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), 
            this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }));
        }, s.prototype.preloadAutoWidthImages = function(e) {
            e.each(t.proxy(function(e, i) {
                this.enter("pre-loading"), i = t(i), t(new Image()).one("load", t.proxy(function(t) {
                    i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"));
            }, this));
        }, s.prototype.destroy = function() {
            for (var o in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), 
            !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), 
            this._plugins) this._plugins[o].destroy();
            this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), 
            this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
        }, s.prototype.op = function(t, e, i) {
            var o = this.settings.rtl;
            switch (e) {
              case "<":
                return o ? t > i : t < i;

              case ">":
                return o ? t < i : t > i;

              case ">=":
                return o ? t <= i : t >= i;

              case "<=":
                return o ? t >= i : t <= i;
            }
        }, s.prototype.on = function(t, e, i, o) {
            t.addEventListener ? t.addEventListener(e, i, o) : t.attachEvent && t.attachEvent("on" + e, i);
        }, s.prototype.off = function(t, e, i, o) {
            t.removeEventListener ? t.removeEventListener(e, i, o) : t.detachEvent && t.detachEvent("on" + e, i);
        }, s.prototype.trigger = function(e, i, o, n, a) {
            var r = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }, l = t.camelCase(t.grep([ "on", e, o ], function(t) {
                return t;
            }).join("-").toLowerCase()), c = t.Event([ e, "owl", o || "carousel" ].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, r, i));
            return this._supress[e] || (t.each(this._plugins, function(t, e) {
                e.onTrigger && e.onTrigger(c);
            }), this.register({
                type: s.Type.Event,
                name: e
            }), this.$element.trigger(c), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)), 
            c;
        }, s.prototype.enter = function(e) {
            t.each([ e ].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                this._states.current[e] === o && (this._states.current[e] = 0), this._states.current[e]++;
            }, this));
        }, s.prototype.leave = function(e) {
            t.each([ e ].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                this._states.current[e]--;
            }, this));
        }, s.prototype.register = function(e) {
            if (e.type === s.Type.Event) {
                if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                    var i = t.event.special[e.name]._default;
                    t.event.special[e.name]._default = function(t) {
                        return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments);
                    }, t.event.special[e.name].owl = !0;
                }
            } else e.type === s.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, 
            this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, o) {
                return t.inArray(i, this._states.tags[e.name]) === o;
            }, this)));
        }, s.prototype.suppress = function(e) {
            t.each(e, t.proxy(function(t, e) {
                this._supress[e] = !0;
            }, this));
        }, s.prototype.release = function(e) {
            t.each(e, t.proxy(function(t, e) {
                delete this._supress[e];
            }, this));
        }, s.prototype.pointer = function(t) {
            var i = {
                x: null,
                y: null
            };
            return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, 
            i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i;
        }, s.prototype.isNumeric = function(t) {
            return !isNaN(parseFloat(t));
        }, s.prototype.difference = function(t, e) {
            return {
                x: t.x - e.x,
                y: t.y - e.y
            };
        }, t.fn.owlCarousel = function(e) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var o = t(this), n = o.data("owl.carousel");
                n || (n = new s(this, "object" == typeof e && e), o.data("owl.carousel", n), t.each([ "next", "prev", "to", "destroy", "refresh", "replace", "add", "remove" ], function(e, i) {
                    n.register({
                        type: s.Type.Event,
                        name: i
                    }), n.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
                        t.namespace && t.relatedTarget !== this && (this.suppress([ i ]), n[i].apply(this, [].slice.call(arguments, 1)), 
                        this.release([ i ]));
                    }, n));
                })), "string" == typeof e && "_" !== e.charAt(0) && n[e].apply(n, i);
            });
        }, t.fn.owlCarousel.Constructor = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(e) {
            this._core = e, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoRefresh && this.watch();
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers);
        };
        s.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        }, s.prototype.watch = function() {
            this._interval || (this._visible = this._core.isVisible(), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
        }, s.prototype.refresh = function() {
            this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), 
            this._visible && this._core.invalidate("width") && this._core.refresh());
        }, s.prototype.destroy = function() {
            var t, i;
            for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) {
                        var i = this._core.settings, o = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && -1 * o || 0, n = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + s, a = this._core.clones().length, r = t.proxy(function(t, e) {
                            this.load(e);
                        }, this);
                        for (i.lazyLoadEager > 0 && (o += i.lazyLoadEager, i.loop && (n -= i.lazyLoadEager, 
                        o++)); s++ < o; ) this.load(a / 2 + this._core.relative(n)), a && t.each(this._core.clones(this._core.relative(n)), r), 
                        n++;
                    }
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers);
        };
        s.Defaults = {
            lazyLoad: !1,
            lazyLoadEager: 0
        }, s.prototype.load = function(i) {
            var o = this._core.$stage.children().eq(i), s = o && o.find(".owl-lazy");
            !s || t.inArray(o.get(0), this._loaded) > -1 || (s.each(t.proxy(function(i, o) {
                var s, n = t(o), a = e.devicePixelRatio > 1 && n.attr("data-src-retina") || n.attr("data-src") || n.attr("data-srcset");
                this._core.trigger("load", {
                    element: n,
                    url: a
                }, "lazy"), n.is("img") ? n.one("load.owl.lazy", t.proxy(function() {
                    n.css("opacity", 1), this._core.trigger("loaded", {
                        element: n,
                        url: a
                    }, "lazy");
                }, this)).attr("src", a) : n.is("source") ? n.one("load.owl.lazy", t.proxy(function() {
                    this._core.trigger("loaded", {
                        element: n,
                        url: a
                    }, "lazy");
                }, this)).attr("srcset", a) : ((s = new Image()).onload = t.proxy(function() {
                    n.css({
                        "background-image": 'url("' + a + '")',
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: n,
                        url: a
                    }, "lazy");
                }, this), s.src = a);
            }, this)), this._loaded.push(o.get(0)));
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(i) {
            this._core = i, this._previousHeight = null, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && this.update();
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update();
                }, this),
                "loaded.owl.lazy": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), 
            this._intervalId = null;
            var o = this;
            t(e).on("load", function() {
                o._core.settings.autoHeight && o.update();
            }), t(e).resize(function() {
                o._core.settings.autoHeight && (null != o._intervalId && clearTimeout(o._intervalId), 
                o._intervalId = setTimeout(function() {
                    o.update();
                }, 250));
            });
        };
        s.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, s.prototype.update = function() {
            var e = this._core._current, i = e + this._core.settings.items, o = this._core.settings.lazyLoad, s = this._core.$stage.children().toArray().slice(e, i), n = [], a = 0;
            t.each(s, function(e, i) {
                n.push(t(i).height());
            }), (a = Math.max.apply(null, n)) <= 1 && o && this._previousHeight && (a = this._previousHeight), 
            this._previousHeight = a, this._core.$stage.parent().height(a).addClass(this._core.settings.autoHeightClass);
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(e) {
            this._core = e, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: [ "interacting" ]
                    });
                }, this),
                "resize.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" === t.property.name && this._playing && this.stop();
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, t(e.content)));
                    }
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), 
            this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
                this.play(t);
            }, this));
        };
        s.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, s.prototype.fetch = function(t, e) {
            var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube", o = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"), s = t.attr("data-width") || this._core.settings.videoWidth, n = t.attr("data-height") || this._core.settings.videoHeight, a = t.attr("href");
            if (!a) throw new Error("Missing video URL.");
            if ((o = a.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube"; else if (o[3].indexOf("vimeo") > -1) i = "vimeo"; else {
                if (!(o[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                i = "vzaar";
            }
            o = o[6], this._videos[a] = {
                type: i,
                id: o,
                width: s,
                height: n
            }, e.attr("data-video", a), this.thumbnail(t, this._videos[a]);
        }, s.prototype.thumbnail = function(e, i) {
            var o, s, n = i.width && i.height ? "width:" + i.width + "px;height:" + i.height + "px;" : "", a = e.find("img"), r = "src", l = "", c = this._core.settings, d = function(i) {
                '<div class="owl-video-play-icon"></div>', o = c.lazyLoad ? t("<div/>", {
                    class: "owl-video-tn " + l,
                    srcType: i
                }) : t("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + i + ")"
                }), e.after(o), e.after('<div class="owl-video-play-icon"></div>');
            };
            return e.wrap(t("<div/>", {
                class: "owl-video-wrapper",
                style: n
            })), this._core.settings.lazyLoad && (r = "data-src", l = "owl-lazy"), a.length ? (d(a.attr(r)), 
            a.remove(), !1) : void ("youtube" === i.type ? (s = "//web.archive.org/web/20210902201234/https://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", 
            d(s)) : "vimeo" === i.type ? t.ajax({
                type: "GET",
                url: "//web.archive.org/web/20210902201234/https://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    s = t[0].thumbnail_large, d(s);
                }
            }) : "vzaar" === i.type && t.ajax({
                type: "GET",
                url: "//web.archive.org/web/20210902201234/https://vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    s = t.framegrab_url, d(s);
                }
            }));
        }, s.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), 
            this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), 
            this._core.trigger("stopped", null, "video");
        }, s.prototype.play = function(e) {
            var i, o = t(e.target).closest("." + this._core.settings.itemClass), s = this._videos[o.attr("data-video")], n = s.width || "100%", a = s.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), 
            o = this._core.items(this._core.relative(o.index())), this._core.reset(o.index()), 
            (i = t('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", a), 
            i.attr("width", n), "youtube" === s.type ? i.attr("src", "//web.archive.org/web/20210902201234/https://www.youtube.com/embed/" + s.id + "?autoplay=1&rel=0&v=" + s.id) : "vimeo" === s.type ? i.attr("src", "//web.archive.org/web/20210902201234/https://player.vimeo.com/video/" + s.id + "?autoplay=1") : "vzaar" === s.type && i.attr("src", "//web.archive.org/web/20210902201234/https://view.vzaar.com/" + s.id + "/player?autoplay=true"), 
            t(i).wrap('<div class="owl-video-frame" />').insertAfter(o.find(".owl-video")), 
            this._playing = o.addClass("owl-video-playing"));
        }, s.prototype.isInFullScreen = function() {
            var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return e && t(e).parent().hasClass("owl-video-frame");
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.Video = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(e) {
            this.core = e, this.core.options = t.extend({}, s.Defaults, this.core.options), 
            this.swapping = !0, this.previous = o, this.next = o, this.handlers = {
                "change.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && (this.previous = this.core.current(), 
                    this.next = t.property.value);
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                    t.namespace && (this.swapping = "translated" == t.type);
                }, this),
                "translate.owl.carousel": t.proxy(function(t) {
                    t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                }, this)
            }, this.core.$element.on(this.handlers);
        };
        s.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, s.prototype.swap = function() {
            if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this), o = this.core.$stage.children().eq(this.previous), s = this.core.$stage.children().eq(this.next), n = this.core.settings.animateIn, a = this.core.settings.animateOut;
                this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), 
                o.one(t.support.animation.end, i).css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(a)), n && s.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(n));
            }
        }, s.prototype.clear = function(e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), 
            this.core.onTransitionEnd();
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        var s = function(e) {
            this._core = e, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, 
            this._handlers = {
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0);
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoplay && this.play();
                }, this),
                "play.owl.autoplay": t.proxy(function(t, e, i) {
                    t.namespace && this.play(e, i);
                }, this),
                "stop.owl.autoplay": t.proxy(function(t) {
                    t.namespace && this.stop();
                }, this),
                "mouseover.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                }, this),
                "touchstart.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                }, this),
                "touchend.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this.play();
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, s.Defaults, this._core.options);
        };
        s.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, s.prototype._next = function(o) {
            this._call = e.setTimeout(t.proxy(this._next, this, o), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), 
            this._core.is("interacting") || i.hidden || this._core.next(o || this._core.settings.autoplaySpeed);
        }, s.prototype.read = function() {
            return new Date().getTime() - this._time;
        }, s.prototype.play = function(i, o) {
            var s;
            this._core.is("rotating") || this._core.enter("rotating"), i = i || this._core.settings.autoplayTimeout, 
            s = Math.min(this._time % (this._timeout || i), i), this._paused ? (this._time = this.read(), 
            this._paused = !1) : e.clearTimeout(this._call), this._time += this.read() % i - s, 
            this._timeout = i, this._call = e.setTimeout(t.proxy(this._next, this, o), i - s);
        }, s.prototype.stop = function() {
            this._core.is("rotating") && (this._time = 0, this._paused = !0, e.clearTimeout(this._call), 
            this._core.leave("rotating"));
        }, s.prototype.pause = function() {
            this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, 
            e.clearTimeout(this._call));
        }, s.prototype.destroy = function() {
            var t, e;
            for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        "use strict";
        var s = function(e) {
            this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], 
            this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function(e) {
                    e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                }, this),
                "added.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                }, this),
                "remove.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && this.draw();
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), 
                    this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), 
                    this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers);
        };
        s.Defaults = {
            nav: !1,
            navText: [ '<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>' ],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: [ "owl-prev", "owl-next" ],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, s.prototype.initialize = function() {
            var e, i = this._core.settings;
            for (e in this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), 
            this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.prev(i.navSpeed);
            }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
                this.next(i.navSpeed);
            }, this)), i.dotsData || (this._templates = [ t('<button role="button">').addClass(i.dotClass).append(t("<span>")).prop("outerHTML") ]), 
            this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), 
            this._controls.$absolute.on("click", "button", t.proxy(function(e) {
                var o = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(o, i.dotsSpeed);
            }, this)), this._overrides) this._core[e] = t.proxy(this[e], this);
        }, s.prototype.destroy = function() {
            var t, e, i, o, s;
            for (t in s = this._core.settings, this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) "$relative" === e && s.navContainer ? this._controls[e].html("") : this._controls[e].remove();
            for (o in this.overides) this._core[o] = this._overrides[o];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
        }, s.prototype.update = function() {
            var t, e, i = this._core.clones().length / 2, o = i + this._core.items().length, s = this._core.maximum(!0), n = this._core.settings, a = n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items;
            if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy) for (this._pages = [], 
            t = i, e = 0, 0; t < o; t++) {
                if (e >= a || 0 === e) {
                    if (this._pages.push({
                        start: Math.min(s, t - i),
                        end: t - i + a - 1
                    }), Math.min(s, t - i) === s) break;
                    e = 0, 0;
                }
                e += this._core.mergers(this._core.relative(t));
            }
        }, s.prototype.draw = function() {
            var e, i = this._core.settings, o = this._core.items().length <= i.items, s = this._core.relative(this._core.current()), n = i.loop || i.rewind;
            this._controls.$relative.toggleClass("disabled", !i.nav || o), i.nav && (this._controls.$previous.toggleClass("disabled", !n && s <= this._core.minimum(!0)), 
            this._controls.$next.toggleClass("disabled", !n && s >= this._core.maximum(!0))), 
            this._controls.$absolute.toggleClass("disabled", !i.dots || o), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, 
            i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), 
            this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"));
        }, s.prototype.onTrigger = function(e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
            };
        }, s.prototype.current = function() {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, t.proxy(function(t, i) {
                return t.start <= e && t.end >= e;
            }, this)).pop();
        }, s.prototype.getPosition = function(e) {
            var i, o, s = this._core.settings;
            return "page" == s.slideBy ? (i = t.inArray(this.current(), this._pages), o = this._pages.length, 
            e ? ++i : --i, i = this._pages[(i % o + o) % o].start) : (i = this._core.relative(this._core.current()), 
            o = this._core.items().length, e ? i += s.slideBy : i -= s.slideBy), i;
        }, s.prototype.next = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
        }, s.prototype.prev = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
        }, s.prototype.to = function(e, i, o) {
            var s;
            !o && this._pages.length ? (s = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % s + s) % s].start, i)) : t.proxy(this._overrides.to, this._core)(e, i);
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        "use strict";
        var s = function(i) {
            this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation");
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = e.content;
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function(i) {
                    if (i.namespace && "position" === i.property.name) {
                        var o = this._core.items(this._core.relative(this._core.current())), s = t.map(this._hashes, function(t, e) {
                            return t === o ? e : null;
                        }).join();
                        if (!s || e.location.hash.slice(1) === s) return;
                        e.location.hash = s;
                    }
                }, this)
            }, this._core.options = t.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers), 
            t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
                var i = e.location.hash.substring(1), o = this._core.$stage.children(), s = this._hashes[i] && o.index(this._hashes[i]);
                void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0);
            }, this));
        };
        s.Defaults = {
            URLhashListener: !1
        }, s.prototype.destroy = function() {
            var i, o;
            for (i in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (o in Object.getOwnPropertyNames(this)) "function" != typeof this[o] && (this[o] = null);
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = s;
    }(window.Zepto || window.jQuery, window, document), function(t, e, i, o) {
        function s(e, i) {
            var s = !1, n = e.charAt(0).toUpperCase() + e.slice(1);
            return t.each((e + " " + r.join(n + " ") + n).split(" "), function(t, e) {
                if (a[e] !== o) return s = !i || e, !1;
            }), s;
        }
        function n(t) {
            return s(t, !0);
        }
        var a = t("<support>").get(0).style, r = "Webkit Moz O ms".split(" "), l = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        }, c = function() {
            return !!s("transform");
        }, d = function() {
            return !!s("perspective");
        }, u = function() {
            return !!s("animation");
        };
        (function() {
            return !!s("transition");
        })() && (t.support.transition = new String(n("transition")), t.support.transition.end = l.transition.end[t.support.transition]), 
        u() && (t.support.animation = new String(n("animation")), t.support.animation.end = l.animation.end[t.support.animation]), 
        c() && (t.support.transform = new String(n("transform")), t.support.transform3d = d());
    }(window.Zepto || window.jQuery, window, document);
    var $jscomp = {
        scope: {},
        findInternal: function(t, e, i) {
            t instanceof String && (t = String(t));
            for (var o = t.length, s = 0; s < o; s++) {
                var n = t[s];
                if (e.call(i, n, s, t)) return {
                    i: s,
                    v: n
                };
            }
            return {
                i: -1,
                v: void 0
            };
        }
    };
    $jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, i) {
        if (i.get || i.set) throw new TypeError("ES3 does not support getters and setters.");
        t != Array.prototype && t != Object.prototype && (t[e] = i.value);
    }, $jscomp.getGlobal = function(t) {
        return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(t, e, i, o) {
        if (e) {
            for (i = $jscomp.global, t = t.split("."), o = 0; o < t.length - 1; o++) {
                var s = t[o];
                s in i || (i[s] = {}), i = i[s];
            }
            (e = e(o = i[t = t[t.length - 1]])) != o && null != e && $jscomp.defineProperty(i, t, {
                configurable: !0,
                writable: !0,
                value: e
            });
        }
    }, $jscomp.polyfill("Array.prototype.find", function(t) {
        return t || function(t, e) {
            return $jscomp.findInternal(this, t, e).v;
        };
    }, "es6-impl", "es3"), function(t, e, i) {
        "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(e || i);
    }(function(t) {
        var e = function(e, i, o) {
            var s = {
                invalid: [],
                getCaret: function() {
                    try {
                        var t, i = 0, o = e.get(0), n = document.selection, a = o.selectionStart;
                        return n && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((t = n.createRange()).moveStart("character", -s.val().length), 
                        i = t.text.length) : (a || "0" === a) && (i = a), i;
                    } catch (t) {}
                },
                setCaret: function(t) {
                    try {
                        if (e.is(":focus")) {
                            var i, o = e.get(0);
                            o.setSelectionRange ? o.setSelectionRange(t, t) : ((i = o.createTextRange()).collapse(!0), 
                            i.moveEnd("character", t), i.moveStart("character", t), i.select());
                        }
                    } catch (t) {}
                },
                events: function() {
                    e.on("keydown.mask", function(t) {
                        e.data("mask-keycode", t.keyCode || t.which), e.data("mask-previus-value", e.val()), 
                        e.data("mask-previus-caret-pos", s.getCaret()), s.maskDigitPosMapOld = s.maskDigitPosMap;
                    }).on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", s.behaviour).on("paste.mask drop.mask", function() {
                        setTimeout(function() {
                            e.keydown().keyup();
                        }, 100);
                    }).on("change.mask", function() {
                        e.data("changed", !0);
                    }).on("blur.mask", function() {
                        r === s.val() || e.data("changed") || e.trigger("change"), e.data("changed", !1);
                    }).on("blur.mask", function() {
                        r = s.val();
                    }).on("focus.mask", function(e) {
                        !0 === o.selectOnFocus && t(e.target).select();
                    }).on("focusout.mask", function() {
                        o.clearIfNotMatch && !n.test(s.val()) && s.val("");
                    });
                },
                getRegexMask: function() {
                    for (var t, e, o, s, n = [], r = 0; r < i.length; r++) (t = a.translation[i.charAt(r)]) ? (e = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), 
                    o = t.optional, (t = t.recursive) ? (n.push(i.charAt(r)), s = {
                        digit: i.charAt(r),
                        pattern: e
                    }) : n.push(o || t ? e + "?" : e)) : n.push(i.charAt(r).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    return n = n.join(""), s && (n = n.replace(new RegExp("(" + s.digit + "(.*" + s.digit + ")?)"), "($1)?").replace(new RegExp(s.digit, "g"), s.pattern)), 
                    new RegExp(n);
                },
                destroyEvents: function() {
                    e.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "));
                },
                val: function(t) {
                    var i = e.is("input") ? "val" : "text";
                    return 0 < arguments.length ? (e[i]() !== t && e[i](t), i = e) : i = e[i](), i;
                },
                calculateCaretPosition: function() {
                    var t = e.data("mask-previus-value") || "", i = s.getMasked(), o = s.getCaret();
                    if (t !== i) {
                        var n, a = e.data("mask-previus-caret-pos") || 0, r = (i = i.length, t.length), l = t = 0, c = 0, d = 0;
                        for (n = o; n < i && s.maskDigitPosMap[n]; n++) l++;
                        for (n = o - 1; 0 <= n && s.maskDigitPosMap[n]; n--) t++;
                        for (n = o - 1; 0 <= n; n--) s.maskDigitPosMap[n] && c++;
                        for (n = a - 1; 0 <= n; n--) s.maskDigitPosMapOld[n] && d++;
                        o > r ? o = 10 * i : a >= o && a !== r ? s.maskDigitPosMapOld[o] || (a = o, o = o - (d - c) - t, 
                        s.maskDigitPosMap[o] && (o = a)) : o > a && (o = o + (c - d) + l);
                    }
                    return o;
                },
                behaviour: function(i) {
                    i = i || window.event, s.invalid = [];
                    var o = e.data("mask-keycode");
                    if (-1 === t.inArray(o, a.byPassKeys)) {
                        o = s.getMasked();
                        var n = s.getCaret();
                        return setTimeout(function() {
                            s.setCaret(s.calculateCaretPosition());
                        }, t.jMaskGlobals.keyStrokeCompensation), s.val(o), s.setCaret(n), s.callbacks(i);
                    }
                },
                getMasked: function(t, e) {
                    var n, r, l, c = [], d = void 0 === e ? s.val() : e + "", u = 0, p = i.length, h = 0, m = d.length, g = 1, f = "push", v = -1, y = 0, w = [];
                    for (o.reverse ? (f = "unshift", g = -1, n = 0, u = p - 1, h = m - 1, r = function() {
                        return -1 < u && -1 < h;
                    }) : (n = p - 1, r = function() {
                        return u < p && h < m;
                    }); r(); ) {
                        var T = i.charAt(u), b = d.charAt(h), C = a.translation[T];
                        C ? (b.match(C.pattern) ? (c[f](b), C.recursive && (-1 === v ? v = u : u === n && u !== v && (u = v - g), 
                        n === v && (u -= g)), u += g) : b === l ? (y--, l = void 0) : C.optional ? (u += g, 
                        h -= g) : C.fallback ? (c[f](C.fallback), u += g, h -= g) : s.invalid.push({
                            p: h,
                            v: b,
                            e: C.pattern
                        }), h += g) : (t || c[f](T), b === T ? (w.push(h), h += g) : (l = T, w.push(h + y), 
                        y++), u += g);
                    }
                    return d = i.charAt(n), p !== m + 1 || a.translation[d] || c.push(d), c = c.join(""), 
                    s.mapMaskdigitPositions(c, w, m), c;
                },
                mapMaskdigitPositions: function(t, e, i) {
                    for (t = o.reverse ? t.length - i : 0, s.maskDigitPosMap = {}, i = 0; i < e.length; i++) s.maskDigitPosMap[e[i] + t] = 1;
                },
                callbacks: function(t) {
                    var n = s.val(), a = n !== r, l = [ n, t, e, o ], c = function(t, e, i) {
                        "function" == typeof o[t] && e && o[t].apply(this, i);
                    };
                    c("onChange", !0 === a, l), c("onKeyPress", !0 === a, l), c("onComplete", n.length === i.length, l), 
                    c("onInvalid", 0 < s.invalid.length, [ n, t, e, s.invalid, o ]);
                }
            };
            e = t(e);
            var n, a = this, r = s.val();
            i = "function" == typeof i ? i(s.val(), void 0, e, o) : i, a.mask = i, a.options = o, 
            a.remove = function() {
                var t = s.getCaret();
                return a.options.placeholder && e.removeAttr("placeholder"), e.data("mask-maxlength") && e.removeAttr("maxlength"), 
                s.destroyEvents(), s.val(a.getCleanVal()), s.setCaret(t), e;
            }, a.getCleanVal = function() {
                return s.getMasked(!0);
            }, a.getMaskedVal = function(t) {
                return s.getMasked(!1, t);
            }, a.init = function(r) {
                if (r = r || !1, o = o || {}, a.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch, 
                a.byPassKeys = t.jMaskGlobals.byPassKeys, a.translation = t.extend({}, t.jMaskGlobals.translation, o.translation), 
                a = t.extend(!0, {}, a, o), n = s.getRegexMask(), r) s.events(), s.val(s.getMasked()); else {
                    o.placeholder && e.attr("placeholder", o.placeholder), e.data("mask") && e.attr("autocomplete", "off"), 
                    r = 0;
                    for (var l = !0; r < i.length; r++) {
                        var c = a.translation[i.charAt(r)];
                        if (c && c.recursive) {
                            l = !1;
                            break;
                        }
                    }
                    l && e.attr("maxlength", i.length).data("mask-maxlength", !0), s.destroyEvents(), 
                    s.events(), r = s.getCaret(), s.val(s.getMasked()), s.setCaret(r);
                }
            }, a.init(!e.is("input"));
        };
        t.maskWatchers = {};
        var i = function() {
            var i = t(this), s = {}, n = i.attr("data-mask");
            if (i.attr("data-mask-reverse") && (s.reverse = !0), i.attr("data-mask-clearifnotmatch") && (s.clearIfNotMatch = !0), 
            "true" === i.attr("data-mask-selectonfocus") && (s.selectOnFocus = !0), o(i, n, s)) return i.data("mask", new e(this, n, s));
        }, o = function(e, i, o) {
            o = o || {};
            var s = t(e).data("mask"), n = JSON.stringify;
            e = t(e).val() || t(e).text();
            try {
                return "function" == typeof i && (i = i(e)), "object" != typeof s || n(s.options) !== n(o) || s.mask !== i;
            } catch (t) {}
        }, s = function(t) {
            var e, i = document.createElement("div");
            return (e = (t = "on" + t) in i) || (i.setAttribute(t, "return;"), e = "function" == typeof i[t]), 
            e;
        };
        t.fn.mask = function(i, s) {
            s = s || {};
            var n = this.selector, a = (r = t.jMaskGlobals).watchInterval, r = s.watchInputs || r.watchInputs, l = function() {
                if (o(this, i, s)) return t(this).data("mask", new e(this, i, s));
            };
            return t(this).each(l), n && "" !== n && r && (clearInterval(t.maskWatchers[n]), 
            t.maskWatchers[n] = setInterval(function() {
                t(document).find(n).each(l);
            }, a)), this;
        }, t.fn.masked = function(t) {
            return this.data("mask").getMaskedVal(t);
        }, t.fn.unmask = function() {
            return clearInterval(t.maskWatchers[this.selector]), delete t.maskWatchers[this.selector], 
            this.each(function() {
                var e = t(this).data("mask");
                e && e.remove().removeData("mask");
            });
        }, t.fn.cleanVal = function() {
            return this.data("mask").getCleanVal();
        }, t.applyDataMask = function(e) {
            ((e = e || t.jMaskGlobals.maskElements) instanceof t ? e : t(e)).filter(t.jMaskGlobals.dataMaskAttr).each(i);
        }, s = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-mask]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            keyStrokeCompensation: 10,
            useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && s("input"),
            watchDataMask: !1,
            byPassKeys: [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ],
            translation: {
                0: {
                    pattern: /\d/
                },
                9: {
                    pattern: /\d/,
                    optional: !0
                },
                "#": {
                    pattern: /\d/,
                    recursive: !0
                },
                A: {
                    pattern: /[a-zA-Z0-9]/
                },
                S: {
                    pattern: /[a-zA-Z]/
                }
            }
        }, t.jMaskGlobals = t.jMaskGlobals || {}, (s = t.jMaskGlobals = t.extend(!0, {}, s, t.jMaskGlobals)).dataMask && t.applyDataMask(), 
        setInterval(function() {
            t.jMaskGlobals.watchDataMask && t.applyDataMask();
        }, s.watchInterval);
    }, window.jQuery, window.Zepto), function(t, e, i) {
        "use strict";
        var o = e.PFTX = e.PFTX || {}, s = t("body");
        o.pages = {}, o.modules = {}, o.init = function() {
            o.pages.common.init(), t.each(o.pages, function() {
                s.hasClass(this.pageClass) && this.hasOwnProperty("init") && this.init();
            });
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.constructor = PFTX.constructor || {}, PFTX.constructor.module = function(t) {}, 
        PFTX.constructor.module.init = function(t) {
            for (var e in t) PFTX.modules.buyButtonAsync.hasOwnProperty(e) && (PFTX.modules.buyButtonAsync[e] = t[e]);
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.constructor = {}, PFTX.constructor.page = function(o) {
            this.pageClass = o, this.DOMReady = function() {}, this.winLoad = function() {}, 
            this.ajaxStop = function() {}, this.common = function() {}, this.init = function() {
                t(e).load(t.proxy(function() {
                    this.winLoad();
                }, this)), t(i).ready(t.proxy(function() {
                    this.common(), this.DOMReady();
                }, this)).ajaxStop(t.proxy(function() {
                    this.common(), this.ajaxStop();
                }, this));
            };
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.advancedSearch = {
            $categoria: t("#busca-categoria"),
            $subcategoria: t("#busca-peca"),
            $filtros: t("#busca-marca"),
            $btnSubmit: t(".filter-item.send .btn-filter")
        }, PFTX.modules.advancedSearch.bindCategory = function() {
            PFTX.modules.advancedSearch.$categoria.live("change", function() {
                PFTX.modules.advancedSearch.$subcategoria.html('<option value="">Carregando...</option>'), 
                PFTX.modules.advancedSearch.$filtros.html('<option value="">Carregando...</option>'), 
                t(this).val() && t.ajax({
                    url: t(this).val(),
                    dataType: "html",
                    success: function(e) {
                        PFTX.modules.advancedSearch.buildSubCategory(t(e).find(".menu-departamento").last());
                    }
                });
            });
        }, PFTX.modules.advancedSearch.buildSubCategory = function(e) {
            var i = e.find("h4 + ul").find("li"), o = "", s = e.find(".Marca").find("li"), n = "";
            i.each(function() {
                var e = t(this).find("a").attr("href");
                e = e.split("pecas/")[1].split("?PS")[0], o += '<option value="' + e + '">' + t(this).find("a").html() + "</option>";
            }), s.each(function() {
                var e = t(this).find("a").attr("href");
                e = e.split("pecas/")[1].split("?PS")[0], n += '<option value="' + e + '">' + t(this).find("a").html() + "</option>";
            }), PFTX.modules.advancedSearch.$subcategoria.html('<option value="">Selecione uma peÃƒÆ’Ã‚Â§a</option>' + o), 
            PFTX.modules.advancedSearch.$filtros.html('<option value="">Selecione uma marca</option>' + n);
        }, PFTX.modules.advancedSearch.getUrlResult = function() {
            var t = "/pecas";
            return PFTX.modules.advancedSearch.$subcategoria.val() ? (t += "/" + PFTX.modules.advancedSearch.$subcategoria.val(), 
            PFTX.modules.advancedSearch.$filtros.val() && (t += "/" + PFTX.modules.advancedSearch.$filtros.val().split("/")[1])) : PFTX.modules.advancedSearch.$filtros.val() ? t += "/" + PFTX.modules.advancedSearch.$filtros.val() : t = !1, 
            t;
        }, PFTX.modules.advancedSearch.sendUrlResult = function() {
            var t = PFTX.modules.advancedSearch.getUrlResult();
            PFTX.modules.advancedSearch.$btnSubmit.live("click", function(i) {
                i.preventDefault(), t && (t = e.location.origin + PFTX.modules.advancedSearch.getUrlResult(), 
                e.location.href = t);
            });
        }, PFTX.modules.advancedSearch.init = function() {
            PFTX.modules.advancedSearch.bindCategory(), PFTX.modules.advancedSearch.sendUrlResult();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.autoComplete = {
            qtd: 4,
            template: "29a178dc-78ee-4676-a99c-e299dd973a10",
            $searchBox: t("#q"),
            $form: t(".pftx-autocomplete"),
            $target: t(".autocomplete-resultado"),
            $resultados: t(".autocomplete-resultado"),
            $maisBuscados: t(".autocomplete-mais-buscados"),
            $bgAutocomplete: t(".bg-autocomplete"),
            debounceInterval: 250,
            debounceTimeout: void 0,
            debounce: !0
        }, PFTX.modules.autoComplete.bindEvents = function() {
            PFTX.modules.autoComplete.$searchBox.on("keyup", function() {
                var e = t(this).val();
                e.length >= 3 ? PFTX.modules.autoComplete.debounce ? PFTX.modules.autoComplete.deboundAutoComplete(e, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.searchTerm(e, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados");
            }), PFTX.modules.autoComplete.$searchBox.on("focus", function() {
                var e = t(this).val();
                e.length >= 3 ? PFTX.modules.autoComplete.searchTerm(e, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados");
            }), PFTX.modules.autoComplete.$bgAutocomplete.on("click", function() {
                setTimeout(function() {
                    PFTX.modules.autoComplete.toggleAutocomplete(""), PFTX.modules.autoComplete.$searchBox.val("");
                }, 300);
            }), t(".autocomplete-btn-all-results").live("click", function() {
                PFTX.modules.autoComplete.$form.submit();
            }), PFTX.modules.autoComplete.$form.on("submit", function(t) {
                t.preventDefault();
                var i = e.location.origin + "/" + encodeURIComponent(PFTX.modules.autoComplete.$searchBox.val());
                e.location.href = i;
            });
        }, PFTX.modules.autoComplete.searchTerm = function(e, i) {
            var o = encodeURIComponent(e), s = "/buscapagina?sl=" + PFTX.modules.autoComplete.template + "&PS=" + i + "&cc=10&sm=0&PageNumber=1&ft=" + o;
            t.ajax({
                url: s,
                beforeSend: function() {}
            }).fail(function() {
                PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados");
            }).done(function(e) {
                e.length ? (PFTX.modules.autoComplete.toggleAutocomplete("resultado"), PFTX.modules.autoComplete.$resultados.html(e)) : (PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados"), 
                t(".autocomplete-btn-all-results").hide());
            }).always(function() {
                PFTX.modules.autoComplete.buildAutoComplete();
            });
        }, PFTX.modules.autoComplete.deboundAutoComplete = function(t, e) {
            "number" == typeof PFTX.modules.autoComplete.debounceTimeout && clearTimeout(PFTX.modules.autoComplete.debounceTimeout), 
            PFTX.modules.autoComplete.debounceTimeout = setTimeout(function() {
                PFTX.modules.autoComplete.searchTerm(t, e);
            }, PFTX.modules.autoComplete.debounceInterval);
        }, PFTX.modules.autoComplete.buildAutoComplete = function() {
            var i = PFTX.modules.autoComplete.$searchBox.offset().left - 1, o = PFTX.modules.autoComplete.$searchBox.offset().top + PFTX.modules.autoComplete.$searchBox.height() - 4;
            PFTX.modules.autoComplete.$target.css({
                left: i,
                top: o
            });
            var s = (t(e).scrollTop(), function() {
                PFTX.modules.autoComplete.$target.css({
                    left: "",
                    top: "",
                    right: "",
                    margin: "",
                    position: ""
                });
            });
            s(), PFTX.modules.autoComplete.$target.css({
                left: i,
                top: o
            }), t(e).scroll(function(t) {
                s(), PFTX.modules.autoComplete.$target.css({
                    left: i,
                    top: o
                });
            });
        }, PFTX.modules.autoComplete.toggleAutocomplete = function(t) {
            switch (t) {
              case "resultado":
                PFTX.modules.autoComplete.$target.show(), PFTX.modules.autoComplete.$resultados.show(), 
                PFTX.modules.autoComplete.$maisBuscados.hide(), PFTX.modules.autoComplete.$searchBox.addClass("active"), 
                PFTX.modules.autoComplete.$bgAutocomplete.show();
                break;

              case "mais-buscados":
                PFTX.modules.autoComplete.$target.hide(), PFTX.modules.autoComplete.$maisBuscados.hide(), 
                PFTX.modules.autoComplete.$resultados.hide(), PFTX.modules.autoComplete.$searchBox.removeClass("active"), 
                PFTX.modules.autoComplete.$bgAutocomplete.hide();
                break;

              default:
                PFTX.modules.autoComplete.$target.hide(), PFTX.modules.autoComplete.$maisBuscados.hide(), 
                PFTX.modules.autoComplete.$resultados.hide(), PFTX.modules.autoComplete.$searchBox.removeClass("active"), 
                PFTX.modules.autoComplete.$bgAutocomplete.hide();
            }
        }, PFTX.modules.autoComplete.init = function() {
            PFTX.modules.autoComplete.bindEvents(), PFTX.modules.autoComplete.buildAutoComplete();
        };
    }(jQuery, window.top, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.buyButtonAsync = {
            buyButton: null,
            modalContainer: null,
            modal: {
                container: "",
                mensagem: "",
                nome: "",
                descricao: "",
                tamanho: "",
                cor: "",
                close: "",
                foto: ""
            },
            callbackSuccess: function() {},
            callbackError: function() {}
        }, PFTX.modules.buyButtonAsync.bindEvents = function() {
            PFTX.modules.buyButtonAsync.buyButton.on("click", PFTX.modules.buyButtonAsync.hasSKUChecked), 
            PFTX.modules.buyButtonAsync.modal.close.on("click", function() {
                PFTX.modules.buyButtonAsync.modal.container.fadeOut();
            }), PFTX.modules.buyButtonAsync.modal.container.on("click", function(t) {
                t.target === this && PFTX.modules.buyButtonAsync.modal.container.fadeOut();
            }), t(".modalbtn-continuar").on("click", function() {
                PFTX.modules.buyButtonAsync.modal.container.fadeOut();
            });
        }, PFTX.modules.buyButtonAsync.hasSKUChecked = function(t) {
            /javascript/g.test(PFTX.modules.buyButtonAsync.buyButton.attr("href")) || (t.preventDefault(), 
            PFTX.modules.buyButtonAsync.addToCart());
        }, PFTX.modules.buyButtonAsync.addToCart = function() {
            t.ajax({
                url: PFTX.modules.buyButtonAsync.buyButton.attr("href"),
                type: "GET"
            }).done(function() {
                PFTX.modules.buyButtonAsync.showModal(), t(i).trigger("cartProductAdded.vtex");
            });
        }, PFTX.modules.buyButtonAsync.addModal = function() {
            t("body").append('<div class="modalbtn-overlay"><div class="modalbtn"><div class="modalbtn-close"></div><div class="modalbtn-image-wrapper"><img alt="" class="modalbtn-image" /></div><div class="modalbtn-content"><div class="modalbtn-mensagem">Produto adicionado ÃƒÆ’  sacola</div><div class="modalbtn-nome"></div><div class="modalbtn-description"></div><div class="modalbtn-tamanho"></div><div class="modalbtn-cor"></div><a class="modalbtn-continuar">Continuar comprando</a><a href="/checkout" class="modalbtn-finalizar">Finalizar compra</a></div>\x3c!-- modalbtn-content --\x3e</div>\x3c!-- modalbtn --\x3e</div>\x3c!-- modalbtn-overlay --\x3e'), 
            PFTX.modules.buyButtonAsync.modal = {
                container: t(".modalbtn-overlay"),
                mensagem: t(".modalbtn-mensagem"),
                nome: t(".modalbtn-nome"),
                descricao: t(".modalbtn-description"),
                tamanho: t(".modalbtn-tamanho"),
                cor: t(".modalbtn-cor"),
                foto: t(".modalbtn-image"),
                close: t(".modalbtn-close")
            };
        }, PFTX.modules.buyButtonAsync.showModal = function() {
            PFTX.modules.buyButtonAsync.modal.nome.html(t(".fn.productName").text()), PFTX.modules.buyButtonAsync.modal.descricao.html(t(".product-description-short").text()), 
            PFTX.modules.buyButtonAsync.modal.tamanho.html(t(".item-dimension-Tamanho").find("input:checked").attr("data-value")), 
            PFTX.modules.buyButtonAsync.modal.cor.html(t(".item-dimension-Cor").find("input:checked").attr("data-value")), 
            PFTX.modules.buyButtonAsync.modal.foto.attr("src", t("#image").find("img").eq(0).attr("src")), 
            PFTX.modules.buyButtonAsync.modal.container.fadeIn();
        }, PFTX.modules.buyButtonAsync.init = function(t) {
            for (var e in t) PFTX.modules.buyButtonAsync.hasOwnProperty(e) && (PFTX.modules.buyButtonAsync[e] = t[e]);
            PFTX.modules.buyButtonAsync.buyButton && (PFTX.modules.buyButtonAsync.addModal(), 
            PFTX.modules.buyButtonAsync.bindEvents());
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.buyButton = {}, PFTX.modules.buyButton.floated = !1, PFTX.modules.buyButton.menuHeight = 110, 
        PFTX.modules.buyButton.bindEvents = function() {
            t(".more").live("click", function() {
                PFTX.modules.changeQuantity("more", t(this));
            }), t(".less").live("click", function() {
                PFTX.modules.changeQuantity("less", t(this));
            });
        }, PFTX.modules.changeQuantity = function(t, e) {
            var i = e.parent().siblings("input"), o = parseInt(i.val());
            "more" === t ? ((o += 1) < 10 && (o = "0" + o), i.val(o)) : o > 1 && ((o -= 1) < 10 && (o = "0" + o), 
            i.val(o));
        }, PFTX.modules.buyButton.init = function() {
            PFTX.modules.buyButton.bindEvents();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.checkout = {}, PFTX.modules.checkout.buildCartUrl = function(t) {
            for (var e = 0, i = t.length, o = "/checkout/cart/add?"; e < i; e++) o += "&sku=" + t[e].sku + "&qty=" + t[e].qty + "&seller=" + t[e].seller;
            return o.replace("&", "") + "&sc=1";
        };
    }(jQuery, window, document), function() {
        for (var t, e = function() {}, i = [ "assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn" ], o = i.length, s = window.console = window.console || {}; o--; ) s[t = i[o]] || (s[t] = e);
    }(), function(t, e, i, o) {
        "use strict";
        PFTX.modules.cookie = e.PFTX.modules.cookie || {}, PFTX.modules.cookie.set = function(t, e, o, s) {
            var n = s || "/", a = o || 1, r = new Date();
            r.setTime(r.getTime() + 24 * a * 60 * 60 * 1e3);
            var l = "expires=" + r.toGMTString();
            i.cookie = t + "=" + e + "; " + l + "; path=" + n;
        }, PFTX.modules.cookie.get = function(t) {
            for (var e = t + "=", o = i.cookie.split(";"), s = 0; s < o.length; s++) {
                var n = o[s].trim();
                if (0 == n.indexOf(e)) return n.substring(e.length, n.length);
            }
            return "";
        }, PFTX.modules.cookie.remove = function(t, e) {
            var o = e || "/";
            i.cookie = t + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + o;
        };
    }(jQuery, window, document), Modernizr.addTest("boxsizing", function() {
        return Modernizr.testAllProps("boxSizing") && (void 0 === document.documentMode || document.documentMode > 7);
    }), $(function() {
        $("html").hasClass("boxsizing") || $("*").each(function() {
            var t = $(this).outerWidth(), e = $(this).width(), i = e - (t - e);
            $(this).css("width", i);
        });
    }), Modernizr.testProp("webkitAppearance"), Modernizr.addTest("webkit-appearance", function() {
        return Modernizr.testProp("webkitAppearance");
    }), function(t, e, i, o) {
        "use strict";
        function s(e) {
            this.config = {
                target: "select"
            }, t.extend(this.config, e);
        }
        var n = PFTX.modules;
        e.customSelectBindEvents = !1, s.prototype.bindEvents = function() {
            customSelectBindEvents || (this.onClickTitle(), this.onBlur(), this.onSelectItem(), 
            customSelectBindEvents = !0), t(this.config.target).each(function() {
                var e = t(this).val(), i = t(this).find("option:selected").text();
                t(this).next(".fakeSelect").find(".fakeSelect__item").each(function() {
                    t(this).attr("data-value") == e && t(this).parents(".fakeSelect").attr("data-selected", e).find(".fakeSelect__title a").html(i);
                });
            });
        }, s.prototype.build = function() {
            var e, i, o;
            t(this.config.target).each(function() {
                i = [], o = "", t(this).find("option").each(function() {
                    e = {
                        key: t(this).text(),
                        value: t(this).val()
                    }, i.push(e);
                });
                for (var s = 0; s < i.length; s++) o += '<a class="fakeSelect__item" data-value="' + i[s].value + '">' + i[s].key + "</a>";
                t('<dl class="fakeSelect" data-selected=""><dt class="fakeSelect__title"><a>Selecione</a><span class="fakeSelect__arrow"></span><dd class="fakeSelect__list">' + o + "</dd></dl>").insertAfter(t(this)), 
                t(".fakeSelect__list").hide();
            });
        }, s.prototype.onClickTitle = function() {
            t("body").on("click", ".fakeSelect__title", function(e) {
                e.stopPropagation(), t(this).parent().toggleClass("active").find(".fakeSelect__list").toggle();
            });
        }, s.prototype.onSelectItem = function() {
            var e = this;
            t("body").on("click", ".fakeSelect__item", function(i) {
                i.stopPropagation();
                var o = t(this).attr("data-value"), s = t(this).text();
                t(this).parent().hide().parent().attr("data-selected", o).removeClass("active").prev(e.config.target).val(o).trigger("change"), 
                t(this).parents(".fakeSelect").find(".fakeSelect__title a").html(s);
            });
        }, s.prototype.onBlur = function() {
            t("html").on("click", function() {
                t(".fakeSelect").removeClass("active").find(".fakeSelect__list").hide();
            });
        }, s.prototype.init = function() {
            this.build(), this.bindEvents();
        }, n.customSelect = s;
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.DataSkuManager = function(e) {
            function i(e, i) {
                var a, r = n + e;
                t.getJSON(r, function(n) {
                    a = n;
                    try {
                        var r = a[0].Images[0].length;
                        if (void 0 !== r) for (var l = 0; l < r; l++) {
                            if (1 == a[0].Images[0][l].ArchiveTypeId) {
                                var c = a[0].Images[0][l].Path;
                                t.each(s.objSkusInfo.skuList, function(t, i) {
                                    i.id == e && (s.objSkusInfo.skuList[t].thumb = c);
                                }), t(o).find("label").each(function() {
                                    i == t(this).text() && (t(this).css("background", "url('" + c + "') center center no-repeat scroll transparent"), 
                                    t(this).attr("title", t(this).text()));
                                });
                            }
                        }
                    } catch (t) {}
                });
            }
            var o = e, s = PFTX.modules.DataSkuManager, n = "/produto/sku/";
            if (s.objSkusInfo = {
                skuList: []
            }, t(o).length) {
                var a = (t(o).find("label").length, []);
                t.each(skuJson.skus, function(t, e) {
                    -1 == a.indexOf(e.values[e.values.length - 2]) && (a.push(e.values[e.values.length - 2]), 
                    s.objSkusInfo.skuList.push({
                        id: e.sku,
                        name: e.values[e.values.length - 2],
                        thumb: "",
                        texture: ""
                    }), i(e.sku, e.values[e.values.length - 2]));
                });
            }
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.events = e.PFTX.modules.events || {
            container: null,
            log: []
        }, PFTX.modules.events.listener = function(e, i) {
            this.container instanceof Object || (this.container = t("<div />")), this.container.on(e, function(t) {
                i(t.customData);
            });
        }, PFTX.modules.events.dispatch = function(e, i) {
            var o = (this.log.length, e), s = i || {};
            this.container instanceof Object || (this.container = t("<div>"));
            try {
                this.container.trigger({
                    type: o,
                    customData: s
                });
            } catch (t) {}
            this.log.push(o);
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.floatingMenu = {}, PFTX.modules.floatingMenu.$target = t("html"), PFTX.modules.floatingMenu.floated = !1, 
        PFTX.modules.floatingMenu.menuHeight = 175, PFTX.modules.floatingMenu.className = "floating-menu", 
        PFTX.modules.floatingMenu.bindEvents = function() {
            t(e).scroll(function() {
                t(e).scrollTop() > PFTX.modules.floatingMenu.menuHeight ? PFTX.modules.floatingMenu.floated || (PFTX.modules.floatingMenu.$target.addClass(PFTX.modules.floatingMenu.className), 
                PFTX.modules.floatingMenu.floated = !0) : PFTX.modules.floatingMenu.floated && (PFTX.modules.floatingMenu.$target.removeClass(PFTX.modules.floatingMenu.className), 
                PFTX.modules.floatingMenu.floated = !1);
            });
        }, PFTX.modules.floatingMenu.init = function() {
            PFTX.modules.floatingMenu.bindEvents();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.gridControl = {}, PFTX.modules.gridControl.$target = t(".grid-control").find(".grid-item"), 
        PFTX.modules.gridControl.$container = t("html"), PFTX.modules.gridControl.gridStyle = "table", 
        PFTX.modules.gridControl.bindEvents = function() {
            PFTX.modules.gridControl.$target.live("click", function(e) {
                PFTX.modules.gridControl.toggleGridStyle(t(e.target));
            });
        }, PFTX.modules.gridControl.toggleGridStyle = function(t) {
            /table/.test(t.attr("class")) ? (PFTX.modules.gridControl.$container.addClass("prateleira--grid-table").removeClass("prateleira--grid-list"), 
            PFTX.modules.gridControl.gridStyle = "table", e.localStorage && localStorage.setItem("PFTX.gridControl", "table")) : (PFTX.modules.gridControl.$container.addClass("prateleira--grid-list").removeClass("prateleira--grid-table"), 
            PFTX.modules.gridControl.gridStyle = "list", e.localStorage && localStorage.setItem("PFTX.gridControl", "list")), 
            PFTX.modules.gridControl.$target.removeClass("active"), t.addClass("active");
        }, PFTX.modules.gridControl.checkSavedStyle = function() {
            e.localStorage ? "list" !== localStorage.getItem("PFTX.gridControl") ? PFTX.modules.gridControl.toggleGridStyle(PFTX.modules.gridControl.$target.eq(0)) : PFTX.modules.gridControl.toggleGridStyle(PFTX.modules.gridControl.$target.eq(1)) : PFTX.modules.gridControl.$target.eq(0).addClass("active");
        }, PFTX.modules.gridControl.init = function() {
            PFTX.modules.gridControl.bindEvents(), PFTX.modules.gridControl.checkSavedStyle();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.loginStatus = {}, PFTX.modules.loginStatus.$target = t("html"), PFTX.modules.loginStatus.loggedClass = "logado", 
        PFTX.modules.loginStatus.unLoggedClass = "deslogado", PFTX.modules.loginStatus.toggleHtmlClass = function() {
            vtexjs.checkout.getOrderForm().done(function(t) {
                t.loggedIn ? PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.loggedClass) : PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.unLoggedClass);
            });
        }, PFTX.modules.loginStatus.init = function() {
            PFTX.modules.loginStatus.toggleHtmlClass();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        function s(e) {
            this.config = {
                store: "",
                entity: "",
                appKey: !1,
                appToken: !1
            }, t.extend(this.config, e);
        }
        var n = PFTX.modules;
        s.prototype.headers = {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json"
        }, s.prototype.get = function(e, i) {
            var o = this;
            i = void 0 !== i ? i : "0-50", o.headers["REST-Range"] = "resources=" + i, t.ajax({
                url: "/" + o.config.store + "/dataentities/" + o.config.entity + "/search?_fields=" + e,
                type: "GET",
                dataType: "json",
                crossDomain: !0,
                headers: o.headers,
                success: function(t) {
                    return t;
                },
                error: function(e, i, o) {
                    if (e.responseText && t.parseJSON(e.responseText)) return t.parseJSON(e.responseText).Message;
                }
            });
        }, s.prototype.post = function(e) {
            var i = this, o = JSON.stringify(e);
            t.ajax({
                url: "/api/dataentities/" + i.config.entity + "/documents",
                type: "POST",
                data: o,
                dataType: "json",
                crossDomain: !0,
                headers: i.headers,
                success: function(t) {
                    return t;
                },
                error: function(e, i, o) {
                    if (e.responseText && t.parseJSON(e.responseText)) return t.parseJSON(e.responseText).Message, 
                    null;
                }
            });
        }, s.prototype.put = function(e) {
            var i = this, o = JSON.stringify(e), s = e.id.slice(3);
            t.ajax({
                url: "/api/dataentities/" + i.config.entity + "/documents/" + s,
                type: "PUT",
                data: o,
                dataType: "json",
                crossDomain: !0,
                headers: i.headers,
                success: function(t) {
                    return t;
                },
                error: function(e, i, o) {
                    if (e.responseText && t.parseJSON(e.responseText)) return t.parseJSON(e.responseText).Message, 
                    null;
                }
            });
        }, s.prototype.patch = function(e) {
            var i = this, o = JSON.stringify(e), s = e.id.slice(3);
            t.ajax({
                url: "/api/dataentities/" + i.config.entity + "/documents/" + s,
                type: "PATCH",
                data: o,
                dataType: "json",
                crossDomain: !0,
                headers: i.headers,
                success: function(t) {
                    return t;
                },
                error: function(e, i, o) {
                    if (e.responseText && t.parseJSON(e.responseText)) return t.parseJSON(e.responseText).Message, 
                    null;
                }
            });
        }, s.prototype.delete = function(e) {
            var i = this, o = e.id.slice(3);
            t.ajax({
                url: "/api/dataentities/" + i.config.entity + "/documents/" + o,
                type: "DELETE",
                dataType: "json",
                crossDomain: !0,
                headers: i.headers,
                success: function(t) {
                    return t;
                },
                error: function(e, i, o) {
                    if (e.responseText && t.parseJSON(e.responseText)) return t.parseJSON(e.responseText).Message, 
                    null;
                }
            });
        }, s.prototype.init = function() {
            return _that.config.appKey && (_that.headers["x-vtex-api-appKey"] = _that.config.appKey), 
            _that.config.appToken && (_that.headers["x-vtex-api-appToken"] = _that.config.appToken), 
            this;
        }, n.masterdata = s;
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.navAllDepartments = {}, PFTX.modules.navAllDepartments.$target = "", 
        PFTX.modules.navAllDepartments.bindEvents = function() {
            PFTX.modules.navAllDepartments.$target.live("click", PFTX.modules.navAllDepartments.toggle);
        }, PFTX.modules.navAllDepartments.toggle = function() {
            PFTX.modules.navAllDepartments.$target.hasClass("active") ? PFTX.modules.navAllDepartments.$target.removeClass("active") : PFTX.modules.navAllDepartments.$target.addClass("active");
        }, PFTX.modules.navAllDepartments.init = function(t) {
            PFTX.modules.navAllDepartments.$target = t, PFTX.modules.navAllDepartments.bindEvents();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.removeEmpty = function(e, i) {
            t(e).each(function() {
                0 == t(this).text() ? i ? t(this).parents(i).hide() : t(this).hide() : i ? t(this).parents(i).show() : t(this).show();
            });
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.similarProducts = {
            fieldId: "344",
            fieldClass: "product_field_",
            similarClassChecked: "similar-checked",
            similarClassActive: "similar-active",
            similarClassUnavaliable: "similar-inactive"
        }, PFTX.modules.similarProducts.searchAvaliableProducts = function(t, e) {
            for (var i = t.length - 1; i >= 0; i--) t.eq(i).addClass(PFTX.modules.similarProducts.similarClassChecked), 
            t.eq(i).find("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId).length > 0 ? e(t.eq(i), PFTX.modules.similarProducts.makeSimilarShelf) : t.eq(i).addClass(PFTX.modules.similarProducts.similarClassUnavaliable).remove("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId);
        }, PFTX.modules.similarProducts.checkifAvaliable = function(t, e) {
            var i = t.find(".product-especification-code li").html();
            try {
                e(t, JSON.parse(i));
            } catch (e) {
                t.addClass(PFTX.modules.similarProducts.similarClassUnavaliable).remove("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId);
            }
        }, PFTX.modules.similarProducts.makeSimilarShelf = function(t, e) {
            for (var i = "", o = "", s = "", n = "", a = e.length - 1; a >= 0; a--) e[a].link && e[a].foto && e[a].nome && e[a].thumb && (i += '<span style="display: none;">' + e[a].link + "/p</span>", 
            o += '<img src="/arquivos/ids/' + e[a].foto + '-220-290" width="220" height="290" alt"" style="display: none;" />', 
            s += '<div style="display: none;">' + e[a].nome + "</div>", n += '<li><img src="/arquivos/ids/' + e[a].thumb + '-12-12" width="12" height="12" alt"" /></li>');
            t.find(".colors ul").append(n).find("li").eq(0).addClass("active"), t.find(".collection-image-link").append(o), 
            t.find(".collection-links").append(i), t.find(".collection-name").append(s), t.addClass(PFTX.modules.similarProducts.similarClassActive), 
            PFTX.modules.similarProducts.bindEvents();
        }, PFTX.modules.similarProducts.bindEvents = function() {
            t("." + PFTX.modules.similarProducts.similarClassActive).find(".colors li").live("mouseover", function() {
                var e = t(this).index(), i = t(this).parent().parent().parent().parent();
                i.find(".colors ul").find("li").removeClass("active").eq(e).addClass("active"), 
                i.find(".collection-image-link").find("img").hide().eq(e).show(), i.attr("href", i.find(".collection-links").find("span").hide().eq(e).html()), 
                i.attr("title", i.find(".collection-name").find("div").eq(e).html()), i.find(".collection-name").find("div").hide().eq(e).show();
            });
        }, PFTX.modules.similarProducts.init = function(t) {
            PFTX.modules.similarProducts.searchAvaliableProducts(t, this.checkifAvaliable);
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        function s(e) {
            this.config = {
                onStable: function() {},
                onProduction: function() {}
            }, t.extend(this.config, e);
        }
        var n = PFTX.modules;
        s.prototype.bindEvents = function() {
            e.location.href.indexOf("vtex") > -1 ? this.config.onStable() : this.config.onProduction();
        }, s.prototype.init = function() {
            this.bindEvents();
        }, n.stableMode = s;
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.tabs = function(e, i, o, s, n) {
            var a = t(e).find(i), r = t(e).find(o);
            r.each(function() {
                var e = t(this).index();
                0 === t(this).text().length && (t(this).hide(), a.eq(e).hide());
            }), t(e).live("click", i, function(e) {
                if (t(e.target).hasClass(i.replace(".", ""))) {
                    a.removeClass(s), r.removeClass(s);
                    var o = t(e.target).index();
                    t(e.target).addClass(s), r.eq(o).addClass(s);
                }
            });
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.modules.user = {}, PFTX.modules.user.isLogged = function() {
            return !t(".welcome").find("#login").length;
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.account = new PFTX.constructor.page("account"), PFTX.pages.account.ajustes = function() {
            t("body.orders").addClass("account"), t(".orders .main-wrapper").addClass("page-main"), 
            t(".orders .main-container").attr("id", "content");
        }, PFTX.pages.account.DOMReady = function() {
            PFTX.pages.account.ajustes();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.catalog = new PFTX.constructor.page("catalog-category-view"), PFTX.pages.catalog.redesignVitrine = function() {
            "gdUwlr1U" === function(t) {
                var i, s, n = decodeURIComponent(e.location.search.substring(1)).split("&");
                for (s = 0; s < n.length; s++) if ((i = n[s].split("="))[0] === t) return i[1] !== o && i[1];
            }("dev") && t("body").addClass("redesignVitrine");
        }, PFTX.pages.catalog.urlParameter = function() {
            var i = t(".resultado-busca-numero .value").html();
            t(".resultado-busca-filtro .sorter").after('<p class="labelQuant">' + i + " Produto(s)</p>"), 
            e.location.host.indexOf("casamind") < 0 ? t('select[id="PS"]').html('<option value="12">12</option><option value="24" selected="selected">24</option><option value="36">36</option><option value="48">48</option>') : t('select[id="PS"]').html('<option value="12">12</option><option value="24">24</option><option value="36">36</option><option value="48" selected="selected">48</option>');
            var s = function(t) {
                var i, s, n = decodeURIComponent(e.location.search.substring(1)).split("&");
                for (s = 0; s < n.length; s++) if ((i = n[s].split("="))[0] === t) return i[1] === o || i[1];
            }("PS");
            t('select[id="PS"] option').each(function(e, i) {
                s == t(this).attr("value") && t(this).attr("selected", "selected");
            });
        }, PFTX.pages.catalog.DOMReady = function() {
            PFTX.modules.gridControl.init(), PFTX.pages.catalog.redesignVitrine(), PFTX.pages.catalog.urlParameter();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.category = new PFTX.constructor.page("categoria"), PFTX.pages.category.DOMReady = function() {};
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.common = new PFTX.constructor.page("common"), PFTX.pages.common.validateEmail = function(t) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
        }, PFTX.pages.common.updateCart = function() {
            t(e).on("orderFormUpdated.vtex", function(e, i) {
                for (var o = 0, s = 0; s < i.items.length; s++) o += i.items[s].quantity;
                t(".checkout-link span").html(o);
            });
        }, PFTX.pages.common.updateUserInfo = function() {
            vtexjs.checkout.getOrderForm().done(function(e) {
                if (e.loggedIn || (t(".topmenu p.welcome a").html("JÃ¡ ÃƒÆ’Ã‚Â© cadastrado?"), t(".topmenu p.welcome a").attr("href", "/login")), 
                !t("#menumobile .login").text().length) {
                    var i = t("p.welcome").clone();
                    t("#menumobile .login").html(i);
                }
            });
        }, PFTX.pages.common.bindMenuEvents = function() {
            t(".searchbox").width(0), t("header li.search a").click(function() {
                t(this).closest("li").toggleClass("opened"), t(".searchbox").css("display", "inline-block").animate({
                    width: "205px"
                }, 350);
            }), t(".topmenu .checkout-hover").mouseenter(function() {
                t(".sku-imagem").length > 0 && t(".portal-minicart-ref .vtexsc-center").fadeIn();
            }), t("body").on("mouseleave", ".portal-minicart-ref .vtexsc-center", function() {
                t(this).fadeOut();
            }), t(".hamburger, #menumobile .icon-remove").click(function() {
                t("#menumobile").toggleClass("opened");
            }), t("#topmenumobile .search").click(function() {
                t(this).toggleClass("active"), t("#mobile-search").toggle();
            }), t("#mobile-search").submit(function(i) {
                i.preventDefault();
                var o = t(this).find('input[type="text"]').val();
                o.length && (e.location = "/" + encodeURI(o));
            });
        }, PFTX.pages.common.instagramFeed = function() {
            t.ajax({
                url: "https://web.archive.org/web/20210902201234/https://api.instagram.com/v1/users/1062685457/media/recent/?access_token=1062685457.dacee0f.cda0d3d1d37c48c68cada0f1cce48054&count=14",
                type: "GET",
                crossDomain: !0,
                dataType: "jsonp",
                success: function(e) {
                    if (e.data.length) {
                        for (var i = '<div id="instagram">', o = 0; o < e.data.length; o++) i += "<a href=" + e.data[o].link + ' title="' + e.data[o].caption.text + '" target="_blank"><img src="' + e.data[o].images.thumbnail.url + '"/></a>';
                        i += "</div>", t("body.home .comunidade .box-banner").hide(), t("body.home .comunidade").append(i);
                    }
                }
            });
        }, PFTX.pages.common.targetBlank = function() {
            t.each(t(".box-banner a"), function() {
                t(this).prop("href").indexOf("SFk1_KVBYgc") >= 0 && t(this).prop("target", "_blank");
            });
        }, PFTX.pages.common.tipbar = function() {
            t(".tipbar-content").css("display", "block"), t(".tipbar-content-desktop").length && t(".tipbar-content-desktop").slick({
                autoplay: !0,
                autoplaySpeed: 5e3
            }), t(".tipbar-content-mobile").length && t(".tipbar-content-mobile").slick({
                autoplay: !0,
                autoplaySpeed: 5e3
            });
        }, PFTX.pages.common.cartUpdate = function() {
            var e = i.querySelector(".sku-selector"), o = i.querySelector(".quantity-add-remove"), s = o.querySelector(".quantity-input"), n = o.querySelector(".quantity-add"), a = o.querySelector(".quantity-remove"), r = i.querySelector(".buy-button-ref"), l = function(t, e, i) {
                r.href.search("qty") > -1 && (r.href = "add" == i ? r.href.replace(/qty=\d+/, "qty=" + (Number(e) + 1)) : "minus" == i ? r.href.replace(/qty=\d+/, "qty=" + (Number(e) - 1)) : r.href.replace(/qty=\d+/, "qty=" + Number(e)));
            };
            e && e.addEventListener("change", function() {
                l(0, s.value);
            }), o.style.display = "inline-block", s.addEventListener("keyup", function() {
                var t;
                this.value = this.value.replace(/^[^0-9]+$/, ""), t = s.value, l(0, t, "key");
            }), n.addEventListener("click", function() {
                var e = parseFloat(s.value);
                s.value = e, t(s).trigger("change"), l(0, e, "add");
            }), a.addEventListener("click", function() {
                var e = parseFloat(s.value);
                s.value = e, t(s).trigger("change"), l(0, e, "minus");
            }), t(".product-image-thumbs .product-image-thumbs-item.mirrored").length && t(".product-image-thumbs .product-image-thumbs-item.mirrored").remove();
        }, PFTX.pages.common.Stable = function() {
            t("html").addClass("stable");
        }, PFTX.pages.common.currentNumber = function() {
            t(".pages .page-number").each(function(e, i) {
                t(this).hasClass("pgCurrent") && t(this).css("color", "#eb6e9d");
            });
        }, PFTX.pages.common.skipContents = function() {
            var e = t(".skip-content"), i = t(".skip-content-inner"), o = t(".skip-link"), s = t(".skip-loading");
            o.on("click", function(n) {
                n.preventDefault();
                var a = t(this), r = a.attr("data-target-element") ? a.attr("data-target-element") : a.attr("href"), l = t(r), c = l.hasClass("skip-active") ? 1 : 0;
                o.removeClass("skip-active"), e.removeClass("skip-active"), c ? a.removeClass("skip-active") : (a.addClass("skip-active"), 
                l.addClass("skip-active")), l.find(s).fadeOut(1e3, function() {
                    l.find(i).fadeIn();
                });
            }), t("#header-cart").on("click", ".skip-link-close", function(e) {
                var o = t(this).parents(".skip-content"), n = o.siblings(".skip-link");
                o.removeClass("skip-active"), n.removeClass("skip-active"), o.find(s).show(), o.find(i).hide(), 
                e.preventDefault();
            });
        }, PFTX.pages.common.prateleira = function() {
            t.each(t(".vitrine li"), function() {
                t(this).find(".imgHoverProd").find("img").length > 0 && t(this).addClass("photo");
            });
        }, PFTX.pages.common.generalConfig = function() {
            t(".menu-departamento").before('<div class="filtreBusca"><p>Filtre sua busca</p></div>'), 
            t(".filtreBusca").click(function(e) {
                t(".menu-departamento, #brandNewFilters").toggle();
            }), t('.orders link[href*="bootstrap.min"]').remove(), t(".account #edit-data-link, .account .address-update").addClass("btn btn-small btn-aqua"), 
            t(".modal-footer #form-submit, .modal-footer #profile-submit").addClass("btn btn-small btn-aqua"), 
            t(".helperComplement").remove();
            var e = t(".resultado-busca-termo .value").html();
            t(".resultado-busca .col-main .page-title").html("<h1>Resultados para " + e + "</h1>"), 
            t(".main-banner-small").wrapInner('<div class="showcase-banner main-banner owl-carousel owl-loaded owl-drag initialized"></div>'), 
            t(".product-section .prateleira ul").addClass("product-carousel owl-carousel owl-loaded owl-drag initialized"), 
            t(".product-section .prateleira ul li").addClass("product-carousel-item"), t(".product-section .prateleira h2").remove(), 
            t(".catalog-category-view .prateleira ul").addClass("products-grid products-grid--max-3-col first last odd"), 
            t(".catalog-category-view .prateleira ul li").addClass("item"), t(".bread-crumb ul").addClass("container"), 
            t(".bread-crumb ul li").addClass("inline-middle"), t(".bread-crumb ul li").append('<span class="divBread"> / </span>');
            var i = t(".departamento .product-title-main h2").html();
            t(".departamento .product-title-main").prepend("<h1 class='product-title align-center'>" + i + "</h1>"), 
            t(".catalog-category-view h2.titulo-sessao").remove(), t(".resultado-busca-filtro").addClass("toolbar"), 
            t("fieldset.orderBy").wrap('<div class="sorter"></div>'), t("fieldset.orderBy").addClass("sort-by"), 
            t(".orderBy label, .orderBy select, fieldset.filterBy select").addClass("inline-middle"), 
            t(".search-single-navigator h5").addClass("filter-title accordion-trigger"), t(".search-single-navigator ul").addClass("accordion-content-wrapper"), 
            t(".search-single-navigator").addClass("block-content-list"), t("fieldset.filterBy select").before('<label class="inline-middle">Exibir</label>');
        }, PFTX.pages.common.menuDesktop = function() {
            var o = t(".main-navigation-item"), s = t(".main-navigation-submenu");
            (e.innerWidt || i.documentElement.clientWidth || i.body.clientWidth) >= 1199 && o.on({
                mouseenter: function() {
                    var e = t(this);
                    e.addClass("active"), e.find(s).stop(!0).delay(300).fadeIn(60);
                },
                mouseleave: function() {
                    var e = t(this);
                    e.removeClass("active"), e.find(s).stop(!0).delay(100).fadeOut(60);
                }
            });
        }, PFTX.pages.common.menuMobile = function() {
            function e(t) {
                t.preventDefault(), t.stopPropagation();
            }
            var i = t("body"), o = t(".main-navigation"), s = t(".main-navigation-item"), n = t(".mobile-navigation-panel"), a = t(".main-navigation-submenu"), r = t(".main-navigation-link.has-submenu"), l = t("#mobile-navigation-trigger"), c = t("#mobile-navigation-close"), d = t(".mobile-navigation-back");
            l.on("click", function(s) {
                var l = t(this);
                e(s), l.hasClass("active") ? (l.removeClass("active"), i.removeClass("mobile-navigation-open"), 
                o.removeClass("active").stop(!0), n.removeClass("active"), a.removeClass("active"), 
                r.removeClass("active")) : (l.addClass("active"), i.addClass("mobile-navigation-open"), 
                o.addClass("active").stop(!0), n.addClass("active"));
            }), r.on("click", function(i) {
                var o = t(this).parent(), s = o.find(a);
                s.length > 0 && (e(i), o.hasClass("active") ? (o.removeClass("active"), s.removeClass("active")) : (o.addClass("active"), 
                s.addClass("active")));
            }), c.on("click", function(t) {
                e(t), i.removeClass("mobile-navigation-open"), o.removeClass("active"), n.removeClass("active"), 
                a.removeClass("active"), r.removeClass("active"), l.removeClass("active");
            }), d.on("click", function(t) {
                e(t), a.removeClass("active"), r.removeClass("active"), s.removeClass("active");
            });
        }, PFTX.pages.common.promoSecretaM = function() {
            t("body").hasClass("mind") && setTimeout(function() {
                function o(t, e, o) {
                    var s = new Date();
                    s.setTime(s.getTime() + 24 * o * 60 * 60 * 1e3);
                    var n = "expires=" + s.toUTCString();
                    i.cookie = t + "=" + e + ";" + n + ";path=/";
                }
                var s = t("em.valor-por.price-best-price").text().replace(",", "").replace(/[^0-9\.]+/g, ""), n = t('[name="promocao-secreta-valor"]').val().toString().replace(".", "");
                if (parseFloat(s), s >= parseFloat(n)) {
                    t("span.btn.btn-default.btn-full.btn-aqua.btn-buy-prod").after('<span id="botao-open-modal" style="position: absolute;width: 254px;height: 46px;margin-top: -46px;margin-left: -125px;z-index: 90000;cursor: pointer;"></span>');
                    var a = function(t, e) {
                        var i = (e = e / 100) * t;
                        if (i = t - i, parseFloat(i), i.toString().indexOf(".") >= 0) {
                            var o = i.toString().split(".")[1];
                            o.length >= 3 && 5 == o.charAt(o.length - 1) && (i -= .001);
                        }
                        return i.toFixed(2).toString().replace(".", ",");
                    }, r = function(i, o) {
                        var s = t('input[name="promocao-secreta-porcento"]').val(), n = "";
                        if (s.toString().indexOf(";") >= 0) {
                            var r = s.toString().split(";");
                            t.each(r, function(t, s) {
                                var r = s.split(":");
                                r[0].trim() == o.trim() && (e.console.log(r[0].trim(), o.trim()), n = a(i, r[1]));
                            });
                        } else n = a(i, s);
                        return e.console.log(n), n;
                    }, l = function(t) {
                        for (var e = t + "=", o = decodeURIComponent(i.cookie).split(";"), s = 0; s < o.length; s++) {
                            for (var n = o[s]; " " == n.charAt(0); ) n = n.substring(1);
                            if (0 == n.indexOf(e)) return n.substring(e.length, n.length);
                        }
                        return "";
                    }, c = function(s, n, a) {
                        e.console.log(a);
                        var c = {
                            id: s,
                            quantity: 0 == n ? 1 : n,
                            seller: a
                        };
                        e.console.log(c), vtexjs.checkout.addToCart([ c ], null, 3).done(function(c) {
                            var d = 1;
                            t("body").hasClass("mind") && (d = 3), t("body").find('[name="promocao-secreta-colecao"]').val() > 0 || "" == l("promocaoSecreta") || null == l("promocaoSecreta") || "false" == l("promocaoSecreta") || c.value >= parseInt(t('[name="promocao-secreta-valor"]').val().toString().replace(".", "")) || "" == l("skus-promo") ? t.ajax({
                                url: "/buscapagina",
                                data: {
                                    fq: "H:" + t('[name="promocao-secreta-colecao"]').val(),
                                    PS: 3,
                                    sl: "52642917-6920-4a05-b581-8f071377f02a",
                                    cc: 3,
                                    sm: 0,
                                    PageNumber: 1
                                },
                                success: function(s) {
                                    t("body, html").animate({
                                        scrollTop: 0
                                    }, 500), 0 == t("body").find(".promoModal").length && (t("body").append('<div class="promoModal"><div class="promoModal-bg"></div><div class="promoModal-wrapper" style="z-index: 9999"><div class="promoModal-header"><button class="promoModal-close">ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¢</button></div><div class="promoModal-body"></div><div class="promoModal-footer"><div class="promoModal-footer-button"><button type="button" class="promoModal-button-close">NÃƒÆ’Ã‚Â£o, eu nÃƒÆ’Ã‚Â£o gosto de promoÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o!</button></div></div></div></div>'), 
                                    t("body").find(".promoModal-header").append(t(".promocaoSecreta-modalTitulo").html()), 
                                    t(".promoModal-bg, .promoModal-close, .promoModal-button-close").live("click", function() {
                                        t(".promoModal").hide(), e.location.href = "/checkout/#/cart";
                                    }));
                                    var n = !1, l = !1, c = !1, u = 0, p = 0, h = new Object(), m = t('input[name="promocao-secreta-preco"]').val();
                                    m = "" == m ? 0 : m, t.each(t(s).find(".preco-avista"), function(g, f) {
                                        c = parseInt(t(f).text().replace("R$", "").replace(",", "").trim()), p = t(f).text().replace("R$", "").replace(",", ".").trim(), 
                                        (0 == n || c < n) && (n = c, u = p), (0 == l || c > l) && (l = c, p);
                                        var v = t(f).parents("li").find("[entity-id]").attr("entity-id");
                                        if (h[v] = {}, h[v].de = t(f).parents("li").find(".preco-avista").text().trim(), 
                                        parseInt(t('input[name="promocao-secreta-preco"]').val()) > 0) if (m.toString().indexOf(";") >= 0) {
                                            var y = m.toString().split(";");
                                            t.each(y, function(t, e) {
                                                var i = e.split(":");
                                                i[0].trim() == v && (h[v].por = i[1]);
                                            });
                                        } else h[v].por = m.toString().replace(".", ","); else h[v].por = r(p, v);
                                        h[v].id = v, t(s).find(".preco-avista").length == g + 1 && (n < l && parseInt(t('input[name="promocao-secreta-preco"]').val()) <= 0 ? t(".promoModal-description").find(".promoModal-description-apartir").html("a partir de") : t(".promoModal-description").find(".promoModal-description-apartir").html("por apenas"), 
                                        parseInt(t('input[name="promocao-secreta-preco"]').val()) > 0 ? t(".promoModal-description").find(".promoModal-description-preco").html("R$ " + h[v].por) : t(".promoModal-description").find(".promoModal-description-preco").html("R$ " + r(u, v)), 
                                        t(".promoModal-body").html(s), t(".promoModal-body").find(".product-carousel-button").removeAttr("onclick"), 
                                        t.each(h, function(e, i) {
                                            var o = t('[entity-id="' + i.id + '"]').parents("li").find(".price-box");
                                            0 == o.find(".old-price").length ? o.prepend('<div class="old-price"><span class="price">De: ' + i.de + "</span></div>") : o.find(".old-price").html('<span class="price">De: ' + i.de + "</span>"), 
                                            o.find(".preco-avista").html("<strong>R$ 29,00</strong>");
                                        }), t(".promoModal-body").find(".product-carousel-button").unbind("click").live("click", function() {
                                            var i = t(this).parents("li").find("[entity-id]").attr("entity-id");
                                            vtexjs.catalog.getProductWithVariations(i).done(function(t) {
                                                o("skus-promo", t.skus[0].sku), o("promocaoSecreta", "true"), e.location.href = "/checkout/cart/add?sku=" + t.skus[0].sku + "&qty=1&seller=" + a + "&redirect=true&sc=" + d;
                                            });
                                        }), t(i).width() < 600 && (t(".promoModal-body").find(".helperComplement").remove(), 
                                        t(".promoModal-body .prateleira ul").addClass("owl-carousel").owlCarousel({
                                            margin: 10,
                                            loop: !1,
                                            dots: !0,
                                            nav: !1,
                                            lazyLoad: !0,
                                            smartSpeed: 450,
                                            autoplaySpeed: 450,
                                            autoplayTimeout: 7e3,
                                            autoplayHoverPause: !0,
                                            singleItem: !0,
                                            items: 1
                                        })), t(".promoModal").fadeIn());
                                    });
                                }
                            }) : e.location.href = "/checkout/cart/add?sku=" + s + "&qty=" + n + "&seller=" + a + "&redirect=true&sc=" + d;
                        });
                    };
                    t("#botao-open-modal").on("click", function(i) {
                        if (e.console.log("Click no botÃƒÆ’Ã‚Â£o comprar"), t(".item-dimension-Tamanho").length > 0) if (t(".item-dimension-Tamanho input").hasClass("checked")) {
                            var o = t(".add-to-box .quantity-input").val(), s = t(".item-dimension-Tamanho label.checked").attr("sku-value");
                            vtexjs.catalog.getCurrentProductWithVariations().done(function(t) {
                                var e = t.skus[0].sellerId;
                                c(s, o, e);
                            });
                        } else alert("Por favor, selecione o modelo desejado"); else {
                            o = t(".add-to-box .quantity-input").val(), s = t("#___rc-p-sku-ids").attr("value");
                            vtexjs.catalog.getCurrentProductWithVariations().done(function(t) {
                                e.console.log(t);
                                var i = t.skus[0].sellerId;
                                c(s, o, i);
                            });
                        }
                    });
                }
            }, 0);
        }, PFTX.pages.common.popupAdicionando = function() {
            0 == t("#popup-adicionando").length && t("body").append('<div id="popup-adicionando"><div class="conteudo-adicionando"><span class="text-adicionando">Produto adicionado ÃƒÆ’  Sacola</span><a class="link-adicionando" href="/checkout#/cart">Ver Sacola</a></div><div id="barratempo"></div></div>'), 
            t(".pratmind .btn-add-buy-button-asynchronous").live("click", function() {
                t("#popup-adicionando, #barratempo").addClass("active"), e.setTimeout(function() {
                    t("#popup-adicionando, #barratempo").removeClass("active");
                }, 2e3);
            });
        }, PFTX.pages.common.DOMReady = function() {
            t(".helperComplement").remove(), PFTX.modules.loginStatus.init(), PFTX.modules.floatingMenu.init(), 
            new PFTX.modules.stableMode({
                onStable: PFTX.pages.common.Stable
            }).init(), PFTX.pages.common.updateCart(), PFTX.pages.common.bindMenuEvents(), t("body").hasClass("home") && PFTX.pages.common.targetBlank(), 
            PFTX.pages.common.tipbar(), t("body").hasClass("produto") && (PFTX.pages.common.cartUpdate(), 
            0 == skuJson_0.available && t("body").addClass("prodIndisponivel")), setTimeout(function() {
                t("#my-orders-container .myo-cancel-btn").remove(), t("#my-orders-container span.link.no-underline").remove();
            }, 500), PFTX.pages.common.currentNumber(), PFTX.pages.common.updateUserInfo(), 
            t("li.pgCurrent").addClass("current"), setTimeout(function() {
                t("li.pgCurrent").addClass("current");
            }, 500), PFTX.pages.common.skipContents(), PFTX.pages.common.prateleira(), PFTX.pages.common.generalConfig(), 
            PFTX.pages.common.menuDesktop(), PFTX.pages.common.menuMobile(), PFTX.pages.common.promoSecretaM(), 
            PFTX.pages.common.popupAdicionando();
        }, PFTX.pages.common.ajaxStop = function() {
            PFTX.pages.common.prateleira();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.department = new PFTX.constructor.page("departamento"), PFTX.pages.department.DOMReady = function() {};
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.giftlist = new PFTX.constructor.page("giftlist"), PFTX.pages.giftlist.automatizaUrl = function() {
            var e;
            t(".gCreate  .action-area li.save #giftlistv2save").before('<button type="button" data-name="saveCover" class="gCreateSaveCover"></button>'), 
            t(".gCreateSaveCover").click(function(i) {
                e = (e = (e = (e = (e = (e = (e = (e = t("#giftlistname").val()).toLowerCase()).replace(/ |-|_/g, "")).replace(/ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡|ÃƒÆ’Ã†â€™ |ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª/g, "a")).replace(/ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âª/g, "e")).replace(/ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â²|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµ|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âº/g, "o")).replace(/ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âº|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹|ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â»/g, "u")).replace("ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§", "c"), 
                t("#giftlisturl").val(e), t("#giftlistv2save").trigger("click"), setTimeout(function() {
                    t(".giftlistul .giftlisterror").length > 0 && t("#giftlistname").addClass("giftlisterror");
                }, 2e3);
            });
        }, PFTX.pages.giftlist.addtoCart = function() {
            var i = [], o = [], s = [], n = "";
            t(".giftlist-remove-sku").before('<p class="comprarTodosCustom"><button id="comprarTodosCustom" type="button">Comprar todos os produtos da lista</button></p>'), 
            t("#ajaxBusy").ajaxComplete(function(n, a, r) {
                t(".emptyCells").length < 1 && (t(".giftlistproductsv2 thead tr").append('<th class="emptyCells"></th>'), 
                t(".giftlistproductsv2 tbody tr").each(function(n) {
                    i[n] = t(this).find("td.wished input.giftlistsku-input-wishedamt").attr("id"), o[n] = t(this).find("td.wished input.giftlistsku-input-wishedamt").val(), 
                    t(this).append('<td><button type="button" class="customBuyBt">Comprar</button></td>'), 
                    t(this).find(".customBuyBt").click(function(t) {
                        e.location.href = "/checkout/cart/add?sku=" + i[n] + "&qty=" + o[n] + "&seller=1&sc=3";
                    }), s[n] = "&sku=" + i[n] + "&qty=" + o[n] + "&seller=1";
                }));
            }), t("#comprarTodosCustom").click(function(t) {
                for (var i = 0; i < s.length; i++) n += s[i];
                e.location.href = "/checkout/cart/add?" + n + "&sc=3";
            });
        }, PFTX.pages.giftlist.DOMReady = function() {
            PFTX.pages.giftlist.automatizaUrl(), PFTX.pages.giftlist.addtoCart(), t("body").hasClass("gCreate") && t("#giftlistaccept").trigger("click");
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.home = new PFTX.constructor.page("home"), PFTX.pages.home.validate = function(e) {
            var i = t("#fcEmail").val();
            return PFTX.pages.common.validateEmail(i) ? PFTX.pages.home.enviaDados(e) : (t("#fcEmail").css("border", "1px solid #d00d0d"), 
            t("#fcEmail").before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>')), 
            !1;
        }, PFTX.pages.home.enviaDados = function(e) {
            var i = {};
            i.email = e, t.ajax({
                accept: "application/vnd.vtex.ds.v10+json",
                contentType: "application/json; charset=utf-8",
                crossDomain: !0,
                data: JSON.stringify(i),
                type: "POST",
                url: "/api/dataentities/PU/documents",
                success: function(e) {
                    t("#formFC").html("<p id='msgSucesso'>E-mail cadastrado com sucesso!<small>VocÃª receberÃ¡ um cupom de desconto em seu e-mail.</small></p>"), 
                    setTimeout(function() {
                        t("#newsletter-pop").removeClass("slide");
                    }, 5e3), localStorage.setItem("mindPopNewsletter", "showme");
                },
                error: function(t) {}
            });
        }, PFTX.pages.home.newsletter = function() {
            t(".enviarForm").click(function() {
                var e = t("#fcEmail").val();
                t(".boxCampo input, .boxCampo textarea").css("border", "1px solid #cccccc"), t(".box-form-msg").css("display", "none"), 
                "" == e ? (t("#fcEmail").css("border", "1px solid #d00d0d"), t("#fcEmail").before('<div class="box-form-msg">Preencha o campo E-mail</div>')) : "" != e && PFTX.pages.home.validate(e);
            }), t(".popUpHiddenNews").click(function(e) {
                t("#newsletter-pop").addClass("slide");
            }), t("#newsletter-pop .bt-close").click(function(e) {
                t("#newsletter-pop").removeClass("slide");
            }), t(i).ready(function() {
                "showme" != localStorage.getItem("mindPopNewsletter") && "showme" != sessionStorage.getItem("mindPopNewsletter") && setTimeout(function() {
                    t(".popUpHiddenNews").trigger("click");
                }, 1e3), sessionStorage.setItem("mindPopNewsletter", "showme");
            });
        }, PFTX.pages.home.carouselHome = function() {
            var e = t("#main-banner, #main-banner-mobile");
            t("#main-banner, #main-banner-mobile").owlCarousel({
                items: 1,
                loop: !0,
                lazyLoad: !0,
                dots: !0,
                autoHeight: !0,
                navText: [ "<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>" ],
                smartSpeed: 500,
                autoplay: !0,
                autoplaySpeed: 500,
                autoplayTimeout: 6e3,
                autoplayHoverPause: !0,
                onInitialized: function(e) {
                    var i = t(e.target);
                    i.addClass("initialized"), PFTX.pages.home.applyBpImages(i), i.addClass("initialized"), 
                    i.find(".owl-dots").after('<div class="owl-trigger"><span class="owl-trigger-icon fa"></span></div>'), 
                    PFTX.pages.home.applyBpImages(i);
                }
            }), t(".owl-trigger-icon fa active").on("click", function() {
                e.trigger("play.owl.autoplay", [ 6e3 ]);
            }), t(".owl-trigger-icon fa").on("click", function() {
                e.trigger("stop.owl.autoplay");
            });
        }, PFTX.pages.home.applyBpImages = function(o) {
            var s, n = e.innerWidt || i.documentElement.clientWidth || i.body.clientWidth;
            n <= 568 ? s = "small" : n <= 1024 ? s = "medium" : n > 1024 && (s = "large"), s = s.charAt(0).toUpperCase() + s.slice(1), 
            o.find(".owl-item").each(function() {
                var e, i, o, n, a;
                (e = t(this).find(".main-banner-image")).data("current-bp") != s && (i = e.data("src"), 
                void 0 !== (o = e.data("src" + s)) ? (n = o, a = s) : (n = i, a = "default"), e.css("background-image", "url(" + n + ")"), 
                e.data("current-bp", a));
            });
        }, PFTX.pages.home.eventTracking = function() {
            var t;
            t = function(t) {
                var e, i, o, s, n;
                if ("a" == (e = jQuery(this))[0].nodeName.toLowerCase() && /(\?|\&)event-category=.+/.test(e.attr("href"))) {
                    var a = e.attr("href"), r = /(?:\?|\&)event-category=([a-z0-9_ -]+)/gi.exec(a), l = /(?:\?|\&)event-action=([a-z0-9_ -]+)/gi.exec(a), c = /(?:\?|\&)event-label=([a-z0-9_ -]+)/gi.exec(a), d = /(?:\?|\&)event-bind=([a-z0-9_ -]+)/gi.exec(a);
                    i = null == r ? null : r[1], o = null == l ? null : l[1], s = null == c ? null : c[1], 
                    n = null == d ? null : d[1];
                } else i = e.data("event-category"), o = e.data("event-action"), s = e.data("event-label"), 
                n = e.data("event-bind");
                if (void 0 !== i && null != i && /\S/g.test(i)) {
                    if (void 0 === o || null == o) {
                        var u = e.attr("title"), p = e.text();
                        if (void 0 === (o = "string" == typeof u ? u : p) || null == o || 0 === o.length) return;
                    }
                    void 0 === s && (s = null), void 0 !== n && null != n || (n = "mousedown"), e.on(n, function(t) {
                        dataLayer.push({
                            event: "GAEvent",
                            eventCategory: i,
                            eventAction: o,
                            eventLabel: s
                        });
                    });
                }
            }, jQuery("[data-event-category]").each(t), e.setTimeout(function() {
                jQuery("a[href*=event-category]").each(t);
            }, 500);
        }, PFTX.pages.home.owlPrateleiraMind = function() {
            t(".pratmind h2").remove(), t(e).width() <= 680 ? t("#off .pratmind ul").addClass("owl-carousel").owlCarousel({
                dots: !1,
                items: 1,
                arrows: !0
            }) : t(e).width() >= 681 && t(e).width() <= 1020 ? t("#off .pratmind ul").addClass("owl-carousel").owlCarousel({
                dots: !1,
                items: 2,
                arrows: !0,
                navText: [ '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"></path></g></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"></path></g></svg>' ]
            }) : t("#off .pratmind ul").addClass("owl-carousel").owlCarousel({
                dots: !1,
                items: 4,
                arrows: !0,
                navText: [ '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"></path></g></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"></path></g></svg>' ]
            }), t(".pratmind .btn-add-buy-button-asynchronous").text("Adicionar ao Carrinho");
        }, PFTX.pages.home.prateleiraMindMobile = function() {
            e.screen.availWidth < 681 && t(".prateleira.pratmind ul li").each(function(e, i) {
                t(i).find(".yv-review-quickreview").clone().prependTo(t(i).find(".product-carousel-description")), 
                t(i).find(".product-carousel-title").clone().prependTo(t(i).find(".product-carousel-description"));
            });
        }, PFTX.pages.home.DOMReady = function() {
            PFTX.pages.home.eventTracking(), PFTX.pages.home.newsletter(), PFTX.pages.home.carouselHome(), 
            PFTX.pages.home.owlPrateleiraMind(), PFTX.pages.home.prateleiraMindMobile();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.orders = new PFTX.constructor.page("orders"), PFTX.pages.orders.ajustes = function() {
            t("body.orders").addClass("account"), t(".orders .main-wrapper").addClass("page-main"), 
            t(".orders .main-container").attr("id", "content");
        }, PFTX.pages.orders.DOMReady = function() {
            PFTX.pages.orders.ajustes();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.product = new PFTX.constructor.page("produto"), PFTX.pages.product.informationTabs = function(e, i, o, s, n) {
            var a = t(e).find(i), r = t(e).find(o), l = !1;
            r.each(function() {
                var i = t(this).attr("class").replace(o.replace(".", ""), "").replace(/^\s+|\s+$/g, "");
                0 === t(this).text().length ? t(e).find("." + i).removeClass(s).addClass(n) : l || (t(e).find("." + i).addClass(s), 
                l = !0);
            }), t(e).live("click", i, function(e) {
                if (t(e.target).hasClass(i.replace(".", ""))) {
                    a.removeClass(s), r.removeClass(s);
                    var o = t(e.target).attr("class").replace(i.replace(".", ""), "").replace(/^\s+|\s+$/g, "");
                    t(e.target).addClass(s), r.each(function() {
                        t(this).hasClass(o) && t(this).addClass(s);
                    });
                }
            });
        }, PFTX.pages.product.generalConfig = function() {
            t(".product-image-wrapper #show #include").addClass("product-image-zoom"), t(".product-view .thumbs").wrap('<div class="product-image-thumbs"><div class="viewport"></div></div>'), 
            t(".produtoDefault .buy-button").before('<span class="btn btn-default btn-full btn-aqua btn-buy-prod">Comprar</span>'), 
            t(".product-view .thumbs").addClass("overview"), t(".product-view .thumbs li").addClass("product-image-thumbs-item"), 
            t(".product-image-thumbs .overview li a").addClass("product-thumb-link"), t(".product-image-zoom").append('<div class="zoom-image hidden-bp-large"><i class="fa fa-search-plus"></i><span>ZOOM</span></div>');
            var e = t(".produto .productName").html();
            t(".produto .breadcrumbs ul").append('<span> / </span><li class="last inline-middle lastBread"><strong>' + e + "</strong></li>");
            var i = t(".produto .price-best-price").text();
            t(".produto .price-best-price").text(i.replace("Por: ", ""));
        }, PFTX.pages.product.calculatePercentage = function() {
            var e = 0, i = setInterval(function() {
                var o = "", s = t(".buy-button").attr("href");
                "javascript:alert('Por favor, selecione o modelo desejado.');" != s && "" != s && (o = PFTX.pages.product.getParameterByName("sku", s), 
                PFTX.pages.product.getAvailable(getSkuData(o)), clearInterval(i)), e >= 10 && clearInterval(i), 
                e += 1;
            }, 100);
            t(".skuList").find('input[type="radio"]').live("change", function() {
                0 == t(".product-aside-add-to-cart").find(".available").length && t(".available-alert").html(""), 
                t(this).is(":checked") && (sku = t(this).next("[sku-value]").attr("sku-value"), 
                PFTX.pages.product.getAvailable(getSkuData(sku)));
            });
        }, PFTX.pages.product.getParameterByName = function(t, i) {
            "" == i && (i = e.location.href), t = t.replace(/[\[\]]/g, "\\$&");
            var o = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(i);
            return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null;
        }, PFTX.pages.product.getAvailable = function(i) {
            if (i.availability) {
                var o = "", s = 0;
                t.each(i.SkuSellersInformation, function(n, a) {
                    if (("" == o || a.AvailableQuantity < o) && (o = a.AvailableQuantity), (0 == s || a.AvailableQuantity > s) && (s = a.AvailableQuantity), 
                    i.SkuSellersInformation.length == n + 1 && (e.console.log(o, s), s <= 5)) {
                        var r = "<p>Corre que sÃƒÆ’Ã‚Â³ tem <strong>" + s + "</strong> unidades disponÃƒÆ’Ã‚Â­veis!</p>";
                        0 == t(".product-aside-add-to-cart").find(".available").length && t(".product-aside-add-to-cart").append('<div class="available-alert"></div>'), 
                        1 == s && (r = "<p>Corre! <strong>ÃƒÆ’Ã…Â¡ltima</strong> unidade disponÃƒÆ’Ã‚Â­vel!</p>"), 
                        t(".available-alert").html(r);
                    }
                });
            }
        }, PFTX.pages.product.seller = function() {
            vtexjs.catalog.getCurrentProductWithVariations().done(function(e) {
                var i = e.skus[0].seller;
                "mindesigns" != i && t(".product-aside-partnerhint").html("<div>Produzido e entregue por: <p>" + i + "</p></div><span>O prazo de entrega pode variar.<br />Disponibilizaremos um rastreamento exclusivo.</span><span>PolÃƒÆ’Ã‚Â­tica de frete nÃƒÆ’Ã‚Â£o se aplica a produtos de parceiros</span>");
            });
        }, PFTX.pages.product.slickthumbprod = function() {
            t(".thumbs.overview").slick({
                slide: "li",
                vertical: !0,
                arrows: !0,
                slidesToShow: 5,
                prevArrow: '<span class="buttons prev"><i class="fa fa-chevron-up"></i></span>',
                nextArrow: '<span class="buttons next"><i class="fa fa-chevron-down"></i></span>',
                responsive: [ {
                    breakpoint: 768,
                    settings: {
                        vertical: !1,
                        slidesToShow: 5,
                        prevArrow: '<span class="buttons prev"><i class="fa fa-chevron-left"></i></span>',
                        nextArrow: '<span class="buttons next"><i class="fa fa-chevron-right"></i></span>'
                    }
                } ]
            });
        }, PFTX.pages.product.addRemove = function() {
            e.cartItemChangeTimeout = null;
            var i = ".quantity-add-remove", o = ".quantity-input";
            t(".quantity-trigger").each(function() {
                var e = t(this), n = e.closest(i), a = n.find(o), r = e.parents("form"), l = e.data("type"), c = n.data("context");
                e.on("click", function(t) {
                    t.preventDefault();
                    var e = a.val();
                    "remove" === l && e > 0 ? e-- : "add" === l && e++, a.val(e), a.trigger("change"), 
                    r.length && "cart" === c && s(r);
                });
            });
            var s = function(i) {
                e.clearTimeout(e.cartItemChangeTimeout), e.cartItemChangeTimeout = e.setTimeout(function() {
                    t("#loading").fadeIn(), i.submit();
                }, 750);
            };
            t(o).each(function() {
                var e = t(this), o = e.closest(i), n = e.parents("form"), a = o.data("context");
                n.length && "cart" === a && e.unbind("blur").bind("blur", function() {
                    s(n);
                });
            }), t(".btn-buy-prod").live("click", function() {
                /qty=0/.test(t(".buy-button.buy-button-ref").attr("href")) && t(".buy-button.buy-button-ref").replace(/qty=\d+/, "qty=1"), 
                e.location.href = t(".buy-button.buy-button-ref").attr("href");
            });
        }, PFTX.pages.product.DOMReady = function() {
            PFTX.pages.product.informationTabs(".product-information-tabs", ".list-button", ".content-tab-item", "active", "inactive"), 
            PFTX.pages.product.generalConfig(), PFTX.pages.product.calculatePercentage(), PFTX.pages.product.seller(), 
            PFTX.pages.product.addRemove(), PFTX.pages.product.slickthumbprod();
        };
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.sac = new PFTX.constructor.page("sac");
    }(jQuery, window, document), function(t, e, i, o) {
        "use strict";
        PFTX.pages.search = new PFTX.constructor.page("resultado-busca"), PFTX.pages.search.buildBreadCrumb = function() {}, 
        PFTX.pages.search.DOMReady = function() {
            PFTX.pages.search.buildBreadCrumb();
        };
    }(jQuery, window, document), PFTX.init();
}