// ==UserScript==
// @name        Remove YouTube recommended videos
// @namespace   /u/Signe_
// @description Hides youtube recommended for you in side bar 
// @include     *.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
var SpanLength = - 1;
var iRemovedVideos = 0;
var _Counter = 0;
var CurrentVideoHref = "";

var tDetectNewVideos;

function SetupTimer() {
  tDetectNewVideos = setInterval(Detect_NewVideos, 1000);
}
//Detects when you click on a new video or the 'show more' button
function Detect_NewVideos() { 
  if (SpanLength == - 1)
  {
    console.log('[DetectVideos] No videos inside');
    clearInterval(tDetectNewVideos);
    return;
  }
  var spans = document.getElementsByClassName('view-count');
  var Temp = window.location.href;
  
  
  if (spans.length > SpanLength || Temp != CurrentVideoHref && _Counter > 3)
  {
    RemoveRecommended();
    var RemovedVideos = iRemovedVideos;
    console.log('[DetectVideos] Removed ' + RemovedVideos + ' new videos');
    clearInterval(tDetectNewVideos);
  }
  _Counter++;
  if (_Counter >= 10) { //if it takes more than 10 seconds abort
    console.log("[DetectVideos] Cleared Timer after 10 seconds");
    clearInterval(tDetectNewVideos);
  }
}
//Actually removes the recommended videos from view
function RemoveRecommended() {
  iRemovedVideos = 0;
  //CurrentVideoTitle = getContentByMetaTagName("og:title");
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
    else
    {
      spans[i].parentNode.addEventListener('click', SetupTimer, false);
    }
    if (spans[i].innerHTML.includes(searchText))
    {
      spans[i].parentNode.style.display = 'none';
      spans[i].innerHTML = '[DetectVideos] Removed';
      iRemovedVideos++;
    } 
    else
    {
      spans[i].parentNode.addEventListener('click', SetupTimer, false);
    }
  }
  var WatchMore = document.getElementsByClassName('yt-uix-button');
  for (var b = 0; b < WatchMore.length; b++)
  {
    if (WatchMore[b].id == 'watch-more-related-button')
    {
      WatchMore[b].addEventListener('click', SetupTimer, false);
      break;
    }
  }
  SpanLength = spans.length;
  console.log('[DetectVideos] Removed ' + iRemovedVideos + ' Videos');
  console.log('[DetectVideos] Finished');
}
RemoveRecommended();
