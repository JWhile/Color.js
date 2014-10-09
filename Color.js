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
Color.format = function(input, pattern)
{
	return Color(input).format(pattern);
};

return Color;

})();
