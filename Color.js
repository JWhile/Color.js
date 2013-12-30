var Color;

(function(){

// function isNum(Number num):boolean
var isNum = function(num)
{
    return (typeof num === 'number');
};

// function colorToArray(String|Array|Color|Object color)
var colorToArray = function(color)
{
    var re = [0, 0, 0,  1];

    if(typeof color === 'string')
    {
        if(color.substr(0, 3) === 'rgb')
        {
            re = color.match(/[0-9\.]+/gi);

            for(var i = 0; i < 4; i++)
            {
                re[i] = parseFloat(re[i] || ((i === 3)? 1 : 0));
            }
        }
        else if(color[0] === '#')
        {
            var len = (color.length >= 7)? 2 : 1;

            var parse = function(hex)
            {
                return parseInt(((len === 1)? hex + hex : hex), 16);
            };

            re[0] = parse(color.substr(1, len)) || 0;
            re[1] = parse(color.substr(1 + len, len)) || 0;
            re[2] = parse(color.substr(1 + len + len, len)) || 0;
            re[3] = (parse(color.substr(1 + len + len + len, len)) || 255) / 255;
        }
    }
    else if(color instanceof Array)
    {
        for(var i = 0; i < 4; i++)
        {
            var n = color[i];

            re[i] = isNum(n)? n : parseFloat(n);
        }
    }
    else
    {
        re[0] = isNum(color.r)? color.r : 0;
        re[1] = isNum(color.g)? color.g : 0;
        re[2] = isNum(color.b)? color.b : 0;
        re[3] = isNum(color.a)? color.a : 1;
    }

    for(var i = 0; i < 4; i++)
    {
        var n = re[i];

        if(!isNum(n) || isNaN(n))
        {
            re[i] = (i === 3)? 1 : 0;
        }
        else if(n < 0)
        {
            re[i] = 0;
        }
        else if(n > 255 || (i === 3 && n > 1))
        {
            re[i] = (i === 3)? 1 : 255;
        }
        else if(i < 3)
        {
            re[i] = n | 0;
        }
    }

    return re;
};

/**
 * class Color
 */
Color = function(color)
{
    var arr = colorToArray(color)

    this.r = arr[0];
    this.g = arr[1];
    this.b = arr[2];
    this.a = arr[3];
};

// function Color.hex(String|Array|Color color)
Color.hex = function(color)
{
    color = colorToArray(color);

    var hex = '#';

    for(var i = 0; i < 3; i++)
    {
        hex += ('0'+ (color[i].toString(16))).slice(-2);
    }

    if(color[3] !== 1)
    {
        hex += ('0'+ ((color[3] * 255 | 0).toString(16))).slice(-2);
    }

    return hex;
};

// function Color.rgb(String|Array|Color color)
Color.rgba = function(color)
{
    color = colorToArray(color);

    return 'rgba('+ color[0] +','+ color[1] +','+ color[2] +','+ color[3] +')';
};

// function Color.array(String|Array|Color color)
Color.array = colorToArray;

})();
