## Scrollytelling Tools

### These javascripts help creating ScrollyTelling pages

<br/>
<br/>
<br/>

# Sticky

### sticky.js

creates multiple sticky elements in the page using other elements for start and end points for fixing them on top

See an working example [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/stickyexample.html).

## How it works

execute the javascript function `addStickFromIdMarks` to add all the Elements in the page that will be fixed to the top when the scroll hits an element marked as a start point, and released when the scroll hits an element marked as an end point.

`addStickyFromIdMarks(ElementID, StartElementID, EndElementID, Y-Offset);`

The Elements will receive the CSS class `.stickyIt` when fixed.

## How to use / implementation

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

<br/>
<br/>
<br/>

# FollowMe

### followme.js

show or hide blocks while marked elements are visible on the screen.

See an working example [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/followmeexample.html).

## How it works

execute the javascript function `addFollowFromIdMarks` to add all the Elements in the page that will be followed (and follows) when visible on the screen.

`addFollowFromIdMarks(elId, followeeId, YDisplaceFactor);`

The Elements folowing others will receive the CSS class `.followingSomebody` while the original Element been followed will receive the CSS class `.beenFollowed`, when visible on the screen.

## How to use / implementation

First, insert the javascript code to your page. You can download the `followme.js` and call it in your own site, like this:

```
<script src='./followme.js'></script>
```

Or you can call it from where it is hosted online:

```
<script src='https://www.ranoya.com/Assets/JSLibs/Scrollytelling/followme.js'></script>
```

Then, style the follow elements in your CSS as you wish:

```
.beenFollowed {
        transition: all .6s ease-in;
        border: 3px solid black !important;
    }

.followingSomebody {
        transition: all .4s ease-in;
        display: inline-block !important;

    }

#panel2.followingSomebody {
        transition: all .4s ease-in;
        display: inline-block !important;
        opacity: 1 !important;
    }
```

And finally, call the `addFollowFromIdMarks` function as many times you need:

```
addFollowFromIdMarks("blocoR", "info1", 15);
addFollowFromIdMarks("blocoA", "info2", 30);
```

<br/>
<br/>
<br/>

# Scroll Start

### scrollstart.js

creates multiple changing elements by the scroll in the page using other elements as kickstarters

See an working example [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/scrollstartexample.html).

## How it works

execute the javascript function `addStartFromId` to add all the Elements in the page that will be changed by the scroll when another Element hit the top of the browser.

`addStickyFromIdMarks(ElementID, StartElementID, Y-Offset);`

The Elements will receive the CSS class `.scrollStart` when started.

## How to use / implementation

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

<br/>
<br/>
<br/>

# AudioLead

### audiolead.js

creates an element containing images ou websites (iframe) inside a specified element, and change them following an audio or video HTML5 element. Using the seek of this element will change the images/websites, even if the audio is on pause.

See working examples [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/audioleadexample.html) and [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/audioleadexample2.html).

## How it works

execute the javascript function `addAudioLead` to add all the Elements to be presented following audio ou video elements on the document.

`addAudioLead(ElementID, AudioOrVideoHTMLElementId, jsonWithAssets);`

## How to use / implementation

First, insert the javascript code to your page. You can download the `audiolead.js` and call it in your own site, like this:

```
<script src='./audiolead.js'></script>
```

Or you can call it from where it is hosted online:

```
<script src='https://www.ranoya.com/Assets/JSLibs/Scrollytelling/audiolead.js'></script>
```

Then, add the stage, the audio/video controller, and the assets to be shown:

```
addAudioLead('MySlideStage', 'MyVidComponent', [
                                        { 'time': 0,
                                          'href': 'myimage1.jpg'
                                        },
                                        {
                                          'time': 10,
                                          'pause' : true,
                                          'href': 'myimage2.png'
                                        },
                                        {
                                          'time': 15,
                                          'href': 'myimage3.svg'
                                        }
                                   ]);
```

When using 'pause': true in an object, the audio/video will be paused and put 1 second foward, waiting to be continued.

It's possible to extend the functionality of AudioLead, overwriting the function `audiolead_interface`. On every update, the `audiolead_interface` function will be called, passing two parameters: the actual position in the json object, and the object itself. To overwrite the function, use this in your code:

```
audiolead_interface = function (position, json) {

     // your code

}
```

<br/>
<br/>
<br/>

# AudioAnchor

### audioanchor.js

points to an anchor tag in the document following an audio or video HTML5 element Using the seek of this element will point to the desired anchor even if the audio is on pause.

See working examples [here](https://www.ranoya.com/Assets/JSLibs/Scrollytelling/audioanchorexample.html).

## How it works

execute the javascript function `addAudioAnchor` to add all the video/audio elements used to move throught the document.

`addAudioAnchor(AudioOrVideoHTMLElementId, jsonWithAnchorPoints);`

## How to use / implementation

First, insert the javascript code to your page. You can download the `audioanchor.js` and call it in your own site, like this:

```
<script src='./audioanchor.js'></script>
```

Or you can call it from where it is hosted online:

```
<script src='https://www.ranoya.com/Assets/JSLibs/Scrollytelling/audioanchor.js'></script>
```

Then, add the stage, the audio/video controller, and the assets to be shown:

```
addAudioAnchor('MyVidComponent', [
                                        { 'time': 0,
                                          'href': '#start'
                                        },
                                        {
                                          'time': 10,
                                          'pause' : true,
                                          'href': '#midpoint'
                                        },
                                        {
                                          'time': 15,
                                          'href': '#end'
                                        }
                                   ]);
```

When using 'pause': true in an object, the audio/video will be paused and put 1 second foward, waiting to be continued.

It's possible to extend the functionality of AudioAnchor, overwriting the function `audioanchor_interface`. On every update, the `audioanchor_interface` function will be called, passing two parameters: the actual position in the json object, and the object itself. To overwrite the function, use this in your code:

```
audiolead_interface = function (position, json) {

     // your code

}
```
