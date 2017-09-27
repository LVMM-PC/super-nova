'use strict'

$(function () {

  var $document = $(document)
  var $window = $(window)
  var SCROLL_DELAY = 16
  var HEADER_MARGIN_TOP = 0

  var navigationSingle = {
    init: function () {

      var $headers = $('#everything>:header,#everything>section>:header,#everything>header>:header')
      this.$headers = $headers

      this.renderNav()
      this.highlight()
      this.writeHeaderTop()
      this.bindEvent()
      this.scrollToHash()
    },
    scrollToHash: function () {
      var hash = window.location.hash
      if (!hash) {
        return
      }
      var $location = $(hash)
      if ($location.length === 0) {
        return
      }
      setTimeout(function () {
        var top = $location.offset().top - HEADER_MARGIN_TOP
        $('html,body').stop().scrollTop(top)
      }, 0)
    },
    bindEvent: function () {
      var $headers = this.$headers
      var $navigation = this.$navigation
      var $sidebar = this.$sidebar
      var self = this
      var timer = null

      $document.on('click', '.navigation>.close', function () {
        $('.navigation').remove()
      })

      $document.on('click', '.links>a', function () {
        var $this = $(this)
        var index = $this.index()
        var $header = $headers.eq(index)
        var top = $header.offset().top - HEADER_MARGIN_TOP
        $('html,body').stop().animate({
          'scrollTop': top
        }, 200, function () {
          setTimeout(function () {
            $this.addClass('active').siblings().removeClass('active')
          }, 33)
        })
      })

      $document.on('mouseenter', '.links>a', function () {
        var $this = $(this)
        var index = $this.index()
        $headers.removeClass('hover')
        var $header = $headers.eq(index)
        $header.addClass('hover')
      })

      $document.on('mouseleave', '.links>a', function () {
        $headers.removeClass('hover')
      })

      $window.on('resize', function () {
        var winHeight = $window.height()
        $navigation.show().css('max-height', winHeight)
        $sidebar.css('max-height', winHeight)
      })

      $window.on('scroll', function () {
        timer && clearTimeout(timer)

        timer = setTimeout(function () {
          self.pageScroll()
        }, SCROLL_DELAY)
      })

      // $document.on('click', '.i-header a', function (e) {
      //   e.preventDefault()
      //   var $this = $(this)
      //   var hash = $this.attr('href')
      //   console.log(hash)
      //
      //   console.log(window.location)
      //   history.replaceState(null, document.title, window.location.origin + window.location.pathname + hash)
      //
      //   var top = $this.parent().offset().top - HEADER_MARGIN_TOP
      //
      //   $('html,body').stop().animate({
      //     'scrollTop': top
      //   }, 200)
      // })

      $('.super-toolbar .top').on('click', function (e) {
        $('html,body').stop().animate({
          'scrollTop': 0
        }, 200)
      })
    },
    writeHeaderTop: function () {
      var $headers = this.$headers
      var size = $headers.length

      var headerTopList = []

      for (var i = 0; i < size; i++) {
        var $header = $headers.eq(i)
        var top = $header.offset().top - HEADER_MARGIN_TOP
        headerTopList.push({
          $header: $header,
          top: top
        })
      }

      this.headerTopList = headerTopList
    },
    pageScroll: function () {
      this.writeHeaderTop()

      var winTop = $window.scrollTop()
      var headerTopList = this.headerTopList
      var size = headerTopList.length

      var lo = 0
      var hi = size

      var index = 0
      while (lo < hi) {
        index++
        if (index > size) {
          throw new Error('溢出错误，可能由于错误的文档结构导致')
        }

        var mi = (lo + hi) >> 1
        if (winTop < headerTopList[mi].top) {
          hi = mi
        } else {
          lo = mi + 1
        }
      }
      --lo

      var $navigationLinkList = $('.navigation .links > a')
      if (lo >= 0) {
        $navigationLinkList.removeClass('active')
        var $active = $navigationLinkList.eq(lo)
        $active.addClass('active')
        var navigationTop = $active.position().top - HEADER_MARGIN_TOP
        var st = this.$navigation.scrollTop()
        var newTop = navigationTop + st - $window.height() / 2
        this.$navigation.scrollTop(newTop)
      } else {
        $navigationLinkList.removeClass('active')
        this.$navigation.scrollTop(0)
      }
    },
    renderNav: function () {
      var $headers = this.$headers

      var $navigation = $('<div class="navigation"><span class="close">x</span><div class="links"></div></div>')
      var $links = $navigation.find('.links')
      var $sidebar = $('.super-sidebar .list')

      this.$navigation = $navigation
      this.$sidebar = $sidebar

      $('#navigation').append($navigation)
      var size = $headers.length
      var $tempA
      for (var i = 0; i < size; i++) {
        var $header = $headers.eq(i)

        $header.data('header-index', i)
        var tagName = $header.get(0).tagName.toLocaleLowerCase()
        var text = $header.text()
        text = text.replace('¶', '')
        $tempA = $('<a title="' + text + '" class="' + tagName + '">' + text + '</a>')
        $links.append($tempA)
      }

      if (size) {
        var winHeight = $window.height()
        $sidebar.css('max-height', winHeight)
        $navigation.show().css('max-height', winHeight)
      }
    },
    highlight: function () {

      try {
        $('pre > code').each(function (i, block) {
          hljs.highlightBlock(block)
        })
      } catch (e) {
        console.log(e)
      }

    }
  }

  navigationSingle.init()

})
