// Viewport playback for the retained, compiled Wayfind case study.
(function () {
  var videos = new Set();
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function sync() {
    videos.forEach(function (video) {
      if (!video.isConnected) { videos.delete(video); return; }
      var r = video.getBoundingClientRect();
      var area = r.width * r.height;
      var visible = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
      if (!document.hidden && !reduced.matches && area > 0 && visible / area >= .2) {
        if (video.paused) video.play().catch(function () {});
      } else video.pause();
    });
  }
  function discover() {
    document.querySelectorAll('video[data-viewport-autoplay]').forEach(function (video) {
      if (videos.has(video)) return;
      videos.add(video); video.muted = true; video.pause();
    });
    sync();
  }
  new MutationObserver(discover).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('scroll', sync, { passive: true, capture: true });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', sync);
  reduced.addEventListener('change', sync);
  discover();
})();
