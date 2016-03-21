/**
 * Constructor de objeto Color
 * @class Color
 * @param {object} a - puede ser un objeto {formato:[valores]}, un string '#RRGGBB' o '#RGB' o un string con el nombre HTML5 del color
 * @author Abel Vázquez
 * @version 1.0.0
 */
Color = function (a) {
    try {
        if (a == void 0) {
            this.rgb = [0, 0, 0];
        } else if (typeof (a) == 'string') {
            this.rgb = Color.hexToRgb(a) || Color.hexToRgb(Color.HTML5[a]);
        } else if (a.hasOwnProperty('hex')) {
            this.rgb = Color.hexToRgb(a.hex)
        } else if (a.hasOwnProperty('rgb')) {
            this.rgb = a.rgb;
        } else if (a.hasOwnProperty('hsl')) {
            this.rgb = Color.hslToRgb(a.hsl[0],a.hsl[1],a.hsl[2]);
        } else if (a.hasOwnProperty('hsv')) {
            this.rgb = Color.hsvToRgb(a.hsv[0],a.hsv[1],a.hsv[2]);
        };
    } catch (error) {
        if (typeof (a) == 'string') {
            console.error('El color solicitado (' + a + '), no existe. http://www.w3schools.com/html/html_colornames.asp')
        } else {
            throw ("New color error: " + error.message);
        }
        this.rgb = [0, 0, 0];
    }
    /**
     * @property HTML5
     */
    Object.defineProperty(this, 'HTML5', {
        set: function (a) {
            this.rgb = Color.hexToRgb(Color.HTML5[a]);
        },
        get: function () {
            for (var c in Color.HTML5) {
                if (Color.HTML5[c].toLowerCase() == Color.rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2])) return c;
            }
            return '';
        },
        enumerable: true
    });
    /**
     * @property red
     */
    Object.defineProperty(this, 'red', {
        set: function (a) {
            this.rgb[0] = a;
        },
        get: function () {
            return this.rgb[0];
        },
        enumerable: true
    });
    /**
     * @property green
     */
    Object.defineProperty(this, 'green', {
        set: function (a) {
            this.rgb[1] = a;
        },
        get: function () {
            return this.rgb[1];
        },
        enumerable: true
    });
    /**
     * @property blue
     */
    Object.defineProperty(this, 'blue', {
        set: function (a) {
            this.rgb[2] = a;
        },
        get: function () {
            return this.rgb[2];
        },
        enumerable: true
    });
    /**
     * @property hex
     */
    Object.defineProperty(this, 'hex', {
        set: function (a) {
            this.rgb = Color.hexToRgb(a);
        },
        get: function () {
            return Color.rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
        },
        enumerable: true
    });
    /**
     * @property hsl
     */
    Object.defineProperty(this, 'hsl', {
        set: function (a) {
            this.rgb = Color.hslToRgb(a[0], a[1], a[2]);
        },
        get: function () {
            return Color.rgbToHsl(this.rgb[0], this.rgb[1], this.rgb[2]);
        },
        enumerable: true
    });
    /**
     * @property hsv
     */
    Object.defineProperty(this, 'hsv', {
        set: function (a) {
            this.rgb = Color.hsvToRgb((a[0], a[1], a[2]));
        },
        get: function () {
            return Color.rgbToHsv(this.rgb[0], this.rgb[1], this.rgb[2]);
        },
        enumerable: true
    });
    /**
     * @property luminance
     */
    Object.defineProperty(this, 'luminance', {
        set: function (a) {
            this.rgb = Color.hslToRgb(this.hsl[0], this.hsl[1], a);
        },
        get: function () {
            return this.hsl[2];
        },
        enumerable: true
    });
    /**
     * @property saturation
     */
    Object.defineProperty(this, 'saturation', {
        set: function (a) {
            this.rgb = Color.hslToRgb(this.hsl[0], a, this.hsl[2]);
        },
        get: function () {
            return this.hsl[1];
        },
        enumerable: true
    });
    /**
     * @property hue
     */
    Object.defineProperty(this, 'hue', {
        set: function (a) {
            this.rgb = Color.hslToRgb(a, this.hsl[1], this.hsl[2]);
        },
        get: function () {
            return this.hsl[0];
        },
        enumerable: true
    });

    this.invert = function () {
        this.hex = Color.invert(this.hex);
    }
}


/**
 * Devuelve los valores RGB de un color expresado en hexadecimal como RRGGBB o RGB, con o sin #
 * @method hexToRgb
 * @param {string} hex - cadena hexadecimal que representa el color
 * @returns {array} -  los valores decimales de cada canal
 * @author Abel Vázquez
 * @version 1.0.0
 */
Color.hexToRgb = function (hex) {
    hex = hex.toLowerCase();
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        hex2 = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        }),
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : void 0;
}

