$(function() {
    $('#js-menu').click(function() { 
    
        //クリックした時にis－activeクラスを付与する
        $(this).next().slideToggle();
        $(this).children('.header-icon').toggleClass('is-open');
        return false;
    });
});