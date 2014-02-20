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
		circular: "yes",
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
	for(var j=0;j<items.length;j++){
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
		    $(".nivo-controlNav.nivo-thumbs-enabled a").css("width",(95/(items.length-items.length/2))+"%");
	    }
    });

}
function getUrl(url){
	top.location ="https://infinitummovil.net/InfinitumMovil/login.do";	
}