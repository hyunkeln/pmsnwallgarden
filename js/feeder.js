//231x193
$(document).ready(function () {
	top.location.search
	var url="";
	var url3="";
	if(top.location.search.indexOf("usuarioConSesion")>-1) url = "http://entretenimiento.prodigy.msn.com/rss-carrouselinfopane.aspx";//"http://prodigy.msn.com/rss-slideshow-telmex-interiores.aspx"; //URL Con sesión
	else url = "http://prodigy.msn.com/rss-slideshow-telmex.aspx"
	$.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url),
		dataType: 'json',
		success: parseEntries
  });
  if(top.location.search.indexOf("usuarioConSesion")>-1) url = "http://estilos.prodigy.msn.com/rss-carrouselinfopane.aspx";//"http://prodigy.msn.com/rss-slideshow-telmex.aspx"; //Url con sesión
  else url = "http://prodigy.msn.com/rss-slideshow-telmex.aspx"
  $.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url),
		dataType: 'json',
		success: parsePane
  });
  if(top.location.search.indexOf("usuarioConSesion")>-1)  url3="http://noticias.prodigy.msn.com/rss-carrouselinfopane.aspx";//, //urlcon sesión
  else url = "http://prodigy.msn.com/rss-slideshow-telmex.aspx";
  $.ajax({
		url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url),
		dataType: 'json',
		success: parseNivo
  });


  $.ajax({
		url:"http://msn-rd.com/eservicios/json/bannerswg",
		dataType: 'jsonp',
		success: parseBanners
  });
});


function parsePane2(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "ul.pane";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder+" li");
	$(placeHolder+" li").remove();
	for(var j=0;j<items.length;j++){
		var item = items[j];
		var itemimage = $(xmlsrc[j]).find("enclosure").attr("url");
		var newli = li.clone();
		$(newli).find("h2").text(item.title);
		$(newli).find("a").attr("href",item.link);
		$(newli).find("img").attr("src",itemimage);
		$(placeHolder).append(newli);
	}
	$("#slider-pane").als({
		visible_items: 5,
		scrolling_items: 4,
		orientation: "horizontal",
		circular: "no",
		autoscroll: "no"
	});
}

function parseEntries(data) {
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
		$(newli).find("a").attr("href",item.link);
		$(newli).find("img").attr("src",itemimage);
		$(placeHolder).append(newli);
	}
	$("#slider-items").als({
		visible_items: 6,
		scrolling_items: 6,
		orientation: "horizontal",
		circular: "no",
		autoscroll: "no"
	});
}

function parseBanners(data) {
	
	var placeHolder = "div.banners";
	var items = data.items;
	var li = $(placeHolder+" .li");
	$(placeHolder+" .li").remove();
	for(var j=0;j<items.length;j++){
		var item = items[j];
		var itemimage = item.php;
		console.log(itemimage);
		var newli = li.clone();
		$(newli).find("a").attr("title",item.title);
		$(newli).find("a").attr("href",item.link);
		$(newli).find("img").attr("src",itemimage);
		if(j==items.length-1) $(newli).addClass("last");
		$(placeHolder).append(newli);
	}
	
}

function parseNivo(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "#slider-nivo";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder+" .li");
	$(placeHolder+" .li").remove();
	for(var j=0;j<items.length/2;j++){
		var item = items[j];
		var itemimage = $(xmlsrc[j]).find("enclosure").attr("url");
		var newli = li.clone();
		$(newli).find("a").attr("href",item.link);
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
function parsePane(data) {
	data.responseData.xmlString = data.responseData.xmlString.replace(/msncp\:/g, 'msncp');
	var placeHolder = "#slider-pane";
	var items = data.responseData.feed.entries;
	var xmlsrc = $(data.responseData.xmlString).find("item");
	var li = $(placeHolder+" .li");
	$(placeHolder+" .li").remove();
	for(var j=items.length/2;j<items.length;j++){
		var item = items[j];
		var itemimage = $(xmlsrc[j]).find("enclosure").attr("url");
		var newli = li.clone();
		$(newli).find("a").attr("href",item.link);
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