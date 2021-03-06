// JavaScript Document

/*
右上角获取当前时间
*/
var timeshow = null;
timeshow = setTimeout(time,1000);//开始执行
function time(){
	clearTimeout(timeshow);//清除定时器
	dt = new Date();
	var yy=dt.getYear()+1900;
	var mm=dt.getMonth()+1;
	var dd=dt.getDate();
	var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var day=dt.getDay();
	var hh=dt.getHours();
	var mi=dt.getMinutes();
	var ss=dt.getSeconds();
	if(hh<10){hh="0"+hh;}
	if(mi<10){mi="0"+mi;}
	if(ss<10){ss="0"+ss;}
	if(hh<13){ss=ss+"AM";}else{ss=ss+"PM";}
	document.getElementById("timeShow").innerHTML = yy+"年"+mm+"月"+dd+"日&nbsp;&nbsp;"+weekday[day]+"&nbsp;&nbsp;"+hh+":"+mi+":"+ss+"";
	timeshow = setTimeout(time,1000); //设定定时器，循环执行           
}
/*
价格指数
标签和div同时轮播
*/
$(function(){  
    //手动播放图片  
    $("#left-o-sp ul").on("click","li",function(){  
          
        $(this).addClass("one").siblings().removeClass("one");  
        index=$(this).index();  
        i=index;  
        $("#left-o-di div").eq(index).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();    
        });  

    //自动播放图片  
    var i=0;  
    var t=setInterval(autoplay,5000);  
    function autoplay(){  
        i++;  
        if(i>8)i=0;        
        $("#left-o-sp ul li").eq(i).addClass("one").siblings().removeClass("one");  
        $("#left-o-di div").eq(i).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();   
    }  

        $("#left-o").hover(function(){  
            clearInterval(t);  
        },function(){  
            t=setInterval(autoplay,5000);  
        });  
    });  

/*
价格指数
div中图表
dv1总指数
*/
 $(document).ready(function() {
	   var chart= {  		  
		  backgroundColor: 'rgba(0,0,0,0)' ,
		   
	   }; 
	   var title = {
		  text: null   
	   };
	   var subtitle = {
		  text: null
	   };
	   var xAxis = {
		   labels:{ 
			step:3
		  },
		  categories: ['2008/01','1111','2009/05','2222', '2010/10', '2010/10', '2012/02', '2012/02', '2013/07','2013/07', '2014/12','2014/12',
		  '2016/05','2016/05', '2017/10', '2017/10']
	        
	   };
	   var yAxis = {
		  title: {
			 text: null
		  },
		  labels: {//y轴刻度文字标签  
			formatter: function () {  
				return this.value + 'k';//y轴加上%  
			}  
		  },  
		  plotLines: [{
			 value: 0,
			 width: 1,
			 color: 'red'
		  }]
	   };   
	
	   var tooltip = {
		  valueSuffix: 'k'
	   }
	
	   var legend = {
		  enabled: false
	   };
	   
	   var credits = {  
		enabled: false     //不显示LOGO 
	   };
	
	   var series =  [
		  {
			 name: 'Tokyo',
			 data: [2.5,0, 2,0, 5.2,0, 7.2,0, 9.6,0, 10,0, 11,0, 12,0],
			 color: '#ffb400'
		  }
	   ];
	   
	   var json = {};
	   json.chart = chart;
	   json.title = title;
	   json.subtitle = subtitle;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;
	   json.tooltip = tooltip;
	   json.legend = legend;
	   json.credits = credits;
	   json.series = series;	
	   $('#dv1').highcharts(json);
	});
	
/*
月产新品种
后台数据
*/
$(document).ready(function() {
	$.ajax({
	      url:'http://192.168.3.105:8000/index.php/index/index/test',
	      type:'post',
	      dataType:'json',
	      data:{},
	      async:false,
	      success:function(data){
	      	$("#month").html(data.month+"月产新品种");
	      	$("#left-tx1").html(data.present); 
	      	$("#left-tx2").html(data.next_present); 			 
		  },
		  error:function(data){

		  }
	});

})


/*
生态原产地产品保护中药材
图片横向滚动
 */
