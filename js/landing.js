$(document).ready(function(){
    $(".menu-box .menu").click(function (){
        var index = $(this).index();

        //Menu Event
        $(".menu-box .menu").removeClass("click");
        $(this).addClass("click");

        //Tap area Event
        $(".form-box .menu-area").hide();
        $(".form-box .menu-area").eq(index).show();
    });
});