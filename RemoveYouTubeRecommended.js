// ==UserScript==
// @name        Remove YouTube recommended videos
// @author      /u/Signe_
// @description Hides youtube recommended for you in side bar 
// @include     *.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
var SpanLength = - 1;
var iRemovedVideos = 0;
var _Counter = 0;
var CurrentVideoHref = '';
var tDetectNewVideos;
function SetupTimer() {
  tDetectNewVideos = setInterval(Detect_NewVideos, 1000);
} //Detects when you click on a new video or the 'show more' button

function Detect_NewVideos() {
  var spans = document.getElementsByClassName('view-count');
  var Temp = window.location.href;
  if (spans.length > SpanLength || Temp != CurrentVideoHref && _Counter > 3)
  {
    if (window.location.href.includes('watch?v='))
    {
      RemoveRecommended();
      var RemovedVideos = iRemovedVideos;
      console.log('[DetectVideos] Removed ' + RemovedVideos + ' new videos');
    }    //clearInterval(tDetectNewVideos);
  }
  _Counter++;
} //Actually removes the recommended videos from view

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
SetupTimer();
//RemoveRecommended();