/*示范区*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/demonstration',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-on").html(html);
    var toid = function(el) {          
	  return document.getElementById(el);       
	 },
	 toc = toid("left-th-to");
	 if(toc) {
	   var ul = toid("scroll-on"),
		   lis = ul.getElementsByTagName("li"),
		   itemCount = lis.length,
		   width = lis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   toc.scrollLeft += 2;
			   if(toc.scrollLeft % width <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   ul.appendChild(ul.getElementsByTagName("li")[0]);
				   toc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       ul.style.width = width*itemCount + "px"; //加载完后设置容器长度
	       var timer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})
/*中药材产品*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/product',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-tw").html(html);
    var twid = function(twel) {          
	 return document.getElementById(twel);       
	},
	 twc = twid("left-th-tw");
	 if(twc) {
	   var twul = twid("scroll-tw"),
		   twlis = twul.getElementsByTagName("li"),
		   twtimeCount = twlis.length,
		   twwidth = twlis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   twc.scrollLeft += 2;
			   if(twc.scrollLeft % twwidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   twul.appendChild(twul.getElementsByTagName("li")[0]);
				   twc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       twul.style.width = twwidth*twtimeCount + "px"; //加载完后设置容器长度    
	       var twimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})


/*
供应信息
数据滚动
*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/supply',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
	  // alert(vendorJson[0].id);

    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><span style='width:16%;'>"+vendorJson[i].drug+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].size+"</span>"
	  			   +"<span style='width:16%'>"+vendorJson[i].place+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].number+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].price+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].contact+"</span>"
	  			   +"<span style='width:22%'>"+vendorJson[i].del+"</span>"
	  			   +"</li>";
    }
	  $("#right-one-list").html(html);
	  var doscroll = function(){
      var $parent = $('.js-slide-list');
      var $first = $parent.find('li:first');
      var height = $first.height();
      $first.animate({
     	//切换时动画持续时间
         marginTop: -height + 'px'
         },2000, function() {
         $first.css('marginTop', 0).appendTo($parent);
      });    
	  };
	 //切换中动画间隔时间
	 setInterval(function(){doscroll()},15000);
	  }
})
})



/*
求购信息
数据滚动
*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/buy',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
	  // alert(vendorJson[0].id);

    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><span style='width:16%;'>"+vendorJson[i].drug+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].size+"</span>"
	  			   +"<span style='width:16%'>"+vendorJson[i].place+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].number+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].price+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].contact+"</span>"
	  			   +"<span style='width:22%'>"+vendorJson[i].del+"</span>"
	  			   +"</li>";
    }
	  $("#right-two-list").html(html);
	  	 var doscrollt = function(){
	     var $parentw = $('.rs-slide-list');
	     var $firstw = $parentw.find('li:first');
	     var heightw = $firstw.height();
	     $firstw.animate({
	     	//切换时动画持续时间
	         marginTop: -heightw + 'px'
	         }, 2000, function() {
	         $firstw.css('marginTop', 0).appendTo($parentw);
		     });    
		};
		//切换中动画间隔时间
		setInterval(function(){doscrollt()},15000);
	}
})
})




/*
优秀产品展示
图片横向滚动
 */
/*优秀企业*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/excellent',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-ron").html(html);
    var rtoid = function(rtole) {          
	  return document.getElementById(rtole);       
	 },
	 rtoc = rtoid("right-th-to");
	 if(rtoc) {
	   var rtoul = rtoid("scroll-ron"),
		   rtolis = rtoul.getElementsByTagName("li"),
		   rtotimeCount = rtolis.length,
		   rtowidth = rtolis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   rtoc.scrollLeft += 2;
			   if(rtoc.scrollLeft % rtowidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   rtoul.appendChild(rtoul.getElementsByTagName("li")[0]);
				   rtoc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       rtoul.style.width = rtowidth*rtotimeCount + "px"; //加载完后设置容器长度      
	       var rtotimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})

/*优秀产品*/
$(document).ready(function() {
$.ajax({
  url:'http://192.168.3.105:8000/index.php/index/Picture/quality',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-rtw").html(html);
    var rtwid = function(rtwel) {          
	 return document.getElementById(rtwel);       
	},
	 rtwc = rtwid("right-th-tw");
	 if(rtwc) {
	   var rtwul = rtwid("scroll-rtw"),
		   rtwlis = rtwul.getElementsByTagName("li"),
		   rtwtimeCount = rtwlis.length,
		   rtwwidth = rtwlis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   rtwc.scrollLeft += 2;
			   if(rtwc.scrollLeft % rtwwidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   rtwul.appendChild(rtwul.getElementsByTagName("li")[0]);
				   rtwc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       rtwul.style.width = rtwwidth*rtwtimeCount + "px"; //加载完后设置容器长度    
	       var rtwimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})
