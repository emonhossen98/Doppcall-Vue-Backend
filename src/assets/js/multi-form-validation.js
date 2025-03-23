! function (t) {
    t.fn.multiStepForm = function (e) {
        if (null === e || "object" != typeof e || t.isArray(e)) throw " : Called with Invalid argument";
        var i = this,
            n = i.find(".tab"),
            a = t(".contact-us-step").find(".step-btn");

        function o() {
            return n.index(n.filter(".current"))
        }
        return a.each((function (e, i) {
            t(i).on("click", (function (t) {}))
        })), i.navigateTo = function (e) {
            var s;
            return n.removeClass("current").eq(e).addClass("current"), n.removeClass("show").eq(e).addClass("show"), n.removeClass("active").eq(e).addClass("active"), i.find(".previous").toggle(e > 0), atTheEnd = e >= n.length - 1, i.find(".next").toggle(!atTheEnd), i.find(".submit").toggle(atTheEnd), s = o(), a.each((function (e, i) {
                e == s ? t(i).addClass("active-step") : t(i).removeClass("active-step")
            })), i
        }, i.find(".previous").click((function () {
            i.navigateTo(o() - 1)
        })), i.find(".next").click((function () {
            if ("validations" in e && "object" == typeof e.validations && !t.isArray(e.validations) && (!("noValidate" in e) || "boolean" == typeof e.noValidate && !e.noValidate)) return i.validate(e.validations), 1 == i.valid() && (i.navigateTo(o() + 1), !0);
            i.navigateTo(o() + 1)
        })), i.find(".submit").on("click", (function (t) {
            return void 0 !== e.beforeSubmit && "function" != typeof e.beforeSubmit && e.beforeSubmit(i, this), (void 0 === e.submit || "boolean" == typeof e.submit && e.submit) && i.submit(), i
        })), "number" == typeof e.defaultStep && i.navigateTo(e.defaultStep), i.noValidate = function () {}, i
    }
}(jQuery);