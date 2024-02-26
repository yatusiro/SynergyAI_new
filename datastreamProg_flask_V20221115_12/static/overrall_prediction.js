//===和==的区别：===是严格等于，==是相等(会自动转换类型例如0==null||undifined||"")。
var list=[];
var removelist=[];
var inputlist=[];
data={};
var resultdict={};
function inputallinput(){
    clearsimdata();
    inputlist=[];
    //找出所有id以s开头的节点
    for (var i = 0; i < cy.elements().length; i++) {
        if(cy.elements()[i]._private.data.id.substring(0,1)=="s"){
            //如果id以s开头，push到inputlist中
            if(cy.elements()[i]._private.data.csv_lier == null){
                alert("no data avalible ! \n please select data first!");
                return;
            }
            inputlist.push(cy.elements()[i]._private.data.id);
        }
    }
    showCustomFloatingWindow(inputlist);
    
}

function showCustomFloatingWindow(attributes) {
    let customFloatingWindow = document.getElementById('customFloatingWindow');
    let inputContainer = document.getElementById('inputContainer');

    // 添加输入框
    for (let attribute of attributes) {
        let label = document.createElement('label');
        label.textContent = attribute+'('+cy.getElementById(attribute).data().csv_lier+')'+':';
        inputContainer.appendChild(label);

        let input = document.createElement('input');
        input.type = 'text';
        input.setAttribute('data-attribute', attribute);
        inputContainer.appendChild(input);

        inputContainer.appendChild(document.createElement('br'));
    }

    // 显示悬浮窗
    customFloatingWindow.style.display = 'block';
}

async function saveInputsAndClose() {
    let customFloatingWindow = document.getElementById('customFloatingWindow');
    let inputContainer = document.getElementById('inputContainer');
    let inputs = inputContainer.getElementsByTagName('input');

    // 将输入值存储到字典data中
    for (let input of inputs) {
        let attribute = input.getAttribute('data-attribute');
        data[attribute] = parseInt(input.value, 10);
    }
    console.log('data:');
    console.log(data);
    // 将字典data中的值存储到cy对象中
    for (let key in data) {
        cy.getElementById(key).data().simdata = data[key];
    }

    // 隐藏悬浮窗
    customFloatingWindow.style.display = 'none';

    // 删除悬浮窗内的内容
    while (inputContainer.firstChild) {
        inputContainer.removeChild(inputContainer.firstChild);
    }
    console.log(data);
    data={};
    inputlist=[];
    // 调用overall_predict函数
    await overall_predict();
    await outputdata();
}

async function outputdata(){
    directdic={};
    samedata=1;
    var datacontent=null;
    for (var i = 0; i < cy.elements().length; i++) {
        //如果id以o-开头，push到list中
        if(cy.elements()[i]._private.data.id.substring(0,2)=="o-"){
            console.log(cy.elements()[i]._private.data.id);
            // console.log("incomers:");
            // console.log(cy.elements()[i].incomers());
            inputlist=cy.elements()[i].incomers();
            for(var j = 0; j < inputlist.length; j++){
                if(inputlist[j]._private.data.id.substring(0,2)=="AI"){
                    // directdic[inputlist[j]._private.data.id]=inputlist[j]._private.data.simdata;
                    if(datacontent==null){
                        datacontent=cy.$('#' + inputlist[j]._private.data.id).data().csv_lier;
                    }
                    else{
                        if(datacontent!=cy.$('#' + inputlist[j]._private.data.id).data().csv_lier){
                            samedata=0;
                        }
                    }
                    directdic[inputlist[j]._private.data.id]=cy.$('#' + inputlist[j]._private.data.id).data().simdata;
                    console.log(cy.$('#' + inputlist[j]._private.data.id).data().simdata +"inserd");
                    // cy.$('#' + ele.id())
                }
            }
            console.log("###directdic:");
            console.log(directdic);
            //如果inputlist中的所有点的data都一样
            if(samedata==0){
                alert("all input tag for output node must be the same!")
            }
            else{
                d=directdic;
                // 1. 统计每个值出现的次数
                let valueCounts = {};
                for (let key in d) {
                    if (!valueCounts[d[key]]) {
                        valueCounts[d[key]] = 0;
                    }
                    valueCounts[d[key]]++;
                }

                // 2. 找出出现次数最多的值
                let maxCount = Math.max(...Object.values(valueCounts));
                let mostCommonValues = Object.keys(valueCounts).filter(value => valueCounts[value] === maxCount);

                // 如果只想要一个最常见的值，可以使用 mostCommonValues[0]。

                // 3. 找出与该值关联的所有键
                let mostCommonKeys = Object.keys(d).filter(key => mostCommonValues.includes(String(d[key])));
                console.log("最多的值:", mostCommonValues);
                console.log("具有最多值的AI nodes:", mostCommonKeys);
                // alert("最多的值: " + JSON.stringify(mostCommonValues) + "\n具有最多值的AI nodes: " + JSON.stringify(mostCommonKeys));
                console.log("parent:");
                // console.log(cy.$("#"+cy.elements()[i]._private.data.id.parent).data().id);
                cy.$("#"+cy.elements()[i]._private.data.parent).data().lab = mostCommonValues[0];
                
            }
            
        }
    }
    

}

