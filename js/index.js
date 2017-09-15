window.onload=function () {
    h_t_change();
    timeDown(2);
    bannerPlay();
};
function h_t_change(){
    var head=$(".jd_head")[0];
    var bannerHeight=$(".jd_classify")[0].offsetTop;
    var bodyHeight=document.body.offsetHeight;
    var foot=$(".jd_foot")[0];
    var footHeight=foot.offsetTop+foot.offsetHeight+20;
    window.onscroll=function () {
        var scroll=this.document.body.scrollTop;
        if(scroll>bannerHeight){
            head.style.backgroundColor='rgba(201, 21, 35,1)';
        }else{
            head.style.backgroundColor='rgba(201, 21, 35,0.4)';
        }
        if((bodyHeight-scroll)<footHeight){
            foot.style.position="relative";
        }else{
            foot.style.position="fixed";
        }
    }
}
function bannerPlay() {
   var bannerImage=$(".banner_image")[0];
   var imageWidth=document.body.offsetWidth;
   var bannerIndex=$(".banner_index")[0];
   var IndexLiArr=bannerIndex.children;
    var index=1;
   var startTransition=function () {
        bannerImage.style.transition="all 0.2s";
   };
    var endTransition=function () {
        bannerImage.style.transition="none";
    };
    var setTransform=function (distance) {
        bannerImage.style.transform='translateX('+(distance)+'px)';
    };
    setTransform(-imageWidth);
    var timer=setInterval(function () {
        index++;
        setTransform(-imageWidth*index);
        startTransition();
    },1000);
    //每次过度结束后都会调用此事件
    bannerImage.addEventListener("webkitTransitionEnd",function () {
        if(index>8){
            index=1;
            endTransition();
            setTransform(-imageWidth*index);
        }
        if(index<1){
            index=8;
            endTransition();
            setTransform(-imageWidth*index);
        }
        for (var i = 0; i < IndexLiArr.length; i++) {
            IndexLiArr[i].className="";
        }
        IndexLiArr[index-1].className="current";
    });
    //触摸事件
    var startX=0;
    var minDistance=imageWidth/3;
    var moveX=0;
    bannerImage.addEventListener("touchstart",function (event) {
        clearInterval(timer);
        endTransition();
        startX=event.touches[0].clientX;
    });
    bannerImage.addEventListener("touchmove",function (event) {
       // setTransform(moveX-index*imageWidth);
        // 计算移动的值
        moveX = event.touches[0].clientX - startX;

        // 移动ul
        // 默认的移动值是 index*-1*width
        bannerImage.style.transform = 'translateX('+(moveX+index*-1*imageWidth)+'px)';
    });
    bannerImage.addEventListener("touchend",function () {
        if(Math.abs(moveX)>minDistance){
            if(moveX>0){
                index--;
            }else{
                index++;
            }
            setTransform(-imageWidth*index);
            startTransition();
        }else{
            setTransform(-imageWidth*index);
            startTransition();
        }
        timer=setInterval(function () {
            index++;
            setTransform(-imageWidth*index);
            startTransition();
        },1000);
    });

}
function timeDown(totalHour){
    var liArr=$(".time")[0].children;
    var totalSec=totalHour*3600;
    timeTrans(totalSec,liArr);
    var timer=setInterval(function () {
        if(totalSec<=0){
            clearInterval(timer);
            return;
        }
        timeTrans(totalSec,liArr);
        totalSec--;
    },1000);
}
function timeTrans(totalSec,liArr){
    var hour=Math.floor(totalSec/3600);
    var minute=totalSec/60%60;
    var second=totalSec%60;
    liArr[0].innerHTML=hour<10?"0"+hour.toString():hour;
    liArr[2].innerHTML=minute<10?"0"+minute.toString():minute;
    liArr[4].innerHTML=second<10?"0"+second.toString():second;
    
}

