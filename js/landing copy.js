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

function next(idx){
    $(".form-box .menu-area").hide();
    $(".form-box .menu-area").eq(idx + 1).show();

    //Menu Event
    $(".menu-box .menu").removeClass("click");
    $(".menu-box .menu").eq(idx + 1).addClass("click");
}

function prev(idx){
    $(".form-box .menu-area").hide();
    $(".form-box .menu-area").eq(idx - 1).show();

    //Menu Event
    $(".menu-box .menu").removeClass("click");
    $(".menu-box .menu").eq(idx - 1).addClass("click");
}

// 컬러톤 추가
function setColorBox() {
    var colorBox2 = $('#color-box-2');
    var colorBox3 = $('#color-box-3');
    var setcolor = $('.color-plus');

    if (colorBox2.css('display') === 'none') {
        colorBox2.show();
    } else if (colorBox2.css('display') === 'block') {
        colorBox3.show();
        setcolor.hide();
    }
}

// 메인 화면 선택
function showMainDiv() {
    var selectedRadioId = $('input[name="main-radio"]:checked').attr('id');
    $('.main-div').hide();
    $('#div-' + selectedRadioId).show();
}