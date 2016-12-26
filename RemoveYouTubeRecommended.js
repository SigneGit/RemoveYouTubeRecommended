// ==UserScript==
// @name        Remove YouTube recommended videos
// @author      /u/Signe_
// @description Hides youtube recommended for you in side bar 
// @include     *.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
var AnnouceNotaVideoLink = true;
var SpanLength = - 1;
var iRemovedVideos = 0;
var _Counter = 0;
var CurrentVideoHref = '';
var tDetectNewVideos;
function SetupTimer() {
  tDetectNewVideos = setInterval(Detect_NewVideos, 1000);
}//Detects when you click on a new video or the 'show more' button

function Detect_NewVideos() {
  try
  {
    var spans = document.getElementsByClassName('view-count');
    var Temp = window.location.href;
    if (!Temp.includes('watch?v=')) {
      if (AnnouceNotaVideoLink) {
        console.log('[DetectVideos] Not a video link aborting');
        AnnouceNotaVideoLink = false; //Don't repeat the same message every second
      }
      _Counter = 0;
      return;
    }
    AnnouceNotaVideoLink = true;
    if (spans.length > SpanLength || Temp != CurrentVideoHref && _Counter > 3)
    {
      RemoveRecommended();
      if (iRemovedVideos > 0)
      console.log('[DetectVideos] Removed ' + iRemovedVideos + ' new videos');
       else
      console.log('[DetectVideos] No videos removed ');
      _Counter = 0;
    }
    _Counter++;
  } 
  catch (err)
  {
    console.log('[DetectVideos] Error: ' + err.message)
  }
}//Actually removes the recommended videos from view

function RemoveRecommended() {
  iRemovedVideos = 0;
  SpanLength = 0;
  _Counter = 0;
  CurrentVideoHref = window.location.href;
  var spans = document.getElementsByClassName('view-count');
  var searchText = 'Recommended for you';
  for (var i = 0; i < spans.length; i++)
  {
    if (spans[i].textContent.includes(searchText))
    {
      spans[i].parentNode.style.display = 'none';
      spans[i].textContent = '[DetectVideos] Removed';
      iRemovedVideos++;
    }
    if (spans[i].innerHTML.includes(searchText))
    {
      spans[i].parentNode.style.display = 'none';
      spans[i].innerHTML = '[DetectVideos] Removed';
      iRemovedVideos++;
    }
  }
  SpanLength = spans.length;
}
SetupTimer();
