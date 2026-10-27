const enableZoomOnEnlargedSVG = svgElement => {
  const svg = d3.select(svgElement);

  // Wrap the SVG content in a <g> element for transformations.
  svg.html("<g class='wrapper'>" + svg.html() + '</g>');

  const inner = svg.select('g');

  const zoom = d3
    .zoom()
    .scaleExtent([1, 4])
    .on('zoom', function (event) {
      inner.attr('transform', event.transform);
    });

  svg.call(zoom);
};

const disableZoomOnSVG = svgElement => {
  const svg = d3.select(svgElement);
  svg.on('.zoom', null);
};

$(document).ready(function () {
  let table = null;

  if ($.fn.DataTable && document.querySelector('table.datatable')) {
    table = $('table.datatable').DataTable({
      paging: false,
      ordering: true,
      order: [[0, 'asc']],
      searching: true,
      responsive: true,
      autoWidth: false,
      columns: [{ width: '5%' }, { width: '55%' }, { width: '40%' }],
    });
  }

  // Reset the select element to its default value on page load.
  $('#label-list').val('');

  $('#label-list').on('change', function () {
    if (!table) {
      return;
    }

    const selectedValue = $(this).val();

    if (selectedValue) {
      table.column(2).search(selectedValue).draw();
    } else {
      table.column(2).search('').draw();
    }
  });

  // Mermaid SVG enlargement controls.
  const $overlay = $('<div class="overlay" aria-hidden="true"></div>').appendTo('body');

  const $closeButton = $(
    '<button class="close-button" aria-label="Close enlarged SVG">Close</button>',
  ).appendTo('body');

  $('.mermaid').on('click', function (event) {
    const $svg = $(this).find('svg');

    if (!$svg.hasClass('enlarged')) {
      $svg.addClass('enlarged');
      $svg.attr('aria-expanded', 'true');

      disablePageScrolling();

      // Enable zoom after the SVG is enlarged.
      enableZoomOnEnlargedSVG($svg[0]);

      // Position the close button relative to the enlarged SVG.
      const svgRect = $svg[0].getBoundingClientRect();

      $closeButton.css({
        top: svgRect.top,
        left: svgRect.right - 79 + 'px',
      });

      // Show the overlay and close button.
      $overlay.addClass('active').attr('aria-hidden', 'false');

      $closeButton.addClass('active').attr('aria-hidden', 'false');

      $closeButton.off('click').on('click', function () {
        closeEnlargedSVG($svg, $closeButton);
      });

      $overlay.off('click').on('click', function () {
        closeEnlargedSVG($svg, $closeButton);
      });

      $closeButton.show();
    }

    // Prevent closing when clicking on the SVG itself.
    event.stopPropagation();
  });

  function closeEnlargedSVG($svg, $button) {
    $svg.removeClass('enlarged');
    $svg.attr('aria-expanded', 'false');

    $overlay.removeClass('active').attr('aria-hidden', 'true');

    $button.removeClass('active').attr('aria-hidden', 'true');

    $button.hide();

    // Disable zoom after the SVG has been closed.
    disableZoomOnSVG($svg[0]);

    enablePageScrolling();
  }

  function disablePageScrolling() {
    $('body').css('overflow', 'hidden');
  }

  function enablePageScrolling() {
    $('body').css('overflow', '');
  }

  // PRAM dropdown controls.
  const pramDropdowns = Array.from(document.querySelectorAll('details.pram-dropdown'));

  const expandCollapseButton = document.getElementById('expand-collapse-all');

  // Adjust these values to change the dropdown animation speed.
  const PRAM_OPEN_DURATION = 700;
  const PRAM_CLOSE_DURATION = 550;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Get the body belonging directly to a PRAM dropdown.
  function getPramDropdownBody(dropdown) {
    return dropdown.querySelector(':scope > .pram-dropdown-body');
  }

  // Return true only when every PRAM dropdown is open.
  function areAllPramDropdownsOpen() {
    return (
      pramDropdowns.length > 0 &&
      pramDropdowns.every(function (dropdown) {
        return dropdown.open;
      })
    );
  }

  // Synchronize the Expand All / Collapse All button.
  function updatePramExpandCollapseButton() {
    if (!expandCollapseButton) {
      return;
    }

    const allOpen = areAllPramDropdownsOpen();

    expandCollapseButton.textContent = allOpen ? 'Collapse All' : 'Expand All';

    expandCollapseButton.setAttribute('aria-expanded', String(allOpen));
  }

  // Remove temporary inline animation styles.
  function resetPramDropdownBodyStyles(body) {
    body.style.height = '';
    body.style.overflow = '';
    body.style.transition = '';
  }

  // Open or close one PRAM dropdown with a height transition.
  function setPramDropdownOpen(dropdown, shouldOpen, animate = true) {
    if (!dropdown) {
      return Promise.resolve();
    }

    if (dropdown.dataset.pramAnimating === 'true') {
      return Promise.resolve();
    }

    if (dropdown.open === shouldOpen) {
      return Promise.resolve();
    }

    const body = getPramDropdownBody(dropdown);

    if (!body || !animate || prefersReducedMotion) {
      dropdown.open = shouldOpen;
      updatePramExpandCollapseButton();

      return Promise.resolve();
    }

    dropdown.dataset.pramAnimating = 'true';

    return new Promise(function (resolve) {
      if (shouldOpen) {
        // Open <details> first so the body can be measured.
        dropdown.open = true;

        const targetHeight = body.scrollHeight;

        // Establish the collapsed starting state.
        body.style.transition = 'none';
        body.style.height = '0px';
        body.style.overflow = 'hidden';

        // Force layout so the browser commits the zero-height state.
        body.offsetHeight;

        body.style.transition = `height ${PRAM_OPEN_DURATION}ms ` + 'cubic-bezier(0.4, 0, 0.2, 1)';

        body.style.height = `${targetHeight}px`;

        const finishOpening = function (event) {
          if (event.target !== body || event.propertyName !== 'height') {
            return;
          }

          body.removeEventListener('transitionend', finishOpening);

          resetPramDropdownBodyStyles(body);
          delete dropdown.dataset.pramAnimating;

          updatePramExpandCollapseButton();
          resolve();
        };

        body.addEventListener('transitionend', finishOpening);

        return;
      }

      // Capture the current height while <details> is still open.
      const startingHeight = body.getBoundingClientRect().height;

      // Establish the full-height starting state.
      body.style.transition = 'none';
      body.style.height = `${startingHeight}px`;
      body.style.overflow = 'hidden';

      // Force layout before applying the collapsed state.
      body.offsetHeight;

      body.style.transition = `height ${PRAM_CLOSE_DURATION}ms ` + 'cubic-bezier(0.4, 0, 0.2, 1)';

      body.style.height = '0px';

      const finishClosing = function (event) {
        if (event.target !== body || event.propertyName !== 'height') {
          return;
        }

        body.removeEventListener('transitionend', finishClosing);

        // Close <details> only after the visual collapse finishes.
        dropdown.open = false;

        resetPramDropdownBodyStyles(body);
        delete dropdown.dataset.pramAnimating;

        updatePramExpandCollapseButton();
        resolve();
      };

      body.addEventListener('transitionend', finishClosing);
    });
  }

  // Find the PRAM dropdown associated with the current URL hash.
  function getPramDropdownFromHash() {
    if (!window.location.hash) {
      return null;
    }

    let id;

    try {
      id = decodeURIComponent(window.location.hash.substring(1));
    } catch (error) {
      return null;
    }

    const target = document.getElementById(id);

    if (!target) {
      return null;
    }

    if (target.matches('details.pram-dropdown')) {
      return target;
    }

    return target.closest('details.pram-dropdown');
  }

  // Open and scroll to the PRAM dropdown referenced by the URL hash.
  async function openPramDropdownFromHash(options = {}) {
    const { animate = false, smoothScroll = false } = options;

    const dropdown = getPramDropdownFromHash();

    if (!dropdown) {
      return;
    }

    await setPramDropdownOpen(dropdown, true, animate);

    requestAnimationFrame(function () {
      dropdown.scrollIntoView({
        behavior: smoothScroll ? 'smooth' : 'auto',
        block: 'start',
      });
    });
  }

  if (pramDropdowns.length > 0) {
    pramDropdowns.forEach(function (dropdown) {
      const summary = dropdown.querySelector(':scope > summary');

      if (!summary) {
        return;
      }

      // Override the native instant toggle so opening and closing can animate.
      summary.addEventListener('click', function (event) {
        event.preventDefault();

        setPramDropdownOpen(dropdown, !dropdown.open, true);
      });

      // Keep the global button synchronized with individual dropdown changes.
      dropdown.addEventListener('toggle', function () {
        updatePramExpandCollapseButton();
      });
    });

    // Expand or collapse all PRAM dropdowns.
    if (expandCollapseButton) {
      expandCollapseButton.addEventListener('click', function () {
        const shouldOpen = !areAllPramDropdownsOpen();

        pramDropdowns.forEach(function (dropdown) {
          setPramDropdownOpen(dropdown, shouldOpen, true);
        });
      });
    }

    // Open a directly linked dropdown immediately on initial page load.
    openPramDropdownFromHash({
      animate: false,
      smoothScroll: false,
    });

    // Open a linked dropdown with animation when the hash changes.
    window.addEventListener('hashchange', function () {
      openPramDropdownFromHash({
        animate: true,
        smoothScroll: true,
      });
    });

    updatePramExpandCollapseButton();
  }

  // Carousel controls.
  function addCarouselControls() {
    document.querySelectorAll('.sd-cards-carousel.demo-carousel')
      .forEach((track, n) => {
        if (track.dataset.controlsReady) return;

        const cards = Array.from(track.children)
          .filter(el => el.classList.contains('sd-card'));

        if (cards.length < 2) return;
        track.dataset.controlsReady = 'true';

        if (!track.id) {
          let id = `demo-carousel-${n + 1}`;
          while (document.getElementById(id)) id += '-track';
          track.id = id;
        }

        track.tabIndex = 0;
        track.setAttribute('role', 'region');
        track.setAttribute('aria-roledescription', 'carousel');

        const sectionTitle = track.closest('section')
          ?.querySelector('h2, h3, h4');

        track.setAttribute(
          'aria-label',
          sectionTitle?.textContent.replace(/¶/g, '').trim()
          || 'Demonstration carousel'
        );

        const controls = document.createElement('div');
        controls.className = 'demo-carousel-controls';

        function makeButton(text, label) {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = text;
          button.setAttribute('aria-label', label);
          button.setAttribute('aria-controls', track.id);
          return button;
        }

        const previous = makeButton('← Previous', 'Previous card');
        const next = makeButton('Next →', 'Next card');

        const dots = document.createElement('div');
        dots.className = 'demo-carousel-dots';
        dots.setAttribute('role', 'group');
        dots.setAttribute('aria-label', 'Choose a card');

        const count = document.createElement('span');
        count.className = 'demo-carousel-count';

        let current = 0;

        function goTo(index) {
          const target = Math.max(0, Math.min(index, cards.length - 1));
          current = target;

          const left = track.scrollLeft
            + cards[target].getBoundingClientRect().left
            - track.getBoundingClientRect().left
            - track.clientLeft;

          track.scrollTo({
            left,
            behavior: window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches ? 'auto' : 'smooth'
          });
        }

        const indicators = cards.map((card, i) => {
          const dot = makeButton(
            '',
            `Go to card ${i + 1} of ${cards.length}`
          );
          dot.addEventListener('click', () => goTo(i));
          dots.append(dot);
          return dot;
        });

        function update() {
          const start = track.getBoundingClientRect().left
            + track.clientLeft;

          current = cards.reduce((best, card, i) => {
            const distance = Math.abs(
              card.getBoundingClientRect().left - start
            );
            const bestDistance = Math.abs(
              cards[best].getBoundingClientRect().left - start
            );
            return distance < bestDistance ? i : best;
          }, 0);

          indicators.forEach((dot, i) => {
            if (i === current) {
              dot.setAttribute('aria-current', 'true');
            } else {
              dot.removeAttribute('aria-current');
            }
          });

          count.textContent = `${current + 1} of ${cards.length}`;
          previous.setAttribute('aria-disabled', String(current === 0));
          next.setAttribute(
            'aria-disabled',
            String(current === cards.length - 1)
          );
        }

        previous.addEventListener('click', () => {
          if (current > 0) goTo(current - 1);
        });

        next.addEventListener('click', () => {
          if (current < cards.length - 1) goTo(current + 1);
        });

        track.addEventListener('keydown', event => {
          if (event.target !== track) return;

          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(current + (event.key === 'ArrowRight' ? 1 : -1));
          }
        });

        let scheduled = false;

        track.addEventListener('scroll', () => {
          if (scheduled) return;
          scheduled = true;

          requestAnimationFrame(() => {
            update();
            scheduled = false;
          });
        }, { passive: true });

        if (typeof ResizeObserver !== 'undefined') {
          new ResizeObserver(update).observe(track);
        } else {
          window.addEventListener('resize', update);
        }

        controls.append(previous, dots, count, next);
        track.after(controls);
        update();
      });
  }

  addCarouselControls();
});