/**
 * Genera la cadena de color hexadecimal en formato #RRGGBB a partir de los valores de cada canal
 * @method rgbToHex
 * @param {number} r - valor decimal del canal rojo
 * @param {number} g - valor decimal del canal verde
 * @param {number} b - valor decimal del canal azul
 * @returns {string} - nuevo valor de color hexadecimal
 * @author Abel Vázquez
 * @version 1.0.0
 */
Color.rgbToHex = function (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 * @method rgbToHsl
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
Color.rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * @method hslToRgb
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
Color.hslToRgb = function (h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 * @method rgbToHsv
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
Color.rgbToHsv = function (r, g, b) {
    r = r / 255, g = g / 255, b = b / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * @method hsvToRgb
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
Color.hsvToRgb = function (h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
    case 0:
        r = v, g = t, b = p;
        break;
    case 1:
        r = q, g = v, b = p;
        break;
    case 2:
        r = p, g = v, b = t;
        break;
    case 3:
        r = p, g = q, b = v;
        break;
    case 4:
        r = t, g = p, b = v;
        break;
    case 5:
        r = v, g = p, b = q;
        break;
    }

    return [r * 255, g * 255, b * 255];
}


/**
 * Aumentamos la luminancia de un color expresado en RGB
 * @method Luminance
 * @param {number} lum - factor en tanto por uno
 * @returns {array} - nuevo valor de color RGB
 * @author Abel Vázquez
 * @version 1.0.0
 */
Color.Luminance = function (rgb, lum) {
    var hsl = Color.rgbToHsl(rgb[0], rgb[1], rgb[2]);
    return Color.hslToRgb(hsl[0], hsl[1], hsl[2] * lum);
}

/**
 * Listado de equivalencias HTML5-RGB
 * @property HTML5
 * @author Abel Vázquez
 * @version 1.0.0
 */
Color.HTML5 = {
    "AliceBlue": "#F0F8FF",
    "AntiqueWhite": "#FAEBD7",
    "Aqua": "#00FFFF",
    "Aquamarine": "#7FFFD4",
    "Azure": "#F0FFFF",
    "Beige": "#F5F5DC",
    "Bisque": "#FFE4C4",
    "Black": "#000000",
    "BlanchedAlmond": "#FFEBCD",
    "Blue": "#0000FF",
    "BlueViolet": "#8A2BE2",
    "Brown": "#A52A2A",
    "BurlyWood": "#DEB887",
    "CadetBlue": "#5F9EA0",
    "Chartreuse": "#7FFF00",
    "Chocolate": "#D2691E",
    "Coral": "#FF7F50",
    "CornflowerBlue": "#6495ED",
    "Cornsilk": "#FFF8DC",
    "Crimson": "#DC143C",
    "Cyan": "#00FFFF",
    "DarkBlue": "#00008B",
    "DarkCyan": "#008B8B",
    "DarkGoldenRod": "#B8860B",
    "DarkGray": "#A9A9A9",
    "DarkGreen": "#006400",
    "DarkKhaki": "#BDB76B",
    "DarkMagenta": "#8B008B",
    "DarkOliveGreen": "#556B2F",
    "DarkOrange": "#FF8C00",
    "DarkOrchid": "#9932CC",
    "DarkRed": "#8B0000",
    "DarkSalmon": "#E9967A",
    "DarkSeaGreen": "#8FBC8F",
    "DarkSlateBlue": "#483D8B",
    "DarkSlateGray": "#2F4F4F",
    "DarkTurquoise": "#00CED1",
    "DarkViolet": "#9400D3",
    "DeepPink": "#FF1493",
    "DeepSkyBlue": "#00BFFF",
    "DimGray": "#696969",
    "DodgerBlue": "#1E90FF",
    "FireBrick": "#B22222",
    "FloralWhite": "#FFFAF0",
    "ForestGreen": "#228B22",
    "Fuchsia": "#FF00FF",
    "Gainsboro": "#DCDCDC",
    "GhostWhite": "#F8F8FF",
    "Gold": "#FFD700",
    "GoldenRod": "#DAA520",
    "Gray": "#808080",
    "Green": "#008000",
    "GreenYellow": "#ADFF2F",
    "HoneyDew": "#F0FFF0",
    "HotPink": "#FF69B4",
    "IndianRed": "#CD5C5C",
    "Indigo": "#4B0082",
    "Ivory": "#FFFFF0",
    "Khaki": "#F0E68C",
    "Lavender": "#E6E6FA",
    "LavenderBlush": "#FFF0F5",
    "LawnGreen": "#7CFC00",
    "LemonChiffon": "#FFFACD",
    "LightBlue": "#ADD8E6",
    "LightCoral": "#F08080",
    "LightCyan": "#E0FFFF",
    "LightGoldenRodYellow": "#FAFAD2",
    "LightGray": "#D3D3D3",
    "LightGreen": "#90EE90",
    "LightPink": "#FFB6C1",
    "LightSalmon": "#FFA07A",
    "LightSeaGreen": "#20B2AA",
    "LightSkyBlue": "#87CEFA",
    "LightSlateGray": "#778899",
    "LightSteelBlue": "#B0C4DE",
    "LightYellow": "#FFFFE0",
    "Lime": "#00FF00",
    "LimeGreen": "#32CD32",
    "Linen": "#FAF0E6",
    "Magenta": "#FF00FF",
    "Maroon": "#800000",
    "MediumAquaMarine": "#66CDAA",
    "MediumBlue": "#0000CD",
    "MediumOrchid": "#BA55D3",
    "MediumPurple": "#9370DB",
    "MediumSeaGreen": "#3CB371",
    "MediumSlateBlue": "#7B68EE",
    "MediumSpringGreen": "#00FA9A",
    "MediumTurquoise": "#48D1CC",
    "MediumVioletRed": "#C71585",
    "MidnightBlue": "#191970",
    "MintCream": "#F5FFFA",
    "MistyRose": "#FFE4E1",
    "Moccasin": "#FFE4B5",
    "NavajoWhite": "#FFDEAD",
    "Navy": "#000080",
    "OldLace": "#FDF5E6",
    "Olive": "#808000",
    "OliveDrab": "#6B8E23",
    "Orange": "#FFA500",
    "OrangeRed": "#FF4500",
    "Orchid": "#DA70D6",
    "PaleGoldenRod": "#EEE8AA",
    "PaleGreen": "#98FB98",
    "PaleTurquoise": "#AFEEEE",
    "PaleVioletRed": "#DB7093",
    "PapayaWhip": "#FFEFD5",
    "PeachPuff": "#FFDAB9",
    "Peru": "#CD853F",
    "Pink": "#FFC0CB",
    "Plum": "#DDA0DD",
    "PowderBlue": "#B0E0E6",
    "Purple": "#800080",
    "Red": "#FF0000",
    "RosyBrown": "#BC8F8F",
    "RoyalBlue": "#4169E1",
    "SaddleBrown": "#8B4513",
    "Salmon": "#FA8072",
    "SandyBrown": "#F4A460",
    "SeaGreen": "#2E8B57",
    "SeaShell": "#FFF5EE",
    "Sienna": "#A0522D",
    "Silver": "#C0C0C0",
    "SkyBlue": "#87CEEB",
    "SlateBlue": "#6A5ACD",
    "SlateGray": "#708090",
    "Snow": "#FFFAFA",
    "SpringGreen": "#00FF7F",
    "SteelBlue": "#4682B4",
    "Tan": "#D2B48C",
    "Teal": "#008080",
    "Thistle": "#D8BFD8",
    "Tomato": "#FF6347",
    "Turquoise": "#40E0D0",
    "Violet": "#EE82EE",
    "Wheat": "#F5DEB3",
    "White": "#FFFFFF",
    "WhiteSmoke": "#F5F5F5",
    "Yellow": "#FFFF00",
    "YellowGreen": "#9ACD32"
}

/**
 * Invierte un color
 * @param  {String} hex  Expresión hexadecimal del color de entrada
 * @return {String}     Expresión hexadecimal del color de salida
 */
Color.invert = function (hex) {
    var color = hex;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}

/**
 * Devuelve el valor del color para un gradiente, en un punto determinado
 * @param {Color} color1  Color inicial
 * @param {Color} color2  Color final
 * @param {integer} percent Valor de 0 a 100
 * @return Color
 */
Color.gradient = function (color1, color2, percent) {
    var c1 = new Color(color1),
        c2 = new Color(color2),
        c3 = new Color(),
        linear = function (x, y, z) {
            return (x + Math.round((y - x) * (z / 100)));
        };
    c3.rgb = c1.rgb.map(function (a, b) {
        return linear(a, c2.rgb[b], percent);
    });
    return c3;
}



/**
 * Constructor de objeto Color.Gradient
 * @class Gradient
 * @param {array} options array de objetos { stop (integer), color (Color) }
 * @author Guzmán Fernández
 * @version 1.0.0
 */
Color.Gradient = function (options) {
    this.options = options.sort(function (a, b) {
        return a.stop - b.stop;
    });
}

/**
 * Devuelve el valor del color en un punto determinado del gradiente
 * @param {integer} percent Valor de 0 a 100
 * @return Color
 */
Color.Gradient.prototype.get = function (percentage) {
    var current,
        idx,
        start,
        startColor,
        stop,
        stopColor,
        value;

    for (var i = 0, len = this.options.length; i < len; i++) {

        if (percentage >= this.options[i].stop && i < len -1) continue;

        start = this.options[i - 1];
        stop = this.options[i];
        percent = (percentage != 0 && percentage != 100) ? ((percentage - start.stop) * 100 / (stop.stop - start.stop)) : percentage;
        break;
    }

    return Color.gradient(start.color, stop.color, percent);
}
