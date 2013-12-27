# Color.js

Parse les couleurs `rgb`, `rgba`, `array` et `hex`.

Exemple de couleur: `#000`, `rgba(255, 255, 255, 0.5)`, `rgb(90, 90, 90)`, `#FFAA00FF`, `#557700`.

### Exemple

```js
var color = new Color('#FFAA00FF');

console.log(color.r);
console.log(color.g);
console.log(color.b);
console.log(color.a);
```

Affiche `255`, `170`, `0` et `1`.

### Références

##### class Color

###### Fonctions

* `Color.hex(color)` _(String)_ Retourne la couleur au format `hexadecimal`. Exemple: `Color.hex('rgba(255, 255, 255, 0.5)')` retourne `"#ffffff7f"`
* `Color.rgba(color)` _(String)_ Retourne la couleur au format `rgba`. Exemple: `Color.rgba('#5a5a5a')` retourne `"rgba(90,90,90,1)"`
* `Color.array(color)` _(String)_ Retourne la couleur au format `array`. Exemple: `Color.array('#000')` retourne `[0, 0, 0, 1]`

###### Propriétés

* `.r` _(int)_ Rouge. (0 à 255)
* `.g` _(int)_ Vert. (0 à 255)
* `.b` _(int)_ Bleu. (0 à 255)
* `.a` _(float)_ Alpha (transparence). (0 à 1)