// fba9dc2
var a;
if (!Array.prototype.map)Array.prototype.map = function (b, c) {
    for (var d = this.length, f = new Array(d), g = 0; g < d; g++)if (g in this)f[g] = b.call(c, this[g], g, this);
    return f
};
if (!Array.prototype.filter)Array.prototype.filter = function (b, c) {
    for (var d = this.length, f = [], g = 0; g < d; g++)if (g in this) {
        var h = this[g];
        b.call(c, h, g, this) && f.push(h)
    }
    return f
};
if (!Array.prototype.forEach)Array.prototype.forEach = function (b, c) {
    for (var d = this.length >>> 0, f = 0; f < d; f++)f in this && b.call(c, this[f], f, this)
};
if (!Array.prototype.reduce)Array.prototype.reduce = function (b, c) {
    var d = this.length;
    if (!d && arguments.length == 1)throw new Error("reduce: empty array, no initial value");
    var f = 0;
    if (arguments.length < 2)for (; ;) {
        if (f in this) {
            c = this[f++];
            break
        }
        if (++f >= d)throw new Error("reduce: no values, no initial value");
    }
    for (; f < d; f++)if (f in this)c = b(c, this[f], f, this);
    return c
};
var pv = {};
pv.version = {major: 3, minor: 2};
pv.identity = function (b) {
    return b
};
pv.index = function () {
    return this.index
};
pv.child = function () {
    return this.childIndex
};
pv.parent = function () {
    return this.parent.index
};
pv.extend = function (b) {
    function c() {
    }

    c.prototype = b.prototype || b;
    return new c
};
try {
    eval("pv.parse = function(x) x;")
} catch (e) {
    pv.parse = function (b) {
        for (var c = new RegExp("function\\s*(\\b\\w+)?\\s*\\([^)]*\\)\\s*", "mg"), d, f, g = 0, h = ""; d = c.exec(b);) {
            d = d.index + d[0].length;
            if (b.charAt(d) != "{") {
                h += b.substring(g, d) + "{return ";
                g = d;
                for (var i = 0; i >= 0 && d < b.length; d++) {
                    var j = b.charAt(d);
                    switch (j) {
                        case '"':
                        case "'":
                            for (; ++d < b.length && (f = b.charAt(d)) != j;)f == "\\" && d++;
                            break;
                        case "[":
                        case "(":
                            i++;
                            break;
                        case "]":
                        case ")":
                            i--;
                            break;
                        case ";":
                        case ",":
                            i == 0 && i--;
                            break
                    }
                }
                h += pv.parse(b.substring(g, --d)) +
                ";}";
                g = d
            }
            c.lastIndex = d
        }
        h += b.substring(g);
        return h
    }
}
pv.css = function (b, c) {
    return window.getComputedStyle ? window.getComputedStyle(b, null).getPropertyValue(c) : b.currentStyle[c]
};
pv.error = function (b) {
    typeof console == "undefined" ? alert(b) : console.error(b)
};
pv.listen = function (b, c, d) {
    d = pv.listener(d);
    return b.addEventListener ? b.addEventListener(c, d, false) : b.attachEvent("on" + c, d)
};
pv.listener = function (b) {
    return b.$listener || (b.$listener = function (c) {
            try {
                pv.event = c;
                return b.call(this, c)
            } finally {
                delete pv.event
            }
        })
};
pv.ancestor = function (b, c) {
    for (; c;) {
        if (c == b)return true;
        c = c.parentNode
    }
    return false
};
pv.id = function () {
    var b = 1;
    return function () {
        return b++
    }
}();
pv.functor = function (b) {
    return typeof b == "function" ? b : function () {
        return b
    }
};
pv.listen(window, "load", function () {
    for (pv.$ = {i: 0, x: document.getElementsByTagName("script")}; pv.$.i < pv.$.x.length; pv.$.i++) {
        pv.$.s = pv.$.x[pv.$.i];
        if (pv.$.s.type == "text/javascript+protovis")try {
            window.eval(pv.parse(pv.$.s.text))
        } catch (b) {
            pv.error(b)
        }
    }
    delete pv.$
});
pv.Format = {};
pv.Format.re = function (b) {
    return b.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&")
};
pv.Format.pad = function (b, c, d) {
    c = c - String(d).length;
    return c < 1 ? d : (new Array(c + 1)).join(b) + d
};
pv.Format.date = function (b) {
    function c(f) {
        return b.replace(/%[a-zA-Z0-9]/g, function (g) {
            switch (g) {
                case "%a":
                    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][f.getDay()];
                case "%A":
                    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][f.getDay()];
                case "%h":
                case "%b":
                    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][f.getMonth()];
                case "%B":
                    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][f.getMonth()];
                case "%c":
                    return f.toLocaleString();
                case "%C":
                    return d("0", 2, Math.floor(f.getFullYear() / 100) % 100);
                case "%d":
                    return d("0", 2, f.getDate());
                case "%x":
                case "%D":
                    return d("0", 2, f.getMonth() + 1) + "/" + d("0", 2, f.getDate()) + "/" + d("0", 2, f.getFullYear() % 100);
                case "%e":
                    return d(" ", 2, f.getDate());
                case "%H":
                    return d("0", 2, f.getHours());
                case "%I":
                    return (g = f.getHours() % 12) ? d("0", 2, g) : 12;
                case "%m":
                    return d("0", 2, f.getMonth() + 1);
                case "%M":
                    return d("0", 2, f.getMinutes());
                case "%n":
                    return "\n";
                case "%p":
                    return f.getHours() <
                    12 ? "AM" : "PM";
                case "%T":
                case "%X":
                case "%r":
                    g = f.getHours() % 12;
                    return (g ? d("0", 2, g) : 12) + ":" + d("0", 2, f.getMinutes()) + ":" + d("0", 2, f.getSeconds()) + " " + (f.getHours() < 12 ? "AM" : "PM");
                case "%R":
                    return d("0", 2, f.getHours()) + ":" + d("0", 2, f.getMinutes());
                case "%S":
                    return d("0", 2, f.getSeconds());
                case "%Q":
                    return d("0", 3, f.getMilliseconds());
                case "%t":
                    return "\t";
                case "%u":
                    return (g = f.getDay()) ? g : 1;
                case "%w":
                    return f.getDay();
                case "%y":
                    return d("0", 2, f.getFullYear() % 100);
                case "%Y":
                    return f.getFullYear();
                case "%%":
                    return "%"
            }
            return g
        })
    }

    var d = pv.Format.pad;
    c.format = c;
    c.parse = function (f) {
        var g = 1970, h = 0, i = 1, j = 0, l = 0, k = 0, q = [function () {
        }], o = pv.Format.re(b).replace(/%[a-zA-Z0-9]/g, function (n) {
            switch (n) {
                case "%b":
                    q.push(function (m) {
                        h = {
                            Jan: 0,
                            Feb: 1,
                            Mar: 2,
                            Apr: 3,
                            May: 4,
                            Jun: 5,
                            Jul: 6,
                            Aug: 7,
                            Sep: 8,
                            Oct: 9,
                            Nov: 10,
                            Dec: 11
                        }[m]
                    });
                    return "([A-Za-z]+)";
                case "%h":
                case "%B":
                    q.push(function (m) {
                        h = {
                            January: 0,
                            February: 1,
                            March: 2,
                            April: 3,
                            May: 4,
                            June: 5,
                            July: 6,
                            August: 7,
                            September: 8,
                            October: 9,
                            November: 10,
                            December: 11
                        }[m]
                    });
                    return "([A-Za-z]+)";
                case "%e":
                case "%d":
                    q.push(function (m) {
                        i =
                            m
                    });
                    return "([0-9]+)";
                case "%I":
                case "%H":
                    q.push(function (m) {
                        j = m
                    });
                    return "([0-9]+)";
                case "%m":
                    q.push(function (m) {
                        h = m - 1
                    });
                    return "([0-9]+)";
                case "%M":
                    q.push(function (m) {
                        l = m
                    });
                    return "([0-9]+)";
                case "%p":
                    q.push(function (m) {
                        if (j == 12) {
                            if (m == "am")j = 0
                        } else if (m == "pm")j = Number(j) + 12
                    });
                    return "(am|pm)";
                case "%S":
                    q.push(function (m) {
                        k = m
                    });
                    return "([0-9]+)";
                case "%y":
                    q.push(function (m) {
                        m = Number(m);
                        g = m + (0 <= m && m < 69 ? 2E3 : m >= 69 && m < 100 ? 1900 : 0)
                    });
                    return "([0-9]+)";
                case "%Y":
                    q.push(function (m) {
                        g = m
                    });
                    return "([0-9]+)";
                case "%%":
                    q.push(function () {
                    });
                    return "%"
            }
            return n
        });
        (f = f.match(o)) && f.forEach(function (n, m) {
            q[m](n)
        });
        return new Date(g, h, i, j, l, k)
    };
    return c
};
pv.Format.time = function (b) {
    function c(f) {
        f = Number(f);
        switch (b) {
            case "short":
                if (f >= 31536E6)return (f / 31536E6).toFixed(1) + " years"; else if (f >= 6048E5)return (f / 6048E5).toFixed(1) + " weeks"; else if (f >= 864E5)return (f / 864E5).toFixed(1) + " days"; else if (f >= 36E5)return (f / 36E5).toFixed(1) + " hours"; else if (f >= 6E4)return (f / 6E4).toFixed(1) + " minutes";
                return (f / 1E3).toFixed(1) + " seconds";
            case "long":
                var g = [], h = f % 36E5 / 6E4 >> 0;
                g.push(d("0", 2, f % 6E4 / 1E3 >> 0));
                if (f >= 36E5) {
                    var i = f % 864E5 / 36E5 >> 0;
                    g.push(d("0", 2, h));
                    if (f >= 864E5) {
                        g.push(d("0",
                            2, i));
                        g.push(Math.floor(f / 864E5).toFixed())
                    } else g.push(i.toFixed())
                } else g.push(h.toFixed());
                return g.reverse().join(":")
        }
    }

    var d = pv.Format.pad;
    c.format = c;
    c.parse = function (f) {
        switch (b) {
            case "short":
                for (var g = /([0-9,.]+)\s*([a-z]+)/g, h, i = 0; h = g.exec(f);) {
                    var j = parseFloat(h[0].replace(",", "")), l = 0;
                    switch (h[2].toLowerCase()) {
                        case "year":
                        case "years":
                            l = 31536E6;
                            break;
                        case "week":
                        case "weeks":
                            l = 6048E5;
                            break;
                        case "day":
                        case "days":
                            l = 864E5;
                            break;
                        case "hour":
                        case "hours":
                            l = 36E5;
                            break;
                        case "minute":
                        case "minutes":
                            l =
                                6E4;
                            break;
                        case "second":
                        case "seconds":
                            l = 1E3;
                            break
                    }
                    i += j * l
                }
                return i;
            case "long":
                h = f.replace(",", "").split(":").reverse();
                i = 0;
                if (h.length)i += parseFloat(h[0]) * 1E3;
                if (h.length > 1)i += parseFloat(h[1]) * 6E4;
                if (h.length > 2)i += parseFloat(h[2]) * 36E5;
                if (h.length > 3)i += parseFloat(h[3]) * 864E5;
                return i
        }
    };
    return c
};
pv.Format.number = function () {
    function b(n) {
        if (Infinity > h)n = Math.round(n * i) / i;
        var m = String(Math.abs(n)).split("."), r = m[0];
        n = n < 0 ? "-" : "";
        if (r.length > d)r = r.substring(r.length - d);
        if (k && r.length < c)r = n + (new Array(c - r.length + 1)).join(j) + r;
        if (r.length > 3)r = r.replace(/\B(?=(?:\d{3})+(?!\d))/g, o);
        if (!k && r.length < f)r = (new Array(f - r.length + 1)).join(j) + n + r;
        m[0] = r;
        r = m[1] || "";
        if (r.length < g)m[1] = r + (new Array(g - r.length + 1)).join(l);
        return m.join(q)
    }

    var c = 0, d = Infinity, f = 0, g = 0, h = 0, i = 1, j = "0", l = "0", k = true, q = ".", o = ",";
    b.format =
        b;
    b.parse = function (n) {
        var m = pv.Format.re;
        n = String(n).replace(new RegExp("^(" + m(j) + ")*"), "").replace(new RegExp("(" + m(l) + ")*$"), "").split(q);
        m = n[0].replace(new RegExp(m(o), "g"), "");
        if (m.length > d)m = m.substring(m.length - d);
        n = n[1] ? Number("0." + n[1]) : 0;
        if (Infinity > h)n = Math.round(n * i) / i;
        return Math.round(m) + n
    };
    b.integerDigits = function (n, m) {
        if (arguments.length) {
            c = Number(n);
            d = arguments.length > 1 ? Number(m) : c;
            f = c + Math.floor(c / 3) * o.length;
            return this
        }
        return [c, d]
    };
    b.fractionDigits = function (n, m) {
        if (arguments.length) {
            g =
                Number(n);
            h = arguments.length > 1 ? Number(m) : g;
            i = Math.pow(10, h);
            return this
        }
        return [g, h]
    };
    b.integerPad = function (n) {
        if (arguments.length) {
            j = String(n);
            k = /\d/.test(j);
            return this
        }
        return j
    };
    b.fractionPad = function (n) {
        if (arguments.length) {
            l = String(n);
            return this
        }
        return l
    };
    b.decimal = function (n) {
        if (arguments.length) {
            q = String(n);
            return this
        }
        return q
    };
    b.group = function (n) {
        if (arguments.length) {
            o = n ? String(n) : "";
            f = c + Math.floor(c / 3) * o.length;
            return this
        }
        return o
    };
    return b
};
pv.map = function (b, c) {
    var d = {};
    return c ? b.map(function (f, g) {
        d.index = g;
        return c.call(d, f)
    }) : b.slice()
};
pv.repeat = function (b, c) {
    if (arguments.length == 1)c = 2;
    return pv.blend(pv.range(c).map(function () {
        return b
    }))
};
pv.cross = function (b, c) {
    for (var d = [], f = 0, g = b.length, h = c.length; f < g; f++)for (var i = 0, j = b[f]; i < h; i++)d.push([j, c[i]]);
    return d
};
pv.blend = function (b) {
    return Array.prototype.concat.apply([], b)
};
pv.transpose = function (b) {
    var c = b.length, d = pv.max(b, function (i) {
        return i.length
    });
    if (d > c) {
        b.length = d;
        for (var f = c; f < d; f++)b[f] = new Array(c);
        for (f = 0; f < c; f++)for (var g = f + 1; g < d; g++) {
            var h = b[f][g];
            b[f][g] = b[g][f];
            b[g][f] = h
        }
    } else {
        for (f = 0; f < d; f++)b[f].length = c;
        for (f = 0; f < c; f++)for (g = 0; g < f; g++) {
            h = b[f][g];
            b[f][g] = b[g][f];
            b[g][f] = h
        }
    }
    b.length = d;
    for (f = 0; f < d; f++)b[f].length = c;
    return b
};
pv.normalize = function (b, c) {
    b = pv.map(b, c);
    c = pv.sum(b);
    for (var d = 0; d < b.length; d++)b[d] /= c;
    return b
};
pv.permute = function (b, c, d) {
    if (!d)d = pv.identity;
    var f = new Array(c.length), g = {};
    c.forEach(function (h, i) {
        g.index = h;
        f[i] = d.call(g, b[h])
    });
    return f
};
pv.numerate = function (b, c) {
    if (!c)c = pv.identity;
    var d = {}, f = {};
    b.forEach(function (g, h) {
        f.index = h;
        d[c.call(f, g)] = h
    });
    return d
};
pv.uniq = function (b, c) {
    if (!c)c = pv.identity;
    var d = {}, f = [], g = {}, h;
    b.forEach(function (i, j) {
        g.index = j;
        h = c.call(g, i);
        h in d || (d[h] = f.push(h))
    });
    return f
};
pv.naturalOrder = function (b, c) {
    return b < c ? -1 : b > c ? 1 : 0
};
pv.reverseOrder = function (b, c) {
    return c < b ? -1 : c > b ? 1 : 0
};
pv.search = function (b, c, d) {
    if (!d)d = pv.identity;
    for (var f = 0, g = b.length - 1; f <= g;) {
        var h = f + g >> 1, i = d(b[h]);
        if (i < c)f = h + 1; else if (i > c)g = h - 1; else return h
    }
    return -f - 1
};
pv.search.index = function (b, c, d) {
    b = pv.search(b, c, d);
    return b < 0 ? -b - 1 : b
};
pv.range = function (b, c, d) {
    if (arguments.length == 1) {
        c = b;
        b = 0
    }
    if (d == undefined)d = 1;
    if ((c - b) / d == Infinity)throw new Error("range must be finite");
    var f = [], g = 0, h;
    if (d < 0)for (; (h = b + d * g++) > c;)f.push(h); else for (; (h = b + d * g++) < c;)f.push(h);
    return f
};
pv.random = function (b, c, d) {
    if (arguments.length == 1) {
        c = b;
        b = 0
    }
    if (d == undefined)d = 1;
    return d ? Math.floor(Math.random() * (c - b) / d) * d + b : Math.random() * (c - b) + b
};
pv.sum = function (b, c) {
    var d = {};
    return b.reduce(c ? function (f, g, h) {
        d.index = h;
        return f + c.call(d, g)
    } : function (f, g) {
        return f + g
    }, 0)
};
pv.max = function (b, c) {
    if (c == pv.index)return b.length - 1;
    return Math.max.apply(null, c ? pv.map(b, c) : b)
};
pv.max.index = function (b, c) {
    if (!b.length)return -1;
    if (c == pv.index)return b.length - 1;
    if (!c)c = pv.identity;
    for (var d = 0, f = -Infinity, g = {}, h = 0; h < b.length; h++) {
        g.index = h;
        var i = c.call(g, b[h]);
        if (i > f) {
            f = i;
            d = h
        }
    }
    return d
};
pv.min = function (b, c) {
    if (c == pv.index)return 0;
    return Math.min.apply(null, c ? pv.map(b, c) : b)
};
pv.min.index = function (b, c) {
    if (!b.length)return -1;
    if (c == pv.index)return 0;
    if (!c)c = pv.identity;
    for (var d = 0, f = Infinity, g = {}, h = 0; h < b.length; h++) {
        g.index = h;
        var i = c.call(g, b[h]);
        if (i < f) {
            f = i;
            d = h
        }
    }
    return d
};
pv.mean = function (b, c) {
    return pv.sum(b, c) / b.length
};
pv.median = function (b, c) {
    if (c == pv.index)return (b.length - 1) / 2;
    b = pv.map(b, c).sort(pv.naturalOrder);
    if (b.length % 2)return b[Math.floor(b.length / 2)];
    c = b.length / 2;
    return (b[c - 1] + b[c]) / 2
};
pv.variance = function (b, c) {
    if (b.length < 1)return NaN;
    if (b.length == 1)return 0;
    var d = pv.mean(b, c), f = 0, g = {};
    if (!c)c = pv.identity;
    for (var h = 0; h < b.length; h++) {
        g.index = h;
        var i = c.call(g, b[h]) - d;
        f += i * i
    }
    return f
};
pv.deviation = function (b, c) {
    return Math.sqrt(pv.variance(b, c) / (b.length - 1))
};
pv.log = function (b, c) {
    return Math.log(b) / Math.log(c)
};
pv.logSymmetric = function (b, c) {
    return b == 0 ? 0 : b < 0 ? -pv.log(-b, c) : pv.log(b, c)
};
pv.logAdjusted = function (b, c) {
    if (!isFinite(b))return b;
    var d = b < 0;
    if (b < c)b += (c - b) / c;
    return d ? -pv.log(b, c) : pv.log(b, c)
};
pv.logFloor = function (b, c) {
    return b > 0 ? Math.pow(c, Math.floor(pv.log(b, c))) : -Math.pow(c, -Math.floor(-pv.log(-b, c)))
};
pv.logCeil = function (b, c) {
    return b > 0 ? Math.pow(c, Math.ceil(pv.log(b, c))) : -Math.pow(c, -Math.ceil(-pv.log(-b, c)))
};
(function () {
    var b = Math.PI / 180, c = 180 / Math.PI;
    pv.radians = function (d) {
        return b * d
    };
    pv.degrees = function (d) {
        return c * d
    }
})();
pv.keys = function (b) {
    var c = [];
    for (var d in b)c.push(d);
    return c
};
pv.entries = function (b) {
    var c = [];
    for (var d in b)c.push({key: d, value: b[d]});
    return c
};
pv.values = function (b) {
    var c = [];
    for (var d in b)c.push(b[d]);
    return c
};
pv.dict = function (b, c) {
    for (var d = {}, f = {}, g = 0; g < b.length; g++)if (g in b) {
        var h = b[g];
        f.index = g;
        d[h] = c.call(f, h)
    }
    return d
};
pv.dom = function (b) {
    return new pv.Dom(b)
};
pv.Dom = function (b) {
    this.$map = b
};
pv.Dom.prototype.$leaf = function (b) {
    return typeof b != "object"
};
pv.Dom.prototype.leaf = function (b) {
    if (arguments.length) {
        this.$leaf = b;
        return this
    }
    return this.$leaf
};
pv.Dom.prototype.root = function (b) {
    function c(g) {
        var h = new pv.Dom.Node;
        for (var i in g) {
            var j = g[i];
            h.appendChild(d(j) ? new pv.Dom.Node(j) : c(j)).nodeName = i
        }
        return h
    }

    var d = this.$leaf, f = c(this.$map);
    f.nodeName = b;
    return f
};
pv.Dom.prototype.nodes = function () {
    return this.root().nodes()
};
pv.Dom.Node = function (b) {
    this.nodeValue = b;
    this.childNodes = []
};
a = pv.Dom.Node.prototype;
a.parentNode = null;
a.firstChild = null;
a.lastChild = null;
a.previousSibling = null;
a.nextSibling = null;
a.removeChild = function (b) {
    var c = this.childNodes.indexOf(b);
    if (c == -1)throw new Error("child not found");
    this.childNodes.splice(c, 1);
    if (b.previousSibling)b.previousSibling.nextSibling = b.nextSibling; else this.firstChild = b.nextSibling;
    if (b.nextSibling)b.nextSibling.previousSibling = b.previousSibling; else this.lastChild = b.previousSibling;
    delete b.nextSibling;
    delete b.previousSibling;
    delete b.parentNode;
    return b
};
a.appendChild = function (b) {
    b.parentNode && b.parentNode.removeChild(b);
    b.parentNode = this;
    if (b.previousSibling = this.lastChild)this.lastChild.nextSibling = b; else this.firstChild = b;
    this.lastChild = b;
    this.childNodes.push(b);
    return b
};
a.insertBefore = function (b, c) {
    if (!c)return this.appendChild(b);
    var d = this.childNodes.indexOf(c);
    if (d == -1)throw new Error("child not found");
    b.parentNode && b.parentNode.removeChild(b);
    b.parentNode = this;
    b.nextSibling = c;
    if (b.previousSibling = c.previousSibling)c.previousSibling.nextSibling = b; else {
        if (c == this.lastChild)this.lastChild = b;
        this.firstChild = b
    }
    this.childNodes.splice(d, 0, b);
    return b
};
a.replaceChild = function (b, c) {
    var d = this.childNodes.indexOf(c);
    if (d == -1)throw new Error("child not found");
    b.parentNode && b.parentNode.removeChild(b);
    b.parentNode = this;
    b.nextSibling = c.nextSibling;
    if (b.previousSibling = c.previousSibling)c.previousSibling.nextSibling = b; else this.firstChild = b;
    if (c.nextSibling)c.nextSibling.previousSibling = b; else this.lastChild = b;
    this.childNodes[d] = b;
    return c
};
a.visitBefore = function (b) {
    function c(d, f) {
        b(d, f);
        for (d = d.firstChild; d; d = d.nextSibling)c(d, f + 1)
    }

    c(this, 0)
};
a.visitAfter = function (b) {
    function c(d, f) {
        for (var g = d.firstChild; g; g = g.nextSibling)c(g, f + 1);
        b(d, f)
    }

    c(this, 0)
};
a.sort = function (b) {
    if (this.firstChild) {
        this.childNodes.sort(b);
        var c = this.firstChild = this.childNodes[0], d;
        delete c.previousSibling;
        for (var f = 1; f < this.childNodes.length; f++) {
            c.sort(b);
            d = this.childNodes[f];
            d.previousSibling = c;
            c = c.nextSibling = d
        }
        this.lastChild = c;
        delete c.nextSibling;
        c.sort(b)
    }
    return this
};
a.reverse = function () {
    var b = [];
    this.visitAfter(function (c) {
        for (; c.lastChild;)b.push(c.removeChild(c.lastChild));
        for (var d; d = b.pop();)c.insertBefore(d, c.firstChild)
    });
    return this
};
a.nodes = function () {
    function b(d) {
        c.push(d);
        d.childNodes.forEach(b)
    }

    var c = [];
    b(this, c);
    return c
};
a.toggle = function (b) {
    if (b)return this.toggled ? this.visitBefore(function (d) {
        d.toggled && d.toggle()
    }) : this.visitAfter(function (d) {
        d.toggled || d.toggle()
    });
    b = this;
    if (b.toggled) {
        for (var c; c = b.toggled.pop();)b.appendChild(c);
        delete b.toggled
    } else if (b.lastChild)for (b.toggled = []; b.lastChild;)b.toggled.push(b.removeChild(b.lastChild))
};
pv.nodes = function (b) {
    for (var c = new pv.Dom.Node, d = 0; d < b.length; d++)c.appendChild(new pv.Dom.Node(b[d]));
    return c.nodes()
};
pv.tree = function (b) {
    return new pv.Tree(b)
};
pv.Tree = function (b) {
    this.array = b
};
pv.Tree.prototype.keys = function (b) {
    this.k = b;
    return this
};
pv.Tree.prototype.value = function (b) {
    this.v = b;
    return this
};
pv.Tree.prototype.map = function () {
    for (var b = {}, c = {}, d = 0; d < this.array.length; d++) {
        c.index = d;
        for (var f = this.array[d], g = this.k.call(c, f), h = b, i = 0; i < g.length - 1; i++)h = h[g[i]] || (h[g[i]] = {});
        h[g[i]] = this.v ? this.v.call(c, f) : f
    }
    return b
};
pv.nest = function (b) {
    return new pv.Nest(b)
};
pv.Nest = function (b) {
    this.array = b;
    this.keys = []
};
a = pv.Nest.prototype;
a.key = function (b) {
    this.keys.push(b);
    return this
};
a.sortKeys = function (b) {
    this.keys[this.keys.length - 1].order = b || pv.naturalOrder;
    return this
};
a.sortValues = function (b) {
    this.order = b || pv.naturalOrder;
    return this
};
a.map = function () {
    for (var b = {}, c = [], d, f = 0; f < this.array.length; f++) {
        var g = this.array[f], h = b;
        for (d = 0; d < this.keys.length - 1; d++) {
            var i = this.keys[d](g);
            h[i] || (h[i] = {});
            h = h[i]
        }
        i = this.keys[d](g);
        if (!h[i]) {
            d = [];
            c.push(d);
            h[i] = d
        }
        h[i].push(g)
    }
    if (this.order)for (d = 0; d < c.length; d++)c[d].sort(this.order);
    return b
};
a.entries = function () {
    function b(d) {
        var f = [];
        for (var g in d) {
            var h = d[g];
            f.push({key: g, values: h instanceof Array ? h : b(h)})
        }
        return f
    }

    function c(d, f) {
        var g = this.keys[f].order;
        g && d.sort(function (i, j) {
            return g(i.key, j.key)
        });
        if (++f < this.keys.length)for (var h = 0; h < d.length; h++)c.call(this, d[h].values, f);
        return d
    }

    return c.call(this, b(this.map()), 0)
};
a.rollup = function (b) {
    function c(d) {
        for (var f in d) {
            var g = d[f];
            if (g instanceof Array)d[f] = b(g); else c(g)
        }
        return d
    }

    return c(this.map())
};
pv.flatten = function (b) {
    return new pv.Flatten(b)
};
pv.Flatten = function (b) {
    this.map = b;
    this.keys = []
};
pv.Flatten.prototype.key = function (b, c) {
    this.keys.push({name: b, value: c});
    delete this.$leaf;
    return this
};
pv.Flatten.prototype.leaf = function (b) {
    this.keys.length = 0;
    this.$leaf = b;
    return this
};
pv.Flatten.prototype.array = function () {
    function b(i, j) {
        if (j < f.length - 1)for (var l in i) {
            d.push(l);
            b(i[l], j + 1);
            d.pop()
        } else c.push(d.concat(i))
    }

    var c = [], d = [], f = this.keys, g = this.$leaf;
    if (g) {
        function h(i, j) {
            if (g(i))c.push({keys: d.slice(), value: i}); else for (var l in i) {
                d.push(l);
                h(i[l], j + 1);
                d.pop()
            }
        }

        h(this.map, 0);
        return c
    }
    b(this.map, 0);
    return c.map(function (i) {
        for (var j = {}, l = 0; l < f.length; l++) {
            var k = f[l], q = i[l];
            j[k.name] = k.value ? k.value.call(null, q) : q
        }
        return j
    })
};
pv.vector = function (b, c) {
    return new pv.Vector(b, c)
};
pv.Vector = function (b, c) {
    this.x = b;
    this.y = c
};
a = pv.Vector.prototype;
a.perp = function () {
    return new pv.Vector(-this.y, this.x)
};
a.norm = function () {
    var b = this.length();
    return this.times(b ? 1 / b : 1)
};
a.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
};
a.times = function (b) {
    return new pv.Vector(this.x * b, this.y * b)
};
a.plus = function (b, c) {
    return arguments.length == 1 ? new pv.Vector(this.x + b.x, this.y + b.y) : new pv.Vector(this.x + b, this.y + c)
};
a.minus = function (b, c) {
    return arguments.length == 1 ? new pv.Vector(this.x - b.x, this.y - b.y) : new pv.Vector(this.x - b, this.y - c)
};
a.dot = function (b, c) {
    return arguments.length == 1 ? this.x * b.x + this.y * b.y : this.x * b + this.y * c
};
pv.Transform = function () {
};
pv.Transform.prototype = {k: 1, x: 0, y: 0};
pv.Transform.identity = new pv.Transform;
pv.Transform.prototype.translate = function (b, c) {
    var d = new pv.Transform;
    d.k = this.k;
    d.x = this.k * b + this.x;
    d.y = this.k * c + this.y;
    return d
};
pv.Transform.prototype.scale = function (b) {
    var c = new pv.Transform;
    c.k = this.k * b;
    c.x = this.x;
    c.y = this.y;
    return c
};
pv.Transform.prototype.invert = function () {
    var b = new pv.Transform, c = 1 / this.k;
    b.k = c;
    b.x = -this.x * c;
    b.y = -this.y * c;
    return b
};
pv.Transform.prototype.times = function (b) {
    var c = new pv.Transform;
    c.k = this.k * b.k;
    c.x = this.k * b.x + this.x;
    c.y = this.k * b.y + this.y;
    return c
};
pv.Scale = function () {
};
pv.Scale.interpolator = function (b, c) {
    if (typeof b == "number")return function (d) {
        return d * (c - b) + b
    };
    b = pv.color(b).rgb();
    c = pv.color(c).rgb();
    return function (d) {
        var f = b.a * (1 - d) + c.a * d;
        if (f < 1.0E-5)f = 0;
        return b.a == 0 ? pv.rgb(c.r, c.g, c.b, f) : c.a == 0 ? pv.rgb(b.r, b.g, b.b, f) : pv.rgb(Math.round(b.r * (1 - d) + c.r * d), Math.round(b.g * (1 - d) + c.g * d), Math.round(b.b * (1 - d) + c.b * d), f)
    }
};
pv.Scale.quantitative = function () {
    function b(o) {
        return new Date(o)
    }

    function c(o) {
        var n = pv.search(d, o);
        if (n < 0)n = -n - 2;
        n = Math.max(0, Math.min(h.length - 1, n));
        return h[n]((l(o) - f[n]) / (f[n + 1] - f[n]))
    }

    var d = [0, 1], f = [0, 1], g = [0, 1], h = [pv.identity], i = Number, j = false, l = pv.identity, k = pv.identity, q = String;
    c.transform = function (o, n) {
        l = function (m) {
            return j ? -o(-m) : o(m)
        };
        k = function (m) {
            return j ? -n(-m) : n(m)
        };
        f = d.map(l);
        return this
    };
    c.domain = function (o, n, m) {
        if (arguments.length) {
            var r;
            if (o instanceof Array) {
                if (arguments.length <
                    2)n = pv.identity;
                if (arguments.length < 3)m = n;
                r = o.length && n(o[0]);
                d = o.length ? [pv.min(o, n), pv.max(o, m)] : []
            } else {
                r = o;
                d = Array.prototype.slice.call(arguments).map(Number)
            }
            if (d.length) {
                if (d.length == 1)d = [d[0], d[0]]
            } else d = [-Infinity, Infinity];
            j = (d[0] || d[d.length - 1]) < 0;
            f = d.map(l);
            i = r instanceof Date ? b : Number;
            return this
        }
        return d.map(i)
    };
    c.range = function () {
        if (arguments.length) {
            g = Array.prototype.slice.call(arguments);
            if (g.length) {
                if (g.length == 1)g = [g[0], g[0]]
            } else g = [-Infinity, Infinity];
            h = [];
            for (var o = 0; o < g.length -
            1; o++)h.push(pv.Scale.interpolator(g[o], g[o + 1]));
            return this
        }
        return g
    };
    c.invert = function (o) {
        var n = pv.search(g, o);
        if (n < 0)n = -n - 2;
        n = Math.max(0, Math.min(h.length - 1, n));
        return i(k(f[n] + (o - g[n]) / (g[n + 1] - g[n]) * (f[n + 1] - f[n])))
    };
    c.ticks = function (o) {
        var n = d[0], m = d[d.length - 1], r = m < n, s = r ? m : n;
        m = r ? n : m;
        var u = m - s;
        if (!u || !isFinite(u)) {
            if (i == b)q = pv.Format.date("%x");
            return [i(s)]
        }
        if (i == b) {
            function x(w, y) {
                switch (y) {
                    case 31536E6:
                        w.setMonth(0);
                    case 2592E6:
                        w.setDate(1);
                    case 6048E5:
                        y == 6048E5 && w.setDate(w.getDate() - w.getDay());
                    case 864E5:
                        w.setHours(0);
                    case 36E5:
                        w.setMinutes(0);
                    case 6E4:
                        w.setSeconds(0);
                    case 1E3:
                        w.setMilliseconds(0)
                }
            }

            var t, p, v = 1;
            if (u >= 94608E6) {
                n = 31536E6;
                t = "%Y";
                p = function (w) {
                    w.setFullYear(w.getFullYear() + v)
                }
            } else if (u >= 7776E6) {
                n = 2592E6;
                t = "%m/%Y";
                p = function (w) {
                    w.setMonth(w.getMonth() + v)
                }
            } else if (u >= 18144E5) {
                n = 6048E5;
                t = "%m/%d";
                p = function (w) {
                    w.setDate(w.getDate() + 7 * v)
                }
            } else if (u >= 2592E5) {
                n = 864E5;
                t = "%m/%d";
                p = function (w) {
                    w.setDate(w.getDate() + v)
                }
            } else if (u >= 108E5) {
                n = 36E5;
                t = "%I:%M %p";
                p = function (w) {
                    w.setHours(w.getHours() +
                    v)
                }
            } else if (u >= 18E4) {
                n = 6E4;
                t = "%I:%M %p";
                p = function (w) {
                    w.setMinutes(w.getMinutes() + v)
                }
            } else if (u >= 3E3) {
                n = 1E3;
                t = "%I:%M:%S";
                p = function (w) {
                    w.setSeconds(w.getSeconds() + v)
                }
            } else {
                n = 1;
                t = "%S.%Qs";
                p = function (w) {
                    w.setTime(w.getTime() + v)
                }
            }
            q = pv.Format.date(t);
            s = new Date(s);
            t = [];
            x(s, n);
            u = u / n;
            if (u > 10)switch (n) {
                case 36E5:
                    v = u > 20 ? 6 : 3;
                    s.setHours(Math.floor(s.getHours() / v) * v);
                    break;
                case 2592E6:
                    v = 3;
                    s.setMonth(Math.floor(s.getMonth() / v) * v);
                    break;
                case 6E4:
                    v = u > 30 ? 15 : u > 15 ? 10 : 5;
                    s.setMinutes(Math.floor(s.getMinutes() / v) * v);
                    break;
                case 1E3:
                    v = u > 90 ? 15 : u > 60 ? 10 : 5;
                    s.setSeconds(Math.floor(s.getSeconds() / v) * v);
                    break;
                case 1:
                    v = u > 1E3 ? 250 : u > 200 ? 100 : u > 100 ? 50 : u > 50 ? 25 : 5;
                    s.setMilliseconds(Math.floor(s.getMilliseconds() / v) * v);
                    break;
                default:
                    v = pv.logCeil(u / 15, 10);
                    if (u / v < 2)v /= 5; else if (u / v < 5)v /= 2;
                    s.setFullYear(Math.floor(s.getFullYear() / v) * v);
                    break
            }
            for (; ;) {
                p(s);
                if (s > m)break;
                t.push(new Date(s))
            }
            return r ? t.reverse() : t
        }
        arguments.length || (o = 10);
        v = pv.logFloor(u / o, 10);
        n = o / (u / v);
        if (n <= 0.15)v *= 10; else if (n <= 0.35)v *= 5; else if (n <= 0.75)v *= 2;
        n = Math.ceil(s /
        v) * v;
        m = Math.floor(m / v) * v;
        q = pv.Format.number().fractionDigits(Math.max(0, -Math.floor(pv.log(v, 10) + 0.01)));
        m = pv.range(n, m + v, v);
        return r ? m.reverse() : m
    };
    c.tickFormat = function (o) {
        return q(o)
    };
    c.nice = function () {
        if (d.length != 2)return this;
        var o = d[0], n = d[d.length - 1], m = n < o, r = m ? n : o;
        o = m ? o : n;
        n = o - r;
        if (!n || !isFinite(n))return this;
        n = Math.pow(10, Math.round(Math.log(n) / Math.log(10)) - 1);
        d = [Math.floor(r / n) * n, Math.ceil(o / n) * n];
        m && d.reverse();
        f = d.map(l);
        return this
    };
    c.by = function (o) {
        function n() {
            return c(o.apply(this,
                arguments))
        }

        for (var m in c)n[m] = c[m];
        return n
    };
    c.domain.apply(c, arguments);
    return c
};
pv.Scale.linear = function () {
    var b = pv.Scale.quantitative();
    b.domain.apply(b, arguments);
    return b
};
pv.Scale.log = function () {
    var b = pv.Scale.quantitative(1, 10), c, d, f = function (h) {
        return Math.log(h) / d
    }, g = function (h) {
        return Math.pow(c, h)
    };
    b.ticks = function () {
        var h = b.domain(), i = h[0] < 0, j = Math.floor(i ? -f(-h[0]) : f(h[0])), l = Math.ceil(i ? -f(-h[1]) : f(h[1])), k = [];
        if (i)for (k.push(-g(-j)); j++ < l;)for (i = c - 1; i > 0; i--)k.push(-g(-j) * i); else {
            for (; j < l; j++)for (i = 1; i < c; i++)k.push(g(j) * i);
            k.push(g(j))
        }
        for (j = 0; k[j] < h[0]; j++);
        for (l = k.length; k[l - 1] > h[1]; l--);
        return k.slice(j, l)
    };
    b.tickFormat = function (h) {
        return h.toPrecision(1)
    };
    b.nice = function () {
        var h = b.domain();
        return b.domain(pv.logFloor(h[0], c), pv.logCeil(h[1], c))
    };
    b.base = function (h) {
        if (arguments.length) {
            c = Number(h);
            d = Math.log(c);
            b.transform(f, g);
            return this
        }
        return c
    };
    b.domain.apply(b, arguments);
    return b.base(10)
};
pv.Scale.root = function () {
    var b = pv.Scale.quantitative();
    b.power = function (c) {
        if (arguments.length) {
            var d = Number(c), f = 1 / d;
            b.transform(function (g) {
                return Math.pow(g, f)
            }, function (g) {
                return Math.pow(g, d)
            });
            return this
        }
        return d
    };
    b.domain.apply(b, arguments);
    return b.power(2)
};
pv.Scale.ordinal = function () {
    function b(g) {
        g in d || (d[g] = c.push(g) - 1);
        return f[d[g] % f.length]
    }

    var c = [], d = {}, f = [];
    b.domain = function (g, h) {
        if (arguments.length) {
            g = g instanceof Array ? arguments.length > 1 ? pv.map(g, h) : g : Array.prototype.slice.call(arguments);
            c = [];
            for (var i = {}, j = 0; j < g.length; j++) {
                var l = g[j];
                if (!(l in i)) {
                    i[l] = true;
                    c.push(l)
                }
            }
            d = pv.numerate(c);
            return this
        }
        return c
    };
    b.range = function (g, h) {
        if (arguments.length) {
            f = g instanceof Array ? arguments.length > 1 ? pv.map(g, h) : g : Array.prototype.slice.call(arguments);
            if (typeof f[0] == "string")f = f.map(pv.color);
            return this
        }
        return f
    };
    b.split = function (g, h) {
        var i = (h - g) / this.domain().length;
        f = pv.range(g + i / 2, h, i);
        return this
    };
    b.splitFlush = function (g, h) {
        var i = this.domain().length, j = (h - g) / (i - 1);
        f = i == 1 ? [(g + h) / 2] : pv.range(g, h + j / 2, j);
        return this
    };
    b.splitBanded = function (g, h, i) {
        if (arguments.length < 3)i = 1;
        if (i < 0) {
            var j = this.domain().length;
            j = (h - g - -i * j) / (j + 1);
            f = pv.range(g + j, h, j - i);
            f.band = -i
        } else {
            j = (h - g) / (this.domain().length + (1 - i));
            f = pv.range(g + j * (1 - i), h, j);
            f.band = j * i
        }
        return this
    };
    b.by = function (g) {
        function h() {
            return b(g.apply(this, arguments))
        }

        for (var i in b)h[i] = b[i];
        return h
    };
    b.domain.apply(b, arguments);
    return b
};
pv.Scale.quantile = function () {
    function b(i) {
        return h(Math.max(0, Math.min(d, pv.search.index(f, i) - 1)) / d)
    }

    var c = -1, d = -1, f = [], g = [], h = pv.Scale.linear();
    b.quantiles = function (i) {
        if (arguments.length) {
            c = Number(i);
            if (c < 0) {
                f = [g[0]].concat(g);
                d = g.length - 1
            } else {
                f = [];
                f[0] = g[0];
                for (var j = 1; j <= c; j++)f[j] = g[~~(j * (g.length - 1) / c)];
                d = c - 1
            }
            return this
        }
        return f
    };
    b.domain = function (i, j) {
        if (arguments.length) {
            g = i instanceof Array ? pv.map(i, j) : Array.prototype.slice.call(arguments);
            g.sort(pv.naturalOrder);
            b.quantiles(c);
            return this
        }
        return g
    };
    b.range = function () {
        if (arguments.length) {
            h.range.apply(h, arguments);
            return this
        }
        return h.range()
    };
    b.by = function (i) {
        function j() {
            return b(i.apply(this, arguments))
        }

        for (var l in b)j[l] = b[l];
        return j
    };
    b.domain.apply(b, arguments);
    return b
};
pv.histogram = function (b, c) {
    var d = true;
    return {
        bins: function (f) {
            var g = pv.map(b, c), h = [];
            arguments.length || (f = pv.Scale.linear(g).ticks());
            for (var i = 0; i < f.length - 1; i++) {
                var j = h[i] = [];
                j.x = f[i];
                j.dx = f[i + 1] - f[i];
                j.y = 0
            }
            for (i = 0; i < g.length; i++) {
                j = pv.search.index(f, g[i]) - 1;
                j = h[Math.max(0, Math.min(h.length - 1, j))];
                j.y++;
                j.push(b[i])
            }
            if (!d)for (i = 0; i < h.length; i++)h[i].y /= g.length;
            return h
        }, frequency: function (f) {
            if (arguments.length) {
                d = Boolean(f);
                return this
            }
            return d
        }
    }
};
pv.color = function (b) {
    if (b.rgb)return b.rgb();
    var c = /([a-z]+)\((.*)\)/i.exec(b);
    if (c) {
        var d = c[2].split(","), f = 1;
        switch (c[1]) {
            case "hsla":
            case "rgba":
                f = parseFloat(d[3]);
                if (!f)return pv.Color.transparent;
                break
        }
        switch (c[1]) {
            case "hsla":
            case "hsl":
                b = parseFloat(d[0]);
                var g = parseFloat(d[1]) / 100;
                d = parseFloat(d[2]) / 100;
                return (new pv.Color.Hsl(b, g, d, f)).rgb();
            case "rgba":
            case "rgb":
                var k = parseFloat(l);
            function h(l) {
                return l[l.length - 1] == "%" ? Math.round(k * 2.55) : k
            }

                g = h(d[0]);
                var i = h(d[1]), j = h(d[2]);
                return pv.rgb(g,
                    i, j, f)
        }
    }
    if (f = pv.Color.names[b])return f;
    if (b.charAt(0) == "#") {
        if (b.length == 4) {
            g = b.charAt(1);
            g += g;
            i = b.charAt(2);
            i += i;
            j = b.charAt(3);
            j += j
        } else if (b.length == 7) {
            g = b.substring(1, 3);
            i = b.substring(3, 5);
            j = b.substring(5, 7)
        }
        return pv.rgb(parseInt(g, 16), parseInt(i, 16), parseInt(j, 16), 1)
    }
    return new pv.Color(b, 1)
};
pv.Color = function (b, c) {
    this.color = b;
    this.opacity = c
};
pv.Color.prototype.brighter = function (b) {
    return this.rgb().brighter(b)
};
pv.Color.prototype.darker = function (b) {
    return this.rgb().darker(b)
};
pv.rgb = function (b, c, d, f) {
    return new pv.Color.Rgb(b, c, d, arguments.length == 4 ? f : 1)
};
pv.Color.Rgb = function (b, c, d, f) {
    pv.Color.call(this, f ? "rgb(" + b + "," + c + "," + d + ")" : "none", f);
    this.r = b;
    this.g = c;
    this.b = d;
    this.a = f
};
pv.Color.Rgb.prototype = pv.extend(pv.Color);
a = pv.Color.Rgb.prototype;
a.red = function (b) {
    return pv.rgb(b, this.g, this.b, this.a)
};
a.green = function (b) {
    return pv.rgb(this.r, b, this.b, this.a)
};
a.blue = function (b) {
    return pv.rgb(this.r, this.g, b, this.a)
};
a.alpha = function (b) {
    return pv.rgb(this.r, this.g, this.b, b)
};
a.rgb = function () {
    return this
};
a.brighter = function (b) {
    b = Math.pow(0.7, arguments.length ? b : 1);
    var c = this.r, d = this.g, f = this.b;
    if (!c && !d && !f)return pv.rgb(30, 30, 30, this.a);
    if (c && c < 30)c = 30;
    if (d && d < 30)d = 30;
    if (f && f < 30)f = 30;
    return pv.rgb(Math.min(255, Math.floor(c / b)), Math.min(255, Math.floor(d / b)), Math.min(255, Math.floor(f / b)), this.a)
};
a.darker = function (b) {
    b = Math.pow(0.7, arguments.length ? b : 1);
    return pv.rgb(Math.max(0, Math.floor(b * this.r)), Math.max(0, Math.floor(b * this.g)), Math.max(0, Math.floor(b * this.b)), this.a)
};
pv.hsl = function (b, c, d, f) {
    return new pv.Color.Hsl(b, c, d, arguments.length == 4 ? f : 1)
};
pv.Color.Hsl = function (b, c, d, f) {
    pv.Color.call(this, "hsl(" + b + "," + c * 100 + "%," + d * 100 + "%)", f);
    this.h = b;
    this.s = c;
    this.l = d;
    this.a = f
};
pv.Color.Hsl.prototype = pv.extend(pv.Color);
a = pv.Color.Hsl.prototype;
a.hue = function (b) {
    return pv.hsl(b, this.s, this.l, this.a)
};
a.saturation = function (b) {
    return pv.hsl(this.h, b, this.l, this.a)
};
a.lightness = function (b) {
    return pv.hsl(this.h, this.s, b, this.a)
};
a.alpha = function (b) {
    return pv.hsl(this.h, this.s, this.l, b)
};
a.rgb = function () {
    function b(j) {
        if (j > 360)j -= 360; else if (j < 0)j += 360;
        if (j < 60)return i + (h - i) * j / 60;
        if (j < 180)return h;
        if (j < 240)return i + (h - i) * (240 - j) / 60;
        return i
    }

    function c(j) {
        return Math.round(b(j) * 255)
    }

    var d = this.h, f = this.s, g = this.l;
    d %= 360;
    if (d < 0)d += 360;
    f = Math.max(0, Math.min(f, 1));
    g = Math.max(0, Math.min(g, 1));
    var h = g <= 0.5 ? g * (1 + f) : g + f - g * f, i = 2 * g - h;
    return pv.rgb(c(d + 120), c(d), c(d - 120), this.a)
};
pv.Color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
    transparent: pv.Color.transparent = pv.rgb(0, 0, 0, 0)
};
(function () {
    var b = pv.Color.names;
    for (var c in b)b[c] = pv.color(b[c])
})();
pv.colors = function () {
    var b = pv.Scale.ordinal();
    b.range.apply(b, arguments);
    return b
};
pv.Colors = {};
pv.Colors.category10 = function () {
    var b = pv.colors("#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf");
    b.domain.apply(b, arguments);
    return b
};
pv.Colors.category20 = function () {
    var b = pv.colors("#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5");
    b.domain.apply(b, arguments);
    return b
};
pv.Colors.category19 = function () {
    var b = pv.colors("#9c9ede", "#7375b5", "#4a5584", "#cedb9c", "#b5cf6b", "#8ca252", "#637939", "#e7cb94", "#e7ba52", "#bd9e39", "#8c6d31", "#e7969c", "#d6616b", "#ad494a", "#843c39", "#de9ed6", "#ce6dbd", "#a55194", "#7b4173");
    b.domain.apply(b, arguments);
    return b
};
pv.ramp = function () {
    var b = pv.Scale.linear();
    b.range.apply(b, arguments);
    return b
};
pv.Scene = pv.SvgScene = {
    svg: "http://www.w3.org/2000/svg",
    xmlns: "http://www.w3.org/2000/xmlns",
    xlink: "http://www.w3.org/1999/xlink",
    xhtml: "http://www.w3.org/1999/xhtml",
    scale: 1,
    events: ["DOMMouseScroll", "mousewheel", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "click", "dblclick"],
    implicit: {
        svg: {
            "shape-rendering": "auto",
            "pointer-events": "painted",
            x: 0,
            y: 0,
            dy: 0,
            "text-anchor": "start",
            transform: "translate(0,0)",
            fill: "none",
            "fill-opacity": 1,
            stroke: "none",
            "stroke-opacity": 1,
            "stroke-width": 1.5,
            "stroke-linejoin": "miter"
        },
        css: {font: "10px sans-serif"}
    }
};
pv.SvgScene.updateAll = function (b) {
    if (b.length && b[0].reverse && b.type != "line" && b.type != "area") {
        for (var c = pv.extend(b), d = 0, f = b.length - 1; f >= 0; d++, f--)c[d] = b[f];
        b = c
    }
    this.removeSiblings(this[b.type](b))
};
pv.SvgScene.create = function (b) {
    return document.createElementNS(this.svg, b)
};
pv.SvgScene.expect = function (b, c, d, f) {
    if (b) {
        if (b.tagName == "a")b = b.firstChild;
        if (b.tagName != c) {
            c = this.create(c);
            b.parentNode.replaceChild(c, b);
            b = c
        }
    } else b = this.create(c);
    for (var g in d) {
        c = d[g];
        if (c == this.implicit.svg[g])c = null;
        c == null ? b.removeAttribute(g) : b.setAttribute(g, c)
    }
    for (g in f) {
        c = f[g];
        if (c == this.implicit.css[g])c = null;
        if (c == null)b.style.removeProperty(g); else b.style[g] = c
    }
    return b
};
pv.SvgScene.append = function (b, c, d) {
    b.$scene = {scenes: c, index: d};
    b = this.title(b, c[d]);
    b.parentNode || c.$g.appendChild(b);
    return b.nextSibling
};
pv.SvgScene.title = function (b, c) {
    var d = b.parentNode;
    if (d && d.tagName != "a")d = null;
    if (c.title) {
        if (!d) {
            d = this.create("a");
            b.parentNode && b.parentNode.replaceChild(d, b);
            d.appendChild(b)
        }
        d.setAttributeNS(this.xlink, "title", c.title);
        return d
    }
    d && d.parentNode.replaceChild(b, d);
    return b
};
pv.SvgScene.dispatch = pv.listener(function (b) {
    var c = b.target.$scene;
    if (c) {
        var d = b.type;
        switch (d) {
            case "DOMMouseScroll":
                d = "mousewheel";
                b.wheel = -480 * b.detail;
                break;
            case "mousewheel":
                b.wheel = (window.opera ? 12 : 1) * b.wheelDelta;
                break
        }
        pv.Mark.dispatch(d, c.scenes, c.index) && b.preventDefault()
    }
});
pv.SvgScene.removeSiblings = function (b) {
    for (; b;) {
        var c = b.nextSibling;
        b.parentNode.removeChild(b);
        b = c
    }
};
pv.SvgScene.undefined = function () {
};
pv.SvgScene.pathBasis = function () {
    function b(f, g, h, i, j) {
        return {
            x: f[0] * g.left + f[1] * h.left + f[2] * i.left + f[3] * j.left,
            y: f[0] * g.top + f[1] * h.top + f[2] * i.top + f[3] * j.top
        }
    }

    var c = [[1 / 6, 2 / 3, 1 / 6, 0], [0, 2 / 3, 1 / 3, 0], [0, 1 / 3, 2 / 3, 0], [0, 1 / 6, 2 / 3, 1 / 6]], d = function (f, g, h, i) {
        var j = b(c[1], f, g, h, i), l = b(c[2], f, g, h, i);
        f = b(c[3], f, g, h, i);
        return "C" + j.x + "," + j.y + "," + l.x + "," + l.y + "," + f.x + "," + f.y
    };
    d.segment = function (f, g, h, i) {
        var j = b(c[0], f, g, h, i), l = b(c[1], f, g, h, i), k = b(c[2], f, g, h, i);
        f = b(c[3], f, g, h, i);
        return "M" + j.x + "," + j.y + "C" + l.x + "," + l.y +
            "," + k.x + "," + k.y + "," + f.x + "," + f.y
    };
    return d
}();
pv.SvgScene.curveBasis = function (b) {
    if (b.length <= 2)return "";
    var c = "", d = b[0], f = d, g = d, h = b[1];
    c += this.pathBasis(d, f, g, h);
    for (var i = 2; i < b.length; i++) {
        d = f;
        f = g;
        g = h;
        h = b[i];
        c += this.pathBasis(d, f, g, h)
    }
    c += this.pathBasis(f, g, h, h);
    c += this.pathBasis(g, h, h, h);
    return c
};
pv.SvgScene.curveBasisSegments = function (b) {
    if (b.length <= 2)return "";
    var c = [], d = b[0], f = d, g = d, h = b[1], i = this.pathBasis.segment(d, f, g, h);
    d = f;
    f = g;
    g = h;
    h = b[2];
    c.push(i + this.pathBasis(d, f, g, h));
    for (i = 3; i < b.length; i++) {
        d = f;
        f = g;
        g = h;
        h = b[i];
        c.push(this.pathBasis.segment(d, f, g, h))
    }
    c.push(this.pathBasis.segment(f, g, h, h) + this.pathBasis(g, h, h, h));
    return c
};
pv.SvgScene.curveHermite = function (b, c) {
    if (c.length < 1 || b.length != c.length && b.length != c.length + 2)return "";
    var d = b.length != c.length, f = "", g = b[0], h = b[1], i = c[0], j = i, l = 1;
    if (d) {
        f += "Q" + (h.left - i.x * 2 / 3) + "," + (h.top - i.y * 2 / 3) + "," + h.left + "," + h.top;
        g = b[1];
        l = 2
    }
    if (c.length > 1) {
        j = c[1];
        h = b[l];
        l++;
        f += "C" + (g.left + i.x) + "," + (g.top + i.y) + "," + (h.left - j.x) + "," + (h.top - j.y) + "," + h.left + "," + h.top;
        for (g = 2; g < c.length; g++, l++) {
            h = b[l];
            j = c[g];
            f += "S" + (h.left - j.x) + "," + (h.top - j.y) + "," + h.left + "," + h.top
        }
    }
    if (d) {
        b = b[l];
        f += "Q" + (h.left + j.x * 2 /
        3) + "," + (h.top + j.y * 2 / 3) + "," + b.left + "," + b.top
    }
    return f
};
pv.SvgScene.curveHermiteSegments = function (b, c) {
    if (c.length < 1 || b.length != c.length && b.length != c.length + 2)return [];
    var d = b.length != c.length, f = [], g = b[0], h = g, i = c[0], j = i, l = 1;
    if (d) {
        h = b[1];
        f.push("M" + g.left + "," + g.top + "Q" + (h.left - j.x * 2 / 3) + "," + (h.top - j.y * 2 / 3) + "," + h.left + "," + h.top);
        l = 2
    }
    for (var k = 1; k < c.length; k++, l++) {
        g = h;
        i = j;
        h = b[l];
        j = c[k];
        f.push("M" + g.left + "," + g.top + "C" + (g.left + i.x) + "," + (g.top + i.y) + "," + (h.left - j.x) + "," + (h.top - j.y) + "," + h.left + "," + h.top)
    }
    if (d) {
        b = b[l];
        f.push("M" + h.left + "," + h.top + "Q" + (h.left + j.x *
        2 / 3) + "," + (h.top + j.y * 2 / 3) + "," + b.left + "," + b.top)
    }
    return f
};
pv.SvgScene.cardinalTangents = function (b, c) {
    var d = [];
    c = (1 - c) / 2;
    for (var f = b[0], g = b[1], h = b[2], i = 3; i < b.length; i++) {
        d.push({x: c * (h.left - f.left), y: c * (h.top - f.top)});
        f = g;
        g = h;
        h = b[i]
    }
    d.push({x: c * (h.left - f.left), y: c * (h.top - f.top)});
    return d
};
pv.SvgScene.curveCardinal = function (b, c) {
    if (b.length <= 2)return "";
    return this.curveHermite(b, this.cardinalTangents(b, c))
};
pv.SvgScene.curveCardinalSegments = function (b, c) {
    if (b.length <= 2)return "";
    return this.curveHermiteSegments(b, this.cardinalTangents(b, c))
};
pv.SvgScene.monotoneTangents = function (b) {
    var c = [], d = [], f = [], g = [], h = 0;
    for (h = 0; h < b.length - 1; h++)d[h] = (b[h + 1].top - b[h].top) / (b[h + 1].left - b[h].left);
    f[0] = d[0];
    g[0] = b[1].left - b[0].left;
    for (h = 1; h < b.length - 1; h++) {
        f[h] = (d[h - 1] + d[h]) / 2;
        g[h] = (b[h + 1].left - b[h - 1].left) / 2
    }
    f[h] = d[h - 1];
    g[h] = b[h].left - b[h - 1].left;
    for (h = 0; h < b.length - 1; h++)if (d[h] == 0) {
        f[h] = 0;
        f[h + 1] = 0
    }
    for (h = 0; h < b.length - 1; h++)if (!(Math.abs(f[h]) < 1.0E-5 || Math.abs(f[h + 1]) < 1.0E-5)) {
        var i = f[h] / d[h], j = f[h + 1] / d[h], l = i * i + j * j;
        if (l > 9) {
            l = 3 / Math.sqrt(l);
            f[h] =
                l * i * d[h];
            f[h + 1] = l * j * d[h]
        }
    }
    for (h = 0; h < b.length; h++) {
        d = 1 + f[h] * f[h];
        c.push({x: g[h] / 3 / d, y: f[h] * g[h] / 3 / d})
    }
    return c
};
pv.SvgScene.curveMonotone = function (b) {
    if (b.length <= 2)return "";
    return this.curveHermite(b, this.monotoneTangents(b))
};
pv.SvgScene.curveMonotoneSegments = function (b) {
    if (b.length <= 2)return "";
    return this.curveHermiteSegments(b, this.monotoneTangents(b))
};
pv.SvgScene.area = function (b) {
    function c(o, n) {
        for (var m = [], r = [], s = n; o <= s; o++, n--) {
            var u = b[o], x = b[n];
            u = u.left + "," + u.top;
            x = x.left + x.width + "," + (x.top + x.height);
            if (o < s) {
                var t = b[o + 1], p = b[n - 1];
                switch (g.interpolate) {
                    case "step-before":
                        u += "V" + t.top;
                        x += "H" + (p.left + p.width);
                        break;
                    case "step-after":
                        u += "H" + t.left;
                        x += "V" + (p.top + p.height);
                        break
                }
            }
            m.push(u);
            r.push(x)
        }
        return m.concat(r).join("L")
    }

    function d(o, n) {
        for (var m = [], r = [], s = n; o <= s; o++, n--) {
            var u = b[n];
            m.push(b[o]);
            r.push({left: u.left + u.width, top: u.top + u.height})
        }
        if (g.interpolate ==
            "basis") {
            o = pv.SvgScene.curveBasis(m);
            n = pv.SvgScene.curveBasis(r)
        } else if (g.interpolate == "cardinal") {
            o = pv.SvgScene.curveCardinal(m, g.tension);
            n = pv.SvgScene.curveCardinal(r, g.tension)
        } else {
            o = pv.SvgScene.curveMonotone(m);
            n = pv.SvgScene.curveMonotone(r)
        }
        return m[0].left + "," + m[0].top + o + "L" + r[0].left + "," + r[0].top + n
    }

    var f = b.$g.firstChild;
    if (!b.length)return f;
    var g = b[0];
    if (g.segmented)return this.areaSegment(b);
    if (!g.visible)return f;
    var h = g.fillStyle, i = g.strokeStyle;
    if (!h.opacity && !i.opacity)return f;
    for (var j =
        [], l, k = 0; k < b.length; k++) {
        l = b[k];
        if (l.width || l.height) {
            for (var q = k + 1; q < b.length; q++) {
                l = b[q];
                if (!l.width && !l.height)break
            }
            k && g.interpolate != "step-after" && k--;
            q < b.length && g.interpolate != "step-before" && q++;
            j.push((q - k > 2 && (g.interpolate == "basis" || g.interpolate == "cardinal" || g.interpolate == "monotone") ? d : c)(k, q - 1));
            k = q - 1
        }
    }
    if (!j.length)return f;
    f = this.expect(f, "path", {
        "shape-rendering": g.antialias ? null : "crispEdges",
        "pointer-events": g.events,
        cursor: g.cursor,
        d: "M" + j.join("ZM") + "Z",
        fill: h.color,
        "fill-opacity": h.opacity ||
        null,
        stroke: i.color,
        "stroke-opacity": i.opacity || null,
        "stroke-width": i.opacity ? g.lineWidth / this.scale : null
    });
    return this.append(f, b, 0)
};
pv.SvgScene.areaSegment = function (b) {
    var c = b.$g.firstChild, d = b[0], f, g;
    if (d.interpolate == "basis" || d.interpolate == "cardinal" || d.interpolate == "monotone") {
        f = [];
        g = [];
        for (var h = 0, i = b.length; h < i; h++) {
            var j = b[i - h - 1];
            f.push(b[h]);
            g.push({left: j.left + j.width, top: j.top + j.height})
        }
        if (d.interpolate == "basis") {
            f = this.curveBasisSegments(f);
            g = this.curveBasisSegments(g)
        } else if (d.interpolate == "cardinal") {
            f = this.curveCardinalSegments(f, d.tension);
            g = this.curveCardinalSegments(g, d.tension)
        } else {
            f = this.curveMonotoneSegments(f);
            g = this.curveMonotoneSegments(g)
        }
    }
    h = 0;
    for (i = b.length - 1; h < i; h++) {
        d = b[h];
        var l = b[h + 1];
        if (d.visible && l.visible) {
            var k = d.fillStyle, q = d.strokeStyle;
            if (k.opacity || q.opacity) {
                if (f) {
                    j = f[h];
                    l = "L" + g[i - h - 1].substr(1);
                    j = j + l + "Z"
                } else {
                    var o = d;
                    j = l;
                    switch (d.interpolate) {
                        case "step-before":
                            o = l;
                            break;
                        case "step-after":
                            j = d;
                            break
                    }
                    j = "M" + d.left + "," + o.top + "L" + l.left + "," + j.top + "L" + (l.left + l.width) + "," + (j.top + j.height) + "L" + (d.left + d.width) + "," + (o.top + o.height) + "Z"
                }
                c = this.expect(c, "path", {
                    "shape-rendering": d.antialias ? null :
                        "crispEdges",
                    "pointer-events": d.events,
                    cursor: d.cursor,
                    d: j,
                    fill: k.color,
                    "fill-opacity": k.opacity || null,
                    stroke: q.color,
                    "stroke-opacity": q.opacity || null,
                    "stroke-width": q.opacity ? d.lineWidth / this.scale : null
                });
                c = this.append(c, b, h)
            }
        }
    }
    return c
};
pv.SvgScene.bar = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            var g = f.fillStyle, h = f.strokeStyle;
            if (g.opacity || h.opacity) {
                c = this.expect(c, "rect", {
                    "shape-rendering": f.antialias ? null : "crispEdges",
                    "pointer-events": f.events,
                    cursor: f.cursor,
                    x: f.left,
                    y: f.top,
                    width: Math.max(1.0E-10, f.width),
                    height: Math.max(1.0E-10, f.height),
                    fill: g.color,
                    "fill-opacity": g.opacity || null,
                    stroke: h.color,
                    "stroke-opacity": h.opacity || null,
                    "stroke-width": h.opacity ? f.lineWidth / this.scale : null
                });
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.SvgScene.dot = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            var g = f.fillStyle, h = f.strokeStyle;
            if (g.opacity || h.opacity) {
                var i = f.radius, j = null;
                switch (f.shape) {
                    case "cross":
                        j = "M" + -i + "," + -i + "L" + i + "," + i + "M" + i + "," + -i + "L" + -i + "," + i;
                        break;
                    case "triangle":
                        j = i;
                        var l = i * 1.1547;
                        j = "M0," + j + "L" + l + "," + -j + " " + -l + "," + -j + "Z";
                        break;
                    case "diamond":
                        i *= Math.SQRT2;
                        j = "M0," + -i + "L" + i + ",0 0," + i + " " + -i + ",0Z";
                        break;
                    case "square":
                        j = "M" + -i + "," + -i + "L" + i + "," + -i + " " + i + "," + i + " " + -i + "," + i + "Z";
                        break;
                    case "tick":
                        j = "M0,0L0," + -f.size;
                        break;
                    case "bar":
                        j = "M0," + f.size / 2 + "L0," + -(f.size / 2);
                        break
                }
                g = {
                    "shape-rendering": f.antialias ? null : "crispEdges",
                    "pointer-events": f.events,
                    cursor: f.cursor,
                    fill: g.color,
                    "fill-opacity": g.opacity || null,
                    stroke: h.color,
                    "stroke-opacity": h.opacity || null,
                    "stroke-width": h.opacity ? f.lineWidth / this.scale : null
                };
                if (j) {
                    g.transform = "translate(" + f.left + "," + f.top + ")";
                    if (f.angle)g.transform += " rotate(" + 180 * f.angle / Math.PI + ")";
                    g.d = j;
                    c = this.expect(c, "path", g)
                } else {
                    g.cx = f.left;
                    g.cy = f.top;
                    g.r =
                        i;
                    c = this.expect(c, "circle", g)
                }
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.SvgScene.image = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            c = this.fill(c, b, d);
            if (f.image) {
                c = this.expect(c, "foreignObject", {
                    cursor: f.cursor,
                    x: f.left,
                    y: f.top,
                    width: f.width,
                    height: f.height
                });
                var g = c.firstChild || c.appendChild(document.createElementNS(this.xhtml, "canvas"));
                g.$scene = {scenes: b, index: d};
                g.style.width = f.width;
                g.style.height = f.height;
                g.width = f.imageWidth;
                g.height = f.imageHeight;
                g.getContext("2d").putImageData(f.image, 0, 0)
            } else {
                c = this.expect(c, "image",
                    {
                        preserveAspectRatio: "none",
                        cursor: f.cursor,
                        x: f.left,
                        y: f.top,
                        width: f.width,
                        height: f.height
                    });
                c.setAttributeNS(this.xlink, "href", f.url)
            }
            c = this.append(c, b, d);
            c = this.stroke(c, b, d)
        }
    }
    return c
};
pv.SvgScene.label = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            var g = f.textStyle;
            if (g.opacity && f.text) {
                var h = 0, i = 0, j = 0, l = "start";
                switch (f.textBaseline) {
                    case "middle":
                        j = ".35em";
                        break;
                    case "top":
                        j = ".71em";
                        i = f.textMargin;
                        break;
                    case "bottom":
                        i = "-" + f.textMargin;
                        break
                }
                switch (f.textAlign) {
                    case "right":
                        l = "end";
                        h = "-" + f.textMargin;
                        break;
                    case "center":
                        l = "middle";
                        break;
                    case "left":
                        h = f.textMargin;
                        break
                }
                c = this.expect(c, "text", {
                    "pointer-events": f.events,
                    cursor: f.cursor,
                    x: h,
                    y: i,
                    dy: j,
                    transform: "translate(" + f.left + "," + f.top + ")" + (f.textAngle ? " rotate(" + 180 * f.textAngle / Math.PI + ")" : "") + (this.scale != 1 ? " scale(" + 1 / this.scale + ")" : ""),
                    fill: g.color,
                    "fill-opacity": g.opacity || null,
                    "text-anchor": l
                }, {font: f.font, "text-shadow": f.textShadow, "text-decoration": f.textDecoration});
                if (c.firstChild)c.firstChild.nodeValue = f.text; else c.appendChild(document.createTextNode(f.text));
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.SvgScene.line = function (b) {
    var c = b.$g.firstChild;
    if (b.length < 2)return c;
    var d = b[0];
    if (d.segmented)return this.lineSegment(b);
    if (!d.visible)return c;
    var f = d.fillStyle, g = d.strokeStyle;
    if (!f.opacity && !g.opacity)return c;
    var h = "M" + d.left + "," + d.top;
    if (b.length > 2 && (d.interpolate == "basis" || d.interpolate == "cardinal" || d.interpolate == "monotone"))switch (d.interpolate) {
        case "basis":
            h += this.curveBasis(b);
            break;
        case "cardinal":
            h += this.curveCardinal(b, d.tension);
            break;
        case "monotone":
            h += this.curveMonotone(b);
            break
    } else for (var i = 1; i < b.length; i++)h += this.pathSegment(b[i - 1], b[i]);
    c = this.expect(c, "path", {
        "shape-rendering": d.antialias ? null : "crispEdges",
        "pointer-events": d.events,
        cursor: d.cursor,
        d: h,
        fill: f.color,
        "fill-opacity": f.opacity || null,
        stroke: g.color,
        "stroke-opacity": g.opacity || null,
        "stroke-width": g.opacity ? d.lineWidth / this.scale : null,
        "stroke-linejoin": d.lineJoin
    });
    return this.append(c, b, 0)
};
pv.SvgScene.lineSegment = function (b) {
    var c = b.$g.firstChild, d = b[0], f;
    switch (d.interpolate) {
        case "basis":
            f = this.curveBasisSegments(b);
            break;
        case "cardinal":
            f = this.curveCardinalSegments(b, d.tension);
            break;
        case "monotone":
            f = this.curveMonotoneSegments(b);
            break
    }
    d = 0;
    for (var g = b.length - 1; d < g; d++) {
        var h = b[d], i = b[d + 1];
        if (h.visible && i.visible) {
            var j = h.strokeStyle, l = pv.Color.transparent;
            if (j.opacity) {
                if (h.interpolate == "linear" && h.lineJoin == "miter") {
                    l = j;
                    j = pv.Color.transparent;
                    i = this.pathJoin(b[d - 1], h, i, b[d + 2])
                } else i =
                    f ? f[d] : "M" + h.left + "," + h.top + this.pathSegment(h, i);
                c = this.expect(c, "path", {
                    "shape-rendering": h.antialias ? null : "crispEdges",
                    "pointer-events": h.events,
                    cursor: h.cursor,
                    d: i,
                    fill: l.color,
                    "fill-opacity": l.opacity || null,
                    stroke: j.color,
                    "stroke-opacity": j.opacity || null,
                    "stroke-width": j.opacity ? h.lineWidth / this.scale : null,
                    "stroke-linejoin": h.lineJoin
                });
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.SvgScene.pathSegment = function (b, c) {
    var d = 1;
    switch (b.interpolate) {
        case "polar-reverse":
            d = 0;
        case "polar":
            var f = c.left - b.left, g = c.top - b.top;
            b = 1 - b.eccentricity;
            f = Math.sqrt(f * f + g * g) / (2 * b);
            if (b <= 0 || b > 1)break;
            return "A" + f + "," + f + " 0 0," + d + " " + c.left + "," + c.top;
        case "step-before":
            return "V" + c.top + "H" + c.left;
        case "step-after":
            return "H" + c.left + "V" + c.top
    }
    return "L" + c.left + "," + c.top
};
pv.SvgScene.lineIntersect = function (b, c, d, f) {
    return b.plus(c.times(d.minus(b).dot(f.perp()) / c.dot(f.perp())))
};
pv.SvgScene.pathJoin = function (b, c, d, f) {
    var g = pv.vector(c.left, c.top);
    d = pv.vector(d.left, d.top);
    var h = d.minus(g), i = h.perp().norm(), j = i.times(c.lineWidth / (2 * this.scale));
    c = g.plus(j);
    var l = d.plus(j), k = d.minus(j);
    j = g.minus(j);
    if (b && b.visible) {
        b = g.minus(b.left, b.top).perp().norm().plus(i);
        j = this.lineIntersect(g, b, j, h);
        c = this.lineIntersect(g, b, c, h)
    }
    if (f && f.visible) {
        f = pv.vector(f.left, f.top).minus(d).perp().norm().plus(i);
        k = this.lineIntersect(d, f, k, h);
        l = this.lineIntersect(d, f, l, h)
    }
    return "M" + c.x + "," + c.y +
        "L" + l.x + "," + l.y + " " + k.x + "," + k.y + " " + j.x + "," + j.y
};
pv.SvgScene.panel = function (b) {
    for (var c = b.$g, d = c && c.firstChild, f = 0; f < b.length; f++) {
        var g = b[f];
        if (g.visible) {
            if (!b.parent) {
                g.canvas.style.display = "inline-block";
                if (c && c.parentNode != g.canvas)d = (c = g.canvas.firstChild) && c.firstChild;
                if (!c) {
                    c = g.canvas.appendChild(this.create("svg"));
                    c.setAttribute("font-size", "10px");
                    c.setAttribute("font-family", "sans-serif");
                    c.setAttribute("fill", "none");
                    c.setAttribute("stroke", "none");
                    c.setAttribute("stroke-width", 1.5);
                    for (var h = 0; h < this.events.length; h++)c.addEventListener(this.events[h],
                        this.dispatch, false);
                    d = c.firstChild
                }
                b.$g = c;
                c.setAttribute("width", g.width + g.left + g.right);
                c.setAttribute("height", g.height + g.top + g.bottom)
            }
            if (g.overflow == "hidden") {
                h = pv.id().toString(36);
                var i = this.expect(d, "g", {"clip-path": "url(#" + h + ")"});
                i.parentNode || c.appendChild(i);
                b.$g = c = i;
                d = i.firstChild;
                d = this.expect(d, "clipPath", {id: h});
                h = d.firstChild || d.appendChild(this.create("rect"));
                h.setAttribute("x", g.left);
                h.setAttribute("y", g.top);
                h.setAttribute("width", g.width);
                h.setAttribute("height", g.height);
                d.parentNode ||
                c.appendChild(d);
                d = d.nextSibling
            }
            d = this.fill(d, b, f);
            var j = this.scale, l = g.transform, k = g.left + l.x, q = g.top + l.y;
            this.scale *= l.k;
            for (h = 0; h < g.children.length; h++) {
                g.children[h].$g = d = this.expect(d, "g", {transform: "translate(" + k + "," + q + ")" + (l.k != 1 ? " scale(" + l.k + ")" : "")});
                this.updateAll(g.children[h]);
                d.parentNode || c.appendChild(d);
                d = d.nextSibling
            }
            this.scale = j;
            d = this.stroke(d, b, f);
            if (g.overflow == "hidden") {
                b.$g = c = i.parentNode;
                d = i.nextSibling
            }
        }
    }
    return d
};
pv.SvgScene.fill = function (b, c, d) {
    var f = c[d], g = f.fillStyle;
    if (g.opacity || f.events == "all") {
        b = this.expect(b, "rect", {
            "shape-rendering": f.antialias ? null : "crispEdges",
            "pointer-events": f.events,
            cursor: f.cursor,
            x: f.left,
            y: f.top,
            width: f.width,
            height: f.height,
            fill: g.color,
            "fill-opacity": g.opacity,
            stroke: null
        });
        b = this.append(b, c, d)
    }
    return b
};
pv.SvgScene.stroke = function (b, c, d) {
    var f = c[d], g = f.strokeStyle;
    if (g.opacity || f.events == "all") {
        b = this.expect(b, "rect", {
            "shape-rendering": f.antialias ? null : "crispEdges",
            "pointer-events": f.events == "all" ? "stroke" : f.events,
            cursor: f.cursor,
            x: f.left,
            y: f.top,
            width: Math.max(1.0E-10, f.width),
            height: Math.max(1.0E-10, f.height),
            fill: null,
            stroke: g.color,
            "stroke-opacity": g.opacity,
            "stroke-width": f.lineWidth / this.scale
        });
        b = this.append(b, c, d)
    }
    return b
};
pv.SvgScene.rule = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            var g = f.strokeStyle;
            if (g.opacity) {
                c = this.expect(c, "line", {
                    "shape-rendering": f.antialias ? null : "crispEdges",
                    "pointer-events": f.events,
                    cursor: f.cursor,
                    x1: f.left,
                    y1: f.top,
                    x2: f.left + f.width,
                    y2: f.top + f.height,
                    stroke: g.color,
                    "stroke-opacity": g.opacity,
                    "stroke-width": f.lineWidth / this.scale
                });
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.SvgScene.wedge = function (b) {
    for (var c = b.$g.firstChild, d = 0; d < b.length; d++) {
        var f = b[d];
        if (f.visible) {
            var g = f.fillStyle, h = f.strokeStyle;
            if (g.opacity || h.opacity) {
                var i = f.innerRadius, j = f.outerRadius, l = Math.abs(f.angle);
                if (l >= 2 * Math.PI)i = i ? "M0," + j + "A" + j + "," + j + " 0 1,1 0," + -j + "A" + j + "," + j + " 0 1,1 0," + j + "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "Z" : "M0," + j + "A" + j + "," + j + " 0 1,1 0," + -j + "A" + j + "," + j + " 0 1,1 0," + j + "Z"; else {
                    var k = Math.min(f.startAngle, f.endAngle), q = Math.max(f.startAngle, f.endAngle),
                        o = Math.cos(k), n = Math.cos(q);
                    k = Math.sin(k);
                    q = Math.sin(q);
                    i = i ? "M" + j * o + "," + j * k + "A" + j + "," + j + " 0 " + (l < Math.PI ? "0" : "1") + ",1 " + j * n + "," + j * q + "L" + i * n + "," + i * q + "A" + i + "," + i + " 0 " + (l < Math.PI ? "0" : "1") + ",0 " + i * o + "," + i * k + "Z" : "M" + j * o + "," + j * k + "A" + j + "," + j + " 0 " + (l < Math.PI ? "0" : "1") + ",1 " + j * n + "," + j * q + "L0,0Z"
                }
                c = this.expect(c, "path", {
                    "shape-rendering": f.antialias ? null : "crispEdges",
                    "pointer-events": f.events,
                    cursor: f.cursor,
                    transform: "translate(" + f.left + "," + f.top + ")",
                    d: i,
                    fill: g.color,
                    "fill-rule": "evenodd",
                    "fill-opacity": g.opacity ||
                    null,
                    stroke: h.color,
                    "stroke-opacity": h.opacity || null,
                    "stroke-width": h.opacity ? f.lineWidth / this.scale : null
                });
                c = this.append(c, b, d)
            }
        }
    }
    return c
};
pv.Mark = function () {
    this.$properties = [];
    this.$handlers = {}
};
pv.Mark.prototype.properties = {};
pv.Mark.cast = {};
pv.Mark.prototype.property = function (b, c) {
    if (!this.hasOwnProperty("properties"))this.properties = pv.extend(this.properties);
    this.properties[b] = true;
    pv.Mark.prototype.propertyMethod(b, false, pv.Mark.cast[b] = c);
    return this
};
pv.Mark.prototype.propertyMethod = function (b, c, d) {
    d || (d = pv.Mark.cast[b]);
    this[b] = function (f) {
        if (c && this.scene) {
            var g = this.scene.defs;
            if (arguments.length) {
                g[b] = {id: f == null ? 0 : pv.id(), value: f != null && d ? d(f) : f};
                return this
            }
            return g[b] ? g[b].value : null
        }
        if (arguments.length) {
            g = !c << 1 | typeof f == "function";
            this.propertyValue(b, g & 1 && d ? function () {
                var h = f.apply(this, arguments);
                return h != null ? d(h) : null
            } : f != null && d ? d(f) : f).type = g;
            return this
        }
        return this.instance()[b]
    }
};
pv.Mark.prototype.propertyValue = function (b, c) {
    var d = this.$properties;
    c = {name: b, id: pv.id(), value: c};
    for (var f = 0; f < d.length; f++)if (d[f].name == b) {
        d.splice(f, 1);
        break
    }
    d.push(c);
    return c
};
pv.Mark.prototype.property("data").property("visible", Boolean).property("left", Number).property("right", Number).property("top", Number).property("bottom", Number).property("cursor", String).property("title", String).property("reverse", Boolean).property("antialias", Boolean).property("events", String);
a = pv.Mark.prototype;
a.childIndex = -1;
a.index = -1;
a.scale = 1;
a.defaults = (new pv.Mark).data(function (b) {
    return [b]
}).visible(true).antialias(true).events("painted");
a.extend = function (b) {
    this.proto = b;
    return this
};
a.add = function (b) {
    return this.parent.add(b).extend(this)
};
a.def = function (b, c) {
    this.propertyMethod(b, true);
    return this[b](arguments.length > 1 ? c : null)
};
a.anchor = function (b) {
    function c(g) {
        for (var h = d, i = []; !(f = h.scene);) {
            g = g.parent;
            i.push({index: g.index, childIndex: h.childIndex});
            h = h.parent
        }
        for (; i.length;) {
            g = i.pop();
            f = f[g.index].children[g.childIndex]
        }
        if (d.hasOwnProperty("index")) {
            i = pv.extend(f[d.index]);
            i.right = i.top = i.left = i.bottom = 0;
            return [i]
        }
        return f
    }

    var d = this, f;
    b || (b = "center");
    return (new pv.Anchor(this)).name(b).def("$mark.anchor", function () {
        f = this.scene.target = c(this)
    }).data(function () {
        return f.map(function (g) {
            return g.data
        })
    }).visible(function () {
        return f[this.index].visible
    }).left(function () {
        var g =
            f[this.index], h = g.width || 0;
        switch (this.name()) {
            case "bottom":
            case "top":
            case "center":
                return g.left + h / 2;
            case "left":
                return null
        }
        return g.left + h
    }).top(function () {
        var g = f[this.index], h = g.height || 0;
        switch (this.name()) {
            case "left":
            case "right":
            case "center":
                return g.top + h / 2;
            case "top":
                return null
        }
        return g.top + h
    }).right(function () {
        var g = f[this.index];
        return this.name() == "left" ? g.right + (g.width || 0) : null
    }).bottom(function () {
        var g = f[this.index];
        return this.name() == "top" ? g.bottom + (g.height || 0) : null
    }).textAlign(function () {
        switch (this.name()) {
            case "bottom":
            case "top":
            case "center":
                return "center";
            case "right":
                return "right"
        }
        return "left"
    }).textBaseline(function () {
        switch (this.name()) {
            case "right":
            case "left":
            case "center":
                return "middle";
            case "top":
                return "top"
        }
        return "bottom"
    })
};
a.anchorTarget = function () {
    return this.proto.anchorTarget()
};
a.margin = function (b) {
    return this.left(b).right(b).top(b).bottom(b)
};
a.instance = function (b) {
    var c = this.scene || this.parent.instance(-1).children[this.childIndex], d = !arguments.length || this.hasOwnProperty("index") ? this.index : b;
    return c[d < 0 ? c.length - 1 : d]
};
a.first = function () {
    return this.scene[0]
};
a.last = function () {
    return this.scene[this.scene.length - 1]
};
a.sibling = function () {
    return this.index == 0 ? null : this.scene[this.index - 1]
};
a.cousin = function () {
    var b = this.parent;
    return (b = b && b.sibling()) && b.children ? b.children[this.childIndex][this.index] : null
};
a.render = function () {
    function b(i, j, l) {
        i.scale = l;
        if (j < g.length) {
            f.unshift(null);
            if (i.hasOwnProperty("index"))c(i, j, l); else {
                for (var k = 0, q = i.scene.length; k < q; k++) {
                    i.index = k;
                    c(i, j, l)
                }
                delete i.index
            }
            f.shift()
        } else {
            i.build();
            pv.Scene.scale = l;
            pv.Scene.updateAll(i.scene)
        }
        delete i.scale
    }

    function c(i, j, l) {
        var k = i.scene[i.index], q;
        if (k.visible) {
            var o = g[j], n = i.children[o];
            for (q = 0; q < o; q++)i.children[q].scene = k.children[q];
            f[0] = k.data;
            if (n.scene)b(n, j + 1, l * k.transform.k); else {
                n.scene = k.children[o];
                b(n, j + 1, l * k.transform.k);
                delete n.scene
            }
            for (q = 0; q < o; q++)delete i.children[q].scene
        }
    }

    var d = this.parent, f = pv.Mark.stack;
    if (d && !this.root.scene)this.root.render(); else {
        for (var g = [], h = this; h.parent; h = h.parent)g.unshift(h.childIndex);
        for (this.bind(); d && !d.hasOwnProperty("index");)d = d.parent;
        this.context(d ? d.scene : undefined, d ? d.index : -1, function () {
            b(this.root, 0, 1)
        })
    }
};
pv.Mark.stack = [];
a = pv.Mark.prototype;
a.bind = function () {
    function b(j) {
        do for (var l = j.$properties, k = l.length - 1; k >= 0; k--) {
            var q = l[k];
            if (!(q.name in c)) {
                c[q.name] = q;
                switch (q.name) {
                    case "data":
                        f = q;
                        break;
                    case "visible":
                        g = q;
                        break;
                    default:
                        d[q.type].push(q);
                        break
                }
            }
        } while (j = j.proto)
    }

    var c = {}, d = [[], [], [], []], f, g;
    b(this);
    b(this.defaults);
    d[1].reverse();
    d[3].reverse();
    var h = this;
    do for (var i in h.properties)i in c || d[2].push(c[i] = {name: i, type: 2, value: null}); while (h = h.proto);
    h = d[0].concat(d[1]);
    for (i = 0; i < h.length; i++)this.propertyMethod(h[i].name,
        true);
    this.binds = {properties: c, data: f, defs: h, required: [g], optional: pv.blend(d)}
};
a.build = function () {
    var b = this.scene, c = pv.Mark.stack;
    if (!b) {
        b = this.scene = [];
        b.mark = this;
        b.type = this.type;
        b.childIndex = this.childIndex;
        if (this.parent) {
            b.parent = this.parent.scene;
            b.parentIndex = this.parent.index
        }
    }
    if (this.binds.defs.length) {
        var d = b.defs;
        if (!d)b.defs = d = {};
        for (var f = 0; f < this.binds.defs.length; f++) {
            var g = this.binds.defs[f], h = d[g.name];
            if (!h || g.id > h.id)d[g.name] = {id: 0, value: g.type & 1 ? g.value.apply(this, c) : g.value}
        }
    }
    d = this.binds.data;
    d = d.type & 1 ? d.value.apply(this, c) : d.value;
    c.unshift(null);
    b.length = d.length;
    for (f = 0; f < d.length; f++) {
        pv.Mark.prototype.index = this.index = f;
        (g = b[f]) || (b[f] = g = {});
        g.data = c[0] = d[f];
        this.buildInstance(g)
    }
    pv.Mark.prototype.index = -1;
    delete this.index;
    c.shift();
    return this
};
a.buildProperties = function (b, c) {
    for (var d = 0, f = c.length; d < f; d++) {
        var g = c[d], h = g.value;
        switch (g.type) {
            case 0:
            case 1:
                h = this.scene.defs[g.name].value;
                break;
            case 3:
                h = h.apply(this, pv.Mark.stack);
                break
        }
        b[g.name] = h
    }
};
a.buildInstance = function (b) {
    this.buildProperties(b, this.binds.required);
    if (b.visible) {
        this.buildProperties(b, this.binds.optional);
        this.buildImplied(b)
    }
};
a.buildImplied = function (b) {
    var c = b.left, d = b.right, f = b.top, g = b.bottom, h = this.properties, i = h.width ? b.width : 0, j = h.height ? b.height : 0, l = this.parent ? this.parent.width() : i + c + d;
    if (i == null)i = l - (d = d || 0) - (c = c || 0); else if (d == null)d = l - i - (c = c || 0); else if (c == null)c = l - i - (d = d || 0);
    l = this.parent ? this.parent.height() : j + f + g;
    if (j == null)j = l - (f = f || 0) - (g = g || 0); else if (g == null)g = l - j - (f = f || 0); else if (f == null)f = l - j - (g = g || 0);
    b.left = c;
    b.right = d;
    b.top = f;
    b.bottom = g;
    if (h.width)b.width = i;
    if (h.height)b.height = j;
    if (h.textStyle && !b.textStyle)b.textStyle =
        pv.Color.transparent;
    if (h.fillStyle && !b.fillStyle)b.fillStyle = pv.Color.transparent;
    if (h.strokeStyle && !b.strokeStyle)b.strokeStyle = pv.Color.transparent
};
a.mouse = function () {
    var b = pv.event.pageX || 0, c = pv.event.pageY || 0, d = this.root.canvas();
    do {
        b -= d.offsetLeft;
        c -= d.offsetTop
    } while (d = d.offsetParent);
    d = pv.Transform.identity;
    var f = this.properties.transform ? this : this.parent, g = [];
    do g.push(f); while (f = f.parent);
    for (; f = g.pop();)d = d.translate(f.left(), f.top()).times(f.transform());
    d = d.invert();
    return pv.vector(b * d.k + d.x, c * d.k + d.y)
};
a.event = function (b, c) {
    this.$handlers[b] = pv.functor(c);
    return this
};
a.context = function (b, c, d) {
    function f(k, q) {
        pv.Mark.scene = k;
        h.index = q;
        if (k) {
            var o = k.mark, n = o, m = [];
            do {
                m.push(n);
                i.push(k[q].data);
                n.index = q;
                n.scene = k;
                q = k.parentIndex;
                k = k.parent
            } while (n = n.parent);
            k = m.length - 1;
            for (q = 1; k > 0; k--) {
                n = m[k];
                n.scale = q;
                q *= n.scene[n.index].transform.k
            }
            if (o.children) {
                k = 0;
                for (m = o.children.length; k < m; k++) {
                    n = o.children[k];
                    n.scene = o.scene[o.index].children[k];
                    n.scale = q
                }
            }
        }
    }

    function g(k) {
        if (k) {
            k = k.mark;
            var q;
            if (k.children)for (var o = 0, n = k.children.length; o < n; o++) {
                q = k.children[o];
                delete q.scene;
                delete q.scale
            }
            q = k;
            do {
                i.pop();
                if (q.parent) {
                    delete q.scene;
                    delete q.scale
                }
                delete q.index
            } while (q = q.parent)
        }
    }

    var h = pv.Mark.prototype, i = pv.Mark.stack, j = pv.Mark.scene, l = h.index;
    g(j, l);
    f(b, c);
    try {
        d.apply(this, i)
    } finally {
        g(b, c);
        f(j, l)
    }
};
pv.Mark.dispatch = function (b, c, d) {
    var f = c.mark, g = c.parent, h = f.$handlers[b];
    if (!h)return g && pv.Mark.dispatch(b, g, c.parentIndex);
    f.context(c, d, function () {
        (f = h.apply(f, pv.Mark.stack)) && f.render && f.render()
    });
    return true
};
pv.Anchor = function (b) {
    pv.Mark.call(this);
    this.target = b;
    this.parent = b.parent
};
pv.Anchor.prototype = pv.extend(pv.Mark).property("name", String);
pv.Anchor.prototype.anchorTarget = function () {
    return this.target
};
pv.Area = function () {
    pv.Mark.call(this)
};
pv.Area.prototype = pv.extend(pv.Mark).property("width", Number).property("height", Number).property("lineWidth", Number).property("strokeStyle", pv.color).property("fillStyle", pv.color).property("segmented", Boolean).property("interpolate", String).property("tension", Number);
pv.Area.prototype.type = "area";
pv.Area.prototype.defaults = (new pv.Area).extend(pv.Mark.prototype.defaults).lineWidth(1.5).fillStyle(pv.Colors.category20().by(pv.parent)).interpolate("linear").tension(0.7);
pv.Area.prototype.buildImplied = function (b) {
    if (b.height == null)b.height = 0;
    if (b.width == null)b.width = 0;
    pv.Mark.prototype.buildImplied.call(this, b)
};
pv.Area.fixed = {lineWidth: 1, lineJoin: 1, strokeStyle: 1, fillStyle: 1, segmented: 1, interpolate: 1, tension: 1};
pv.Area.prototype.bind = function () {
    pv.Mark.prototype.bind.call(this);
    var b = this.binds, c = b.required;
    b = b.optional;
    for (var d = 0, f = b.length; d < f; d++) {
        var g = b[d];
        g.fixed = g.name in pv.Area.fixed;
        if (g.name == "segmented") {
            c.push(g);
            b.splice(d, 1);
            d--;
            f--
        }
    }
    this.binds.$required = c;
    this.binds.$optional = b
};
pv.Area.prototype.buildInstance = function (b) {
    var c = this.binds;
    if (this.index) {
        var d = c.fixed;
        if (!d) {
            d = c.fixed = [];
            function f(i) {
                return !i.fixed || (d.push(i), false)
            }

            c.required = c.required.filter(f);
            if (!this.scene[0].segmented)c.optional = c.optional.filter(f)
        }
        c = 0;
        for (var g = d.length; c < g; c++) {
            var h = d[c].name;
            b[h] = this.scene[0][h]
        }
    } else {
        c.required = c.$required;
        c.optional = c.$optional;
        c.fixed = null
    }
    pv.Mark.prototype.buildInstance.call(this, b)
};
pv.Area.prototype.anchor = function (b) {
    var c;
    return pv.Mark.prototype.anchor.call(this, b).def("$area.anchor", function () {
        c = this.scene.target
    }).interpolate(function () {
        return c[this.index].interpolate
    }).eccentricity(function () {
        return c[this.index].eccentricity
    }).tension(function () {
        return c[this.index].tension
    })
};
pv.Bar = function () {
    pv.Mark.call(this)
};
pv.Bar.prototype = pv.extend(pv.Mark).property("width", Number).property("height", Number).property("lineWidth", Number).property("strokeStyle", pv.color).property("fillStyle", pv.color);
pv.Bar.prototype.type = "bar";
pv.Bar.prototype.defaults = (new pv.Bar).extend(pv.Mark.prototype.defaults).lineWidth(1.5).fillStyle(pv.Colors.category20().by(pv.parent));
pv.Dot = function () {
    pv.Mark.call(this)
};
pv.Dot.prototype = pv.extend(pv.Mark).property("size", Number).property("radius", Number).property("shape", String).property("angle", Number).property("lineWidth", Number).property("strokeStyle", pv.color).property("fillStyle", pv.color);
pv.Dot.prototype.type = "dot";
pv.Dot.prototype.defaults = (new pv.Dot).extend(pv.Mark.prototype.defaults).size(20).shape("circle").lineWidth(1.5).strokeStyle(pv.Colors.category10().by(pv.parent));
pv.Dot.prototype.anchor = function (b) {
    var c;
    return pv.Mark.prototype.anchor.call(this, b).def("$wedge.anchor", function () {
        c = this.scene.target
    }).left(function () {
        var d = c[this.index];
        switch (this.name()) {
            case "bottom":
            case "top":
            case "center":
                return d.left;
            case "left":
                return null
        }
        return d.left + d.radius
    }).right(function () {
        var d = c[this.index];
        return this.name() == "left" ? d.right + d.radius : null
    }).top(function () {
        var d = c[this.index];
        switch (this.name()) {
            case "left":
            case "right":
            case "center":
                return d.top;
            case "top":
                return null
        }
        return d.top +
            d.radius
    }).bottom(function () {
        var d = c[this.index];
        return this.name() == "top" ? d.bottom + d.radius : null
    }).textAlign(function () {
        switch (this.name()) {
            case "left":
                return "right";
            case "bottom":
            case "top":
            case "center":
                return "center"
        }
        return "left"
    }).textBaseline(function () {
        switch (this.name()) {
            case "right":
            case "left":
            case "center":
                return "middle";
            case "bottom":
                return "top"
        }
        return "bottom"
    })
};
pv.Dot.prototype.buildImplied = function (b) {
    if (b.radius == null)b.radius = Math.sqrt(b.size); else if (b.size == null)b.size = b.radius * b.radius;
    pv.Mark.prototype.buildImplied.call(this, b)
};
pv.Label = function () {
    pv.Mark.call(this)
};
pv.Label.prototype = pv.extend(pv.Mark).property("text", String).property("font", String).property("textAngle", Number).property("textStyle", pv.color).property("textAlign", String).property("textBaseline", String).property("textMargin", Number).property("textDecoration", String).property("textShadow", String);
pv.Label.prototype.type = "label";
pv.Label.prototype.defaults = (new pv.Label).extend(pv.Mark.prototype.defaults).events("none").text(pv.identity).font("10px sans-serif").textAngle(0).textStyle("black").textAlign("left").textBaseline("bottom").textMargin(3);
pv.Line = function () {
    pv.Mark.call(this)
};
pv.Line.prototype = pv.extend(pv.Mark).property("lineWidth", Number).property("lineJoin", String).property("strokeStyle", pv.color).property("fillStyle", pv.color).property("segmented", Boolean).property("interpolate", String).property("eccentricity", Number).property("tension", Number);
a = pv.Line.prototype;
a.type = "line";
a.defaults = (new pv.Line).extend(pv.Mark.prototype.defaults).lineJoin("miter").lineWidth(1.5).strokeStyle(pv.Colors.category10().by(pv.parent)).interpolate("linear").eccentricity(0).tension(0.7);
a.bind = pv.Area.prototype.bind;
a.buildInstance = pv.Area.prototype.buildInstance;
a.anchor = function (b) {
    return pv.Area.prototype.anchor.call(this, b).textAlign(function () {
        switch (this.name()) {
            case "left":
                return "right";
            case "bottom":
            case "top":
            case "center":
                return "center";
            case "right":
                return "left"
        }
    }).textBaseline(function () {
        switch (this.name()) {
            case "right":
            case "left":
            case "center":
                return "middle";
            case "top":
                return "bottom";
            case "bottom":
                return "top"
        }
    })
};
pv.Rule = function () {
    pv.Mark.call(this)
};
pv.Rule.prototype = pv.extend(pv.Mark).property("width", Number).property("height", Number).property("lineWidth", Number).property("strokeStyle", pv.color);
pv.Rule.prototype.type = "rule";
pv.Rule.prototype.defaults = (new pv.Rule).extend(pv.Mark.prototype.defaults).lineWidth(1).strokeStyle("black").antialias(false);
pv.Rule.prototype.anchor = pv.Line.prototype.anchor;
pv.Rule.prototype.buildImplied = function (b) {
    var c = b.left, d = b.right;
    if (b.width != null || c == null && d == null || d != null && c != null)b.height = 0; else b.width = 0;
    pv.Mark.prototype.buildImplied.call(this, b)
};
pv.Panel = function () {
    pv.Bar.call(this);
    this.children = [];
    this.root = this;
    this.$dom = pv.$ && pv.$.s
};
pv.Panel.prototype = pv.extend(pv.Bar).property("transform").property("overflow", String).property("canvas", function (b) {
    return typeof b == "string" ? document.getElementById(b) : b
});
a = pv.Panel.prototype;
a.type = "panel";
a.defaults = (new pv.Panel).extend(pv.Bar.prototype.defaults).fillStyle(null).overflow("visible");
a.anchor = function (b) {
    b = pv.Bar.prototype.anchor.call(this, b);
    b.parent = this;
    return b
};
a.add = function (b) {
    b = new b;
    b.parent = this;
    b.root = this.root;
    b.childIndex = this.children.length;
    this.children.push(b);
    return b
};
a.bind = function () {
    pv.Mark.prototype.bind.call(this);
    for (var b = 0; b < this.children.length; b++)this.children[b].bind()
};
a.buildInstance = function (b) {
    pv.Bar.prototype.buildInstance.call(this, b);
    if (b.visible) {
        if (!b.children)b.children = [];
        var c = this.scale * b.transform.k, d, f = this.children.length;
        pv.Mark.prototype.index = -1;
        for (var g = 0; g < f; g++) {
            d = this.children[g];
            d.scene = b.children[g];
            d.scale = c;
            d.build()
        }
        for (g = 0; g < f; g++) {
            d = this.children[g];
            b.children[g] = d.scene;
            delete d.scene;
            delete d.scale
        }
        b.children.length = f
    }
};
a.buildImplied = function (b) {
    if (!this.parent) {
        var c = b.canvas;
        if (c) {
            if (c.$panel != this)for (c.$panel = this; c.lastChild;)c.removeChild(c.lastChild);
            var d;
            if (b.width == null) {
                d = parseFloat(pv.css(c, "width"));
                b.width = d - b.left - b.right
            }
            if (b.height == null) {
                d = parseFloat(pv.css(c, "height"));
                b.height = d - b.top - b.bottom
            }
        } else {
            d = this.$canvas || (this.$canvas = []);
            if (!(c = d[this.index])) {
                c = d[this.index] = document.createElement("span");
                if (this.$dom)this.$dom.parentNode.insertBefore(c, this.$dom); else {
                    for (d = document.body; d.lastChild &&
                    d.lastChild.tagName;)d = d.lastChild;
                    if (d != document.body)d = d.parentNode;
                    d.appendChild(c)
                }
            }
        }
        b.canvas = c
    }
    if (!b.transform)b.transform = pv.Transform.identity;
    pv.Mark.prototype.buildImplied.call(this, b)
};
pv.Image = function () {
    pv.Bar.call(this)
};
pv.Image.prototype = pv.extend(pv.Bar).property("url", String).property("imageWidth", Number).property("imageHeight", Number);
a = pv.Image.prototype;
a.type = "image";
a.defaults = (new pv.Image).extend(pv.Bar.prototype.defaults).fillStyle(null);
a.image = function (b) {
    this.$image = function () {
        var c = b.apply(this, arguments);
        return c == null ? pv.Color.transparent : typeof c == "string" ? pv.color(c) : c
    };
    return this
};
a.bind = function () {
    pv.Bar.prototype.bind.call(this);
    var b = this.binds, c = this;
    do b.image = c.$image; while (!b.image && (c = c.proto))
};
a.buildImplied = function (b) {
    pv.Bar.prototype.buildImplied.call(this, b);
    if (b.visible) {
        if (b.imageWidth == null)b.imageWidth = b.width;
        if (b.imageHeight == null)b.imageHeight = b.height;
        if (b.url == null && this.binds.image) {
            var c = this.$canvas || (this.$canvas = document.createElement("canvas")), d = c.getContext("2d"), f = b.imageWidth, g = b.imageHeight, h = pv.Mark.stack;
            c.width = f;
            c.height = g;
            b = (b.image = d.createImageData(f, g)).data;
            h.unshift(null, null);
            for (d = c = 0; c < g; c++) {
                h[1] = c;
                for (var i = 0; i < f; i++) {
                    h[0] = i;
                    var j = this.binds.image.apply(this,
                        h);
                    b[d++] = j.r;
                    b[d++] = j.g;
                    b[d++] = j.b;
                    b[d++] = 255 * j.a
                }
            }
            h.splice(0, 2)
        }
    }
};
pv.Wedge = function () {
    pv.Mark.call(this)
};
pv.Wedge.prototype = pv.extend(pv.Mark).property("startAngle", Number).property("endAngle", Number).property("angle", Number).property("innerRadius", Number).property("outerRadius", Number).property("lineWidth", Number).property("strokeStyle", pv.color).property("fillStyle", pv.color);
a = pv.Wedge.prototype;
a.type = "wedge";
a.defaults = (new pv.Wedge).extend(pv.Mark.prototype.defaults).startAngle(function () {
    var b = this.sibling();
    return b ? b.endAngle : -Math.PI / 2
}).innerRadius(0).lineWidth(1.5).strokeStyle(null).fillStyle(pv.Colors.category20().by(pv.index));
a.midRadius = function () {
    return (this.innerRadius() + this.outerRadius()) / 2
};
a.midAngle = function () {
    return (this.startAngle() + this.endAngle()) / 2
};
a.anchor = function (b) {
    function c(h) {
        return h.innerRadius || h.angle < 2 * Math.PI
    }

    function d(h) {
        return (h.innerRadius + h.outerRadius) / 2
    }

    function f(h) {
        return (h.startAngle + h.endAngle) / 2
    }

    var g;
    return pv.Mark.prototype.anchor.call(this, b).def("$wedge.anchor", function () {
        g = this.scene.target
    }).left(function () {
        var h = g[this.index];
        if (c(h))switch (this.name()) {
            case "outer":
                return h.left + h.outerRadius * Math.cos(f(h));
            case "inner":
                return h.left + h.innerRadius * Math.cos(f(h));
            case "start":
                return h.left + d(h) * Math.cos(h.startAngle);
            case "center":
                return h.left + d(h) * Math.cos(f(h));
            case "end":
                return h.left + d(h) * Math.cos(h.endAngle)
        }
        return h.left
    }).top(function () {
        var h = g[this.index];
        if (c(h))switch (this.name()) {
            case "outer":
                return h.top + h.outerRadius * Math.sin(f(h));
            case "inner":
                return h.top + h.innerRadius * Math.sin(f(h));
            case "start":
                return h.top + d(h) * Math.sin(h.startAngle);
            case "center":
                return h.top + d(h) * Math.sin(f(h));
            case "end":
                return h.top + d(h) * Math.sin(h.endAngle)
        }
        return h.top
    }).textAlign(function () {
        var h = g[this.index];
        if (c(h))switch (this.name()) {
            case "outer":
                return pv.Wedge.upright(f(h)) ?
                    "right" : "left";
            case "inner":
                return pv.Wedge.upright(f(h)) ? "left" : "right"
        }
        return "center"
    }).textBaseline(function () {
        var h = g[this.index];
        if (c(h))switch (this.name()) {
            case "start":
                return pv.Wedge.upright(h.startAngle) ? "top" : "bottom";
            case "end":
                return pv.Wedge.upright(h.endAngle) ? "bottom" : "top"
        }
        return "middle"
    }).textAngle(function () {
        var h = g[this.index], i = 0;
        if (c(h))switch (this.name()) {
            case "center":
            case "inner":
            case "outer":
                i = f(h);
                break;
            case "start":
                i = h.startAngle;
                break;
            case "end":
                i = h.endAngle;
                break
        }
        return pv.Wedge.upright(i) ?
            i : i + Math.PI
    })
};
pv.Wedge.upright = function (b) {
    b %= 2 * Math.PI;
    b = b < 0 ? 2 * Math.PI + b : b;
    return b < Math.PI / 2 || b >= 3 * Math.PI / 2
};
pv.Wedge.prototype.buildImplied = function (b) {
    if (b.angle == null)b.angle = b.endAngle - b.startAngle; else if (b.endAngle == null)b.endAngle = b.startAngle + b.angle;
    pv.Mark.prototype.buildImplied.call(this, b)
};
pv.simulation = function (b) {
    return new pv.Simulation(b)
};
pv.Simulation = function (b) {
    for (var c = 0; c < b.length; c++)this.particle(b[c])
};
a = pv.Simulation.prototype;
a.particle = function (b) {
    b.next = this.particles;
    if (isNaN(b.px))b.px = b.x;
    if (isNaN(b.py))b.py = b.y;
    if (isNaN(b.fx))b.fx = 0;
    if (isNaN(b.fy))b.fy = 0;
    this.particles = b;
    return this
};
a.force = function (b) {
    b.next = this.forces;
    this.forces = b;
    return this
};
a.constraint = function (b) {
    b.next = this.constraints;
    this.constraints = b;
    return this
};
a.stabilize = function (b) {
    var c;
    arguments.length || (b = 3);
    for (var d = 0; d < b; d++) {
        var f = new pv.Quadtree(this.particles);
        for (c = this.constraints; c; c = c.next)c.apply(this.particles, f)
    }
    for (c = this.particles; c; c = c.next) {
        c.px = c.x;
        c.py = c.y
    }
    return this
};
a.step = function () {
    var b;
    for (b = this.particles; b; b = b.next) {
        var c = b.px, d = b.py;
        b.px = b.x;
        b.py = b.y;
        b.x += b.vx = b.x - c + b.fx;
        b.y += b.vy = b.y - d + b.fy
    }
    c = new pv.Quadtree(this.particles);
    for (b = this.constraints; b; b = b.next)b.apply(this.particles, c);
    for (b = this.particles; b; b = b.next)b.fx = b.fy = 0;
    for (b = this.forces; b; b = b.next)b.apply(this.particles, c)
};
pv.Quadtree = function (b) {
    function c(k, q, o, n, m, r) {
        if (!(isNaN(q.x) || isNaN(q.y)))if (k.leaf)if (k.p) {
            if (!(Math.abs(k.p.x - q.x) + Math.abs(k.p.y - q.y) < 0.01)) {
                var s = k.p;
                k.p = null;
                d(k, s, o, n, m, r)
            }
            d(k, q, o, n, m, r)
        } else k.p = q; else d(k, q, o, n, m, r)
    }

    function d(k, q, o, n, m, r) {
        var s = (o + m) * 0.5, u = (n + r) * 0.5, x = q.x >= s, t = q.y >= u;
        k.leaf = false;
        switch ((t << 1) + x) {
            case 0:
                k = k.c1 || (k.c1 = new pv.Quadtree.Node);
                break;
            case 1:
                k = k.c2 || (k.c2 = new pv.Quadtree.Node);
                break;
            case 2:
                k = k.c3 || (k.c3 = new pv.Quadtree.Node);
                break;
            case 3:
                k = k.c4 || (k.c4 = new pv.Quadtree.Node);
                break
        }
        if (x)o = s; else m = s;
        if (t)n = u; else r = u;
        c(k, q, o, n, m, r)
    }

    var f, g = Number.POSITIVE_INFINITY, h = g, i = Number.NEGATIVE_INFINITY, j = i;
    for (f = b; f; f = f.next) {
        if (f.x < g)g = f.x;
        if (f.y < h)h = f.y;
        if (f.x > i)i = f.x;
        if (f.y > j)j = f.y
    }
    f = i - g;
    var l = j - h;
    if (f > l)j = h + f; else i = g + l;
    this.xMin = g;
    this.yMin = h;
    this.xMax = i;
    this.yMax = j;
    this.root = new pv.Quadtree.Node;
    for (f = b; f; f = f.next)c(this.root, f, g, h, i, j)
};
pv.Quadtree.Node = function () {
    this.leaf = true;
    this.p = this.c4 = this.c3 = this.c2 = this.c1 = null
};
pv.Force = {};
pv.Force.charge = function (b) {
    function c(k) {
        function q(m) {
            c(m);
            k.cn += m.cn;
            o += m.cn * m.cx;
            n += m.cn * m.cy
        }

        var o = 0, n = 0;
        k.cn = 0;
        if (!k.leaf) {
            k.c1 && q(k.c1);
            k.c2 && q(k.c2);
            k.c3 && q(k.c3);
            k.c4 && q(k.c4)
        }
        if (k.p) {
            k.cn += b;
            o += b * k.p.x;
            n += b * k.p.y
        }
        k.cx = o / k.cn;
        k.cy = n / k.cn
    }

    function d(k, q, o, n, m, r) {
        var s = k.cx - q.x, u = k.cy - q.y, x = 1 / Math.sqrt(s * s + u * u);
        if (k.leaf && k.p != q || (m - o) * x < j) {
            if (!(x < i)) {
                if (x > g)x = g;
                k = k.cn * x * x * x;
                s = s * k;
                u = u * k;
                q.fx += s;
                q.fy += u
            }
        } else if (!k.leaf) {
            var t = (o + m) * 0.5, p = (n + r) * 0.5;
            k.c1 && d(k.c1, q, o, n, t, p);
            k.c2 && d(k.c2, q, t, n,
                m, p);
            k.c3 && d(k.c3, q, o, p, t, r);
            k.c4 && d(k.c4, q, t, p, m, r);
            if (!(x < i)) {
                if (x > g)x = g;
                if (k.p && k.p != q) {
                    k = b * x * x * x;
                    s = s * k;
                    u = u * k;
                    q.fx += s;
                    q.fy += u
                }
            }
        }
    }

    var f = 2, g = 1 / f, h = 500, i = 1 / h, j = 0.9, l = {};
    arguments.length || (b = -40);
    l.constant = function (k) {
        if (arguments.length) {
            b = Number(k);
            return l
        }
        return b
    };
    l.domain = function (k, q) {
        if (arguments.length) {
            f = Number(k);
            g = 1 / f;
            h = Number(q);
            i = 1 / h;
            return l
        }
        return [f, h]
    };
    l.theta = function (k) {
        if (arguments.length) {
            j = Number(k);
            return l
        }
        return j
    };
    l.apply = function (k, q) {
        c(q.root);
        for (k = k; k; k = k.next)d(q.root,
            k, q.xMin, q.yMin, q.xMax, q.yMax)
    };
    return l
};
pv.Force.drag = function (b) {
    var c = {};
    arguments.length || (b = 0.1);
    c.constant = function (d) {
        if (arguments.length) {
            b = d;
            return c
        }
        return b
    };
    c.apply = function (d) {
        if (b)for (d = d; d; d = d.next) {
            d.fx -= b * d.vx;
            d.fy -= b * d.vy
        }
    };
    return c
};
pv.Force.spring = function (b) {
    var c = 0.1, d = 20, f, g, h = {};
    arguments.length || (b = 0.1);
    h.links = function (i) {
        if (arguments.length) {
            f = i;
            g = i.map(function (j) {
                return 1 / Math.sqrt(Math.max(j.sourceNode.linkDegree, j.targetNode.linkDegree))
            });
            return h
        }
        return f
    };
    h.constant = function (i) {
        if (arguments.length) {
            b = Number(i);
            return h
        }
        return b
    };
    h.damping = function (i) {
        if (arguments.length) {
            c = Number(i);
            return h
        }
        return c
    };
    h.length = function (i) {
        if (arguments.length) {
            d = Number(i);
            return h
        }
        return d
    };
    h.apply = function () {
        for (var i = 0; i < f.length; i++) {
            var j =
                f[i].sourceNode, l = f[i].targetNode, k = j.x - l.x, q = j.y - l.y, o = Math.sqrt(k * k + q * q), n = o ? 1 / o : 1;
            n = (b * g[i] * (o - d) + c * g[i] * (k * (j.vx - l.vx) + q * (j.vy - l.vy)) * n) * n;
            k = -n * (o ? k : 0.01 * (0.5 - Math.random()));
            q = -n * (o ? q : 0.01 * (0.5 - Math.random()));
            j.fx += k;
            j.fy += q;
            l.fx -= k;
            l.fy -= q
        }
    };
    return h
};
pv.Constraint = {};
pv.Constraint.collision = function (b) {
    function c(k, q, o, n, m, r) {
        if (!k.leaf) {
            var s = (o + m) * 0.5, u = (n + r) * 0.5, x = u < j, t = s > g, p = s < i;
            if (u > h) {
                k.c1 && t && c(k.c1, q, o, n, s, u);
                k.c2 && p && c(k.c2, q, s, n, m, u)
            }
            if (x) {
                k.c3 && t && c(k.c3, q, o, u, s, r);
                k.c4 && p && c(k.c4, q, s, u, m, r)
            }
        }
        if (k.p && k.p != q) {
            o = q.x - k.p.x;
            n = q.y - k.p.y;
            m = Math.sqrt(o * o + n * n);
            r = f + b(k.p);
            if (m < r) {
                m = (m - r) / m * 0.5;
                o *= m;
                n *= m;
                q.x -= o;
                q.y -= n;
                k.p.x += o;
                k.p.y += n
            }
        }
    }

    var d = 1, f, g, h, i, j, l = {};
    arguments.length || (f = 10);
    l.repeat = function (k) {
        if (arguments.length) {
            d = Number(k);
            return l
        }
        return d
    };
    l.apply =
        function (k, q) {
            var o, n, m = -Infinity;
            for (o = k; o; o = o.next) {
                n = b(o);
                if (n > m)m = n
            }
            for (var r = 0; r < d; r++)for (o = k; o; o = o.next) {
                n = (f = b(o)) + m;
                g = o.x - n;
                i = o.x + n;
                h = o.y - n;
                j = o.y + n;
                c(q.root, o, q.xMin, q.yMin, q.xMax, q.yMax)
            }
        };
    return l
};
pv.Constraint.position = function (b) {
    var c = 1, d = {};
    arguments.length || (b = function (f) {
        return f.fix
    });
    d.alpha = function (f) {
        if (arguments.length) {
            c = Number(f);
            return d
        }
        return c
    };
    d.apply = function (f) {
        for (f = f; f; f = f.next) {
            var g = b(f);
            if (g) {
                f.x += (g.x - f.x) * c;
                f.y += (g.y - f.y) * c;
                f.fx = f.fy = f.vx = f.vy = 0
            }
        }
    };
    return d
};
pv.Constraint.bound = function () {
    var b = {}, c, d;
    b.x = function (f, g) {
        if (arguments.length) {
            c = {min: Math.min(f, g), max: Math.max(f, g)};
            return this
        }
        return c
    };
    b.y = function (f, g) {
        if (arguments.length) {
            d = {min: Math.min(f, g), max: Math.max(f, g)};
            return this
        }
        return d
    };
    b.apply = function (f) {
        if (c)for (var g = f; g; g = g.next)g.x = g.x < c.min ? c.min : g.x > c.max ? c.max : g.x;
        if (d)for (g = f; g; g = g.next)g.y = g.y < d.min ? d.min : g.y > d.max ? d.max : g.y
    };
    return b
};
pv.Layout = function () {
    pv.Panel.call(this)
};
pv.Layout.prototype = pv.extend(pv.Panel);
pv.Layout.prototype.property = function (b, c) {
    if (!this.hasOwnProperty("properties"))this.properties = pv.extend(this.properties);
    this.properties[b] = true;
    this.propertyMethod(b, false, pv.Mark.cast[b] = c);
    return this
};
pv.Layout.Network = function () {
    pv.Layout.call(this);
    var b = this;
    this.$id = pv.id();
    (this.node = (new pv.Mark).data(function () {
        return b.nodes()
    }).strokeStyle("#1f77b4").fillStyle("#fff").left(function (c) {
        return c.x
    }).top(function (c) {
        return c.y
    })).parent = this;
    this.link = (new pv.Mark).extend(this.node).data(function (c) {
        return [c.sourceNode, c.targetNode]
    }).fillStyle(null).lineWidth(function (c, d) {
        return d.linkValue * 1.5
    }).strokeStyle("rgba(0,0,0,.2)");
    this.link.add = function (c) {
        return b.add(pv.Panel).data(function () {
            return b.links()
        }).add(c).extend(this)
    };
    (this.label = (new pv.Mark).extend(this.node).textMargin(7).textBaseline("middle").text(function (c) {
        return c.nodeName || c.nodeValue
    }).textAngle(function (c) {
        c = c.midAngle;
        return pv.Wedge.upright(c) ? c : c + Math.PI
    }).textAlign(function (c) {
        return pv.Wedge.upright(c.midAngle) ? "left" : "right"
    })).parent = this
};
pv.Layout.Network.prototype = pv.extend(pv.Layout).property("nodes", function (b) {
    return b.map(function (c, d) {
        if (typeof c != "object")c = {nodeValue: c};
        c.index = d;
        c.linkDegree = 0;
        return c
    })
}).property("links", function (b) {
    return b.map(function (c) {
        if (isNaN(c.linkValue))c.linkValue = isNaN(c.value) ? 1 : c.value;
        return c
    })
});
pv.Layout.Network.prototype.reset = function () {
    this.$id = pv.id();
    return this
};
pv.Layout.Network.prototype.buildProperties = function (b, c) {
    if ((b.$id || 0) < this.$id)pv.Layout.prototype.buildProperties.call(this, b, c)
};
pv.Layout.Network.prototype.buildImplied = function (b) {
    pv.Layout.prototype.buildImplied.call(this, b);
    if (b.$id >= this.$id)return true;
    b.$id = this.$id;
    b.links.forEach(function (c) {
        var d = c.linkValue;
        (c.sourceNode || (c.sourceNode = b.nodes[c.source])).linkDegree += d;
        (c.targetNode || (c.targetNode = b.nodes[c.target])).linkDegree += d
    })
};
pv.Layout.Hierarchy = function () {
    pv.Layout.Network.call(this);
    this.link.strokeStyle("#ccc")
};
pv.Layout.Hierarchy.prototype = pv.extend(pv.Layout.Network);
pv.Layout.Hierarchy.prototype.buildImplied = function (b) {
    if (!b.links)b.links = pv.Layout.Hierarchy.links.call(this);
    pv.Layout.Network.prototype.buildImplied.call(this, b)
};
pv.Layout.Hierarchy.links = function () {
    return this.nodes().filter(function (b) {
        return b.parentNode
    }).map(function (b) {
        return {sourceNode: b, targetNode: b.parentNode, linkValue: 1}
    })
};
pv.Layout.Hierarchy.NodeLink = {
    buildImplied: function (b) {
        function c(m) {
            return m.parentNode ? m.depth * (o - q) + q : 0
        }

        function d(m) {
            return m.parentNode ? (m.breadth - 0.25) * 2 * Math.PI : 0
        }

        function f(m) {
            switch (i) {
                case "left":
                    return m.depth * l;
                case "right":
                    return l - m.depth * l;
                case "top":
                    return m.breadth * l;
                case "bottom":
                    return l - m.breadth * l;
                case "radial":
                    return l / 2 + c(m) * Math.cos(m.midAngle)
            }
        }

        function g(m) {
            switch (i) {
                case "left":
                    return m.breadth * k;
                case "right":
                    return k - m.breadth * k;
                case "top":
                    return m.depth * k;
                case "bottom":
                    return k -
                        m.depth * k;
                case "radial":
                    return k / 2 + c(m) * Math.sin(m.midAngle)
            }
        }

        var h = b.nodes, i = b.orient, j = /^(top|bottom)$/.test(i), l = b.width, k = b.height;
        if (i == "radial") {
            var q = b.innerRadius, o = b.outerRadius;
            if (q == null)q = 0;
            if (o == null)o = Math.min(l, k) / 2
        }
        for (b = 0; b < h.length; b++) {
            var n = h[b];
            n.midAngle = i == "radial" ? d(n) : j ? Math.PI / 2 : 0;
            n.x = f(n);
            n.y = g(n);
            if (n.firstChild)n.midAngle += Math.PI
        }
    }
};
pv.Layout.Hierarchy.Fill = {
    constructor: function () {
        this.node.strokeStyle("#fff").fillStyle("#ccc").width(function (b) {
            return b.dx
        }).height(function (b) {
            return b.dy
        }).innerRadius(function (b) {
            return b.innerRadius
        }).outerRadius(function (b) {
            return b.outerRadius
        }).startAngle(function (b) {
            return b.startAngle
        }).angle(function (b) {
            return b.angle
        });
        this.label.textAlign("center").left(function (b) {
            return b.x + b.dx / 2
        }).top(function (b) {
            return b.y + b.dy / 2
        });
        delete this.link
    }, buildImplied: function (b) {
        function c(p, v) {
            return (p +
                v) / (1 + v)
        }

        function d(p) {
            switch (o) {
                case "left":
                    return c(p.minDepth, s) * m;
                case "right":
                    return (1 - c(p.maxDepth, s)) * m;
                case "top":
                    return p.minBreadth * m;
                case "bottom":
                    return (1 - p.maxBreadth) * m;
                case "radial":
                    return m / 2
            }
        }

        function f(p) {
            switch (o) {
                case "left":
                    return p.minBreadth * r;
                case "right":
                    return (1 - p.maxBreadth) * r;
                case "top":
                    return c(p.minDepth, s) * r;
                case "bottom":
                    return (1 - c(p.maxDepth, s)) * r;
                case "radial":
                    return r / 2
            }
        }

        function g(p) {
            switch (o) {
                case "left":
                case "right":
                    return (p.maxDepth - p.minDepth) / (1 + s) * m;
                case "top":
                case "bottom":
                    return (p.maxBreadth -
                        p.minBreadth) * m;
                case "radial":
                    return p.parentNode ? (p.innerRadius + p.outerRadius) * Math.cos(p.midAngle) : 0
            }
        }

        function h(p) {
            switch (o) {
                case "left":
                case "right":
                    return (p.maxBreadth - p.minBreadth) * r;
                case "top":
                case "bottom":
                    return (p.maxDepth - p.minDepth) / (1 + s) * r;
                case "radial":
                    return p.parentNode ? (p.innerRadius + p.outerRadius) * Math.sin(p.midAngle) : 0
            }
        }

        function i(p) {
            return Math.max(0, c(p.minDepth, s / 2)) * (x - u) + u
        }

        function j(p) {
            return c(p.maxDepth, s / 2) * (x - u) + u
        }

        function l(p) {
            return (p.parentNode ? p.minBreadth - 0.25 : 0) *
                2 * Math.PI
        }

        function k(p) {
            return (p.parentNode ? p.maxBreadth - p.minBreadth : 1) * 2 * Math.PI
        }

        var q = b.nodes, o = b.orient, n = /^(top|bottom)$/.test(o), m = b.width, r = b.height, s = -q[0].minDepth;
        if (o == "radial") {
            var u = b.innerRadius, x = b.outerRadius;
            if (u == null)u = 0;
            if (u)s *= 2;
            if (x == null)x = Math.min(m, r) / 2
        }
        for (b = 0; b < q.length; b++) {
            var t = q[b];
            t.x = d(t);
            t.y = f(t);
            if (o == "radial") {
                t.innerRadius = i(t);
                t.outerRadius = j(t);
                t.startAngle = l(t);
                t.angle = k(t);
                t.midAngle = t.startAngle + t.angle / 2
            } else t.midAngle = n ? -Math.PI / 2 : 0;
            t.dx = g(t);
            t.dy = h(t)
        }
    }
};
pv.Layout.Grid = function () {
    pv.Layout.call(this);
    var b = this;
    (this.cell = (new pv.Mark).data(function () {
        return b.scene[b.index].$grid
    }).width(function () {
        return b.width() / b.cols()
    }).height(function () {
        return b.height() / b.rows()
    }).left(function () {
        return this.width() * (this.index % b.cols())
    }).top(function () {
        return this.height() * Math.floor(this.index / b.cols())
    })).parent = this
};
pv.Layout.Grid.prototype = pv.extend(pv.Layout).property("rows").property("cols");
pv.Layout.Grid.prototype.defaults = (new pv.Layout.Grid).extend(pv.Layout.prototype.defaults).rows(1).cols(1);
pv.Layout.Grid.prototype.buildImplied = function (b) {
    pv.Layout.prototype.buildImplied.call(this, b);
    var c = b.rows, d = b.cols;
    if (typeof d == "object")c = pv.transpose(d);
    if (typeof c == "object") {
        b.$grid = pv.blend(c);
        b.rows = c.length;
        b.cols = c[0] ? c[0].length : 0
    } else b.$grid = pv.repeat([b.data], c * d)
};
pv.Layout.Stack = function () {
    function b(i) {
        return function () {
            return f[i](this.parent.index, this.index)
        }
    }

    pv.Layout.call(this);
    var c = this, d = function () {
        return null
    }, f = {t: d, l: d, r: d, b: d, w: d, h: d}, g, h = c.buildImplied;
    this.buildImplied = function (i) {
        h.call(this, i);
        var j = i.layers, l = j.length, k, q = i.orient, o = /^(top|bottom)\b/.test(q), n = this.parent[o ? "height" : "width"](), m = [], r = [], s = [], u = pv.Mark.stack, x = {parent: {parent: this}};
        u.unshift(null);
        g = [];
        for (var t = 0; t < l; t++) {
            s[t] = [];
            r[t] = [];
            x.parent.index = t;
            u[0] = j[t];
            g[t] =
                this.$values.apply(x.parent, u);
            if (!t)k = g[t].length;
            u.unshift(null);
            for (var p = 0; p < k; p++) {
                u[0] = g[t][p];
                x.index = p;
                t || (m[p] = this.$x.apply(x, u));
                s[t][p] = this.$y.apply(x, u)
            }
            u.shift()
        }
        u.shift();
        switch (i.order) {
            case "inside-out":
                var v = s.map(function (A) {
                    return pv.max.index(A)
                });
                x = pv.range(l).sort(function (A, D) {
                    return v[A] - v[D]
                });
                j = s.map(function (A) {
                    return pv.sum(A)
                });
                var w = u = 0, y = [], z = [];
                for (t = 0; t < l; t++) {
                    p = x[t];
                    if (u < w) {
                        u += j[p];
                        y.push(p)
                    } else {
                        w += j[p];
                        z.push(p)
                    }
                }
                j = z.reverse().concat(y);
                break;
            case "reverse":
                j =
                    pv.range(l - 1, -1, -1);
                break;
            default:
                j = pv.range(l);
                break
        }
        switch (i.offset) {
            case "silohouette":
                for (p = 0; p < k; p++) {
                    for (t = x = 0; t < l; t++)x += s[t][p];
                    r[j[0]][p] = (n - x) / 2
                }
                break;
            case "wiggle":
                for (t = x = 0; t < l; t++)x += s[t][0];
                r[j[0]][0] = x = (n - x) / 2;
                for (p = 1; p < k; p++) {
                    u = n = 0;
                    w = m[p] - m[p - 1];
                    for (t = 0; t < l; t++)n += s[t][p];
                    for (t = 0; t < l; t++) {
                        y = (s[j[t]][p] - s[j[t]][p - 1]) / (2 * w);
                        for (i = 0; i < t; i++)y += (s[j[i]][p] - s[j[i]][p - 1]) / w;
                        u += y * s[j[t]][p]
                    }
                    r[j[0]][p] = x -= n ? u / n * w : 0
                }
                break;
            case "expand":
                for (p = 0; p < k; p++) {
                    for (t = i = r[j[0]][p] = 0; t < l; t++)i += s[t][p];
                    if (i) {
                        i = n / i;
                        for (t = 0; t < l; t++)s[t][p] *= i
                    } else {
                        i = n / l;
                        for (t = 0; t < l; t++)s[t][p] = i
                    }
                }
                break;
            default:
                for (p = 0; p < k; p++)r[j[0]][p] = 0;
                break
        }
        for (p = 0; p < k; p++) {
            x = r[j[0]][p];
            for (t = 1; t < l; t++) {
                x += s[j[t - 1]][p];
                r[j[t]][p] = x
            }
        }
        t = q.indexOf("-");
        l = o ? "h" : "w";
        o = t < 0 ? o ? "l" : "b" : q.charAt(t + 1);
        q = q.charAt(0);
        for (var C in f)f[C] = d;
        f[o] = function (A, D) {
            return m[D]
        };
        f[q] = function (A, D) {
            return r[A][D]
        };
        f[l] = function (A, D) {
            return s[A][D]
        }
    };
    this.layer = (new pv.Mark).data(function () {
        return g[this.parent.index]
    }).top(b("t")).left(b("l")).right(b("r")).bottom(b("b")).width(b("w")).height(b("h"));
    this.layer.add = function (i) {
        return c.add(pv.Panel).data(function () {
            return c.layers()
        }).add(i).extend(this)
    }
};
pv.Layout.Stack.prototype = pv.extend(pv.Layout).property("orient", String).property("offset", String).property("order", String).property("layers");
a = pv.Layout.Stack.prototype;
a.defaults = (new pv.Layout.Stack).extend(pv.Layout.prototype.defaults).orient("bottom-left").offset("zero").layers([[]]);
a.$x = pv.Layout.Stack.prototype.$y = function () {
    return 0
};
a.x = function (b) {
    this.$x = pv.functor(b);
    return this
};
a.y = function (b) {
    this.$y = pv.functor(b);
    return this
};
a.$values = pv.identity;
a.values = function (b) {
    this.$values = pv.functor(b);
    return this
};
pv.Layout.Treemap = function () {
    pv.Layout.Hierarchy.call(this);
    this.node.strokeStyle("#fff").fillStyle("rgba(31, 119, 180, .25)").width(function (b) {
        return b.dx
    }).height(function (b) {
        return b.dy
    });
    this.label.visible(function (b) {
        return !b.firstChild
    }).left(function (b) {
        return b.x + b.dx / 2
    }).top(function (b) {
        return b.y + b.dy / 2
    }).textAlign("center").textAngle(function (b) {
        return b.dx > b.dy ? 0 : -Math.PI / 2
    });
    (this.leaf = (new pv.Mark).extend(this.node).fillStyle(null).strokeStyle(null).visible(function (b) {
        return !b.firstChild
    })).parent =
        this;
    delete this.link
};
pv.Layout.Treemap.prototype = pv.extend(pv.Layout.Hierarchy).property("round", Boolean).property("paddingLeft", Number).property("paddingRight", Number).property("paddingTop", Number).property("paddingBottom", Number).property("mode", String).property("order", String);
a = pv.Layout.Treemap.prototype;
a.defaults = (new pv.Layout.Treemap).extend(pv.Layout.Hierarchy.prototype.defaults).mode("squarify").order("ascending");
a.padding = function (b) {
    return this.paddingLeft(b).paddingRight(b).paddingTop(b).paddingBottom(b)
};
a.$size = function (b) {
    return Number(b.nodeValue)
};
a.size = function (b) {
    this.$size = pv.functor(b);
    return this
};
a.buildImplied = function (b) {
    function c(r, s, u, x, t, p, v) {
        for (var w = 0, y = 0; w < r.length; w++) {
            var z = r[w];
            if (u) {
                z.x = x + y;
                z.y = t;
                y += z.dx = n(p * z.size / s);
                z.dy = v
            } else {
                z.x = x;
                z.y = t + y;
                z.dx = p;
                y += z.dy = n(v * z.size / s)
            }
        }
        if (z)if (u)z.dx += p - y; else z.dy += v - y
    }

    function d(r, s) {
        for (var u = -Infinity, x = Infinity, t = 0, p = 0; p < r.length; p++) {
            var v = r[p].size;
            if (v < x)x = v;
            if (v > u)u = v;
            t += v
        }
        t *= t;
        s *= s;
        return Math.max(s * u / t, t / (s * x))
    }

    function f(r, s) {
        function u(A) {
            var D = p == y, G = pv.sum(A, o), E = y ? n(G / y) : 0;
            c(A, G, D, x, t, D ? p : E, D ? E : v);
            if (D) {
                t += E;
                v -= E
            } else {
                x +=
                    E;
                p -= E
            }
            y = Math.min(p, v);
            return D
        }

        var x = r.x + j, t = r.y + k, p = r.dx - j - l, v = r.dy - k - q;
        if (m != "squarify")c(r.childNodes, r.size, m == "slice" ? true : m == "dice" ? false : s & 1, x, t, p, v); else {
            var w = [];
            s = Infinity;
            var y = Math.min(p, v), z = p * v / r.size;
            if (!(r.size <= 0)) {
                r.visitBefore(function (A) {
                    A.size *= z
                });
                for (r = r.childNodes.slice(); r.length;) {
                    var C = r[r.length - 1];
                    if (C.size) {
                        w.push(C);
                        z = d(w, y);
                        if (z <= s) {
                            r.pop();
                            s = z
                        } else {
                            w.pop();
                            u(w);
                            w.length = 0;
                            s = Infinity
                        }
                    } else r.pop()
                }
                if (u(w))for (s = 0; s < w.length; s++)w[s].dy += v; else for (s = 0; s < w.length; s++)w[s].dx +=
                    p
            }
        }
    }

    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var g = this, h = b.nodes[0], i = pv.Mark.stack, j = b.paddingLeft, l = b.paddingRight, k = b.paddingTop, q = b.paddingBottom, o = function (r) {
            return r.size
        }, n = b.round ? Math.round : Number, m = b.mode;
        i.unshift(null);
        h.visitAfter(function (r, s) {
            r.depth = s;
            r.x = r.y = r.dx = r.dy = 0;
            r.size = r.firstChild ? pv.sum(r.childNodes, function (u) {
                return u.size
            }) : g.$size.apply(g, (i[0] = r, i))
        });
        i.shift();
        switch (b.order) {
            case "ascending":
                h.sort(function (r, s) {
                    return r.size - s.size
                });
                break;
            case "descending":
                h.sort(function (r, s) {
                    return s.size - r.size
                });
                break;
            case "reverse":
                h.reverse();
                break
        }
        h.x = 0;
        h.y = 0;
        h.dx = b.width;
        h.dy = b.height;
        h.visitBefore(f)
    }
};
pv.Layout.Tree = function () {
    pv.Layout.Hierarchy.call(this)
};
pv.Layout.Tree.prototype = pv.extend(pv.Layout.Hierarchy).property("group", Number).property("breadth", Number).property("depth", Number).property("orient", String);
pv.Layout.Tree.prototype.defaults = (new pv.Layout.Tree).extend(pv.Layout.Hierarchy.prototype.defaults).group(1).breadth(15).depth(60).orient("top");
pv.Layout.Tree.prototype.buildImplied = function (b) {
    function c(p) {
        var v, w, y;
        if (p.firstChild) {
            v = p.firstChild;
            w = p.lastChild;
            for (var z = y = v; z; z = z.nextSibling) {
                c(z);
                y = f(z, y)
            }
            j(p);
            w = 0.5 * (v.prelim + w.prelim);
            if (v = p.previousSibling) {
                p.prelim = v.prelim + k(p.depth, true);
                p.mod = p.prelim - w
            } else p.prelim = w
        } else if (v = p.previousSibling)p.prelim = v.prelim + k(p.depth, true)
    }

    function d(p, v, w) {
        p.breadth = p.prelim + v;
        v += p.mod;
        for (p = p.firstChild; p; p = p.nextSibling)d(p, v, w)
    }

    function f(p, v) {
        var w = p.previousSibling;
        if (w) {
            var y = p, z =
                p, C = w;
            w = p.parentNode.firstChild;
            var A = y.mod, D = z.mod, G = C.mod, E = w.mod;
            C = h(C);
            for (y = g(y); C && y;) {
                C = C;
                y = y;
                w = g(w);
                z = h(z);
                z.ancestor = p;
                var B = C.prelim + G - (y.prelim + A) + k(C.depth, false);
                if (B > 0) {
                    i(l(C, p, v), p, B);
                    A += B;
                    D += B
                }
                G += C.mod;
                A += y.mod;
                E += w.mod;
                D += z.mod;
                C = h(C);
                y = g(y)
            }
            if (C && !h(z)) {
                z.thread = C;
                z.mod += G - D
            }
            if (y && !g(w)) {
                w.thread = y;
                w.mod += A - E;
                v = p
            }
        }
        return v
    }

    function g(p) {
        return p.firstChild || p.thread
    }

    function h(p) {
        return p.lastChild || p.thread
    }

    function i(p, v, w) {
        var y = v.number - p.number;
        v.change -= w / y;
        v.shift += w;
        p.change +=
            w / y;
        v.prelim += w;
        v.mod += w
    }

    function j(p) {
        var v = 0, w = 0;
        for (p = p.lastChild; p; p = p.previousSibling) {
            p.prelim += v;
            p.mod += v;
            w += p.change;
            v += p.shift + w
        }
    }

    function l(p, v, w) {
        return p.ancestor.parentNode == v.parentNode ? p.ancestor : w
    }

    function k(p, v) {
        return (v ? 1 : u + 1) / (m == "radial" ? p : 1)
    }

    function q(p) {
        return m == "radial" ? p.breadth / r : 0
    }

    function o(p) {
        switch (m) {
            case "left":
                return p.depth;
            case "right":
                return x - p.depth;
            case "top":
            case "bottom":
                return p.breadth + x / 2;
            case "radial":
                return x / 2 + p.depth * Math.cos(q(p))
        }
    }

    function n(p) {
        switch (m) {
            case "left":
            case "right":
                return p.breadth +
                    t / 2;
            case "top":
                return p.depth;
            case "bottom":
                return t - p.depth;
            case "radial":
                return t / 2 + p.depth * Math.sin(q(p))
        }
    }

    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var m = b.orient, r = b.depth, s = b.breadth, u = b.group, x = b.width, t = b.height;
        b = b.nodes[0];
        b.visitAfter(function (p, v) {
            p.ancestor = p;
            p.prelim = 0;
            p.mod = 0;
            p.change = 0;
            p.shift = 0;
            p.number = p.previousSibling ? p.previousSibling.number + 1 : 0;
            p.depth = v
        });
        c(b);
        d(b, -b.prelim, 0);
        b.visitAfter(function (p) {
            p.breadth *= s;
            p.depth *= r;
            p.midAngle = q(p);
            p.x = o(p);
            p.y = n(p);
            if (p.firstChild)p.midAngle += Math.PI;
            delete p.breadth;
            delete p.depth;
            delete p.ancestor;
            delete p.prelim;
            delete p.mod;
            delete p.change;
            delete p.shift;
            delete p.number;
            delete p.thread
        })
    }
};
pv.Layout.Indent = function () {
    pv.Layout.Hierarchy.call(this);
    this.link.interpolate("step-after")
};
pv.Layout.Indent.prototype = pv.extend(pv.Layout.Hierarchy).property("depth", Number).property("breadth", Number);
pv.Layout.Indent.prototype.defaults = (new pv.Layout.Indent).extend(pv.Layout.Hierarchy.prototype.defaults).depth(15).breadth(15);
pv.Layout.Indent.prototype.buildImplied = function (b) {
    function c(i, j, l) {
        i.x = g + l++ * f;
        i.y = h + j++ * d;
        i.midAngle = 0;
        for (i = i.firstChild; i; i = i.nextSibling)j = c(i, j, l);
        return j
    }

    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var d = b.breadth, f = b.depth, g = 0, h = 0;
        c(b.nodes[0], 1, 1)
    }
};
pv.Layout.Pack = function () {
    pv.Layout.Hierarchy.call(this);
    this.node.radius(function (b) {
        return b.radius
    }).strokeStyle("rgb(31, 119, 180)").fillStyle("rgba(31, 119, 180, .25)");
    this.label.textAlign("center");
    delete this.link
};
pv.Layout.Pack.prototype = pv.extend(pv.Layout.Hierarchy).property("spacing", Number).property("order", String);
pv.Layout.Pack.prototype.defaults = (new pv.Layout.Pack).extend(pv.Layout.Hierarchy.prototype.defaults).spacing(1).order("ascending");
pv.Layout.Pack.prototype.$radius = function () {
    return 1
};
pv.Layout.Pack.prototype.size = function (b) {
    this.$radius = typeof b == "function" ? function () {
        return Math.sqrt(b.apply(this, arguments))
    } : (b = Math.sqrt(b), function () {
        return b
    });
    return this
};
pv.Layout.Pack.prototype.buildImplied = function (b) {
    function c(o) {
        var n = pv.Mark.stack;
        n.unshift(null);
        for (var m = 0, r = o.length; m < r; m++) {
            var s = o[m];
            if (!s.firstChild)s.radius = i.$radius.apply(i, (n[0] = s, n))
        }
        n.shift()
    }

    function d(o) {
        var n = [];
        for (o = o.firstChild; o; o = o.nextSibling) {
            if (o.firstChild)o.radius = d(o);
            o.n = o.p = o;
            n.push(o)
        }
        switch (b.order) {
            case "ascending":
                n.sort(function (m, r) {
                    return m.radius - r.radius
                });
                break;
            case "descending":
                n.sort(function (m, r) {
                    return r.radius - m.radius
                });
                break;
            case "reverse":
                n.reverse();
                break
        }
        return f(n)
    }

    function f(o) {
        function n(B) {
            u = Math.min(B.x - B.radius, u);
            x = Math.max(B.x + B.radius, x);
            t = Math.min(B.y - B.radius, t);
            p = Math.max(B.y + B.radius, p)
        }

        function m(B, F) {
            var H = B.n;
            B.n = F;
            F.p = B;
            F.n = H;
            H.p = F
        }

        function r(B, F) {
            B.n = F;
            F.p = B
        }

        function s(B, F) {
            var H = F.x - B.x, I = F.y - B.y;
            B = B.radius + F.radius;
            return B * B - H * H - I * I > 0.0010
        }

        var u = Infinity, x = -Infinity, t = Infinity, p = -Infinity, v, w, y, z, C;
        v = o[0];
        v.x = -v.radius;
        v.y = 0;
        n(v);
        if (o.length > 1) {
            w = o[1];
            w.x = w.radius;
            w.y = 0;
            n(w);
            if (o.length > 2) {
                y = o[2];
                g(v, w, y);
                n(y);
                m(v, y);
                v.p =
                    y;
                m(y, w);
                w = v.n;
                for (var A = 3; A < o.length; A++) {
                    g(v, w, y = o[A]);
                    var D = 0, G = 1, E = 1;
                    for (z = w.n; z != w; z = z.n, G++)if (s(z, y)) {
                        D = 1;
                        break
                    }
                    if (D == 1)for (C = v.p; C != z.p; C = C.p, E++)if (s(C, y)) {
                        if (E < G) {
                            D = -1;
                            z = C
                        }
                        break
                    }
                    if (D == 0) {
                        m(v, y);
                        w = y;
                        n(y)
                    } else if (D > 0) {
                        r(v, z);
                        w = z;
                        A--
                    } else if (D < 0) {
                        r(z, w);
                        v = z;
                        A--
                    }
                }
            }
        }
        v = (u + x) / 2;
        w = (t + p) / 2;
        for (A = y = 0; A < o.length; A++) {
            z = o[A];
            z.x -= v;
            z.y -= w;
            y = Math.max(y, z.radius + Math.sqrt(z.x * z.x + z.y * z.y))
        }
        return y + b.spacing
    }

    function g(o, n, m) {
        var r = n.radius + m.radius, s = o.radius + m.radius, u = n.x - o.x;
        n = n.y - o.y;
        var x = Math.sqrt(u *
        u + n * n), t = (s * s + x * x - r * r) / (2 * s * x);
        r = Math.acos(t);
        t = t * s;
        s = Math.sin(r) * s;
        u /= x;
        n /= x;
        m.x = o.x + t * u + s * n;
        m.y = o.y + t * n - s * u
    }

    function h(o, n, m, r) {
        for (var s = o.firstChild; s; s = s.nextSibling) {
            s.x += o.x;
            s.y += o.y;
            h(s, n, m, r)
        }
        o.x = n + r * o.x;
        o.y = m + r * o.y;
        o.radius *= r
    }

    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var i = this, j = b.nodes, l = j[0];
        c(j);
        l.x = 0;
        l.y = 0;
        l.radius = d(l);
        j = this.width();
        var k = this.height(), q = 1 / Math.max(2 * l.radius / j, 2 * l.radius / k);
        h(l, j / 2, k / 2, q)
    }
};
pv.Layout.Force = function () {
    pv.Layout.Network.call(this);
    this.link.lineWidth(function (b, c) {
        return Math.sqrt(c.linkValue) * 1.5
    });
    this.label.textAlign("center")
};
pv.Layout.Force.prototype = pv.extend(pv.Layout.Network).property("bound", Boolean).property("iterations", Number).property("dragConstant", Number).property("chargeConstant", Number).property("chargeMinDistance", Number).property("chargeMaxDistance", Number).property("chargeTheta", Number).property("springConstant", Number).property("springDamping", Number).property("springLength", Number);
pv.Layout.Force.prototype.defaults = (new pv.Layout.Force).extend(pv.Layout.Network.prototype.defaults).dragConstant(0.1).chargeConstant(-40).chargeMinDistance(2).chargeMaxDistance(500).chargeTheta(0.9).springConstant(0.1).springDamping(0.3).springLength(20);
pv.Layout.Force.prototype.buildImplied = function (b) {
    function c(q) {
        return q.fix ? 1 : q.vx * q.vx + q.vy * q.vy
    }

    if (pv.Layout.Network.prototype.buildImplied.call(this, b)) {
        if (b = b.$force) {
            b.next = this.binds.$force;
            this.binds.$force = b
        }
    } else {
        for (var d = this, f = b.nodes, g = b.links, h = b.iterations, i = b.width, j = b.height, l = 0, k; l < f.length; l++) {
            k = f[l];
            if (isNaN(k.x))k.x = i / 2 + 40 * Math.random() - 20;
            if (isNaN(k.y))k.y = j / 2 + 40 * Math.random() - 20
        }
        k = pv.simulation(f);
        k.force(pv.Force.drag(b.dragConstant));
        k.force(pv.Force.charge(b.chargeConstant).domain(b.chargeMinDistance,
            b.chargeMaxDistance).theta(b.chargeTheta));
        k.force(pv.Force.spring(b.springConstant).damping(b.springDamping).length(b.springLength).links(g));
        k.constraint(pv.Constraint.position());
        b.bound && k.constraint(pv.Constraint.bound().x(6, i - 6).y(6, j - 6));
        if (h == null) {
            k.step();
            k.step();
            b.$force = this.binds.$force = {next: this.binds.$force, nodes: f, min: 1.0E-4 * (g.length + 1), sim: k};
            if (!this.$timer)this.$timer = setInterval(function () {
                for (var q = false, o = d.binds.$force; o; o = o.next)if (pv.max(o.nodes, c) > o.min) {
                    o.sim.step();
                    q = true
                }
                q && d.render()
            }, 42)
        } else for (l = 0; l < h; l++)k.step()
    }
};
pv.Layout.Cluster = function () {
    pv.Layout.Hierarchy.call(this);
    var b, c = this.buildImplied;
    this.buildImplied = function (d) {
        c.call(this, d);
        b = /^(top|bottom)$/.test(d.orient) ? "step-before" : /^(left|right)$/.test(d.orient) ? "step-after" : "linear"
    };
    this.link.interpolate(function () {
        return b
    })
};
pv.Layout.Cluster.prototype = pv.extend(pv.Layout.Hierarchy).property("group", Number).property("orient", String).property("innerRadius", Number).property("outerRadius", Number);
pv.Layout.Cluster.prototype.defaults = (new pv.Layout.Cluster).extend(pv.Layout.Hierarchy.prototype.defaults).group(0).orient("top");
pv.Layout.Cluster.prototype.buildImplied = function (b) {
    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var c = b.nodes[0], d = b.group, f, g, h = 0, i = 0.5 - d / 2, j = undefined;
        c.visitAfter(function (l) {
            if (l.firstChild)l.depth = 1 + pv.max(l.childNodes, function (k) {
                return k.depth
            }); else {
                if (d && j != l.parentNode) {
                    j = l.parentNode;
                    h += d
                }
                h++;
                l.depth = 0
            }
        });
        f = 1 / h;
        g = 1 / c.depth;
        j = undefined;
        c.visitAfter(function (l) {
            if (l.firstChild)l.breadth = pv.mean(l.childNodes, function (k) {
                return k.breadth
            }); else {
                if (d && j != l.parentNode) {
                    j = l.parentNode;
                    i += d
                }
                l.breadth = f * i++
            }
            l.depth = 1 - l.depth * g
        });
        c.visitAfter(function (l) {
            l.minBreadth = l.firstChild ? l.firstChild.minBreadth : l.breadth - f / 2;
            l.maxBreadth = l.firstChild ? l.lastChild.maxBreadth : l.breadth + f / 2
        });
        c.visitBefore(function (l) {
            l.minDepth = l.parentNode ? l.parentNode.maxDepth : 0;
            l.maxDepth = l.parentNode ? l.depth + c.depth : l.minDepth + 2 * c.depth
        });
        c.minDepth = -g;
        pv.Layout.Hierarchy.NodeLink.buildImplied.call(this, b)
    }
};
pv.Layout.Cluster.Fill = function () {
    pv.Layout.Cluster.call(this);
    pv.Layout.Hierarchy.Fill.constructor.call(this)
};
pv.Layout.Cluster.Fill.prototype = pv.extend(pv.Layout.Cluster);
pv.Layout.Cluster.Fill.prototype.buildImplied = function (b) {
    pv.Layout.Cluster.prototype.buildImplied.call(this, b) || pv.Layout.Hierarchy.Fill.buildImplied.call(this, b)
};
pv.Layout.Partition = function () {
    pv.Layout.Hierarchy.call(this)
};
pv.Layout.Partition.prototype = pv.extend(pv.Layout.Hierarchy).property("order", String).property("orient", String).property("innerRadius", Number).property("outerRadius", Number);
pv.Layout.Partition.prototype.defaults = (new pv.Layout.Partition).extend(pv.Layout.Hierarchy.prototype.defaults).orient("top");
pv.Layout.Partition.prototype.$size = function () {
    return 1
};
pv.Layout.Partition.prototype.size = function (b) {
    this.$size = b;
    return this
};
pv.Layout.Partition.prototype.buildImplied = function (b) {
    if (!pv.Layout.Hierarchy.prototype.buildImplied.call(this, b)) {
        var c = this, d = b.nodes[0], f = pv.Mark.stack, g = 0;
        f.unshift(null);
        d.visitAfter(function (i, j) {
            if (j > g)g = j;
            i.size = i.firstChild ? pv.sum(i.childNodes, function (l) {
                return l.size
            }) : c.$size.apply(c, (f[0] = i, f))
        });
        f.shift();
        switch (b.order) {
            case "ascending":
                d.sort(function (i, j) {
                    return i.size - j.size
                });
                break;
            case "descending":
                d.sort(function (i, j) {
                    return j.size - i.size
                });
                break
        }
        var h = 1 / g;
        d.minBreadth = 0;
        d.breadth =
            0.5;
        d.maxBreadth = 1;
        d.visitBefore(function (i) {
            for (var j = i.minBreadth, l = i.maxBreadth - j, k = i.firstChild; k; k = k.nextSibling) {
                k.minBreadth = j;
                k.maxBreadth = j += k.size / i.size * l;
                k.breadth = (j + k.minBreadth) / 2
            }
        });
        d.visitAfter(function (i, j) {
            i.minDepth = (j - 1) * h;
            i.maxDepth = i.depth = j * h
        });
        pv.Layout.Hierarchy.NodeLink.buildImplied.call(this, b)
    }
};
pv.Layout.Partition.Fill = function () {
    pv.Layout.Partition.call(this);
    pv.Layout.Hierarchy.Fill.constructor.call(this)
};
pv.Layout.Partition.Fill.prototype = pv.extend(pv.Layout.Partition);
pv.Layout.Partition.Fill.prototype.buildImplied = function (b) {
    pv.Layout.Partition.prototype.buildImplied.call(this, b) || pv.Layout.Hierarchy.Fill.buildImplied.call(this, b)
};
pv.Layout.Arc = function () {
    pv.Layout.Network.call(this);
    var b, c, d, f = this.buildImplied;
    this.buildImplied = function (g) {
        f.call(this, g);
        c = g.directed;
        b = g.orient == "radial" ? "linear" : "polar";
        d = g.orient == "right" || g.orient == "top"
    };
    this.link.data(function (g) {
        var h = g.sourceNode;
        g = g.targetNode;
        return d != (c || h.breadth < g.breadth) ? [h, g] : [g, h]
    }).interpolate(function () {
        return b
    })
};
pv.Layout.Arc.prototype = pv.extend(pv.Layout.Network).property("orient", String).property("directed", Boolean);
pv.Layout.Arc.prototype.defaults = (new pv.Layout.Arc).extend(pv.Layout.Network.prototype.defaults).orient("bottom");
pv.Layout.Arc.prototype.sort = function (b) {
    this.$sort = b;
    return this
};
pv.Layout.Arc.prototype.buildImplied = function (b) {
    function c(m) {
        switch (h) {
            case "top":
                return -Math.PI / 2;
            case "bottom":
                return Math.PI / 2;
            case "left":
                return Math.PI;
            case "right":
                return 0;
            case "radial":
                return (m - 0.25) * 2 * Math.PI
        }
    }

    function d(m) {
        switch (h) {
            case "top":
            case "bottom":
                return m * l;
            case "left":
                return 0;
            case "right":
                return l;
            case "radial":
                return l / 2 + q * Math.cos(c(m))
        }
    }

    function f(m) {
        switch (h) {
            case "top":
                return 0;
            case "bottom":
                return k;
            case "left":
            case "right":
                return m * k;
            case "radial":
                return k / 2 + q * Math.sin(c(m))
        }
    }

    if (!pv.Layout.Network.prototype.buildImplied.call(this, b)) {
        var g = b.nodes, h = b.orient, i = this.$sort, j = pv.range(g.length), l = b.width, k = b.height, q = Math.min(l, k) / 2;
        i && j.sort(function (m, r) {
            return i(g[m], g[r])
        });
        for (b = 0; b < g.length; b++) {
            var o = g[j[b]], n = o.breadth = (b + 0.5) / g.length;
            o.x = d(n);
            o.y = f(n);
            o.midAngle = c(n)
        }
    }
};
pv.Layout.Horizon = function () {
    pv.Layout.call(this);
    var b = this, c, d, f, g, h, i, j = this.buildImplied;
    this.buildImplied = function (l) {
        j.call(this, l);
        c = l.bands;
        d = l.mode;
        f = Math.round((d == "color" ? 0.5 : 1) * l.height);
        g = l.backgroundStyle;
        h = pv.ramp(g, l.negativeStyle).domain(0, c);
        i = pv.ramp(g, l.positiveStyle).domain(0, c)
    };
    c = (new pv.Panel).data(function () {
        return pv.range(c * 2)
    }).overflow("hidden").height(function () {
        return f
    }).top(function (l) {
        return d == "color" ? (l & 1) * f : 0
    }).fillStyle(function (l) {
        return l ? null : g
    });
    this.band =
        (new pv.Mark).top(function (l, k) {
            return d == "mirror" && k & 1 ? (k + 1 >> 1) * f : null
        }).bottom(function (l, k) {
            return d == "mirror" ? k & 1 ? null : (k + 1 >> 1) * -f : (k & 1 || -1) * (k + 1 >> 1) * f
        }).fillStyle(function (l, k) {
            return (k & 1 ? h : i)((k >> 1) + 1)
        });
    this.band.add = function (l) {
        return b.add(pv.Panel).extend(c).add(l).extend(this)
    }
};
pv.Layout.Horizon.prototype = pv.extend(pv.Layout).property("bands", Number).property("mode", String).property("backgroundStyle", pv.color).property("positiveStyle", pv.color).property("negativeStyle", pv.color);
pv.Layout.Horizon.prototype.defaults = (new pv.Layout.Horizon).extend(pv.Layout.prototype.defaults).bands(2).mode("offset").backgroundStyle("white").positiveStyle("#1f77b4").negativeStyle("#d62728");
pv.Layout.Rollup = function () {
    pv.Layout.Network.call(this);
    var b = this, c, d, f = b.buildImplied;
    this.buildImplied = function (g) {
        f.call(this, g);
        c = g.$rollup.nodes;
        d = g.$rollup.links
    };
    this.node.data(function () {
        return c
    }).size(function (g) {
        return g.nodes.length * 20
    });
    this.link.interpolate("polar").eccentricity(0.8);
    this.link.add = function (g) {
        return b.add(pv.Panel).data(function () {
            return d
        }).add(g).extend(this)
    }
};
pv.Layout.Rollup.prototype = pv.extend(pv.Layout.Network).property("directed", Boolean);
pv.Layout.Rollup.prototype.x = function (b) {
    this.$x = pv.functor(b);
    return this
};
pv.Layout.Rollup.prototype.y = function (b) {
    this.$y = pv.functor(b);
    return this
};
pv.Layout.Rollup.prototype.buildImplied = function (b) {
    function c(r) {
        return i[r] + "," + j[r]
    }

    if (!pv.Layout.Network.prototype.buildImplied.call(this, b)) {
        var d = b.nodes, f = b.links, g = b.directed, h = d.length, i = [], j = [], l = 0, k = {}, q = {}, o = pv.Mark.stack, n = {parent: this};
        o.unshift(null);
        for (var m = 0; m < h; m++) {
            n.index = m;
            o[0] = d[m];
            i[m] = this.$x.apply(n, o);
            j[m] = this.$y.apply(n, o)
        }
        o.shift();
        for (m = 0; m < d.length; m++) {
            h = c(m);
            o = k[h];
            if (!o) {
                o = k[h] = pv.extend(d[m]);
                o.index = l++;
                o.x = i[m];
                o.y = j[m];
                o.nodes = []
            }
            o.nodes.push(d[m])
        }
        for (m = 0; m <
        f.length; m++) {
            l = f[m].targetNode;
            d = k[c(f[m].sourceNode.index)];
            l = k[c(l.index)];
            h = !g && d.index > l.index ? l.index + "," + d.index : d.index + "," + l.index;
            (o = q[h]) || (o = q[h] = {sourceNode: d, targetNode: l, linkValue: 0, links: []});
            o.links.push(f[m]);
            o.linkValue += f[m].linkValue
        }
        b.$rollup = {nodes: pv.values(k), links: pv.values(q)}
    }
};
pv.Layout.Matrix = function () {
    pv.Layout.Network.call(this);
    var b, c, d, f, g, h = this.buildImplied;
    this.buildImplied = function (i) {
        h.call(this, i);
        b = i.nodes.length;
        c = i.width / b;
        d = i.height / b;
        f = i.$matrix.labels;
        g = i.$matrix.pairs
    };
    this.link.data(function () {
        return g
    }).left(function () {
        return c * (this.index % b)
    }).top(function () {
        return d * Math.floor(this.index / b)
    }).width(function () {
        return c
    }).height(function () {
        return d
    }).lineWidth(1.5).strokeStyle("#fff").fillStyle(function (i) {
        return i.linkValue ? "#555" : "#eee"
    }).parent =
        this;
    delete this.link.add;
    this.label.data(function () {
        return f
    }).left(function () {
        return this.index & 1 ? c * ((this.index >> 1) + 0.5) : null
    }).top(function () {
        return this.index & 1 ? null : d * ((this.index >> 1) + 0.5)
    }).textMargin(4).textAlign(function () {
        return this.index & 1 ? "left" : "right"
    }).textAngle(function () {
        return this.index & 1 ? -Math.PI / 2 : 0
    });
    delete this.node
};
pv.Layout.Matrix.prototype = pv.extend(pv.Layout.Network).property("directed", Boolean);
pv.Layout.Matrix.prototype.sort = function (b) {
    this.$sort = b;
    return this
};
pv.Layout.Matrix.prototype.buildImplied = function (b) {
    if (!pv.Layout.Network.prototype.buildImplied.call(this, b)) {
        var c = b.nodes, d = b.links, f = this.$sort, g = c.length, h = pv.range(g), i = [], j = [], l = {};
        b.$matrix = {labels: i, pairs: j};
        f && h.sort(function (m, r) {
            return f(c[m], c[r])
        });
        for (var k = 0; k < g; k++)for (var q = 0; q < g; q++) {
            var o = h[k], n = h[q];
            j.push(l[o + "." + n] = {row: k, col: q, sourceNode: c[o], targetNode: c[n], linkValue: 0})
        }
        for (k = 0; k < g; k++) {
            o = h[k];
            i.push(c[o], c[o])
        }
        for (k = 0; k < d.length; k++) {
            i = d[k];
            g = i.sourceNode.index;
            h = i.targetNode.index;
            i = i.linkValue;
            l[g + "." + h].linkValue += i;
            b.directed || (l[h + "." + g].linkValue += i)
        }
    }
};
pv.Layout.Bullet = function () {
    pv.Layout.call(this);
    var b = this, c = b.buildImplied, d = b.x = pv.Scale.linear(), f, g, h, i, j;
    this.buildImplied = function (l) {
        c.call(this, j = l);
        f = l.orient;
        g = /^left|right$/.test(f);
        h = pv.ramp("#bbb", "#eee").domain(0, Math.max(1, j.ranges.length - 1));
        i = pv.ramp("steelblue", "lightsteelblue").domain(0, Math.max(1, j.measures.length - 1))
    };
    (this.range = new pv.Mark).data(function () {
        return j.ranges
    }).reverse(true).left(function () {
        return f == "left" ? 0 : null
    }).top(function () {
        return f == "top" ? 0 : null
    }).right(function () {
        return f ==
        "right" ? 0 : null
    }).bottom(function () {
        return f == "bottom" ? 0 : null
    }).width(function (l) {
        return g ? d(l) : null
    }).height(function (l) {
        return g ? null : d(l)
    }).fillStyle(function () {
        return h(this.index)
    }).antialias(false).parent = b;
    (this.measure = new pv.Mark).extend(this.range).data(function () {
        return j.measures
    }).left(function () {
        return f == "left" ? 0 : g ? null : this.parent.width() / 3.25
    }).top(function () {
        return f == "top" ? 0 : g ? this.parent.height() / 3.25 : null
    }).right(function () {
        return f == "right" ? 0 : g ? null : this.parent.width() / 3.25
    }).bottom(function () {
        return f ==
        "bottom" ? 0 : g ? this.parent.height() / 3.25 : null
    }).fillStyle(function () {
        return i(this.index)
    }).parent = b;
    (this.marker = new pv.Mark).data(function () {
        return j.markers
    }).left(function (l) {
        return f == "left" ? d(l) : g ? null : this.parent.width() / 2
    }).top(function (l) {
        return f == "top" ? d(l) : g ? this.parent.height() / 2 : null
    }).right(function (l) {
        return f == "right" ? d(l) : null
    }).bottom(function (l) {
        return f == "bottom" ? d(l) : null
    }).strokeStyle("black").shape("bar").angle(function () {
        return g ? 0 : Math.PI / 2
    }).parent = b;
    (this.tick = new pv.Mark).data(function () {
        return d.ticks(7)
    }).left(function (l) {
        return f ==
        "left" ? d(l) : null
    }).top(function (l) {
        return f == "top" ? d(l) : null
    }).right(function (l) {
        return f == "right" ? d(l) : g ? null : -6
    }).bottom(function (l) {
        return f == "bottom" ? d(l) : g ? -8 : null
    }).height(function () {
        return g ? 6 : null
    }).width(function () {
        return g ? null : 6
    }).parent = b
};
pv.Layout.Bullet.prototype = pv.extend(pv.Layout).property("orient", String).property("ranges").property("markers").property("measures").property("maximum", Number);
pv.Layout.Bullet.prototype.defaults = (new pv.Layout.Bullet).extend(pv.Layout.prototype.defaults).orient("left").ranges([]).markers([]).measures([]);
pv.Layout.Bullet.prototype.buildImplied = function (b) {
    pv.Layout.prototype.buildImplied.call(this, b);
    var c = this.parent[/^left|right$/.test(b.orient) ? "width" : "height"]();
    b.maximum = b.maximum || pv.max([].concat(b.ranges, b.markers, b.measures));
    this.x.domain(0, b.maximum).range(0, c)
};
pv.Behavior = {};
pv.Behavior.drag = function () {
    function b(l) {
        g = this.index;
        f = this.scene;
        var k = this.mouse();
        i = ((h = l).fix = pv.vector(l.x, l.y)).minus(k);
        j = {x: this.parent.width() - (l.dx || 0), y: this.parent.height() - (l.dy || 0)};
        f.mark.context(f, g, function () {
            this.render()
        });
        pv.Mark.dispatch("dragstart", f, g)
    }

    function c() {
        if (f) {
            f.mark.context(f, g, function () {
                var l = this.mouse();
                h.x = h.fix.x = Math.max(0, Math.min(i.x + l.x, j.x));
                h.y = h.fix.y = Math.max(0, Math.min(i.y + l.y, j.y));
                this.render()
            });
            pv.Mark.dispatch("drag", f, g)
        }
    }

    function d() {
        if (f) {
            h.fix =
                null;
            f.mark.context(f, g, function () {
                this.render()
            });
            pv.Mark.dispatch("dragend", f, g);
            f = null
        }
    }

    var f, g, h, i, j;
    pv.listen(window, "mousemove", c);
    pv.listen(window, "mouseup", d);
    return b
};
pv.Behavior.point = function (b) {
    function c(k, q) {
        k = k[q];
        q = {cost: Infinity};
        for (var o = 0, n = k.visible && k.children.length; o < n; o++) {
            var m = k.children[o], r = m.mark, s;
            if (r.type == "panel") {
                r.scene = m;
                for (var u = 0, x = m.length; u < x; u++) {
                    r.index = u;
                    s = c(m, u);
                    if (s.cost < q.cost)q = s
                }
                delete r.scene;
                delete r.index
            } else if (r.$handlers.point) {
                r = r.mouse();
                u = 0;
                for (x = m.length; u < x; u++) {
                    var t = m[u];
                    s = r.x - t.left - (t.width || 0) / 2;
                    t = r.y - t.top - (t.height || 0) / 2;
                    var p = i * s * s + j * t * t;
                    if (p < q.cost) {
                        q.distance = s * s + t * t;
                        q.cost = p;
                        q.scene = m;
                        q.index = u
                    }
                }
            }
        }
        return q
    }

    function d() {
        var k = c(this.scene, this.index);
        if (k.cost == Infinity || k.distance > l)k = null;
        if (g) {
            if (k && g.scene == k.scene && g.index == k.index)return;
            pv.Mark.dispatch("unpoint", g.scene, g.index)
        }
        if (g = k) {
            pv.Mark.dispatch("point", k.scene, k.index);
            pv.listen(this.root.canvas(), "mouseout", f)
        }
    }

    function f(k) {
        if (g && !pv.ancestor(this, k.relatedTarget)) {
            pv.Mark.dispatch("unpoint", g.scene, g.index);
            g = null
        }
    }

    var g, h = null, i = 1, j = 1, l = arguments.length ? b * b : 900;
    d.collapse = function (k) {
        if (arguments.length) {
            h = String(k);
            switch (h) {
                case "y":
                    i =
                        1;
                    j = 0;
                    break;
                case "x":
                    i = 0;
                    j = 1;
                    break;
                default:
                    j = i = 1;
                    break
            }
            return d
        }
        return h
    };
    return d
};
pv.Behavior.select = function () {
    function b(j) {
        g = this.index;
        f = this.scene;
        i = this.mouse();
        h = j;
        h.x = i.x;
        h.y = i.y;
        h.dx = h.dy = 0;
        pv.Mark.dispatch("selectstart", f, g)
    }

    function c() {
        if (f) {
            f.mark.context(f, g, function () {
                var j = this.mouse();
                h.x = Math.max(0, Math.min(i.x, j.x));
                h.y = Math.max(0, Math.min(i.y, j.y));
                h.dx = Math.min(this.width(), Math.max(j.x, i.x)) - h.x;
                h.dy = Math.min(this.height(), Math.max(j.y, i.y)) - h.y;
                this.render()
            });
            pv.Mark.dispatch("select", f, g)
        }
    }

    function d() {
        if (f) {
            pv.Mark.dispatch("selectend", f, g);
            f = null
        }
    }

    var f,
        g, h, i;
    pv.listen(window, "mousemove", c);
    pv.listen(window, "mouseup", d);
    return b
};
pv.Behavior.resize = function (b) {
    function c(l) {
        h = this.index;
        g = this.scene;
        j = this.mouse();
        i = l;
        switch (b) {
            case "left":
                j.x = i.x + i.dx;
                break;
            case "right":
                j.x = i.x;
                break;
            case "top":
                j.y = i.y + i.dy;
                break;
            case "bottom":
                j.y = i.y;
                break
        }
        pv.Mark.dispatch("resizestart", g, h)
    }

    function d() {
        if (g) {
            g.mark.context(g, h, function () {
                var l = this.mouse();
                i.x = Math.max(0, Math.min(j.x, l.x));
                i.y = Math.max(0, Math.min(j.y, l.y));
                i.dx = Math.min(this.parent.width(), Math.max(l.x, j.x)) - i.x;
                i.dy = Math.min(this.parent.height(), Math.max(l.y, j.y)) - i.y;
                this.render()
            });
            pv.Mark.dispatch("resize", g, h)
        }
    }

    function f() {
        if (g) {
            pv.Mark.dispatch("resizeend", g, h);
            g = null
        }
    }

    var g, h, i, j;
    pv.listen(window, "mousemove", d);
    pv.listen(window, "mouseup", f);
    return c
};
pv.Behavior.pan = function () {
    function b() {
        g = this.index;
        f = this.scene;
        i = pv.vector(pv.event.pageX, pv.event.pageY);
        h = this.transform();
        j = 1 / (h.k * this.scale);
        if (l)l = {x: (1 - h.k) * this.width(), y: (1 - h.k) * this.height()}
    }

    function c() {
        if (f) {
            f.mark.context(f, g, function () {
                var k = h.translate((pv.event.pageX - i.x) * j, (pv.event.pageY - i.y) * j);
                if (l) {
                    k.x = Math.max(l.x, Math.min(0, k.x));
                    k.y = Math.max(l.y, Math.min(0, k.y))
                }
                this.transform(k).render()
            });
            pv.Mark.dispatch("pan", f, g)
        }
    }

    function d() {
        f = null
    }

    var f, g, h, i, j, l;
    b.bound = function (k) {
        if (arguments.length) {
            l =
                Boolean(k);
            return this
        }
        return Boolean(l)
    };
    pv.listen(window, "mousemove", c);
    pv.listen(window, "mouseup", d);
    return b
};
pv.Behavior.zoom = function (b) {
    function c() {
        var f = this.mouse(), g = pv.event.wheel * b;
        f = this.transform().translate(f.x, f.y).scale(g < 0 ? 1E3 / (1E3 - g) : (1E3 + g) / 1E3).translate(-f.x, -f.y);
        if (d) {
            f.k = Math.max(1, f.k);
            f.x = Math.max((1 - f.k) * this.width(), Math.min(0, f.x));
            f.y = Math.max((1 - f.k) * this.height(), Math.min(0, f.y))
        }
        this.transform(f).render();
        pv.Mark.dispatch("zoom", this.scene, this.index)
    }

    var d;
    arguments.length || (b = 1 / 48);
    c.bound = function (f) {
        if (arguments.length) {
            d = Boolean(f);
            return this
        }
        return Boolean(d)
    };
    return c
};
pv.Geo = function () {
};
pv.Geo.projections = {
    mercator: {
        project: function (b) {
            return {
                x: b.lng / 180,
                y: b.lat > 85 ? 1 : b.lat < -85 ? -1 : Math.log(Math.tan(Math.PI / 4 + pv.radians(b.lat) / 2)) / Math.PI
            }
        }, invert: function (b) {
            return {lng: b.x * 180, lat: pv.degrees(2 * Math.atan(Math.exp(b.y * Math.PI)) - Math.PI / 2)}
        }
    }, "gall-peters": {
        project: function (b) {
            return {x: b.lng / 180, y: Math.sin(pv.radians(b.lat))}
        }, invert: function (b) {
            return {lng: b.x * 180, lat: pv.degrees(Math.asin(b.y))}
        }
    }, sinusoidal: {
        project: function (b) {
            return {
                x: pv.radians(b.lng) * Math.cos(pv.radians(b.lat)) / Math.PI,
                y: b.lat / 90
            }
        }, invert: function (b) {
            return {lng: pv.degrees(b.x * Math.PI / Math.cos(b.y * Math.PI / 2)), lat: b.y * 90}
        }
    }, aitoff: {
        project: function (b) {
            var c = pv.radians(b.lng);
            b = pv.radians(b.lat);
            var d = Math.acos(Math.cos(b) * Math.cos(c / 2));
            return {
                x: 2 * (d ? Math.cos(b) * Math.sin(c / 2) * d / Math.sin(d) : 0) / Math.PI,
                y: 2 * (d ? Math.sin(b) * d / Math.sin(d) : 0) / Math.PI
            }
        }, invert: function (b) {
            var c = b.y * Math.PI / 2;
            return {lng: pv.degrees(b.x * Math.PI / 2 / Math.cos(c)), lat: pv.degrees(c)}
        }
    }, hammer: {
        project: function (b) {
            var c = pv.radians(b.lng);
            b = pv.radians(b.lat);
            var d = Math.sqrt(1 + Math.cos(b) * Math.cos(c / 2));
            return {x: 2 * Math.SQRT2 * Math.cos(b) * Math.sin(c / 2) / d / 3, y: Math.SQRT2 * Math.sin(b) / d / 1.5}
        }, invert: function (b) {
            var c = b.x * 3;
            b = b.y * 1.5;
            var d = Math.sqrt(1 - c * c / 16 - b * b / 4);
            return {lng: pv.degrees(2 * Math.atan2(d * c, 2 * (2 * d * d - 1))), lat: pv.degrees(Math.asin(d * b))}
        }
    }, identity: {
        project: function (b) {
            return {x: b.lng / 180, y: b.lat / 90}
        }, invert: function (b) {
            return {lng: b.x * 180, lat: b.y * 90}
        }
    }
};
pv.Geo.scale = function (b) {
    function c(m) {
        if (!o || m.lng != o.lng || m.lat != o.lat) {
            o = m;
            m = d(m);
            n = {x: l(m.x), y: k(m.y)}
        }
        return n
    }

    function d(m) {
        return j.project({lng: m.lng - q.lng, lat: m.lat})
    }

    function f(m) {
        m = j.invert(m);
        m.lng += q.lng;
        return m
    }

    var g = {x: 0, y: 0}, h = {
        x: 1,
        y: 1
    }, i = [], j = pv.Geo.projections.identity, l = pv.Scale.linear(-1, 1).range(0, 1), k = pv.Scale.linear(-1, 1).range(1, 0), q = {
        lng: 0,
        lat: 0
    }, o, n;
    c.x = function (m) {
        return c(m).x
    };
    c.y = function (m) {
        return c(m).y
    };
    c.ticks = {
        lng: function (m) {
            var r;
            if (i.length > 1) {
                var s = pv.Scale.linear();
                if (m == undefined)m = 10;
                r = s.domain(i, function (u) {
                    return u.lat
                }).ticks(m);
                m = s.domain(i, function (u) {
                    return u.lng
                }).ticks(m)
            } else {
                r = pv.range(-80, 81, 10);
                m = pv.range(-180, 181, 10)
            }
            return m.map(function (u) {
                return r.map(function (x) {
                    return {lat: x, lng: u}
                })
            })
        }, lat: function (m) {
            return pv.transpose(c.ticks.lng(m))
        }
    };
    c.invert = function (m) {
        return f({x: l.invert(m.x), y: k.invert(m.y)})
    };
    c.domain = function (m, r) {
        if (arguments.length) {
            i = m instanceof Array ? arguments.length > 1 ? pv.map(m, r) : m : Array.prototype.slice.call(arguments);
            if (i.length > 1) {
                var s = i.map(function (x) {
                    return x.lng
                }), u = i.map(function (x) {
                    return x.lat
                });
                q = {lng: (pv.max(s) + pv.min(s)) / 2, lat: (pv.max(u) + pv.min(u)) / 2};
                s = i.map(d);
                l.domain(s, function (x) {
                    return x.x
                });
                k.domain(s, function (x) {
                    return x.y
                })
            } else {
                q = {lng: 0, lat: 0};
                l.domain(-1, 1);
                k.domain(-1, 1)
            }
            o = null;
            return this
        }
        return i
    };
    c.range = function (m, r) {
        if (arguments.length) {
            if (typeof m == "object") {
                g = {x: Number(m.x), y: Number(m.y)};
                h = {x: Number(r.x), y: Number(r.y)}
            } else {
                g = {x: 0, y: 0};
                h = {x: Number(m), y: Number(r)}
            }
            l.range(g.x, h.x);
            k.range(h.y, g.y);
            o = null;
            return this
        }
        return [g, h]
    };
    c.projection = function (m) {
        if (arguments.length) {
            j = typeof m == "string" ? pv.Geo.projections[m] || pv.Geo.projections.identity : m;
            return this.domain(i)
        }
        return m
    };
    c.by = function (m) {
        function r() {
            return c(m.apply(this, arguments))
        }

        for (var s in c)r[s] = c[s];
        return r
    };
    arguments.length && c.projection(b);
    return c
};