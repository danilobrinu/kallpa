(function(){var method;var noop=function(){};var methods=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];var length=methods.length;var console=window.console=window.console||{};while(length--){method=methods[length];if(!console[method])console[method]=noop}})();
/**
 * hover animation to transition buttons
 */
var $previousTransitionButton = $('#previousTransitionButton');
var $nextTransitionButton = $('#nextTransitionButton');
var hoverTransitionHandler = function() {
  $(this).addClass('hovered').text($('.' + $(this).data('page')).data('name'));
};
var hoverTransitionClear = function() {
  $(this).removeClass('hovered').text('');
};
$previousTransitionButton.hover(hoverTransitionHandler, hoverTransitionClear);
$nextTransitionButton.hover(hoverTransitionHandler, hoverTransitionClear);
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
      }, time + (additionalTimeSign * (index * time / 6)), ease);
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
  var hoverTransitionClear = function() {
    $('#' + e.currentTarget.id).removeClass('hovered').text('');
  };
  if (e.data.reverse == true) {
    previousTransition();
    hiddenPageID = $previousPage.data('index') > 1 ? ($previousPage.data('index') - 1) : pagesNumber;
  } else {
    nextTransition();
    hiddenPageID = $nextPage.data('index') < pagesNumber ? ($nextPage.data('index') + 1) : 1;
  }
  transitionUpdate(effectTime * 2.5);
  /**
   * hover transition clear
   */
  hoverTransitionClear();  
}
/**
 * core animation marquesine
 */
var marquesineAnimation =  function() {
  var $marquesine = $('.home>.marquesine>ul');
  $marquesine.css({
    width: $marquesine.find('li').length * 130
  });
  var effectTime = 6 * 1000;
  var delay = 500;
  var effect =  function() {
    $marquesine
      .animate({
        left: $marquesine.parent().width() - $marquesine.width() - 138
      }, effectTime)
      .animate({
        left: 0
      }, delay / 2);
  };
  setTimeout(function(){
    effect();
    setInterval(function(){
      if ($('.home').hasClass('currentPage')) {
        effect();
      }
    }, effectTime + delay);
    
  }, delay);
};
/**
 * Init and load marquesine animation
 */
$(window).load(marquesineAnimation);
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
 * method to reset form
 */
function reset_form(e) {
  $(e.data.selector)[0].reset();
}
$('#contact-form .cleanButton').on('click', {
  selector: '#contact-form'
}, reset_form);
/**
 * example of show modal experts
 */
/*
$('.modal.show-experts .hideButton').on('click', function(){
  $('.modal').hide();
});
$('.internal-page.us-our-experts>.body>.span-8-of-12>.wrapper>.container>img').on('click', function(){
  $('.modal').show();
});
*/