# Greedy Navigation
GreedyNav, https://github.com/lukejacksonn/GreedyNav, converted to SASS and Vanilla JS (ES6).

## Workings
When the width of the screen becomes too small for all menu items to fit then items will be dropped from right to left until the menu fits within the page again. All items that are dropped are moved to a list of vertically stacked items that is initially hidden. The user is notified of any hidden items by a button that is appearing on the right showing the number of items hidden. Pushing this button shows the list with moved items.

## Demo

http://codepen.io/jmeester/pen/yVpYqm

## Usage
```html
<!DOCTYPE html>
<head>
	<!-- Add the stylesheet -->
    <link rel="stylesheet" href="greedynav.css">
</head>
<body>
	<nav class='c-greedy-nav'>
    	<ul class='c-greedy-nav__list'>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>navbar</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>that</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>handles</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>overflowing</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>menu</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>elements</a>
            </li>
        	<li class="c-greedy-nav__item">
            	<a class="c-greedy-nav__link" href='#'>effortlessly</a>
            </li>
    	</ul>
    	<button class="c-greedy-nav__button">MENU</button>
    	<ul class='c-greedy-nav__overflow-list s-hidden'></ul>
	</nav>

	<!-- Add the JavaScript -->
	<script src="greedynav.js"></script>
</body>
```
