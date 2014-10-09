# Color.js

_v2.2.0_

Convert/Format any color to `rgb`, `hex`, `int` or `array`

### Accepted color

```js
// List of valid colors
// All colors output blue (50, 150, 200, 255)
[
	// Hex
	"#3296C8",
	"#3296c8",
	"#3296c8ff",
	"#3296C8FF",

	// Hsl
	"hsl(200, 49%, 60%)"
	"hsla(200, 49%, 60%, 1)"

	// Rgb
	"rgb(50, 150, 200)",
	"rgba(50, 150, 200, 1)",
	"argb(255, 50, 150, 200)",

	// Int
	0xFF3296C8,
	"0xFF3296C8",

	// Other
	[50, 150, 200, 255],
	[50, 150, 200, 1],
	{
		r: 50, // r, red, rouge, 0
		g: 150, // g, green, v, vert, 1
		b: 200, // b, blue, bleu, 2
		a: 255 // a, transparency, 3  // 1 == 255, 0.5 == 128
	}
]
// Accept Color instance
// Accept untrimed string
```

### Example

```js
// Create a Color instance :
var c = new Color("#3296c8");
// or like this
var c = Color("#3296c8");

// Color values (0 to 255)
console.log(c.r) // 50 (red value)
console.log(c.g) // 150 (green value)
console.log(c.b) // 200 (blue value)
console.log(c.a) // 255 (alpha value)

// Conversion methods
c.toInt(); // return 4281505480 (0xFF3296C8)
c.toHex(); // return "#3296C8"
c.toRgb(); // return "rgb(50, 150, 200)"
c.toHsl(); // return "hsl(200, 49%, 60%)"
c.toArray(); // return [50, 150, 200, 255]

// HSL object
c.toHslObject();
// or
var c = new Color.HSL("rgb(50, 150, 200)");
```

### Reference

__Color object__

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
(`#RRGGBB` or `#RRGGBBAA` with alpha)

*	c.`toHsl()`
	> Color as a CSS hsl (or hsla) color string
(`hsl(HHH, SS%, LL%)` or `hsla(HHH, SS%, LL%, A)` with alpha)

*	c.`toRgb()`
	> Color as a CSS rgb (or rgba) color string
(`rgb(RRR, GGG, BBB)` or `rgba(RRR, GGG, BBB, A)` with alpha)

*	c.`toArray()`
	> Color values in an array
(`[RRR, GGG, BBB, AAA]`)

*	c.`format(pattern)`
	> Return formated color following the pattern
	> ```js
	> // Pattern example
	> c.format("argb({a_255}, {r}, {g}, {b})"); // Return "argb(255, 50, 150, 200)"
	> 
	> // Pattern variables
	> [
	> 	"{r}", // Return the 0-255 red value ("50")
	> 	"{r_hex}", // Return the 00-FF red value ("32")
	> 	"{g}", // Return the 0-255 green value ("150")
	> 	"{g_hex}", // Return the 00-FF green value ("96")
	> 	"{b}", // Return the 0-255 blue value ("200")
	> 	"{b_hex}", // Return the 00-FF blue value ("C8")
	> 	"{a}", // Return the 0-1 alpha value ("1")
	> 	"{a_255}", // Return the 0-255 alpha value ("255")
	> 	"{a_hex}", // Return the 00-FF alpha value ("FF")
	> 	"{h}", // Return the 0-360 hue value ("200")
	> 	"{s}", // Return the 0-100 saturation value ("49")
	> 	"{l}", // Return the 0-100 luminosity value ("60")
	> 	"{hex}", // Return the c.toHex() result ("#3296c8")
	> 	"{rgb}", // Return the c.toRgb() result ("rgb(50, 150, 200)")
	> 	"{int}" // Return the int hex color representation ("0xFF3296C8")
	> ]
	> ```

__Color.HSL Object__

Same methods as Color object.

Has `h`, `s`, `l` attributes instead of `r`, `g`, `b`.

__Static functions__

*	Color.`int(input)`
	> Convert any color to int color

*	Color.`hex(input)`
	> Convert any color to CSS hex color string

*	Color.`hsl(input)`
	> Convert any color to CSS hsl color string

*	Color.`rgb(input)`
	> Convert any color to CSS rgb color string

*	Color.`array(input)`
	> Convert any color to array of color values

*	Color.`format(input, pattern)`
	> Convert any color following the pattern
