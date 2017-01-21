/**
 * GreedyNav-SASS-VanillaJS - SASS and Vanilla JS version of GreedyNav (https://github.com/lukejacksonn/GreedyNav)
 * @author Johan Meester <walter.doodah@gmail.com>
 * @licence MIT - http://opensource.org/licenses/MIT
 * @copyright Johan Meester 2016
 */
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (root) {
  var _breakWidths = [];
  var _bulletTimers = [];
  var _interval = 100;

  var _availableSpace = 0;
  var _doc = null;
  var _fixedButton = null;
  var _nav = null;
  var _numOfItems = 0;
  var _numOfVisibleItems = 0;
  var _overflowList = null;
  var _requiredSpace = 0;
  var _showMoreAnimationTimer = 0;
  var _theBullets = null;
  var _totalSpace = 0;
  var _totalSpacing = 0;
  var _viewMoreButton = null;
  var _viewMoreItem = null;
  var _visibleList = null;

  var spaceBetweenItems = 0; // Set equal to stylesheet setting $c-greedy-nav-space-between-items

  var _animateEllipses = function _animateEllipses() {
    _bulletTimers.forEach(function (timer) {
      root.clearTimeout(timer);
    });
    _theBullets.forEach(function (bullet, index) {
      bullet.style = 'display: none;';
      _bulletTimers.push(root.setTimeout(function () {
        bullet.removeAttribute('style');
      }, _interval * (index + 1)));
    });
  };

  /** @function _fitAndAdjust */
  var _fitAndAdjust = function f(recheck) {
    if (!recheck) {
      root.clearTimeout(_showMoreAnimationTimer);
    }

    // Get current client width
    _availableSpace = _nav.clientWidth - _fixedButton.clientWidth - _totalSpacing;
    _availableSpace -= _viewMoreButton.clientWidth;

    _numOfVisibleItems = _visibleList.getElementsByTagName('li').length;
    _requiredSpace = _breakWidths[_numOfVisibleItems - 1];

    if (_requiredSpace > _availableSpace) {
      // There is not enough room
      _overflowList.insertBefore(_visibleList.lastChild, _overflowList.firstChild);
      _numOfVisibleItems -= 1;

      // Check again
      f(true);
    } else if (_availableSpace > _breakWidths[_numOfVisibleItems]) {
      // More than enough room
      _visibleList.appendChild(_overflowList.firstChild);
      _numOfVisibleItems += 1;

      // Check again
      f(true);
    }

    if (_numOfVisibleItems === _numOfItems) {
      _viewMoreItem.classList.add('s-greedy-nav-hidden');
    } else {
      _viewMoreItem.classList.remove('s-greedy-nav-hidden');
      _showMoreAnimationTimer = root.setTimeout(function () {
        _animateEllipses(_theBullets);
      }, 1000);
    }
  };

  var _init = function _init() {
    _doc = root.document;

    _nav = _doc.querySelector('.c-greedy-nav');
    _visibleList = _nav.querySelector('.c-greedy-nav__list--visible');
    _overflowList = _nav.querySelector('.c-greedy-nav__overflow-list');
    _viewMoreItem = _nav.querySelector('.c-greedy-nav__list--show-more');
    _viewMoreButton = _nav.querySelector('.c-greedy-nav__btn--show-more');
    _fixedButton = _nav.querySelector('.c-greedy-nav__fixed');

    _theBullets = _viewMoreButton.querySelectorAll('.c-greedy-nav__bullet');

    // Get current visible items and their dimensions
    [].concat(_toConsumableArray(_visibleList.childNodes)).filter(function (childNode) {
      return childNode.nodeType === 1;
    }).forEach(function (childNode) {
      _totalSpace += childNode.offsetWidth;
      _numOfItems += 1;
      _breakWidths.push(_totalSpace);
    });

    _totalSpacing = spaceBetweenItems * _numOfItems;

    _overflowList.addEventListener('click', function (ev) {
      ev.stopPropagation();
    }, false);

    _fitAndAdjust();
  };

  // Listen for resize event
  root.addEventListener('resize', _fitAndAdjust, false);

  // Listen for click event
  root.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('c-greedy-nav__btn--show-more') || ev.target.parentNode.classList.contains('c-greedy-nav__btn--show-more')) {
      _overflowList.classList.toggle('s-greedy-nav-hidden');
    } else {
      _overflowList.classList.add('s-greedy-nav-hidden');
    }
  });

  root.addEventListener('DOMContentLoaded', _init);
})(typeof global !== 'undefined' ? global : window);
//# sourceMappingURL=greedynav.js.map
