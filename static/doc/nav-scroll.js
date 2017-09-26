/**
 * author: Sheng JIANG
 * date: 2017-09-26
 */

$(function () {

  if ($('.js_fixed').length > 0) {

    //主导航
    nova.navScroll({
      fixedObj: $('.js_fixed'),
      navList: $('.js_fixed li'),
      activeIndex: -1,
      callback: function (index) {
        // console.log(index);
        $('.js_fixed').show()
      },
      endCallback: function () {
        // console.log('已经滚完最后一个了！');
        $('.js_fixed').hide()
      },
      hideError: true
    })
  }

  if ($('.js_fixed2').length > 0) {

    //注意事项导航
    nova.navScroll({
      fixedObj: $('.js_fixed2'),
      navList: $('.js_fixed2 li'),
      activeIndex: -1,
      deviationNav: 40,
      deviationScroll: 100,
      callback: function (index) {
        // console.log(index);
        $('.js_fixed2').show()
      },
      endCallback: function () {
        // console.log('已经滚完最后一个了！');
        $('.js_fixed2').hide()
      },
      hideError: true
    })
  }

  if ($('.js_fixed3').length > 0) {

    //左侧导航
    nova.navScroll({
      fixedObj: $('.js_fixed3'),
      navList: $('.js_fixed3 li'),
      activeIndex: 0,
      navStyle: false,
      callback: function (index) {
        $('.js_fixed3').show()
      },
      endCallback: function () {
        $('.js_fixed3').hide()
      },
      hideError: true
    })
  }

  $(document).on('click', '.JS_nav_scroll_add_content', function (e) {
    $(this).before('<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi expedita id in, nobis non nulla optio pariatur placeat quidem. Ad eius fuga qui quos repellendus sed voluptate. Accusantium ad architecto assumenda beatae debitis dolores iure laboriosam nisi quam quos repudiandae rerum similique temporibus voluptate, voluptatibus. Ipsam labore magnam similique.</p>')
  })

})
