/**
 * 
 * SCROLLYTELLING MULTIPLE START BY SCROLL
 * Guilherme Ranoya, 2020
 * 
 * This javascript creates multiple kickstarting elements in the page 
 * using other elements for igniting the change in them
 * 
 * Your can style all these elements in your CSS with:
 * 
 * #ElementID.scrollStart {
 *    right: 0;
 *    top: 0;
 * }
 * 
 * Example
 * 
 *
 * #blocoR.scrollStart {
 *    right: 0;
 *    top: 0;
 * }
 *
 * 
 * 
 * To setup all the elements, use:
 * addStartFromId(ElementID, StartPointElementID,Y-Offset);
 * 
 * Example
 * addStartFromId("blocoR", "blocoS");
 * addStartFromId("blocoL2", "blocoE", 120);
 * 
 * 
 */





var SStartObjectsMatrix = [];
var SSOM_enum = 0;
var startbyscroll;
var SBS_Running = false;
var sbs_scrollevent = 0;
var lastsbs_scrollevent = 0;

function addStartFromId(elId, startId, offsetY) {

    if (offsetY == undefined) {
        offsetY = 0;
    }

    console.log(SSOM_enum);

    SStartObjectsMatrix[SSOM_enum] = {};

    SStartObjectsMatrix[SSOM_enum].el = elId;
    SStartObjectsMatrix[SSOM_enum].originalClass = document.getElementById(elId).className;
    SStartObjectsMatrix[SSOM_enum].startMark = startId;

    if (offsetY != undefined) {
        SStartObjectsMatrix[SSOM_enum].offsetY = offsetY;
    }

    if (!SBS_Running) {
        SBS_Run();
    }

    SSOM_enum++;

}

function SBS_Run() {

    if (!SBS_Running) {
        startbyscroll = setInterval(SBS_Engine, 5);
    }

}

function SBS_Engine() {

    if (window.scrollY != lastsbs_scrollevent) {


        for (var k = 0; k < SSOM_enum; k++) {

            var tamanhooffset = 0;
            if (SStartObjectsMatrix[k].offsetY != undefined) {

                tamanhooffset = document.getElementById(SStartObjectsMatrix[k].el).getBoundingClientRect().height + SStartObjectsMatrix[k].offsetY;

            } else {

                tamanhooffset = document.getElementById(SStartObjectsMatrix[k].el).getBoundingClientRect().height;

            }


            // CASO ENQUADRE
            if (document.getElementById(SStartObjectsMatrix[k].startMark).getBoundingClientRect().top <= (0 - document.getElementById(SStartObjectsMatrix[k].startMark).getBoundingClientRect().height + SStartObjectsMatrix[k].offsetY)) {

                console.log("foi");

                document.getElementById(SStartObjectsMatrix[k].el).className = SStartObjectsMatrix[k].originalClass + " scrollStart";

            }

        }

        lastsbs_scrollevent = window.scrollY;

    }

}