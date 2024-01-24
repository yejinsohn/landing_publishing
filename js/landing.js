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

// button 
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

// Step1 컬러톤 추가
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

// Step2 메인 화면
function showMainDiv() {
    var selectedRadioId = $('input[name="main-radio"]:checked').attr('id');
    $('.main-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step4 구성 선택2
function showOptionalTableDiv() {
    var check_arr = [];
    $('.optional-td').hide();
    $('input[class="checkbox big-checkbox"]:checked').each(function() {
        check_arr.push($(this).attr('id'))
    })
    
    for(var i = 0; i < check_arr.length; i++) {
        $('#td-' + check_arr[i]).show();
    }
}

// Step4 구성 클릭
function changeColor(event) {
    const target = event.target;

    if (target.tagName === 'TD' && target.classList.contains('clickable-cell')) {
        const cellContent = target.textContent.trim().toLowerCase();

        // 숨기기
        document.querySelectorAll('.const-feature, .const-menu, .const-receipt, .const-interior, .const-review, .const-contact, .const-affiliate-step, .const-graph, .const-youtube, .const-insta, .const-brand, .const-price').forEach(function (div) {
            div.style.display = 'none';
        });

        // 보이기
        switch (cellContent) {
            case '특징':
                document.querySelector('.const-feature').style.display = 'block';
                break;
            case '메뉴 소개':
                document.querySelector('.const-menu').style.display = 'block';
                break;
            case '영수증':
                document.querySelector('.const-receipt').style.display = 'block';
                break;
            case '인테리어':
                document.querySelector('.const-interior').style.display = 'block';
                break;
            case '후기':
                document.querySelector('.const-review').style.display = 'block';
                break;
            case '상담 신청 폼':
                document.querySelector('.const-contact').style.display = 'block';
                break;
            case '가맹절차':
                document.querySelector('.const-affiliate-step').style.display = 'block';
                break;
            case '매출 그래프':
                document.querySelector('.const-graph').style.display = 'block';
                break;
            case '유튜브 영상':
                document.querySelector('.const-youtube').style.display = 'block';
                break;
            case '인스타그램 이미지':
                document.querySelector('.const-insta').style.display = 'block';
                break;
            case '브랜드 소개':
                document.querySelector('.const-brand').style.display = 'block';
                break;
            case '창업 비용':
                document.querySelector('.const-price').style.display = 'block';
                break;
            default:
                break;
        }

        document.querySelectorAll('.clickable-cell').forEach(function (cell) {
            cell.classList.remove('clicked');
        });
        target.classList.add('clicked');
    }
}

// Step4 특징
function showFeatureDiv() {
    var check_arr = [];
    $('.feature-div').hide();
    $('input[class="checkbox big-checkbox"]:checked').each(function() {
        check_arr.push($(this).attr('id'))
    })
    
    for(var i = 0; i < check_arr.length; i++) {
        $('#div-' + check_arr[i]).show();
    }
}

// Step4 메뉴
function showMenuDiv() {
    var selectedRadioId = $('input[name="menu-radio"]:checked').attr('id');
    $('.menu-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step4 후기
function showReviewDiv() {
    var check_arr = [];
    $('.review-div').hide();
    $('input[name="review-checkbox"]:checked').each(function() {
        check_arr.push($(this).attr('id'))
    })
    
    for(var i = 0; i < check_arr.length; i++) {
        $('#div-' + check_arr[i]).show();
    }
}

// Step4 가맹절차
function showStepDiv() {
    var selectedRadioId = $('input[name="step-radio"]:checked').attr('id');
    $('.step-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step4 그래프
function showGraphDiv() {
    var selectedRadioId = $('input[name="graph-radio"]:checked').attr('id');
    $('.graph-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step4 유튜브 영상 재생
function showYoutubeDiv() {
    var selectedRadioId = $('input[name="youtube-radio"]:checked').attr('id');
    $('.youtube-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step4 상담신청
function showContactDiv() {
    var check_arr = [];
    $('.contact-div').hide();
    $('input[name="contact-checkbox"]:checked').each(function() {
        check_arr.push($(this).attr('id'))
    })
    
    for(var i = 0; i < check_arr.length; i++) {
        $('#div-' + check_arr[i]).show();
    }

    // var selectedRadioId = $('input[name="contact-checkbox"]:checked').attr('id');
    // $('.contact-div').hide();
    // $('#div-' + selectedRadioId).show();
    // if($('#' + selectedRadioId).is(':checked')){
    //     $('input[type="checkbox"][name="contact-checkbox"]').prop('checked',false);
    // }
}

// Step4 영수증
function showReceiptDiv() {
    var selectedRadioId = $('input[name="receipt-radio"]:checked').attr('id');
    $('.receipt-div').hide();
    $('#div-' + selectedRadioId).show();
}

// Step5 폰트 예시
function shoFontDiv() {
    var selectedRadioId = $('input[name="font-radio"]:checked').attr('id');
    $('.font-div').hide();
    $('#div-' + selectedRadioId).show();
}