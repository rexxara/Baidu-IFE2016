
var aqiData = {};

function addAqiData() {
    var city =document.getElementById('aqi-city-input').value;
    if (!city.match(/^[a-zA-Z\u4e00-\u9fa5]+$/)) {
         alert("请说中文或者英文");
         return false;
     }

    var value = document.getElementById('aqi-value-input').value;
    if (!value.match(/^-?\d+$/)) {
         alert("这次你只能说数字了 = =");
         return false;
     }
     aqiData[city]=value;
     }
     
     function renderAqiList() {
        console.log(aqiData)
         var result="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
         for(var city in aqiData){
             result += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>"; 
        }
         document.getElementById("aqi-table").innerHTML=result;
     }
     function addBtnHandle() {
         addAqiData();
         renderAqiList();
     }
     function delBtnHandle() {
         var cityName=this.target.parentNode.parentNode.childNodes[0].innerHTML;
         delete aqiData[cityName];
         console.log(aqiData)
         renderAqiList();
     }
     var event=event||window.event;
     
     function int() {
         document.getElementById('add-btn').addEventListener("click",addBtnHandle,false)
         
         document.getElementById("aqi-table").addEventListener("click", function(e) {
             target=e.target||e.srcElement;
             if(e.target.nodeName.toLowerCase()=="button"){
                 delBtnHandle();
             }
         },false)
     }
     int();