async function overall_predict(){
    //清空list
    var okey=0;
    list=[];
    removelist=[];
    for (var i = 0; i < cy.elements().length; i++) {
        //如果id以AI开头，push到list中
        if(cy.elements()[i]._private.data.id.substring(0,2)=="AI"){
            if(cy.getElementById(cy.elements()[i]._private.data.id).data().order == null){
                alert("no model avalible ! \n please select data and train first!");
                return;
            }

            list.push(cy.elements()[i]._private.data.id)
        }
    }
    while(okey==0){
        for(var i=0;i<list.length;i++){
            // var node=cy.getElementById(list[i]);
            // node.style('background-color', 'red');
            console.log(list[i]);
            //输出i对应的输入节点的id
            inlist=[];
            outlist=[];
            incomers=cy.getElementById(list[i]).incomers();
            //只保留id以s或AI或o开头的节点
            for(var j=0;j<incomers.length;j++){
                if(incomers[j]._private.data.id.substring(0,1)=="s"||incomers[j]._private.data.id.substring(0,2)=="AI"||incomers[j]._private.data.id.substring(0,1)=="o"){
                    
                    inlist.push(incomers[j]._private.data.id);
                }
            }
            //输出i对应的输出节点
            outgoers=cy.getElementById(list[i]).outgoers();
            //只保留id以s或AI或o开头的节点
            for(var j=0;j<outgoers.length;j++){
                if(outgoers[j]._private.data.id.substring(0,1)=="s"||outgoers[j]._private.data.id.substring(0,2)=="AI"||outgoers[j]._private.data.id.substring(0,1)=="o"){
                    
                    outlist.push(outgoers[j]._private.data.id);
                }
            }
            console.log(list[i]+"inlist:");
            console.log(inlist);
            TMP={}
            ready=1;
            for(var j=0;j<inlist.length;j++){
                console.log(list[i]+' 的'+j+'个:');
                console.log(cy.getElementById(inlist[j]).data().simdata);
                if(cy.getElementById(inlist[j]).data().simdata===null || cy.getElementById(inlist[j]).data().simdata===undefined || cy.getElementById(inlist[j]).data().simdata===""){
                    ready=0;
                    break;
                }else{
                    TMP[cy.getElementById(inlist[j]).data().csv_lier]=cy.getElementById(inlist[j]).data().simdata;
                }
            }
            if(ready==1){
                console.log(TMP);
                let string = cy.getElementById(list[i]).data().order;
                let result = checkElementsInString(TMP, string);
                if(result==0){
                    alert("data not match ! \n please check the data and train again!")
                    return;
                }
                console.log(result+"!!!!!!!");
                if(result==1){//JL6
                    datas = sortDictValues(TMP, string);
                    await simulation(datas, cy.getElementById(list[i]).data().model_name, list[i] , TMP);
                    removelist.push(list[i]);
                }
            }
            else{
            }
            //JL5
        }
        list=list.filter(element => !removelist.includes(element));
        console.log('list:');
        console.log(list);
        //输出list的长度
        console.log(list.length);
        if(list.length==0){
            okey++;
        }
    }
    console.log('resultdict:');
    console.log(resultdict);
    createPopupTable(resultdict);
    resultdict={};

}

