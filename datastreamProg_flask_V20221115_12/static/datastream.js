var AND = 'ellipse';
var OR = 'triangle';
var SWITCH = 'diamond';
// var SWITCH = 'round-rectangle';
var NONE = 'ellipse';
var HUB = 'hub';
var TEMP = 'tempSensor';
var HUM = 'humSensor';
var COOLER = 'actuator';
var CAPSULE = 'round-rectangle';
var temp42={};
var inputData = 'Input-Operator';
var outputData = 'Output-Operator';

var GLM = 'GLM-Operator';
var DL = 'DL-Operator';
var RF = 'RF-Operator';
var DT = 'DT-Operator';
var GBT = 'GBT-Operator';
var SVM = 'SVM-Operator';
var DFM = 'Module-Operator';
var inputs = 'Inputs-Operator';
var outputs = 'Outouts-Operator';

var nodeDrawType = NONE

var tokenCounter = 0;
var initToken = false;
var modulelist = [];
var predictlist = [];
var nowclumname;
var same_output = 1;
var tokenArray = new Array();
// var nextTokenArray = new Array();

var fired = false;

var humanlist = [];
// 标记右键predict选中的节点
var nowobj;
var dfmobj;
var ipsobj;
var nowdfmobj;
// var allTokenArray = new Array();
// var tokenArray2 = new Array();
// allTokenArray.push(tokenArray);
// allTokenArray.push(tokenArray2);

var tokenMap = new HashMap();
// var tokensMap = new HashMap(); /*all tokens*/
var nodesMap = new HashMap(); /* all node objects */

//readcsv_JIANG
var CSRD = 'CSV-Image'
let fileInput = document.getElementById('csv_file');
let fileReader = new FileReader();
var head=new Array();
var headbeta=head;
head[0]=new Array();
head[1]=new Array();
var sum=0;
var temp=[];
var tempbeta=temp;
var AddList=new Array();
var RemoveList=new Array();

function autoprogramnet(){
while(AddList!=null){

}
while(RemoveList!=null){

}
}

function delete_func(){
//var str = prompt("delet item");
for(a=0;a<2;a++){
    if(cy.elements()[a]._private.data.id){

        var name = cy.elements()[a]._private.data.id;
        console.log("lie 1"+ name);
        deletenode(name);
    }

}
}

function findnode(name){
    i=0;
    cy.elements()[0]._private.data.csv_lier;
    while(cy.elements()[i]._private.data.id){
        if(cy.elements()[i]._private.data.id==name){
            return cy.elements()[i];
        }
        i++;
    }
}

function printall(){
    i=0;
    while(true){
        try{
            cy.elements()[i]._private.data.id;
            console.log("lie 1"+ cy.elements()[i]._private.data.id);
            i++;}
        catch{
            break;
        }
    }
}

function addedgebycsv_lier(source,target,corr){
    a=source;
    b=target;
    a=findidbycsv_lier(a);
    b=findidbycsv_lier(b);
    addedgebyid(a,b,corr);
}

function removeedgebycsv_lier(source,target){
    a=source;
    b=target;
    a=findidbycsv_lier(a);
    b=findidbycsv_lier(b);
    removeedgebyid(a,b);
}

function testremoveedge(){
    a=prompt("source");
    a=findidbycsv_lier(a);
    b=prompt("target");
    b=findidbycsv_lier(b);
    removeedgebyid(a,b);
}
//JL
function removeedgebyid(source,target){
    console.log(cy.edges());
    cy.edges().forEach(function( ele ){
        if(ele.data('source')==source && ele.data('target')==target){
            ele.remove();
        }
    });
}

function addedgebyid(source,target,corr){
    cy.add({
        group: "edges",
        data: {
            source: source,
            target: target,
            "arrow": "triangle",
            'corr': corr
        }
    });
}

function findidbycsv_lier(csv_lier){
    i=0;
    while(cy.elements()[i]._private.data.id){
        if(cy.elements()[i]._private.data.csv_lier==csv_lier){
            return cy.elements()[i]._private.data.id;
        }
        i++;
    }
}

//将cy复制到cy2
function copycy(){
    cy2=cy;
}

function deletenode(Name){
if(cy.$("#"+Name)){
    cy.$("#"+Name).remove();
    return;
}
else{
    alert("node not found!");
}
}
function creatlist(){
if(head[0][0]==undefined){
  alert("未读取csv！")
}
else{

}
}
function find2(a){
for(var b=0;b<head[0].length;b++){
  if(a==head[0][b]){
    return head[1][b];
  }
}
}
//按列名查找
function select(temp,a){
    var key=[];
    key = a.split(',');
    let temp2=new Array();
    for(var a=0;a<sum-2;a++){
      temp2[a]=new Array();
  }
    for(var e=0;e<key.length;e++){
      var keynum = find2(key[e]);
      for(var b=0;b<sum-2;b++){
        temp2[b][e]=temp[b][keynum];
      }
  }
  return temp2;
  }
//改成员(nodeName)的csv列
function changeDataInNode(){
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';

    nodeName = document.getElementById('nodeName').innerHTML;
    let bjo =cy.$("#"+nodeName);
    console.log("name is"+ bjo.data().id);
    //csv_lier: lier_id, csv_data: strdata
    if(document.mycsv.selectcsv.length!=0){
        if(document.mycsv.selectcsv.value && bjo.data().type != "CAPSULE"){
            bjo.data().csv_lier=document.mycsv.selectcsv.value;
            tempdata=select(temp,document.mycsv.selectcsv.value);
            bjo.data().csv_data=JSON.stringify(tempdata);
            cy.$("#"+bjo.data().parent).data().lab = bjo.data().csv_lier;//JL2
            alert("column changed!")
        }
        else{
            alert("Please choise the column!");
        }
    }
    else{
        alert("csv file not defined!");
    }
    //var jdata = cy.elements()[0]._private.data.id;

    //console.log("" + jdata);
}
//下拉框添加成员
// function addchild(str){
//     document.mylist.myselect.length++;
//     document.mylist.myselect.options[document.mylist.myselect.length-1].text=str;
//     document.mylist.myselect.options[document.mylist.myselect.length-1].value=str;
// }
//隐藏下拉框添加成员
function addchildbeta(str){
    document.mycsv.selectcsv.length++;
    document.mycsv.selectcsv.options[document.mycsv.selectcsv.length-1].text=str;
    document.mycsv.selectcsv.options[document.mycsv.selectcsv.length-1].value=str;
}
//下拉框删除最后一个成员
// function deletechild(){
//     document.mylist.myselect.length--;
// }
//下拉框初始化
// function initchild(){
//     document.mylist.myselect.length=0;
//
//     for(let i=0;i<head[0].length;i++){
//       addchild(head[0][i]);
//     }
// }
//隐藏下拉框初始化
function initchildbeta(){
document.mycsv.selectcsv.length=0;
for(i=0;i<head[0].length;i++){
  addchildbeta(head[0][i]);
}
}
// ファイル変更時イベント

fileInput.onchange = () => {
    let file = fileInput.files[0];
    fileReader.readAsText(file, "Shift_JIS");
    console.log(file);
};

// ファイル読み込み時
let items = [];
fileReader.onload = () => {
  // ファイル読み込み
  let fileResult = fileReader.result.split('\r\n');
  //init sum
  sum=0;
  //init temp
  temp=tempbeta;
  // 先頭行をヘッダとして格納
  let header = fileResult[0].split(',')

  init();
  // CSVから情報を取得
  items = fileResult.map(item => {
    let datas = item.split(',');
    let result = {};
    sum+=1;

    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];//key is 列名
    }
    return result;
  });
  for(let b=0;b<sum-2;b++){
    let hdt = fileResult[b+1].split(',');
    var tem2=[];
    for(let a=0;a<hdt.length;a++){
        // if(hdt[a] % 1 !== 0) {
        //     tem2[a]=parseFloat(hdt[a]);//转float//JL4
        // }
        // else{
        //     tem2[a]=parseInt(hdt[a]);//转int//JL4
        // }
        tem2[a]=parseInt(hdt[a]);//转int//JL4
    }
    temp[b]=tem2;
  }
  //at="a1,a2";
  //temp3=select(temp,at);
  //temp4=select(temp,"a1,a3,a5");
  //console.log(temp3[99]);

  function init(){
    haed=null;
    head[0]=header;
    for(var a=0;a<head[0].length;a++){
      head[1][a]=a;
    }
    // initchild();
    initchildbeta();
  }

}

// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
}

function btn1(){
  if(head[0][0]==undefined){alert("未读取csv！");}
else {console.log(head[1][0]+"is the first lier");}
}

// function btn2(){
//   var value = document.mylist.myselect.value;
//   data=select(temp,value);
//
//   //console.log(data);
//   save_as_JSON(data);
// }
function save_as_JSON(data){
  //var str = JSON.stringify(data);
  //console.log(str);
  //console.log(typeof(str));
  if(head[0][0]==undefined){alert("未读取csv！");}
  else{
    const strdata = JSON.stringify(data);
    const blob = new Blob([strdata],{type: 'application/json'});
    const objecturl = URL.createObjectURL(blob);
    const atag = document.createElement('a');
    atag.href = objecturl;
    atag.download ="data.json";
    atag.click();
    URL.revokeObjectURL(objecturl);}
}
//readcsv end_JIANG
function testhead(){
    console.log(head[0][0]);
    
    showhightestcorr('Drying_days');

    
}

// 6/22
function adviceforselect(){
    ele = get_nowobj();
    if (!ele.data().csv_lier) {
        alert("Please select data first!");
        return;
    }
    showhightestcorr(ele.data().csv_lier);
}

function showhightestcorr(selected_column){
    function average(array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i][0];
        }
        return sum / array.length;
    }

    // 定义计算相关系数的函数
    function correlationCoefficient(array1, array2) {
        var average1 = average(array1);
        var average2 = average(array2);
        var sum1 = 0, sum2 = 0, sum3 = 0;
        for (var i = 0; i < array1.length; i++) {
            var diff1 = array1[i][0] - average1;
            var diff2 = array2[i][0] - average2;
            sum1 += diff1 * diff2;
            sum2 += diff1 * diff1;
            sum3 += diff2 * diff2;
        }
        return sum1 / Math.sqrt(sum2 * sum3);
    }

    var DIC ={};
    for(var a=0;a<head[0].length;a++){
        header = head[0][a];
        data = select(temp,header);
        DIC[header] = data;
    }
    // console.log(DIC);
    var TARGET ={};
    TARGET = DIC[selected_column];
    // console.log(TARGET);

    var correlations = [];
    for (var k in DIC) {
        if (k !== selected_column) {
            correlations.push({
                key: k,
                value: correlationCoefficient(TARGET, DIC[k])
            });
        }
    }

    // 按照相关系数从高到低排序
    correlations.sort(function(a, b) {
        return b.value - a.value;
    });

    console.log(correlations);
    createPopup(correlations,selected_column);
}

function createPopup(correlations,selected_column) {
    // 创建一个新窗口
    let newWindow = window.open('', '_blank', 'width=500, height=400, scrollbars=yes, resizable=yes');

    // 创建样式标签并添加到新窗口的头部
    let style = document.createElement('style');
    style.innerHTML = `
        table {
            border-collapse: collapse;
            width: 100%;
            font-family: Arial, sans-serif;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            font-weight: bold;
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    `;
    newWindow.document.head.appendChild(style);


    // 创建标题
    let title = document.createElement('h1');
    title.textContent = `data recommendations of '${selected_column}' .`;
    newWindow.document.body.appendChild(title);

    // 创建表格
    let table = document.createElement('table');

    // 创建表头
    let header = table.createTHead();
    let headerRow = header.insertRow(0);
    let headerCell1 = headerRow.insertCell(0);
    let headerCell2 = headerRow.insertCell(1);

    headerCell1.innerHTML = 'Column';
    headerCell2.innerHTML = 'Correlation';

    // 添加数据行
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < correlations.length; i++) {
        let row = tbody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = correlations[i].key;
        cell2.innerHTML = correlations[i].value;
    }

    // 将表格添加到新窗口中
    newWindow.document.body.appendChild(table);
}


