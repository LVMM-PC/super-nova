/**
 * Created by twili on 16/07/06.
 */

$(function () {

    $(window).on("load", function () {

        var $box = $("#box");
        var $chart = $("#chart");
        var $hover = $("#hover");
        var $price = $("#price");
        var $date = $("#date");
        //console.log($chart)
        var canvas = document.getElementById('chart');
        var ctx = canvas.getContext("2d");

        var width = $chart.width();
        var height = $chart.height();
        var maxPrice = 2000;

        function drawPoint(p) {
            var x = p.x;
            var y = p.y;
            ctx.fillStyle = "rgb(254,103,0)";
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawLine(p, q) {
            var x1 = p.x;
            var y1 = p.y;
            var x2 = q.x;
            var y2 = q.y;
            ctx.strokeStyle = "rgb(254,103,0)";
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        $.ajax({
            url: "json/time-price.json"
        }).done(function (data) {
            var size = data.length;

            var points = [];
            for (var i = 0; i < size; i++) {

                var day = data[i];
                var date = day.date;
                var price = day.price;

                var point = {
                    x: (width / size) * i  +0.5* (width / size),
                    y: height + (-price / maxPrice * height),
                    date: date,
                    price: price
                };
                points.push(point);

            }

            ctx.fillStyle = "rgba(254,103,0,0.2)";
            ctx.beginPath();
            ctx.moveTo(0, height);
            for (var k = 0; k < size; k++) {
                var o = points[k];
                ctx.lineTo(o.x, o.y);
            }
            ctx.lineTo(width, height);
            ctx.fill();

            for (var j = 0; j < size; j++) {
                var p = points[j];
                if (j + 1 < size) {
                    var q = points[j + 1];
                    drawLine(p, q);
                }
                drawPoint(p);

            }

            var show = null;
            $chart.on("mousemove", function (e) {
                var x = e.offsetX;
                var index = ~~(x / (width / size))

                var z = points[index];
                if (z) {
                    $hover.show();
                    if (show != z) {
                        show = z;
                        $price.html(z.price);
                        $date.html(z.date);
                        $hover.css({
                            left: z.x,
                            top: z.y
                        })
                    }

                } else {
                    $hover.hide();
                }
            });
            $box.on("mouseleave", function () {
                $hover.hide();

            })

        }).fail(function (error) {
            console.log(error);
        })
    })

});
