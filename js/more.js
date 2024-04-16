$(document).ready(function() {
    var list = $("#show-more__list #show-more__item");
    var numToShow = 6; //сколько показывать элементов
    var button = $("button.button__show-more");
    var numInList = list.length;
    list.hide();
    if (numInList > numToShow) {
      button.show();
    }
    else{
        button.css({
            'transform':'none',
            'cursor':'not-allowed',
        });
        button.fadeTo("fast", 0.5);
    }
    list.slice(0, numToShow).show();
    button.click(function() {
      var showing = list.filter(':visible').length;
      list.slice(showing - 1, showing + numToShow).fadeIn();
      var nowShowing = list.filter(':visible').length;
      if (nowShowing >= numInList || nowShowing == numInList) {
        button.css({
            'transform':'none',
            'cursor':'not-allowed',
        });
        button.fadeTo("fast", 0.5);
      }
    });
  });