function Node(id, position, currentNode) {
    const nodeObj = {};

    nodeObj.id = currentNode.data().id;
    nodeObj.test = "test";
    nodeObj.position = position;
    nodeObj.currentNode = currentNode;

    nodeObj.inputNodes = new HashMap(); /* save tokens where they come from*/
    nodeObj.nodeTokensMap = new HashMap();/* Real-time tokens on the node */

    /*initialize inputNodes*/
    {
        let incomers = currentNode.incomers();/* all input nodes*/

        for (let i = 1; i < incomers.length; i += 2) {
            let inputNode = incomers[i].data();
            // let nodeTokensMap = new HashMap();  /* Real-time tokens on the node */
            let nodeTokensArray = new Array();  /* Real-time tokens on the node */
            nodeObj.inputNodes.put(inputNode.id, nodeTokensArray);
        }

    }

    nodeObj.moveByNode = function () {

        let allTokenArrays = nodeObj.inputNodes.values();
        let targets = nodeObj.currentNode.outgoers();/* all target nodes and edges*/
        let targetPathNum = targets.length / 2; /*because outgoers() consist of edge and node*/

        if (!(nodeObj.currentNode.data().id.includes("sw"))) {  /* it is not sw node*/

            /*move all tokens to next node*/
            for (let i = 0; i < allTokenArrays.length; i++) {
                let tokenArray = allTokenArrays[i];
                for (let j = 0; j < tokenArray.length; j++) {
                    let token = tokenArray[j];
                    let copyTokenNum = 0;

                    if (targetPathNum == 0) {

                        cy.$('#t' + 0).remove();    /*need to modify*/
                        // cy.$('#t' + token.id).style("opacity", "0");/*make token disappear*/

                    } else if (targetPathNum == 1) {    /* only one next node*/

                        nodeObj.tokenToNode(token, targets[1]);  /* move token to next node*/

                    } else if (targetPathNum > 1) {

                        /*copy and move token to every target node*/
                        for (let k = 1; k < targets.length; k += 2) {
                            /*1. copy token*/
                            let initPos = cy.$('#t' + token.id).renderedPosition();
                            let newToken = Token(token.id + "_" + copyTokenNum++, 'token1', 'true', {
                                x: initPos.x + 10,
                                y: initPos.y + 10
                                // x: initPos.x ,
                                // y: initPos.y
                            }, currentNode, 'red');
                            /*2. move token*/
                            nodeObj.tokenToNode(newToken, targets[k]);  /* move token to next node*/
                        }
                        cy.$('#t' + token.id).remove();/*remove original token*/

                    }
                }
                tokenArray.length = 0;  /*clear tokenArray*/

            }


        } else {/*if it is Switch node*/

            /*1.get condition of SW*/
            let incomers = nodeObj.currentNode.incomers();/* all input nodes and edges*/
            let condFlag = null;
            for (let i = 0; i < incomers.length; i++) {
                if (incomers[i].data().id.includes('cond')) {/*find condition module from incomers*/
                    condFlag = incomers[i].data().flag;/* get flag of cond*/
                }
            }

            /*2. chose where to go*/
            if (condFlag != null ) {
                for (let i = 0; i < targets.length; i++) {
                    if (targets[i].data().id.includes(condFlag)) {
                        // nodeObj.tokenToNode(token, targets[1]);  /* move token to next node*/
                        for (let k = 0; k < allTokenArrays.length; k++) {
                            let tokenArray = allTokenArrays[k];
                            for (let j = 0; j < tokenArray.length; j++) {

                                // /*judge */
                                // let moveFlag = true;
                                // for (let l = 0; l < allTokenArrays.length; l++) {
                                //     if(allTokenArrays[l].length == 0){
                                //         moveFlag = false;
                                //     }
                                // }
                                // if(moveFlag){
                                //     let token = tokenArray[j];
                                //     nodeObj.tokenToNode(token, targets[i]);  /* move token to next node*/
                                // }

                                let token = tokenArray[j];
                                nodeObj.tokenToNode(token, targets[i]);  /* move token to next node*/
                            }
                            tokenArray.length = 0;  /*clear tokenArray*/
                        }

                    }
                }
            }
        }
    }

    nodeObj.tokenToNode = function (token, targetNode) {
        token.move(targetNode.data().id);   /* animate of moving to next node*/
        token.currentNode = targetNode;     /*change current node of per token*/

        if (!nodesMap.containsKey(targetNode.data().id)) {  /* not exist target node obj in nodesMap */
            /* create new node in nodesMap*/
            let nodeName = targetNode.data().id;
            let nodePosition = cy.$('#' + targetNode).renderedPosition();
            let value = Node(nodeName, {x: nodePosition.x, y: nodePosition.y}, targetNode);
            nodesMap.put(nodeName, value);
        }

        // nodesMap.get(targetNode.data().id).nodeTokensMap.put(token.id, token);  /* put token into nodeTokensMap which in next node*/
        // nodesMap.get(targetNode.data().id).inputNodes.get(nodeObj.currentNode.data().id).put(token.id, token);
        nodesMap.get(targetNode.data().id).inputNodes.get(nodeObj.currentNode.data().id).push(token);
    }

    nodeObj.nodeObjTestFunction = function () {
        console.log("There is nodeObjTestFunction:" + nodeObj.id);
        console.log("There is nodeObj.nodeTokensMap.keySet():" + nodeObj.nodeTokensMap.keySet());
    }

    return nodeObj;
}


/**************************************************************************/

/**
 * *********  functions of HashMap()  **************
 *   var map = new HashMap();
 *   map.put("key1","Value1");
 *   map.put("key2","Value2");
 *   map.put("key3","Value3");
 *   map.put("key4","Value4");
 *   map.put("key5","Value5");
 *   alert("size："+map.size()+" key1："+map.get("key1"));
 *   map.remove("key1");
 *   map.put("key3","newValue");
 *   var values = map.values();
 *   for(var i in values){
 *       document.write(i+"："+values[i]+"   ");
 *   }
 *   document.write("<br>");
 *   var keySet = map.keySet();
 *   for(var i in keySet){
 *       document.write(i+"："+keySet[i]+"  ");
 *   }
 *   alert(map.isEmpty());
 */

function HashMap() {
    //定义长度
    var length = 0;
    //创建一个对象
    var obj = new Object();

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function () {
        return length == 0;
    };

    /**
     * 判断对象中是否包含给定Key
     */
    this.containsKey = function (key) {
        return (key in obj);
    };

    /**
     * 判断对象中是否包含给定的Value
     */
    this.containsValue = function (value) {
        for (var key in obj) {
            if (obj[key] == value) {
                return true;
            }
        }
        return false;
    };

    /**
     *向map中添加数据
     */
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            length++;
        }
        obj[key] = value;
    };

    /**
     * 根据给定的Key获得Value
     */
    this.get = function (key) {
        return this.containsKey(key) ? obj[key] : null;
    };

    /**
     * 根据给定的Key删除一个值
     */
    this.remove = function (key) {
        if (this.containsKey(key) && (delete obj[key])) {
            length--;
        }
    };

    /**
     * 获得Map中的所有Value
     */
    this.values = function () {
        var _values = new Array();
        for (var key in obj) {
            _values.push(obj[key]);
        }
        return _values;
    };

    /**
     * 获得Map中的所有Key
     */
    this.keySet = function () {
        var _keys = new Array();
        for (var key in obj) {
            _keys.push(key);
        }
        return _keys;
    };

    /**
     * 获得Map的长度
     */
    this.size = function () {
        return length;
    };

    /**
     * 清空Map
     */
    this.clear = function () {
        length = 0;
        obj = new Object();
    };
}

/**************************************************************************/


function openIt() {
    window.open("./test/page2.html", 400, 300);
}

/* change attributes*/
function popWin(ele) {
    let nodeName = ele.id();

    /* make change page appear*/
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';

    /* show id on page */
    document.getElementById('nodeName').innerHTML = nodeName;

    // document.getElementById('swTarget').value= checkValue(nodeName, "flag");
}

function popWindfm(ele) {
    let nodeName = ele.id();
    dfmobj = ele;
    console.log("nodeName:" + nodeName);

    /* make change page appear*/
    document.getElementById('dfmlight').style.display = 'block';
    document.getElementById('fade').style.display = 'block';

    // document.getElementById('swTarget').value= checkValue(nodeName, "flag");
}

function closeWindfm() {
    document.getElementById('dfmlight').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    clearDynamicContent();
    console.log(dfmobj.id());
    dfmobj = null;
}

function popWininputs(ele) {
    let nodeName = ele.id();
    ipsobj = ele;
    console.log("nodeName:" + nodeName);

    /* make change page appear*/
    document.getElementById('ipslight').style.display = 'block';
    document.getElementById('fade').style.display = 'block';

    // document.getElementById('swTarget').value= checkValue(nodeName, "flag");
}

function closeWininputs() {
    document.getElementById('ipslight').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    console.log(ipsobj.id());
    ipsobj = null;
}

