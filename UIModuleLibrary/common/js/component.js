// ------------------------------------------
// アコーディオン
// ------------------------------------------

// A-01 A-02
// ------------------------------------------
$('.c-accordion__toggle').on('click',function(){
    if($(this).parents('.c-accordion').hasClass('c-accordion-active')){
        $(this).text('open');
        $(this).parents('.c-accordion').find('.c-accordion__body').slideUp();
        $(this).parents('.c-accordion').toggleClass('c-accordion-active');
    }else{
        $(this).text('close');
        $(this).parents('.c-accordion').find('.c-accordion__body').slideDown();
        $(this).parents('.c-accordion').toggleClass('c-accordion-active');
    }
});

// ------------------------------------------
// タブ
// ------------------------------------------

// B-01
// ------------------------------------------
$('.c-tab').on('click',function(){
    if($(this).hasClass('c-tab-active')){
        return;
    }else{
        const index = $(this).parents('.c-tabs__head').find('.c-tab').index(this);
        $(this).parents('.c-tabs__head').find('.c-tab-active').toggleClass('c-tab-active');
        $(this).toggleClass('c-tab-active');
        $(this).parents('.c-tabs').find('.c-tab__body-active').toggleClass('c-tab__body-active');
        $(this).parents('.c-tabs').find('.c-tab__body').eq(index).toggleClass('c-tab__body-active');
    }
});