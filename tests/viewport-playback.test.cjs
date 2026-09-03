const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'homepage.js'), 'utf8');
function fixture() {
  const context = { document: { hidden: false }, innerWidth: 800, innerHeight: 600, reduce: false,
    getComputedStyle: p => p.style };
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('  function mediaIsVisible'), source.indexOf('  autoplayVideos.forEach(function (video) {')), context);
  const video = { dataset: {}, paused: true, hiddenSlide: false, parentElement: null,
    rect: { left: 0, right: 400, top: 100, bottom: 400 },
    getBoundingClientRect() { return this.rect; }, closest() { return this.hiddenSlide ? {} : null; },
    pause() { this.paused = true; }, play() { this.paused = false; return Promise.resolve(); } };
  return { context, video };
}
test('visible play, offscreen pause, and resume without seeking', () => {
  const { context: c, video: v } = fixture();
  v.currentTime = 12;
  c.playVisibleMedia(v); assert.equal(v.paused, false);
  v.rect.top = 700; v.rect.bottom = 1000;
  c.playVisibleMedia(v); assert.equal(v.paused, true);
  v.rect.top = 100; v.rect.bottom = 400;
  c.playVisibleMedia(v); assert.equal(v.paused, false); assert.equal(v.currentTime, 12);
});
test('manual pause, background tab, and inactive slide prevent play', () => {
  const { context: c, video: v } = fixture();
  v.dataset.userPaused = 'true'; c.playVisibleMedia(v); assert.equal(v.paused, true);
  v.dataset.userPaused = 'false'; c.document.hidden = true; c.playVisibleMedia(v); assert.equal(v.paused, true);
  c.document.hidden = false; v.hiddenSlide = true; c.playVisibleMedia(v); assert.equal(v.paused, true);
});
test('reduced motion requires explicit play, still pauses offscreen', () => {
  const { context: c, video: v } = fixture(); c.reduce = true;
  c.playVisibleMedia(v); assert.equal(v.paused, true);
  c.playVisibleMedia(v, true); assert.equal(v.paused, false);
  c.document.hidden = true; c.playVisibleMedia(v); assert.equal(v.paused, true);
});
test('visibility uses clipped panel, not oversized underlying video', () => {
  const { context: c, video: v } = fixture();
  v.rect = { left: -1000, right: 500, top: -1000, bottom: 400 };
  v.parentElement = { parentElement: null, style: { overflowX: 'hidden', overflowY: 'hidden' },
    getBoundingClientRect: () => ({left: 0, right: 400, top: 100, bottom: 400}) };
  assert.equal(c.mediaIsVisible(v), true);
});
test('portfolio pages have no native autoplay race', () => {
  for (const page of ['index.html', ...['composa','rem','trove','facebook','wayfind'].map(p => `projects/${p}/index.html`)]) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.doesNotMatch(html, /<video\b[^>]*\sautoplay(?:\s|=|>)/i, page);
  }
});