// 异步函数
async function simulation(input_data, filename, aiid ,TMP) {
    console.log(input_data);
    try {
      // 使用 Promise 包装 $.ajax 请求
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: '/predict',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ input_data, filename }),
          success: function (response) {
            resolve(response);
          },
          error: function (error) {
            reject(error);
          },
        });
      });
  
      result = response.result;
      cy.getElementById(aiid).data().simdata = result;
      console.log('已修改' + aiid + ':' + result);
      newdic={};
      newdic['jieguo']=result;
      newdic['ziyuan']=TMP;
      newdic['mubiao']=cy.getElementById(aiid).data().csv_lier;
      resultdict[aiid]=newdic;
    } catch (error) {
      console.error('Error:', error);
    }
  }

function checkElementsInString(dictionary, string) {
    // 将字符串转换为数组
    let stringArray = JSON.parse(string);
    
    // 获取字典的键
    let dictKeys = Object.keys(dictionary);
    
    // 检查长度是否相等，如果不等则返回0
    if (dictKeys.length !== stringArray.length) {
        return 0;
    }
    
    // 对字典的键进行排序
    dictKeys.sort();
    
    // 对字符串数组进行排序
    stringArray.sort();
    
    // 比较排序后的键和字符串数组中的元素是否相等
    for (let i = 0; i < dictKeys.length; i++) {
        if (dictKeys[i] !== stringArray[i]) {
            return 0;
        }
    }
    
    // 如果所有元素都相等，则返回1
    return 1;
}

function sortDictValues(dictionary, string) {
    let stringArray = JSON.parse(string);
    let sortedValues = [];

    for (let key of stringArray) {
        sortedValues.push(dictionary[key]);
    }

    return sortedValues;
}

function clearsimdata(){
    //清空cy中所有id以AI开头或o开头或s开头的节点的simdata
    for (var i = 0; i < cy.elements().length; i++) {
        if(cy.elements()[i]._private.data.id.substring(0,2)=="AI"||cy.elements()[i]._private.data.id.substring(0,1)=="o"||cy.elements()[i]._private.data.id.substring(0,1)=="s"){
            if(cy.getElementById(cy.elements()[i]._private.data.id).data().simdata){
                cy.getElementById(cy.elements()[i]._private.data.id).data().simdata=null;
            }
        }
    }
    
}

function createPopupTable(resultDict) {
    // 创建弹出窗口
    const popupWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    popupWindow.document.write('<html><head><title>Results</title>');
  
    // 添加 CSS 样式
    popupWindow.document.write(`
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
          font-family: Arial, sans-serif;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      </style>
    `);
  
    popupWindow.document.write('</head><body>');
  
    // 创建表格
    const table = document.createElement('table');
  
    // 创建表头
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);
    const headerCell4 = headerRow.insertCell(3);
    headerCell1.innerText = 'ID';
    headerCell2.innerText = 'Source';
    headerCell3.innerText = 'Target';
    headerCell4.innerText = 'Result';
  
    // 填充表格内容
    const tbody = document.createElement('tbody');
    for (const id in resultDict) {
      const row = tbody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
  
      cell1.innerText = id;
      cell2.innerText = Object.entries(resultDict[id].ziyuan).map(([k, v]) => `${k}:${v}`).join(', ');
      cell3.innerText = resultDict[id].mubiao;
      cell4.innerText = resultDict[id].jieguo;
    }
  
    table.appendChild(tbody);
  
    // 将表格添加到弹出窗口
    popupWindow.document.body.appendChild(table);
    popupWindow.document.write('</body></html>');
  }

 
