var text= document.getElementById("inputText");
var stage=document.getElementById("rex");

document.getElementById("insertLeft").addEventListener("click",function(){
 var item=document.createElement("li");
 var itemText=document.createTextNode(text.value);
item.appendChild(itemText);
stage.insertBefore(item,stage.childNodes[0]);
},false);

document.getElementById("insertRight").addEventListener("click",function(){
 var item=document.createElement("li");
 var itemText=document.createTextNode(text.value);
item.appendChild(itemText);
stage.appendChild(item);
},false);



document.getElementById("removeRight").addEventListener("click",function(){
alert("removeRightNode: "+stage.childNodes[stage.childNodes.length-1].innerText);
stage.removeChild(stage.childNodes[stage.childNodes.length-1]);
},false);


document.getElementById("removeLeft").addEventListener("click",function(){
alert("removeRightNode: "+stage.childNodes[0].innerText);
stage.removeChild(stage.childNodes[0]);
},false);


document.getElementById("rex").addEventListener("click",function(e){
stage.removeChild(e.target);
},false);