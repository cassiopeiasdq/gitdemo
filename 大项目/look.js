define(["jquery"], function($){
    function look(){
    $(function(){
        $(".sport").mouseenter(function(){
            $(".nav #in_sport").css('display','block')
        })
        $(".sport").mouseleave(function(){
            $(".nav #in_sport").css('display','none')
        })
    })
    }   
    return {
        look: look
    }
})
