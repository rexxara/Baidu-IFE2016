/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
  var filter={
  "北京": 0,
  "上海": 1,
  "广州": 2,
  "深圳": 3,
  "成都": 4,
  "西安": 5,
  "福州": 6,
  "厦门": 7,
  "沈阳": 8
  }

// 用于渲染图表的数据
  var tArray = new Array();  //先声明一维
for(var k=0;k<9;k++){    //一维长度为i,i为变量，可以根据实际情况改变
tArray[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
for(var j=0;j<92;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
tArray[k][j]="";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
 }
}


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: 1
}
/**
 * 渲染图表
 */
function renderChart(tArray) {
  var nowSelectCity=pageState.nowSelectCity;
var renderText="";
var copytArry = new Array();
for(var i=0;i<((tArray[nowSelectCity].length)/pageState.nowGraTime);i++){
  copytArry[i]=0;
}
var iii=0;
for(var i=0;i<((tArray[nowSelectCity].length)/pageState.nowGraTime);i++){
  for(var ii=0;ii<pageState.nowGraTime;ii++){
    if(!isNaN(tArray[nowSelectCity][iii])){
         copytArry[i] +=tArray[nowSelectCity][iii];
    iii++
    }
  }
  copytArry[i]=Math.floor(copytArry[i]/pageState.nowGraTime);
}

    for(var j=0;j<((tArray[nowSelectCity].length)/pageState.nowGraTime);j++){
  renderText+='<li title="'+copytArry[j]+'" style="height:'+copytArry[j]+'px;"></li>';
    }
document.getElementsByClassName("aqi-chart-chart")[0].innerHTML=renderText;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(thisValue) {
  // 确定是否选项发生了变化 
console.log(thisValue)
pageState.nowGraTime=thisValue;
  renderChart(tArray);
  // 设置对应数据
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(thisValue) {
  pageState.nowSelectCity=filter[thisValue]
  renderChart(tArray);
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
 console.log("initGraTimeForm")
 var radio=document.getElementById("form-gra-time").getElementsByTagName("input");
 radio[0].addEventListener("click",function(){graTimeChange(this.value),false});
 radio[1].addEventListener("click",function(){graTimeChange(this.value),false});
 radio[2].addEventListener("click",function(){graTimeChange(this.value),false});
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
 console.log("initCitySelector")
    var citySelect=document.getElementById("city-select");
   citySelect.addEventListener("change",function(){
     citySelectChange(this.value);
  },false)
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {


  var ii=0,jj=0;
  for(var i in aqiSourceData){
    for(var j in aqiSourceData[i]){
    tArray[ii][jj]=aqiSourceData[i][j];
    jj++;
    }
    jj=0;
    ii++
  }
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart(tArray);
}

init();

