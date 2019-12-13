define(["jquery"], function($){
    function startMove(node, cssObj, complete){
                    clearInterval(node.timer);
                    node.timer = setInterval(function(){
                        var isEnd = true; //假设动画都结束了
                        for(var attr in cssObj){
                            var iTarget = cssObj[attr];

                            //获取当前值
                            var iCur = null;
                            if(attr == "opacity"){
                                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
                            }else{
                                iCur = parseInt(getStyle(node, attr))
                            }

                            var speed = (iTarget - iCur) / 8;
                            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        
                                //node.style["width"]
                            if(attr == "opacity"){
                                iCur += speed;
                                node.style.opacity = iCur / 100;
                                node.style.filter = "alpha(opacity=" + iCur + ")";
                            }else{
                                node.style[attr] = iCur + speed + 'px';
                            }

                            if(iTarget != iCur){
                                isEnd = false;
                            }

                        }
                        if(isEnd){
                            clearInterval(node.timer);
                            if(complete){
                                complete.call(node);
                            }
                        }
                    }, 30);
                }

                //获取当前有效样式
                function getStyle(element, attr){
                    return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
                }

                /* 
                    多物体多样式，同时发生动画
                    宽、高、透明度同时发生变化
                */
                window.onload = function(){
                    var oDiv = document.getElementById("div1");
                    oDiv.onmouseover = function(){
                        startMove(this, {
                            width: 300,
                            height: 102,
                            opacity: 30
                        }, function(){
                            this.innerHTML = "移入";
                        })
                    }

                    oDiv.onmouseout = function(){
                        startMove(this, {
                            width: 100,
                            height: 100,
                            opacity: 100
                        }, function(){
                            this.innerHTML = "移出";
                        })
                    }
                }
    function move(){
        $(function(){
            var aBtns = $("#play").find("ol").find("li");
            var aImgs = $("#play").find("ul").find("li");
            var oUl = $("#play").find("ul");
            var iNow = 0; //代表显示第几张图片
            var timer = null; 

            aBtns.click(function(){
                iNow = $(this).index();
                tab();
                return false;
            })


            //自动轮播
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);

            
            //切换到对应的图片和对应的按钮
            function tab(){
                aBtns.attr("class", '').eq(iNow).attr("class", 'active');
                // //判断
                if(iNow == aBtns.size()){
                    aBtns.eq(0).attr("class", 'active');
                }

                oUl.animate({
                    top: -iNow * 350
                }, 500, function(){

                    //当最后一张图片动画结束的时候，让他瞬间切回第一张图片
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        oUl.css("top", 0);
                    }
                })
                document.title = iNow;
            }


            $("#play").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                 //自动轮播
                timer = setInterval(function(){
                    iNow++;
                    tab();
                }, 2000);
            })
        })
    }
    return {
        move: move
    }
})