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
    });
  };
  var effectTime = 500,
    ease = 'easeInExpo';
  var previousTransition = function() {
    effect('.currentPage', effectTime + 120, -1, '100%', 0, ease);
    effect('.previousPage', effectTime + 120, -1, 0, effectTime / 2, ease);
  };
  var nextTransition = function(){
    effect('.currentPage', effectTime, 1, '-100%', 0, ease);
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
      $hiddenPage = $('.page[data-index=' + hiddenPageID + ']');
      classChange($previousPage, 'previousPage', e.data.exchangePreviousPage);
      classChange($currentPage, 'currentPage', e.data.exchangeCurrentPage);
      classChange($nextPage, 'nextPage', e.data.exchangeNextPage);
      classChange($hiddenPage, 'hiddenPage', e.data.exchangeHiddenPage);
      resetTransition();
    }, delay);
  };
  if (e.data.reverse == true) {
    previousTransition();
    hiddenPageID = $previousPage.data('index') > 1 ? ($previousPage.data('index') - 1) : pagesNumber;
  } else {
    nextTransition();
    hiddenPageID = $nextPage.data('index') < pagesNumber ? ($nextPage.data('index') + 1) : 1;
  }
  transitionUpdate(effectTime * 2.5);
  console.log($previousPage.data('index'));
}
/**
 * load events and transitions
 */
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

/**
 * core animation marquesine
 */
var marquesineAnimation =  function() {
  var $marquesine = $('.home>.marquesine>ul');
  $marquesine.css({width: $marquesine.find('li').length * 130});
  setTimeout(function(){
    $marquesine
      .animate({
        left: $marquesine.parent().width() - $marquesine.width() - 138
      }, 6 * 1000)
      .animate({
        left: 0
      }, 250);
    setInterval(function(){
      if ($('.home').hasClass('currentPage')) {
        $marquesine
          .animate({
            left: $marquesine.parent().width() - $marquesine.width() - 138
          }, 6 * 1000)
          .animate({
            left: 0
          }, 250);
      }
    }, 6.5 * 1000);
    
  }, 500);
};
$(window).load(marquesineAnimation);