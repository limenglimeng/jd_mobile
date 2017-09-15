/**
 * Created by Administrator on 2017/7/24.
 */
window.onload= function () {
    //scroll();
    var nav=document.querySelector(".nav");
    var bodyHeight=document.body.offsetHeight;
    var navMinDistance=bodyHeight-nav.offsetHeight-nav.offsetTop;
    scrollVertical(nav,50,navMinDistance);
    //fox_tap1(nav);
    fox_tap(nav,navMinDistance,0);

    var mainRight=document.querySelector(".content");
    var contentMinDistance=bodyHeight-mainRight.offsetTop-mainRight.offsetHeight;
    scrollVertical(mainRight,50,contentMinDistance);


}

function scroll(){
    var nav=document.querySelector(".nav");
    var navHeight=nav.offsetHeight;
    var header=document.querySelector(".wph_header");
    var headerHeight=header.offsetHeight;
    var maxHeight=0;
    var minHeight=bodyHeight-navHeight-headerHeight;
    var startY=0;
    var moveY=0;
    var distance=0;
    var extral=50;
    nav.addEventListener('touchstart', function (event) {
        startY= event.touches[0].clientY;
    });
    nav.addEventListener('touchmove', function (event) {
        moveY= event.touches[0].clientY-startY;
        if((distance+moveY)>(maxHeight+extral)){
            moveY=0;
            distance=maxHeight+extral;
        }else if((distance+moveY)<(minHeight-extral)){
            moveY=0;
            distance=minHeight-extral;
        }
        nav.style.transiton="";
        nav.style.transform='translateY('+(moveY+distance)+'px)';

    });
    nav.addEventListener('touchend', function () {
        distance+=moveY;
        if(distance>maxHeight){
           distance=maxHeight;
        }else if(distance<minHeight){
            distance=minHeight;
        }
        nav.style.transform='translateY('+distance+'px)';
        nav.style.transiton="all .5s";
    });
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

function fox_tap1(move){
    var liArr=move.children;
    var liHeight=liArr[0].offsetHeight;
    var bodyHeight=document.body.offsetHeight;
    var startTransition= function () {
        move.style.transition="all .5s";
    };
    var setTransform= function (distance) {
        move.style.transform="translateY("+distance+"px)";
    };
    for(var i=0;i<liArr.length;i++){
        liArr[i].dataset['index']=i;
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
            }
            a.parentNode.classList.add('current');
            var currentIndex= a.parentNode.dataset['index'];
            var moveDistance=-liHeight*currentIndex;
            var maxHeight=0;
            var minHeight=bodyHeight-move.offsetHeight-move.offsetTop;
            if(moveDistance>maxHeight){
                moveDistance=maxHeight;
            }else if(moveDistance<minHeight){
                moveDistance=minHeight;
            }
            startTransition();
            setTransform(moveDistance);
        }
    });
}

function fox_tap(move,minDistance,maxDistance){
    var liArr=move.children;
    var liHeight=liArr[0].offsetHeight;
    var startTransition= function () {
        move.style.transition="all .5s";
    };
    var setTransform= function (distance) {
        move.style.transform="translateY("+distance+"px)";
    };
    for(var i=0;i<liArr.length;i++){
        liArr[i].dataset['index']=i;
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
            }
            a.parentNode.classList.add('current');
            var currentIndex= a.parentNode.dataset['index'];
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




