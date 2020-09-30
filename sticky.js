/**
 * 
 * SCROLLYTELLING MULTIPLE STICKY ELEMENTS
 * Guilherme Ranoya, 2020
 * 
 * This javascript creates multiple sticky elements in the page using other
 * elements for start and end points for fixing them on top
 * 
 * Your can style all these elements in your CSS with:
 * 
 * #ElementID.stickyIt {
 *    right: 0;
 *    top: 0;
 * }
 * 
 * Example
 * 
 * .stickyIt {
 *
 *    z-index: 100;
 *
 * }
 *
 * #blocoR.stickyIt {
 *    right: 0;
 *    top: 0;
 * }
 *
 * #blocoL2.stickyIt {
 *    left: 0;
 *    top: 0;
 * }
 * 
 * 
 * To setup all the elements, use:
 * addStickFromIdMarks(ElementID, StartPointElementID, EndPointElementID, Y-Offset);
 * 
 * Example
 * addStickFromIdMarks("blocoR", "blocoS", "blocoE");
 * addStickFromIdMarks("blocoL2", "blocoE", "blocoE2", 120);
 * 
 * 
 */





var StickObjectsMatrix = [];
var SOM_enumerator = 0;
var stickybyscroll;
var SOM_Running = false;
var som_scrollevent = 0;
var lastsom_scrollevent = 0;

function addStickFromIdMarks(elId, startId, endId, offsetY) {

    if (offsetY == undefined) {
        offsetY = 0;
    }

    console.log(SOM_enumerator);

    StickObjectsMatrix[SOM_enumerator] = {};

    StickObjectsMatrix[SOM_enumerator].el = elId;
    StickObjectsMatrix[SOM_enumerator].originalClass = document.getElementById(elId).className;
    StickObjectsMatrix[SOM_enumerator].startMark = startId;
    StickObjectsMatrix[SOM_enumerator].endMark = endId;
    StickObjectsMatrix[SOM_enumerator].passou = false;

    if (offsetY != undefined) {
        StickObjectsMatrix[SOM_enumerator].offsetY = offsetY;
    }

    if (!SOM_Running) {
        SOM_Run();
    }

    SOM_enumerator++;

}

function SOM_Run() {

    if (!SOM_Running) {
        stickybyscroll = setInterval(SOM_Engine, 5);
    }

}

function SOM_Engine() {

    if (window.scrollY != lastsom_scrollevent) {


        for (var k = 0; k < SOM_enumerator; k++) {

            var tamanhooffset = 0;
            if (StickObjectsMatrix[k].offsetY != undefined) {

                tamanhooffset = document.getElementById(StickObjectsMatrix[k].el).getBoundingClientRect().height + StickObjectsMatrix[k].offsetY;

            } else {

                tamanhooffset = document.getElementById(StickObjectsMatrix[k].el).getBoundingClientRect().height;

            }


            // CASO AINDA NÃO SE ENQUADRE
            if (document.getElementById(StickObjectsMatrix[k].startMark).getBoundingClientRect().top > (0 - document.getElementById(StickObjectsMatrix[k].startMark).getBoundingClientRect().height + StickObjectsMatrix[k].offsetY)) {


                //console.log(document.getElementById(StickObjectsMatrix[k].el).id + " " + document.getElementById(StickObjectsMatrix[k].el).className + " não deve ser fixado");

                StickObjectsMatrix[k].passou = false;
                document.getElementById(StickObjectsMatrix[k].el).className = StickObjectsMatrix[k].originalClass;
                document.getElementById(StickObjectsMatrix[k].el).style.position = "relative";
                document.getElementById(StickObjectsMatrix[k].el).style.top = "0";

            }

            // CASO SE ENQUADRE
            if (document.getElementById(StickObjectsMatrix[k].startMark).getBoundingClientRect().top <= (0 - document.getElementById(StickObjectsMatrix[k].startMark).getBoundingClientRect().height + StickObjectsMatrix[k].offsetY) && document.getElementById(StickObjectsMatrix[k].endMark).getBoundingClientRect().top > tamanhooffset) {


                //console.log(document.getElementById(StickObjectsMatrix[k].el).id + " " + document.getElementById(StickObjectsMatrix[k].el).className + " se enquadra ");

                StickObjectsMatrix[k].passou = false;
                document.getElementById(StickObjectsMatrix[k].el).className = StickObjectsMatrix[k].originalClass + " stickyIt";
                document.getElementById(StickObjectsMatrix[k].el).style.position = "fixed";

                var tamanhoposiciona = 0;
                if (StickObjectsMatrix[k].offsetY != undefined) {
                    tamanhoposiciona = StickObjectsMatrix[k].offsetY + "px";
                } else {
                    tamanhoposiciona = 0;
                }

                document.getElementById(StickObjectsMatrix[k].el).style.top = tamanhoposiciona;

            }

            // CASO PASSE
            if (document.getElementById(StickObjectsMatrix[k].endMark).getBoundingClientRect().top < tamanhooffset) {


                //console.log(document.getElementById(StickObjectsMatrix[k].el).id + " " + document.getElementById(StickObjectsMatrix[k].el).className + " passou ");

                document.getElementById(StickObjectsMatrix[k].el).style.position = "absolute";

                if (!StickObjectsMatrix[k].passou) {
                    StickObjectsMatrix[k].passou = true;
                    var novotamanho = 0;
                    if (StickObjectsMatrix[k].offsetY != undefined) {
                        novotamanho = window.scrollY + StickObjectsMatrix[k].offsetY + "px";
                    } else {
                        novotamanho = window.scrollY + "px";
                    }
                    document.getElementById(StickObjectsMatrix[k].el).style.top = novotamanho;
                }


            }




        }

        lastsom_scrollevent = window.scrollY;

    }

}