function popWinensamble(ele) {
    let nodeName = ele.id();
    ipsobj = ele;
    console.log("nodeName:" + nodeName);

    /* make change page appear*/
    document.getElementById('ensamble_predict').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeWinensamble() {
    document.getElementById('ensamble_predict').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}

function closeWin() {

    let isConfirm = confirm("Are you sure?");

    if (isConfirm) {
        /*make change page disappear*/
        document.getElementById('light').style.display = 'none';
        document.getElementById('fade').style.display = 'none';

        let nodeName = document.getElementById('nodeName').innerHTML;
        //
        // console.log("document.getElementById('swTarget').value:"+ document.getElementById('swTarget').value);
        //
        // setValue(nodeName, 'flag', document.getElementById('swTarget').value);

        let node1 = document.getElementById('node1').value;
        let node2 = document.getElementById('node2').value;
        let symbol = document.getElementById('symbol').value;
        let target1 = document.getElementById('target1').value;
        let target2 = document.getElementById('target2').value;


        let value1 = checkValue(node1, 'value');
        let value2 = checkValue(node2, 'value');
        //
        let order = value1 + symbol + value2;
        console.log("order:" + order);

        if (eval(order)) {
            setValue(nodeName, 'flag', target1);
        } else {
            setValue(nodeName, 'flag', target2);
        }

        console.log(node1, node2, symbol, value1, value2);
    }

}

function cyInitialize(jsonUrl, cyId) {
    let toJson = function (res) {
        return res.json();
    };

    let cy = window.cy = cytoscape({
        container: document.getElementById(cyId),

        layout: {
            // name: 'cose'
            name: 'preset'
            // name: 'random'
            // name: 'grid'
            // name: 'circle'
            // name: 'concentric'
            // name: 'breadthfirst'
        },

        //fetch shape object
        //style: sbgnStylesheet(cytoscape),

        style: [
            {
                selector: '.input-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/input_v1.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },{
                selector: '.output-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/output_v1.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },{
                selector: '.GLM-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/GLM.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.DL-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/DL.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.RF-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/RF.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.DT-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/DT.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.GBT-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/GBT.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.SVM-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/SVM.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.Module-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/module.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.Inputs-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/inputs.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.Outputs-Operator',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/outputs.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: 'node',
                style: {
                    'shape': 'data(type)',
                    'label': 'data(id)',//JL2
                    'height': 40,
                    'width': 60,
                    'background-color': 'grey',
                }
            },
            {
                selector: 'edge',//edge JL
                style: {
                    'label': 'data(corr)',
                    'width': 3,
                    'curve-style': 'straight',
                    'line-color': '#000',
                }
            },
            {
                selector: "edge[arrow]",
                style: {
                    "target-arrow-shape": "data(arrow)"
                }
            },
            {
                selector: '.token',
                style: {
                    'shape': 'ellipse',
                    'label': 'data(id)',
                    'width': '20',
                    'height': '20',
                    'background-color': '#000',
                }
            },
            {
                selector: '.and',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    'shape': 'round-rectangle',
                    'background-image': 'static/img/btn-and.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/
                    /*make img fit to node*/
                    'background-fit': 'contain'
                }
            },

            {
                selector: '.or',
                style: {
                    'height': 50,
                    'width': 100,
                    'label': 'data(id)',
                    // 'shape': 'data(type)',
                    'shape': 'round-rectangle',
                    'background-color': '#55c720',
                    'background-image': 'static/img/btn-or.png',
                    'background-fit': 'contain',
                    'background-opacity': 0
                }
            },
            {
                selector: '.capsule',
                style: {
                    'width': 60,
                    'label': 'data(lab)',//JL2
                    'shape': 'data(type)',
                    'background-color': '#fff',
                    'font-weight': 'bold',
                    'color': '#000000',
                    'font-size': '15px'
                }
            },
            {
                selector: '.switch',
                style: {
                    'width': 100,
                    'height': 60,
                    'label': 'data(id)',
                    // 'shape': 'data(type)',
                    'shape': 'round-rectangle', /*set shape of 'switch', make switch png appear*/

                    'background-color': '#f29d3d',
                    'background-image': 'static/img/btn-switch.png',
                    'background-opacity': 0,    /*make background disappear but reserve img*/

                    // 'background-fit': 'cover'

                    /*make img fit to node*/
                    'background-fit': 'contain'

                    // 'background-clip': 'none',
                    // 'bounds-expansion': 50
                }
            },

            {
                selector: '.cond',
                style: {
                    'width': 60,
                    'label': 'data(id)',
                }
            },

            {
                selector: '.hub',
                style: {
                    'width': 60,
                    'label': 'data(id)',
                    'shape': 'rectangle',
                    'background-color': '#fff',
                    'background-image': 'static/img/dev-hub.png'

                }
            },
            {
                selector: '.temp',
                style: {
                    'width': 60,
                    'label': 'data(id)',
                    'shape': 'rectangle',
                    'background-color': '#fff',
                    'background-image': 'static/img/dev-temp.png'

                }
            },
            {
                selector: '.hum',
                style: {
                    'width': 60,
                    'label': 'data(id)',
                    'shape': 'rectangle',
                    'background-color': '#fff',
                    'background-image': 'static/img/dev-hum.png'

                }
            },
            {
                selector: '.act',
                style: {
                    'width': 60,
                    'label': 'data(id)',
                    'shape': 'rectangle',
                    'background-color': '#fff',
                    'background-image': 'static/img/dev-hum.png'

                }
            },
        ],
        //{ data: { id:'z4', label: 'IH=0.5 * {T + 61.0 + [(T-68.0)*1.2] + (RH*0.094)}' }},

        // elements: fetch('./data_3.json').then(toJson),/*efe*/
        elements: fetch(jsonUrl).then(toJson),/*efe*/
    });

    cy.fit(100); // fit to all the layouts

    // cy.autolock( true );

    cy.$('#s, #z1, #z2', '#z4', '#z5', '#z6', '#z7').makeLayout({
        name: 'circle',
        boundingBox: {
            x1: 0,
            y1: 0,
            x2: 500,
            y2: 500
        }

    }).run();

    /*cy.automove({
        nodesMatching: cy.$('#z3'),
        reposition: 'mean',
        meanOnSelfPosition: function( node ){ return false; }
    });

    // dragging mid drags its neighbourhood with it
    cy.automove({
        nodesMatching: cy.$('#z3').neighbourhood().nodes(),
        reposition: 'drag',
        dragWith: cy.$('#z3')
    });

    cy.automove({
        nodesMatching: cy.$('#SW1'),
        reposition: 'mean',
        meanOnSelfPosition: function( node ){ return false; }
    });

    // dragging mid drags its neighbourhood with it
    cy.automove({
        nodesMatching: cy.$('#SW1').neighbourhood().nodes(),
        reposition: 'drag',
        dragWith: cy.$('#SW1')
    });*/

    cy.fit(100); // fit to all the layouts

    // .automove-viewport nodes kept in viewport (even if added after this call)
    // convenient but less performant than `nodesMatching: collection`

    cy.automove({
        nodesMatching: '.automove-viewport',
        reposition: 'viewport'
    });

    var tgt1 = null;
    var tgt2 = null;
    var counter = 0;
    /*left mouse click*/
    cy.on('tap', function (evt) {
        var tgt = evt.target || evt.cyTarget; // 3.x || 2.x
        var nodeColor;


        if (tgt === cy) {

            if (nodeDrawType == OR) {
                /*draw on OR operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'or' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'or',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if (nodeDrawType == SWITCH) {
                /*draw SWitch*/
                var capsID = 'z' + Math.round(Math.random() * 2000);
                var swID = 'sw' + Math.round(Math.random() * 2000);
                // var andID = 'cond' + Math.round(Math.random() * 2000);
                var condID = 'cond' + Math.round(Math.random() * 2000);
                var edgeID = 'e' + Math.round(Math.random() * 2000);
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });


                cy.add({
                    classes: 'automove-viewport',
                    data: {id: swID, parent: '' + capsID, type: '' + nodeDrawType},

                    classes: 'switch',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    // data: { id: andID, parent: '' + capsID, type: 'AND'},
                    // data: { id: condID, parent: '' + capsID, type: 'AND'},
                    // data: { id: condID, parent: '' + capsID, type: 'AND', flag: 0},
                    data: {id: condID, parent: '' + capsID, type: 'COND', flag: 0},

                    classes: 'cond',
                    position: {
                        x: evt.position.x + 80,
                        y: evt.position.y
                    }
                });

                cy.add({
                    // data: { id: edgeID, source: andID, target: swID, arrow: 'triangle',}
                    data: {id: edgeID, source: condID, target: swID, arrow: 'triangle',}
                });

            }
            else if (nodeDrawType == HUB) {

                var capsID = 'HUB(Condition)' + Math.round(Math.random() * 2000);
                var swID = 'sw' + Math.round(Math.random() * 2000);
                var andID = 'cond' + Math.round(Math.random() * 2000);
                var edgeID = 'e' + Math.round(Math.random() * 2000);
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });


                cy.add({
                    classes: 'automove-viewport',
                    data: {id: swID, parent: '' + capsID, type: '' + nodeDrawType},

                    classes: 'switch',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: andID, parent: '' + capsID, type: 'AND'},

                    classes: 'and',
                    position: {
                        x: evt.position.x + 80,
                        y: evt.position.y
                    }
                });

                cy.add({
                    data: {id: edgeID, source: andID, target: swID, arrow: 'triangle',}
                });

            }
            else if (nodeDrawType == TEMP) {

                var capsID = 'zn' + Math.round(Math.random() * 2000);
                var andID = 'SENSOR(Temp)' + Math.round(Math.random() * 2000);
                var edgeID = 'e' + Math.round(Math.random() * 2000);

                if (cy.nodes().length < 1) {
                    andID = 's';
                }

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: andID, parent: capsID, type: '' + nodeDrawType},
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });


            }
            else if (nodeDrawType == HUM) {

                var capsID = 'zn' + Math.round(Math.random() * 2000);
                var andID = 'SENSOR(Humidity)' + Math.round(Math.random() * 2000);
                var edgeID = 'e' + Math.round(Math.random() * 2000);

                if (cy.nodes().length < 1) {
                    andID = 's';
                }

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: andID, parent: capsID, type: '' + nodeDrawType},
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });


            }
            else if (nodeDrawType == COOLER) {

                var capsID = 'zn' + Math.round(Math.random() * 2000);
                var andID = 'ACTUATOR(Cooler)' + Math.round(Math.random() * 2000);
                var edgeID = 'e' + Math.round(Math.random() * 2000);

                if (cy.nodes().length < 1) {
                    andID = 's';
                }

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE'},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: andID, parent: capsID, type: '' + nodeDrawType},
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });


            }
            else if(nodeDrawType == inputData){
                /*draw on inputData operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 's-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/
                var dataID = 'no data'+orID
                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'input-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                // cy.add({
                //     classes: 'automove-viewport',
                //     data: {id: dataID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                //     classes: 'input-Operator',
                //     position: {
                //         x: evt.position.x,
                //         y: evt.position.y
                //     }
                // });

                // cy.add({
                //     classes: 'automove-viewport',
                //     data: {id: dataID, type: 'CAPSULE'},

                //     classes: 'capsule',
                //     position: {
                //         x: evt.position.x,
                //         y: evt.position.y
                //     }
                // });

            }
            else if(nodeDrawType == outputData){
                /*draw on outputData operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'o-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'output-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if(nodeDrawType == GLM){
                /*draw on GLM operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'GLM-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if(nodeDrawType == DL){
                /*draw on DL operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'DL-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if(nodeDrawType == RF){
                /*draw on SVM operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'RF-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if(nodeDrawType == DT){
                /*draw on DT operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'DT-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            // else if(nodeDrawType == CSRD){
            //     /*draw on GBT operator*/
            //     var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
            //     var orID = 'CSV-' + lier_id +"-"+Math.round(Math.random() * 2000);
            //     var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/
            //     var value = document.mylist.myselect.value;
            //     data=select(temp,value);
            //     const strdata = JSON.stringify(data);
            //
            //     //add the element into the canvas
            //     cy.add({
            //         classes: 'automove-viewport',
            //         data: {id: capsID, type: 'CAPSULE'},
            //
            //         classes: 'capsule',
            //         position: {
            //             x: evt.position.x,
            //             y: evt.position.y
            //         }
            //     });
            //
            //     cy.add({
            //         classes: 'automove-viewport',
            //         data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType, csv_lier: lier_id, csv_data: strdata},
            //         classes: 'CSV-Image',
            //         position: {
            //             x: evt.position.x,
            //             y: evt.position.y
            //         }
            //     });
            //
            // }

            else if(nodeDrawType == GBT){
                /*draw on GBT operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'GBT-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            else if(nodeDrawType == SVM){
                /*draw on SVM operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'AI-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'SVM-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }

            else if(nodeDrawType == DFM){
                /*draw on SVM operator*/
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'DF-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'Module-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }

            else if(nodeDrawType == inputs){
                
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'ips-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'Inputs-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }

            else if(nodeDrawType == outputs){
                
                var capsID = 'zr' + Math.round(Math.random() * 2000);/*caption or random id for module*/
                var orID = 'ops-' + Math.round(Math.random() * 2000);/*random id for single node*/
                var edgeID = 'e' + Math.round(Math.random() * 2000);/*not used now*/

                /*add the element into the canvas*/
                cy.add({
                    classes: 'automove-viewport',
                    data: {id: capsID, type: 'CAPSULE', child: orID},

                    classes: 'capsule',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

                cy.add({
                    classes: 'automove-viewport',
                    data: {id: orID, parent: capsID, label: 'data(id)', type: '' + nodeDrawType,},
                    classes: 'Outputs-Operator',
                    position: {
                        x: evt.position.x,
                        y: evt.position.y
                    }
                });

            }
            // else {
            //
            //     var capsID = 'zn' + Math.round(Math.random() * 2000);
            //     var andID = 'z' + Math.round(Math.random() * 2000);
            //     var edgeID = 'e' + Math.round(Math.random() * 2000);
            //
            //     let classesName = 'and';
            //
            //     if (cy.nodes().length < 1) {
            //         andID = 's';
            //         classesName = 's';
            //     }
            //
            //     cy.add({
            //         classes: 'automove-viewport',
            //         data: {id: capsID, type: 'CAPSULE'},
            //
            //         classes: 'capsule',
            //         position: {
            //             x: evt.position.x,
            //             y: evt.position.y
            //         }
            //     });
            //
            //     cy.add({
            //         classes: 'automove-viewport',
            //         data: {id: andID, parent: capsID, type: '' + nodeDrawType},
            //
            //         classes: classesName,
            //         position: {
            //             x: evt.position.x,
            //             y: evt.position.y
            //         }
            //     });
            //
            //
            // }

            tgt1 = tgt2 = null;
            counter = 0;

        }
        else if (tgt.isNode()) {
            //console.log(tgt.selectionType());

            if (tgt1 == null) {
                if(tgt.data().id.indexOf('zr')){
                    tgt1 = tgt;
                }
                else{
                    tgt1 = cy.$('#' + tgt.data().child);

                }//JL3
                
                console.log('Saved ' + tgt1.id());
                counter = counter + 1;
            } else if (tgt2 == null) {
                if(tgt.data().id.indexOf('zr')){
                    tgt2 = tgt;
                }
                else{
                    tgt2 = cy.$('#' + tgt.data().child);

                }//JL3
                console.log('Saved' + tgt2.id());
                counter = counter + 1;
            }
            if (counter == 2) {
                if(tgt2.data().type != "Input-Operator"){//JL3
                    console.log('Connected!' + tgt1.id() + ' to ' + tgt2.id());//JL
                    if(tgt1.data().csv_data && tgt2.data().csv_data){
                        x=tgt1.data().csv_data;
                        y=tgt2.data().csv_data;
                        var correlation = parseAndCorrelate(x, y);
                        // (async () => {
                        //     correlation = await corr(x, y);
                        //     console.log("相关系数:", correlation);
                        // })();
                        console.log(correlation);
                    }
                    if(tgt1.id() != tgt2.id()){
                        if(tgt1.data().type == "Input-Operator" && tgt2.data().type == "Output-Operator"){
                            alert("Cannot connect input to output directly!");
                            tgt1 = tgt2 = null;
                            counter = 0;
                        }
                        else{
                            cy.add({
                                data: {source: '' + tgt1.id(), target: '' + tgt2.id(), "arrow": "triangle",'corr': correlation},
                            });
                            tgt1 = tgt2 = null;
                            counter = 0;
                            console.log("Cleared!");
                        }
                    }
                    else if(tgt1.id() == tgt2.id()){//JL3
                        counter = 1;
                        tgt2 = null;
                        console.log("cannot connect to it self");

                    }
                    //add to humanlist JIANG LE
                    // var exist1=0
                    // var exist2=0
                    // for (let a=0;a<humanlist.length;a++){
                    //     if(humanlist[a].id!=tgt1.id()){}
                    //     else{
                    //         exist1=1;
                    //     }
                    // }
                    // for(let a=0;a<humanlist.length;a++){
                    //     if(humanlist[a].id!=tgt2.id()){}
                    //     else{
                    //         exist2=1;
                    //     }
                    // }
                    // if(exist1==0&&exist2==0){
                    //     var v={
                    //         id: tgt1.id(),
                    //         csvcolumn: tgt1.data().csv_lier,
                    //         csvdata: tgt1.data().csv_data,
                    //         parent: [],
                    //         child: []
                    //     }
                    //     var v2={
                    //         id: tgt2.id(),
                    //         csvcolumn: tgt2.data().csv_lier,
                    //         csvdata: tgt2.data().csv_data,
                    //         parent: [],
                    //         child: []
                    //     }
                    //     v.child.push(v2.id);
                    //     v2.parent.push(v.id);
                    //     humanlist.push(v);
                    //     humanlist.push(v2);
                    //     console.log(humanlist);
                    // }
                    // if(exist1==0&&exist2==1){
                    //     var v={
                    //         id: tgt1.id(),
                    //         csvcolumn: tgt1.data().csv_lier,
                    //         csvdata: tgt1.data().csv_data,
                    //         parent: [],
                    //         child: []
                    //     }
                    //     var num;
                    //     for(let a=0;a<humanlist.length;a++){
                    //         if(humanlist[a].id==tgt2.id()){
                    //             num=a;
                    //         }
                    //     }
                    //     v.child.push(humanlist[num].id);
                    //     humanlist[num].parent.push(v.id);
                    //     humanlist.push(v);
                    //     console.log(humanlist);
                    // }
                    // if(exist1==1&&exist2==0){
                    //     var v2={
                    //         id: tgt2.id(),
                    //         csvcolumn: tgt2.data().csv_lier,
                    //         csvdata: tgt2.data().csv_data,
                    //         parent: [],
                    //         child: []
                    //     }
                    //     var num;
                    //     for(let a=0;a<humanlist.length;a++){
                    //         if(humanlist[a].id==tgt1.id()){
                    //             num=a;
                    //         }
                    //     }
                    //     v2.parent.push(humanlist[num].id);
                    //     humanlist[num].child.push(v2.id);
                    //     humanlist.push(v2);
                    //     console.log(humanlist);
                    // }
                    // if(exist1==1&&exist2==1){
                    //     var num1;
                    //     for(let a=0;a<humanlist.length;a++){
                    //         if(humanlist[a].id==tgt1.id()){
                    //             num1=a;
                    //         }
                    //     }
                    //     var num2;
                    //     for(let a=0;a<humanlist.length;a++){
                    //         if(humanlist[a].id==tgt2.id()){
                    //             num2=a;
                    //         }
                    //     }
                    //     humanlist[num1].child.push(humanlist[num2].id);
                    //     humanlist[num2].parent.push(humanlist[num1].id);
                    //     console.log(humanlist);
                    // }
                }
                else{
                    alert("Input node can't be connected");
                    tgt1 = tgt2 = null;
                    counter = 0;
                    console.log("Cleared!")
                }

            }
        }
        else if (tgt.isEdge()) {
            console.log('Is edge!');
        }
    });

    // /*right mouse click*/
    // cy.on('cxttap', 'node', function (evt) {
    //     console.log("evt:"+evt);
    //     let tgt = evt.target || evt.cyTarget; // 3.x || 2.x
    //     //
    //     // tgt.remove();
    //     // if (tgt.isEdge()) {
    //     //     source = tgt.getS
    //     //     tgt.remove('edge[target=\'' + nodeId + '\']');
    //     // }
    //
    //     console.log("tgt.data().id:"+ tgt.data().id);
    //     console.log(checkValue(tgt.data().id, "parent"));
    //
    // });

    /*right mouse click*/
    cy.cxtmenu({
        selector: 'node, edge, .cond',

        commands: [
            {
                content: 'edit',
                select: function (ele) {
                    // var str = "cy.$(\'" + id + "\').data()." + dataName; /* Splicing string */

                    console.log("ele.id():" + ele.id());
                    // openIt();
                    //如果ele的id是以DF开头的  
                    if(ele.id().indexOf('DF')!=-1){
                        popWindfm(ele);
                    }
                    else if(ele.id().indexOf('ips')!=-1){
                        popWininputs(ele);
                        console.log("OK");
                    }               

                    else{
                        text = ele.data().csv_lier;
                        document.getElementById('selected_data').innerText ='Data:  '+ text;
                        popWin(ele);
                    }
                }
            },

            {
                // content: '<span class="fa fa-star fa-2x"></span>',
                content: 'delete',
                select: function (ele) {
                    // console.log(ele.data().id);
                    console.log("delete:" + ele.id());
                    cy.$('#' + ele.id()).remove();
                    if(ele.data().parent){
                        cy.$('#' + ele.data().parent).remove();
                        console.log("delete:" + ele.data().parent);
                    }//JL3
                },
                // enabled: false
            },

            {
                content: 'predict',
                select: function (ele) {
                    if(ele.data().id.indexOf('DF')!=-1){
                        //找到ele的输入节点
                        var list = cy.$('#' + ele.id()).incomers();
                        //筛选出id中包含ips的节点
                        var inputNode;
                        for(let a=0;a<list.length;a++){
                            if(list[a]._private.data.id.indexOf('ips')!=-1){
                                inputNode=list[a];
                                console.log(inputNode._private.data.id);
                            }
                        }
                        //输出这些节点的id
                        eid=inputNode._private.data.id;
                        console.log(list.length);
                        //如果节点数量不恰好为2个(一个节点和它的parent)，报错
                        if(list.length!=2){
                            alert("Please select data , module node should have one \"inputs\" node!");
                        }
                        else{
                            //如果ele的dfmurl为空，报错
                            if(ele.data().dfmurl==null){
                                alert("Please select dataflow!");
                            }
                            else{
                                //获取cy中id为inputNode._private.data.id的节点
                                

                                var inputNode=cy.$('#' + eid);
                                //如果inputNode的ipsurl为空，报错
                                if(inputNode.data().ipsurl==null){
                                    alert("Please select data!");
                                }
                                else{
                                    //获取inputNode的ipsurl和ele的dfmurl
                                    var ipsurl=inputNode.data().ipsurl;
                                    var dfmurl=ele.data().dfmurl;
                                    var filename=ele.data().id;
                                    //传给后端
                                    // $.ajax({
                                    //     url: '/predictips',
                                    //     type: 'POST',
                                    //     contentType: 'application/json',
                                    //     data: JSON.stringify({ ipsurl: ipsurl, dfmurl: dfmurl }),
                                    //     success: function(response) {
                                    //         // 处理响应
                                    //         console.log('预测结果文件路径:', response);
                                    //         // 你可以在这里更新页面，显示预测结果或者提供下载链接
                                    //     },
                                    //     error: function(error) {
                                    //         // 处理错误情况
                                    //         console.error('请求错误:', error);
                                    //     }
                                    // });

                                    $.ajax({
                                        url: '/overrallpredictmodule',
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify({ ipsurl: ipsurl, dfmurl: dfmurl, file_name: filename }),
                                        success: function(response) {
                                            var newWindow = window.open();
                                            // root = response.file_root;
                                            var root = response.file_root.replace(/\\/g, '/');
        
                                            // 构建HTML内容，包括下载按钮和JavaScript代码
                                            var htmlContent = response.data +
                                                '<button id="downloadBtn">Download</button>' +
                                                '<script>' +
                                                '   function triggerDownload() {' +
                                                '       var downloadUrl = "/download/" + "' + root + '";' +  // 使用保存的文件路径
                                                '       var a = document.createElement("a");' +
                                                '       a.href = downloadUrl;' +
                                                '       a.style.display = "none";' +
                                                '       document.body.appendChild(a);' +
                                                '       a.click();' +
                                                '       document.body.removeChild(a);' +
                                                '   }' +
                                                '   document.getElementById("downloadBtn").onclick = triggerDownload;' +
                                                '</script>';

                                            // 将HTML内容写入新窗口
                                            newWindow.document.write(htmlContent);
                                            newWindow.document.close();
                                        },
                                        error: function(error) {
                                            // 处理错误情况
                                            console.error('请求错误:', error);
                                        }
                                    });
                                    
                                }

                            }
                        }

                        
                    }

                    else if(ele.data().id.indexOf('ops')!=-1){
                        for (i=0; i<ele.incomers().length;i++){
                            console.log(ele.incomers()[i]._private.data.id)
                            if(ele.incomers()[i]._private.data.id.indexOf('DF')!=-1){
                                modulelist.push(ele.incomers()[i]._private.data.id)
                                if (nowclumname == null){
                                    // nowclumname = ele.incomers()[i]._private.data.csv_lier;
                                    nowclumname = "passed"
                                    
                                }
                                if(nowclumname != ele.incomers()[i]._private.data.csv_lier){
                                    same_output = 0;
                                }

                                    
                            }
                            if(ele.incomers()[i]._private.data.id.indexOf('AI')!=-1){
                                predictlist.push(ele.incomers()[i]._private.data.id)
                                if (nowclumname == null){
                                    nowclumname = ele.incomers()[i]._private.data.csv_lier;
                                }
                                if(nowclumname != ele.incomers()[i]._private.data.csv_lier){
                                    same_output = 0;
                                }
                            }
                        }
                        console.log(predictlist);
                        console.log(modulelist);
                        console.log("是否满足集成学习:"+same_output);
                        console.log("已传输"+nowclumname);
                        popWinensamble(ele);
                        
                        

                    }

                    else{
                        if (ele.data().csv_lier != null&&ele.data().order != null) {
                            showModal(ele.data().order,ele.data().csv_lier,ele.data().model_name);
                        }
                        else if(ele.data().csv_lier == null){
                        alert("Please select data and train model first!");
                        }
                        else if(ele.data().order == null){
                            alert("No model, Please train model first!");
                        }
                    }
                    

                }
            },
            {
                // 20221207 predict
                content: 'train',
                select: function (ele) {
                    // console.log(ele.data().id);
                    nowobj=ele;
                    text='';
                    text2=ele.data().csv_lier;
                    console.log(":" + ele.id());
                    console.log(cy.$('#' + ele.id()).incomers());
                    list = cy.$('#' + ele.id()).incomers();
                    for(let a=0;a<list.length;a++){
                        if(list[a]._private.data.id.indexOf('s')){}
                        else{
                            //console.log(list[a]._private.data.id);
                            console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier)
                            text =text + cy.$("#"+list[a]._private.data.id).data().csv_lier+','
                        }
                        if(list[a]._private.data.id.indexOf('AI')){}
                        else{
                            try{
                            //console.log(list[a]._private.data.id);
                            console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier)
                            text =text + cy.$("#"+list[a]._private.data.id).data().csv_lier+','
                        }catch{}
                        }
                    }
                    console.log(text);
                    document.getElementById('mytraining').innerText=text;
                    document.getElementById('mypredict').innerText=text2;
                    document.getElementById('predict').style.display = 'block';
                    document.getElementById('fade').style.display = 'block';
                },
                // enabled: false
            },

        ]
    });

    /*right mouse click*/
    // cy.cxtmenu({
    //     // selector: 'core',
    //     // selector: 'capsule',
    //
    //     commands: [
    //         {
    //             content: 'bg1',
    //             select: function () {
    //                 console.log('bg1');
    //             }
    //         },
    //
    //         {
    //             content: 'bg2',
    //             select: function () {
    //                 console.log('bg2');
    //             }
    //         },
    //
    //     ]
    // });

}


