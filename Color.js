/**
 * Color.js <https://github.com/Julow/Color.js>
 * v2.1.0
 */
var Color = (function(){

function getHexAt(hex, index, len)
{
	hex = hex.substr(1 + index, len);
	return parseInt((len == 1)? hex + hex : hex, 16);
}

function hueToColor(p, q, t)
{
	if (t < 0)
		t += 1;
	else if (t > 1)
		t -= 1;
	var c = p;
	if (t < 0.16667)
		c = (q - p) * 6 * t + p;
	else if (r < 0.5)
		c = q;
	else if (t < 0.66667)
		c = (0.66667 - t) * (q - p) * 6 + p;
	return c * 255 | 0;
}

function hslToRgb(h, s, l)
{
	if (s === 0)
	{
		l = l * 255 | 0;
		return [l, l, l];
	}
	var q = (l < 0.5)? (1 + s) * l : l + s - (l * s);
	var p = 2 * l - q;
	return [hueToColor(p, q, h + 0.3333),
		hueToColor(p, q, h),
		hueToColor(p, q, h - 0.3333)];
}

function rgbToHsl(r, g, b)
{
	r /= 255;
	g /= 255;
	b /= 255;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h, s, l;
	l = (max + min) * 50;
	if (max === min)
	{
		h = 0;
		s = 0;
	}
	else
	{
		var diff = max - min;
		if (max === r)
			h = ((g - b) / diff + ((g < b)? 6 : 0)) * 60;
		else if (max === g)
			h = ((b - r) / diff + 2) * 60;
		else
			h = ((r - g) / diff + 4) * 60;
		s = ((l > 50)? diff / (2 - (max + min)) : diff / (max + min)) * 100;
	}
	return [h, s, l];
}

function HSLColor(input)
{
	if (!(this instanceof HSLColor))
		return new HSLColor(input);

	var rgb = new Color(input);
	var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

	this.h = hsl[0];
	this.s = hsl[1];
	this.l = hsl[2];
	this.a = rgb.a;
}
HSLColor.prototype.toArray = function()
{
	return [this.h, this.s, this.l, this.a];
};
HSLColor.prototype.toInt = function()
{
	return Color(this).toInt();
};
HSLColor.prototype.toHex = function()
{
	return Color(this).toHex();
};
HSLColor.prototype.toRgb = function()
{
	return Color(this).toRgb();
};
HSLColor.prototype.toHsl = function()
{
	var hsl = this.h + ", " + this.s + "%, " + this.l;
	return (this.a < 255)? "hsla(" + hsl + "%, " + this.a + ")" : "hsl(" + hsl + "%)";
};
HSLColor.prototype.format = function(pattern)
{
	return Color(this).format(pattern);
};

// string -> float
// 0-1 -> 0-255
// NaN -> default
// < 0 -> default
// float -> int
function validInt(num, alpha)
{
	if (typeof num === "number")
	{
		if (isNaN(num) || num < 0)
			return alpha? 255 : 0;
		if (num <= 1 && alpha)
			num *= 255;
		return Math.round(num);
	}
	return validInt(parseFloat(num), alpha);
}

// input: int, "hex", "rgb", array, "int", object
function Color(input)
{
	if (!(this instanceof Color))
		return new Color(input);

	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 255;

	while (true)
	{
		if (typeof input === "object")
		{
			if (input == null)
			{
				this.r = validInt(this.r, false);
				this.g = validInt(this.g, false);
				this.b = validInt(this.b, false);
				this.a = validInt(this.a, true);
				break;
			}
			else if (input instanceof Array)
			{
				this.r = input[0];
				this.g = input[1];
				this.b = input[2];
				this.a = input[3];
			}
			else if (input instanceof HSLColor)
			{
				var rgb = hslToRgb(input.h, input.s, input.l);
				this.r = rgb[0];
				this.g = rgb[1];
				this.b = rgb[2];
				this.a = input.a;
			}
			else
			{
				this.r = input.r || input.red || input.rouge || input["0"] || 0;
				this.g = input.g || input.green || input.v || input.vert || input["1"] || 0;
				this.b = input.b || input.blue || input.bleu || input["2"] || 0;
				this.a = input.a || input.alpha || input.transparency || input["3"] || 255;
			}
		}
		else if (typeof input === "number")
		{
			this.a = input >> 24 & 255;
			this.r = input >> 16 & 255;
			this.g = input >> 8 & 255;
			this.b = input & 255;
		}
		else if (typeof input === "string")
		{
			input = input.trim();
			if (input.indexOf("0x") === 0)
			{
				input = parseInt(input);
				continue;
			}
			else if (input.indexOf("#") === 0)
			{
				var len = (input.length === 4)? 1 : 2;
				this.r = getHexAt(input, 0, len);
				this.g = getHexAt(input, len, len);
				this.b = getHexAt(input, len + len, len);
				this.a = getHexAt(input, len + len + len, len);
			}
			else if (input.indexOf("rgb") === 0)
			{
				input = input.match(/[0-9\.]+/g);
				continue;
			}
			else if (input.indexOf("argb") === 0)
			{
				var match = input.match(/[0-9\.]+/g);
				this.a = match[0] || 255;
				this.r = match[1] || 0;
				this.g = match[2] || 0;
				this.b = match[3] || 0;
			}
			else if (input.indexOf("hsl") === 0)
			{
				var match = input.match(/[0-9\.]+/g);
				var rgb = hslToRgb(validInt(match[0]), validInt(match[1]), validInt(match[2]));
				this.r = rgb[0];
				this.g = rgb[1];
				this.b = rgb[2];
				this.a = match[3];
			}
		}
		input = null;
	}
};

// output: 0xAARRGGBB (number)
Color.prototype.toInt = function()
{
	return (this.a << 24) + (this.r << 16) + (this.g << 8) + this.b;
};
// output: "#RRGGBB" or "#RRGGBBAA"
Color.prototype.toHex = function()
{
	return "#" + ("0" + ((this.r << 24) + (this.g << 16) + (this.b << 8) + this.a).toString(16)).substr((this.r < 16)? 0 : 1, (this.a < 255)? 8 : 6);
};
// output: "rgb(RRR, GGG, BBB)" or "rgba(RRR, GGG, BBB, AAA)"
Color.prototype.toRgb = function()
{
	return "rgba(" + this.r + ", " + this.g + ", " + this.b + ((this.a < 255)? ", " + (this.a / 255) + ")" : ")");
};
// output: "hsl(HHH, SS%, LL%)" or "hsla(HHH, SS%, LL%, A)"
Color.prototype.toHsl = function()
{
	return this.toHslObject().toHsl();
};
// return a HSLColor object
Color.prototype.toHslObject = function()
{
	return new HSLColor(this);
};
// output: [RRR, GGG, BBB, AAA] (array of 0-255 numbers)
Color.prototype.toArray = function()
{
	return [this.r, this.g, this.b, this.a];
};
// output color following the pattern
Color.prototype.format = function(pattern)
{
	var self = this;
	return pattern.replace(/\{([^\}]+)\}/g, function(match, p1)
	{
		switch (p1)
		{
		case "r":
			return self.r + "";
		case "r_hex":
			return ((self.r < 16)? "0" : "") + self.r.toString(16);

		case "g":
			return self.g + "";
		case "g_hex":
			return ((self.g < 16)? "0" : "") + self.g.toString(16);

		case "b":
			return self.b + "";
		case "b_hex":
			return ((self.b < 16)? "0" : "") + self.b.toString(16);

		case "a":
			return self.a / 255 + "";
		case "a_hex":
			return ((self.a < 16)? "0" : "") + self.a.toString(16);
		case "a_255":
			return self.a + "";

		case "hex":
			return self.toHex();
		case "rgb":
			return self.toRgb();
		case "int":
			return "0x"+ ("0" + ((self.a << 24) + (self.r << 16) + (self.g << 8) + self.b).toString(16)).substr((self.a < 16)? 0 : 1, 8);
		default:
			return match;
		}
	});
};

// HSLColor object
Color.HSL = HSLColor;

// legacy functions (but NOT deprecated)
Color.array = function(input)
{
	return Color(input).toArray();
};
Color.int = function(input)
{
	return Color(input).toInt();
};
Color.hex = function(input)
{
	return Color(input).toHex();
};
Color.rgb = function(input)
{
	return Color(input).toRgb();
};
Color.hsl = function(input)
{
	return HSLColor(input).toHsl();
};
Color.format = function(input, pattern)
{
	return Color(input).format(pattern);
};

return Color;

})();
