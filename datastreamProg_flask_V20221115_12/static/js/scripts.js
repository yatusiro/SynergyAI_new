let fileInput = document.getElementById('csv_file');
let message = document.getElementById('message');
let fileReader = new FileReader();

// ファイル変更時イベント
fileInput.onchange = () => {
  //message.innerHTML = "読み込み中..."

  let file = fileInput.files[0];
  fileReader.readAsText(file, "Shift_JIS");
  console.log(file);
};

// ファイル読み込み時
let items = [];
fileReader.onload = () => {
  // ファイル読み込み
  let fileResult = fileReader.result.split('\r\n');

  // 先頭行をヘッダとして格納
  let header = fileResult[0].split(',')
  let temp=[];
  let sum=0;
  let head=new Array();
  head[0]=new Array();
  head[1]=new Array();
  init();
  // CSVから情報を取得
  items = fileResult.map(item => {
    let datas = item.split(',');
    let result = {};
    sum+=1;
    //console.log(datas);
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];//key is 列名
      //console.log(key);
    }
    return result;
  });
  //console.log(sum);
  for(let b=0;b<=sum-3;b++){
    let hdt = fileResult[b+1].split(',');
    var tem2=[];
    for(let a=0;a<hdt.length;a++){
      //console.log(parseInt(hd[a]));
      tem2[a]=parseInt(hdt[a]);
    }
    temp[b]=tem2;
  }
  at="a1,a2";
  temp3=select(temp,at);
  temp4=select(temp,"a1,a3,a5");
  //console.log(temp3);
  //console.log(temp4[1]);
  console.log(temp3[99]);
  function select(temp,a){
    var key=[];
    key = a.split(',');
    let temp2=new Array();
    for(var a=0;a<sum-3;a++){
      temp2[a]=new Array();
  }
    for(var e=0;e<key.length;e++){
      var keynum = find2(key[e]);
      for(var b=0;b<sum-3;b++){
        temp2[b][e]=temp[b][keynum];
      }
  }
  return temp2;
  }
  
  function init(){
    head[0]=header;
    for(var a=0;a<head[0].length;a++){
      head[1][a]=a;
    }
  }
  function find2(a){
    for(var b=0;b<head[0].length;b++){
      if(a==head[0][b]){
        return head[1][b];
      }
    }
  }
  // 先頭行の削除
  //fileResult.shift();
  // テーブル初期化
  //let tbody = document.querySelector('#csv_data_table tbody');
  //tbody.innerHTML = "";

  //　CSVの内容を表示
  
  //tbody.innerHTML = tbody_html;

  //message.innerHTML = items.length + "件のデータを読み込みました。"
}

// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
  //message.innerHTML = "ファイル読み取りに失敗しました。"
}