document.addEventListener('DOMContentLoaded', function () {

    let jsonUrl = 'static/data/data_default.json';
    // jsonUrl = './data_3.json';
    // jsonUrl = './data (17).json';
    // jsonUrl = './data_improvement2.json';
    // jsonUrl = './data_data pile-up.json';

    cyInitialize(jsonUrl, "cy");
});

// function openFile(){
// 	console.log("there is openFile:");
// }

function saveFile() {
    var jdata = cy.elements().jsons();

    console.log("jdata:" + jdata);

    /// write to file
    var txtFile = "test.json";

    // (A) CREATE BLOB OBJECT
    var myBlob = new Blob([JSON.stringify(jdata, null, 2)], {type: 'text/plain'});

    // (B) CREATE DOWNLOAD LINK
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "data.json";

    // (C) "FORCE DOWNLOAD"
    // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
    // BETTER TO LET USERS CLICK ON THEIR OWN
    anchor.click();
    window.URL.revokeObjectURL(url);
    document.removeChild(anchor);
}

function temptest() {
    console.log("ok");
}

// function addNodeWithData(){
//     var value = document.mylist.myselect.value;
//     lier_id=value;
//     nodeDrawType = CSRD;
//     //ar a=document.getElementById("aaa").value;
//     //console.log(a);
//
//
//     //run(a);
// }

