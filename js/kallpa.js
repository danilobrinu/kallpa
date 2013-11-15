(function(){var method;var noop=function(){};var methods=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];var length=methods.length;var console=window.console=window.console||{};while(length--){method=methods[length];if(!console[method])console[method]=noop}})();
/**
 * core of animation
 */
function transition(e) {
  var $previousPage = $('.previousPage'),
    $currentPage = $('.currentPage'),
    $nextPage = $('.nextPage'),
    $hiddenPage = null,
    hiddenPageID = null,
    pagesNumber = $('.page').length;
  var effect = function (page, time, additionalTimeSign, left, delay, ease) {
    $(page + ' .transitionElement').delay(delay).each(function(index) {
      $(this).animate({
        left: left
      }, time + (additionalTimeSign * (index * time / 6 ) ), ease);
      console.log( additionalTimeSign * (index * time / 6 ) );
    });
  };
  var effectTime = 500,
    ease = 'easeInExpo';
  var previousTransition = function() {
    effect('.currentPage', effectTime + 120, -1, 960, 0, ease);
    effect('.previousPage', effectTime + 120, -1, 0, effectTime / 2, ease);
  };
  var nextTransition = function(){
    effect('.currentPage', effectTime, 1, -960, 0, ease);
    effect('.nextPage', effectTime, 1, 0, effectTime / 2, ease);
  };
  var resetTransition = function() {
    $('.transitionElement').removeAttr('style');
  }
  var classChange = function (element, currentClass, newClass) {
    element.removeClass(currentClass).addClass(newClass);
  };
  var transitionUpdate = function(delay) {
    setTimeout(function(){
      $hiddenPage = $('.page[data-page=' + hiddenPageID + ']');
      classChange($previousPage, 'previousPage', e.data.exchangePreviousPage);
      classChange($currentPage, 'currentPage', e.data.exchangeCurrentPage);
      classChange($nextPage, 'nextPage', e.data.exchangeNextPage);
      classChange($hiddenPage, 'hiddenPage', e.data.exchangeHiddenPage);
      resetTransition();
    }, delay);
  };
  if (e.data.reverse == true) {
    /**
     * fix height body
     */
    $('.body').css({height: $(window).width() > 980 ? $previousPage.height() : 1600});
    /**
     * transition and update id of hidden page
     */
    previousTransition();
    hiddenPageID = $previousPage.data('page') > 1 ? ($previousPage.data('page') - 1) : pagesNumber;
  } else {
    /**
     * fix height body
     */
    $('.body').css({height: $(window).width() > 980 ? $nextPage.height() : 1600});
    /**
     * transition and update id of hidden page
     */
    nextTransition();
    hiddenPageID = $nextPage.data('page') < pagesNumber ? ($nextPage.data('page') + 1) : 1;
  }
  transitionUpdate(effectTime * 2.5);
}

//if ($(window).width() > 980) {
  $('#previousTransitionButton').on('click', {
    reverse: true,
    exchangePreviousPage: 'currentPage',
    exchangeCurrentPage: 'nextPage',
    exchangeNextPage: 'hiddenPage',
    exchangeHiddenPage: 'previousPage'
  }, transition);

  $('#nextTransitionButton').on('click', {
    exchangePreviousPage: 'hiddenPage',
    exchangeCurrentPage: 'previousPage',
    exchangeNextPage: 'currentPage',
    exchangeHiddenPage: 'nextPage'
  }, transition);
//}
function transitionMarquesine() {
  var w = 0;
  $('.inicio>nav>ul li').css('width', 170);
  $('.inicio>nav>ul').css('width', ($('.inicio>nav>ul li').length * 170) < 960 ? 960 : $('.inicio>nav>ul li').length * 170);
  setTimeout(function() {
    $('.inicio>nav>ul').animate({
      left: 960 - $(this).width()
    }, 4 * 1000);
  }, 1000);
  setInterval(function() {
    $('.inicio>nav>ul').animate({
      left: 960 - $(this).width()
    }, 4 * 1000).animate({
      left: 0
    }, 0);
  }, 4 * 1000);
}

if ($(window).width() > 980) {
  transitionMarquesine();
}
