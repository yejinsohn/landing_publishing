var pageIndex = 0;

$(document).ready(function () {
    changeMenu(($(".menu-box .menu").index()));

    $(".menu-box .menu").click(function () {
        changeMenu($(this).index()); // 클릭한 메뉴의 index 전달
    });

    // text 타입 input과 radio 타입 input이 변화할 때마다 checkInputs 함수 호출
    for (let index = 1; index <= $(".menu-box .menu").length; index++) {
        $('#step' + index + ' .input-box, #step' + index + ' .radio, #step' + index + ' .checkbox').on('propertychange change keyup paste input', checkInputs);
    }
});

// 메뉴를 바꿀때 호출. 다음 버튼에 사용.
function changeMenu(index) {
    // 좌측 메뉴 탭 활성화
    $(".menu-box .menu").removeClass("click");
    $(".menu-box .menu").eq(index).addClass("click");
    
    // 본문 활성화
    $(".form-box .menu-area").hide();
    $(".form-box .menu-area").eq(index).show();

    pageIndex = index + 1;
    getInputs(pageIndex);
}

// 해당 menu에 존재하는 input의 종류를 가져옴.
// 메뉴가 바뀔때 한번만 호출하면 됨. 트리거: 다음으로 넘어가는 버튼 클릭 or 메뉴 div가 변경되어 호출됐을 때
// 예외 경우: step4는 기본으로 있는 7가지 사항에 + step3에서 체크한 선택사항의 input만 가져와야 함.
// 예외 경우: step5는 무조건 하나를 체크해야 하지만, 텍스트 작성을 안하고 다른걸 체크해도 넘어가게 해야함.
// input을 모두 검출하고 활성화 된놈들만 activate 클래스를 붙이고 값 작성되면 빼는거로?
// 그리고 activate가 있으면 버튼 비활성화, 없으면 활성화
function getInputs(index) {
    // 초기화. 모든 input의 activate 클래스 제거.
    $(':input').each(function() {
        $(this).removeClass("activate");
    })
    
    // 현재 메뉴에서 활성화 된 input 필드에 activate 클래스 붙이기
    $('#step' + index + ' :input').each(function() {
        // 예외 경우: step3, 6은 선택사항 체크 안해도 다음으로 넘어갈 수 있음.
        // 예외 경우: step3은 추가영역의 텍스트를 작성 안해도 가능하게 해야함.
        if (index != 3 && index != 4 && index != 6) {
            $(this).addClass("activate");
        }
    })

    $('.Reference-button').each(function() {
        $(this).removeClass("activate");
    })

    $('#checkbox-7-4').each(function() {
        $(this).removeClass("activate");
    })

    if ($('#checkbox-2-6').is(':checked')) {
        $('#step3 .input-box').addClass("activate");
    }

    if ($('#radio-4-6').is(':checked')) {
        $('#step5 .input-box').addClass("activate");
    } else {
        $('#step5 .input-box').removeClass("activate");
    }

    checkInputs();
}

