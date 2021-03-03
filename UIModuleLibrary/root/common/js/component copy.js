$(function(){
// アンカーによるスクロール処理
const modules = ['.c-accordion','.c-tabs'];
const handleHash = ()=>{
    const hash = location.hash;
    if(hash !== ''){
        for(let i=0; i<modules.length; i++){
            const moduleId = $(hash).parents(modules[i]).attr('data-module-id');
            let position;
            switch(moduleId){
                case 'A01':
                    $(hash).parents('.c-accordion').find('.c-accordion__toggle').text('CLOSE');
                    $(hash).parents('.c-accordion').find('.c-accordion__body').slideDown();
                    $(hash).parents('.c-accordion').addClass('c-accordion-active');
                    position = $(hash).offset().top;
                    setTimeout(function(){
                        $(window).scrollTop(position);
                    },400);
                break;
                case 'A02':
                    $(hash).parents('.c-accordion').find('.c-accordion__toggle').text('CLOSE');
                    $(hash).parents('.c-accordion').find('.c-accordion__body').slideDown();
                    $(hash).parents('.c-accordion').addClass('c-accordion-active');
                    position = $(hash).offset().top;
                    setTimeout(function(){
                        $(window).scrollTop(position);
                    },400);
                break;
                case 'B01':
                    if($(hash).hasClass('c-tab')){
                        const index = $(hash).index();
                        $(hash).parents('.c-tabs__head').find('.c-tab-active').toggleClass('c-tab-active');
                        $(hash).toggleClass('c-tab-active');
                        $(hash).parents('.c-tabs').find('.c-tab__body-active').toggleClass('c-tab__body-active');
                        $(hash).parents('.c-tabs').find('.c-tab__body').eq(index).toggleClass('c-tab__body-active');
                    }else{
                        const index = $(hash).parents('.c-tab__body').index();
                        $(hash).parents('.c-tabs').find('.c-tabs__head').find('.c-tab-active').toggleClass('c-tab-active');
                        $(hash).parents('.c-tabs').find('.c-tab').eq(index).toggleClass('c-tab-active');
                        $(hash).parents('.c-tabs__body').find('.c-tab__body-active').toggleClass('c-tab__body-active');
                        $(hash).parents('.c-tab__body').toggleClass('c-tab__body-active');
                    }
                    position = $(hash).offset().top;
                    $(window).scrollTop(position);
                break;
                default:
            }
        }
    }
}

handleHash();

$(window).on('hashchange', () => {
    handleHash();
});

// ------------------------------------------
// アコーディオン
// ------------------------------------------

// A-01 A-02
// ------------------------------------------
$('.c-accordion__toggle').on('click',function(){
    if($(this).parents('.c-accordion').hasClass('c-accordion-active')){
        $(this).text('OPEN');
        $(this).parents('.c-accordion').find('.c-accordion__body').slideUp();
        $(this).parents('.c-accordion').toggleClass('c-accordion-active');
    }else{
        $(this).text('CLOSE');
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

});