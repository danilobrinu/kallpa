/* clear console */
(function(){var e;var d=function(){};var b=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];var c=b.length;var a=(window.console=window.console||{});while(c--){e=b[c];if(!a[e]){a[e]=d}}}());
/**
 * this function animated all class with .animated-box
 * need jquery.easing for ease type = 'easeInExpo'
 */
function animatedBoxes(page, left) {
	$(page + ' .animated-box').each(function(index) {
		$(this).animate({
			left: left
		}, 500 + (index * 300), 'easeInExpo');
	});
}
/**
 * selectors for animation 
 * page is a class for declare a page in body
 * current-page, previous-page, next-page and hidden-page
 * define the state of page
 */
function animatePages(e) {
	var previousPage = $('.previous-page'),
		currentPage = $('.current-page'),
		nextPage = $('.next-page'),
		pagesNumber = $('.page').length,
		idHiddenPage = null,
		hiddenPage = null;
	if (e.data.type == 'previous') {
		animatedBoxes('.current-page', '100%');
		setTimeout(function() {
			animatedBoxes('.previous-page', '0%');
		}, 150);
		idHiddenPage = previousPage.data('page') > 1 ? (previousPage.data('page') - 1) : 5;
	} else {
		animatedBoxes('.current-page', '-100%');
		setTimeout(function() {
			animatedBoxes('.next-page', '0%');
		}, 150);
		idHiddenPage = nextPage.data('page') < pagesNumber ? (nextPage.data('page') + 1) : 1;
	}
	hiddenPage = $('.page[data-page=' + idHiddenPage + ']');
	setTimeout(function() {
		/**
		 * update class to the new animation
		 */
		previousPage.removeClass('previous-page').addClass(e.data.previousPageToggle);
		currentPage.removeClass('current-page').addClass(e.data.currentPageToggle);
		nextPage.removeClass('next-page').addClass(e.data.nextPageToggle);
		hiddenPage.removeClass('hidden-page').addClass(e.data.hiddenPageToggle);
	}, 800);
	/**
	 * prevent to reset default css all .animated-box
	 */
	$('.animated-box').removeAttr('style');
}
/**
 * implement of abstraction of animate pages
 * to events click previous or next
 */
$('.body__layout__nav__trigger--previous-page').on('click',  {
	type: 'previous',
	previousPageToggle: 'current-page',
	currentPageToggle: 'next-page',
	nextPageToggle: 'hidden-page',
	hiddenPageToggle: 'previous-page'
}, animatePages);

$('.body__layout__nav__trigger--next-page').on('click',  {
	type: 'next',
	previousPageToggle: 'hidden-page',
	currentPageToggle: 'previous-page',
	nextPageToggle: 'current-page',
	hiddenPageToggle: 'next-page'
}, animatePages);