// $('input:checkbox[class="checkbox big-checkbox"]:checked') 이 부분에서 클래스명은 정확히 다 써줘야 동작함. 
// activate가 들어가면 들어간대로 다 써줘야함.
// 저장해야 할 데이터들
// step1 : 상호명, 색상조합, 강조이미지
// step2 : 메인화면 강조부분
// step3 : 추가영역(직접입력시)
// step4 : 특징(중복), 메뉴소개, 영수증, 인테리어(유무체크), 후기(중복), 상담신청폼, 가맹절차, 그래프(중복), 유튜브, 인스타, 브랜드소개, 창업비용
// step5 : 강조폰트(직접입력있음)
// step6 : 스티키바
// step7 : 담당자명, 휴대폰번호, 이메일주소
function checkInputs() {
    // 각 text 타입 input을 확인하며 값이 비어있는지 여부를 확인
    $('#step' + pageIndex + ' .input-box').each(function () {
        if (!$(this).is(":hidden")) { // step3의 추가사항 같은 입력하지 않아도 되는 숨겨진 텍스트 필드 예외 방지
            if ($(this).val() === '') { // 아무 값도 없을 때
                $(this).addClass("activate");
            } else {
                $(this).removeClass("activate");
            }
        }
    });
    
    // radio 타입 input 중 하나만 체크되어 있는지 확인
    $('#step' + pageIndex + ' .radio').each(function () {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            if ($(this).is('#radio-4-6')) { // Step5. 강조 폰트 선택 직접 입력
                $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
                if ($('#step5 .input-box').val() === '') {
                    $('#step5 .input-box').addClass("activate");
                } else {
                    $('#step5 .input-box').removeClass("activate");
                }
            } else {
                $('#step5 .input-box').removeClass("activate");
                $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
                return false;
            }
        } else {
            $(this).addClass("activate");
        }
    });
    
    // checkbox 타입 input 중 하나만 체크되어 있는지 확인
    $('#step' + pageIndex + ' .checkbox').each(function () {
        if (pageIndex != 3 && pageIndex != 6) {
            if ($(this).prop('checked')) {
                $(this).removeClass("activate");
                $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
                return false;
            } else {
                $(this).addClass("activate");
            }
        }
    });

    $('#const-table .optional-td').each(function () {
        if ($(this).is(':hidden')) {
            $("input[name='" + $('#const-table .optional-td').attr('name') + "']").each(function () {
                $(this).removeClass("activate");
            });
        }
    });

    $("input:radio[name='menu-radio']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:radio[name='receipt-radio']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:radio[name='youtube-radio']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:radio[name='insta-radio']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:radio[name='brand-radio']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='feature-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='interior-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='review-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='contact-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='step-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })
    
    $("input:checkbox[name='graph-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $('#checkbox-7-4').each(function() {
        $(this).removeClass("activate");
    })

    // 버튼 활성화/비활성화
    $($('#step' + pageIndex + ' :input')).each(function() {
        if($(this).hasClass("activate") === true) { // activate 클래스가 있다면, 즉 입력 안한 칸이 있다면
            $('.next-btn').attr('onclick', '').unbind('click');
            $(".next-btn").addClass("inactive");
            return false;
        } else {
            $('.next-btn').attr("onclick", "changeMenu(" + pageIndex + ")");
            $(".next-btn").removeClass("inactive");
        }
    });

    // if ($('#step' + ($(".menu-box .menu").index() + 1) + ' :input').hasClass("activate") === true) {
    //     console.log($('#step' + ($(".menu-box .menu").index() + 1) + ' :input').hasClass("activate"));
    //     $('.next-btn').attr('onclick', '').unbind('click');
    //     $(".next-btn").addClass("inactive");
    // } else {
    //     $('.next-btn').attr("onclick", "changeMenu(" + ($(".menu-box .menu").index() + 1) + ")");
    //     $(".next-btn").removeClass("inactive");
    // }

    // 모든 text 타입 input이 채워져 있고, radio 타입 input 중 하나만 체크되어 있으면 버튼 활성화
    // if ((allTextInputsFilled && oneRadioChecked && oneCheckboxChecked)) {
    //     $('.next-btn').attr("onclick", "changeMenu(" + ($(".menu-box .menu").index() + 1) + ")");
    //     $(".next-btn").removeClass("inactive");
    // } else {
    //     $('.next-btn').attr('onclick', '').unbind('click');
    //     $(".next-btn").addClass("inactive");
    // }
}

// Step3 구성 선택1 -> 구성 선택2 테이블 출력
function showOptionalTableDiv() {
    if ($('#checkbox-2-6').is(':checked')) {
        $('#step3 .input-box').show();
        $('#step3 .input-box').addClass("activate");
    } else {
        $('#step3 .input-box').hide();
        $('#step3 .input-box').removeClass("activate");
    }
    var check_arr = [];
    $('.optional-td').hide();
    $('input:checkbox[class="checkbox big-checkbox"]:checked').each(function () {
        check_arr.push($(this).attr('id'));
    })

    for (var i = 0; i < check_arr.length; i++) {
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
            case '그래프':
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
        checkInputs();
    }
}

// 체크박스 - 내용 출력 (중복선택 가능)
// 사용처: Step4 특징, Step4 후기, Step4 그래프
function duplicableCheckbox(childDivType) {
    var checkedbox_array = [];
    $('.' + childDivType + '-div').hide(); // 내용이 들어가있는 div 숨기기.

    $("input[name='" + childDivType + "-checkbox']:checked").each(function () {
        checkedbox_array.push($(this).attr('id'))
    })

    for (var i = 0; i < checkedbox_array.length; i++) {
        $('#div-' + checkedbox_array[i]).show();
    }
}

// 체크박스 - 내용 출력 (중복선택 불가능)
// 사용처: Step4 상담신청폼, Step4 가맹절차
function singleCheckbox(checkedbox, childDivType) {
    $('.' + childDivType + '-div').hide(); // 내용이 들어가있는 div 숨기기.

    if ($(checkedbox).prop('checked')) { // 체크박스의 체크유무를 확인하여 출력.
        $("input[type='checkbox'][name='" + childDivType + "-checkbox']").prop('checked', false);
        $(checkedbox).prop('checked', true);
        $('#div-' + $(checkedbox).attr('id')).show();
    } else {
        $(checkedbox).prop('checked', false);
    }
}

// 라디오버튼 - 내용 출력
// 사용처: Step2 메인 화면, Step4 메뉴 소개, Step4 영수증, Step4 유튜브 영상, Step4 인스타그램 이미지, Step4 브랜드 소개, Step5 강조 폰트 선택
function showDivRadio(checkedRadio) {
    var selectedRadioId = $("input[name='" + checkedRadio + "-radio']:checked").attr('id');
    $('.' + checkedRadio + '-div').hide();
    $('#div-' + selectedRadioId).show();
}

//핸드폰번호 - 자동 입력
function oninputPhone(target) {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
}