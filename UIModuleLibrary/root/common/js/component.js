$(()=>{
// ------------------------------------------
// アコーディオン
// ------------------------------------------

// A-01 A-02
// ------------------------------------------
const toggleAcc = (target)=>{
    target.parents('.c-accordion').find('.c-accordion__head').toggleClass('js-accordion-active');
    target.parents('.c-accordion').find('.c-accordion__body').stop(true,false).slideToggle();
    target.parents('.c-accordion').find('.c-accordion__body').toggleClass('js-accordion-active');
}

$('.c-accordion__head').on('click',(e)=>{
    const target = $(e.currentTarget);
    toggleAcc(target);
});


// ------------------------------------------
// タブ
// ------------------------------------------

// B-01
// ------------------------------------------
const switchTab = (target,index)=>{
    target.parents('.c-tabs').find('.js-tab-active').toggleClass('js-tab-active');
    target.parents('.c-tabs').find('.c-tab').eq(index).toggleClass('js-tab-active');
    target.parents('.c-tabs').find('.c-tab__body').eq(index).toggleClass('js-tab-active');
}

$('.c-tab').on('click',(e)=>{
    if(!($(e.currentTarget).hasClass('js-tab-active'))){
        const index = $(e.currentTarget).parents('.c-tabs__head').find('.c-tab').index(e.currentTarget);
        const target = $(e.currentTarget);
        switchTab(target,index);
    }
});


// ------------------------------------------
// カルーセル
// ------------------------------------------

// C-01
// ------------------------------------------
const togglePagination = (carousel)=>{
    const removeIndex = carousel.find('.js-carousel__pagination-active').index();
    const addIndex = carousel.find('.js-carousel-active').index();
    carousel.find('.c-carousel__pagination__item').eq(removeIndex).removeClass('js-carousel__pagination-active');
    carousel.find('.c-carousel__pagination__item').eq(addIndex).addClass('js-carousel__pagination-active');
}

const prevSlide = (carousel)=>{
    const activeSlide = carousel.find('.js-carousel-active');
    const length = carousel.find('.c-carousel__item').length;
    activeSlide.removeClass('js-carousel-active');
    if(activeSlide.index() === 0){
        carousel.find('.c-carousel__item').eq(length-1).addClass('js-carousel-active');
    }else{
        activeSlide.prev().addClass('js-carousel-active');
    }
}

const nextSlide = (carousel)=>{
    const activeSlide = carousel.find('.js-carousel-active');
    const length = carousel.find('.c-carousel__item').length;
    activeSlide.removeClass('js-carousel-active');
    if(activeSlide.index() === length-1){
        carousel.find('.c-carousel__item').eq(0).addClass('js-carousel-active');
    }else{
        activeSlide.next().addClass('js-carousel-active');
    }
}

const autoSlide = ()=>{
    const carouselNum = $('.c-carousel').length;
    setTimeout(()=>{
        for(let i=0; i<carouselNum; i++){
            const carousel = $('.c-carousel').eq(i);
            nextSlide(carousel);
            togglePagination(carousel);
        }
        autoSlide();
    },5000);
}

$('.c-carousel__prev').on('click',(e)=>{
    const carousel = $(e.currentTarget).parents('.c-carousel');
    prevSlide(carousel);
    togglePagination(carousel);
});

$('.c-carousel__next').on('click',(e)=>{
    const carousel = $(e.currentTarget).parents('.c-carousel');
    nextSlide(carousel);
    togglePagination(carousel);
});

autoSlide();






// ------------------------------------------
// アンカー処理
// ------------------------------------------
const modules = ['c-accordion','c-tabs'];
const handleHash = ()=>{
    const hash = location.hash;
    if(hash !== ''){
        for(let i=0; i<modules.length; i++){
            if($(hash).parents().hasClass(modules[i])){
                let position;
                switch(modules[i]){
                    case 'c-accordion':
                        if(!($(hash).parents('.c-accordion').find('.c-accordion__head').hasClass('js-accordion-active'))){
                            const target = $(hash);
                            toggleAcc(target);
                            position = $(hash).offset().top;
                            setTimeout(()=>{
                                $(window).scrollTop(position);
                            },400);
                        }
                    break;
                    case 'c-tabs':
                        if($(hash).hasClass('c-tab')){
                            const index = $(hash).index();
                            const target = $(hash);
                            switchTab(target,index);
                        }else{
                            const index = $(hash).parents('.c-tab__body').index();
                            const target = $(hash);
                            switchTab(target,index);
                        }
                        position = $(hash).offset().top;
                        $(window).scrollTop(position);
                    break;
                    default:
                }
            }
        }
    }
}

handleHash();

$(window).on('hashchange', () => {
    handleHash();
});

});