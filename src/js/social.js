(function(){
	var $tabContent = $('#recruit-info .col-2 .tab-content')
	$('#recruit-info .col-1 .tab').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
		$tabContent.eq( $(this).index() ).addClass('cur').siblings().removeClass('cur')
	})
	$tabContent.find('.item .title').click(function(){
		$(this).parent().toggleClass('cur').siblings().removeClass('cur')
	})

//	var searchKey = $('#search-key-from-join').html().trim()	
	function getQuery(parameName) 
	{
    var query = (location.search.length > 0 ? location.search.substring(1) : null)
    if( query !== null)
    {
      var args = {}
      var pairs = query.split('&')
      for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=')
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos)
        var value = pairs[i].substring(pos+1)
        value = decodeURIComponent(value)
        args[argname] = value
      }
      return args[parameName]
    }
    return null
	}	
	var searchKey = getQuery('key')
	if( searchKey !== null && searchKey !== ''){
		var regExp = new RegExp(searchKey),
		    replaceStr = '<span class="highlight">'+searchKey+'</span>',
		    count = [0,0,0,0,0],
		    $tabs = $('#recruit-info .col-1 .tab') 
		for(var i=0, ilen = $tabContent.length; i<ilen; i++){
			var $jobNames = $tabContent.eq(i).find('.item .title h3')
			for(var j=0, jlen = $jobNames.length;  j<jlen; j++){
        var newHtml = $jobNames.eq(j).html().replace(regExp, function(){
        	count[i]++
        	return replaceStr
        })
        $jobNames.eq(j).html(newHtml)		
			}
		}
		for(var k=0, klen = count.length; k<klen; k++){
			if( count[k] > 0){
				$tabs.eq(k).append( '<i class="num">'+count[k]+'</i>' ) 
			}
		}
	}
})()