function setCAPSULE() {
    nodeDrawType = CAPSULE;
}

function setAND() {
    nodeDrawType = AND;
}

function setOR() {
    nodeDrawType = OR;
}

function setSWITCH() {
    nodeDrawType = SWITCH;
}

function setHUB() {
    nodeDrawType = HUB;
}

function setTEMP() {
    nodeDrawType = TEMP;
}

function setHUM() {
    nodeDrawType = HUM;
}

function setCOOLER() {
    nodeDrawType = COOLER;
}


function setInput() {
    nodeDrawType = inputData;
}
function setOutput() {
    nodeDrawType = outputData;
}
function setGLM() {
    nodeDrawType = GLM;
}

function setDL() {
    nodeDrawType = DL;
}

function setRF() {
    nodeDrawType = RF;
}

function setDT() {
    nodeDrawType = DT;
}

function setGBT() {
    nodeDrawType = GBT;
}

function setSVM() {
    nodeDrawType = SVM;
}

function setDFM() {
    nodeDrawType = DFM;
}

function setInputs() {
    nodeDrawType = inputs;
}

function setOutputs() {
    nodeDrawType = outputs;
}

function deleteElement() {
    cy.$(':selected').remove();
}

function Token(id, label, data, position, cNode, color) {
    const obj = {};

    if (id == null) {
        obj.id = tokenCounter++;
    } else {
        obj.id = id;
    }

    obj.label = "token" + obj.id;
    obj.data = data;
    obj.color = color;
    obj.position = position;
    obj.currentNode = cNode;

    obj.node = cy.add({
        classes: 'token',
        data: {id: "t" + obj.id, label: obj.label},
        renderedPosition: {x: obj.position.x, y: obj.position.y},
        position: {x: obj.position.x, y: obj.position.y}
    });

    // tokenCounter = tokenCounter + 1;
    //console.log(obj.id);

    obj.testFunction = function () {
        console.log("There is testFunction:" + obj.id);
    }

    obj.moveBySelf = function () {
        let currentNode = obj.currentNode;
        let allTargetNodes = currentNode.outgoers();//output node of source. For example, for s, it is z542, z12, z138
        let inPathNums = currentNode.incomers().length / 2;
        let outPathNums = allTargetNodes.length / 2;/* because of edge nodes, divided by 2*/

        /* for test */
        var initPos = cy.$('#' + currentNode.outgoers()[1]).renderedPosition();
        console.log("cy.$('#' + currentNode.outgoers()[1]).renderedPosition():" + initPos.x);

        obj.move(currentNode.outgoers()[1].data().id);

        // if(inPathNums == 0){    /* it's a start node*/
        //
        //     if(outPathNums == 1){
        //         obj.move(currentNode.outgoers()[1].data().id);  /* move to next node*/
        //     }else{
        //         for (let i = 0; i < outPathNums; i++) {
        //             let x = Token(null, null, obj.data, obj.position, cNode, 'green');
        //             tokenMap.put(x.id, x);
        //         }
        //         cy.$('#t' + obj.id).style("opacity", "0");
        //         tokenArray = arrayRemove(tokenArray, tokenArray[0]);
        //     }
        //
        // }else{
        //     obj.move(currentNode.outgoers()[1].data().id);
        // }

    }

    obj.move = function (targetNode) {
        var target = cy.$('#' + targetNode);
        console.log('(Move) Target id :' + targetNode);

        var targetEdge = target.connectedEdges();
        console.log(target.connectedEdges());

        console.log("time111111:" + Date());
        obj.node.animate({
            //position: { x: "300", y: "140" },
            // position: {x: target.position().x, y: target.position().y - 30},
            position: {x: target.position().x, y: target.position().y},
            style: {backgroundColor: 'red'}
        }, {
            duration: 2000  /* move speed */
        });

        obj.position = target.position();
        //cy.$('#' + obj.id).position = target.position();
        // cy.$('#' + obj.id).renderedPosition = target.position();
        cy.$('#t' + obj.id).shift({
            x: target.position().x - obj.node.position().x,
            y: target.position().y - obj.node.position().y
        });

        obj.position = cy.$('#t' + obj.id).renderedPosition();
        //obj.position().y = cy.$('#t' + obj.id).renderedPosition().y;

        console.log(obj.node);

        obj.currentNode = target;
        //cy.$('#t' + obj.id).style("opacity", "0.5");

        console.log("time2222:" + Date());

    }

    obj.copy = function (num, cNode) {
        var copyArray = new Array();
        var i = 0;
        console.log('>Copy from:' + obj.id);

        for (i = 0; i < num; i++) {
            var newid = tokenCounter + 1;
            var x = Token(newid, 'token' + newid, obj.data, obj.position, cNode, 'green');
            copyArray.push(x);
            console.log('>Generated new token:' + cy.$('#t' + newid).data().id + ' Pos:' + obj.position.x + ',' + obj.position.y);
            cy.$('#t' + obj.id).style("opacity", "0");
            //cy.$('#t' + newid).style("display", "none");
        }

        return copyArray;
    }

    obj.merge = function (cNode) {
        /*****************************************************************************************/
        /*****************************************************************************************/

        /* create new token*/
        var y = obj;
        var newid = tokenCounter + 1;
        y = Token(newid, 'token' + newid, obj.data, obj.position, cNode, 'green');


        var count = tokenArray.length;
        for (var k = 0; k < count; k++) {
            // if(tokenArray[0].id != tokenArray[k].id && tokenArray[0].position.x == tokenArray[k].position.x){
            // 	cy.$('#t' + tokenArray[k].id).style("opacity", "0");
            // 	tokenArray = arrayRemove(tokenArray, tokenArray[k]);
            // }
            cy.$('#t' + tokenArray[0].id).style("opacity", "0");/*make token disappear*/
            tokenArray = arrayRemove(tokenArray, tokenArray[0]);
        }
        tokenArray.push(y);
        return y;
        /*****************************************************************************************/
        /*****************************************************************************************/


        // var i = 0;
        // var j = 0;
        // var x = obj;

        // for (i = 0; i < tokenArray.length; i++) {
        // 	for (j = 0; j < tokenArray.length; j++) {
        // 		//console.log("Merging node i:" + tokenArray[i].currentNode.data().id);
        //        // console.log("Merging node j:" + tokenArray[j].currentNode.data().id);
        //
        //         // if (tokenArray[i].id != tokenArray[j].id && tokenArray[i].position == tokenArray[j].position) {
        //         if (tokenArray[i].id != tokenArray[j].id && tokenArray[i].position.x == tokenArray[j].position.x) {
        //         // if (tokenArray[i].id != tokenArray[j].id ) {
        // 			console.log("Merging...");
        //
        //             var newid = tokenCounter + 1;
        // 			x = Token(newid, 'token' + newid, obj.data, obj.position, cNode, 'green');
        //
        //             //cy.$('#t' + newid).style("opacity", "0");
        // 			//console.log('>Generated new MERGED token: t' + x.id + ' Pos:' + x.position.x + ',' + x.position.y);
        // 			//console.log("POPED: t" + tokenArray[j].id);
        // 			//tokenArray.pop(tokenArray[j]);
        // 			//tokenArray.pop(tokenArray[i]);
        //
        //             cy.$('#t' + tokenArray[j].id).style("opacity", "0");
        //             cy.$('#t' + tokenArray[i].id).style("opacity", "0");
        //             tokenArray = arrayRemove(tokenArray, tokenArray[j]);
        //             tokenArray = arrayRemove(tokenArray, tokenArray[i]);
        // 			tokenArray.push(x);
        //             //nextTokenArray.push(x);
        //             console.log("After Merged:");
        //
        //             showTokenArray("MERGE");
        //         }
        //     }
        // }
        //
        // return x;


    }

    return obj;
}

