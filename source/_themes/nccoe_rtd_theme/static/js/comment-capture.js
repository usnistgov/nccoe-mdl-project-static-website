/* global Annotator */
(function () {
  // ---- config ----
  var MAILTO = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.email)
    || "nccoe@nist.gov";
  var PROJECT = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.siteName)
    || "NIST | NCCoE";
  var SUBJECT = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.subject)
    || "[Doc review] {PROJECT} - {N} comments";
  var STATIC_BASE = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.staticBase)
  var KEY = 'cm_comment_queue_v1';

  if (!window.Annotator) return;

  // ---- queue ----
  function qLoad() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function qSave(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { } }
  function qAdd(it) { var q = qLoad(); q.push(it); qSave(q); updateBtn(); }
  function qClear() { qSave([]); updateBtn(); }
  function qRemoveAt(i) {
    var q = qLoad();
    if (i >= 0 && i < q.length) {
      q.splice(i, 1);
      qSave(q);
      updateBtn();
    }
  }

  // ---- helpers ----
  function title() { var h = document.querySelector('h1,h2'); return (h && h.textContent) || document.title || ''; }
  function selObj() { var s = window.getSelection && window.getSelection(); return (s && s.rangeCount) ? s : null; }
  function selText() { var s = selObj(); return s ? s.toString() : ''; }

  function nearestId() {
    var s = selObj(); if (!s) return '';
    var n = s.getRangeAt(0).commonAncestorContainer;
    if (n && n.nodeType === Node.TEXT_NODE) n = n.parentElement;
    while (n && n.nodeType === 1) {
      if (n.id) return n.id;
      n = n.parentElement;
    }
    return '';
  }

  // show quote with line breaks in email, but keep URL fragment compact
  function displayQuote(s) {
    if (!s) return '';
    return String(s).replace(/\r/g, '').trim().slice(0, 1000);
  }

  function normalize(ann) {
    var url = String(location.href).split('#')[0];
    var selectedText = String((ann && ann.quote) || selText() || '').trim();
    var highlightSpan = ann && ann.highlights && ann.highlights[0];
    var block = highlightSpan && highlightSpan.closest('p,li,td,th,blockquote,pre,h1,h2,h3,h4,h5,h6');

    if (block && selectedText && selectedText.length < 30) {
      var contextSnippet = selectedText;
      var blockText = block.textContent.replace(/\s+/g, ' ').trim();

      var r = document.createRange();
      r.selectNodeContents(block);
      r.setEndBefore(highlightSpan);

      var beforeText = r.toString().replace(/\s+/g, ' ');
      var matchIndex = beforeText.length;

      if (matchIndex >= 0) {
        var contextStart = Math.max(0, matchIndex - 60);
        var contextEnd = Math.min(blockText.length, matchIndex + selectedText.length + 60);

        contextSnippet = (blockText.slice(contextStart, matchIndex) + selectedText + blockText.slice(matchIndex + selectedText.length, contextEnd)).trim();
      }
    }

    var anchorId = '';
    for (var currentEl = highlightSpan; currentEl && currentEl.nodeType === 1; currentEl = currentEl.parentElement) {
      if (currentEl.id) { anchorId = currentEl.id; break; }
    }

    if (!anchorId) anchorId = nearestId();

    return {
      url: url,
      page_title: title(),
      anchor_id: anchorId,
      text_quote: displayQuote(selectedText),
      context: contextSnippet,
      comment: String((ann && ann.text) || '').trim()
    };
  }

  function csvCell(value) {
    if (value == null) return '';
    let valueStr = String(value);
    valueStr = valueStr.replace(/"/g, '""');
    return '"' + valueStr + '"';
  }

  function buildCsvFromQueue() {
    var headers = ['url', 'text', 'context (±60 chars around selection)', 'comment'];
    var q = qLoad();
    var lines = [];

    lines.push(headers.join(','));

    q.forEach(function (item) {
      var url = item.url || '';
      var quote = (item.text_quote || '').replace(/\r?\n/g, ' ');
      var context = (item.context || '').replace(/\r?\n/g, ' ');
      var comment = (item.comment || '').replace(/\r?\n/g, ' ');

      lines.push([url, quote, context, comment].map(csvCell).join(','));
    })
    return lines.join('\n');
  }

  function downloadCsvFromQueue() {
    var csvContent = buildCsvFromQueue();
    if (csvContent === '') {
      return;
    }
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = SUBJECT
      .replace(/\{PROJECT\}/g, PROJECT.replace(/\s+/g, '_'))
      .replace(/\{N\}/g, String(qLoad().length))
      .replace(/[^a-z0-9_\-\.]/gi, '_') + '.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }

  window.downloadCsvFromQueue = downloadCsvFromQueue;
  window.buildCsvFromQueue = buildCsvFromQueue;

  // ---- email composer ----
  function buildEmailPieces(q) {
    var by = {}; q.forEach(function (it) { (by[it.url] = by[it.url] || { t: it.page_title, items: [] }).items.push(it); });
    var lines = ['Project: ' + PROJECT, 'Total comments: ' + q.length, ''];
    Object.keys(by).forEach(function (u) {
      var g = by[u];
      lines.push('==========================================');
      lines.push('PAGE: ' + g.t);
      lines.push('URL: ' + u);
      lines.push('==========================================');
      g.items.forEach(function (it, i) {
        lines.push('');
        lines.push('Comment #' + (i + 1));
        lines.push('-------------------------------------');
        if (it.text_quote) {
          lines.push('');
          lines.push('Selected Text:');
          var cleanedQuote = it.text_quote.replace(/\r/g, '').trim();
          lines.push('"' + cleanedQuote + '"');
          lines.push('');
        }
        if (it.context && it.context.length > 10) {
          lines.push('Context:');
          it.context.split('\n').forEach(function (line) { lines.push(line); });
          lines.push('');
        }
        lines.push('Comment: ');
        it.comment.split('\n').forEach(function (line) { lines.push(line); });
        lines.push('\n');
      });
      lines.push('');
    });
    var subject = String(SUBJECT)
      .replace(/\{PROJECT\}/g, PROJECT)
      .replace(/\{N\}/g, String(q.length));

    var body = lines.join('\n');
    return { to: MAILTO, subject: subject, body: body };
  }

  function buildEmail(q) {
    var p = buildEmailPieces(q);
    return 'mailto:' + encodeURIComponent(p.to) +
      '?subject=' + encodeURIComponent(p.subject) +
      '&body=' + encodeURIComponent(p.body);
  }

  // ---- minimal email preview ----
  (function initEmailPreview() {
    if (window.openEmailPreview) return; // only once

    // dom
    var wrap = document.createElement('div');
    wrap.className = 'cm-ep-overlay';
    wrap.innerHTML =
      '<div class="cm-ep-dialog" role="dialog" aria-modal="true" aria-labelledby="cm-ep-title">' +
      '<div class="cm-ep-h"><h3 id="cm-ep-title" style="margin:0;font-size:16px;">Review and send</h3>' +
      '<button type="button" class="cm-ep-help" id="cm-ep-help" aria-label="How to comment">How to comment</button>' +
      '<button type="button" class="cm-ep-x" aria-label="Close">×</button></div>' +
      '<div class="cm-ep-f"><label for="cm-ep-to">To</label><input id="cm-ep-to" class="cm-ep-in" type="email"></div>' +
      '<div class="cm-ep-f"><label for="cm-ep-sub">Subject</label><input id="cm-ep-sub" class="cm-ep-in"></div>' +
      '<div class="cm-ep-f"><label for="cm-ep-list">Queued comments</label><div id="cm-ep-list"></div></div>' +
      '<div class="cm-ep-f"><label for="cm-ep-body">Body</label><textarea id="cm-ep-body" class="cm-ep-ta"></textarea></div>' +
      '<div class="cm-ep-ft">' +
      '<button type="button" class="cm-ep-b ghost" id="cm-ep-cancel">Cancel</button>' +
      '<button type="button" class="cm-ep-b danger" id="cm-ep-clear">Clear all</button>' +
      '<button type="button" class="cm-ep-b sec" id="cm-ep-copy">Copy</button>' +
      '<button type="button" class="cm-ep-b" id="cm-ep-open">Open in email app</button>' +
      '<button type="button" class="cm-ep-b export" id="cm-ep-export">Export comments</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    function show() { wrap.classList.add('is-open'); }
    function hide() { wrap.classList.remove('is-open'); }

    // public API
    window.openEmailPreview = function (opts) {
      opts = opts || {};
      var to = opts.to || '', sub = opts.subject || '', body = opts.body || '';
      var onSend = typeof opts.onSend === 'function' ? opts.onSend : null;

      var $to = document.getElementById('cm-ep-to');
      var $su = document.getElementById('cm-ep-sub');
      var $bo = document.getElementById('cm-ep-body');
      var $x = wrap.querySelector('.cm-ep-x');
      var $c = document.getElementById('cm-ep-cancel');
      var $cp = document.getElementById('cm-ep-copy');
      var $op = document.getElementById('cm-ep-open');
      var $cl = document.getElementById('cm-ep-clear');
      var $list = document.getElementById('cm-ep-list');
      var $ex = document.getElementById('cm-ep-export');
      var $help = document.getElementById('cm-ep-help');

      $ex.onclick = function () {
        downloadCsvFromQueue();
      };

      function escapeHtml(s) {
        return String(s || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function renderList() {
        var q = qLoad();
        if (q.length === 0) {
          $list.innerHTML = '<em>No queued comments.</em>';
          $cl.disabled = true;
          return;
        }
        var html = q.map(function (it, idx) {
          var title = it.page_title || '(no title)';
          var preview = (it.text_quote || it.comment || '').split('\n')[0].slice(0, 120);
          return (
            '<div class="cm-ep-row" style="display:flex;gap:8px;align-items:start;margin:6px 0;">' +
            '<div style="flex:1;min-width:0;">' +
            '<div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(title) + '</div>' +
            '<div style="font-size:12px;opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(preview) + '</div>' +
            '</div>' +
            '<button type="button" class="cm-ep-b danger" data-remove="' + idx + '">Remove</button>' +
            '</div>'
          );
        }).join('');
        $list.innerHTML = html;
        $cl.disabled = false;
      }

      function updatePreviewFieldsFromQueue() {
        var q = qLoad();
        var parts = buildEmailPieces(q);
        if (!$to.value) $to.value = parts.to;
        $su.value = parts.subject;
        $bo.value = parts.body;
      }

      $to.value = to;
      $su.value = sub;
      $bo.value = body;
      $cl.disabled = qLoad().length === 0;

      renderList();
      updatePreviewFieldsFromQueue();
      show();

      $list.onclick = function (e) {
        var btn = e.target.closest('[data-remove]');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-remove'), 10);
        if (Number.isNaN(idx)) return;

        qRemoveAt(idx);
        renderList();
        updatePreviewFieldsFromQueue();

        if (qLoad().length === 0) {
          hide();
          document.removeEventListener('keydown', esc);
        }
      };

      $help.onclick = openInstructions;

      function close() { hide(); document.removeEventListener('keydown', esc); }
      function esc(e) { if (e.key === 'Escape') close(); }
      document.addEventListener('keydown', esc);
      $x.onclick = $c.onclick = close;

      $cp.onclick = function () {
        var text = (to ? 'To: ' + $to.value + '\n' : '') + (sub ? 'Subject: ' + $su.value + '\n\n' : '\n') + ($bo.value || '');
        // use clipboard if available, otherwise fall back to selection trick
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(close, close);
        } else {
          var t = document.createElement('textarea');
          t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t);
          t.select(); try { document.execCommand('copy'); } catch (e) { }
          document.body.removeChild(t); close();
        }
      };

      $op.onclick = function () {
        var href = 'mailto:' + encodeURIComponent(($to.value || '').trim()) +
          '?subject=' + encodeURIComponent($su.value || '') +
          '&body=' + encodeURIComponent($bo.value || '');
        try { location.href = href; } catch (e) { }
        close();
      };

      $cl.onclick = function () {
        if (qLoad().length === 0) { return; }
        var ok = confirm('Clear all queued comments? This cannot be undone.');
        if (!ok) return;
        qClear();
        $cl.disabled = true;
        hide();
        document.removeEventListener('keydown', esc);
      }
    };
  })();

  // --- lightweight Instructions modal (separate from email preview) ---
  (function initInstructionsModal() {
    if (window.openInstructionsModal) return;

    var wrap = document.createElement('div');
    wrap.className = 'cm-instr-overlay';
    wrap.innerHTML =
      '<div class="cm-instr-dialog" role="dialog" aria-modal="true" aria-labelledby="cm-instr-title">' +
      '<div class="cm-instr-h">' +
      '<h3 id="cm-instr-title" class="cm-ep-title">How to comment & send feedback</h3>' +
      '<button type="button" class="cm-instr-x" aria-label="Close">×</button>' +
      '</div>' +
      '<div class="cm-instr-body">' +
      '<ol>' +
      '<li>Select any text on the page.</li>' +
      '<li>Click "Annotate", then type your comment.</li>' +
      '<li>Click "Save" to stage it.</li>' +
      '<li>Repeat across as many pages as you want, everything stays in your queue.</li>' +
      '<li>When you’re ready, click "Send n comments" to review, remove items, export a CSV, copy the email, or open your email app.</li>' +
      '</ol>' +
      '<div class="cm-instr-note">' +
      'Tips: Your queued comments are saved in this browser until you send or clear them. ' +
      'Each entry includes the page title, URL, a nearby section anchor (when available), and a quote to help reviewers find the exact spot.' +
      '</div>' +
      '<div>' +
      '<div class="cm-instr-subtitle">Quick demo</div>' +
      '<div class="cm-instr-media-box"><span>video error</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="cm-instr-ft">' +
      '<button type="button" class="cm-ep-b" id="cm-instr-close">Got it</button>' +
      '</div>' +
      '</div>';

    // basic overlay styles (kept inline for simplicity)
    wrap.style.cssText = 'display:none;position:fixed;inset:0;z-index:10001;place-items:center;background:rgba(0,0,0,.35)';
    document.body.appendChild(wrap);

    function show() { wrap.style.display = 'grid'; }
    function hide() { wrap.style.display = 'none'; }

    window.openInstructionsModal = function (opts) {
      opts = opts || {};
      // If you have a media URL, set it here:
      if (opts.media) {
        var box = wrap.querySelector('.cm-instr-media-box');
        box.innerHTML =
          `<video width="1072" height="670" controls muted aria-hidden="true">
            <source src="${opts.media}" type="video/mp4"> </source>
            Your browser does not support the video tag.
          </video>`;
      }
      show();
    };

    var $x = wrap.querySelector('.cm-instr-x');
    var $btn = wrap.querySelector('#cm-instr-close');

    function close() { hide(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') close(); }

    $x.onclick = $btn.onclick = close;
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
  })();


  // ---- annotator wiring ----
  var app = new Annotator(document.body);

  Annotator.Plugin = Annotator.Plugin || {};
  Annotator.Plugin.QueueCapture = function () { };
  Annotator.Plugin.QueueCapture.prototype.pluginInit = function () {
    this.annotator.subscribe('annotationCreated', function (ann) { qAdd(normalize(ann)); });
  };
  app.addPlugin('QueueCapture');

  // ---- floating comment button ----
  var c = document.querySelector('.wy-nav-content'); if (!c) return;

  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'cm-send-btn';
  c.appendChild(b);

  // sentinel at the bottom of content (to switch to "parked" mode)
  var s = document.createElement('div');
  s.style.cssText = 'position:absolute;bottom:0;left:0;width:1px;height:1px';
  c.appendChild(s);

  var m = 16, parked = false;

  function place() {
    if (!b.textContent) b.textContent = 'How to comment';

    var r = c.getBoundingClientRect(),
      w = b.offsetWidth || 120,
      h = b.offsetHeight || 36;

    // only show if any of the container intersects the viewport
    var vis = r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight;
    b.style.display = vis ? '' : 'none';
    if (!vis) return;

    if (parked) {
      // parked at container bottom-right
      b.style.position = 'absolute';
      b.style.left = ''; b.style.top = '';
      b.style.right = m + 'px'; b.style.bottom = m + 'px';
    } else {
      // float at viewport bottom-right, clamped inside container box
      var L = Math.min(Math.max(innerWidth - m - w, r.left + m), r.right - m - w);
      var T = Math.min(Math.max(innerHeight - m - h, r.top + m), r.bottom - m - h);
      b.style.position = 'fixed';
      b.style.left = L + 'px'; b.style.top = T + 'px';
      b.style.right = ''; b.style.bottom = '';
    }
    b.style.zIndex = '10000';
  }

  new IntersectionObserver(e => { parked = e[0].isIntersecting; place(); }, {
    threshold: 0, rootMargin: '0px 0px -8px 0px'
  }).observe(s);

  addEventListener('scroll', place, { passive: true });
  addEventListener('resize', place);
  setTimeout(place, 0);

  function openInstructions() {
    window.openInstructionsModal({
      media: STATIC_BASE + 'img/comment.mp4'
    });
  }

  function updateBtn() {
    var n = qLoad().length;

    if (n === 0) {
      b.textContent = 'How to comment';
      b.onclick = openInstructions;
    } else {
      b.textContent = 'Send ' + n + ' comments';
      b.onclick = function () {
        var q = qLoad(); if (!q.length) return;
        var parts = buildEmailPieces(q);
        window.openEmailPreview({
          to: parts.to, subject: parts.subject, body: parts.body,
          onSend: function () { setTimeout(qClear, 500); }
        });
      };
    }
    place(); // re-measure/reposition after label change
  }
  updateBtn();

  // keep annotator UI above headers
  var styleTag = document.createElement('style');
  styleTag.appendChild(document.createTextNode('.annotator-adder,.annotator-editor{z-index:9999;}'));
  document.head.appendChild(styleTag);

  // ---- light highlight when landing on #cm-* anchors ----
  (function () {
    if (!location.hash) return;
    var id = location.hash.slice(1);
    if (!/^cm-/.test(id)) return;          // only style our stamped anchors
    var el = document.getElementById(id);
    if (!el) return;
    var markCSS = '.cm-anchor-highlight{box-shadow: inset 0 0 0 9999px rgba(255,236,136,.6); transition: box-shadow 1.5s ease;}';
    var st = document.createElement('style'); st.textContent = markCSS; document.head.appendChild(st);
    el.classList.add('cm-anchor-highlight');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function () { el.classList.remove('cm-anchor-highlight'); }, 2000);
  })();
})();
