(function() {

  var $slideBtns = $('#slide-show .slide-ctrl .circle')
  var $slides = $('#slide-show .slide')        
  var len = $slideBtns.length
  var iNow = 0
  var adTimer

  /*
  $slides.eq(0).show()
  
  $('#slide-show').hover(function() {
      clearInterval(adTimer)
    }, function() {
      adTimer = setInterval(function() {
        $slideBtns.eq(iNow).addClass('cur').siblings().removeClass('cur')
        $slides.eq(iNow).fadeIn(500).siblings().fadeOut(500)
        iNow++
        if (iNow === len) {       
          iNow = 0
        }
      }, 3000)
    }
  ).trigger('mouseleave')*/
  
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

  $slideBtns.on('click',function() {  
      $(this).addClass('cur').siblings().removeClass('cur') 
      var index = $(this).index() 
      $slides.eq(index).fadeIn(500).siblings().fadeOut(500)
      iNow=index
  })
             


  var width = $('#book .container').width()
  var i=0
  $('#book .pre').on('click', function() {
      i--
      if(i === -1) i=2               
      $('#book ul').css('margin-left', (-i * width) + 'px')
  })
  $('#book .next').on('click', function() {
      i++
      if(i === 3) i=0             
      $('#book ul').css('margin-left', (-i * width) + 'px')
  })


  var $mobileSlides = $('#mobile-product .slide')
  $mobileSlides.eq(0).show()
  $('#mobile-product .slide-ctrl .ctrl-item').on('click',function() {  
      $(this).addClass('cur').siblings().removeClass('cur') 
      $mobileSlides.eq( $(this).index() ).fadeIn(300).siblings().fadeOut(300)
  })

  var $brandSlides = $('#brand .slides li')   
  $('#brand .links a').hover(function() {
      var curIndex = $(this).index()
      $(this).addClass('cur').siblings().removeClass('cur')
      $brandSlides.eq( curIndex ).addClass('cur').siblings().removeClass('cur')
  },function(){})


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

  $(window).scroll( function(){
    var curScollTop = $(window).scrollTop() + headerHeight
    if ( curScollTop > 100) {
       $header.addClass('header-change')
    } else {
       $header.removeClass('header-change')
    }
    for (var i=0; i<arr.length; i++) {
      if ( Math.abs(curScollTop - arr[i]) < 50 ) {
        $headerLinks.eq(i).addClass('cur').siblings().removeClass('cur')
        return
      }
    }
  }).trigger('scroll')

  $headerLinks.click(function() {
    var val = arr[ $(this).index() ] - headerHeight    
    $('html, body').animate( {    
      scrollTop: val + 'px'    
    }, {
      duration: 500,
      easing: 'swing'
    })    
    return false    
  })    

})()