(function(){
  var $slides = $('#slide-show .slides .slide'),         
     	len = $slides.length,	
     	iNow = 0,  
     	adTimer

  adTimer = setInterval(function() {
    $slides.eq(iNow).fadeIn(500).siblings().fadeOut(500)
    iNow++  
    if (iNow === len) {         
      iNow = 0
    }   
  }, 8000)	

  var $searchContainer = $('#slide-show .container .search-container')
  $searchContainer.find('.option').click(function(){
  	$searchContainer.find('.cur-option-value').html( $(this).html() )
  })
  $searchContainer.find('.search-action').click(function(){
  	var searchVal = $searchContainer.find('.search-input').val().trim(),
  	    searchType = $searchContainer.find('.cur-option-value').html(),
        url
    if( searchType === '社会招聘' ){
      window.location.href = 'social.html?key=' + searchVal     
    }
    else if( searchType === '校园招聘' ){
      window.location.href = 'school.html?key=' + searchVal  
    }
  })

  $('header .container .nav').click(function(){
    $('header .container .links').toggleClass('show')
  })

})()