/*function to fire token*/
function fireToken(token, index) {

    //console.log("Firing token... with " + tokenArray.length + " tokens.");
    //console.log(token);
    console.log("console.log(index);" + index);

    var n = tokenArray.length;//number of tokens
    var newMergedToken = null;

    //for (i = 0; i < n; i++) {
    console.log("NOW Firing : t" + token.id);

    //console.log(token);
    //console.log("Current Node : " + source.data().id);
    //console.log(source);


    //console.log('Source id:' + source.id());
    //console.log('Outgoers num:' + pathnum);
    //console.log('Outgoers num:' + targets[0].data().id);
    var source = token.currentNode;//for initial token for example is 's'

    var copiedTokens = new Array();
    //var mergedToken = null;
    var tokenNum = 1;

    /*******************for test****************************/
    /*******************for test****************************/
        // cy.$('#t'+newid).data().id
    var incomersList = source.incomers();
    console.log("incomersList.length==>>>" + incomersList.length);

    if (incomersList.length > 0) {
        for (var i = 0; i < incomersList.length; i++) {
            console.log("incomersList[" + i + "].data().id--->" + incomersList[i].data().id);
            console.log("incomersList[" + i + "].data().flag--->" + incomersList[i].data().flag);
        }
        // console.log("incomersList[0].data().id==>>>"+incomersList[1].data().id);
    }
    // console.log("source.incomers()[0]----->"+ (source.incomers()[0].data().id) );
    /*******************for test****************************/
    /*******************for test****************************/

    //for merging
    // if (source.incomers().length > 1) {
    if (source.incomers().length > 2) {/*************************************************************/
        /* incomers().length/2 is pathNum*/
        // tokenArray = arrayRemove(tokenArray, token);
        token = token.merge(source);
        source = token.currentNode;

    }
    console.log(source.incomers().length);

    var targets = source.outgoers();//output node of source for example of s is z542, z12, z138
    console.log("source.outgoers():" + targets.length);
    var pathnum = targets.length / 2;

    if (pathnum > 1) {
        /*if the path is more than 1 */
        copiedTokens = token.copy(pathnum, source);
        //tokenArray.pop(token);
        tokenArray = arrayRemove(tokenArray, token);
        //console.log('New Array(pop):' + tokenArray.length);
        tokenNum = copiedTokens.length;

        // if (token.currentNode.data().id.includes('swc')) {//if it is switch
        if (token.currentNode.data().id.includes('sw')) {//if it is switch
            //SWITCH
            /* tokenArray = arrayRemove(tokenArray, token);
             token = token.merge(source);
             source = token.currentNode;
             targets = source.outgoers();
             token.move(targets[Math.floor(Math.random()*k)].data().id);*/

            console.log('Copied new tokens:' + tokenNum);
            console.log('New Array length:' + tokenArray.length);
            //n = tokenArray.length;
            var k = 1;
            //console.log('k:' + k);

            var randPath = Math.floor(Math.random() * 1);//for example only one output for the token
            console.log("Move Copied Token: t" + copiedTokens[0].id + "--> " + targets[1].data().id);

            /**************** new ******************/
            /**************** new ******************/

                // cy.$('#cond1831').data().flag = 2;/*set value of flag of cond1831 module*/
            var incomersList1 = token.currentNode.incomers();/*get incomers' Array*/
            for (var i = 0; i < incomersList.length; i++) {
                if (incomersList1[i].data().id.includes('cond')) {/*find condition module from incomers*/
                    var condFlag = incomersList1[i].data().flag;/* get flag of cond*/
                    console.log("condFlag--->" + condFlag);
                }
            }

            /*if cond exist*/
            // if(condFlag>0){
            // 	copiedTokens[0].move(targets[condFlag * 2 - 1].data().id);/*move by condFlag*/
            // 	copiedTokens[0].currentNode = targets[condFlag * 2 - 1];
            // 	tokenArray.push(copiedTokens[0]);
            // }
            if (condFlag != 0) {
                for (var i = 0; i < targets.length; i++) {
                    if (targets[i].data().id.includes(condFlag)) {
                        copiedTokens[0].move(targets[i].data().id);
                        copiedTokens[0].currentNode = targets[i];
                        tokenArray.push(copiedTokens[0]);
                    }
                }
            }


            /**************** new ******************/
            /**************** new ******************/

            /****************old***************/
            /****************old***************/
            // /*can change*/
            // copiedTokens[0].move(targets[1].data().id);/*move token from switch*/
            // /*if target is switch s then output is z1,z2 target[0].data.id = 'z1', target[1].data.id*/
            //
            // copiedTokens[0].currentNode = targets[1];
            // tokenArray.push(copiedTokens[0]);
            /****************old***************/
            /****************old***************/

            /*two importants tokenArray function is tokenArray.push() and tokenArray.remove()*/
            /*tokenArray.push() saves token into the arrayRemove*/
            /*tokenArray.remove() deletes token from the array*/

            //cy.$('#t' + copiedTokens[j].id).style("opacity", "0");
            // k = k + 2;
            // }

            for (j = 1; j < copiedTokens.length; j++) {
                tokenArray = arrayRemove(tokenArray, copiedTokens[j]);
            }

        } else {
            //current node is not switch
            console.log('Copied new tokens:' + tokenNum);
            console.log('New Array length:' + tokenArray.length);
            //n = tokenArray.length;
            var k = 1;

            for (j = 0; j < copiedTokens.length; j++) {

                //console.log('k:' + k);
                console.log("Move Copied Token: t" + copiedTokens[j].id + "--> " + targets[k].data().id);
                copiedTokens[j].move(targets[k].data().id);
                copiedTokens[j].currentNode = targets[k];
                //cy.$('#t' + copiedTokens[j].id).style("opacity", "0");
                k = k + 2;
            }


            var l = 0;
            for (l = 0; l < copiedTokens.length; l++) {
                if (!tokenArray.includes(copiedTokens[l])) {
                    tokenArray.push(copiedTokens[l]);
                }

            }

        }

        //tokenArray.fireToken();
        //fired = true;
        //tokenArray.pop(token);
        //showTokenArray();
        //console.log(copiedTokens[i]);
        //copiedTokens[k].move('z4');

    } else {
        /*if pathnum is 1*/
        //console.log("ONE PATH to : " + source.outgoers()[1].data().id);
        var copiedToken = token.copy(1, source.outgoers()[1])[0];/* outgoers()[1] means next node */
        //tokenArray.pop(token);
        tokenArray = arrayRemove(tokenArray, token);
        copiedToken.move(source.outgoers()[1].data().id);
        copiedToken.currentNode = source.outgoers()[1];
        //cy.$('#t' + copiedToken.id).style("opacity", "0");
        if (!tokenArray.includes(copiedToken)) {
            tokenArray.push(copiedToken);
        }
        //fired = true;
        //console.log(source.outgoers()[1].data().id);
    }
    //for copying () pathnum is the number of path from current node

    showTokenArray("FIRED");
    //tokenArray = nextTokenArray();
}

// function initializeCond() {
// 	cy.$('#cond1831').data().flag = "z509";
// }
function initializeCond() {
    /*get value of attributes */
    let signal = checkValue("#s", "signal");
    let speed = Number(checkValue("#s", "speed"));
    let pedestrian = checkValue("#cond489", "pedestrian")

    let value;
    if (signal == "red") {
        value = "z1205"
    } else if (signal == "yellow") {
        value = (speed > 40) ? "z1289" : "z35"
    } else if (signal == "green") {
        value = (speed > 60) ? "z1166" : "z35";
    }
    setValue("#cond1140", "flag", value);/*set value by conditions*/

    value = (pedestrian == true) ? "z972" : "z186";
    setValue("#cond489", "flag", value);
}

/**
 * check value of nodes
 * @param id
 * @param dataName
 * @returns {any}
 */
function checkValue(id, dataName) {
    var str = "cy.$(\'#" + id + "\').data()." + dataName; /* Splicing string */
    console.log("str:" + str);
    // console.log("checkValue test:" + eval(str));

    return eval(str);/*make String become code */
}

/**
 * set value of nodes
 * @param id
 * @param dataName
 * @param value
 */
function setValue(id, dataName, value) {
    var str = "cy.$(\'#" + id + "\').data()." + dataName + "= \'" + value + "\';"; /* Splicing string */
    /*cy.$('#cond1140').data().flag= 'z35';*/
    console.log("str:" + str);

    eval(str);/*make String become code */
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}

function backwardPlay() {

}


function initializeToken(source) {
    var initPos = cy.$('#' + source).renderedPosition();//initial position(x,y) is = '#s'
    //console.log(initPos);
    var i = 0;
    if (!initToken) {
        //Token(id, label, data, position, color)
        for (i = 0; i < 1; i++) {
            /*generate new token*/
            // var newToken = Token(tokenArray.length + 1, 'token1', 'true', {
            var newToken = Token(null, 'token1', 'true', {
                x: initPos.x + 10,
                y: initPos.y + 10
                // x: initPos.x ,
                // y: initPos.y
            }, cy.$('#' + source), 'red');
            //newToken.currentNode = cy.$('#' + source);
            console.log(newToken.label);

            tokenArray.push(newToken);/*save the new token into the data array*/
            tokenMap.put(newToken.id, newToken);
            // tokensMap.put(newToken.id, newToken);

            if (!nodesMap.containsKey(source)) {
                let nodeObj = Node(source, {x: initPos.x + 10, y: initPos.y + 10}, cy.$('#' + source));
                nodesMap.put(source, nodeObj);
            }

            nodesMap.get(source).inputNodes.put("start", new Array());
            nodesMap.get(source).inputNodes.get("start").push(newToken);/* save token to Array */

            // nodesMap.get(source).nodeTokensMap.put(newToken.id, newToken);

            console.log("nodesMap--->" + nodesMap);
            console.log("newToken.id--->" + newToken.id);
            // console.log("nodesMap.get('s').nodeTokensMap.get(newToken.id).label------>" + nodesMap.get('s').nodeTokensMap.get(0).label);

            console.log(tokenArray);
        }

        // initToken = true;

        console.log("Initialized token.");
    }
}

function Play() {

    console.log("time:" + Date());
    initializeToken('s');
    initializeToken('z1538');
    initToken = true;

    /*for test*/
    // let newNode = Node("eddie", null, cy.$('#z138'));
    // nodesMap.put("eddie", newNode);
    // let keys = nodesMap.keySet();
    // for(let i=0;i<keys.length;i++){
    //     console.log("key---->"+keys[i]);
    // }

    /*initialize condition of switch*/
    // initializeCond();
}

var testNum = 0;

function forwardPlay() {
    // tokenArray[0].moveBySelf();
    console.log("tokenMap.keySet():" + tokenMap.keySet());

    // nodesMap.get('s').move();

    let move_loop = setInterval(function () {
        moveTimer()
    }, 2000);

    function moveTimer() {

        let initPos = cy.$('#s').renderedPosition();
        let initPos2 = cy.$('#z1538').renderedPosition();
        let newToken = Token(null, 'token1', 'true', {
            x: initPos.x + 10,
            y: initPos.y + 10
            // x: initPos.x ,
            // y: initPos.y
        }, cy.$('#s'), 'red');

        let newToken2 = Token(null, 'token1', 'true', {
            x: initPos2.x + 10,
            y: initPos2.y + 10
            // x: initPos.x ,
            // y: initPos.y
        }, cy.$('#z1538'), 'red');
        // nodesMap.values()[0].nodeTokensMap.put(newToken.id, newToken);
        // nodesMap.values()[0].inputNodes.get("start").put(newToken.id, newToken);
        // nodesMap.values()[0].inputNodes.put("start", new Array());
        nodesMap.values()[0].inputNodes.get("start").push(newToken);
        nodesMap.values()[0].inputNodes.get("start").push(newToken2);

        // initToken = true;
        let values = nodesMap.values();
        for (let i = 0; i < values.length; i++) {
            values[i].moveByNode();/*e.g zn1250*/

            // values[i].nodeObjTestFunction();
        }

        /*for test*/
        if(nodesMap.containsKey("z996")){
            let node = nodesMap.get("z996");
            let inputNode = node.inputNodes;
            let array = inputNode.get("z270");
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>array.length:"+array.length);;
        }

    }


    // tokenMap.get('0').moveBySelf();

    // if (initToken) {/*if initial token 'token1' is exist*/
    //     tokenArray.forEach(fireToken);/*call fire toke function every time forwardPlay is called*/
    // }

    /*timer */
    // let myVar = setInterval(function(){myTimer()},2000);
    //
    // function myTimer(){
    //     for (let i = 0; i < tokenArray.length; i++) {
    //         console.log("forwardPlay() -> tokenArray "+i+":id: "+tokenArray[i].id);
    //     }
    //
    //     //initializeToken('s');
    //     //console.log(tokenArray[0]);
    //
    //     if (initToken) {/*if initial token 'token1' is exist*/
    //         //console.log(tokens[0]);
    //         /*tokenArray[0].move("z3");
    //         tokenArray[0].move("z1");
    //         tokenArray[0].move("z4");
    //         tokenArray[0].move("z2");*/
    //
    //         // var count = tokenArray.length;
    //         // for (var i = 0; i < count; i++) {
    //         // 	fireToken(tokenArray[i]);
    //         // }
    //
    //         tokenArray.forEach(fireToken);/*call fire toke function every time forwardPlay is called*/
    //         //fireToken(tokenArray);
    //         //console.log("Token Array NOW:");
    //         //console.log(tokenArray);
    //
    //     }
    //
    //     //console.log(cy.nodes());
    //     // initializeToken('s');
    //     //initToken = false;
    //     console.log('Animating nodes...');
    //
    // }


}

