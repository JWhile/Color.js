# Color.js

_v2_

Convert input color to `rgb`, `hex`, `int` or `array`

### Accepted color

```js
// List of valid colors
// All colors output white (255, 255, 255, 255)
[
	// Hex
	"#FFFFFF",
	"#ffffff",
	"#FFFFFFFF",
	"#ffffffff",

	// Rgb
	"rgb(255, 255, 255)",
	"rgba(255, 255, 255, 1)",

	// Int
	0xFFFFFFFF,
	"0xFFFFFFFF",

	// Other
	[255, 255, 255, 255],
	[255, 255, 255, 1],
	{
		r: 255, // r, red, rouge, 0
		g: 255, // g, green, v, vert, 1
		b: 255, // b, blue, bleu, 2
		a: 255 // a, transparency, 3  // 1 == 255, 0.5 == 128
	}
	// Accept Color instance
]
```

### Example

```js
// Create a Color instance :

var c = new Color("#ffffff");
// or like this
var c = Color("#ffffff");

// Color values (0 to 255)
console.log(c.r) // 255 (red value)
console.log(c.g) // 255 (green value)
console.log(c.b) // 255 (blue value)
console.log(c.a) // 255 (alpha value)

// Conversion methods
c.toInt(); // return 4294967295 (0xFFFFFFFF)
c.toHex(); // return "#ffffff"
c.toRgb(); // return "rgb(255, 255, 255)"
c.toArray(); // return [255, 255, 255, 255]
```

### Reference

- c.r
_int8_
Red value
(0 to 255)

- c.g
_int8_
Green value
(0 to 255)

- c.b
_int8_
Blue value
(0 to 255)

- c.a
_int8_
Alpha value
(0 to 255)

- c.toInt()
_u_int32_
Color as an int

- c.toHex()
_string_
Color as a CSS hex color
(`#FFFFFF` or `#FFFFFFFF` with alpha)

- c.toRgb()
_string_
Color as a CSS rgb (or rgba) color
(`rgb(255, 255, 255)` or `rgba(255, 255, 255, 1)` with alpha)

- c.toArray()
_array[4]_
Color values in an array
(`[255, 255, 255, 255]`)

- Color.int(input)
_u_int32_
Convert any color to int color

- Color.hex(input)
_string_
Convert any color to CSS hex color

- Color.rgb(input)
_string_
Convert any color to CSS rgb color

- Color.array(input)
_string_
Convert any color to array of color values
