var pageIndex = 0;

$(document).ready(function () {
    changeMenu(($(".menu-box .menu").index()));

    $(".menu-box .menu").click(function () {
        if ($(this).hasClass('able')) {
            changeMenu($(this).index()); // 클릭한 메뉴의 index 전달
        }
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

function checkInputs() {
    // 각 text 타입 input을 확인하며 값이 비어있는지 여부를 확인
    $('#step' + pageIndex + ' .input-box').each(function () {
        if ($(this).val() === '') { // 아무 값도 없을 때
            $(this).addClass("activate");
        } else {
            $(this).removeClass("activate");
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
            $("input[name='" + $(this).attr('name') + "']").each(function () {
                $(this).removeClass("activate");
            });
        }
    });

    // step3의 추가사항 같은 입력하지 않아도 되는 숨겨진 텍스트 필드 예외
    $("input:text[name='option']").each(function() {
        $(this).removeClass("activate");
    })

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

    $("input:checkbox[name='feature-checkbox[]']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='interior-checkbox']").each(function() {
        if ($(this).prop('checked')) { // 하나라도 체크가 되어있으면
            $("input[name='" + $(this).attr('name') + "']").removeClass("activate");
        }
    })

    $("input:checkbox[name='review-checkbox[]']").each(function() {
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
    
    $("input:checkbox[name='graph-checkbox[]']").each(function() {
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
            $(".menu-box .menu").eq(pageIndex - 1).removeClass("able");
            return false;
        } else {
            $('.next-btn').attr("onclick", "changeMenu(" + pageIndex + ")");
            $(".next-btn").removeClass("inactive");
            $('.menu-box .menu').eq(pageIndex - 1).addClass('able');
        }
    });
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
    if (target.tagName === 'DIV' && target.classList.contains('clickable-cell')) {
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

    $("input[name='" + childDivType + "-checkbox[]']:checked").each(function () {
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

// 핸드폰번호 - 자동 입력
function oninputPhone(target) {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
}