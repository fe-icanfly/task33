//屏幕适配
define(function() {
    var supportsOrientationChange = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    var timer;

    function setRem() {
        var clientWidth = document.documentElement.clientWidth;
        var nowPX = clientWidth / 320 * 20;
        document.documentElement.style.fontSize = nowPX + 'px';
    }

    setRem();

    window.addEventListener(supportsOrientationChange, function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            setRem();
        }, 300);
    }, false);

    var viewport = document.querySelector("meta[name=viewport]");
    var winWidths = 980;
    if (winWidths == 980) {
        winWidths = 360;
    }
    //alert(winWidths)
    viewport.setAttribute('content', 'width=' + winWidths +
        ',initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
})