function showTokenArray(label){
    console.log(label + " Token Array:");
    console.log(tokenArray);
}

function openFile() {
    let fileInput = document.getElementById('btn-open');

    let jsonUrl = URL.createObjectURL(new Blob([fileInput.files[0]]));

    console.log("fileInput.files[0].name:" + fileInput.files[0].name);

    cyInitialize(jsonUrl, "cy");

    /* initialize attributes again*/
    tokenCounter = 0;
    initToken = false;
    fired = false;
    tokenArray.length = 0;
    nodeDrawType = NONE;
}

function generateHints(){


}

function popHints() {
    // let nodeName = ele.id();

    /* make change page appear*/
    document.getElementById('id_hints').style.display = 'block';
    document.getElementById('fade_hints').style.display = 'block';

    /* show id on page */
    // document.getElementById('nodeName').innerHTML = nodeName;

    // document.getElementById('swTarget').value= checkValue(nodeName, "flag");
}

function closeHints() {
    document.getElementById('id_hints').style.display = 'none';
    document.getElementById('fade_hints').style.display = 'none';

}

function closepredict() {
    document.getElementById('predict').style.display = 'none';
    document.getElementById('fade').style.display = 'none';

}

function AI_programming(){
    // let jsonUrl = 'static/data/a2.json';
    let jsonUrl = 'static/data/new_dataflow2.json';
    // jsonUrl = 'static/data/data_3.json';
    // jsonUrl = 'static/data/data (17).json';
    // jsonUrl = 'static/data/data_improvement2.json';
    // jsonUrl = 'static/data/data_data pile-up.json';
    cyInitialize(jsonUrl, "cy2");

    /* initialize attributes a  ain*/
    tokenCounter = 0;
    initToken = false;
    fired = false;
    tokenArray.length = 0;
    nodeDrawType = NONE;
}
function AI_programming2(){
    let jsonUrl = 'static/data/data_after.json';
    cyInitialize(jsonUrl, "cy");

    /* initialize attributes again*/
    tokenCounter = 0;
    initToken = false;
    fired = false;
    tokenArray.length = 0;
    nodeDrawType = NONE;
}
function showsting(){   
    t=visitAllNode(0,'','');
    console.log(t.strname)
    finaldata=t.strname+"@%&"+t.strdata;
    return finaldata;
    
}
//从第num个node开始访问cy剩余node
function visitAllNode(num,strdata,strname){
    try{
        cy.elements()[num]._private.data.id;
    }
    catch(err){ 
        return {strdata,strname}
    }
    if(cy.elements()[num]._private.data.csv_lier){
        clum = cy.elements()[num]._private.data.csv_lier;
        data = cy.elements()[num]._private.data.csv_data;
        // console.log("列名："+ clum + " csv数据：" +data);
        strdata=strdata+data+'#';
        strname=strname+clum+',';                   
    }
    return visitAllNode(num+1,strdata,strname);
    }

function selecthumanlist(id){
    for(let a=0;a<humanlist.length;a++){
        if(humanlist[a].id==id){
            return humanlist[a];
        }
    }
}
function predicttest(){
    var targetlist=[];
    var target;
    var trainingdata='';
    for(let a=0;a<humanlist.length;a++){
        if(humanlist[a].child.length==0){
            targetlist.push(humanlist[a].id);
        }
    }
    console.log(targetlist);
    
    if(targetlist!=[]){
        d=selecthumanlist(targetlist[0]);
        console.log(d);
        target=d.csvcolumn;
        for(let a=0;a<d.parent.length;a++){
            trainingdata=trainingdata+selecthumanlist(d.parent[a]).csvcolumn+',';
        }
        console.log(trainingdata);

        // predict(trainingdata,target);
    }
    // function predict(trainingdata,target){
    finaldata=trainingdata+'@TGT:targetis@'+target;
    console.log(finaldata);
    return finaldata;
    // }
}

function testincomer(){
    console.log("id is:"+cy.elements()[1]._private.data.id+"\n");
    list = cy.elements()[1].incomers();
    console.log(list[1]._private.data.id);
    // console.log(cy.elements()[1].incomers()[1]._private.data.id);
}

function testoutgoers(){
    console.log(cy.elements()[1].outgoers());
}

function predictobj(){
    if(nowobj){
        ele=nowobj;
        nowobj=null;
        var finaldata;
        var training='';
        var trainingdata='';
        var finaltraining;
        var target;
        var targetdata;
        
        target = ele.data().csv_lier;
        targetdata = ele.data().csv_data;
        finaltarget = target+"@%&"+targetdata;
        console.log('target is:' +finaltarget);
        console.log(":" + ele.id());
        console.log(cy.$('#' + ele.id()).incomers());
        list = cy.$('#' + ele.id()).incomers();
        console.log(list.length);
        for(let a=0;a<list.length;a++){
            if(list[a]._private.data.id.indexOf('s')){}
            else{
                //console.log(list[a]._private.data.id);
                console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
                training=training+cy.$("#"+list[a]._private.data.id).data().csv_lier+',';
                trainingdata=trainingdata+cy.$("#"+list[a]._private.data.id).data().csv_data+'#';

            }
            if(list[a]._private.data.id.indexOf('AI')){}
            else{
                //console.log(list[a]._private.data.id);
                console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
                training=training+cy.$("#"+list[a]._private.data.id).data().csv_lier+',';
                trainingdata=trainingdata+cy.$("#"+list[a]._private.data.id).data().csv_data+'#';

            }
        }
        finaltraining=training+"@%&"+trainingdata;
        finaldata=finaltraining+'@TGT:targetis@'+finaltarget;
        console.log("finaldata :"+finaldata);
        return finaldata;
    }
}
function getTMPandTGT(num,TMPv,clumen){
    try{
        cy.elements()[num]._private.data.id;
    }
    catch(err){ 
        return {TMPv,clumen}
    }
    if(cy.elements()[num]._private.data.csv_lier){
        clumv = cy.elements()[num]._private.data.csv_lier;
        datav = cy.elements()[num]._private.data.csv_data;
        if(cy.elements()[num]._private.data.id.indexOf('AI')==0){
            clumen.push(cy.elements()[num]._private.data.csv_lier);
        }
        TMPv[clumv]=datav;
        // console.log("列名："+ clum + " csv数据：" +data);
                        
    }
    return getTMPandTGT(num+1,TMPv,clumen);
}
function getincomersbyid(id,incomers){
    list = cy.$('#' + id).incomers();
    for(let a=0;a<list.length;a++){
        if(list[a]._private.data.csv_lier){
            incomers.push(list[a]._private.data.csv_lier);
        }
    }
    return incomers;
}

function getidbyname(num,name){
    try{
        cy.elements()[num]._private.data.id;
    }
    catch(err){ 
        return name
    }
    if(cy.elements()[num]._private.data.id){
        if(cy.elements()[num]._private.data.csv_lier==name){
            return cy.elements()[num]._private.data.id;
        }
        else{
            return getidbyname(num+1,name);
        }
    }
}

function getidbynameai(num,name){
    try{
        cy.elements()[num]._private.data.id;
    }
    catch(err){ 
        return name
    }
    if(cy.elements()[num]._private.data.id){
        if(cy.elements()[num]._private.data.csv_lier==name&&cy.elements()[num]._private.data.id.indexOf('AI')>=0){
            return cy.elements()[num]._private.data.id;
        }
        else{
            return getidbynameai(num+1,name);
        }
    }
}

function getidbynamedata(num,name){
    try{
        cy.elements()[num]._private.data.id;
    }
    catch(err){ 
        return name
    }
    if(cy.elements()[num]._private.data.id){
        if(cy.elements()[num]._private.data.csv_lier==name&&cy.elements()[num]._private.data.id.indexOf('AI')<0){
            return cy.elements()[num]._private.data.id;
        }
        else{
            return getidbynamedata(num+1,name);
        }
    }
}

function predictnode(ele){
    
    var finaldata;
    var training='';
    var trainingdata='';
    var finaltraining;
    var target;
    var targetdata;
    target = ele.data().csv_lier;
    targetdata = ele.data().csv_data;
    finaltarget = target+"@%&"+targetdata;
    console.log('target is:' +finaltarget);
    console.log(":" + ele.id());
    // console.log(cy.$('#' + ele.id()).incomers());
    list = cy.$('#' + ele.id()).incomers();
    console.log(list.length);
    for(let a=0;a<list.length;a++){
        if(list[a]._private.data.id.indexOf('s')){}
        else{
            //console.log(list[a]._private.data.id);
            console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
            training=training+cy.$("#"+list[a]._private.data.id).data().csv_lier+',';
            trainingdata=trainingdata+cy.$("#"+list[a]._private.data.id).data().csv_data+'#';
        }
        if(list[a]._private.data.id.indexOf('AI')){}
        else{
            try{
            //console.log(list[a]._private.data.id);
            console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
            training=training+cy.$("#"+list[a]._private.data.id).data().csv_lier+',';
            trainingdata=trainingdata+cy.$("#"+list[a]._private.data.id).data().csv_data+'#';
            }catch{}
        }
    }
    finaltraining=training+"@%&"+trainingdata;
    finaldata=finaltraining+'@TGT:targetis@'+finaltarget;
    console.log("finaldata :"+finaldata);
    return finaldata;

}

async function corr(x, y) {
    const response = await fetch('/calculate_correlation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x: x, y: y }),
    });
  
    if (response.ok) {
      const result = await response.json();
      return result.correlation;
    } else {
      console.error('Error:', response.status, response.statusText);
      return null;
    }
  }
//dcsv_data转1维数组
function parseAndCorrelate(xStr, yStr) {
    // 将输入字符串解析为二维数组
    const x2DArray = JSON.parse(xStr);
    const y2DArray = JSON.parse(yStr);
  
    // 将二维数组转换为一维数组
    const x = x2DArray.map(arr => arr[0]);
    const y = y2DArray.map(arr => arr[0]);
  
    // 计算相关系数
    correlation = corr(x, y);
    return parseFloat(correlation.toFixed(2));
}
//算pearson相关系数
function corr(x, y) {
    if (x.length !== y.length) {
      throw new Error('输入数组的长度必须相同');
      return 0;
    }
  
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
  
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);
  
    const sumXY = x.reduce((a, b, index) => a + b * y[index], 0);
  
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
    if (denominator === 0) {
      return 0;
    }
  
    return numerator / denominator;
}


function new_predictobj(){
    if(nowobj){
        ele=nowobj;
        nowobj=null;
        TMP={};
        TMPTGT={};
        try{
            console.log(ele.data().csv_lier);
            TMPTGT[ele.data().csv_lier] = ele.data().csv_data;
        }catch{return [undefined,undefined,undefined];}
        // console.log(cy.$('#' + ele.id()).incomers());
        list = cy.$('#' + ele.id()).incomers();
        console.log(list.length);
        for(let a=0;a<list.length;a++){
            if(list[a]._private.data.id.indexOf('s')){}//不以s开头
            else{
                try{
                    //console.log(list[a]._private.data.id);
                    console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
                    TMP[cy.$("#"+list[a]._private.data.id).data().csv_lier]=cy.$("#"+list[a]._private.data.id).data().csv_data;
                    }catch{}
            }//以s开头
            if(list[a]._private.data.id.indexOf('AI')){}//不以AI开头
            else{
                try{
                //console.log(list[a]._private.data.id);
                console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
                TMP[cy.$("#"+list[a]._private.data.id).data().csv_lier]=cy.$("#"+list[a]._private.data.id).data().csv_data;
                }catch{}
            }//以AI开头
        }
        return [TMP,TMPTGT,ele];
    }
}

