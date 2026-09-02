(function () {
  "use strict";

  var host = window.location.hostname;
  var isProduction = host === "samuelalake.com" || host === "www.samuelalake.com";
  var isDevelopment = host === "dev.samuelalake.com" || /\.vercel\.app$/.test(host);
  if (!isProduction && !isDevelopment) return;

  var projectToken = "phc_tPnPhBiB8aSHZ9b6GdGQn8WYPA4BYqg3ATMfBTccHGQn";
  var apiHost = "https://us.i.posthog.com";

  var environment = isProduction ? "production" : "development";
  var projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)/);
  var projectSlug = projectMatch ? projectMatch[1] : null;

  function capture(name, properties) {
    window.posthog.capture(name, Object.assign({
      site_environment: environment,
      project_slug: projectSlug || undefined
    }, properties || {}));
  }

  function fileName(source) {
    if (!source) return undefined;
    try {
      return new URL(source, window.location.href).pathname.split("/").pop();
    } catch (_) {
      return undefined;
    }
  }

  function carouselDetails(carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-carousel-slide]"));
    var activeIndex = slides.findIndex(function (slide) {
      return slide.classList.contains("is-active");
    });
    return {
      carousel_label: carousel.getAttribute("aria-label") || undefined,
      slide_index: activeIndex >= 0 ? activeIndex + 1 : undefined,
      slide_count: slides.length || undefined
    };
  }

  function installEventTracking() {
    window.posthog.register({ site_environment: environment });
    if (projectSlug) capture("project_open", { entry_path: window.location.pathname });

    var observedVideos = new WeakSet();
    document.addEventListener("play", function (event) {
      var video = event.target;
      if (!(video instanceof HTMLVideoElement) || observedVideos.has(video)) return;
      observedVideos.add(video);
      capture("media_play", {
        media_type: "video",
        media_file: fileName(video.currentSrc || video.getAttribute("src")),
        autoplay: video.autoplay
      });
    }, true);

    document.addEventListener("click", function (event) {
      var target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      var link = target.closest("a[href]");
      if (link) {
        var href = link.getAttribute("href") || "";
        if (/SamuelAlake_Resume\.pdf(?:$|[?#])/i.test(href)) {
          capture("resume_click", { placement: window.location.pathname });
        } else if (/^mailto:/i.test(href)) {
          capture("contact_click", { contact_method: "email" });
        }
      }

      var control = target.closest("[data-carousel-next], [data-carousel-prev], [data-carousel-step]");
      if (!control) return;
      var carousel = control.closest("[data-carousel]");
      if (!carousel) return;
      window.requestAnimationFrame(function () {
        var direction = control.hasAttribute("data-carousel-next") ? "next"
          : control.hasAttribute("data-carousel-prev") ? "previous"
          : "direct";
        capture("carousel_change", Object.assign({ direction: direction }, carouselDetails(carousel)));
      });
    });
  }

  (function (documentObject, posthog) {
    if (posthog.__SV) return;
    window.posthog = posthog;
    posthog._i = [];
    posthog.init = function (token, config, name) {
      function stub(target, method) {
        target[method] = function () {
          target.push([method].concat(Array.prototype.slice.call(arguments)));
        };
      }

      var script = documentObject.createElement("script");
      var firstScript = documentObject.getElementsByTagName("script")[0];
      var instance = name ? posthog[name] = [] : posthog;
      var methods = "capture register register_once unregister onFeatureFlags onSessionId getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on getActiveMatchingSurveys getSurveys reset get_distinct_id getGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionPropertyValues createPersonProfile alias set_config startCapture stopCapture get_session_replay_url".split(" ");

      instance.people = instance.people || [];
      methods.forEach(function (method) { stub(instance, method); });
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = config.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
      firstScript.parentNode.insertBefore(script, firstScript);
      posthog._i.push([token, config, name]);
    };
    posthog.__SV = 1;
  })(document, window.posthog || []);

  window.posthog.init(projectToken, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true
    }
  });
  installEventTracking();
})();
