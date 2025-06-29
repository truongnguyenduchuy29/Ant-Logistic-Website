function floatToString(e, t) {
    var r = e.toFixed(t).toString();
    return r.match(/^\.\d+/) ? "0" + r : r
}

function attributeToString(e) {
    return "string" != typeof e && ("undefined" === (e += "") && (e = "")), jQuery.trim(e)
}
"undefined" == typeof Bizweb && (Bizweb = {}), Bizweb.mediaDomainName = "//bizweb.dktcdn.net/", Bizweb.money_format = "${{amount}}", Bizweb.onError = function(XMLHttpRequest, textStatus) {
    var data = eval("(" + XMLHttpRequest.responseText + ")");
    alert(data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + Bizweb.fullMessagesFromErrors(data).join("; ") + ".")
}, Bizweb.fullMessagesFromErrors = function(e) {
    var t = [];
    return jQuery.each(e, function(e, r) {
        jQuery.each(r, function(r, a) {
            t.push(e + " " + a)
        })
    }), t
}, Bizweb.onCartUpdate = function(e) {
    alert("There are now " + e.item_count + " items in the cart.")
}, Bizweb.onCartShippingRatesUpdate = function(e, t) {
    var r = "";
    t.zip && (r += t.zip + ", "), t.province && (r += t.province + ", "), r += t.country, alert("There are " + e.length + " shipping rates available for " + r + ", starting at " + Bizweb.formatMoney(e[0].price) + ".")
}, Bizweb.onItemAdded = function(e) {
    alert(e.title + " was added to your shopping cart.")
}, Bizweb.onProduct = function(e) {
    alert("Received everything we ever wanted to know about " + e.title)
}, Bizweb.formatMoney = function(e, t) {
    function r(e, t) {
        return void 0 === e ? t : e
    }

    function a(e, t, a, n) {
        if (t = r(t, 2), a = r(a, ","), n = r(n, "."), isNaN(e) || null == e) return 0;
        var i = (e = e.toFixed(t)).split(".");
        return i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (t = i[1] ? n + i[1] : "")
    }
    "string" == typeof e && (e = (e = e.replace(".", "")).replace(",", ""));
    var n = "",
        i = /\{\{\s*(\w+)\s*\}\}/;
    switch ((t = t || this.money_format).match(i)[1]) {
        case "amount":
            n = a(e, 2);
            break;
        case "amount_no_decimals":
            n = a(e, 0);
            break;
        case "amount_with_comma_separator":
            n = a(e, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            n = a(e, 0, ".", ",")
    }
    return t.replace(i, n)
}, Bizweb.resizeImage = function(e, t) {
    try {
        if ("original" == t) return e;
        var r = Bizweb.mediaDomainName + "thumb/" + t + "/";
        return e.replace(Bizweb.mediaDomainName, r).split("?")[0]
    } catch (t) {
        return e
    }
}, Bizweb.addItem = function(e, t, r) {
    var a = {
        type: "POST",
        url: "/cart/add.js",
        data: "quantity=" + (t = t || 1) + "&VariantId=" + e,
        dataType: "json",
        success: function(e) {
            "function" == typeof r ? r(e) : Bizweb.onItemAdded(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(a)
}, Bizweb.addItemFromForm = function(e, t) {
    var r = {
        type: "POST",
        url: "/cart/add.js",
        data: jQuery("#" + e).serialize(),
        dataType: "json",
        success: function(e) {
            "function" == typeof t ? t(e) : Bizweb.onItemAdded(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(r)
}, Bizweb.getCart = function(e) {
    jQuery.getJSON("/cart.js", function(t) {
        "function" == typeof e ? e(t) : Bizweb.onCartUpdate(t)
    })
}, Bizweb.pollForCartShippingRatesForDestination = function(e, t, r) {
    r = r || Bizweb.onError;
    var a = function() {
        jQuery.ajax("/cart/async_shipping_rates", {
            dataType: "json",
            success: function(r, n, i) {
                200 === i.status ? "function" == typeof t ? t(r.shipping_rates, e) : Bizweb.onCartShippingRatesUpdate(r.shipping_rates, e) : setTimeout(a, 500)
            },
            error: r
        })
    };
    return a
}, Bizweb.getCartShippingRatesForDestination = function(e, t, r) {
    r = r || Bizweb.onError;
    var a = {
        type: "POST",
        url: "/cart/prepare_shipping_rates",
        data: Bizweb.param({
            shipping_address: e
        }),
        success: Bizweb.pollForCartShippingRatesForDestination(e, t, r),
        error: r
    };
    jQuery.ajax(a)
}, Bizweb.getProduct = function(e, t) {
    jQuery.getJSON("/products/" + e + ".js", function(e) {
        "function" == typeof t ? t(e) : Bizweb.onProduct(e)
    })
}, Bizweb.changeItem = function(e, t, r) {
    var a = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=" + t + "&variantId=" + e,
        dataType: "json",
        success: function(e) {
            "function" == typeof r ? r(e) : Bizweb.onCartUpdate(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(a)
}, Bizweb.removeItem = function(e, t) {
    var r = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&variantId=" + e,
        dataType: "json",
        success: function(e) {
            "function" == typeof t ? t(e) : Bizweb.onCartUpdate(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(r)
}, Bizweb.clear = function(e) {
    var t = {
        type: "POST",
        url: "/cart/clear.js",
        data: "",
        dataType: "json",
        success: function(t) {
            "function" == typeof e ? e(t) : Bizweb.onCartUpdate(t)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(t)
}, Bizweb.updateCartFromForm = function(e, t) {
    var r = {
        type: "POST",
        url: "/cart/update.js",
        data: jQuery("#" + e).serialize(),
        dataType: "json",
        success: function(e) {
            "function" == typeof t ? t(e) : Bizweb.onCartUpdate(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(r)
}, Bizweb.updateCartAttributes = function(e, t) {
    var r = "";
    jQuery.isArray(e) ? jQuery.each(e, function(e, t) {
        var a = attributeToString(t.key);
        "" !== a && (r += "attributes[" + a + "]=" + attributeToString(t.value) + "&")
    }) : "object" == typeof e && null !== e && jQuery.each(e, function(e, t) {
        r += "attributes[" + attributeToString(e) + "]=" + attributeToString(t) + "&"
    });
    var a = {
        type: "POST",
        url: "/cart/update.js",
        data: r,
        dataType: "json",
        success: function(e) {
            "function" == typeof t ? t(e) : Bizweb.onCartUpdate(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(a)
}, Bizweb.updateCartNote = function(e, t) {
    var r = {
        type: "POST",
        url: "/cart/update.js",
        data: "note=" + attributeToString(e),
        dataType: "json",
        success: function(e) {
            "function" == typeof t ? t(e) : Bizweb.onCartUpdate(e)
        },
        error: function(e, t) {
            Bizweb.onError(e, t)
        }
    };
    jQuery.ajax(r)
}, jQuery.fn.jquery >= "1.4" ? Bizweb.param = jQuery.param : (Bizweb.param = function(e) {
    var t = [],
        r = function(e, r) {
            r = jQuery.isFunction(r) ? r() : r, t[t.length] = encodeURIComponent(e) + "=" + encodeURIComponent(r)
        };
    if (jQuery.isArray(e) || e.jquery) jQuery.each(e, function() {
        r(this.name, this.value)
    });
    else
        for (var a in e) Bizweb.buildParams(a, e[a], r);
    return t.join("&").replace(/%20/g, "+")
}, Bizweb.buildParams = function(e, t, r) {
    jQuery.isArray(t) && t.length ? jQuery.each(t, function(t, a) {
        rbracket.test(e) ? r(e, a) : Bizweb.buildParams(e + "[" + ("object" == typeof a || jQuery.isArray(a) ? t : "") + "]", a, r)
    }) : null != t && "object" == typeof t ? Bizweb.isEmptyObject(t) ? r(e, "") : jQuery.each(t, function(t, a) {
        Bizweb.buildParams(e + "[" + t + "]", a, r)
    }) : r(e, t)
}, Bizweb.isEmptyObject = function(e) {
    for (var t in e) return !1;
    return !0
});