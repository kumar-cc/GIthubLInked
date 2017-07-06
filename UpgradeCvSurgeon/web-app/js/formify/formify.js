/*

 Formify 2.0 Package by Binary Slash (binaryslash.com)
 More info: www.binaryslash.com/formify/
 CodeCanyon: www.codecanyon.net/item/formify/8552608

 Compatible with:
 IE: 6+
 Firefox: 4+
 Safari: 4+
 Chrome: 14+
 Opera: 11.6+

 */
var formifyValidate = {
        email: /^[^\@\,]+\@[^\@\,]+\.[^\@\,]{2,}$/,
        url: /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/
    },
    formifyDefaults = {},
    formifyOnStart, formify = function() {};
! function() {
    var a = function(a, b, c) {
            return a.addEventListener ? (a.addEventListener(b, c, !1), !0) : a.attachEvent ? a.attachEvent("on" + b, c) : (b = "on" + b, "function" == typeof a[b] && (c = function(a, b) {
                return function() {
                    a.apply(this, arguments), b.apply(this, arguments)
                }
            }(a[b], c)), a[b] = c, !0)
        },
        b = function() {},
        c = function(a) {
            return {
                x: a.touches && a.touches[0] ? a.touches[0].clientX : a.clientX,
                y: a.touches && a.touches[0] ? a.touches[0].clientY : a.clientY
            }
        };
    ! function() {
        var d = {
                element: null,
                dragging: !1,
                startX: null,
                startY: null,
                disableMouse: !1,
                enableMouseTimeout: !1
            },
            e = function(a) {
                if (d.element && !d.dragging) {
                    var b = c(a),
                        e = b.x - d.startX,
                        f = b.y - d.startY,
                        g = Math.sqrt(e * e + f * f);
                    g > d.element.dragThreshold && (d.dragging = !0, d.element.dragStart(a))
                }
                d.element && d.dragging && d.element.dragStep(a, {
                    x: d.startX,
                    y: d.startY
                })
            },
            f = function(a) {
                d.element && d.dragging && (d.element.dragEnd(a), d.dragging = !1), d.element && (d.element.dragUp(a), d.element = null)
            };
        a(document, "touchmove", e), a(document, "mousemove", e), a(document, "touchend", f), a(document, "touchcancel", f), a(document, "mouseup", f), b = function(b, e) {
            var f = function() {},
                g = function(a) {
                    var e = c(a);
                    d.startX = e.x, d.startY = e.y, d.element = b, b.dragClick(a)
                };
            b.dragClick = e && e.onClick ? e.onClick : f, b.dragStart = e && e.onStart ? e.onStart : f, b.dragStep = e && e.onDrag ? e.onDrag : f, b.dragEnd = e && e.onEnd ? e.onEnd : f, b.dragUp = e && e.onUp ? e.onUp : f, b.dragElementUp = e && e.onElementUp ? e.onElementUp : f, b.dragThreshold = e && e.threshold ? e.threshold : 0, a(b, "touchstart", g), a(b, "mousedown", g);
            var h = function(a) {
                if (document.elementFromPoint) {
                    var c = a.changedTouches[0].clientX,
                        d = a.changedTouches[0].clientY,
                        e = document.elementFromPoint(c, d);
                    if (e === b) b.dragElementUp(a);
                    else
                        for (var f = e.parentNode; f;) {
                            if (f === b) {
                                b.dragElementUp(a);
                                break
                            }
                            f = f.parentNode
                        }
                } else b.dragElementUp(a)
            };
            a(b, "touchend", h), a(b, "touchcancel", h), a(b, "mouseup", function(a) {
                d.element && d.element === b && b.dragElementUp(a)
            })
        }
    }();
    var d = !1;
    a(document, "click", function() {
        d && (f(d, "hidden"), d = !1)
    });
    var e = function(a, b) {
            return a.className.match(new RegExp("(\\s+|^)" + b + "(\\s+|$)"))
        },
        f = function(a, b) {
            e(a, b) || (a.className += " " + b)
        },
        g = function(a, b) {
            if (e(a, b)) {
                var c = new RegExp("(\\s*|^)" + b);
                a.className = a.className.replace(c, "")
            }
        },
        h = function(e) {
            var k, l, i = {
                    type: "text",
                    appearance: "text",
                    state: "normal",
                    label: !1,
                    tip: !1,
                    errorTip: !1,
                    successTip: !1,
                    tipPosition: "default",
                    info: !1,
                    icon: !1,
                    iconPosition: "default",
                    validate: !1,
                    required: !1,
                    "required-info": !1,
                    "required-tip": "This field is required",
                    width: !1,
                    height: !1,
                    expand: !1,
                    mask: !1,
                    points: "5",
                    min: 0,
                    max: 1,
                    step: .1,
                    multiple: !1,
                    hideNumbers: !1,
                    uploadText: "File",
                    placeholder: "Select",
                    captcha: !1,
                    inputStyle: !1,
                    onlyError: !1,
                    value: "",
                    disabled: !1
                },
                j = {},
                m = function(a) {
                    var b = e[a] || e.getAttribute(a);
                    return "" === b && (b = !0), b
                };
            for (k in formifyDefaults) i[k] = formifyDefaults[k];
            for (k in i) l = m(k), l && (i[k] = l);
            for (k in i) j[k] = i[k];
            i.appearance = e.type && "select" !== e.tagName.toLowerCase() ? e.type : e.tagName.toLowerCase(), e.onChange || (e.onChange = function() {}),
                function() {
                    l = m("appearance"), l && (i.appearance = l)
                }(), e.required = !1;
            var t, u, n = document.createElement("div"),
                o = document.createElement("div"),
                p = document.createElement("div"),
                q = document.createElement("div"),
                r = document.createElement("div"),
                s = document.createElement("div");
            if (n.className = "input " + i.appearance + "Input", o.className = "inputLabel", p.className = "inputTip " + (i.tipPosition + "Tip"), q.className = "inputTip error " + (i.tipPosition + "Tip"), r.className = "inputTip success " + (i.tipPosition + "Tip"), s.className = "inputInfo", e.parentNode.insertBefore(n, e), i.label && (o.innerHTML = i.label, n.appendChild(o)), n.appendChild(e), "switch" === i.appearance) {
                var v = document.createElement("div"),
                    w = document.createElement("div"),
                    x = i.info,
                    y = i.errorTip,
                    z = !1;
                t = v, u = v, v.className = "switch" + (e.checked ? " checked" : ""), w.className = "switchButton", v.appendChild(w), n.appendChild(v), v.selectionStart = function() {
                    return !1
                }, e.setChecked = function(a, b, c) {
                    if (e.checked = a, e.checked ? (f(v, "checked"), f(n, "inputChecked")) : (g(v, "checked"), g(n, "inputChecked")), z && e.check(), b || e.onChange(), "radio" === i.type && !c)
                        for (var h, d = document.getElementsByTagName("input"), j = 0, k = d.length; k > j; ++j) h = d[j], h.setChecked && h !== e && h.setChecked(h.checked, !1, !0)
                }, e.check = function() {
                    var a = !1,
                        b = "";
                    return i.required && !e.checked && (a = !0, i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (b += i["required-info"])), a || (i.onlyError ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), a && (e.setState("error"), b && e.setInfo(b)), z = !0, !a
                }, a(e, "change", function() {
                    e.setChecked(e.checked)
                }), a(e, "keyup", function() {
                    window.setTimeout(function() {
                        e.setChecked(e.checked)
                    }, 10)
                }), a(e, "focus", function() {
                    f(v, "focus"), f(n, "inputFocus")
                }), a(e, "blur", function() {
                    g(v, "focus"), g(n, "inputFocus")
                });
                var A = !1;
                b(v, {
                    threshold: 20,
                    onClick: function(a) {
                        f(v, "active"), f(n, "inputActive"), a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation()
                    },
                    onStart: function() {
                        A = !0
                    },
                    onDrag: function(a, b) {
                        var d = c(a),
                            f = e.checked;
                        f === b.x - d.x < 0 || e.disabled || (e.setChecked(b.x - d.x < 0), f = e.checked)
                    },
                    onUp: function() {
                        g(v, "active"), g(n, "inputActive")
                    },
                    onElementUp: function() {
                        A || e.disabled || e.setChecked(!e.checked)
                    },
                    onEnd: function() {
                        A = !1
                    }
                })
            }
            if ("checkbox" === i.appearance || "radio" === i.appearance || "iconbox" === i.appearance) {
                var v = document.createElement("div"),
                    w = document.createElement("div"),
                    x = i.info,
                    y = i.errorTip,
                    z = !1;
                v.className = i.appearance + (e.checked ? " checked" : ""), w.className = i.appearance + "Button", v.appendChild(w), t = v, u = v, n.appendChild(v), "iconbox" === i.appearance && (v.innerHTML = '<i class="' + i.icon + '"></i>'), v.selectionStart = function() {
                    return !1
                }, e.setChecked = function(a, b, c) {
                    if (e.checked = a, e.checked ? (f(v, "checked"), f(n, "inputChecked")) : (g(v, "checked"), g(n, "inputChecked")), z && e.check(), b || e.onChange(), "radio" === i.type && !c)
                        for (var h, d = document.getElementsByTagName("input"), j = 0, k = d.length; k > j; ++j) h = d[j], h.setChecked && h !== e && h.setChecked(h.checked, !1, !0)
                }, e.check = function() {
                    var a = !1,
                        b = "";
                    return i.required && !e.checked && (a = !0, i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (b += i["required-info"])), a || (i.onlyError ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), a && (e.setState("error"), b && e.setInfo(b)), z = !0, !a
                }, a(e, "change", function() {
                    e.setChecked(e.checked)
                }), a(e, "keyup", function() {
                    window.setTimeout(function() {
                        e.setChecked(e.checked)
                    }, 10)
                }), a(e, "focus", function() {
                    f(v, "focus"), f(n, "inputFocus")
                }), a(e, "blur", function() {
                    g(v, "focus"), g(n, "inputFocus")
                }), b(v, {
                    onClick: function(a) {
                        f(v, "active"), f(n, "inputActive"), a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation()
                    },
                    onUp: function() {
                        g(v, "active"), g(n, "inputActive")
                    },
                    onElementUp: function() {
                        e.disabled || e.setChecked(!e.checked)
                    }
                })
            }
            if ("text" === i.appearance || "textarea" === i.appearance || "bigtext" === i.appearance) {
                var B = document.createElement("div");
                if (B.className = i.appearance + (i.captcha ? " captcha" : ""), t = B, u = B, B.appendChild(e), n.appendChild(B), "textarea" === i.appearance && i.height && (u.style.height = i.height), i.icon) {
                    var C = document.createElement("div");
                    C.className = "inputIcon", C.innerHTML = '<i class="' + i.icon + '"></i>', f(n, i.iconPosition + "Icon"), B.appendChild(C)
                }
                if (a(e, "focus", function() {
                    f(B, "focus"), f(n, "inputFocus"), "textarea" === i.appearance && i.expand && (u.style.height = i.expand)
                }), a(e, "blur", function() {
                    g(B, "focus"), g(n, "inputFocus"), "textarea" === i.appearance && i.expand && (u.style.height = i.height ? i.height : "")
                }), i.mask)
                    if ("undefined" != typeof $ && $.mask) {
                        var G, H, I, D = i.mask.split(""),
                            E = m("mask-placeholder"),
                            F = {};
                        for (G = 0, H = D.length; H > G; ++G) I = m("mask-" + D[G]), I && ($.mask.definitions[D[G]] = I);
                        E && (F.placeholder = E), $(e).mask(i.mask, F)
                    } else "undefined" != typeof console && console && console.warn("Load jQuery and Masked Input Plugin to use mask.");
                if (i.validate) {
                    var O, P, Q, R, S, J = i.validate.length > 0 ? i.validate : "",
                        K = J.replace(/\s*\,\s*/gim, ",").split(","),
                        L = {},
                        M = {},
                        N = {},
                        y = i.errorTip,
                        x = i.info,
                        T = !0;
                    "" === K[0] && (K = []);
                    for (var G = 0, H = K.length; H > G; ++G) O = K[G], P = m("validate-" + O), M[O] = m("validate-" + O + "-info"), N[O] = m("validate-" + O + "-tip"), P ? (Q = P.match(/\/.*\//i), Q && (Q = Q[0].replace(/^\/|\/$/gi, ""), R = P.match(/[a-z]*$/i)[0], L[O] = new RegExp(Q, R))) : L[O] = /((more\-than\-)|(less\-than\-))[0-9]+/.test(O) ? /(more\-than\-)[0-9]+/.test(O) ? new RegExp("^[\\s\\S]{" + O.match(/[0-9]+$/)[0] + ",}") : new RegExp("^[\\s\\S]{0," + O.match(/[0-9]+$/)[0] + "}") : formifyValidate[O];
                    var S = function(a) {
                        var b, c = !1,
                            d = 0,
                            f = "";
                        for (b in L) L[b].test(a) || (N[b] && e.setErrorTip(N[b]), M[b] && (f += (d > 0 ? "<br/>" : "") + M[b], d++), c = !0);
                        return i.required && "" === a && (i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (f += (d > 0 ? "<br/>" : "") + i["required-info"]), c = !0), c || (i.onlyError ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), c && (e.setState("error"), f && e.setInfo(f)), !c
                    };
                    "error" === i.state && (T = !1), a(e, "input", function() {
                        T || S(e.value)
                    }), a(e, "keyup", function() {
                        T || S(e.value)
                    }), a(e, "change", function() {
                        T && (S(e.value), T = !1)
                    }), e.check = function() {
                        return T = !1, S(e.value)
                    }
                } else if (i.captcha) {
                    var x = i.info,
                        y = i.errorTip,
                        z = !1,
                        U = new Image;
                    U.src = i.captcha, U.className = "captcha", a(U, "click", function() {
                        U.src = i.captcha
                    }), e.isCaptcha = !0, e.reset = function() {
                        e.setValue ? e.setValue(i.value) : e.value = i.value, U.src = i.captcha, j.disabled ? e.setState("disabled") : e.setState(j.state), e.setTip(j.tip), e.setErrorTip(j.errorTip), e.setSuccessTip(j.successTip), e.setInfo(j.info)
                    }, e.check = function(a) {
                        var c, b = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
                        if (window.ActiveXObject)
                            for (var d = 0; d < b.length; d++) try {
                                c = new ActiveXObject(b[d])
                            } catch (f) {} else {
                            if (!window.XMLHttpRequest) return !1;
                            c = new XMLHttpRequest
                        }
                        c.onreadystatechange = function() {
                            4 == c.readyState && (200 == c.status ? "success" == c.responseText ? (i.onlyError ? e.setState("normal") : e.setState("success"), a()) : (e.setState("error"), e.value = "", U.src = i.captcha) : e.value = "Error")
                        };
                        var g = "captcha=" + e.value;
                        c.open("POST", i.captcha, !0), c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), c.send(g)
                    }, B.appendChild(U)
                } else {
                    var x = i.info,
                        y = i.errorTip,
                        z = !1;
                    e.check = function() {
                        var a = !1,
                            b = "";
                        return i.required && "" === e.value && (a = !0, i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (b += i["required-info"])), a || (i.onlyError ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), a && (e.setState("error"), b && e.setInfo(b)), z = !0, !a
                    }, a(e, "input", function() {
                        z && e.check()
                    }), a(e, "keyup", function() {
                        z && e.check()
                    })
                }
                a(e, "change", function() {
                    e.onChange && e.onChange()
                })
            }
            if ("file" === i.appearance) {
                var V = document.createElement("div"),
                    W = document.createElement("div"),
                    X = document.createElement("div"),
                    z = !1,
                    x = i.info,
                    y = i.errorTip,
                    z = !1;
                V.appendChild(W), V.appendChild(X), X.innerHTML = i.uploadText, t = V, u = V, V.className = "file", W.className = "fileText", X.className = "fileButton", n.appendChild(V), b(V, {
                    onElementUp: function(a) {
                        e.disabled || e.click(), a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation()
                    }
                }), e.check = function() {
                    var a = !1,
                        b = "";
                    return i.required && "" === e.value && (a = !0, i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (b += i["required-info"])), a || (i.setErrorTip ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), a && (e.setState("error"), b && e.setInfo(b)), z = !0, !a
                }, a(e, "change", function() {
                    var a = e.value.match(/[^\/\\]+/gim);
                    W.innerHTML = a ? a.pop() : "", z && e.check(), e.onChange()
                })
            }
            if ("rate" === i.appearance) {
                var Y = document.createElement("div"),
                    Z = [],
                    _ = 1 * i.points,
                    ab = !1,
                    x = i.info,
                    y = i.errorTip,
                    z = !1;
                t = Y, u = Y, Y.className = "rate";
                for (var G = 0; _ > G; ++G) ! function() {
                    var c = document.createElement("span"),
                        d = G + 1;
                    c.className = i.icon, a(c, "mouseenter", function() {
                        for (var a = 0; d > a; ++a) f(Z[a], "active")
                    }), a(c, "mouseleave", function() {
                        for (var a = 0; _ > a; ++a) g(Z[a], "active")
                    }), b(c, {
                        onClick: function() {
                            e.disabled || e.setValue(d)
                        }
                    }), Z.push(c), Y.appendChild(c)
                }();
                e.setValue = function(a, b) {
                    a = parseInt(a), e.value = a;
                    for (var c = 0; _ > c; ++c) g(Z[c], "checked");
                    for (var c = 0; a > c; ++c) f(Z[c], "checked");
                    b || (ab = !0), z && e.check(), !b && e.onChange && e.onChange()
                }, e.check = function() {
                    var a = !1,
                        b = "";
                    return i.required && !ab && (a = !0, i["required-tip"] && e.setErrorTip(i["required-tip"]), i["required-info"] && (b += i["required-info"])), a || (i.onlyError ? e.setState("normal") : e.setState("success"), e.setInfo(x), e.setErrorTip(y)), a && (e.setState("error"), e.setInfo(b)), z = !0, !a
                }, e.value && e.setValue(1 * e.value, !0), n.appendChild(Y)
            }
            if ("range" === i.appearance) {
                var kb, lb, bb = document.createElement("div"),
                    cb = document.createElement("div"),
                    db = document.createElement("div"),
                    eb = document.createElement("div"),
                    fb = document.createElement("div"),
                    gb = document.createElement("div"),
                    hb = document.createElement("div"),
                    ib = document.createElement("div"),
                    jb = document.createElement("div"),
                    mb = 1 * i.min,
                    nb = 1 * i.max,
                    ob = 1 * i.step,
                    pb = 0,
                    qb = 0;
                t = bb, u = bb, bb.className = "range" + (i.hideNumbers ? " hiddenNumbers" : ""), cb.className = "rangeLine", db.className = "rangeFill", eb.className = "rangeButton", fb.className = "rangeButton", gb.className = "rangeText", hb.className = "rangeText", ib.className = "rangeMin", jb.className = "rangeMax", ib.innerHTML = mb, jb.innerHTML = nb;
                var rb = function(a, b) {
                    return b ? "min" === b ? Math.round(1e10 * Math.ceil(a / ob) * ob) / 1e10 : Math.round(1e10 * Math.floor(a / ob) * ob) / 1e10 : Math.round(1e10 * Math.round(a / ob) * ob) / 1e10
                };
                e.setValue = function(a, b, c, d) {
                    var f = cb.offsetWidth,
                        g = eb.offsetWidth,
                        h = g / 2,
                        j = f - g;
                    if (i.multiple) {
                        a = rb(a), b = rb(b), mb > a && (a = rb(mb, "min")), a > nb && (a = rb(nb, "max")), a > b && 1 === c && (a = b), mb > b && (b = rb(mb, "min")), b > nb && (b = rb(nb, "max")), a > b && 2 === c && (b = a);
                        var k = (a - mb) / (nb - mb),
                            l = (b - mb) / (nb - mb);
                        pb = j * k + h, qb = j * l + h, db.style.width = qb - pb + "px", db.style.marginLeft = pb + "px", gb.innerHTML = "<span>" + a + "</span>", hb.innerHTML = "<span>" + b + "</span>", eb.style.left = gb.style.left = pb + "px", fb.style.left = hb.style.left = qb + "px", Math.abs(pb - qb) < 40 ? (hb.style.display = "none", gb.innerHTML = "<span>" + a + " - " + b + "</span>", gb.style.left = (pb + qb) / 2 + "px") : hb.style.display = "", kb = a, lb = b, e.value = a + "," + b
                    } else {
                        a = rb(a), mb > a && (a = rb(mb, "min")), a > nb && (a = rb(nb, "max"));
                        var k = (a - mb) / (nb - mb);
                        pb = j * k + h, gb.innerHTML = "<span>" + a + "</span>", db.style.width = pb + "px", eb.style.left = gb.style.left = j * k + h + "px", kb = a, e.value = a
                    }
                    d || e.onChange()
                },
                    function() {
                        var a, d, h, j, k, l;
                        b(eb, {
                            onClick: function(b) {
                                a = cb.offsetWidth, d = eb.offsetWidth, h = d / 2, j = a - d, l = pb, k = c(b).x, i.multiple && cb.insertBefore(fb, eb, 1), f(eb, "active"), f(bb, "active"), b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation()
                            },
                            onDrag: function(a) {
                                var b = c(a).x;
                                pb = b - k + l;
                                var d = (pb - h) / j,
                                    f = (nb - mb) * d + mb;
                                e.disabled || e.setValue(f, lb, 1)
                            },
                            onUp: function() {
                                g(eb, "active"), g(bb, "active")
                            }
                        }), b(fb, {
                            onClick: function(b) {
                                a = cb.offsetWidth, d = eb.offsetWidth, h = d / 2, j = a - d, l = qb, k = c(b).x, cb.insertBefore(eb, fb, 2), f(fb, "active"), f(bb, "active"), b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation()
                            },
                            onDrag: function(a) {
                                var b = c(a).x;
                                qb = b - k + l;
                                var d = (qb - h) / j,
                                    f = (nb - mb) * d + mb;
                                e.disabled || e.setValue(kb, f, 2)
                            },
                            onUp: function() {
                                g(fb, "active"), g(bb, "active")
                            }
                        })
                    }(), window.setTimeout(function() {
                    if (i.multiple) {
                        var a = e.value.split(","),
                            b = a[0] ? a[0] : mb,
                            c = a[1] ? a[1] : nb;
                        e.setValue(b, c, 1, !0)
                    } else e.setValue(e.value, 0, 1, !0)
                }, 1), a(window, "resize", function() {
                    if (i.multiple) {
                        var a = e.value.split(","),
                            b = a[0] ? a[0] : mb,
                            c = a[1] ? a[1] : nb;
                        e.setValue(b, c, 1, !0)
                    } else e.setValue(e.value, 0, 1, !0)
                }), cb.appendChild(db), cb.appendChild(eb), i.multiple && cb.appendChild(fb), cb.appendChild(gb), i.multiple && cb.appendChild(hb), bb.appendChild(cb), i.hideNumbers || (bb.appendChild(ib), bb.appendChild(jb)), n.appendChild(bb)
            }
            if ("select" === i.appearance) {
                var sb = document.createElement("div"),
                    tb = document.createElement("div"),
                    ub = document.createElement("div"),
                    vb = document.createElement("icon");
                t = sb, u = sb, sb.appendChild(ub), sb.appendChild(tb), n.appendChild(sb), ub.innerHTML = i.placeholder, i.icon && (vb.innerHTML = '<i class="' + i.icon + '"></i>', f(n, i.iconPosition + "Icon"), sb.appendChild(vb)), sb.className = "select" + (i.multiple ? " multiple" : " single"), tb.className = "selectList" + (i.multiple ? "" : " hidden"), ub.className = "selectText", vb.className = "inputIcon", "undefined" != typeof $ && $.fn.perfectScrollbar && (tb.style.overflow = "hidden", $(tb).perfectScrollbar(), a(tb, "mouseenter", function() {
                    $(tb).perfectScrollbar("update")
                })), i.multiple || (a(ub, "click", function(a) {
                    e.disabled || (d && f(d, "hidden"), d !== tb ? (g(tb, "hidden"), d = tb) : (f(tb, "hidden"), d = !1), a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault())
                }), a(tb, "click", function(a) {
                    a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault()
                }));
                for (var xb, wb = e.children, yb = [], z = !1, zb = !1, Ab = function(b, c) {
                    var j = document.createElement("div");
                    if (j.className = "selectItem" + (c ? " ingroup" : ""), yb.push(j), j.appendChild(document.createTextNode(b.innerHTML)), i.multiple) {
                        var k = document.createElement("input");
                        k.type = "checkbox", k.appearance = "radio", k.checked = b.selected, k.disabled = b.disabled, j.appendChild(k), h(k), k.check = !1, b.disabled && f(j, "disabled"), b.selected && f(j, "checked"), k.onChange = function() {
                            b.selected = k.checked, b.selected ? f(j, "checked") : g(j, "checked"), z && e.check()
                        }, a(k, "focus", function() {
                            f(j, "focus");
                            for (var a = 0, b = 0, c = yb.length; c > b && yb[b] !== j; ++b) a += yb[b].offsetHeight;
                            tb.scrollTop = a
                        }), a(k, "blur", function() {
                            g(j, "focus")
                        })
                    } else b.selected && (ub.innerHTML = b.innerHTML), b.disabled ? f(j, "disabled") : a(j, "click", function() {
                        b.selected = !0, ub.innerHTML = b.innerHTML, f(tb, "hidden"), d = !1, zb = !0, z && e.check()
                    });
                    tb.appendChild(j)
                }, G = 0, H = wb.length; H > G; ++G)
                    if (xb = wb[G], "option" === xb.tagName.toLowerCase()) Ab(xb);
                    else if ("optgroup" === xb.tagName.toLowerCase()) {
                        var Bb = document.createElement("div"),
                            Cb = xb.label || xb.getAttribute("label") || "";
                        Bb.innerHTML = Cb, Bb.className = "selectHeader", tb.appendChild(Bb);
                        for (var Db = xb.getElementsByTagName("option"), k = 0, Eb = Db.length; Eb > k; ++k) Ab(Db[k], !0)
                    }
                e.check = function() {
                    for (var a = e.getElementsByTagName("option"), b = 0, c = !1, d = 0, f = a.length; f > d; ++d) a[d].selected && b++;
                    return i.multiple && (i.max && 1 * i.max < b && (c = !0), i.min && 1 * i.min > b && (c = !0)), i.required && !zb && (c = !0), c ? e.setState("error") : i.onlyError ? e.setState("normal") : e.setState("success"), z = !0, !c
                }
            }
            e.style && (n.style.cssText = e.style.cssText), e.style.cssText = "", u || (u = e), i.inputStyle && (u.style.cssText = i.inputStyle), i.width && (u.style.width = i.width), i.height && (u.style.height = i.height), e.reset || (e.reset = function() {
                e.setValue ? e.setValue(j.value) : e.value = j.value, j.disabled ? e.setState("disabled") : e.setState(j.state), e.setTip(j.tip), e.setErrorTip(j.errorTip), e.setSuccessTip(j.successTip), e.setInfo(j.info)
            }), n.appendChild(s), n.appendChild(p), n.appendChild(r), n.appendChild(q), e.setState = function(a) {
                switch (g(n, i.state), t && g(t, i.state), i.state = a, f(n, i.state), t && f(t, i.state), e.disabled = "disabled" === a ? !0 : !1, f(p, "hidden"), f(q, "hidden"), f(r, "hidden"), a) {
                    case "normal":
                        i.tip && g(p, "hidden");
                        break;
                    case "error":
                        i.errorTip && g(q, "hidden");
                        break;
                    case "success":
                        i.successTip && g(r, "hidden")
                }
                return e
            }, e.getState = function() {
                return i.state
            }, e.setTip = function(a) {
                return i.tip = a, i.tip && (p.innerHTML = a), "normal" === i.state && i.tip ? g(p, "hidden") : f(p, "hidden"), e
            }, e.setErrorTip = function(a) {
                return i.errorTip = a, i.errorTip && (q.innerHTML = a), "error" === i.state && i.errorTip ? g(q, "hidden") : f(q, "hidden"), e
            }, e.setSuccessTip = function(a) {
                return i.successTip = a, i.successTip && (r.innerHTML = a), "success" === i.state && i.successTip ? g(r, "hidden") : f(r, "hidden"), e
            }, e.setInfo = function(a) {
                return i.info = a, i.info ? (g(s, "hidden"), s.innerHTML = a) : f(s, "hidden"), e
            }, e.disabled ? e.setState("disabled") : e.setState(i.state), e.setTip(i.tip), e.setErrorTip(i.errorTip), e.setSuccessTip(i.successTip), e.setInfo(i.info)
        },
        i = function(a) {
            a.onsubmit = function() {
                return a.check(function() {
                    a.submit()
                }), !1
            }, a.reset = function() {
                for (var c, b = [a.getElementsByTagName("input"), a.getElementsByClassName("textarea-f"), a.getElementsByClassName("select-f")], d = 0; 3 > d; ++d)
                    for (var e = 0, f = b[d].length; f > e; ++e) c = b[d][e], c.reset && c.reset()
            }, a.check = function(b) {
                var g, h, c = a.getElementsByTagName("input"),
                    d = a.getElementsByClassName("textarea-f"),
                    e = a.getElementsByClassName("select-f"),
                    f = [],
                    i = !1;
                for (g = 0, h = c.length; h > g; ++g)
                    if (c[g].isCaptcha) f.push(c[g]);
                    else {
                        var j = c[g].check && !c[g].disabled ? c[g].check() : !0;
                        j || (i = !0)
                    }
                for (g = 0, h = d.length; h > g; ++g) {
                    var j = d[g].check && !d[g].disabled ? d[g].check() : !0;
                    j || (i = !0)
                }
                for (g = 0, h = e.length; h > g; ++g) {
                    var j = e[g].check && !e[g].disabled ? e[g].check() : !0;
                    j || (i = !0)
                }
                var k = 0;
                if (!i && f.length > 0)
                    for (g = 0, h = f.length; h > g; ++g) f[g].check(function() {
                        k++, k === f.length && b()
                    });
                else i || b()
            }
        };
    formify = function(a) {
        a || (a = document);
        var b = a.tagName ? a.tagName.toLowerCase() : "";
        if ("input" === b || "textarea" === b) h(a);
        else if ("form" === b) i(a);
        else {
            var g, j, c = a.getElementsByClassName("input-f"),
                d = a.getElementsByClassName("form-f"),
                e = a.getElementsByClassName("textarea-f"),
                f = a.getElementsByClassName("select-f");
            for (g = 0, j = c.length; j > g; ++g) c[g].formified || h(c[g]), c[g].formified = !0;
            for (g = 0, j = e.length; j > g; ++g) e[g].formified || h(e[g]), e[g].formified = !0;
            for (g = 0, j = f.length; j > g; ++g) f[g].formified || h(f[g]), f[g].formified = !0;
            for (g = 0, j = d.length; j > g; ++g) d[g].formified || i(d[g]), d[g].formified = !0
        }
    }
}();