//231x193
$(document).ready(function () {
	if(!top.location.search.indexOf("usuarioConSesion")>-1) 
		$(".container.logos a").attr("href","javascript:void(0);").attr("target","_self");
	if(top.location.search.indexOf("getUrl")>-1) {
		var logos = $(".container.logos");
		$(".main_container").empty().addClass("simple-container").append(logos);
		
		getUrl(decodeURIComponent(getURLParameter("getUrl")));
	}else{
		var url="";
		var urlRight="";
		var url3="";
		//
		urlNoLogin = "http://prodigy.msn.com/rss-slideshow-telmex.aspx";
		url1 = "http://noticias.prodigy.msn.com/rss-carrouselinfopane.aspx";
		url2 = "http://estilos.prodigy.msn.com/rss-carrouselinfopane.aspx";
		url3 = "http://entretenimiento.prodigy.msn.com/rss-carrouselinfopane.aspx";
		
		urlRight = "http://olimpiadas.clarosports.com/mrss/video/clarosports.xml";//"http://prodigy.msn.com/rss-slideshow-telmex.aspx";
		$.ajax({
			url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(urlRight),
			dataType: 'json',
			success: parseRight
		});
		
		if(top.location.search.indexOf("usuarioConSesion")>-1 || true) {
			$.when($.ajax({
				url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url1),
				dataType: 'json'
			}),
			$.ajax({
				url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url2),
				dataType: 'json'
			}),
			$.ajax({
				url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(url3),
				dataType: 'json'
			})
			).done(function(data1,data2,data3){
				parseTriple(data1[0],data2[0],data3[0]);
			});
		}else{
			$.ajax({
				url:'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num=100&callback=?&q='+ encodeURIComponent(urlNoLogin),
				dataType: 'json',
				success: parseUnique
			});
		}
	}
});

function showUrl(url,obj,title,img){	
	if(typeof title=="undefined") title = $(obj).find("img").attr("title");
	if(typeof img=="undefined") img = $(obj).find("img").attr("src");
	var location = top.location.href.replace(top.location.search, "");
	top.location = location + "?usuarioSinSesion" + "&title=" + encodeURI(title) + "&img=" + encodeURI(img) + "&getUrl=" + encodeURIComponent(url); 
}
function goBack(){
	var location = top.location.href.replace(top.location.search, "");
	top.location = location + "?usuarioSinSesion";
}
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function parseTriple(data1,data2,data3){
	console.log(data1);
	console.log(data2);
	console.log(data3);
	for(var i=0;i<data2.responseData.feed.entries.length/2;i++)
		data1.responseData.feed.entries[data1.responseData.feed.entries.length] = data2.responseData.feed.entries[i];
	for(var i=data2.responseData.feed.entries.length/2;i<data2.responseData.feed.entries.length;i++)
		data3.responseData.feed.entries[data3.responseData.feed.entries.length] = data2.responseData.feed.entries[i];
	xmlString = $(data1.responseData.xmlString);
	xmlString2 = $(data2.responseData.xmlString);
	xmlString3 = $(data3.responseData.xmlString);
	var items = $(xmlString2).find("item").length;
	$(xmlString2).clone().find("item").each(function(i){
		if(i<items/2) $(xmlString).find("item:last").after($(this));
		else $(xmlString3).find("item:last").after($(this));
	});
	data1.responseData.xmlString = $(xmlString).wrapAll('<div></div>').parent().html(); 
	data3.responseData.xmlString = $(xmlString3).wrapAll('<div></div>').parent().html(); 
	parseLeft(data1);
	parseCenter(data3);
}
function parseUnique(data){
	var data1 = jQuery.extend(true, {}, data);
	data1.responseData.feed.entries = new Array();
	var data2 = jQuery.extend(true, {}, data1);
	for(var i=0;i<data.responseData.feed.entries.length/2;i++)
		data1.responseData.feed.entries[i] = data.responseData.feed.entries[i];
	xmlString = $(data2.responseData.xmlString);
	var items = $(xmlString).find("item").length;
	$(xmlString).find("item").each(function(i){
		if(i<items/2) $(this).remove();
	});
	$(xmlString).clone().find("item").each(function(i){
		$(xmlString).find("item:last").after($(this));
	});
	data2.responseData.xmlString = $(xmlString).wrapAll('<div></div>').parent().html(); 
	for(j=0;j<2;j++)
		for(var i=data.responseData.feed.entries.length/2;i<data.responseData.feed.entries.length;i++)
			data2.responseData.feed.entries[data2.responseData.feed.entries.length] = data.responseData.feed.entries[i];
	
	parseLeft(data1);
	parseCenter(data2);
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
			$("#doLogin").hide();
			$(newli).find("a").attr("href",item.link);
			$(newli).find("a").attr("target","_blank");
			$(newli).find("a").attr("onclick",'pageTracker._trackEvent("External Content", "Open", "'+item.link+'")');
			
		}else{
			$(newli).find("a").attr("href","javascript:void(0);");
			$(newli).find("a").attr("onclick","showUrl('"+item.link+"',this)");
		}
		$(newli).find(".img").css("background-image","url("+itemimage+")");
		//$(newli).find("img").attr("title",item.title);
		$(placeHolder).append(newli);
	}
	if($("body").width()<321)
		$("#slider-center").als({
			visible_items: 1,
			scrolling_items: 1,
			orientation: "horizontal",
			circular: "yes",
			autoscroll: "no"
		});
	else 
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
var url,obj;
 function getUrl(u,o){
 	url = u;
 	obj = o;
	var loader = "<div class='loader'><img src='img/ajax-loader.gif'></div>";
	$.ajax({url:"http://query.yahooapis.com/v1/public/yql?"+
	        "q=select%20*%20from%20html%20where%20url%3D%22"+
	        encodeURIComponent(url)+
	        "%22&format=xml'&callback=?",
	        jsonp: 'callback',
	        dataType: 'jsonp',
	        jsonpCallback : "cbfunc"
		}
	);        
 }
 
