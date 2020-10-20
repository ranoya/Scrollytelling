/**
 * 
 * SCROLLYTELLING MULTIPLE FOLLOW ELEMENTS
 * Guilherme Ranoya, 2020
 * 
 * This javascript show or hide blocks while marked elements 
 * are visible on the screen.
 * 
 * 
 * 
 * 
 * Your can style all the elements in your CSS with:
 * 
 * .beenFollowed {
 *   transition: all .6s ease-in;
 *   border: 3px solid black !important;
 * }
 *
 * .followingSomebody {
 *   transition: all .4s ease-in;
 *   display: inline-block !important;
 * }
 * #panel2.followingSomebody {
 *   transition: all .4s ease-in;
 *   display: inline-block !important;
 *   opacity: 1 !important;
 * }
 * 
 * 
 * To setup all the elements, use:
 * addFollowFromIdMarks(elId, followeeId, yDisplacementFactor);
 * 
 * Example
 * addFollowFromIdMarks("blocoR", "info1", 15);
 * addFollowFromIdMarks("blocoA", "info2", 30);
 * 
 * 
 */





var FollowObjectsMatrix = [];
var FOM_enumerator = 0;
var followbyscroll;
var FOM_Running = false;
var fom_scrollevent = 0;
var lastfom_scrollevent = 0;
var FOM_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function addFollowFromIdMarks(elId, followeeId, factor) {

    FollowObjectsMatrix[FOM_enumerator] = {};
    FollowObjectsMatrix[FOM_enumerator].follower = followeeId;
    FollowObjectsMatrix[FOM_enumerator].el = elId;
    FollowObjectsMatrix[FOM_enumerator].originalClass = document.getElementById(elId).className;
    FollowObjectsMatrix[FOM_enumerator].folowerOClass = document.getElementById(followeeId).className;
    FollowObjectsMatrix[FOM_enumerator].displace = 0;

    if (factor != undefined && factor > 0) {
        FollowObjectsMatrix[FOM_enumerator].factor = factor;
    } else {
        FollowObjectsMatrix[FOM_enumerator].factor = 0;
    }

    if (!FOM_Running) {
        FOM_Run();
    }

    FOM_enumerator++;

}

function FOM_Run() {

    if (!FOM_Running) {
        followbyscroll = setInterval(FOM_Engine, 5);
    }

}

function FOM_Engine() {

    if (window.scrollY != lastfom_scrollevent) {

        FOM_h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        for (var k = 0; k < FOM_enumerator; k++) {

            if (document.getElementById(FollowObjectsMatrix[k].el).getBoundingClientRect().top > 0 && document.getElementById(FollowObjectsMatrix[k].el).getBoundingClientRect().bottom < (FOM_h)) {



                document.getElementById(FollowObjectsMatrix[k].el).className = FollowObjectsMatrix[k].originalClass + " beenFollowed";

                document.getElementById(FollowObjectsMatrix[k].follower).className = FollowObjectsMatrix[k].folowerOClass + " followingSomebody";

                if (window.scrollY >= lastfom_scrollevent) {
                    document.getElementById(FollowObjectsMatrix[k].follower).style.top = (parseInt(document.getElementById(FollowObjectsMatrix[k].follower).getBoundingClientRect().top) - parseInt(FollowObjectsMatrix[k].factor)) + "px";

                } else {
                    document.getElementById(FollowObjectsMatrix[k].follower).style.top = (parseInt(document.getElementById(FollowObjectsMatrix[k].follower).getBoundingClientRect().top) + parseInt(FollowObjectsMatrix[k].factor)) + "px";

                }

            } else {

                document.getElementById(FollowObjectsMatrix[k].el).className = FollowObjectsMatrix[k].originalClass;

                document.getElementById(FollowObjectsMatrix[k].follower).className = FollowObjectsMatrix[k].folowerOClass;

            }

        }

        lastfom_scrollevent = window.scrollY;

    }

}