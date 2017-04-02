(function(){
	function popupBoxById(boxId) { 
    var $box = $('#' + boxId) 
    var windowWidth = $(window).width() 
    var windowHeight = $(window).height() 
    var boxHeight = $box.height() 
    var boxWidth = $box.width() 
	     
     // 添加并显示遮罩层 
    $('<div id="pop-box-mask"></div>').appendTo('body').fadeIn(200) 
    $box.find('.close-btn').click(function() { 
      hideBoxById(boxId) 
			var video = $('#intro-video .pop-box video')[0]   
			video.pause()	            
    })
	     
    // 显示弹出的DIV 
    $box.animate({  opacity: 'show' }, 200) 
	} 
	function hideBoxById(boxId) {
	    $('#pop-box-mask').remove() 
	    $('#' + boxId).animate({ opacity: 'hide' }, 100) 
	} 	
	$('#intro-video .container .play-btn').click(function(){
		popupBoxById('intro-video-pop-box')
		var video = $('#intro-video .pop-box video')[0]   
		video.currentTime = 0  
		video.play()
	})

  $('header .container .nav').click(function(){
    $('header .container .links').toggleClass('show')
  })
	
})()