function get_nowobj(){
    if(nowobj){
        return nowobj;
}
}

function new_predictnode(ele){
    nowele = ele;
    TMP={};
    TMPTGT={};
    try{
        console.log(ele.data().csv_lier);
        TMPTGT[ele.data().csv_lier] = ele.data().csv_data;
    }catch{return [undefined,undefined,undefined];}
    // console.log(cy.$('#' + ele.id()).incomers());
    list = cy.$('#' + ele.id()).incomers();
    console.log(list.length);
    for(let a=0;a<list.length;a++){
        if(list[a]._private.data.id.indexOf('s')){}//不以s开头
        else{
            try{
                //console.log(list[a]._private.data.id);
                console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
                TMP[cy.$("#"+list[a]._private.data.id).data().csv_lier]=cy.$("#"+list[a]._private.data.id).data().csv_data;
                }catch{}
        }//以s开头
        if(list[a]._private.data.id.indexOf('AI')){}//不以AI开头
        else{
            try{
            //console.log(list[a]._private.data.id);
            console.log(cy.$("#"+list[a]._private.data.id).data().csv_lier);
            TMP[cy.$("#"+list[a]._private.data.id).data().csv_lier]=cy.$("#"+list[a]._private.data.id).data().csv_data;
            }catch{}
        }//以AI开头
    }
    return [TMP,TMPTGT,nowele];
}

function showModal(order, title, filename) {
    const orderArray = JSON.parse(order);

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    document.body.appendChild(modalContainer);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <h2>予測:${title}</h2>
      ${orderArray.map((key) => `<p>${key}: <input id="${key}" type="number" /></p>`).join('')}
      <button id="confirm-input">Ok</button>
    `;

    const confirmBtn = modal.querySelector("#confirm-input");
    confirmBtn.onclick = () => {
      orderArray.forEach((key) => {
        temp42[key] = parseFloat(document.getElementById(key).value);
      });
      console.log(temp42);
      modal.style.display = "none";
      modalContainer.remove();

      // 将输入数据转换为数组并发送给后端进行预测
      input_data = Object.values(temp42);
      console.log(input_data);
      sendInputDataToPredict(input_data, filename);
      temp42 = {};
    };

    window.onclick = (event) => {
      if (event.target === modalContainer) {
        modal.style.display = "none";
        modalContainer.remove();
      }
    };

    modalContainer.appendChild(modal);
    modal.style.display = "block";
  }

function showResultModal(result) {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    document.body.appendChild(modalContainer);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <h2>予測結果</h2>
      <p>予測結果は：${result}</p>
      <button id="close-result-modal">Ok</button>
    `;

    const closeModalBtn = modal.querySelector("#close-result-modal");
    closeModalBtn.onclick = () => {
      modal.style.display = "none";
      modalContainer.remove();
    };
  
    window.onclick = (event) => {
      if (event.target === modalContainer) {
        modal.style.display = "none";
        modalContainer.remove();
      }
    };
  
    modalContainer.appendChild(modal);
    modal.style.display = "block";
  }
  
function sendInputDataToPredict(input_data, filename) {
    temp42 = {};
    console.log(input_data);
    $.ajax({
      url: '/predict',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ input_data, filename }),
      success: function (response) {
        const result = response.result;
        showResultModal(result);
      },
      error: function (error) {
        console.error('Error:', error);
      },
    });
  }


function openFiledfm() {
    // 模拟文件输入元素的点击
    document.getElementById('file-input').click();
}

function openFileips() {
    // 模拟文件输入元素的点击
    document.getElementById('file-ipscsv').click();
}


function uploadipsFile() {
    let fileInput = document.getElementById('file-ipscsv');
    let file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }

    // 可选: 检查是否为CSV文件
    if (file.type !== "text/csv") {
        console.log("Not a CSV file");
        return;
    }

    let formData = new FormData();
    formData.append('file', file);
    console.log("OK!!");
    fetch('/uploadips', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("File saved at:", data.filePath);
        url = data.filePath;
        id = ipsobj.id();
        cy.$('#' + id).data().ipsurl = url;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function uploadFile() {
    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }

    let formData = new FormData();
    formData.append('file', file);

    fetch('/uploaddfm', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // 在添加新内容前清除之前的动态内容
        clearDynamicContent();
        console.log("File saved at:", data.filePath);
        url = data.filePath;
        id = dfmobj.id();
        cy.$('#' + id).data().dfmurl = url;
        // 生成AIcontent和inputrequest的字符串并添加到悬浮窗
        let aiContent = generateListString(data.AIlist, 'AIcontent');
        let inputRequest = generateListString(data.inputlist, 'inputrequest');
        
        addToList(`${aiContent}\n\n${inputRequest}`, 'dfmlight');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function generateListString(list, prefix) {
    let csvLiers = list.map(item => item.csv_lier).filter(Boolean);
    return `${prefix}: ${csvLiers.join(', ')}`;
}

function addToList(content, elementId) {
    let element = document.getElementById(elementId);
    let p = document.createElement("p");
    p.textContent = content;
    p.className = 'dynamic-content'; // 给动态内容添加类名
    element.appendChild(p);
}

function clearDynamicContent() {
    let dynamicContents = document.querySelectorAll('#dfmlight .dynamic-content');
    dynamicContents.forEach(content => content.remove());
}

// //24/1/10
// async function overrall_predict_module(){
//     console.log(nowdfmobj.data().id);
//     nowdfmobj = null;
    
// }

//24/1/10 Ensemble learning
async function Ensemble_for_module(modulelist , clumname){
    outputformodeule={};
    let promises = [];
    for(i=0;i<modulelist.length;i++){
        ele=cy.$('#' + modulelist[i]);
        var list = cy.$('#' + ele.id()).incomers();
        //筛选出id中包含ips的节点
        var inputNode;
        for(let a=0;a<list.length;a++){
            if(list[a]._private.data.id.indexOf('ips')!=-1){
                inputNode=list[a];
                console.log(inputNode._private.data.id);
            }
        }
        //输出这些节点的id
        eid=inputNode._private.data.id;
        console.log(list.length);
        //如果节点数量不恰好为2个(一个节点和它的parent)，报错
        if(list.length!=2){
            alert("Please select data , module node should have one \"inputs\" node!");
        }
        else{
            //如果ele的dfmurl为空，报错
            if(ele.data().dfmurl==null){
                alert("Please select dataflow!");
            }
            else{
                //获取cy中id为inputNode._private.data.id的节点
                

                var inputNode=cy.$('#' + eid);
                //如果inputNode的ipsurl为空，报错
                if(inputNode.data().ipsurl==null){
                    alert("Please select data!");
                }
                else{
                    //获取inputNode的ipsurl和ele的dfmurl
                    var ipsurl=inputNode.data().ipsurl;
                    var dfmurl=ele.data().dfmurl;
                    var filename=ele.data().id;
                    var aiid = ele.id();
                    let promise = new Promise((resolve, reject) => {

                        $.ajax({
                            url: '/overrallpredictmodule2',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({ ipsurl: ipsurl, dfmurl: dfmurl, file_name: filename, clumn_name: clumname, aiid: aiid}),
                            success: function(response) {
                                outputformodeule[response.aiid]=response.data;
                                resolve(); // 在 AJAX 请求成功时调用 resolve
                            },
                            error: function(error) {
                                // 处理错误情况
                                console.error('请求错误:', error);
                                reject(error); // 在 AJAX 请求出错时调用 reject
                            }
                        });
                    });
                    promises.push(promise);
                }

            }
        }

    }
    //当全部模块都预测完毕后，将结果返回
    await Promise.all(promises);
    return outputformodeule;
}
async function Ensemble_for_model(predictlist, clumname){
    outputformodel={};
    let promises = [];
    for(i=0;i<predictlist.length;i++){
        ele=cy.$('#' + predictlist[i]);
        var list = cy.$('#' + ele.id()).incomers();
        console.log(list.length);
        //筛选出id中包含ips的节点
        var inputNode;
        for(let a=0;a<list.length;a++){
            if(list[a]._private.data.id.indexOf('ips')!=-1){
                inputNode=list[a];
                console.log(inputNode._private.data.id);
            }
        }
        //输出这些节点的id
        eid=inputNode._private.data.id;
        console.log(list.length);
        //如果节点数量不恰好为2个(一个节点和它的parent)，报错
        if(list.length!=2){
            alert("Please select data , module node should have one \"inputs\" node!");
        }
        else{
            var inputNode=cy.$('#' + eid);
            //如果inputNode的ipsurl为空，报错
            if(inputNode.data().ipsurl==null){
                alert("Please select data!");
            }
            else{
                console.log("id:"+ele.id());
                console.log("model:"+ele.data().model_name);
                model = ele.data().model_name;
                clumname = ele.data().csv_lier;
                ipsurl = inputNode.data().ipsurl;
                order = ele.data().order;
                aiid = ele.id();
                console.log(ipsurl);
                console.log(order);
                console.log(clumname);
                let promise = new Promise((resolve, reject) => {
                    $.ajax({
                        url: '/predictsigle',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ ipsurl: ipsurl, order: order, clumn_name: clumname, model: model, aiid: aiid }),
                        success: function(response) {
                            outputformodel[response.aiid] = response.data;
                            resolve(); // 在 AJAX 请求成功时调用 resolve
                        },
                        error: function(error) {
                            // 处理错误情况
                            console.error('请求错误:', error);
                            reject(error); // 在 AJAX 请求出错时调用 reject
                        }
                    });
                });
                promises.push(promise);
            }               
        }

    }
    await Promise.all(promises);
    return outputformodel;
}

async function process_ensamble(){
    console.log("正在预测"+nowclumname);
    output_module = await Ensemble_for_module(modulelist, nowclumname);
    output_model = await Ensemble_for_model(predictlist, nowclumname);
    nowclumname = null;
    modulelist = [];
    predictlist = [];
    //合并两个字典
    var output = Object.assign(output_module,output_model);
    console.log(output);
    var valueFrequencyList = [];

    // 初始化 valueFrequencyList
    var firstKey = Object.keys(output)[0];
    var lengthOfArray = JSON.parse(output[firstKey]).passed.length;
    for (let i = 0; i < lengthOfArray; i++) {
        valueFrequencyList.push({});
    }

    // 统计每个位置上每个数值出现的次数
    for (let key in output) {
        let passedArray = JSON.parse(output[key]).passed;
        for (let i = 0; i < passedArray.length; i++) {
            let value = passedArray[i];
            if (!valueFrequencyList[i][value]) {
                valueFrequencyList[i][value] = 1;
            } else {
                valueFrequencyList[i][value] += 1;
            }
        }
    }

    // 确定每个位置上出现次数最多的数值
    var finalOutputArray = valueFrequencyList.map(freqs => {
        return Object.keys(freqs).reduce((a, b) => freqs[a] > freqs[b] ? a : b);
    });
    var finalOutput = {
        "final_output": JSON.stringify({"passed": finalOutputArray.map(Number)})
    };

    // 将 final_output 合并到 output 字典中
    output = Object.assign(output, finalOutput);
    console.log(output);
    // 构建 HTML 表格
    var tableHtml = "<table border='1'><tr>";
    for (var key in output) {
        tableHtml += "<th>" + key + "</th>";
    }
    tableHtml += "</tr>";

    var rowCount = JSON.parse(output[Object.keys(output)[0]]).passed.length;
    for (let i = 0; i < rowCount; i++) {
        tableHtml += "<tr>";
        for (var key in output) {
            var valueArray = JSON.parse(output[key]).passed;
            tableHtml += "<td>" + valueArray[i] + "</td>";
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    // 打开新窗口并写入 HTML 表格内容
    var newWindow = window.open("", "newWindow", "width=800,height=600");
    newWindow.document.write("<html><head><title>Output Table</title></head><body>");
    newWindow.document.write(tableHtml);
    newWindow.document.write("</body></html>");
    newWindow.document.close();

}


