/**
 * Created by twili on 16/11/03.
 */

$(function () {

    var ui = nova.ui();
    ui.render();

    $("#render").on("click", function () {
        ui.render();
    });

    $("#unrender").on("click", function () {
        ui.unrender();
    });

    $("#submit").on("click", function () {
        var serialized = $("form").serialize();
        console.log(serialized);
    });

    $(".JS_number_box_add").on("click", function () {
        var $box = $('<div class="nova-number-box">' +
            '<div class="nova-number-box-subtract"><i></i></div>' +
            '<input value="0" type="text" data-max="9" data-min="0">' +
            '<div class="nova-number-box-add"><i></i></div>' +
            '</div>');
        $(".nova-number-boxes").append($box);
        ui.render();
    });

    var $document = $(document);
    $document.on("change", ".number-box-group input", function () {

        var $this = $(this);
        var val = $this.val();
        console.log(val);
        var $group = $this.parents(".number-box-group");
        var $em = $group.find("em");
        $em.html("￥" + 110 * val + "起");
    });

});
