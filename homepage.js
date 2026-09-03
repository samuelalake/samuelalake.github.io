// Homepage + About — dark toggle, no-jump typing hero, Figma cursor, SVG sequence player.
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Color mode ---
  var root = document.documentElement;
  var wrapper = document.querySelector("[data-color-mode]");
  function applyMode(mode) {
    root.setAttribute("data-color-mode", mode);
    if (wrapper) wrapper.setAttribute("data-color-mode", mode);
  }
  applyMode(root.getAttribute("data-color-mode") || "light");
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-color-mode") === "dark" ? "light" : "dark";
      applyMode(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // --- Nav underline: pinned to the header's bottom edge, under the active tab (slides between tabs) ---
  var navHeader = document.querySelector(".repo-page-header");
  var activeTab = document.querySelector('.header-nav a[aria-current="page"]');
  if (navHeader && activeTab) {
    var ul = document.createElement("div");
    ul.className = "nav-underline";
    navHeader.appendChild(ul);
    var placeUnderline = function () {
      var lr = activeTab.getBoundingClientRect(), hr = navHeader.getBoundingClientRect();
      ul.style.left = (lr.left - hr.left) + "px";
      ul.style.width = lr.width + "px";
    };
    placeUnderline();
    window.addEventListener("resize", placeUnderline);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeUnderline);
  }

  // --- Typing hero: the full text always occupies its final height (typed + transparent untyped), so nothing jumps ---
  var title = document.getElementById("hero-title");
  if (title) {
    var typed = title.querySelector(".type-typed");
    var untyped = title.querySelector(".type-untyped");
    var full = untyped ? untyped.textContent : "";
    if (reduce) {
      typed.textContent = full;
      untyped.textContent = "";
      title.classList.add("done");
    } else {
      var i = 0;
      (function tick() {
        typed.textContent = full.slice(0, i);
        untyped.textContent = full.slice(i);
        if (i < full.length) { i++; setTimeout(tick, 34); }
        else { title.classList.add("done"); }
      })();
    }
  }

  // --- Figma-style cursor + color customization (mouse pointers only) ---
  if (matchMedia("(pointer: fine)").matches) {
    var CURSOR_COLORS = [
      { name: "Black", value: "#111820", def: true },
      { name: "Orange", value: "#fd8c73" },
      { name: "Red", value: "#f24822" },
      { name: "Blue", value: "#007be5" },
      { name: "Purple", value: "#8250df" }
    ];
    var savedColor = null;
    try { savedColor = localStorage.getItem("cursorColor"); } catch (e) {}
    var current = CURSOR_COLORS.filter(function (c) { return c.value === savedColor; })[0] || CURSOR_COLORS[0];
    document.documentElement.style.setProperty("--cursor-color", current.value);

    var cur = document.createElement("div");
    cur.className = "fig-cursor hidden" + (current.def ? " cursor-default" : "");
    cur.innerHTML =
      '<span class="fc-arrow"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display:block;overflow:visible" aria-hidden="true">' +
      '<g filter="url(#fca_sh)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.43938 2.43938C3.85531 2.02345 4.47597 1.88901 5.02673 2.09555L16.0267 6.22055C16.6416 6.45111 17.035 7.05477 16.9976 7.71034C16.9603 8.36592 16.5009 8.921 15.8638 9.08026L11.237 10.237L10.0803 14.8638C9.921 15.5009 9.36592 15.9603 8.71034 15.9976C8.05477 16.035 7.45111 15.6416 7.22055 15.0267L3.09555 4.02673C2.88901 3.47597 3.02345 2.85531 3.43938 2.43938Z" fill="white"/></g>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.67558 3.03185C4.49199 2.963 4.2851 3.00782 4.14646 3.14646C4.00782 3.2851 3.963 3.49199 4.03185 3.67558L8.15685 14.6756C8.2337 14.8805 8.43492 15.0117 8.65345 14.9992C8.87197 14.9868 9.057 14.8336 9.11009 14.6213L10.4123 9.41232L15.6213 8.11009C15.8336 8.057 15.9868 7.87197 15.9992 7.65345C16.0117 7.43492 15.8805 7.2337 15.6756 7.15685L4.67558 3.03185Z" class="fc-fill"/>' +
      '<defs><filter id="fca_sh" x="0" y="0" width="20.0001" height="20" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hard"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1.5"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/><feBlend mode="normal" in2="bg" result="s"/><feBlend mode="normal" in="SourceGraphic" in2="s"/></filter></defs>' +
      '</svg></span>' +
      '<span class="fc-hand"><svg width="23" height="25" viewBox="0 0 23 25" fill="none" style="display:block;overflow:visible" aria-hidden="true">' +
      '<g filter="url(#fch_a)"><path d="M4.86863 15.6038C4.48276 14.9267 4.108 14.3252 3.63746 13.7605C2.66516 12.5937 2.8228 10.8597 3.98956 9.88739C4.78626 9.22347 5.84747 9.0864 6.75005 9.43771V4.75C6.75005 3.23122 7.98127 2 9.50005 2C11.0188 2 12.25 3.23122 12.25 4.75V6.01122C12.8074 6.06151 13.3165 6.27822 13.7274 6.61029C13.9728 6.53851 14.2322 6.5 14.5 6.5C15.569 6.5 16.4952 7.10965 16.9503 8.00044C16.9669 8.00015 16.9834 8 17 8C18.5188 8 19.75 9.23122 19.75 10.75V13.7895C19.7501 17.7717 16.5218 21 12.5395 21H12.2501C10.8613 21 9.61141 20.7127 8.51094 20.0696C7.43038 19.4381 6.70223 18.5837 6.16797 17.8029C5.78755 17.2469 5.46293 16.6652 5.16356 16.1287L5.15368 16.111C5.05732 15.9384 4.96351 15.7703 4.86863 15.6038Z" fill="white"/></g>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.6265 7 13.1761 7.32921 13.4853 7.82407C13.7715 7.62003 14.1217 7.5 14.5 7.5C15.4395 7.5 16.206 8.24025 16.2482 9.16928C16.476 9.06075 16.7309 9 17 9C17.9665 9 18.75 9.7835 18.75 10.75V13.7895C18.75 17.2195 15.9695 20 12.5395 20H12.25C11.0025 20 9.93445 19.7433 9.01549 19.2062C8.10909 18.6765 7.48096 17.951 6.99326 17.2382C6.63865 16.7199 6.3327 16.1717 6.02688 15.6237C5.93088 15.4517 5.8349 15.2797 5.73743 15.1087C5.34135 14.4137 4.9324 13.7524 4.40566 13.1203C3.78692 12.3778 3.88724 11.2744 4.62972 10.6556C5.37221 10.0369 6.47569 10.1372 7.09443 10.8797C7.3332 11.1662 7.55047 11.4525 7.75003 11.735V4.75C7.75003 3.7835 8.53353 3 9.50002 3C10.4665 3 11.25 3.7835 11.25 4.75V7.16841C11.4773 7.06042 11.7316 7 12 7Z" class="fc-fill"/>' +
      '<g filter="url(#fch_b)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.02839 13.0086C8.3106 13.0299 8.75 12.8091 8.75 12.5V4.75C8.75 4.33579 9.08579 4 9.5 4C9.91421 4 10.25 4.33579 10.25 4.75V10.7191C10.25 10.9739 10.4416 11.188 10.6948 11.2161C10.991 11.249 11.25 11.0171 11.25 10.7191V8.75C11.25 8.33579 11.5858 8 12 8C12.4142 8 12.75 8.33579 12.75 8.75L12.75 11C12.75 11.2548 12.9416 11.4657 13.1948 11.4939C13.491 11.5268 13.75 11.298 13.75 11L13.75 9.25C13.7519 8.83745 14.087 8.5 14.5 8.5C14.9142 8.5 15.25 8.83579 15.25 9.25V11.2747C15.25 11.5295 15.4416 11.7435 15.6948 11.7716C15.991 11.8045 16.25 11.5727 16.25 11.2747V10.75C16.25 10.3358 16.5858 10 17 10C17.4142 10 17.75 10.3358 17.75 10.75L17.75 13.7895C17.75 16.6672 15.4172 19 12.5395 19H12.25C11.1439 19 10.2576 18.7739 9.52003 18.3428C8.78782 17.9149 8.25969 17.3183 7.81854 16.6735C7.4923 16.1967 7.18979 15.655 6.89024 15.1187C6.7956 14.9492 6.70092 14.7797 6.60622 14.6135C6.19988 13.9005 5.75676 13.1796 5.17385 12.4801C4.90868 12.1619 4.95167 11.689 5.26988 11.4238C5.58809 11.1587 6.06101 11.2017 6.32618 11.5199C6.625 11.8784 6.88916 12.239 7.12766 12.5943C7.34646 12.9203 7.66898 12.9815 8.02839 13.0086Z" fill="white"/></g>' +
      '<defs><filter id="fch_a" x="0" y="0" width="22.7501" height="25" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1.5"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/><feBlend mode="normal" in2="bg" result="s"/><feBlend mode="normal" in="SourceGraphic" in2="s"/></filter><filter id="fch_b" x="2" y="2" width="18.75" height="21" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="bg"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1.5"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/><feBlend mode="normal" in2="bg" result="s"/><feBlend mode="normal" in="SourceGraphic" in2="s"/></filter></defs>' +
      '</svg></span>' +
      '<span class="fig-label"></span>';
    document.body.appendChild(cur);
    var shown = false;
    var sel = 'a,button,[role="button"],input,select,textarea,label,summary';
    window.addEventListener("mousemove", function (e) {
      cur.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      if (!shown) { cur.classList.remove("hidden"); shown = true; }
      var over = e.target && e.target.closest && e.target.closest(sel);
      cur.classList.toggle("over-interactive", !!over);
    }, { passive: true });
    document.addEventListener("mouseleave", function () { cur.classList.add("hidden"); });
    document.addEventListener("mouseenter", function () { cur.classList.remove("hidden"); });

    // --- customization: entry icon = the cursor itself; menu = color grid + name field ---
    var label = cur.querySelector(".fig-label");
    var savedName = null; try { savedName = localStorage.getItem("cursorName"); } catch (e) {}
    var arrowIcon =
      '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.43938 2.43938C3.85531 2.02345 4.47597 1.88901 5.02673 2.09555L16.0267 6.22055C16.6416 6.45111 17.035 7.05477 16.9976 7.71034C16.9603 8.36592 16.5009 8.921 15.8638 9.08026L11.237 10.237L10.0803 14.8638C9.921 15.5009 9.36592 15.9603 8.71034 15.9976C8.05477 16.035 7.45111 15.6416 7.22055 15.0267L3.09555 4.02673C2.88901 3.47597 3.02345 2.85531 3.43938 2.43938Z" fill="white"/>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.67558 3.03185C4.49199 2.963 4.2851 3.00782 4.14646 3.14646C4.00782 3.2851 3.963 3.49199 4.03185 3.67558L8.15685 14.6756C8.2337 14.8805 8.43492 15.0117 8.65345 14.9992C8.87197 14.9868 9.057 14.8336 9.11009 14.6213L10.4123 9.41232L15.6213 8.11009C15.8336 8.057 15.9868 7.87197 15.9992 7.65345C16.0117 7.43492 15.8805 7.2337 15.6756 7.15685L4.67558 3.03185Z" fill="var(--cursor-color)"/></svg>';

    if (savedName) { label.textContent = savedName; label.dataset.named = "1"; }
    else { label.textContent = ""; label.classList.add("faded"); }

    var cbtn = document.getElementById("cursor-toggle");
    if (cbtn) {
      cbtn.innerHTML = arrowIcon;
      var pop = document.createElement("div");
      pop.className = "cursor-pop";
      pop.innerHTML =
        '<p class="cursor-pop-head">Customize your cursor</p>' +
        '<div class="cursor-grid">' +
        CURSOR_COLORS.map(function (c) {
          return '<button class="cursor-opt' + (c.value === current.value ? " sel" : "") + '" type="button" data-color="' + c.value + '" data-def="' + (c.def ? 1 : 0) + '" title="' + c.name + '" style="--cursor-color:' + c.value + '">' + arrowIcon + '</button>';
        }).join("") +
        '</div>' +
        '<label class="cursor-pop-sub" for="cursor-name-input">Name beside your cursor</label>' +
        '<input id="cursor-name-input" class="cursor-name" type="text" maxlength="24" placeholder="Add your name" aria-label="Name beside your cursor" />';
      cbtn.parentNode.appendChild(pop);
      var nameInput = pop.querySelector(".cursor-name");
      if (savedName) nameInput.value = savedName;

      cbtn.addEventListener("click", function (e) { e.stopPropagation(); pop.classList.toggle("open"); });
      pop.addEventListener("click", function (e) {
        e.stopPropagation();
        var b = e.target.closest(".cursor-opt");
        if (!b) return;
        var value = b.getAttribute("data-color");
        document.documentElement.style.setProperty("--cursor-color", value);
        cur.classList.toggle("cursor-default", b.getAttribute("data-def") === "1");
        pop.querySelectorAll(".cursor-opt").forEach(function (o) { o.classList.toggle("sel", o === b); });
        try { localStorage.setItem("cursorColor", value); } catch (e2) {}
      });
      nameInput.addEventListener("input", function () {
        var v = nameInput.value.trim();
        if (v) { label.textContent = v; label.dataset.named = "1"; label.classList.remove("faded"); }
        else { label.textContent = ""; delete label.dataset.named; label.classList.add("faded"); }
        try { localStorage.setItem("cursorName", v); } catch (e3) {}
      });
      document.addEventListener("click", function () { pop.classList.remove("open"); });
    }
  }

  // --- SVG frame-sequence player: loops while visible and stops work off-screen ---
  function pad3(n) { return ("00" + n).slice(-3); }
  function playSeq(img) {
    if (img._seqPlaying) return;
    var dir = img.getAttribute("data-seq");
    var countPrimary = parseInt(img.getAttribute("data-count"), 10) || 1;
    var dirNext = img.getAttribute("data-seq-next");
    var countNext = parseInt(img.getAttribute("data-count-next"), 10) || 0;
    var stepNext = parseInt(img.getAttribute("data-seq-step-next"), 10) || 1;
    var count = countPrimary + (dirNext ? countNext : 0);
    var last = count - 1;
    var version = img.getAttribute("data-seq-version");
    function srcForFrame(index) {
      var nextIndex = Math.min((index - countPrimary) * stepNext, (countNext - 1) * stepNext);
      var src = dirNext && index >= countPrimary
        ? dirNext + "/" + pad3(nextIndex) + ".svg"
        : dir + "/" + pad3(index) + ".svg";
      return version ? src + "?v=" + encodeURIComponent(version) : src;
    }
    if (reduce) { img.src = srcForFrame(last); return; }
    var duration = parseInt(img.getAttribute("data-duration"), 10) || 3200;
    var pause = 500;
    var loop = img.hasAttribute("data-loop");
    var start = null, cur2 = -1;
    img._seqPlaying = true;
    function frame(ts) {
      if (!img._seqPlaying) return;
      if (start === null) start = ts;
      var elapsed = ts - start;
      var cycle = duration + pause;
      var cycleTime = loop ? elapsed % cycle : Math.min(elapsed, duration);
      var t = Math.min(1, cycleTime / duration);
      var f = Math.floor(t * last);
      if (f !== cur2) { cur2 = f; img.src = srcForFrame(f); }
      if (loop || t < 1) img._seqRaf = requestAnimationFrame(frame);
      else img._seqPlaying = false;
    }
    img._seqRaf = requestAnimationFrame(frame);
  }
  function stopSeq(img) {
    img._seqPlaying = false;
    if (img._seqRaf) cancelAnimationFrame(img._seqRaf);
  }
  var seqEls = [].slice.call(document.querySelectorAll("img.seq"));
  if ("IntersectionObserver" in window) {
    var seqIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) playSeq(e.target);
        else stopSeq(e.target);
      });
    }, { threshold: 0.35 });
    seqEls.forEach(function (i) { seqIO.observe(i); });
  } else {
    seqEls.forEach(playSeq);
  }

  // --- muted recordings: meaningful posters at rest, playback only while visible ---
  var autoplayVideos = [].slice.call(document.querySelectorAll("video[data-viewport-autoplay], video[autoplay]"));
  // Native autoplay must also be absent from HTML: it can run before this script.
  function mediaIsVisible(video) {
    if (document.hidden || video.closest('[aria-hidden="true"], [hidden]')) return false;
    var r = video.getBoundingClientRect();
    var left = r.left, right = r.right, top = r.top, bottom = r.bottom;
    for (var parent = video.parentElement; parent; parent = parent.parentElement) {
      var style = getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
      var bounds = parent.getBoundingClientRect();
      if (/hidden|clip|scroll|auto/.test(style.overflowX)) { left = Math.max(left, bounds.left); right = Math.min(right, bounds.right); }
      if (/hidden|clip|scroll|auto/.test(style.overflowY)) { top = Math.max(top, bounds.top); bottom = Math.min(bottom, bounds.bottom); }
    }
    var area = Math.max(0, right - left) * Math.max(0, bottom - top);
    var visible = Math.max(0, Math.min(right, innerWidth) - Math.max(left, 0)) * Math.max(0, Math.min(bottom, innerHeight) - Math.max(top, 0));
    return area > 0 && visible / area >= 0.2;
  }
  function playVisibleMedia(video, manual) {
    if (manual) video.dataset.manualPlayback = "true";
    if (!mediaIsVisible(video) || video.dataset.userPaused === "true" || (reduce && video.dataset.manualPlayback !== "true")) {
      video.pause();
      return;
    }
    if (video.paused) video.play().catch(function () {});
  }
  autoplayVideos.forEach(function (video) {
    video.removeAttribute("autoplay");
    video.muted = true;
    video.pause();
    video.addEventListener("play", function () {
      if (!mediaIsVisible(video)) video.pause();
    });
  });

  // Compact play, restart, and sound controls appear over recordings on hover/focus.
  function mediaIcon(name) {
    if (name === "play") return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5-9-5.5Z"/></svg>';
    if (name === "pause") return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';
    if (name === "restart") return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.25a5.75 5.75 0 1 1-5.2 8.2l1.36-.65A4.25 4.25 0 1 0 5.2 4.7L7 6.5H2V1.5l2.13 2.13A5.72 5.72 0 0 1 8 2.25Z"/></svg>';
    if (name === "sound") return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10l-4-3H2V6Zm9.1-.75a4 4 0 0 1 0 5.5l-1-1.05a2.5 2.5 0 0 0 0-3.4l1-1.05Z"/></svg>';
    return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10l-4-3H2V6Zm9.2-.6 1.05-1.05L14 6.1l1.75-1.75 1.05 1.05L15.05 7.15l1.75 1.75-1.05 1.05L14 8.2l-1.75 1.75L11.2 8.9l1.75-1.75-1.75-1.75Z" transform="translate(-2)"/></svg>';
  }
  function attachMediaControls(videos, host) {
    videos = [].slice.call(videos);
    if (!host || host.querySelector(":scope > .cs-media-controls")) return;
    host.classList.add("cs-media-control-host");
    var controls = document.createElement("div");
    controls.className = "cs-media-controls";
    controls.setAttribute("aria-label", "Recording controls");
    controls.innerHTML =
      '<button class="cs-media-control-button" type="button" data-media-play aria-label="Pause recording"></button>' +
      '<button class="cs-media-control-button" type="button" data-media-restart aria-label="Restart recording">' + mediaIcon("restart") + '</button>' +
      '<button class="cs-media-control-button" type="button" data-media-sound aria-label="Turn sound on"></button>';
    host.appendChild(controls);
    var playButton = controls.querySelector("[data-media-play]");
    var soundButton = controls.querySelector("[data-media-sound]");
    function updateMediaControls() {
      var allPaused = videos.every(function (video) { return video.paused; });
      var allMuted = videos.every(function (video) { return video.muted; });
      playButton.innerHTML = mediaIcon(allPaused ? "play" : "pause");
      playButton.setAttribute("aria-label", allPaused ? "Play recordings" : "Pause recordings");
      soundButton.innerHTML = mediaIcon(allMuted ? "mute" : "sound");
      soundButton.setAttribute("aria-label", allMuted ? "Turn sound on" : "Mute recordings");
    }
    playButton.addEventListener("click", function () {
      var shouldPlay = videos.every(function (video) { return video.paused; });
      videos.forEach(function (video) {
        video.dataset.userPaused = shouldPlay ? "false" : "true";
        if (shouldPlay) playVisibleMedia(video, true);
        else video.pause();
      });
      updateMediaControls();
    });
    controls.querySelector("[data-media-restart]").addEventListener("click", function () {
      videos.forEach(function (video) {
        video.currentTime = 0;
        video.dataset.userPaused = "false";
        playVisibleMedia(video, true);
      });
      updateMediaControls();
    });
    soundButton.addEventListener("click", function () {
      var shouldUnmute = videos.every(function (video) { return video.muted; });
      videos.forEach(function (video) { video.muted = !shouldUnmute; });
      updateMediaControls();
    });
    videos.forEach(function (video) {
      video.addEventListener("play", updateMediaControls);
      video.addEventListener("pause", updateMediaControls);
    });
    host.addEventListener("touchstart", function () { host.classList.add("is-controls-visible"); }, { passive: true });
    updateMediaControls();
  }
  var groupedVideos = [];
  [].slice.call(document.querySelectorAll("[data-shared-media-controls]")).forEach(function (group) {
    var videos = [].slice.call(group.querySelectorAll("video[data-viewport-autoplay]"));
    if (!videos.length) return;
    groupedVideos = groupedVideos.concat(videos);
    attachMediaControls(videos, group);
  });
  autoplayVideos.forEach(function (video) {
    if (video.hasAttribute("data-no-media-controls")) return;
    if (groupedVideos.indexOf(video) !== -1) return;
    var host = video.closest(".cs-device") || video.closest(".cs-figure") || video.parentElement;
    attachMediaControls([video], host);
  });

  // Optional, non-destructive touch cues for iOS recordings. Cue values are
  // time in seconds followed by x/y percentages within the captured screen.
  [].slice.call(document.querySelectorAll("video[data-touch-cues]")).forEach(function (video) {
    var screen = video.closest(".cs-device-media-screen") || video.parentElement;
    var cues = video.dataset.touchCues.split(";").map(function (value) {
      var parts = value.split(",").map(Number);
      return { time: parts[0], x: parts[1], y: parts[2] };
    }).filter(function (cue) {
      return Number.isFinite(cue.time) && Number.isFinite(cue.x) && Number.isFinite(cue.y);
    });
    if (!screen || !cues.length) return;
    var cursor = document.createElement("span");
    cursor.className = "np-touch-cursor";
    cursor.setAttribute("aria-hidden", "true");
    screen.appendChild(cursor);
    var touchRaf = 0;
    function renderTouchCue() {
      var now = video.currentTime;
      var active = cues.find(function (cue) {
        return now >= cue.time - .48 && now <= cue.time + .34;
      });
      cursor.classList.toggle("is-visible", !!active);
      if (active) {
        cursor.style.left = active.x + "%";
        cursor.style.top = active.y + "%";
        cursor.classList.toggle("is-pressing", Math.abs(now - active.time) <= .14);
      } else {
        cursor.classList.remove("is-pressing");
      }
      if (!video.paused && !video.ended) touchRaf = requestAnimationFrame(renderTouchCue);
    }
    video.addEventListener("play", function () {
      cancelAnimationFrame(touchRaf);
      touchRaf = requestAnimationFrame(renderTouchCue);
    });
    video.addEventListener("pause", function () {
      cancelAnimationFrame(touchRaf);
      renderTouchCue();
    });
    video.addEventListener("seeked", renderTouchCue);
    renderTouchCue();
  });

  // Time-synchronized callouts connect a recording's controls to its caption.
  [].slice.call(document.querySelectorAll("[data-timed-annotations]")).forEach(function (host) {
    var video = host.querySelector("video");
    var cues = [].slice.call(host.querySelectorAll("[data-annotation-cue]"));
    var captions = [].slice.call(host.querySelectorAll("[data-annotation-caption]"));
    var annotationRaf = 0;
    if (!video || !cues.length) return;
    function isCurrent(item, time) {
      var start = Number(item.dataset.start);
      var end = Number(item.dataset.end);
      return Number.isFinite(start) && Number.isFinite(end) && time >= start && time < end;
    }
    function renderTimedAnnotations() {
      var now = video.currentTime || 0;
      cues.forEach(function (cue) { cue.classList.toggle("is-active", isCurrent(cue, now)); });
      captions.forEach(function (caption) { caption.classList.toggle("is-active", isCurrent(caption, now)); });
      if (!video.paused && !video.ended) annotationRaf = requestAnimationFrame(renderTimedAnnotations);
    }
    video.addEventListener("play", function () {
      cancelAnimationFrame(annotationRaf);
      annotationRaf = requestAnimationFrame(renderTimedAnnotations);
    });
    video.addEventListener("pause", function () {
      cancelAnimationFrame(annotationRaf);
      renderTimedAnnotations();
    });
    video.addEventListener("seeked", renderTimedAnnotations);
    video.addEventListener("loadedmetadata", renderTimedAnnotations);
    renderTimedAnnotations();
  });

  var mediaFrame = null;
  function syncVisibleMedia() {
    mediaFrame = null;
    autoplayVideos.forEach(function (video) { playVisibleMedia(video); });
  }
  function scheduleVisibleMedia() {
    if (mediaFrame === null) mediaFrame = requestAnimationFrame(syncVisibleMedia);
  }
  // Scroll checks also cover clipped recordings and browsers without IO.
  document.addEventListener("scroll", scheduleVisibleMedia, { passive: true, capture: true });
  window.addEventListener("resize", scheduleVisibleMedia);
  document.addEventListener("visibilitychange", syncVisibleMedia);
  if ("IntersectionObserver" in window) {
    var videoIO = new IntersectionObserver(scheduleVisibleMedia, { threshold: [0, 0.2, 1] });
    autoplayVideos.forEach(function (video) { videoIO.observe(video.closest(".np-audio-crop") || video); });
  }
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function (event) {
    reduce = event.matches;
    autoplayVideos.forEach(function (video) { delete video.dataset.manualPlayback; });
    syncVisibleMedia();
  });
  scheduleVisibleMedia();

  // --- custom overlay scrollbar (native bar hidden in CSS; no layout shift between pages) ---
  var thumb = document.createElement("div");
  thumb.className = "scroll-thumb";
  document.body.appendChild(thumb);
  var hideTimer, dragging = false, dragOffset = 0;
  function docH() { return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); }
  function updateThumb(show) {
    var sh = docH(), ih = window.innerHeight, st = window.scrollY || document.documentElement.scrollTop || 0;
    if (sh <= ih + 2) { thumb.style.opacity = "0"; return; }
    var trackH = ih - 8, th = Math.max(30, Math.round(trackH * (ih / sh))), maxTop = trackH - th;
    thumb.style.height = th + "px";
    thumb.style.transform = "translateY(" + (4 + maxTop * (st / (sh - ih))) + "px)";
    if (show !== false) {
      thumb.classList.add("visible");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { if (!dragging) thumb.classList.remove("visible"); }, 1200);
    }
  }
  window.addEventListener("scroll", function () { updateThumb(true); }, { passive: true });
  window.addEventListener("resize", function () { updateThumb(true); });
  thumb.addEventListener("mousedown", function (e) { dragging = true; thumb.classList.add("dragging", "visible"); dragOffset = e.clientY - thumb.getBoundingClientRect().top; e.preventDefault(); });
  window.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    var ih = window.innerHeight, sh = docH(), trackH = ih - 8, maxTop = trackH - thumb.offsetHeight;
    var top = Math.min(maxTop, Math.max(0, e.clientY - dragOffset - 4));
    window.scrollTo(0, (maxTop > 0 ? top / maxTop : 0) * (sh - ih));
  }, { passive: true });
  window.addEventListener("mouseup", function () { if (dragging) { dragging = false; thumb.classList.remove("dragging"); updateThumb(true); } });
  setTimeout(function () { updateThumb(false); }, 60);

  // --- case-study left-nav scroll spy: highlight the last section whose top has passed ---
  var navLinks = [].slice.call(document.querySelectorAll(".cs-nav-list a"));
  if (navLinks.length) {
    var spyTargets = [];
    navLinks.forEach(function (a) {
      var id = (a.getAttribute("href") || "").replace("#", "");
      var el = id && document.getElementById(id);
      if (el) {
        spyTargets.push({ id: id, el: el, link: a });
        a.addEventListener("click", function () {
          navLinks.forEach(function (link) { link.classList.toggle("active", link === a); });
        });
      }
    });
    function absTop(el) { return el.getBoundingClientRect().top + (window.scrollY || 0); }
    function updateSpy() {
      // Anchored chapters settle below the fixed header and, on wide screens,
      // beside the fixed case-study nav. Activate the chapter once its opening
      // block enters the upper third instead of waiting for it to reach 150px.
      var activationLine = Math.max(150, Math.min(360, window.innerHeight * 0.36));
      var y = (window.scrollY || 0) + activationLine, current = spyTargets.length ? spyTargets[0].id : null;
      spyTargets.forEach(function (t) { if (absTop(t.el) <= y) current = t.id; });
      if ((window.scrollY || 0) + window.innerHeight >= document.documentElement.scrollHeight - 2 && spyTargets.length) {
        current = spyTargets[spyTargets.length - 1].id;
      }
      spyTargets.forEach(function (t) { t.link.classList.toggle("active", t.id === current); });
    }
    window.addEventListener("scroll", updateSpy, { passive: true });
    window.addEventListener("resize", updateSpy);
    updateSpy();
  }

  // --- case-study image viewbox ---
  var viewboxTriggers = [].slice.call(document.querySelectorAll('main.cs img[alt]:not([alt=""])')).filter(function (img) {
    return !img.classList.contains("seq") &&
      !img.classList.contains("cs-device-media-frame") &&
      !img.closest("a");
  });
  var viewbox = null, viewboxImage = null, viewboxCaption = null, activeViewboxTrigger = null;
  function ensureViewbox() {
    if (viewbox) return;
    viewbox = document.createElement("dialog");
    viewbox.className = "cs-viewbox";
    viewbox.setAttribute("aria-labelledby", "cs-viewbox-caption");
    viewbox.innerHTML =
      '<button class="cs-viewbox-close" type="button" aria-label="Close expanded image">Close</button>' +
      '<div class="cs-viewbox-inner"><img class="cs-viewbox-image" alt="" />' +
      '<p class="cs-viewbox-caption" id="cs-viewbox-caption"></p></div>';
    document.body.appendChild(viewbox);
    viewboxImage = viewbox.querySelector(".cs-viewbox-image");
    viewboxCaption = viewbox.querySelector(".cs-viewbox-caption");
    viewbox.querySelector(".cs-viewbox-close").addEventListener("click", function () { viewbox.close(); });
    viewbox.addEventListener("click", function (event) {
      if (event.target === viewbox) viewbox.close();
    });
    viewbox.addEventListener("close", function () {
      if (activeViewboxTrigger) activeViewboxTrigger.focus();
    });
  }
  function openViewbox(img) {
    ensureViewbox();
    activeViewboxTrigger = img;
    viewboxImage.src = img.currentSrc || img.src;
    viewboxImage.alt = img.alt;
    viewboxCaption.textContent = img.alt;
    if (typeof viewbox.showModal === "function") viewbox.showModal();
    else viewbox.setAttribute("open", "");
  }
  viewboxTriggers.forEach(function (img) {
    img.classList.add("cs-viewbox-trigger");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Expand image: " + img.alt);
    img.addEventListener("click", function () { openViewbox(img); });
    img.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openViewbox(img);
    });
  });

  // --- compact case-study carousels ---
  [].slice.call(document.querySelectorAll("[data-carousel]")).forEach(function (carousel) {
    var slides = [].slice.call(carousel.querySelectorAll("[data-carousel-slide]"));
    var previous = carousel.querySelector("[data-carousel-prev]");
    var next = carousel.querySelector("[data-carousel-next]");
    var status = carousel.querySelector("[data-carousel-status]");
    var index = Math.max(0, slides.findIndex(function (slide) { return slide.classList.contains("is-active"); }));
    var duration = 6000, timer = null, inView = false, pointerInside = false;
    var syncVideo = carousel.hasAttribute("data-carousel-sync-video");
    var progress = null, progressSteps = [];
    if (slides.length) {
      progress = document.createElement("div");
      progress.className = "cs-carousel-progress";
      progress.style.setProperty("--carousel-steps", slides.length);
      progress.style.setProperty("--carousel-duration", duration + "ms");
      progress.setAttribute("aria-label", "Carousel progress");
      progress.innerHTML = slides.map(function (_, slideIndex) {
        if (slides.length === 1) return '<span class="cs-carousel-progress-step is-static" data-carousel-step="0" aria-hidden="true"></span>';
        return '<button class="cs-carousel-progress-step" type="button" data-carousel-step="' + slideIndex + '" aria-label="Show slide ' + (slideIndex + 1) + '"></button>';
      }).join("");
      carousel.insertBefore(progress, carousel.querySelector(".cs-carousel-controls"));
      progressSteps = [].slice.call(progress.querySelectorAll("[data-carousel-step]"));
    }
    function activeVideo() {
      return slides[index] ? slides[index].querySelector("video") : null;
    }
    function canAutoAdvance() {
      return !reduce && slides.length > 1 && inView && !pointerInside && !carousel.matches(":focus-within") && !document.hidden;
    }
    function updateSyncedProgress() {
      if (!syncVideo || !progressSteps.length) return;
      var video = activeVideo();
      var ratio = video && Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(1, Math.max(0, video.currentTime / video.duration))
        : 0;
      progressSteps.forEach(function (step, stepIndex) {
        step.style.setProperty("--carousel-video-progress", stepIndex === index ? ratio : 0);
      });
    }
    function scheduleAuto() {
      clearTimeout(timer);
      carousel.classList.remove("is-running");
      if (syncVideo) {
        updateSyncedProgress();
        if (!canAutoAdvance()) return;
        var video = activeVideo();
        if (!video) return;
        if (video.ended || (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime >= video.duration - .05)) {
          showSlide(index + 1);
          return;
        }
        playVisibleMedia(video);
        return;
      }
      if (!canAutoAdvance()) return;
      void carousel.offsetWidth;
      carousel.classList.add("is-running");
      timer = setTimeout(function () { showSlide(index + 1); }, duration);
    }
    function showSlide(nextIndex) {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      if (status) status.textContent = (index + 1) + " of " + slides.length;
      progressSteps.forEach(function (step, stepIndex) {
        step.classList.toggle("is-complete", stepIndex < index);
        step.classList.toggle("is-current", stepIndex === index);
        step.setAttribute("aria-current", stepIndex === index ? "step" : "false");
      });
      if (syncVideo) {
        slides.forEach(function (slide, slideIndex) {
          var video = slide.querySelector("video");
          if (!video) return;
          video.loop = false;
          video.currentTime = 0;
          if (slideIndex !== index) video.pause();
          else if (inView) playVisibleMedia(video);
        });
        updateSyncedProgress();
      }
      scheduleAuto();
      scheduleVisibleMedia();
    }
    if (previous) previous.addEventListener("click", function () { showSlide(index - 1); });
    if (next) next.addEventListener("click", function () { showSlide(index + 1); });
    if (slides.length <= 1) {
      if (previous) previous.disabled = true;
      if (next) next.disabled = true;
    }
    progressSteps.forEach(function (step) {
      if (slides.length <= 1) return;
      step.addEventListener("click", function () { showSlide(parseInt(step.getAttribute("data-carousel-step"), 10)); });
    });
    carousel.addEventListener("mouseenter", function () { pointerInside = true; scheduleAuto(); });
    carousel.addEventListener("mouseleave", function () { pointerInside = false; scheduleAuto(); });
    carousel.addEventListener("focusin", scheduleAuto);
    carousel.addEventListener("focusout", function () { setTimeout(scheduleAuto, 0); });
    document.addEventListener("visibilitychange", scheduleAuto);
    if (syncVideo) {
      slides.forEach(function (slide, slideIndex) {
        var video = slide.querySelector("video");
        if (!video) return;
        video.loop = false;
        ["loadedmetadata", "durationchange", "timeupdate", "seeked", "play", "pause"].forEach(function (eventName) {
          video.addEventListener(eventName, function () {
            if (slideIndex === index) updateSyncedProgress();
          });
        });
        video.addEventListener("ended", function () {
          if (slideIndex !== index) return;
          updateSyncedProgress();
          if (canAutoAdvance()) showSlide(index + 1);
        });
      });
    }
    if (slides.length > 1 && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        scheduleAuto();
      }, { threshold: 0.35 }).observe(carousel);
    } else {
      inView = true;
    }
    showSlide(index);
  });
})();
