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

*	c.`r`
	> Red value
(0 to 255)

*	c.`g`
	> Green value
(0 to 255)

*	c.`b`
	> Blue value
(0 to 255)

*	c.`a`
	> Alpha value
(0 to 255)

*	c.`toInt()`
	> Color as an int

*	c.`toHex()`
	> Color as a CSS hex color string
(`#FFFFFF` or `#FFFFFFFF` with alpha)

*	c.`toRgb()`
	> Color as a CSS rgb (or rgba) color string
(`rgb(255, 255, 255)` or `rgba(255, 255, 255, 1)` with alpha)

*	c.`toArray()`
	> Color values in an array
(`[255, 255, 255, 255]`)

*	Color.`int(input)`
	> Convert any color to int color

*	Color.`hex(input)`
	> Convert any color to CSS hex color string

*	Color.`rgb(input)`
	> Convert any color to CSS rgb color string

*	Color.`array(input)`
	> Convert any color to array of color values
