window.onload= function () {
    var nav=document.querySelector(".nav");
    var bodyHeight=document.body.offsetHeight;
    var header=document.querySelector(".jd_head");
    var navMinDistance=bodyHeight-nav.offsetHeight-header.offsetHeight;
    scrollVertical(nav,50,navMinDistance);
    fox_tap(nav,navMinDistance,0);
    var mainRight=document.querySelector(".main_detail");
    var contentMinDistance=bodyHeight-header.offsetHeight-mainRight.offsetHeight;
    scrollVertical(mainRight,50,contentMinDistance);
}
function scrollVertical(move,delayDistance,minDistance){
    var maxDistance=0;
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var startTransition= function () {
        move.style.transition="all .5s";
    };
    var endTransition= function () {
        move.style.transition="";
    };
    var setTransform= function (distance) {
        move.style.transform="translateY("+distance+"px)";
    };
    move.addEventListener('touchstart',function(event){
        startY=event.touches[0].clientY;
    });
    move.addEventListener('touchmove',function(event){
        moveY=event.touches[0].clientY-startY;
        if((distanceY+moveY)>(maxDistance+delayDistance)){
            moveY=0;
            distanceY=maxDistance+delayDistance;
        }else if((distanceY+moveY)<(minDistance-delayDistance)){
            moveY=0;
            distanceY=minDistance-delayDistance;
        }
        endTransition();
        setTransform(moveY+distanceY);
    });
    move.addEventListener('touchend',function(event){
        distanceY+=moveY;
        if(distanceY>maxDistance){
            distanceY=maxDistance;
        }else if(distanceY<minDistance){
            distanceY=minDistance;
        }
        startTransition();
        setTransform(distanceY);
    });
}


function fox_tap(move,minDistance,maxDistance){
    var liArr=move.children;
    var detail_content=document.querySelectorAll(".detail_content");
    var liHeight=liArr[0].offsetHeight;
    var startTransition= function () {
        move.style.transition="all .5s";
    };
    var setTransform= function (distance) {
        move.style.transform="translateY("+distance+"px)";
    };
    for(var i=0;i<liArr.length;i++){
        liArr[i].dataset['index']=i;
        detail_content[i].dataset['index']=i;
    }
    var startTime=0;
    var isMove=false;
    var maxTime=250;
    move.addEventListener('touchstart',function(e){
        startTime=Date.now();
        isMove=false;
    });
    move.addEventListener('touchmove',function(event){
        isMove=true;
    });
    move.addEventListener('touchend',function(event){
        if(isMove==true){
            return;
        }
        if((Date.now()-startTime)>maxTime){
            return;
        }else{
            var a= event.target;
            for(var i=0;i<liArr.length;i++){
                liArr[i].className="";
                detail_content[i].className="detail_content";
            }
            a.parentNode.classList.add('current');
            var currentIndex= a.parentNode.dataset['index'];
            detail_content[currentIndex].classList.add('current');
            var moveDistance=-liHeight*currentIndex;
            if(moveDistance>maxDistance){
                moveDistance=maxDistance;
            }else if(moveDistance<minDistance){
                moveDistance=minDistance;
            }
            startTransition();
            setTransform(moveDistance);
        }
    });
}


