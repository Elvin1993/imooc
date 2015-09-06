! function() {
    var b = {
            index: $("#index"),
            room: $('#room'),
            loading: $('#loading'),
            play: $('.btn-play')
        },
        ua = window.navigator.userAgent.toLowerCase(),
        isAndroid = /android/i.test(ua),
        isIOS = /iphone|ipad|ipod/i.test(ua),
        app = {
            init: function() {
                //初始化 游戏开始事件
                this.initEvent();
                this.loading();
            },
            loading: function() {
                app.render();
            },
            //隐藏加载界面 ， 显示游戏首页
            render: function() {
                setTimeout(function() {
                    b.loading.hide(), b.index.show();
                }, 200);
            },
            initEvent: function() {
                //判断是否是移动设备
                var clickEvent = "ontouchstart" in document.documentElement ? "touchstart" : 'click',
                    myApp = this;
                //点击开始按钮之后初始化游戏
                b.play.on(clickEvent, function() {
                    var type = $(this).data("type") || "color1";
                    b.index.hide();
                    Game.init(type, b.room, myApp);
                });
            }
        };
    app.init();
    window.API = {};

}();