! function () {
    var $, isBuilder, isJQuery = "function" == typeof jQuery,
        sr, debounce;

    function outerFind(el, selector) {
        var elements = Array.from(el.querySelectorAll(selector));
        return el.matches && el.matches(selector) && elements.splice(0, 0, el), elements
    }

    function offset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        }
    }

    function getHeight(el) {
        return parseFloat(getComputedStyle(el, null).height.replace("px", ""))
    }

    function getWidth(el) {
        return parseFloat(getComputedStyle(el, null).width.replace("px", ""))
    }

    function ready(fn) {
        "loading" != document.readyState ? fn() : document.addEventListener("DOMContentLoaded", fn)
    }

    function getIndex(el) {
        if (!el) return -1;
        var i = 0;
        do {
            i++
        } while (el = el.previousElementSibling);
        return i
    }

    function fadeOut(el) {
        ! function fade() {
            (el.style.opacity -= .1) < 0 ? el.style.display = "none" : requestAnimationFrame(fade)
        }()
    }

    function fadeIn(el) {
        el.style.display = "block",
            function fade() {
                var val = parseFloat(el.style.opacity);
                (val += .1) > 1 || (el.style.opacity = val, requestAnimationFrame(fade))
            }()
    }

    function isMobile(type) {
        var reg = [],
            any = {
                blackberry: "BlackBerry",
                android: "Android",
                windows: "IEMobile",
                opera: "Opera Mini",
                ios: "iPhone|iPad|iPod"
            };
        return "*" === (type = void 0 === type ? "*" : type.toLowerCase()) ? reg = Object.values(any) : type in any && reg.push(any[type]), !(!reg.length || !navigator.userAgent.match(new RegExp(reg.join("|"), "i")))
    }
    isJQuery && ($ = jQuery), isBuilder = $ ? $("html").hasClass("is-builder") : document.querySelector("html").classList.contains("is-builder"), Element.prototype.parents = function (selector) {
            for (var elements = [], elem = this, ishaveselector = void 0 !== selector; null !== (elem = elem.parentElement);) elem.nodeType === Node.ELEMENT_NODE && (ishaveselector && !elem.matches(selector) || elements.push(elem));
            return elements
        }, Element.prototype.footerReveal = function () {
            var prev = this.previousElementSibling,
                isIE = !!document.documentMode;

            function initReveal() {
                !isIE && this.offsetHeight <= window.outerHeight ? (this.style.zIndex = "-999", this.style.position = "fixed", this.style.bottom = "0", this.style.width = prev.offsetWidth, prev.style.marginBottom = this.offsetHeight) : (this.style.zIndex = "", this.style.position = "", this.style.bottom = "", this.style.width = "", prev.style.marginBottom = "")
            }
            return initReveal(), window.addEventListener("resize", (function () {
                initReveal()
            })), window.addEventListener("load", (function () {
                initReveal()
            })), this
        }, sr = "smartresize", debounce = function (func, threshold, execAsap) {
            var timeout;
            return function debounced() {
                var obj = this,
                    args = arguments;

                function delayed() {
                    execAsap || func.apply(obj, args), timeout = null
                }
                timeout ? clearTimeout(timeout) : execAsap && func.apply(obj, args), timeout = setTimeout(delayed, threshold || 100)
            }
        }, window[sr] = function (fn) {
            var ev = new CustomEvent(sr);
            return fn ? this.addEventListener("resize", debounce(fn)) : this.dispatchEvent(ev)
        },
        function () {
            var scrollbarWidth = 0,
                originalMargin, touchHandler = function (event) {
                    event.preventDefault()
                };

            function getScrollbarWidth() {
                if (scrollbarWidth) return scrollbarWidth;
                var scrollDiv = document.createElement("div"),
                    props = {
                        top: "-9999px",
                        width: "50px",
                        height: "50px",
                        overflow: "scroll",
                        position: "absolute"
                    };
                for (var prop in props) scrollDiv.style[prop] = props[prop];
                return document.querySelector("body").appendChild(scrollDiv), scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth, document.querySelector("body").removeChild(scrollDiv), scrollbarWidth
            }
        }();
    var isSupportViewportUnits = function () {
        var div = document.createElement("div"),
            body = document.querySelector("body");
        div.setAttribute("style", "height: 50vh; position: absolute; top: -1000px; left: -1000px;"), body.appendChild(div);
        var height = parseInt(window.innerHeight / 2, 10),
            compStyle = parseInt((window.getComputedStyle ? getComputedStyle(div, null) : div.currentStyle).height, 10);
        return body.removeChild(div), compStyle == height
    }();
    if (ready((function () {
            function calculate16by9(el) {
                el.style.height = 9 * getWidth(el.parentNode) / 16 + "px"
            }

            function initParallax(card) {
                setTimeout((function () {
                    outerFind(card, ".mbr-parallax-background").forEach((function (el) {
                        jarallax && (jarallax(el, {
                            speed: .6
                        }), el.style.position = "relative")
                    }))
                }), 0)
            }

            function destroyParallax(card) {
                jarallax && jarallax(card, "destroy"), card.style.position = ""
            }
            if (document.querySelector("html").classList.add(isMobile() ? "mobile" : "desktop"), window.addEventListener("scroll", (function () {
                    document.querySelectorAll(".mbr-navbar--sticky").forEach((function (el) {
                        var method = window.scrollTop > 10 ? "add" : "remove";
                        el.classList[method]("mbr-navbar--stuck"), el.classList.contains(".mbr-navbar--open") || el.classList[method]("mbr-navbar--short")
                    }))
                })), isMobile() && navigator.userAgent.match(/Chrome/i) ? function (width, height) {
                    var deviceSize = [width, width];
                    deviceSize[height > width ? 0 : 1] = height, window.smartresize((function () {
                        var windowHeight = window.innerHeight,
                            el;
                        deviceSize.indexOf(windowHeight) < 0 && (windowHeight = deviceSize[window.innerWidth > windowHeight ? 1 : 0]), document.querySelector(".mbr-section--full-height").style.height = windowHeight + "px"
                    }))
                }(window.innerWidth, window.innerHeight) : isSupportViewportUnits || (window.smartresize((function () {
                    var el;
                    document.querySelector(".mbr-section--full-height").style.height = window.innerHeight + "px"
                })), $(document).on("add.cards", (function (event) {
                    document.querySelector("html").classList.contains("mbr-site-loaded") && outerFind(event.target, ".mbr-section--full-height").length && window.dispatchEvent(new CustomEvent("resize"))
                }))), window.addEventListener("smartresize", (function () {
                    document.querySelectorAll(".mbr-section--16by9").forEach(calculate16by9)
                })), isJQuery && $(document).on("add.cards changeParameter.cards", (function (event) {
                    var enabled = outerFind(event.target, ".mbr-section--16by9");
                    enabled.length ? enabled.forEach((function (el) {
                        el.setAttribute("data-16by9", "true"), calculate16by9(el)
                    })) : outerFind(event.target, "[data-16by9]").forEach((function (el) {
                        el.styles.height = "", el.removeAttribute("data-16by9")
                    }))
                })), "undefined" != typeof jarallax && !isMobile()) {
                if (window.addEventListener("update.parallax", (function (event) {
                        setTimeout((function () {
                            if (jarallax) {
                                var jarallax = document.querySelector(".mbr-parallax-background");
                                jarallax.jarallax("coverImage"), jarallax.jarallax("clipContainer"), jarallax.jarallax("onScroll")
                            }
                        }), 0)
                    })), isBuilder) {
                    if (!isJQuery) return;
                    $(document).on("add.cards", (function (event) {
                        initParallax(event.target), $(window).trigger("update.parallax")
                    })), $(document).on("changeParameter.cards", (function (event, paramName, value, key) {
                        if ("bg" === paramName) switch (destroyParallax(event.target), key) {
                            case "type":
                                !0 === value.parallax && initParallax(event.target);
                                break;
                            case "value":
                                "image" === value.type && !0 === value.parallax && initParallax(event.target);
                                break;
                            case "parallax":
                                !0 === value.parallax && initParallax(event.target)
                        }
                        $(window).trigger("update.parallax")
                    }))
                } else initParallax(document.body);
                window.addEventListener("shown.bs.tab", (function () {
                    window.dispatchEvent(new CustomEvent("update.parallax"))
                }))
            }
            var fixedTopTimeout, scrollTimeout, prevScrollTop = 0,
                fixedTop = null,
                isDesktop = !isMobile();

            function videoParser(card) {
                outerFind(card, "[data-bg-video]").forEach((function (el) {
                    var videoURL = el.getAttribute("data-bg-video");
                    if (videoURL) {
                        var parsedUrl = videoURL.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/),
                            img = el.querySelector(".mbr-background-video-preview") || document.createElement("div");
                        if (img.classList.add("mbr-background-video-preview"), img.style.display = "none", img.style.backgroundSize = "cover", img.style.backgroundPosition = "center", el.querySelector(".mbr-background-video-preview") || el.childNodes[0].before(img), parsedUrl && (/youtu\.?be/g.test(parsedUrl[3]) || /vimeo/g.test(parsedUrl[3]))) {
                            if (parsedUrl && /youtu\.?be/g.test(parsedUrl[3])) {
                                var previewURL = "http" + ("https:" === location.protocol ? "s" : "") + ":";
                                previewURL += "//img.youtube.com/vi/" + parsedUrl[6] + "/maxresdefault.jpg";
                                var image = new Image;
                                image.onload = function () {
                                    if (120 === (image.naturalWidth || image.width)) {
                                        var file = image.src.split("/").pop();
                                        switch (file) {
                                            case "maxresdefault.jpg":
                                                image.src = image.src.replace(file, "sddefault.jpg");
                                                break;
                                            case "sddefault.jpg":
                                                image.src = image.src.replace(file, "hqdefault.jpg");
                                                break;
                                            default:
                                                isBuilder && (img.style.backgroundImage = 'url("images/no-video.jpg")', img.style.display = "block")
                                        }
                                    } else img.style.backgroundImage = 'url("' + image.src + '")', img.style.display = "block";
                                    el.querySelector(".mbr-background-video") && el.querySelector(".mbr-background-video").remove();
                                    var videoElement = document.createElement("div");
                                    videoElement.classList.add("mbr-background-video");
                                    var playerEl = el.childNodes[1].before(videoElement),
                                        imageResolution = {
                                            height: image.naturalHeight,
                                            width: image.naturalWidth,
                                            scale: image.naturalHeight / image.naturalWidth
                                        },
                                        sectionResolution = {
                                            height: videoElement.parentNode.clientHeight,
                                            width: videoElement.parentNode.clientWidth,
                                            scale: videoElement.parentNode.clientHeight / videoElement.parentNode.clientWidth
                                        },
                                        videoResolution = {
                                            height: imageResolution.height < sectionResolution.height ? imageResolution.height : sectionResolution.height,
                                            width: imageResolution.width > sectionResolution.width ? imageResolution.width : sectionResolution.width
                                        };
                                    videoResolution.height / videoResolution.width != imageResolution.scale && (videoResolution.height = videoResolution.width * imageResolution.scale);
                                    var options = {
                                            height: videoResolution.height,
                                            width: videoResolution.width,
                                            modestbranding: !0,
                                            autoplay: !0,
                                            controls: !1,
                                            origin: "*",
                                            iv_load_policy: !1,
                                            keyboard: !1,
                                            captions: !1,
                                            annotations: !1,
                                            related: !1
                                        },
                                        player = new YouTubePlayer(videoElement, options);
                                    videoElement.style.pointerEvents = "none", videoElement.style.width = videoResolution.width + "px", videoElement.style.marginTop = "-" + (videoResolution.height - sectionResolution.height) / 2 + "px", videoElement.style.marginLeft = "-" + (videoResolution.width - sectionResolution.width) / 2 + "px", videoElement.parentNode.style.overflow = "hidden", player.load(parsedUrl[6]), player.play(), player.mute()
                                }, image.setAttribute("src", previewURL)
                            } else if (parsedUrl && /vimeo/g.test(parsedUrl[3])) {
                                var request = new XMLHttpRequest;
                                request.open("GET", "https://vimeo.com/api/v2/video/" + parsedUrl[6] + ".json", !0), request.onreadystatechange = function () {
                                    if (4 === this.readyState)
                                        if (this.status >= 200 && this.status < 400) {
                                            var response = JSON.parse(this.responseText);
                                            img.style.backgroundImage = 'url("' + response[0].thumbnail_large + '")', img.style.display = "block"
                                        } else isBuilder && (img.style.backgroundImage = 'url("images/no-video.jpg")', img.style.display = "block")
                                }, request.send(), request = null, el.querySelector(".mbr-background-video") && el.querySelector(".mbr-background-video").remove();
                                var videoElement = document.createElement("div");
                                videoElement.classList.add("mbr-background-video");
                                var playerEl = el.childNodes[1].before(videoElement),
                                    options = {
                                        id: videoURL,
                                        loop: !0,
                                        background: !0,
                                        responsive: !0,
                                        autoplay: !0,
                                        byline: !1,
                                        title: !1,
                                        muted: !0
                                    },
                                    player = new Vimeo.Player(videoElement, options),
                                    playerParent = player.element.parentNode;
                                playerParent.style.overflow = "hidden", player.element.style.pointerEvents = "none", player.element.style.marginLeft = "-" + (player.element.scrollWidth - playerParent.scrollWidth) / 2 + "px", player.element.style.minHeight = "100vh", player.element.style.minWidth = "177.77vh"
                            }
                        } else isBuilder && (img.style.backgroundImage = 'url("images/video-placeholder.jpg")', img.style.display = "block")
                    }
                }))
            }
            if (window.addEventListener("scroll", (function () {
                    scrollTimeout && clearTimeout(scrollTimeout);
                    var scrollTop = document.documentElement.scrollTop,
                        scrollUp = scrollTop <= prevScrollTop || isDesktop;
                    if (prevScrollTop = scrollTop, fixedTop) {
                        var fixed = scrollTop > fixedTop.breakPoint;
                        scrollUp ? fixed != fixedTop.fixed && (isDesktop ? (fixedTop.fixed = fixed, fixedTop.elm.classList.toggle("is-fixed")) : scrollTimeout = setTimeout((function () {
                            fixedTop.fixed = fixed, fixedTop.elm.classList.toggle("is-fixed")
                        }), 40)) : (fixedTop.fixed = !1, fixedTop.elm.classList.remove("is-fixed"))
                    }
                })), isJQuery && $(document).on("add.cards delete.cards", (function (event) {
                    fixedTopTimeout && clearTimeout(fixedTopTimeout), fixedTopTimeout = setTimeout((function () {
                        fixedTop && (fixedTop.fixed = !1, fixedTop.elm.classList.remove("is-fixed"));
                        var elm = document.querySelector(".mbr-fixed-top");
                        elm && (fixedTop = {
                            breakPoint: offset(elm).top + 3 * getHeight(elm),
                            fixed: !1,
                            elm: elm
                        }, elm.dispatchEvent(new CustomEvent("scroll")))
                    }), 650)
                })), window.smartresize((function () {
                    document.querySelectorAll(".mbr-embedded-video").forEach((function (el) {
                        el.style.height = (getWidth(el) * parseInt(el.getAttribute("height") || 315) / parseInt(el.getAttribute("width") || 560)).toFixed() + "px"
                    }))
                })), isJQuery && $(document).on("add.cards", (function (event) {
                    document.querySelector("html").classList.contains("mbr-site-loaded") && outerFind(event.target, "iframe").length && window.dispatchEvent(new CustomEvent("resize"))
                })), isBuilder) {
                if (!isJQuery) return;
                $(document).on("add.cards", (function (event) {
                    videoParser(event.target)
                }))
            } else videoParser(document.body);
            isBuilder && $(document).on("changeParameter.cards", (function (event, paramName, value, key) {
                if ("bg" === paramName) switch (key) {
                    case "type":
                    case "value":
                        "video" === value.type && videoParser(event.target)
                }
            })), isBuilder || Array.from(document.body.children).filter((function (el) {
                return !el.matches("style, script")
            })).forEach((function (el) {
                el.dispatchEvent(new CustomEvent("add.cards")), isJQuery && $(el).trigger("add.cards")
            })), document.querySelector("html").classList.add("mbr-site-loaded"), window.dispatchEvent(new CustomEvent("resize")), window.dispatchEvent(new CustomEvent("scroll")), isBuilder || document.addEventListener("click", (function (e) {
                try {
                    var target = e.target;
                    if (target.parents().some((function (el) {
                            el.classList.contains("carousel")
                        }))) return;
                    do {
                        if (target.hash) {
                            var useBody = /#bottom|#top/g.test(target.hash);
                            document.querySelector(useBody ? "body" : target.hash).forEach((function (el) {
                                e.preventDefault();
                                var stickyMenuHeight = target.parents().some((function (el) {
                                        return el.classList.contains("navbar-fixed-top")
                                    })) ? 60 : 0,
                                    goTo = "#bottom" == target.hash ? getHeight(el) - window.innerHeight : offset(el).top - stickyMenuHeight;
                                el.classList.contains("panel-collapse") || el.classList.contains("tab-pane") || window.scrollTo({
                                    top: goTo,
                                    left: 0,
                                    behavior: "smooth"
                                })
                            }));
                            break
                        }
                    } while (target = target.parentNode)
                } catch (e) {}
            })), document.querySelectorAll(".cols-same-height .mbr-figure").forEach((function (el) {
                var img = el.querySelector("img"),
                    cont = el.parentNode,
                    imgW = img.width,
                    imgH = img.height;

                function setNewSize() {
                    if (img.style.width = "", img.style.maxWidth = "", img.style.marginLeft = "", imgH && imgW) {
                        var aspectRatio = imgH / imgW;
                        el.style.position = "absolute", el.style.top = "0", el.style.left = "0", el.style.right = "0", el.style.bottom = "0";
                        var contAspectRatio = getHeight(cont) / getWidth(cont);
                        if (contAspectRatio > aspectRatio) {
                            var percent = 100 * (contAspectRatio - aspectRatio) / aspectRatio;
                            img.style.width = percent + 100 + "%", img.style.maxWidth = percent + 100 + "%", img.style.marginLeft = -percent / 2 + "%"
                        }
                    }
                }
                img.addEventListener("load", (function () {
                    imgW = img.width, imgH = img.height, setNewSize()
                }), {
                    once: !0
                }), window.addEventListener("resize", setNewSize), setNewSize()
            }))
        })), isBuilder || (isJQuery && $.fn.socialLikes && $(document).on("add.cards", (function (event) {
            outerFind(event.target, ".mbr-social-likes").forEach((function (el) {
                el.addEventListener("counter.social-likes", (function (event, service, counter) {
                    counter > 999 && event.target.querySelectorAll(".social-likes__counter").forEach((function (el) {
                        el.innerHTML = Math.floor(counter / 1e3) + "k"
                    }))
                })), el.socialLikes({
                    initHtml: !1
                })
            }))
        })), isJQuery && $(document).on("add.cards", (function (event) {
            event.target.classList.contains("mbr-reveal") && event.target.footerReveal()
        })), ready((function () {
            if (!isMobile() && document.querySelectorAll("input[name=animation]").length) {
                document.querySelectorAll("input[name=animation]").forEach((function (el) {
                    el.remove()
                }));
                var animatedElements = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, select, textarea, .input-group, .form-control, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"));

                function getElementOffset(element) {
                    var top = 0;
                    do {
                        top += element.offsetTop || 0, element = element.offsetParent
                    } while (element);
                    return top
                }

                function elCarouselItem(element) {
                    if (element.parents(".carousel-item").some((function (x) {
                            return "none" !== getComputedStyle(x, null).display
                        }))) return !1;
                    var parentEl = element.parents(".carousel-item").parentNode;
                    if (!parentEl) return !1;
                    if (parentEl.querySelectorAll(".carousel-item.active .hidden.animate__animated").length) return !1;
                    if (parentEl.getAttribute("data-visible") > 1) {
                        var visibleSlides = parentEl.getAttribute("data-visible");
                        return !(!element.parents().some((function (el) {
                            return el.matches(".cloneditem-" + (visibleSlides - 1))
                        })) || !element.parents(".cloneditem-" + (visibleSlides - 1)).some((function (el) {
                            return el.getAttribute("data-cloned-index") >= visibleSlides
                        }))) || (element.classList.remove("animate__animated animate__delay-1s hidden"), !1)
                    }
                    return !0
                }

                function checkIfInView() {
                    var window_height = window.innerHeight,
                        window_top_position = document.documentElement.scrollTop || document.body.scrollTop,
                        window_bottom_position = window_top_position + window_height - 100;
                    animatedElements.forEach((function (el) {
                        var element = el,
                            element_height = element.offsetHeight,
                            element_top_position = getElementOffset(element),
                            element_bottom_position;
                        (element_top_position + element_height >= window_top_position && element_top_position - 50 <= window_bottom_position || elCarouselItem(el)) && el.classList.contains("hidden") && (el.classList.remove("hidden"), el.classList.add("animate__fadeInUp"), el.classList.add("animate__delay-1s"), el.addEventListener("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", (function () {
                            el.classList.remove("animate__animated animate__delay-1s animate__fadeInUp")
                        }), {
                            once: !0
                        }))
                    }))
                }(animatedElements = (animatedElements = animatedElements.filter((function (el) {
                    if (!el.parents().filter((function (parentElement) {
                            if (parentElement.matches("a, p, .navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop")) return !0
                        })).length) return !0
                }))).filter((function (el) {
                    if (!el.parents().filter((function (i) {
                            return i.matches("form") && !el.matches("li")
                        })).length) return !0
                }))).forEach((function (el) {
                    el.classList.add("hidden"), el.classList.add("animate__animated"), el.classList.add("animate__delay-1s")
                })), window.addEventListener("scroll", checkIfInView), window.addEventListener("resize", checkIfInView), window.dispatchEvent(new CustomEvent("scroll"))
            }
        }))), ready((function () {
            if (document.querySelectorAll(".mbr-arrow-up").length) {
                var scroller = document.querySelector("#scrollToTop");
                scroller.style.display = "none", window.addEventListener("scroll", (function () {
                    window.scrollY > window.innerHeight ? fadeIn(scroller) : fadeOut(scroller)
                })), scroller.addEventListener("click", (function () {
                    return window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    }), !1
                }))
            }
        })), !isBuilder) {
        var arrowDown = document.querySelector(".mbr-arrow");
        arrowDown && arrowDown.addEventListener("click", (function (e) {
            var next = e.target.closest("section").nextElementSibling;
            next.classList.contains("engine") && (next = next.closest("section").nextElementSibling), window.scrollTo(0, offset(next).top)
        }))
    }
    if (document.querySelectorAll("nav.navbar").length) {
        var navHeight = getHeight(document.querySelector("nav.navbar"));
        document.querySelector(".mbr-after-navbar.mbr-fullscreen") && (document.querySelector(".mbr-after-navbar.mbr-fullscreen").style.paddingTop = navHeight + "px")
    }

    function isIE() {
        var ua, msie;
        return !!(window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./))
    }
    if (!isBuilder && isIE() && $(document).on("add.cards", (function (event) {
            var eventTarget = event.target;
            if (eventTarget.classList.contains("mbr-fullscreen")) {
                var eventListener = function () {
                    eventTarget.style.height = "auto", eventTarget.offsetHeight <= window.innerHeight && (eventTarget.style.height = "1px")
                };
                window.addEventListener("load", eventListener), window.addEventListener("resize", eventListener)
            }(eventTarget.classList.contains("mbr-slider") || eventTarget.classList.contains("mbr-gallery")) && (eventTarget.querySelectorAll(".carousel-indicators").forEach((function (el) {
                el.classList.add("ie-fix"), el.querySelectorAll("li").forEach((function (x) {
                    x.style.display = "inline-block", x.style.width = "30px"
                }))
            })), eventTarget.classList.contains("mbr-slider") && eventTarget.querySelectorAll(".full-screen .slider-fullscreen-image").forEach((function (x) {
                x.style.height = "1px"
            })))
        })), ready((function () {
            if (!isBuilder) {
                var clickListener = function (event) {
                        modal(event.target)
                    },
                    modal = function (item) {
                        var videoIframe = item.parents("section")[0].querySelector("iframe"),
                            videoIframeSrc = videoIframe.getAttribute("src");
                        if (item.parents("section").forEach((function (el) {
                                el.style.zIndex = "5000"
                            })), -1 !== videoIframeSrc.indexOf("youtu") && videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*"), -1 !== videoIframeSrc.indexOf("vimeo")) {
                            var vimeoPlayer = new Vimeo.Player(videoIframe);
                            vimeoPlayer.play()
                        }
                        var section = item.parents("section")[0],
                            modalWindow = section.querySelector(section.querySelector("[data-modal]").getAttribute("data-modal"));
                        modalWindow.style.display = "table", modalWindow.addEventListener("click", (function () {
                            -1 !== videoIframeSrc.indexOf("youtu") && videoIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), -1 !== videoIframeSrc.indexOf("vimeo") && vimeoPlayer.pause(), modalWindow.style.display = "none", modalWindow.removeEventListener("click", clickListener), section.style.zIndex = "0"
                        }))
                    };
                document.querySelectorAll(".modalWindow-video > iframe").forEach((function (el) {
                    var videoURL = el.getAttribute("data-src");
                    el.removeAttribute("data-src");
                    var parsedUrl = videoURL.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/); - 1 !== videoURL.indexOf("youtu") ? el.setAttribute("src", "https://youtube.com/embed/" + parsedUrl[6] + "?rel=0&enablejsapi=1") : -1 !== videoURL.indexOf("vimeo") && el.setAttribute("src", "https://player.vimeo.com/video/" + parsedUrl[6] + "?autoplay=0&loop=0")
                })), document.querySelector("[data-modal]") && document.querySelector("[data-modal]").addEventListener("click", clickListener)
            }
        })), !isBuilder && !isMobile()) {
        var menu = document.querySelector("section.menu");
        if (menu) {
            var width = window.innerWidth,
                collapsed;
            menu.querySelector(".navbar").classList.contains("collapsed") || width > 991 && (menu.querySelectorAll("ul.navbar-nav li.dropdown").forEach((function (el) {
                el.addEventListener("mouseover", (function () {
                    el.classList.contains("open") && el.querySelectorAll.forEach((function (x) {
                        x.dispatchEvent(new CustomEvent("click"))
                    }))
                })), el.addEventListener("mouseout", (function () {
                    el.classList.contains("open") && el.querySelectorAll.forEach((function (x) {
                        x.dispatchEvent(new CustomEvent("click"))
                    }))
                }))
            })), menu.querySelectorAll("ul.navbar-nav li.dropdown .dropdown-menu .dropdown").forEach((function (el) {
                el.addEventListener("mouseover", (function () {
                    el.classList.contains("open") && el.querySelectorAll.forEach((function (x) {
                        x.dispatchEvent(new CustomEvent("click"))
                    }))
                })), el.addEventListener("mouseout", (function () {
                    el.classList.contains("open") && el.querySelectorAll.forEach((function (x) {
                        x.dispatchEvent(new CustomEvent("click"))
                    }))
                }))
            })))
        }
    }

    function setActiveCarouselItem(card) {
        var target = card.querySelector(".carousel-item"),
            firstIndicator = card.querySelector(".carousel-indicators > li");
        target.classList.add("active"), firstIndicator && firstIndicator.classList.add("active")
    }

    function initTestimonialsCarousel(card) {
        var target = card,
            carouselID = target.getAttribute("id") + "-carousel",
            bs5 = target.getAttribute("data-bs-version") && target.getAttribute("data-bs-version").startsWith("5");
        target.querySelectorAll(".carousel").forEach((function (el) {
            el.setAttribute("id", carouselID)
        })), target.querySelector(".carousel-controls") && target.querySelectorAll(".carousel-controls").forEach((function (el) {
            el.querySelectorAll("a").forEach((function (el) {
                el.setAttribute("href", "#" + carouselID), bs5 ? el.setAttribute("data-bs-target", "#" + carouselID) : el.setAttribute("data-target", "#" + carouselID)
            }))
        })), target.querySelectorAll(".carousel-indicators > li").forEach((function (el) {
            bs5 ? el.setAttribute("data-bs-target", "#" + carouselID) : el.setAttribute("data-target", "#" + carouselID)
        })), setActiveCarouselItem(target)
    }

    function initClientCarousel(card) {
        var target = card,
            countElems = target.querySelectorAll(".carousel-item").length,
            visibleSlides = target.querySelector(".carousel-inner").getAttribute("data-visible");
        countElems < visibleSlides && (visibleSlides = countElems), target.querySelectorAll(".carousel-inner").forEach((function (el) {
            el.setAttribute("class", "carousel-inner slides" + visibleSlides)
        })), target.querySelectorAll(".clonedCol").forEach((function (el) {
            el.remove()
        })), target.querySelectorAll(".carousel-item .col-md-12").forEach((function (el) {
            visibleSlides < 2 ? el.setAttribute("class", "col-md-12") : "5" == visibleSlides ? el.setAttribute("class", "col-md-12 col-lg-15") : el.setAttribute("class", "col-md-12 col-lg-" + 12 / visibleSlides)
        })), target.querySelectorAll(".carousel-item .row").forEach((function (el) {
            el.setAttribute("style", "-webkit-flex-grow: 1; flex-grow: 1; margin: 0;")
        })), target.querySelectorAll(".carousel-item").forEach((function (el) {
            for (var itemToClone = el, i = 1; i < visibleSlides; i++) {
                (itemToClone = itemToClone.nextElementSibling) || (itemToClone = el.parentNode.children[0] === el ? el.nextElementSibling : el.parentNode.children[0]);
                var index = getIndex(itemToClone),
                    clonedItem = itemToClone.querySelector(".col-md-12").cloneNode(!0);
                clonedItem.classList.add("cloneditem-" + i), clonedItem.classList.add("clonedCol"), clonedItem.setAttribute("data-cloned-index", index), el.children[0].appendChild(clonedItem)
            }
        }))
    }

    function clickPrev(event) {
        event.stopPropagation(), event.preventDefault()
    }
    if (isBuilder || (void 0 === window.initClientPlugin && 0 != document.body.querySelectorAll(".clients").length && (window.initClientPlugin = !0, document.body.querySelectorAll(".clients").forEach((function (el) {
            el.getAttribute("data-isinit") || (initTestimonialsCarousel(el), initClientCarousel(el))
        }))), void 0 === window.initPopupBtnPlugin && 0 != document.body.querySelectorAll("section.popup-btn-cards").length && (window.initPopupBtnPlugin = !0, document.querySelectorAll("section.popup-btn-cards .card-wrapper").forEach((function (el) {
            el.classList.add("popup-btn")
        }))), void 0 === window.initTestimonialsPlugin && 0 != document.body.querySelectorAll(".testimonials-slider").length && (window.initTestimonialsPlugin = !0, document.querySelectorAll(".testimonials-slider").forEach((function (el) {
            initTestimonialsCarousel(el)
        }))), void 0 === window.initSwitchArrowPlugin && (window.initSwitchArrowPlugin = !0, ready((function () {
            0 != document.querySelectorAll(".accordionStyles").length && document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach((function (el) {
                el.classList.contains("collapsed") || el.classList.add("collapsed")
            }))
        })), document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach((function (el) {
            el.addEventListener("click", (function () {
                var id = el.closest(".accordionStyles").getAttribute("id"),
                    iscollapsing = el.closest(".card").querySelector(".panel-collapse"),
                    sign = el.querySelector("span.sign") ? el.querySelector("span.sign") : el.querySelector("span.mbr-iconfont");
                if (iscollapsing.classList.contains("collapsing") && (-1 != id.indexOf("toggle") || -1 != id.indexOf("accordion")) && (el.classList.contains("collapsed") ? (sign.classList.remove("mbri-arrow-up"), sign.classList.add("mbri-arrow-down")) : (sign.classList.remove("mbri-arrow-down"), sign.classList.add("mbri-arrow-up")), -1 != id.indexOf("accordion"))) {
                    var accordion = el.closest(".accordionStyles");
                    Array.from(accordion.children).filter((function (el) {
                        return el.querySelector("span.sign") !== sign
                    })).forEach((function (el) {
                        var icon = el.querySelector("span.sign") ? el.querySelector("span.sign") : el.querySelector("span.mbr-iconfont");
                        icon.classList.remove("mbri-arrow-up"), icon.classList.add("mbri-arrow-down")
                    }))
                }
            }))
        }))), 0 != document.querySelectorAll(".mbr-slider.carousel").length && document.querySelectorAll(".mbr-slider.carousel").forEach((function (el) {
            var slider = el,
                controls = slider.querySelectorAll(".carousel-control"),
                indicators = slider.querySelectorAll(".carousel-indicators li"),
                slideEventHandler = function (event) {
                    clickPrev(event)
                };
            slider.addEventListener("slide.bs.carousel", (function () {
                controls.forEach((function (el) {
                    el.addEventListener("click", slideEventHandler)
                })), indicators.forEach((function (el) {
                    el.addEventListener("click", slideEventHandler)
                })), isJQuery && $(slider).carousel({
                    keyboard: !1
                })
            })), slider.addEventListener("slid.bs.carousel", (function () {
                controls.forEach((function (el) {
                    el.removeEventListener("click", slideEventHandler)
                })), indicators.forEach((function (el) {
                    el.removeEventListener("click", slideEventHandler)
                })), isJQuery && $(slider).carousel({
                    keyboard: !0
                }), slider.querySelectorAll(".carousel-item.active").length > 1 && (slider.querySelectorAll(".carousel-item.active")[1].classList.remove("active"), slider.querySelectorAll(".carousel-control li.active")[1].classList.remove("active"))
            }))
        }))), isBuilder) {
        if (!isJQuery) return;
        $(document).on("add.cards", (function (event) {
            if ($(event.target).find(".form-with-styler").length) {
                var form = $(event.target).find(".form-with-styler");
                $(form).find('select:not("[multiple]")').each((function () {
                    $(this).styler && $(this).styler()
                })), $(form).find("input[type=number]").each((function () {
                    $(this).styler && ($(this).styler(), $(this).parent().parent().removeClass("form-control"))
                })), $(form).find("input[type=date]").each((function () {
                    $(this).datetimepicker && $(this).datetimepicker({
                        format: "Y-m-d",
                        timepicker: !1
                    })
                })), $(form).find("input[type=time]").each((function () {
                    $(this).datetimepicker && $(this).datetimepicker({
                        format: "H:i",
                        datepicker: !1
                    })
                }))
            }
        }))
    }

    function setGradient(section) {
        var linearGradient = "",
            gradientElement = section.querySelector("svg linearGradient");
        if (gradientElement) {
            for (var colors = [], stops = Array.from(gradientElement.children), x = 0; x < stops.length; x++) colors.push(`"${stops[x].getAttribute("stop-color")}"`);
            linearGradient = '"lineargradient": [],', Array.from(section.querySelectorAll("svg")).some((function (el) {
                return el.classList.contains("svg-gradient")
            })) || section.querySelectorAll("svg").forEach((function (el) {
                el.classList.add("svg-gradient")
            }))
        }
        return linearGradient
    }

    function setProgressElement(el, cardID, percent) {
        var card = el.closest(".card"),
            rowClasses = card.parentElement.classList;
        card.getAttribute("style") || card.setAttribute("style", "-webkit-flex-basis: auto; flex-basis: auto;"), rowClasses.contains("row") && (rowClasses.remove("row"), rowClasses.add("media-container-row")), el.querySelectorAll(".svg-gradient > *").forEach((function (el) {
            el.setAttribute("id", cardID)
        }));
        var clonedEl = el.cloneNode(!0);
        Array.from(el.children).forEach((function (el) {
            if ("SVG" !== el.tagName) return el.remove()
        })), el.setAttribute("data-pie", `{ ${setGradient(el.closest("section"))} "percent": , "size": 150, "colorCircle": "#f1f1f1", "stroke": 5, "colorSlice": "url(#)", "fontSize": "1.3rem", "number": false }`), Array.from(clonedEl.children).forEach((function (clonedChild) {
            switch (!0) {
                case clonedChild.matches("p"):
                    clonedChild.innerText = percent + "%", el.appendChild(clonedChild);
                    break;
                case clonedChild.matches("svg"):
                    break;
                default:
                    el.appendChild(clonedChild)
            }
        }))
    }

    function initCircleProgress(card) {
        var section, cardID = card.closest("section").getAttribute("id") + "-svg-gradient",
            percent = +card.getAttribute("data-goal");
        setProgressElement(card, cardID, percent)
    }

    function updateCircleProgress(section, paramName) {
        if (section.classList.contains("circle-progress-section") && paramName.includes("progress") && "progressCount" != paramName)
            if (paramName.includes("Color")) section.querySelectorAll(".pie_progress").forEach((function (el) {
                var cardID = section.getAttribute("id") + "-svg-gradient",
                    percent = +el.getAttribute("data-goal");
                setProgressElement(el, cardID, percent)
            }));
            else {
                var cardID = section.getAttribute("id") + "-svg-gradient",
                    el = section.querySelector("." + paramName),
                    percent = +el.getAttribute("data-goal");
                setProgressElement(el, cardID, percent)
            }
    }
    document.querySelectorAll('input[type="range"]').forEach((function (el) {
        el.addEventListener("change", (function (e) {
            e.target.parents(".form-group").forEach((function (x) {
                x.querySelector(".value").innerHTML = e.target.value
            }))
        }))
    })), isBuilder ? $(document).on("add.cards changeParameter.cards", (function (event, paramName) {
        "undefined" != typeof CircularProgressBar && new CircularProgressBar("pie_progress"), paramName ? updateCircleProgress(event.target, paramName) : event.target.querySelectorAll(".pie_progress").length && event.target.querySelectorAll(".pie_progress").forEach((function (el) {
            initCircleProgress(el)
        }))
    })) : document.querySelectorAll(".pie_progress").length && ("undefined" != typeof CircularProgressBar && new CircularProgressBar("pie_progress"), document.querySelectorAll(".pie_progress").forEach((function (el) {
        initCircleProgress(el)
    })))
}();

$('a[href*="#"]')

  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {

    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
 
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {

          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1'); 
            $target.focus();
          };
        });
      }
    }
  });