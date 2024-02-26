
// accuracy list
var acclist = [];
var highcorr = 0.5;
var lowcorr = 0.3;
var global_high_corr_pairs = [];
var global_low_corr_pairs = [];
let dotCount = 0;
let timerId;

function updateDots() {
    let dots = '';
    for (let i = 0; i < dotCount; i++) {
        dots += ' .';
    }
    document.getElementById("dots").textContent = dots;
    dotCount = (dotCount + 1) % 4;
}

function showFloatingWindow() {
    document.getElementById("floating-window").style.display = "block";
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(updateDots, 500);
}

function hideFloatingWindow() {
    document.getElementById("floating-window").style.display = "none";
    clearInterval(timerId);
}

function clear(){
    acclist = [];
}

function addtoAccuracylist(member){
    acclist.push(member);
}

var heatmapPopWin = null;

        function generateHeatmap() {
            // 生成随机查询字符串参数
            var randomParam = Math.floor(Math.random() * 1000000);
            // 创建新的图像元素
            var heatmapImg = document.createElement('img');
            heatmapImg.src = '/generate_heatmap?' + randomParam;
            heatmapImg.onload = function() {
                // 在popwin中显示新的热力图
                // if (heatmapPopWin) {
                //     heatmapPopWin.close();
                // }
                heatmapPopWin = window.open('', 'heatmap-popwin', 'width=600,height=600');
                heatmapPopWin.document.write('<html><head><title>Heatmap</title></head><body style="margin:0;padding:0;"></body></html>');
                var heatmapContainer = heatmapPopWin.document.createElement('div');
                heatmapContainer.style.width = '100%';
                heatmapContainer.style.height = '100%';
                heatmapContainer.style.display = 'flex';
                heatmapContainer.style.justifyContent = 'center';
                heatmapContainer.style.alignItems = 'center';
                heatmapContainer.appendChild(heatmapImg);
                heatmapPopWin.document.body.appendChild(heatmapContainer);
            };
        }

        function deleteHeatmapImage() {
            // 关闭popwin时删除图像
            if (heatmapPopWin) {
                heatmapPopWin.document.body.innerHTML = '';
                heatmapPopWin.close();
            }
        }

        
function test_flask() {
    
    let url = showsting()

    $.ajax({
            url: 'test_post/nn',
            type: 'POST',
            data: {"url": url},
            dataType: 'json',
            success: function(response) {
                // $('#main').text(response)
                console.log(response)
                data = JSON.parse(response)
                console.log(data)
                console.log("eddie from js 16:36")
            }
    })
    // let url = "./v2_chocolateData.csv"

    // $.ajax({
    //         url: 'test_post/nn',
    //         type: 'POST',
    //         data: {"url": url},
    //         dataType: 'json',
    //         success: function(response) {
    //             // $('#main').text(response)
    //             console.log(response)
    //             console.log("eddie from js 16:36")
    //         }
    // })


    // let param1 = {
    //         "srxApi":"setNewGroupStep1",
    //         "apiVer" : 0,
    //         "packSn" : 0,
    //         "operate" : "command",
    //         "option" : ["none"],
    //         "param" : {
    //             "frameRate" : 60,
    //             "colorDepth" : 2,
    //             "isUsedDvi" : 1
    //         },
    //         "endFlg":"srxApi"
    // }
    //
    // $.ajax({
    //     url: 'test_post/nn',
    //     data: JSON.stringify(param1),
    //     type: 'POST',
    //     // data: {"url": url},
    //     dataType: 'json',
    //     success: function(response) {
    //         // $('#main').text(response)
    //         console.log(response)
    //         console.log("eddie from js 16:36")
    //     }
    // })

}

function testflask() {
    
    let url = showsting()

    $.ajax({
            url: 'testpost/nn',
            type: 'POST',
            data: {"url": url},
            dataType: 'json',
            success: function(response) {
                // $('#main').text(response)
                console.log(response);
                acc = response + '';
                document.getElementById('haccuracy').value=acc.slice(0,6)
            }
    })
}

function testflask2() {
    
    let url = predicttest()

    $.ajax({
            url: 'testpost2/nn',
            type: 'POST',
            data: {"url": url},
            dataType: 'json',
            success: function(response) {
                // $('#main').text(response)
                console.log(response);
                acc = response + '';
                document.getElementById('haccuracy').value=acc.slice(0,6)
            }
    })
}

function testflask3() {
    
    let url = predictobj()

    $.ajax({
            url: 'testpost3/nn',
            type: 'POST',
            data: {"url": url},
            dataType: 'json',
            success: function(response) {
                // $('#main').text(response)
                console.log(response);
                acc = response[1] + '';
                document.getElementById('haccuracy').value=acc.slice(0,6)
                document.getElementById('aaccuracy').value=acc.slice(0,6)
            }
    })
}

function test41(){
    a=0;
    while(true){
    try{
        cy.elements()[a]._private.data.id;
        // console.log(cy.elements()[a]._private.data.id);
        if(cy.elements()[a]._private.data.id.indexOf('AI')==0){
            console.log(cy.elements()[a]._private.data.id);
            let url=predictnode(cy.elements()[a]);
            console.log(cy.elements()[a]._private.data.id);
            $.ajax({
                url: 'testpost3/nn',
                type: 'POST',
                data: {"url": url},
                dataType: 'json',
                success: function(response) {
                    // $('#main').text(response)
                    console.log(response);
                    acc = response[1] + '';
                    tgt = response[0];
                    document.getElementById('haccuracy').value=acc.slice(0,6)
                    document.getElementById('aaccuracy').value=acc.slice(0,6)
                    // confirm('Target:'+tgt+' Used:'+response[2]+' Accuracy:'+acc.slice(0,6))
                    //[id,target,accuracy]
                    a=[adviceai(tgt),tgt,acc.slice(0,6)];
                    addtoAccuracylist(a);

                    
                }
        })
        }
        a++;
    }
    catch{break}
    }

    console.log(acclist);
}

