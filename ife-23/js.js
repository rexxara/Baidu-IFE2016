/*
memo
有几点需要注意的
1，传递参数的时候函数中间的参数不知道为什么传递不进去
比如settimeout哪一行 先把list传递进来保存为ll才能用；
2.addEvemtListener要执行的function要用匿名函数包起来，不然会在绑定的时候执行一次；
add.只做了中序遍历，看看能不能全部做了，用比较优雅的方法传递参数进来；
3.声明多个变量的时候用逗号这样性能会好一点；
4.获取子节点有firstElementChild不要用firstChild/lastChild这种，不然还要用del_ff函数修饰一下；
5.split加参数可以将字符串化为数组，数组，还有关于数组遍历的使用；
 */
var divList=[],
    preList=[],
    root = document.getElementsByClassName("first")[0];
window.onload=function(){
    document.getElementsByTagName("button")[0].addEventListener("click",middleHandle,false);
    document.getElementsByTagName("button")[1].addEventListener("click",preHandle,false);
}
function  middleHandle(){
    middle(root);
    console.log(divList);
    visiable(divList);
}
function preHandle(){
    pre(root);
    console.log(preList);
    visiable(preList);
}
function pre(root){
	if (!(root == null)) {
		for (var i = 0; i < root.children.length; i++) {
			pre(root.children[i]);
		}
		preList.push(root);
	}
}
function middle(root){
    if(root!==null){
        middle(root.firstElementChild);
        divList.push(root);
        middle(root.lastElementChild);
    }
};
//
//function del_ff(elem){
//    var elem_child = elem.childNodes;
//    for(var i=0; i<elem_child.length;i++){
//        if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue))
//        {
//            elem.removeChild(elem_child[i])
//        }
//    }
//}
function visiable(list){
    var dep=list.length;
    console.log(dep)
    var i=0;
    var time=setInterval(function(){
        addClass(list[i],"active");
        console.log(list[i-1])
        if(i>0){
        removeClass(list[i-1],"active");
        }
        i++;
        if(i>=dep){
            clearInterval(time);
        }
    },1000);
}
function  addClass(el,cla){
    cla+= " "+el.getAttribute("class");
        el.setAttribute("class",cla);
}
function  removeClass(el,removeCla){
    var cla=el.getAttribute("class"),
        cla= cla.split(" "),
        res="";
    console.log(cla);
    for(var key in cla){
        if(cla[key]!==removeCla){
            res+=(cla[key]+" ");
        }
    }
    el.setAttribute("class",res);
}


//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		for (var i = 0; i < node.children.length; i++) {
			preOrder(node.children[i]);
		}
		divList.push(node);
	}
}