function cbfunc(data){

	  //pageTracker._trackEvent("External Content", "Modal", url);
	  // if there is data, filter it and render it out
	  if(data.results[0]){ 
	  	   data.results[0] = data.results[0].replace(/onload/g, 'noload');
	       var placeHolder = "#area1";
	       if(url.indexOf("clarosports")>-1) placeHolder = "article.dcm-article";
	       if(url.indexOf("video.mx.msn.com")>-1 || url.indexOf("clarosports")>-1) placeHolder ="";
	       var xmlsrc ="";
	       if(placeHolder!=""){
		       xmlsrc = $(data.results[0]).find(placeHolder);
		       
		       if(typeof $(xmlsrc).html()=="undefined") {
		       	
		       	xmlsrc = $(data.results[0]).find("#content");
		       }
	       }
	       else xmlsrc = data.results[0];
	       if(placeHolder!=""){

				$(xmlsrc).find(".editchoice").parent().parent().remove();
				$(xmlsrc)
				.find("noscript,script,#prearea1,#postarea1,form,.pst_dt,.editchoice,.pvnavct,#pvstatusbar,.gallerytoolbar,.slideshow.loading,.caption-container,.outeradcontainer,.pollheading,.poll,.morecontent,#imagemapsubheader").remove();
				
				$(xmlsrc).prepend('<link rel="stylesheet" type="text/css" href="//media-social.s-msn.com/s/css/18.55/higorange/ue.es-mx.min.css" media="all" />');
				$(xmlsrc).prepend('<link rel="stylesheet" type="text/css" href="http://blu.stc.s-msn.com/br/csl/css/8B7F19A00C010773401DD551FA7F95B0/gtl_sitegeneric.css" media="all" />');                       
				$(xmlsrc).find("a").each(function(){
				var href=$(this).attr("href"); 
				$(this).attr("onclick","showUrl('"+href+"',this,'"+getURLParameter("title")+"','"+getURLParameter("img")+"')");
				$(this).attr("href","javascript:void(0)");
				
				});
	       }else{
	           var title = getURLParameter("title");

	           		           
	           xmlsrc = $("<div></div>").append("<div class='pvtitle customload'><p>"+title+"</p></div>").append("<img src='"+getURLParameter("img")+"'>").append("<p></p>");
	       }
	       $(xmlsrc).append("<button onclick='goBack();'>Regresar</button>");
	       $(xmlsrc).append("<button onclick='top.location=\"https://infinitummovil.net/InfinitumMovil/login.do\"'>Para ver más haz login</button>");
	       $(xmlsrc).appendTo(".main_container");
       
	  // otherwise tell the world that something went wrong
	  } else {
	    var errormsg = '<p>Error: can\'t load the page.</p>';
	    $("body").append(errormsg);
	  }
}