async function test4() {
    let a = 0;
    let requests = [];

    while (true) {
        try {
            let currentElement = cy.elements()[a];
            let currentId = currentElement._private.data.id;

            if (currentId.indexOf('AI') == 0) {
                let url = predictnode(currentElement);

                let request = new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'testpost3/nn',
                        type: 'POST',
                        data: { "url": url },
                        dataType: 'json',
                        success: function (response) {
                            let acc = response[1] + '';
                            let tgt = response[0];
                            // document.getElementById('haccuracy').value = acc.slice(0, 6);
                            // document.getElementById('aaccuracy').value = acc.slice(0, 6);
                            let a = [adviceai(tgt), tgt, acc.slice(0, 6)];
                            addtoAccuracylist(a);
                            resolve();
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });
                });

                requests.push(request);
            }

            a++;
        } catch {
            break;
        }
    }

    // 等待所有请求完成
    await Promise.all(requests);
    displayTable(acclist);
    clear();
}
//注意:test4()是异步函数，所以调用test4()时需要：
// (async () => {
//     await test4();
// })();
// 或者
// test4().then(() => {
//4/24
function get_scatterplot_matrix_slider() {
    showFloatingWindow();
    TMP={};
    tgt=[];
    resoult=getTMPandTGT(0,TMP,tgt);
    console.log(resoult.TMPv);
    console.log(resoult.clumen);
    data2=resoult.TMPv;
    clumen=resoult.clumen;
    var data = data2
    var selected_columns = clumen
    console.log("ok");
    $.ajax({
        type: "POST",
        url: "/scatterplot",
        contentType: "application/json",
        data: JSON.stringify({ "data": data, "selected_columns": selected_columns }),
        dataType: "json",
        success: function (response) {
            hideFloatingWindow();
            var scatterplot_matrix = "data:image/png;base64," + response.scatterplot_matrix;
            var popwin = window.open("", "_blank", "width=800,height=600");
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
            'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
            '.scatterplot-container { display: flex; flex-direction: column; align-items: center; }' +
            '.scatterplot-img { max-width: 100%; max-height: 100%; }' +
            '.img-container { width: 600px; height: 600px; overflow: scroll; border: 1px solid #ccc; }' +
            'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
            'input[type=range] { width: 100%; max-width: 400px; }' +
            '</style><script>function myfunction2() {window.close(); }</script></head><body>');
            popwin.document.write('<div id="scatterplot_matrix-container" class="scatterplot-container">');
            popwin.document.write('<div class="img-container"><img class="scatterplot-img" src="' + scatterplot_matrix + '" alt="scatterplot" id="scatterplot-image"></div><br>');
            popwin.document.write('<input type="range" id="slider" min="1" max="3" value="1" step="0.1">');
            popwin.document.write('<button class="close-btn" onclick="myfunction2()">OK</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
    
            // 缩放滑动条事件处理
            popwin.document.getElementById('slider').addEventListener('input', function (event) {
                var scale = parseFloat(event.target.value);
                var scatterplotImage = popwin.document.getElementById('scatterplot-image');
                scatterplotImage.style.transform = 'scale(' + scale + ')';
            });
        }
    });
}
//4/21
function get_scatterplot_matrix() {
    showFloatingWindow();
    TMP={};
    tgt=[];
    resoult=getTMPandTGT(0,TMP,tgt);
    console.log(resoult.TMPv);
    console.log(resoult.clumen);
    data2=resoult.TMPv;
    clumen=resoult.clumen;
    var data = data2
    var selected_columns = clumen
    console.log("ok");
    $.ajax({
        type: "POST",
        url: "/scatterplot",
        contentType: "application/json",
        data: JSON.stringify({ "data": data, "selected_columns": selected_columns }),
        dataType: "json",
        success: function (response) {
            hideFloatingWindow();
            var scatterplot_matrix = "data:image/png;base64," + response.scatterplot_matrix;
            var popwin = window.open("", "_blank", "width=800,height=600");
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
            'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
            '.scatterplot-container { display: flex; flex-direction: column; align-items: center; }' +
            '.scatterplot-img { max-width: 100%; max-height: 100%; position: absolute; cursor: grab; transform-origin: left top; }' +
            '.img-container { width: 600px; height: 600px; overflow: scroll; border: 1px solid #ccc; position: relative; }' +
            'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
            'input[type=range] { width: 100%; max-width: 400px; }' +
            '</style><script>function myfunction2() {window.close(); }</script></head><body>');
            popwin.document.write('<div id="scatterplot_matrix-container" class="scatterplot-container">');
            popwin.document.write('<div class="img-container"><img class="scatterplot-img" src="' + scatterplot_matrix + '" alt="scatterplot" id="scatterplot-image"></div><br>');
            popwin.document.write('<input type="range" id="slider" min="1" max="3" value="1" step="0.1">');
            popwin.document.write('<button class="close-btn" onclick="myfunction2()">OK</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
    
            // 缩放滑动条事件处理
            popwin.document.getElementById('slider').addEventListener('input', function (event) {
                var scale = parseFloat(event.target.value);
                var scatterplotImage = popwin.document.getElementById('scatterplot-image');
                scatterplotImage.style.transform = 'scale(' + scale + ')';
            });
    
            // 图片拖动事件处理
            var imgContainer = popwin.document.querySelector('.img-container');
            var img = popwin.document.querySelector('.scatterplot-img');
            var isMouseDown = false;
            var startX, startY, initialX, initialY;
    
            img.addEventListener('mousedown', function (event) {
                isMouseDown = true;
                startX = event.clientX;
                startY = event.clientY;
                initialX = img.offsetLeft;
                initialY = img.offsetTop;
                img.style.cursor = 'grabbing';
            });
    
            imgContainer.addEventListener('mousemove', function (event) {
                if (!isMouseDown) return;
                var dx = event.clientX - startX;
                var dy = event.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;
    
                // 限制图片只能向右和向下移动
                img.style.left = newX + 'px';
                img.style.top = newY + 'px';
            });
    
            imgContainer.addEventListener('mouseup', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
    
            imgContainer.addEventListener('mouseleave', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
        }
    });
}

function newpop(high,low){
    TMP={};
    tgt=[];
    resoult=getTMPandTGT(0,TMP,tgt);
    console.log(resoult.TMPv);
    console.log(resoult.clumen);
    data2=resoult.TMPv;
    clumen=resoult.clumen;
    var data = data2
    var selected_columns = clumen
    $.ajax({
        type: "POST",
        url: "/heatmap",
        contentType: "application/json",
        data: JSON.stringify({"data": data, "selected_columns": selected_columns, "highcorr": high, "lowcorr": low}),
        dataType: "json",
        success: function(response) {
            var heatmapImage = "data:image/png;base64," + response.heatmap_image;
            var popwin = window.open("", "_blank", "width=800,height=600");
            response.high_corr_pairs = adviceforadd(response.high_corr_pairs);
            response.low_corr_pairs = adviceforremove(response.low_corr_pairs);
            global_high_corr_pairs = adviceforadd(response.high_corr_pairs);
            global_low_corr_pairs = adviceforremove(response.low_corr_pairs);
            // 动态生成的文本
            var dynamicText = "Correlation coefficient above "+highcorr+" :<br>";
            // response.high_corr_pairs的结构如下（第一列是targert，第二列是相关性高数据的第三列是相关系数
            //   [
            //     ["A", "C", 0.7],
            //     ["B", "D", 0.6]
            //   ]
            response.high_corr_pairs.forEach(function(pair) {
                dynamicText += pair[0] + " and " + pair[1] + " have a correlation coefficient of " + pair[2].toFixed(2) + ' ( add: '+ advicedata(pair[1]) + ' --> ' + adviceai(pair[0])+' )'+ "<br>";
            });
            
            var dynamicTextlow = "Correlation coefficient below "+lowcorr+" :<br>";
            response.low_corr_pairs.forEach(function(pair) {
                dynamicTextlow += pair[0] + " and " + pair[1] + " have a correlation coefficient of " + pair[2].toFixed(2) + ' ( remove: '+ advicedata(pair[1]) + ' --> ' + adviceai(pair[0])+' )'+ "<br>";
            });

            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* ... */</style><script>function myFunction() { window.opener.myFunction(); window.close(); }</script></head><body>');
            popwin.document.write('<div id="heatmap-container">');
            popwin.document.write('<img src="' + heatmapImage + '" alt="Heatmap"><br>');
            popwin.document.write('<p>' + dynamicText + '</p>');
            popwin.document.write('<p>' + dynamicTextlow + '</p>');
            popwin.document.write('<button class="close-btn" onclick="myFunction()">YES</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
        }
    });
    

}

function newpop_slider(high,low){
    TMP={};
    tgt=[];
    resoult=getTMPandTGT(0,TMP,tgt);
    console.log(resoult.TMPv);
    console.log(resoult.clumen);
    data2=resoult.TMPv;
    clumen=resoult.clumen;
    var data = data2
    var selected_columns = clumen
    $.ajax({
        type: "POST",
        url: "/heatmap",
        contentType: "application/json",
        data: JSON.stringify({"data": data, "selected_columns": selected_columns, "highcorr": high, "lowcorr": low}),
        dataType: "json",
        success: function(response) {
            var heatmapImage = "data:image/png;base64," + response.heatmap_image;
            var popwin = window.open("", "_blank", "width=800,height=600");
            response.high_corr_pairs = adviceforadd(response.high_corr_pairs);
            response.low_corr_pairs = adviceforremove(response.low_corr_pairs);
            global_high_corr_pairs = adviceforadd(response.high_corr_pairs);
            global_low_corr_pairs = adviceforremove(response.low_corr_pairs);
    
            // 动态生成的文本
            var dynamicText = "Correlation coefficient above "+highcorr+" :<br>";
            response.high_corr_pairs.forEach(function(pair) {
                dynamicText += pair[0] + " and " + pair[1] + " have a correlation coefficient of " + pair[2].toFixed(2) + ' ( add: '+ advicedata(pair[1]) + ' --> ' + adviceai(pair[0])+' )'+ "<br>";
            });
    
            var dynamicTextlow = "Correlation coefficient below "+lowcorr+" :<br>";
            response.low_corr_pairs.forEach(function(pair) {
                dynamicTextlow += pair[0] + " and " + pair[1] + " have a correlation coefficient of " + pair[2].toFixed(2) + ' ( remove: '+ advicedata(pair[1]) + ' --> ' + adviceai(pair[0])+' )'+ "<br>";
            });
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
                'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
                '.heatmap-container { display: flex; flex-direction: column; align-items: center; }' +
                '.heatmap-img { max-width: 100%; max-height: 100%; position: absolute; cursor: grab; transform-origin: left top; }' +
                '.img-container { width: 600px; height: 500px; overflow: scroll; border: 1px solid #ccc; position: relative; }' +
                'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
                'input[type=range] { width: 100%; max-width: 400px; }' +
                '</style><script>function myFunction() { window.opener.myFunction(); window.close(); }</script></head><body>');
    
            popwin.document.write('<div class="heatmap-container">');
            popwin.document.write('<div class="img-container"><img class="heatmap-img" src="' + heatmapImage + '" alt="Heatmap"></div>');
             // Rest of the HTML content
            popwin.document.write('</div>'); // Close img-container
            popwin.document.write('<input type="range" min="0.5" max="3" step="0.1" value="1" id="zoomSlider" style="margin-top: 10px;">');
            popwin.document.write('<p>' + dynamicText + '</p>');
            popwin.document.write('<p>' + dynamicTextlow + '</p>');
            popwin.document.write('<button class="close-btn" onclick="myFunction()">YES</button>');
            popwin.document.write('</div>'); // Close heatmap-container
            popwin.document.write('</body></html>');
            popwin.document.close();

            // Add event listeners for dragging and zooming the heatmap
            var img = popwin.document.querySelector('.heatmap-img');
            var imgContainer = popwin.document.querySelector('.img-container');
            var isMouseDown = false;
            var startX, startY, initialX, initialY;

            img.addEventListener('mousedown', function (event) {
                isMouseDown = true;
                startX = event.clientX;
                startY = event.clientY;
                initialX = parseInt(img.style.left || 0);
                initialY = parseInt(img.style.top || 0);
            });

            img.addEventListener('mousemove', function (event) {
                if (!isMouseDown) return;
                var dx = event.clientX - startX;
                var dy = event.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;

                img.style.left = newX + 'px';
                img.style.top = newY + 'px';
            });

            img.addEventListener('mouseup', function () {
                isMouseDown = false;
            });

            img.addEventListener('mouseleave', function () {
                isMouseDown = false;
            });

            // Add event listener for the zoom slider
            var zoomSlider = popwin.document.getElementById('zoomSlider');
            zoomSlider.addEventListener('input', function () {
                img.style.transform = 'scale(' + this.value + ')';
            });
        }
});
    

}

function myFunction() {
    alert('You pressed a key inside the popup!');
    console.log(global_high_corr_pairs );
    console.log(global_low_corr_pairs );
    console.log(global_low_corr_pairs[0].length+" "+global_low_corr_pairs.length);
    
    for(let i=0;i<global_low_corr_pairs.length;i++){
        console.log(global_low_corr_pairs[i][1]+" "+global_low_corr_pairs[i][0]);
        removeedgebycsv_lier(global_low_corr_pairs[i][1],global_low_corr_pairs[i][0]);
    }
    global_low_corr_pairs=[];
    for(let i=0;i<global_high_corr_pairs.length;i++){
        console.log(global_high_corr_pairs[i][1]+" "+global_high_corr_pairs[i][0]);
        addedgebycsv_lier(global_high_corr_pairs[i][1],global_high_corr_pairs[i][0],global_high_corr_pairs[i][2].toFixed(2));
    }
    global_high_corr_pairs=[];
}

function advice(name){
    let a =getidbyname(0,name);
    // 
    return a;
}

function adviceai(name){
    let a =getidbynameai(0,name);
    // 
    return a;
}

function advicedata(name){
    let a =getidbynamedata(0,name);
    // 
    return a;
}

function getincomers(name){
    tmp=[];
    id=getidbynameai(0,name);
    incomers = getincomersbyid(id,tmp);
    return incomers;
}

function adviceforadd(resp){
    arr=getUniqueFirstElements(resp);
    TMP={};
    for(let i=0;i<arr.length;i++){
        TMP[arr[i]]=getincomers(arr[i]);
    }
    console.log(TMP);
    //选出resp中每个ai节点的输入中不包含的节点
    resp = resp.filter(item => {
        let key = item[0];
        let value = item[1];
      
        // 判断resp中的元素是否不符合TMP中的条件
        if (!TMP.hasOwnProperty(key) || !TMP[key].includes(value)) {
          return true;
        }
      
        return false;
      });


    // console.log('\n'+resp);
    return resp;
    
}

function adviceforremove(resp){
    arr=getUniqueFirstElements(resp);
    TMP={};
    for(let i=0;i<arr.length;i++){
        TMP[arr[i]]=getincomers(arr[i]);
    }
    console.log(TMP);
    //选出resp中每个ai节点的输入中包含的节点
    resp = resp.filter(item => {
        let key = item[0];
        let value = item[1];
      
        // 判断resp中的元素是否符合TMP中的条件
        if (TMP.hasOwnProperty(key) && TMP[key].includes(value)) {
          return true;
        }
      
        return false;
      });

    return resp;

}

function getUniqueFirstElements(tem) {
    let uniqueValues = new Set(); // 使用Set来存储唯一值
  
    tem.forEach(item => {
      uniqueValues.add(item[0]); // 将子数组的第一个元素添加到Set中
    });
  
    return Array.from(uniqueValues); // 将Set转换为数组并返回
  }


// function displayTable(acclist) {
//     // 创建一个新的窗口
//     let newWindow = window.open('', '_blank', 'width=500, height=400, scrollbars=yes, resizable=yes');

//     // 创建表格
//     let table = document.createElement('table');
//     table.setAttribute('border', '1');

//     // 创建表头
//     let header = table.createTHead();
//     let headerRow = header.insertRow(0);
//     let headerCell1 = headerRow.insertCell(0);
//     let headerCell2 = headerRow.insertCell(1);
//     let headerCell3 = headerRow.insertCell(2);
//     headerCell1.innerHTML = 'ID';
//     headerCell2.innerHTML = 'Target';
//     headerCell3.innerHTML = 'Accuracy';

//     // 添加数据行
//     let tbody = document.createElement('tbody');
//     table.appendChild(tbody);

//     for (let i = 0; i < acclist.length; i++) {
//         let row = tbody.insertRow(i);
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         let cell3 = row.insertCell(2);
//         cell1.innerHTML = acclist[i][0];
//         cell2.innerHTML = acclist[i][1];
//         cell3.innerHTML = acclist[i][2];
//     }

//     // 将表格添加到新窗口中
//     newWindow.document.body.appendChild(table);
// }

function displayTable(acclist) {
    // 创建一个新的窗口
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

    // 创建表格
    let table = document.createElement('table');

    // 创建表头
    let header = table.createTHead();
    let headerRow = header.insertRow(0);
    let headerCell1 = headerRow.insertCell(0);
    let headerCell2 = headerRow.insertCell(1);
    let headerCell3 = headerRow.insertCell(2);

    headerCell1.innerHTML = 'ID';
    headerCell2.innerHTML = 'Target';
    headerCell3.innerHTML = 'Accuracy';

    // 添加数据行
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < acclist.length; i++) {
        let row = tbody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = acclist[i][0];
        cell2.innerHTML = acclist[i][1];
        cell3.innerHTML = acclist[i][2];
    }

    // 将表格添加到新窗口中
    newWindow.document.body.appendChild(table);
}


function new_predict_test3(){
    a = new_predictobj();
    TMP=a[0];
    TGT=a[1];
    ele=a[2];
    filename ='';
    id = ele.data().id;
    feature_order = Object.keys(TMP);
    console.log(feature_order);
    // 将 feature_order 转换为字符串
    feature_order_str = JSON.stringify(feature_order);
    ele.data().order = feature_order_str;
    $.ajax({
        url: '/train',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ TMP, TGT, id }),
        success: function (response) {
            acc = response.accuracy + '';
            document.getElementById('haccuracy').value=acc.slice(0,6)
            document.getElementById('aaccuracy').value=acc.slice(0,6)
            filename = response.filename;
            console.log(filename);
            ele.data().model_name = filename;
            console.log(response.id+' : '+id);
            console.log(Object.keys(TGT));
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    
}
async function new_predict_test4(){
    let a = 0;
    let requests = [];

    while (true) {
        try {
            let currentElement = cy.elements()[a];
            let currentId = currentElement._private.data.id;
            
            if (currentId.indexOf('AI') == 0) {
                b = new_predictnode(currentElement);
                TMP=b[0];
                TGT=b[1];
                ele=b[2];
                id = ele.data().id;
                feature_order = Object.keys(TMP);
                console.log(feature_order);
                // 将 feature_order 转换为字符串
                feature_order_str = JSON.stringify(feature_order);
                ele.data().order = feature_order_str;
                let request = new Promise((resolve, reject) => {
                    $.ajax({
                        url: '/train',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ TMP, TGT, id }),
                        dataType: 'json',
                        success: function (response) {
                            acc = response.accuracy + '';
                            nowid = response.id;
                            tgt = cy.$("#"+nowid).data().csv_lier;
                            let a = [nowid, tgt, acc.slice(0, 6)];
                            addtoAccuracylist(a);
                            cy.$("#"+nowid).data().model_name = response.filename;
                            testtrue = [response.accuracy, response.id, response.target, response.data];
                            console.log(testtrue);

                            resolve();
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });
                });

                requests.push(request);
            }

            a++;
        } catch {
            break;
        }
    }

    // 等待所有请求完成
    await Promise.all(requests);
    displayTable(acclist);
    clear();
}

//2023/4/6
function multimodeltrain(){
    a = new_predictobj();
    TMP=a[0];
    TGT=a[1];
    ele=a[2];
    type=ele.data().type;
    console.log(type);
    filename ='';
    id = ele.data().id;
    feature_order = Object.keys(TMP);
    console.log(feature_order);
    // 将 feature_order 转换为字符串
    feature_order_str = JSON.stringify(feature_order);
    ele.data().order = feature_order_str;
    $.ajax({
        url: '/multimodeltrain',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ TMP, TGT, id, type }),
        success: function (response) {
            acc = response.accuracy + '';
            document.getElementById('haccuracy').value=acc.slice(0,6)
            document.getElementById('aaccuracy').value=acc.slice(0,6)
            filename = response.filename;
            console.log(filename);
            ele.data().model_name = filename;
            console.log(response.id+' : '+id);
            console.log(Object.keys(TGT));
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    
}
async function multimodeltrain_eachnode(){
    let a = 0;
    let requests = [];

    while (true) {
        try {
            let currentElement = cy.elements()[a];
            let currentId = currentElement._private.data.id;
            
            if (currentId.indexOf('AI') == 0) {
                b = new_predictnode(currentElement);
                TMP=b[0];
                TGT=b[1];
                ele=b[2];
                type=ele.data().type;
                console.log(type);
                id = ele.data().id;
                feature_order = Object.keys(TMP);
                console.log(feature_order);
                // 将 feature_order 转换为字符串
                feature_order_str = JSON.stringify(feature_order);
                ele.data().order = feature_order_str;
                let request = new Promise((resolve, reject) => {
                    $.ajax({
                        url: '/multimodeltrain',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ TMP, TGT, id, type }),
                        dataType: 'json',
                        success: function (response) {
                            acc = response.accuracy + '';
                            nowid = response.id;
                            tgt = cy.$("#"+nowid).data().csv_lier;
                            let a = [nowid, tgt, acc.slice(0, 6)];
                            addtoAccuracylist(a);
                            cy.$("#"+nowid).data().model_name = response.filename;
                            testtrue = [response.accuracy, response.id, response.target, response.data];
                            console.log(testtrue);

                            resolve();
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });
                });

                requests.push(request);
            }

            a++;
        } catch {
            break;
        }
    }

    // 等待所有请求完成
    await Promise.all(requests);
    displayTable(acclist);
    clear();
}

function VDTtrain(){
    a = new_predictobj();
    TMP=a[0];
    TGT=a[1];
    ele=a[2];
    type=ele.data().type;
    console.log(type);
    filename ='';
    id = ele.data().id;
    feature_order = Object.keys(TMP);
    console.log(feature_order);
    // 将 feature_order 转换为字符串
    feature_order_str = JSON.stringify(feature_order);
    ele.data().order = feature_order_str;
    $.ajax({
        url: '/VDTtrain',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ TMP, TGT, id, type }),
        success: function (response) {
            acc = response.accuracy + '';
            document.getElementById('haccuracy').value=acc.slice(0,6)
            document.getElementById('aaccuracy').value=acc.slice(0,6)
            filename = response.filename;
            img_filename = response.img_filename;
            console.log(filename);
            ele.data().model_name = filename;
            ele.data().VDT_name = img_filename;
            alert("VDT training finished!");
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    
}

function optimizeVDT(){
    a = new_predictobj();
    TMP=a[0];
    TGT=a[1];
    ele=a[2];
    type=ele.data().type;
    console.log(type);
    filename ='';
    id = ele.data().id;
    feature_order = Object.keys(TMP);
    console.log(feature_order);
    // 将 feature_order 转换为字符串
    feature_order_str = JSON.stringify(feature_order);
    ele.data().order = feature_order_str;
    $.ajax({
        url: '/VDToptimize',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ TMP, TGT, id, type }),
        success: function (response) {
            acc = response.accuracy + '';
            document.getElementById('haccuracy').value=acc.slice(0,6)
            document.getElementById('aaccuracy').value=acc.slice(0,6)
            filename = response.filename;
            img_filename = response.img_filename;
            console.log(filename);
            ele.data().model_name = filename;
            ele.data().VDT_name = img_filename;
            alert("VDT has optimized");
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    
}

function pophighlowcorr() {
    document.getElementById("high_corr").value = highcorr;
    document.getElementById("low_corr").value = lowcorr;
    document.getElementById("popup").style.display = "block";
  }

function onOkButtonClick() {
    let newHighcorr = parseFloat(document.getElementById("high_corr").value);
    let newLowcorr = parseFloat(document.getElementById("low_corr").value);
    if (newHighcorr >= 0 && newHighcorr <= 1 && newLowcorr >= 0 && newLowcorr <= 1) {
      highcorr = newHighcorr;
      lowcorr = newLowcorr;
      document.getElementById("popup").style.display = "none";
      newpop_slider(highcorr, lowcorr);
    } else {
      alert("Correlation must be between 0 and 1!");
    }
  }

  function get_vdtimage() {
    showFloatingWindow();
    ele = get_nowobj();
    if (!ele.data().VDT_name) {
        alert("Please train the model first!");
        return;
    }
    image_path = ele.data().VDT_name;
    $.ajax({
        type: "POST",
        url: "/get_vdtimage",
        contentType: "application/json",
        data: JSON.stringify({ "image_path": image_path}),
        dataType: "json",
        success: function (response) {
            hideFloatingWindow();
            var scatterplot_matrix = "data:image/png;base64," + response.image_base64_string;
            var popwin = window.open("", "_blank", "width=800,height=600");
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
            'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
            '.scatterplot-container { display: flex; flex-direction: column; align-items: center; }' +
            '.scatterplot-img { max-width: 100%; max-height: 100%; position: absolute; cursor: grab; transform-origin: left top; }' +
            '.img-container { width: 600px; height: 600px; overflow: scroll; border: 1px solid #ccc; position: relative; }' +
            'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
            'input[type=range] { width: 100%; max-width: 400px; }' +
            '</style><script>function myfunction2() {window.close(); }</script></head><body>');
            popwin.document.write('<div id="scatterplot_matrix-container" class="scatterplot-container">');
            popwin.document.write('<div class="img-container"><img class="scatterplot-img" src="' + scatterplot_matrix + '" alt="scatterplot" id="scatterplot-image"></div><br>');
            popwin.document.write('<input type="range" id="slider" min="1" max="3" value="1" step="0.1">');
            popwin.document.write('<button class="close-btn" onclick="myfunction2()">OK</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
    
            // 缩放滑动条事件处理
            popwin.document.getElementById('slider').addEventListener('input', function (event) {
                var scale = parseFloat(event.target.value);
                var scatterplotImage = popwin.document.getElementById('scatterplot-image');
                scatterplotImage.style.transform = 'scale(' + scale + ')';
            });
    
            // 图片拖动事件处理
            var imgContainer = popwin.document.querySelector('.img-container');
            var img = popwin.document.querySelector('.scatterplot-img');
            var isMouseDown = false;
            var startX, startY, initialX, initialY;
    
            img.addEventListener('mousedown', function (event) {
                isMouseDown = true;
                startX = event.clientX;
                startY = event.clientY;
                initialX = img.offsetLeft;
                initialY = img.offsetTop;
                img.style.cursor = 'grabbing';
            });
    
            imgContainer.addEventListener('mousemove', function (event) {
                if (!isMouseDown) return;
                var dx = event.clientX - startX;
                var dy = event.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;
    
                // 限制图片只能向右和向下移动
                img.style.left = newX + 'px';
                img.style.top = newY + 'px';
            });
    
            imgContainer.addEventListener('mouseup', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
    
            imgContainer.addEventListener('mouseleave', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
        }
    });
}

//2023/5/31
function accvsnode(){
    a = new_predictobj();
    TMP=a[0];
    TGT=a[1];
    ele=a[2];
    type=ele.data().type;
    console.log(type);
    filename ='';
    id = ele.data().id;
    feature_order = Object.keys(TMP);
    console.log(feature_order);
    // 将 feature_order 转换为字符串
    feature_order_str = JSON.stringify(feature_order);
    ele.data().order = feature_order_str;
    $.ajax({
        url: '/leafvsacc',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ TMP, TGT, id, type }),
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
          console.error('Error:', error);
        },
      });
    
}

async function accvsnode2() {
    let a = 0;
    let requests = [];

    while (true) {
        try {
            let currentElement = cy.elements()[a];
            let currentId = currentElement._private.data.id;
            
            if (currentId.indexOf('AI') == 0) {
                b = new_predictnode(currentElement);
                TMP=b[0];
                TGT=b[1];
                ele=b[2];
                type=ele.data().type;
                console.log(type);
                id = ele.data().id;
                feature_order = Object.keys(TMP);
                console.log(feature_order);
                // 将 feature_order 转换为字符串
                feature_order_str = JSON.stringify(feature_order);
                ele.data().order = feature_order_str;
                let request = new Promise((resolve, reject) => {
                    $.ajax({
                        url: '/leafvsacc',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ TMP, TGT, id, type }),
                        dataType: 'json',
                        success: function (response) {
                            console.log(response);
                            eleid = response.id;
                            nodevsacc = response.nodevsacc;
                            nodevsr2 = response.nodevsr2;
                            nowid = response.id;
                            cy.$("#"+eleid).data().nodevsacc = nodevsacc;
                            cy.$("#"+eleid).data().nodevsr2 = nodevsr2;
                            resolve();
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });
                });

                requests.push(request);
            }

            a++;
        } catch {
            break;
        }
    }

    // 等待所有请求完成
    await Promise.all(requests);
    clear();
}

function get_accvsnode() {
    showFloatingWindow();
    ele = get_nowobj();
    if (!ele.data().nodevsacc) {
        alert("Please click play button first!");
        return;
    }
    image_path = ele.data().nodevsacc;
    $.ajax({
        type: "POST",
        url: "/get_vdtimage",
        contentType: "application/json",
        data: JSON.stringify({ "image_path": image_path}),
        dataType: "json",
        success: function (response) {
            hideFloatingWindow();
            var scatterplot_matrix = "data:image/png;base64," + response.image_base64_string;
            var popwin = window.open("", "_blank", "width=800,height=600");
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
            'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
            '.scatterplot-container { display: flex; flex-direction: column; align-items: center; }' +
            '.scatterplot-img { max-width: 100%; max-height: 100%; position: absolute; cursor: grab; transform-origin: left top; }' +
            '.img-container { width: 600px; height: 600px; overflow: scroll; border: 1px solid #ccc; position: relative; }' +
            'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
            'input[type=range] { width: 100%; max-width: 400px; }' +
            '</style><script>function myfunction2() {window.close(); }</script></head><body>');
            popwin.document.write('<div id="scatterplot_matrix-container" class="scatterplot-container">');
            popwin.document.write('<div class="img-container"><img class="scatterplot-img" src="' + scatterplot_matrix + '" alt="scatterplot" id="scatterplot-image"></div><br>');
            popwin.document.write('<input type="range" id="slider" min="1" max="3" value="1" step="0.1">');
            popwin.document.write('<button class="close-btn" onclick="myfunction2()">OK</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
    
            // 缩放滑动条事件处理
            popwin.document.getElementById('slider').addEventListener('input', function (event) {
                var scale = parseFloat(event.target.value);
                var scatterplotImage = popwin.document.getElementById('scatterplot-image');
                scatterplotImage.style.transform = 'scale(' + scale + ')';
            });
    
            // 图片拖动事件处理
            var imgContainer = popwin.document.querySelector('.img-container');
            var img = popwin.document.querySelector('.scatterplot-img');
            var isMouseDown = false;
            var startX, startY, initialX, initialY;
    
            img.addEventListener('mousedown', function (event) {
                isMouseDown = true;
                startX = event.clientX;
                startY = event.clientY;
                initialX = img.offsetLeft;
                initialY = img.offsetTop;
                img.style.cursor = 'grabbing';
            });
    
            imgContainer.addEventListener('mousemove', function (event) {
                if (!isMouseDown) return;
                var dx = event.clientX - startX;
                var dy = event.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;
    
                // 限制图片只能向右和向下移动
                img.style.left = newX + 'px';
                img.style.top = newY + 'px';
            });
    
            imgContainer.addEventListener('mouseup', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
    
            imgContainer.addEventListener('mouseleave', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
        }
    });
}

function get_r2vsnode() {
    showFloatingWindow();
    ele = get_nowobj();
    if (!ele.data().nodevsr2) {
        alert("Please click play button first!");
        return;
    }
    image_path = ele.data().nodevsr2;
    $.ajax({
        type: "POST",
        url: "/get_vdtimage",
        contentType: "application/json",
        data: JSON.stringify({ "image_path": image_path}),
        dataType: "json",
        success: function (response) {
            hideFloatingWindow();
            var scatterplot_matrix = "data:image/png;base64," + response.image_base64_string;
            var popwin = window.open("", "_blank", "width=800,height=600");
    
            // 添加 HTML 元素到弹出窗口
            popwin.document.write('<html><head><style>/* Your custom styles */' +
            'body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }' +
            '.scatterplot-container { display: flex; flex-direction: column; align-items: center; }' +
            '.scatterplot-img { max-width: 100%; max-height: 100%; position: absolute; cursor: grab; transform-origin: left top; }' +
            '.img-container { width: 600px; height: 600px; overflow: scroll; border: 1px solid #ccc; position: relative; }' +
            'button.close-btn { background-color: #4CAF50; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 10px 2px; cursor: pointer; border-radius: 4px; }' +
            'input[type=range] { width: 100%; max-width: 400px; }' +
            '</style><script>function myfunction2() {window.close(); }</script></head><body>');
            popwin.document.write('<div id="scatterplot_matrix-container" class="scatterplot-container">');
            popwin.document.write('<div class="img-container"><img class="scatterplot-img" src="' + scatterplot_matrix + '" alt="scatterplot" id="scatterplot-image"></div><br>');
            popwin.document.write('<input type="range" id="slider" min="1" max="3" value="1" step="0.1">');
            popwin.document.write('<button class="close-btn" onclick="myfunction2()">OK</button>');
            popwin.document.write('</div>');
            popwin.document.write('</body></html>');
            popwin.document.close();
    
            // 缩放滑动条事件处理
            popwin.document.getElementById('slider').addEventListener('input', function (event) {
                var scale = parseFloat(event.target.value);
                var scatterplotImage = popwin.document.getElementById('scatterplot-image');
                scatterplotImage.style.transform = 'scale(' + scale + ')';
            });
    
            // 图片拖动事件处理
            var imgContainer = popwin.document.querySelector('.img-container');
            var img = popwin.document.querySelector('.scatterplot-img');
            var isMouseDown = false;
            var startX, startY, initialX, initialY;
    
            img.addEventListener('mousedown', function (event) {
                isMouseDown = true;
                startX = event.clientX;
                startY = event.clientY;
                initialX = img.offsetLeft;
                initialY = img.offsetTop;
                img.style.cursor = 'grabbing';
            });
    
            imgContainer.addEventListener('mousemove', function (event) {
                if (!isMouseDown) return;
                var dx = event.clientX - startX;
                var dy = event.clientY - startY;
                var newX = initialX + dx;
                var newY = initialY + dy;
    
                // 限制图片只能向右和向下移动
                img.style.left = newX + 'px';
                img.style.top = newY + 'px';
            });
    
            imgContainer.addEventListener('mouseup', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
    
            imgContainer.addEventListener('mouseleave', function () {
                isMouseDown = false;
                img.style.cursor = 'grab';
            });
        }
    });
}
function Dataflow_to_NaturalLanguage(){
    // list = {};
    list=[];
    for (var i = 0; i < cy.elements().length; i++) {
        
        if(cy.elements()[i]._private.data.id.substring(0,2)=="AI"){
            if(cy.getElementById(cy.elements()[i]._private.data.id).data().csv_lier == null){
                alert("no dataa ! \n please select data first!");
                return;
            }
            
            list.push([cy.elements()[i]._private.data.id, cy.getElementById(cy.elements()[i]._private.data.id).data().csv_lier, get_incomers_csv_lier(cy.getElementById(cy.elements()[i]._private.data.id).incomers())]);
            // list[cy.elements()[i]._private.data.id] = [cy.getElementById(cy.elements()[i]._private.data.id).data().csv_lier, cy.getElementById(cy.elements()[i]._private.data.id).incomers()];
        }
    }
    console.log(list);
    resoult = generate_natural_language(list);
    console.log(resoult[0]);
    console.log(resoult[1]);
    //get incomers csv_lier
    function get_incomers_csv_lier(incomers){
        incomers_csv_lier = [];
        for (var i = 0; i < incomers.length; i++) {
            if(incomers[i]._private.data.csv_lier != null&&incomers[i]._private.data.id.substring(0,2)=="AI"||incomers[i]._private.data.id.substring(0,2)=="s-"){
                incomers_csv_lier.push(incomers[i]._private.data.csv_lier);
            }
        }
        return incomers_csv_lier;
    }
    //生成自然语言
    function generate_natural_language(list){
        listlanguage1=[];
        listlanguage2=[];  
        for(var i=0;i<list.length;i++){
            if(list[i][2].length==0){
            }
            else{
                // var structure_language=list[i][0]+" is a "+list[i][1]+" model, which is trained by "+list[i][2].join(",")+".";
                var rationality_language=list[i][1]+"と"+list[i][2].join(",")+"の間で因果関係がありますか？";
                var structure_language=list[i][0]+"は"+list[i][1]+"モデルです。"+"このモデルは"+list[i][2].join(",")+"を使って学習されました。";
                listlanguage1.push(rationality_language);
                listlanguage2.push(structure_language);
            }
        }
        return [listlanguage1,listlanguage2];
    }
}

function showcorr1(){
    sum=0;
    j=0;
    for (var i = 0; i < cy.elements().length; i++) {
        
        if(cy.elements()[i]._private.data.corr!=null){
           
            sum+=cy.elements()[i]._private.data.corr;
            j++;
            // alert(cy.elements()[i]._private.data.corr);
            // alert(sum);
            // alert(i);
            console.log('sum:'+sum);
            console.log('j:'+j);
            console.log('corr:'+cy.elements()[i]._private.data.corr);
            console.log('\n');
            
        }
    }
    alert(sum/j);
    str=sum/j+'#';
    document.getElementById('hcorr').value=str.slice(0,6);
}