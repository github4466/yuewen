(function() {

  var $slideBtns = $('#slide-show .slide-ctrl .circle')
  var $slides = $('#slide-show .slide')        
  var len = $slideBtns.length
  var iNow = 0
  var adTimer
  $slides.eq(0).show()
  iNow++
  adTimer = setInterval(function() {
    $slideBtns.eq(iNow).addClass('cur').siblings().removeClass('cur')
    $slides.eq(iNow).fadeIn(500).siblings().fadeOut(500)
    iNow++
    if (iNow === len) {       
      iNow = 0
    }
  }, 6000)
  $('#slide-show').on('click', '.circle', function() {  
      $(this).addClass('cur').siblings().removeClass('cur') 
      var index = $(this).index() 
      $slides.eq(index).fadeIn(500).siblings().fadeOut(500)
      iNow=index
  })      


  var width = $('#book .container').width()
  var i = 0
  var iMax = Math.ceil($('#book ul').width() / width);
  $('#book .pre').on('click', function() {
      i--
      if(i === -1) i=2               
      $('#book ul').css('margin-left', (-i * width) + 'px')
  })
  $('#book .next').on('click', function() {
      i++
      if(i === iMax) i=0             
      $('#book ul').css('margin-left', (-i * width) + 'px')
  })


  var $mobileSlides = $('#mobile-product .slide')
  $mobileSlides.eq(0).show()
  $('#mobile-product').on('click','.slide-ctrl .ctrl-item', function(event) {  
    var $target = $(event.target)
    $target.addClass('cur').siblings().removeClass('cur') 
    $mobileSlides.eq( $target.index() ).fadeIn(300).siblings().fadeOut(300)
  })  

  var $brandSlides = $('#brand .slides li')   
  $('#brand').on('mouseover mouseout', '.links a, .links a i', function(event){
    if (event.type == 'mouseover') {
      var $target = $(event.target)
      if ($target.is('i')) { $target = $target.parent() }
      var curIndex = $target.index()
      $target.addClass('cur').siblings().removeClass('cur')
      $brandSlides.eq( curIndex ).addClass('cur').siblings().removeClass('cur')
    } else if (event.type == 'mouseout') {

    }    
  })


  function popupBoxById(boxId) { 
    var $box = $('#' + boxId) 
    var windowWidth = $(window).width() 
    var windowHeight = $(window).height() 
    var boxHeight = $box.height() 
    var boxWidth = $box.width() 
     
     // 添加并显示遮罩层 
    $('<div id="pop-box-mask"></div>').appendTo('body').fadeIn(200) 
    $box.find('.icon-close').click(function() { 
      hideBoxById(boxId) 
    })
     
    // 显示弹出的DIV 
    $box.animate({ opacity: 'show' }, 300) 
  }  
  function hideBoxById(boxId) {
    $('#pop-box-mask').remove() 
    $('#' + boxId).animate({ opacity: 'hide' }, 100) 
  } 
  $('#news .article-more button').click( function(){
    $.ajax({
      url: './html/articles.html', 
      type: 'GET', 
      dataType: 'html',
      success: function(data){
        var result = /<ul class="container">[\s\S]*<\/ul>/.exec(data)
        $('#news .article-more .text').html(result)
        popupBoxById('article-box')
      }
    })
  })

  var arr = []
  arr[0] = $('#book').offset().top
  arr[1] = $('#mobile-product').offset().top
  arr[2] = $('#brand').offset().top
  arr[3] = $('#news').offset().top
  arr[4] = $('#contact').offset().top
  var $header = $('header')
  var $headerLinks = $('header .links a')
  var headerHeight = $('header').height()
  var $curLinkValueSpan = $('header .container .cur-link-value span')
  var scrollTimer = null

  function scrollProcess() {
    var curScollTop = $(window).scrollTop() + headerHeight
    if ( curScollTop > 100) {
       $header.addClass('header-change')
    } else {
       $header.removeClass('header-change')
    }
    for (var i=0; i<arr.length; i++) {
      if ( Math.abs(curScollTop - arr[i]) < 400 ) {
        $headerLinks.eq(i).addClass('cur').siblings().removeClass('cur')
        $curLinkValueSpan.html($headerLinks.eq(i).html())
        return
      }
    }
  }

  $(window).scroll( function(){
    if(scrollTimer){
      clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(function(){
      scrollProcess()
    }, 50)
  }).trigger('scroll')

  $header.on('click', '.cur-link-value', function(){
    $('header .links').toggleClass('show')
  })
  $header.on('click', '.links a', function(){
    var val = arr[ $(this).index() ] - headerHeight    
    $('html, body').animate( {    
      scrollTop: val + 'px'    
    }, {
      duration: 500,
      easing: 'swing'
    })    
    $('header .links').toggleClass('show')
    $curLinkValueSpan.html($(this).html())
    return false
  })  

})()