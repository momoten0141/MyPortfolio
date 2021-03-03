$(()=>{
// アンカーによるスクロール処理
// const modules = ['.c-accordion','.c-tabs'];
// const handleHash = ()=>{
//     const hash = location.hash;
//     if(hash !== ''){
//         for(let i=0; i<modules.length; i++){
//             const moduleId = $(hash).parents(modules[i]).attr('data-module-id');
//             let position;
//             switch(moduleId){
//                 case 'A01':
//                     $(hash).parents('.c-accordion').find('.c-accordion__toggle').text('CLOSE');
//                     $(hash).parents('.c-accordion').find('.c-accordion__body').slideDown();
//                     $(hash).parents('.c-accordion').addClass('c-accordion-active');
//                     position = $(hash).offset().top;
//                     setTimeout(function(){
//                         $(window).scrollTop(position);
//                     },400);
//                 break;
//                 case 'A02':
//                     $(hash).parents('.c-accordion').find('.c-accordion__toggle').text('CLOSE');
//                     $(hash).parents('.c-accordion').find('.c-accordion__body').slideDown();
//                     $(hash).parents('.c-accordion').addClass('c-accordion-active');
//                     position = $(hash).offset().top;
//                     setTimeout(function(){
//                         $(window).scrollTop(position);
//                     },400);
//                 break;
//                 case 'B01':
//                     if($(hash).hasClass('c-tab')){
//                         const index = $(hash).index();
//                         $(hash).parents('.c-tabs__head').find('.c-tab-active').toggleClass('c-tab-active');
//                         $(hash).toggleClass('c-tab-active');
//                         $(hash).parents('.c-tabs').find('.c-tab__body-active').toggleClass('c-tab__body-active');
//                         $(hash).parents('.c-tabs').find('.c-tab__body').eq(index).toggleClass('c-tab__body-active');
//                     }else{
//                         const index = $(hash).parents('.c-tab__body').index();
//                         $(hash).parents('.c-tabs').find('.c-tabs__head').find('.c-tab-active').toggleClass('c-tab-active');
//                         $(hash).parents('.c-tabs').find('.c-tab').eq(index).toggleClass('c-tab-active');
//                         $(hash).parents('.c-tabs__body').find('.c-tab__body-active').toggleClass('c-tab__body-active');
//                         $(hash).parents('.c-tab__body').toggleClass('c-tab__body-active');
//                     }
//                     position = $(hash).offset().top;
//                     $(window).scrollTop(position);
//                 break;
//                 default:
//             }
//         }
//     }
// }

// handleHash();

// $(window).on('hashchange', () => {
//     handleHash();
// });

// ------------------------------------------
// アコーディオン
// ------------------------------------------

// A-01 A-02
// ------------------------------------------
$('.c-accordion__head').on('click',(e)=>{
    $(e.currentTarget).nextAll('.c-accordion__body').stop(true,false).slideToggle();
    $(e.currentTarget).nextAll('.c-accordion__body').toggleClass('js-accordion-active');
    $(e.currentTarget).toggleClass('js-accordion-active');
});

// ------------------------------------------
// タブ
// ------------------------------------------

// B-01
// ------------------------------------------
$('.c-tab').on('click',(e)=>{
    if($(e.currentTarget).hasClass('js-tab-active')){
        return;
    }else{
        const index = $(e.currentTarget).parents('.c-tabs__head').find('.c-tab').index(e.currentTarget);
        $(e.currentTarget).parents('.c-tabs').find('.js-tab-active').toggleClass('js-tab-active');
        $(e.currentTarget).toggleClass('js-tab-active');
        $(e.currentTarget).parents('.c-tabs').find('.c-tab__body').eq(index).toggleClass('js-tab-active');
    }
});

});