/**
 * 
 * AUDIO LEAD FOR SLIDE/IMAGE CHANGING
 * Guilherme Ranoya, 2020
 * 
 * This javascript creates an element containing images ou websites
 * (iframe) inside a specified element, and change them following
 * an audio or video HTML5 element. Using the seek of this element
 * will change the images/websites, even if the audio is on pause.
 *  
 * If you will use only one AudioLead instance, you can set the start
 * time of the audio element with the URL variable 'start'
 * Ex:
 * https://www.mypage.com/index.html?start=45
 * 
 * 
 * 
 * To setup all the elements, use:
 * addAudioLead(ElementID, AudioOrVideoHTMLElementId, ObjectWithAssets);
 * 
 * Example
 * addAudioLead('MySlideStage', 'VidComponent', [
 *                                       { 'time': 0,
 *                                         'href': 'myimage1.jpg'
 *                                       },
 *                                       {
 *                                         'time': 10,
 *                                         'pause' : true,
 *                                         'href': 'myimage2.png'
 *                                       },
 *                                       {
 *                                         'time': 15,
 *                                         'href': 'myimage3.svg' 
 *                                       }
 *                                  ]);
 *
 * 
 * You can extend the functionality of Audio Lead overwriting
 * the empty function audiolead_interface:
 * 
 * audiolead_interface = function (slidenumber, assetsObject) {
 * 
 *  YOUR CODE
 *  WHERE, USING THE EXAMPLE ABOVE, WHEN THE TIME IS 12s,
 *  assetsObject[slidenumber].href IS myimage2.png
 *  AND slidenumber IS 1
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



var audioleadenumerator = 0;

function addAudioLead(elId, audioElementId, assetsObject) {

    var campoinit = document.getElementById(elId);
    var controle = document.getElementById(audioElementId);

    // Preload de imagens

    for (var i = 0; i < assetsObject.length; i++) {

        if (assetsObject[i].href.toUpperCase().indexOf('SVG') >= 0 || assetsObject[i].href.toUpperCase().indexOf('JPG') >= 0 || assetsObject[i].href.toUpperCase().indexOf('JPEG') >= 0 || assetsObject[i].href.toUpperCase().indexOf('PNG') >= 0) {
            var imagem = new Image;
            imagem.src = assetsObject[i].href;
        }
    }

    campoinit.innerHTML = "<iframe frameborder=0 id='audioleadstage" + audioleadenumerator + "' style='width: 100%; height: 100%; margin: 0; padding: 0; border: 0; background-color: transparent; background-size: contain; background-position: center center; background-repeat: no-repeat;'></iframe>";

    campo = document.getElementById('audioleadstage' + audioleadenumerator);

    if (assetsObject[0].href.toUpperCase().indexOf('SVG') >= 0 || assetsObject[0].href.toUpperCase().indexOf('JPG') >= 0 || assetsObject[0].href.toUpperCase().indexOf('JPEG') >= 0 || assetsObject[0].href.toUpperCase().indexOf('PNG') >= 0) {
        campo.style.backgroundImage = "url(" + assetsObject[0].href + ")";
    } else {
        campo.src = assetsObject[0].href;
    }

    var elementocampo = 'audioleadstage' + audioleadenumerator;

    controle.ontimeupdate = function () {

        audiolead_update(assetsObject, controle, elementocampo);

    }

    if ($_GET['start']) {

        controle.currentTime = $_GET['start'];

    }

    audioleadenumerator++;

}


function audiolead_update(assetsobj, audioctrl, campoId) {

    var bloco = 0;
    for (var i = 0; i < assetsobj.length; i++) {
        // ponto atual
        if (assetsobj[i].time < audioctrl.currentTime) {
            bloco = i;
        }
    }

    if (assetsobj[bloco].href.toUpperCase().indexOf('SVG') >= 0 || assetsobj[bloco].href.toUpperCase().indexOf('JPG') >= 0 || assetsobj[bloco].href.toUpperCase().indexOf('JPEG') >= 0 || assetsobj[bloco].href.toUpperCase().indexOf('PNG') >= 0) {
        var frame = document.getElementById(campoId).src = '';
        document.getElementById(campoId).style.backgroundImage = "url(" + assetsobj[bloco].href + ")";
    } else {
        document.getElementById(campoId).src = assetsobj[bloco].href;
    }

    if (assetsobj[bloco].pause && assetsobj[bloco].used == null) {
        assetsobj[bloco].used = "usado";
        audioctrl.pause();
        audioctrl.currentTime++;
    }

    if (assetsobj[bloco - 1] != null && assetsobj[bloco - 1].used != null) {
        assetsobj[bloco - 1].used = null;
    }

    audiolead_interface(bloco, assetsobj);

}

if (typeof audiolead_interface == 'function') {
    // Already existis in code
} else {
    audiolead_interface = function (slide_number, assetsObject) {

    }
}