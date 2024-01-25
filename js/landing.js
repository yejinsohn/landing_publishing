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

// Step3 구성 선택1 -> 구성 선택2 테이블 출력
function showOptionalTableDiv() {
    if($('#checkbox-2-6').is(':checked')) {
        $('#step3 .input-box').show();
    } else {
        $('#step3 .input-box').hide();
    }
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

// 체크박스 - 내용 출력 (중복선택 가능)
// 사용처: Step4 특징, Step4 후기, Step4 매출 그래프
function duplicableCheckbox(childDivType) {
    var checkedbox_array = [];
    $('.' + childDivType + '-div').hide(); // 내용이 들어가있는 div 숨기기.

    $("input[name='" + childDivType + "-checkbox']:checked").each(function() {
        checkedbox_array.push($(this).attr('id'))
    })

    for(var i = 0; i < checkedbox_array.length; i++) {
        $('#div-' + checkedbox_array[i]).show();
    }
}

// 체크박스 - 내용 출력 (중복선택 불가능)
// 사용처: Step4 상담신청폼, Step4 가맹절차
function singleCheckbox(checkedbox, childDivType) {
    $('.' + childDivType + '-div').hide(); // 내용이 들어가있는 div 숨기기.
    
    if($(checkedbox).prop('checked')) { // 체크박스의 체크유무를 확인하여 출력.
        $("input[type='checkbox'][name='" + childDivType + "-checkbox']").prop('checked',false);
        $(checkedbox).prop('checked',true);
        $('#div-' + $(checkedbox).attr('id')).show();
    } else {
        $(checkedbox).prop('checked',false);
    }
}

// 라디오버튼-내용 출력
// 사용처: Step2 메인 화면, Step4 메뉴소개, Step4 영수증, Step4 유튜브 영상, Step4 인스타그램 이미지, Step4 브랜드 소개, Step5 강조 폰트 선택
function showDivRadio(checkedRadio) {
    var selectedRadioId = $("input[name='" + checkedRadio + "-radio']:checked").attr('id');
    $('.' + checkedRadio + '-div').hide();
    $('#div-' + selectedRadioId).show();
}