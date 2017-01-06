/**
 * GreedyNav-SASS-VanillaJS - SASS and Vanilla JS version of GreedyNav (https://github.com/lukejacksonn/GreedyNav)
 * @author Johan Meester <walter.doodah@gmail.com>
 * @licence MIT - http://opensource.org/licenses/MIT
 * @copyright Johan Meester 2016
 */
(function (w) {
  const DOC = w.document;

  const NAV = DOC.querySelector('.c-greedy-nav');
  const VISIBLE_LIST = NAV.querySelector('.c-greedy-nav__list--visible');
  const OVERFLOW_LIST = NAV.querySelector('.c-greedy-nav__overflow-list');
  const VIEW_MORE_ITEM = NAV.querySelector('.c-greedy-nav__list--show-more');
  const VIEW_MORE_BUTTON = NAV.querySelector('.c-greedy-nav__btn--show-more');
  const FIXED_BUTTON = NAV.querySelector('.c-greedy-nav__fixed');
  const SPACE_BETWEEN_ITEMS = 0; // Set equal to stylesheet setting $c-greedy-nav-space-between-items
  const BREAK_WIDTHS = [];

  const theBullets = VIEW_MORE_BUTTON.querySelectorAll('.c-greedy-nav__bullet');
  const interval = 100;
  const bulletTimers = [];

  const animateEllipses = () => {
    bulletTimers.forEach((timer) => {
      w.clearTimeout(timer);
    });
    theBullets.forEach((bullet, index) => {
      bullet.style = 'display: none;';
      bulletTimers.push(w.setTimeout(() => {
        bullet.removeAttribute('style');
      }, interval * (index + 1)));
    });
  };

  let numOfItems = 0;
  let totalSpace = 0;

  // Get current visible items and their dimensions
  for (let i = 0, l = VISIBLE_LIST.childNodes.length; i < l; i++) {
    if (VISIBLE_LIST.childNodes[i].nodeType === 1) {
      totalSpace += VISIBLE_LIST.childNodes[i].offsetWidth;
      numOfItems += 1;
      BREAK_WIDTHS.push(totalSpace);
    }
  }

  const TOTAL_SPACING = SPACE_BETWEEN_ITEMS * numOfItems;

  let availableSpace;
  let numOfVisibleItems;
  let requiredSpace;
  let showMoreAnimationTimer;

  /** @function fitAndAdjust */
  const fitAndAdjust = (function f(recheck) {
    if (!recheck) {
      w.clearTimeout(showMoreAnimationTimer);
    }

    // Get current client width
    availableSpace = NAV.clientWidth - FIXED_BUTTON.clientWidth - TOTAL_SPACING;
    availableSpace -= VIEW_MORE_BUTTON.clientWidth;

    numOfVisibleItems = VISIBLE_LIST.getElementsByTagName('li').length;
    requiredSpace = BREAK_WIDTHS[numOfVisibleItems - 1];

    if (requiredSpace > availableSpace) {
      // There is not enough room
      OVERFLOW_LIST.insertBefore(VISIBLE_LIST.lastChild, OVERFLOW_LIST.firstChild);
      numOfVisibleItems -= 1;

      // Check again
      f(true);
    } else if (availableSpace > BREAK_WIDTHS[numOfVisibleItems]) {
      // More than enough room
      VISIBLE_LIST.appendChild(OVERFLOW_LIST.firstChild);
      numOfVisibleItems += 1;

      // Check again
      f(true);
    }

    if (numOfVisibleItems === numOfItems) {
      VIEW_MORE_ITEM.classList.add('s-greedy-nav-hidden');
    } else {
      VIEW_MORE_ITEM.classList.remove('s-greedy-nav-hidden');
      showMoreAnimationTimer = w.setTimeout(() => {
        animateEllipses(theBullets);
      }, 1000);
    }
  });

  // Listen for resize event
  w.addEventListener('resize', fitAndAdjust, false);

  // Listen for click event
  w.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('c-greedy-nav__btn--show-more') || ev.target.parentNode.classList.contains('c-greedy-nav__btn--show-more')) {
      OVERFLOW_LIST.classList.toggle('s-greedy-nav-hidden');
    } else {
      OVERFLOW_LIST.classList.add('s-greedy-nav-hidden');
    }
  });

  OVERFLOW_LIST.addEventListener('click', (ev) => {
    ev.stopPropagation();
  }, false);

  fitAndAdjust();
}(typeof global !== 'undefined' ? global : window));
