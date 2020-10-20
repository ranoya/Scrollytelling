/**
 * 
 * AUDIO ANCHOR FOR MOVING THOUGHT A HTML FROM SOUND
 * Guilherme Ranoya, 2020
 * 
 * This javascript points to an anchor tag in the document following
 * an audio or video HTML5 element. Using the seek of this element
 * will point to the desired anchor even if the audio is on pause.
 *  
 * If you will use only one AudioAnhor instance, you can set the start
 * time of the audio element with the URL variable 'start'
 * Ex:
 * https://www.mypage.com/index.html?start=45
 * 
 * 
 * 
 * To setup all the elements, use:
 * addAudioAnchor(AudioOrVideoHTMLElementId, ObjectWithAssets);
 * 
 * Example
 * addAudioAnchor('VidComponent', [
 *                                       { 'time': 0,
 *                                         'href': '#start'
 *                                       },
 *                                       {
 *                                         'time': 10,
 *                                         'pause' : true,
 *                                         'href': '#midpoint'
 *                                       },
 *                                       {
 *                                         'time': 15,
 *                                         'href': '#lastpart' 
 *                                       }
 *                                  ]);
 *
 * 
 * You can extend the functionality of Audio Anchor overwriting
 * the empty function audioanchor_interface:
 * 
 * audioanchor_interface = function (blocknumber, assetsObject) {
 * 
 *  YOUR CODE
 *  WHERE, USING THE EXAMPLE ABOVE, WHEN THE TIME IS 12s,
 *  assetsObject[blocknumber].href IS myimage2.png
 *  AND blocknumber IS 1
 * 
 * }
 * 
 */



$_GET = [];
(function () {
    corte = window.location.href.toString().indexOf('?');
    if (corte > 0) {
        argumento = window.location.href.toString().substring(corte + 1);
        argumentos = argumento.split('&');
        for (arg in argumentos) {
            let argCorte = argumentos[arg].indexOf('=');
            $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(argCorte + 1);
        }
    }
})();



var audioanchorenumerator = 0;

function addAudioAnchor(audioElementId, assetsObject) {

    var controle = document.getElementById(audioElementId);

    controle.ontimeupdate = function () {

        audioanchor_update(assetsObject, controle);

    }

    if ($_GET['start']) {

        controle.currentTime = $_GET['start'];

    }

    audioanchorenumerator++;

}


function audioanchor_update(assetsobj, audioctrl) {

    var bloco = 0;
    for (var i = 0; i < assetsobj.length; i++) {
        // ponto atual
        if (assetsobj[i].time < audioctrl.currentTime) {
            bloco = i;
        }
    }

    window.location = assetsobj[bloco].href;

    if (assetsobj[bloco].pause && assetsobj[bloco].used == null) {
        assetsobj[bloco].used = "usado";
        audioctrl.pause();
        audioctrl.currentTime++;
    }

    if (assetsobj[bloco - 1] != null && assetsobj[bloco - 1].used != null) {
        assetsobj[bloco - 1].used = null;
    }

    audioanchor_interface(bloco, assetsobj);

}


if (typeof audioanchor_interface == 'function') {
    // Already existis in code
} else {
    audioanchor_interface = function (slide_number, assetsObject) {

    }
}