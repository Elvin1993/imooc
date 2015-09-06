! function() {
    var box = $("#box"),
        span = "span",
        e = {
            lvT: _lang[_config.lang].lv_txt,
            render: function(type, e, f) {
                var g = _config[type].lvMap[f] || _.last(_config[type].lvMap);
                this.d = 15 * Math.max(9 - g, 1);
                this.d = f > 20 ? 10 : this.d;
                this.d = f > 40 ? 8 : this.d;
                this.d = f > 50 ? 5 : this.d;
                var h = Math.floor(Math.random() * f);
  console.log(h,f);
                    // i = this.getColor(255 - this.d),
                    // j = this.getLvColor(i[0]);

                // box.find(span).css("background-color", i[1]);
                box.find(span).css({"background":"url('img/black1.png')",  "background-size": "cover"});
                box.find(span).eq(h).css({"background":"url('img/black2.png')",  "background-size": "cover"}).data("type", "a");
            },
            getColor: function(a) {
                var b = [
                        Math.round(Math.random() * a),
                        Math.round(Math.random() * a),
                        Math.round(Math.random() * a)
                    ],
                    c = "rgb(" + b.join(",") + ")";
                return [b, c];
            },
            getLvColor: function(a) {
                var b = this.d,
                    c = _.map(a, function(a) {
                        return a + b + 10;
                    }),
                    d = "rgb(" + c.join(",") + ")";
                return [c, d];
            },
            getGameOverText: function(lv) {
                var b = 20 > lv ? 0 : Math.ceil((lv - 20) / 10);
                var c = this.lvT[b] || _.last(this.lvT);
                var d = c + "lv" + lv;
                return {
                    txt: d
                };
            }

        };

    API.color = e;
}();
