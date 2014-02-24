//231x193
$(document).ready(function () {
	if(top.location.search.indexOf("getUrl")>-1) {
		$(".main_container").empty().addClass("simple-container");
		
		getUrl(getURLParameter("getUrl"));
	}else{
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
	}
});

function showUrl(url,obj){	
	var title = $(obj).find("img").attr("title");
	img = $(obj).find("img").attr("src");
	top.location = top.location + "&title=" + encodeURI(title) + "&img=" + encodeURI(img) + "&getUrl=" + url; 
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

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
			$(newli).find("a").attr("onclick","showUrl('"+item.link+"',this)");
		}
		$(newli).find("img").attr("src",itemimage);
		$(newli).find("img").attr("title",item.title);
		$(placeHolder).append(newli);
	}
	$("#slider-center").als({
		visible_items: 5,
		scrolling_items: 3,
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
			$(newli).find("a").attr("onclick","showUrl('"+item.link+"',this)");
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
			$(newli).find("a").attr("onclick","showUrl('"+item.link+"',this)");
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
 function getUrl(url,obj){
	//url ="http://noticias.prodigy.msn.com/rnw/m%C3%A9xico-muerte-made-in-germany"; 
	var loader = "<div class='loader'><img src='img/ajax-loader.gif'></div>";

	$.getJSON("http://query.yahooapis.com/v1/public/yql?"+
	        "q=select%20*%20from%20html%20where%20url%3D%22"+
	        encodeURIComponent(url)+
	        "%22&format=xml'&callback=?",
		// this function gets the data from the successful 
		// JSON-P call
		function(data){
		  //pageTracker._trackEvent("External Content", "Modal", url);
		  // if there is data, filter it and render it out
		  if(data.results[0]){ 
		       var placeHolder = "#area1";
		       if(url.indexOf("clarosports")>-1) placeHolder = "article.dcm-article";
		       if(url.indexOf("video.mx.msn.com")>-1 || url.indexOf("clarosports")>-1) placeHolder ="";
		       var xmlsrc ="";
		       if(placeHolder!="") xmlsrc = $(data.results[0]).find(placeHolder);
		       else xmlsrc = data.results[0];
		       if(placeHolder!=""){
					$(xmlsrc).find(".editchoice").parent().parent().remove();
					$(xmlsrc).find("script,#prearea1,#postarea1,form,.pst_dt,.editchoice,.pvthmbnlcrsl,.pvnavct,#pvstatusbar").remove();
					
					$(xmlsrc).prepend('<link rel="stylesheet" type="text/css" href="//media-social.s-msn.com/s/css/18.55/higorange/ue.es-mx.min.css" media="all" />');
					$(xmlsrc).prepend('<link rel="stylesheet" type="text/css" href="http://blu.stc.s-msn.com/br/csl/css/8B7F19A00C010773401DD551FA7F95B0/gtl_sitegeneric.css" media="all" />');                       
					$(xmlsrc).find("a").each(function(){
					var href=$(this).attr("href"); 
					$(this).attr("href","javascript:void(0)");
					$(this).attr("onclick","top.location='https://infinitummovil.net/InfinitumMovil/login.do'");
					});
		       }else{
		           var title = getURLParameter("title");

		           		           
		           xmlsrc = $("<div></div>").append("<div class='pvtitle customload'><p>"+title+"</p></div>").append("<img src='"+getURLParameter("img")+"'>").append("<p></p>");
		       }
		       $(xmlsrc).append("<button onclick='top.location=\"https://infinitummovil.net/InfinitumMovil/login.do\"'>Para ver más haz login</button>");
		       $(xmlsrc).appendTo(".main_container");
		  // otherwise tell the world that something went wrong
		  } else {
		    var errormsg = '<p>Error: can\'t load the page.</p>';
		    $("body").append(errormsg);
		  }
		}
	);        
 }