/**
 * GreedyNav-SASS-VanillaJS - SASS and Vanilla JS version of GreedyNav (https://github.com/lukejacksonn/GreedyNav)
 * @author Johan Meester <walter.doodah@gmail.com>
 * @licence MIT - http://opensource.org/licenses/MIT
 * @copyright Johan Meester 2016
 */
(function (w) {
  const DOC = w.document;

  const NAV = DOC.querySelector('.c-greedy-nav');
  const VIEW_MORE_BUTTON = NAV.querySelector('.c-greedy-nav__button');
  const VISIBLE_LIST = NAV.querySelector('.c-greedy-nav__list');
  const OVERFLOW_LIST = NAV.querySelector('.c-greedy-nav__overflow-list');
  const BREAK_WIDTHS = [];
  const PADDING = 10;

  let numOfItems = 0;
  let totalSpace = 0;

  // Get current visible items and their dimensions
  VISIBLE_LIST
    .childNodes
    .forEach((node) => {
      if (node.nodeType === 1) {
        totalSpace += node.offsetWidth;
        numOfItems += 1;
        BREAK_WIDTHS.push(totalSpace);
      }
    });

  let availableSpace;
  let numOfVisibleItems;
  let requiredSpace;

  /** @function fitAndAdjust */
  const fitAndAdjust = (function f() {
    // Get current client width
    availableSpace = NAV.clientWidth - PADDING;

    if (VIEW_MORE_BUTTON.classList.contains('s-hidden')) {
      availableSpace -= VIEW_MORE_BUTTON.clientWidth;
    }

    numOfVisibleItems = VISIBLE_LIST.getElementsByTagName('li').length;
    requiredSpace = BREAK_WIDTHS[numOfVisibleItems - 1];

    if (requiredSpace > availableSpace) {
      // There is not enough room
      OVERFLOW_LIST.insertBefore(VISIBLE_LIST.lastChild, OVERFLOW_LIST.lastChild);
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
      VIEW_MORE_BUTTON.classList.add('s-hidden');
    } else {
      VIEW_MORE_BUTTON.classList.remove('s-hidden');
    }
  });

  // Listen for resize event
  w.addEventListener('resize', fitAndAdjust, false);

  // Listen for click event
  w.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('c-greedy-nav__button')) {
      OVERFLOW_LIST.classList.toggle('s-hidden');
    }
  });

  fitAndAdjust();
}(typeof global !== 'undefined' ? global : window));
