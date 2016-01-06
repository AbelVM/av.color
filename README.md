# av.color: a Javascript library to deal with colors

This tiny lib eases the way you manage the colors in your app by encapsulating everything in an object.

This is v. 1.0.0, so there's a lot of room for improvement.

# Constructor

There are several ways to summon a `Color`:

````javascript
// no parameters => black
var mycolor = new Color();
// HTML5 color name
var mycolor = new Color('Red'); 
// Hexadecimal expresion
var mycolor = new Color({hex:'#FF0000'});
// RGB vector
var mycolor = new Color({rgb:[255,0,0]});
// HSL vector
var mycolor = new Color({hsl:[0, 1, 0.5]});
// HSV vector
var mycolor = new Color({hsv:[0, 1, 1]});
````

# Properties

````javascript
// HTML5 name (if any)
mycolor.HTML5 = 'DodgerBlue';
// RGB values
mycolor.rgb = [255, 0, 0];
mycolor.red = 255;
mycolor.green = 0;
mycolor.blue = 0;
//  HEX expresion
mycolor.hex = '#FF0000';
// HSL vector
mycolor.hsl = [0, 1, 0.5];
// HSV vector
mycolor.hsv = [0, 1, 1];
// Luminance
mycolor.luminance = 0.5;
// Saturation
mycolor.saturation = 1;
// Hue
mycolor.hue = 1;
````

# Methods

````javascript
// Inverts the color
mycolor.invert();
````
# Functions

````javascript
// HEX to RGB
Color.hexToRgb('#FF0000')
// RGB to HEX
Color.rgbToHex(255,0,0);
// RGB to HSL
Color.rgbToHsl(255, 0,0);
// HSL to RGB
Color.hslToRgb(0, 1, 0.5);
// RGB to HSL
Color.rgbToHsv(255,0,0);
// HSL to RGB
Color.hsvToRgb(0,1,1);
// Change the luminance in a factor [0-1]
Color.Luminance([255,0,0], 0.25);
// Retrieves the hex value for an HTML5 color name
Color.HTML5('Red');
// Inverts a color from its hex expresion
Color.invert('#FF0000');
// Interpolates between colors at a percent value
Color.gradient('Red', {hex:'#00FFCC'}, 75);
````

# Gradients

This object lets you define a color scale and get an interpolated value at any point from 0 to 100. Just declare an array of `{stop, color}` steps, where:

* stop: integer 0-100
* color: HTML5 name, hex expresion, RGB vector, HSV vector or HSL vector

````javascript
mygradient =new Color.Gradient([{
                    stop: 0,
                    color: '{rgb:[255,0,0]}'
                    }, {
                    stop: 50,
                    color: '#FFFF00'
                    }, {
                    stop: 100,
                    color: 'Lime'
                }]);
````

Then you can retrieve the value in the scale like:

````javascript
mygradient.get(23);
````
