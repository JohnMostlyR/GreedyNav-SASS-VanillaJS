'use strict';

/**
 * GreedyNav-SASS-VanillaJS - SASS and Vanilla JS version of GreedyNav (https://github.com/lukejacksonn/GreedyNav)
 * @author Johan Meester <walter.doodah@gmail.com>
 * @licence MIT - http://opensource.org/licenses/MIT
 * @copyright Johan Meester 2016
 */
(function (w) {
  var DOC = w.document;

  var NAV = DOC.querySelector('.c-greedy-nav');
  var VISIBLE_LIST = NAV.querySelector('.c-greedy-nav__list--visible');
  var OVERFLOW_LIST = NAV.querySelector('.c-greedy-nav__overflow-list');
  var VIEW_MORE_ITEM = NAV.querySelector('.c-greedy-nav__list--show-more');
  var VIEW_MORE_BUTTON = NAV.querySelector('.c-greedy-nav__btn--show-more');
  var FIXED_BUTTON = NAV.querySelector('.c-greedy-nav__fixed');
  var SPACE_BETWEEN_ITEMS = 0; // Set equal to stylesheet setting $c-greedy-nav-space-between-items
  var BREAK_WIDTHS = [];

  var numOfItems = 0;
  var totalSpace = 0;

  // Get current visible items and their dimensions
  VISIBLE_LIST.childNodes.forEach(function (node) {
    if (node.nodeType === 1) {
      totalSpace += node.offsetWidth;
      numOfItems += 1;
      BREAK_WIDTHS.push(totalSpace);
    }
  });

  var TOTAL_SPACING = SPACE_BETWEEN_ITEMS * numOfItems;

  var availableSpace = void 0;
  var numOfVisibleItems = void 0;
  var requiredSpace = void 0;

  /** @function fitAndAdjust */
  var fitAndAdjust = function f() {
    // Get current client width
    availableSpace = NAV.clientWidth - FIXED_BUTTON.clientWidth - TOTAL_SPACING;

    availableSpace -= VIEW_MORE_BUTTON.clientWidth;
    if (VIEW_MORE_ITEM.classList.contains('s-greedy-nav-hidden')) {}

    numOfVisibleItems = VISIBLE_LIST.getElementsByTagName('li').length;
    requiredSpace = BREAK_WIDTHS[numOfVisibleItems - 1];

    if (requiredSpace > availableSpace) {
      // There is not enough room
      OVERFLOW_LIST.insertBefore(VISIBLE_LIST.lastChild, OVERFLOW_LIST.firstChild);
      numOfVisibleItems -= 1;

      // Check again
      f();
    } else if (availableSpace > BREAK_WIDTHS[numOfVisibleItems]) {
      // More than enough room
      VISIBLE_LIST.appendChild(OVERFLOW_LIST.firstChild);
      numOfVisibleItems += 1;

      // Check again
      f();
    }

    // Update the 'view more' button
    VIEW_MORE_BUTTON.dataset.count = numOfItems - numOfVisibleItems;

    if (numOfVisibleItems === numOfItems) {
      VIEW_MORE_ITEM.classList.add('s-greedy-nav-hidden');
    } else {
      VIEW_MORE_ITEM.classList.remove('s-greedy-nav-hidden');
    }
  };

  // Listen for resize event
  w.addEventListener('resize', fitAndAdjust, false);

  // Listen for click event
  w.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('c-greedy-nav__btn--show-more') || ev.target.parentNode.classList.contains('c-greedy-nav__btn--show-more')) {
      OVERFLOW_LIST.classList.toggle('s-greedy-nav-hidden');
    } else {
      OVERFLOW_LIST.classList.add('s-greedy-nav-hidden');
    }
  });

  OVERFLOW_LIST.addEventListener('click', function (ev) {
    ev.stopPropagation();
  }, false);

  fitAndAdjust();
})(typeof global !== 'undefined' ? global : window);
//# sourceMappingURL=greedynav.js.map
