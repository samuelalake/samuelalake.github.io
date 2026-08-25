(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (!theme) theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-color-mode", theme);
  } catch (e) {}

  var header = document.querySelector(".np-header");
  var main = document.querySelector(".np-main");
  if (!header || !main) return;

  header.outerHTML = `
    <div class="prc-PageHeader-PageHeader-YLwBQ repo-page-header">
      <div class="prc-PageHeader-TitleArea-2n2J0" data-component="TitleArea" data-size-variant="medium">
        <div class="prc-PageHeader-LeadingVisual-njece" data-component="PH_LeadingVisual">
          <a class="repo-avatar" href="/" aria-label="Samuel Alake profile"><span aria-hidden="true" class="site-caricature site-caricature-header"></span></a>
        </div>
        <h1 class="prc-PageHeader-Title-p0Mgh prc-Heading-Heading-MtWFE" data-component="PH_Title">
          <span class="repo-title-path"><a class="repo-owner prc-Link-Link-9ZwDx" href="/">samuelalake</a><span aria-hidden="true">/</span><a class="repo-name prc-Link-Link-9ZwDx" href="/">product designer + engineer</a></span>
        </h1>
      </div>
      <div class="prc-PageHeader-Actions-wawWm" data-component="PH_Actions">
        <nav class="header-nav" aria-label="Sections"><a href="/">Work</a><a href="/about">About</a></nav>
        <button id="cursor-toggle" type="button" class="prc-Button-ButtonBase-9n-Xk prc-Button-IconButton-fyge7" data-no-visuals="true" data-size="medium" data-variant="default" aria-label="Cursor color"><span class="cursor-dot" aria-hidden="true"></span></button>
        <button id="theme-toggle" type="button" class="prc-Button-ButtonBase-9n-Xk prc-Button-IconButton-fyge7" data-no-visuals="true" data-size="medium" data-variant="default" aria-label="Toggle color mode">
          <svg class="octicon octicon-moon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z"></path></svg>
          <svg class="octicon octicon-sun" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.06 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8ZM8 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Z"></path></svg>
        </button>
      </div>
    </div>`;

  main.classList.add("cs");
  var sections = Array.prototype.slice.call(main.querySelectorAll(":scope > .np-section"));
  var used = {};
  var links = sections.map(function (section) {
    var label = section.querySelector(":scope > .np-label");
    var title = label ? label.textContent.trim() : "Section";
    var base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    used[base] = (used[base] || 0) + 1;
    section.id = used[base] > 1 ? base + "-" + used[base] : base;
    return '<li><a href="#' + section.id + '">' + title + "</a></li>";
  }).join("");
  main.insertAdjacentHTML("afterbegin", '<nav class="cs-nav" aria-label="On this page"><a class="cs-nav-back" href="/"><svg class="octicon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L5.06 7h8.19a.75.75 0 0 1 0 1.5H5.06l2.72 2.72a.75.75 0 0 1 0 1.06Z"></path></svg>Back</a><p class="cs-nav-title">In this case study</p><ul class="cs-nav-list">' + links + "</ul></nav>");

  var footer = document.querySelector(".np-footer");
  if (footer) footer.outerHTML = '<footer class="site-footer2"><div class="page footer-inner"><span class="footer-left">Designed + Coded with <span aria-hidden="true">♥</span> by Samuel</span><span class="footer-links"><a href="https://www.linkedin.com/in/samuel-alake/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/samuelalake" target="_blank" rel="noreferrer">GitHub</a></span></div></footer>';
})();
