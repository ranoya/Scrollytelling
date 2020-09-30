# Scrollytelling Tools

These javascripts help creating ScrollyTelling pages

## Sticky

creates multiple sticky elements in the page using other elements for start and end points for fixing them on top

See an working example [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/stickyexample.html).

### How it works

execute the javascript function `addStickFromIdMarks` to add all the Elements in the page that will be fixed to the top when the scroll hits an element marked as a start point, and released when the scroll hits an element marked as an end point.

`addStickyFromIdMarks(ElementID, StartElementID, EndElementID, Y-Offset);`

The Elements will receive the CSS class `.stickyIt` when fixed.

### How to use / implementation

First, insert the javascript code to your page. You can download the `sticky.js` and call it in your own site, like this:

```
<script src='./sticky.js'></script>
```

Or you can call it from where it is hosted online:

```
<script src='https://www.ranoya.com/Assets/JSLibs/Scrollytelling/sticky.js'></script>
```

Then, style the follow elements in your CSS as you wish:

```
.stickyIt {

     z-index: 100;

}

#blocoR.stickyIt {
     right: 0;
     top: 0;
}

#blocoL2.stickyIt {
     left: 0;
     top: 0;
}
```

And finally, call the `addStickFromIdMarks` function as many times you need:

```
addStickFromIdMarks("blocoR", "blocoS", "blocoE");
addStickFromIdMarks("blocoL2", "blocoE", "blocoE2", 120);
```

## Scroll Start

creates multiple changing elements by the scroll in the page using other elements as kickstarters

See an working example [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/scrollstartexample.html).

### How it works

execute the javascript function `addStartFromId` to add all the Elements in the page that will be changed by the scroll when another Element hit the top of the browser.

`addStickyFromIdMarks(ElementID, StartElementID, Y-Offset);`

The Elements will receive the CSS class `.scrollStart` when started.

### How to use / implementation

First, insert the javascript code to your page. You can download the `scrollstart.js` and call it in your own site, like this:

```
<script src='./scrollstart.js'></script>
```

Or you can call it from where it is hosted online:

```
<script src='https://www.ranoya.com/Assets/JSLibs/Scrollytelling/scrollstart.js'></script>
```

Then, style the follow elements in your CSS as you wish:

```
#blocoR.scrollStart {
    right: 0;
    top: 0;
}
```

And finally, call the `addStartFromId` function as many times you need:

```
addStartFromId("blocoR", "blocoS", "blocoE");
addStartFromId("blocoL2", "blocoE", "blocoE2", 120);
```
