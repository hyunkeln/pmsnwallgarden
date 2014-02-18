//231x193
$(document).ready(function () {
	var url="";
	var url2="";
	var url3="";
	//
	url3 = "http://prodigy.msn.com/rss-slideshow-telmex.aspx"
	$.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url3),
		dataType: 'json',
		success: parseCenter
  });
  url2 = "http://olimpiadas.clarosports.com/mrss/video/clarosports.xml";//"http://prodigy.msn.com/rss-slideshow-telmex.aspx";
  $.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url2),
		dataType: 'json',
		success: parseRight
  });
  url = "http://prodigy.msn.com/rss-slideshow-telmex.aspx"

  $.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url),
		dataType: 'json',
		success: parseLeft
  });
});




function parseCenter(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "ul.slider";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder + " li");
	$(placeHolder + " li").remove();
	for(var i=0;i<items.length;i++){
		var item = items[i];
		var itemimage = $(xmlsrc[i]).find("enclosure").attr("url");
		var newli = li.clone();
		$(newli).find("span").text(item.title);
		if(top.location.search.indexOf("usuarioConSesion")>-1) {
			$(newli).find("a").attr("href",item.link);
			$(newli).find("a").attr("target","_blank");
			$(newli).find("a").attr("onclick",'pageTracker._trackEvent("External Content", "Open", "'+item.link+'")');
		}else{
			$(newli).find("a").attr("href","javascript:void(0);");
			$(newli).find("a").attr("onclick","getUrl('"+item.link+"')");
		}
		$(newli).find("img").attr("src",itemimage);
		$(placeHolder).append(newli);
	}
	$("#slider-center").als({
		visible_items: 6,
		scrolling_items: 6,
		orientation: "horizontal",
		circular: "no",
		autoscroll: "no"
	});
}

function parseLeft(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "#slider-left";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder+" .li");
	$(placeHolder+" .li").remove();
	for(var j=0;j<items.length/2;j++){
		var item = items[j];
		var itemimage = $(xmlsrc[j]).find("enclosure").attr("url");
		var newli = li.clone();
		if(top.location.search.indexOf("usuarioConSesion")>-1) {
			$(newli).find("a").attr("href",item.link);
			$(newli).find("a").attr("target","_blank");
			$(newli).find("a").attr("onclick",'pageTracker._trackEvent("External Content", "Open", "'+item.link+'")');
		}else{
			$(newli).find("a").attr("href","javascript:void(0);");
			$(newli).find("a").attr("onclick","getUrl('"+item.link+"')");
		}
		$(newli).find("img").attr("src",itemimage);
		$(newli).find("img").attr("title",item.title);
		$(newli).find("img").attr("alt",item.title);
		$(newli).find("img").attr("data-thumb",itemimage);
		$(placeHolder).append($(newli).html());
	}
    $(placeHolder).nivoSlider({
	    effect:'boxRainReverse',
	    slices: 20,
	    pauseTime: 4200,
	    controlNavThumbs:false,
	    directionNav: false
    });

}
function parseRight(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "#slider-right";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder+" .li");
	$(placeHolder+" .li").remove();
	for(var j=items.length/2;j<items.length;j++){
		var item = items[j];
		var itemimage = $(xmlsrc[j]).find("videoImage").attr("url");
		var newli = li.clone();
		if(top.location.search.indexOf("usuarioConSesion")>-1) {
			$(newli).find("a").attr("href",item.link);
			$(newli).find("a").attr("target","_blank");
			$(newli).find("a").attr("onclick",'pageTracker._trackEvent("External Content", "Open", "'+item.link+'")');
			
		}else{
			$(newli).find("a").attr("href","javascript:void(0);");
			$(newli).find("a").attr("onclick","getUrl('"+item.link+"')");
		}
		$(newli).find("img").attr("src",itemimage)
		$(newli).find("img").attr("title",item.title);
		$(newli).find("img").attr("alt",item.title);;
		$(newli).find("img").attr("data-thumb",itemimage);
		$(placeHolder).append($(newli).html());
	}
    $(placeHolder).nivoSlider({
	    effect:'boxRain',
	    slices:20,
	    pauseTime: 3100,
	    controlNavThumbs:true,
	    afterLoad:function(){
		    $(".nivo-controlNav.nivo-thumbs-enabled a").css("width",(100/(items.length-items.length/2))+"%");
	    }
    });

}
function getUrl(url){
	//url ="http://noticias.prodigy.msn.com/rnw/m%C3%A9xico-muerte-made-in-germany"; 
	
	$.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        // this function gets the data from the successful 
        // JSON-P call
        function(data){
        	pageTracker._trackEvent("External Content", "Modal", url);

          // if there is data, filter it and render it out
          if(data.results[0]){

          	var placeHolder = "#area1";
          	if(url.indexOf("clarosports")>-1) placeHolder = "article.dcm-article";
          	if(url.indexOf("video.mx.msn.com")>-1 || url.indexOf("clarosports")>-1) placeHolder ="";
          	var xmlsrc ="";
          	if(placeHolder!="") xmlsrc = $(data.results[0]).find(placeHolder);
          	else xmlsrc = data.results[0];
          	if(placeHolder!=""){
	          	$(xmlsrc).find("script").remove();
	          	$(xmlsrc).find("a").each(function(){
		          	var href=$(this).attr("href");
		          	$(this).attr("href","javascript:void(0)");
		          	$(this).attr("onclick","getUrl('"+href+"')");
	          	});
          	}else{
	          	xmlsrc = $("<iframe src='"+url+"'/>");
	          	
          	}
          	$.modal.close();
          	$(xmlsrc).modal(	{containerCss:{
									backgroundColor:"#fff", 
									borderColor:"#fff", 
									height:650, 
									padding:0, 
									width:830
								},
								overlayClose:true
								}
							);
          // otherwise tell the world that something went wrong
          } else {
            var errormsg = '<p>Error: can\'t load the page.</p>';
            container.html(errormsg);
          }
        }
      );	
}