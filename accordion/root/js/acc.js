(function($){
    'use strict';
    const accordion = {
        default: function(options){
            const settings = $.extend(true,{
                toggleSpeed: 'normal',
                toggleAcc: false,
            }, options);
            
            //各要素を定数に代入
            const acc = this;
            const head = this.find('.acc-head');
            const collapse = this.find('.acc-collapse');

            //アコーディオンの開閉処理
            const toggleCollapse = speed => collapse.stop(true,false).slideToggle(speed);
            //クラス付け外し
            const changeClass = (target, obj) => target.toggleClass(obj);

            //開閉の初期値
            if(settings.toggleAcc){
                //trueなら初期値OPEN
                collapse.css({
                    'display': 'block',
                });
                changeClass(acc, 'js-acc-active');
            }

            //クリック時に開く処理
            return this.each(function(){
                head.on('click', function(){
                    toggleCollapse(settings.toggleSpeed);
                    changeClass(acc, 'js-acc-active');
                });
            });
        },
    };

    $.fn.myAcc = function(){
        return accordion.default.apply(this, arguments);
    };
}(jQuery));