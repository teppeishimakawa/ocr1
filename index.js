

//1列目：CLUB SPEED
//2列目：SPIN RATE  対応OCR

var firstLineWord;
var secondLineWord;

//////////単語設定///////////
document.getElementById("canvas").addEventListener('mousedown',function()
{
firstLineWord=document.getElementById("fLineWord").value;
console.log(firstLineWord);
});

document.getElementById("canvas").addEventListener('mousedown',function()
{
secondLineWord=document.getElementById("sLineWord").value;
console.log(secondLineWord);

flg1=parseInt(document.getElementById("wordNum11").value);
flg2=parseInt(document.getElementById("wordNum12").value);
flg3=parseInt(document.getElementById("wordNum13").value);
flg4=parseInt(document.getElementById("wordNum21").value);
flg5=parseInt(document.getElementById("wordNum22").value);
flg6=parseInt(document.getElementById("wordNum23").value);

if((flg1 !== 1) && (flg1 !== 2)||
   (flg2 !== 1) && (flg2 !== 2)||
   (flg3 !== 1) && (flg3 !== 2)||
   (flg4 !== 1) && (flg4 !== 2)||
   (flg5 !== 1) && (flg5 !== 2)||
   (flg6 !== 1) && (flg6 !== 2)
  )
{
alert("単語数は1か2を入力して下さい")
}

});
///////////////////////////


var progress = document.getElementById('progress');
var textarea = document.getElementById('textarea');
var canvas = document.getElementById("canvas");


var ctx,image;

// 矩形用
var MIN_WIDTH  = 3;
var MIN_HEIGHT = 3;

var rect_MousedownFlg = false;
var rect_sx = 0;
var rect_sy = 0;
var rect_ex = 0;
var rect_ey = 0;
var rec_canvas,rec_ctx;

var imageWidth;
var imageHeight;

var firstStr,secondStr,thirdStr,fourthStr,fifthStr,sixthStr;


var flg1;
var flg2;
var flg3;
var flg4;
var flg5;
var flg6;

//


//nameMojiテキストエリアのname属性にnameIDのvalueを追加
 document.getElementById("nameMoji").addEventListener('click', function()
{
 document.getElementById("nameMoji").setAttribute("name",document.getElementById("nameId").value);
}, false);



document.getElementById('fileSel').onchange = function()
{
    //thisはdocument.getElementById('fileSel')
    //files[0]は最初のファイル
    img = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = function()
    {
     //resultは、FileReaderのプロパティ
     drawImage(reader.result);
    }
}


function drawImage(url)
{
    ctx = canvas.getContext('2d');

    image = new Image();
    image.src = url
    image.crossOrigin = "Anonymous";
    image.onload = () =>
    {
    //取り込み画像1/はdrawImage,onMouseMove,onMouseUp２箇所
        imageWidth=image.width/2;
        imageHeight=image.height/2;
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        ctx.drawImage(image, 0, 0,imageWidth,imageHeight);

//rectのcanvas
  rec_canvas = document.getElementById("RecCanvas");
  rec_ctx = rec_canvas.getContext("2d");
  rec_canvas.width = rec_canvas.height = 1;
    }
}


// 色の反転
function getTurningAround(color)
{

 // 灰色は白にする
 if(color >= 88 && color <= 168){
   return 255;
 // 色を反転する
 }else{
   return 255 - color;
 }
}


function OnMousedown(event)
{

  rect_MousedownFlg = true;

  // 座標を求める。
  //left, top, right, bottom, x, y, width, height の各プロパティを持つ、要素全体を含む最小の矩形
  var rect = event.target.getBoundingClientRect();

  //初期化。各値は0
  rect_sx = rect_ex = event.clientX - rect.left;
  rect_sy = rect_ey = event.clientY - rect.top;
  // 矩形の枠色を反転させる
  //getImageData(sx, sy, sw, sh)メソッドは、指定範囲のImageDataオブジェクトを取得する際に使用
  //引数(sx, sy)は、取得範囲の開始座標。 引数(sw, sh)は、取得範囲の幅と高さ
  //imagedata.data[0]は1pixel目のr
  var imagedata = ctx.getImageData(rect_sx, rect_sy, 1, 1);
  ctx.strokeStyle = 'rgb(' + getTurningAround(imagedata.data[0]) +
                           ',' + getTurningAround(imagedata.data[1]) +
                           ',' + getTurningAround(imagedata.data[2]) + ')';
  // 線の太さ
  ctx.lineWidth = 2;

  // 矩形の枠線を点線にする
  ctx.setLineDash([2, 3]);
}



function OnMousemove(event)
{

  if(rect_MousedownFlg)
  {
    // 座標を求める
    /*
     * rectでcanvasの絶対座標位置を取得し、
     * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
     */

    //rect.left,rect.topはキャンバスの左上点の絶対座標
    //クリック座標はdocumentからの位置を返すため
    //クリック座標であるe.clientX,e.clientYからその分を引く
    //これでctx内のどの位置からどの位置まで線を引くかを指定できる
    var rect = event.target.getBoundingClientRect();
    rect_ex = event.clientX - rect.left;
    rect_ey = event.clientY - rect.top;

    // 元画像の再描画
    ctx.drawImage(image,0,0,imageWidth,imageHeight);

    // 矩形の描画
    ctx.beginPath();

      //以下はctx内の左上を(0,0)とした座標

      // 上
      ctx.moveTo(rect_sx,rect_sy);
      ctx.lineTo(rect_ex,rect_sy);

      // 下
      ctx.moveTo(rect_sx,rect_ey);
      ctx.lineTo(rect_ex,rect_ey);

      // 右
      ctx.moveTo(rect_ex,rect_sy);
      ctx.lineTo(rect_ex,rect_ey);

      // 左
      ctx.moveTo(rect_sx,rect_sy);
      ctx.lineTo(rect_sx,rect_ey);

    ctx.stroke();
  }
}




function OnMouseup(event)
{

  // キャンバスの範囲外は無効にする
  if(rect_sx === rect_ex && rect_sy === rect_ey)
  {
    // 初期化
    ctx.drawImage(image,0,0,imageWidth,imageHeight);
    rect_sx = rect_ex = 0;
    rect_sy = rect_ey = 0;
    rec_canvas.width = rec_canvas.height = 1;
  }

  // 矩形の画像を取得する
  if(rect_MousedownFlg)
  {

    // 矩形のサイズ
    rec_canvas.width  = Math.abs(rect_sx - rect_ex);
    rec_canvas.height = Math.abs(rect_sy - rect_ey);

    // 指定のサイズ以下は無効にする[3x3]
    if(!(rec_canvas.width >= MIN_WIDTH && rec_canvas.height >= MIN_HEIGHT))
    {
      // 初期化
      ctx.drawImage(image,0,0,imageWidth,imageHeight);
      rect_sx = rect_ex = 0;
      rect_sy = rect_ey = 0;
      rec_canvas.width = rec_canvas.height = 1;
    }else
    {
      // 矩形用キャンバスへ画像の転送
      rec_ctx.drawImage(image,
                        Math.min(rect_sx,rect_ex)*2,Math.min(rect_sy,rect_ey)*2,
                        Math.max(rect_sx - rect_ex,rect_ex - rect_sx)*2,Math.max(rect_sy - rect_ey ,rect_ey - rect_sy)*2,
                        0,0,rec_canvas.width,rec_canvas.height);
    }
   }
  rect_MousedownFlg = false;



        let src = rec_ctx.getImageData(0, 0, rec_canvas.width, rec_canvas.height)

        Tesseract.recognize(src, {lang: 'eng'}).progress(function(p)
         {
            progress.innerHTML = p.progress
         }).then
   (function(r)
    {
            textarea.value = r.text
            console.log(r.text);

            //resultはocr結果をスペースで区切った配列
            var result = r.text.split(/\s/);
　　　　　　　console.log(result);

//頭文字スタート位置
            num1=result.indexOf(firstLineWord);
//数値スタート位置
            num2=r.text.match(/\d+(\.\d+)?\S?/g);
            console.log(num2);

//2列目の頭文字スタート位置
            num3=result.indexOf(secondLineWord);

//SPIN以降の配列作成
            array_niretsu=result.slice(num3);
//SPIN以降の配列をスペース区切りで文字列変換
            str_niretsu=array_niretsu.join(' ');
//2列目の数値スタート位置
            num4=str_niretsu.match(/\d+(\.\d+)?\S?/g);
            console.log(num4);

console.log(flg1);
console.log(flg2);
console.log(flg3);
console.log(flg4);
console.log(flg5);
console.log(flg6);
////////////項目文言設定/////////////////////////


if((flg1==1) && (flg2==1) && (flg3==1))
{
firstStr= result[num1];
secondStr=result[num1 + 1];
thirdStr= result[num1 + 2];
}else{
//if括弧1
 if((flg1==1) && (flg2==1) && (flg3=2))
 {
 firstStr= result[num1];
 secondStr=result[num1 + 1];
 thirdStr= result[num1 + 2] + result[num1 + 3];
 }else
//if括弧2
  {if((flg1==1) && (flg2==2) && (flg3==1))
  {
  firstStr= result[num1];
  secondStr=result[num1 + 1] + result[num1 + 2];
  thirdStr= result[num1 + 3];
//if括弧3
  }else{if((flg1==1) && (flg2==2) && (flg3=2))
   {
   firstStr= result[num1];
   secondStr=result[num1 + 1] + result[num1 + 2];
   thirdStr= result[num1 + 3] + result[num1 + 4];
//if括弧4
   }else{if((flg1==2) && (flg2==1) && (flg3==1))
    {
    firstStr= result[num1] + result[num1 + 1];
    secondStr=result[num1 + 2];
    thirdStr= result[num1 + 3];
    //if括弧3
    }else{ if((flg1==2) && (flg2==2) && (flg3==1))
     {
     firstStr= result[num1] + result[num1 + 1];
     secondStr=result[num1 + 2] + result[num1 + 3];
     thirdStr= result[num1 + 4];
     }else{ if((flg1==2) && (flg2==1) && (flg3=2))
      {
      firstStr= result[num1] + result[num1 + 1];
      secondStr=result[num1 + 2];
      thirdStr= result[num1 + 3] + result[num1 + 4];
      }else{ if((flg1==2) && (flg2==2) && (flg3=2))
       {
       firstStr= result[num1] + result[num1 + 1];
       secondStr=result[num1 + 2] + result[num1 + 3] ;
       thirdStr= result[num1 + 4] + result[num1 + 5];
       }


       }
      }
     }
    }
   }
  }
 }


if((flg4==1) && (flg5==1) && (flg6==1))
 {
fourthStr= result[num3];
fifthStr=result[num3 + 1];
sixthStr= result[num3 + 2];
 }else{
  if((flg4==1) && (flg5==1) && (flg6==2))
  {
 fourthStr= result[num3];
 fifthStr=result[num3 + 1];
 sixthStr= result[num3 + 2] + result[num3 + 3];
  }else{
   if((flg4==1) && (flg5==2) && (flg6==1))
  {
  fourthStr= result[num3];
  fifthStr=result[num3 + 1] + result[num3 + 2];
  sixthStr= result[num3 + 3];
  }else{
   if((flg4==1) && (flg5==2) && (flg6==2))
   {
   fourthStr= result[num3];
   fifthStr=result[num3 + 1] + result[num3 + 2];
   sixthStr= result[num3 + 3] + result[num3 + 4];;
   }else{
    if((flg4==2) && (flg5==1) && (flg6==1))
    {
    fourthStr= result[num3] + result[num3 + 1];
    fifthStr=result[num3 + 2];
    sixthStr= result[num3 + 3];
    }else{
     if((flg4==2) && (flg5==2) && (flg6==1))
     {
     fourthStr= result[num3] + result[num3 + 1];
     fifthStr=result[num3 + 2] + result[num3 + 3];
     sixthStr= result[num3 + 4];
     }else{
      if((flg4==2) && (flg5==1) && (flg6==2))
      {
      fourthStr= result[num3] + result[num3 + 1];
      fifthStr=result[num3 + 2];
      sixthStr= result[num3 + 3] + result[num3 + 4];
      }else{
        if((flg4==2) && (flg5==2) && (flg6==2))
       {
       fourthStr= result[num3] + result[num3 + 1];
       fifthStr=result[num3 + 2] + result[num3 + 3] ;
       sixthStr= result[num3 + 4] + result[num3 + 5];
       }


      }
     }
    }
   }
  }
 }
}


            //1文字目と2文字目を合体して取得
            document.getElementById("issue1").value=firstStr;
            //1番目の数字取得
            document.getElementById("issue11").value=num2[0];
            //1番目の数字が入ったdomに、1文字目と2文字目を合体した文言をname属性として追加
            document.getElementById("issue11").setAttribute("name",firstStr);

            document.getElementById("issue2").value=secondStr;
            document.getElementById("issue12").value=num2[1];
            document.getElementById("issue12").setAttribute("name",secondStr);

            document.getElementById("issue3").value=thirdStr;
            document.getElementById("issue13").value=num2[2];
            document.getElementById("issue13").setAttribute("name",thirdStr);


            document.getElementById("issue4").value=fourthStr;
            ////10番目の数字取得
            document.getElementById("issue14").value=num4[0];
            document.getElementById("issue14").setAttribute("name",fourthStr);

            document.getElementById("issue5").value=fifthStr;
            document.getElementById("issue15").value=num4[1];
            document.getElementById("issue15").setAttribute("name",fifthStr);

            document.getElementById("issue6").value=sixthStr;
            document.getElementById("issue16").value=num4[2];
            document.getElementById("issue16").setAttribute("name",sixthStr);
;


//addEventlistenerの括弧
});
///////////////////////////////////////////////
/*
firstStr=result[num1]+result[num1 + 1];
secondStr=result[num1 + 2]+result[num1 + 3];
thirdStr=result[num1 + 4]+result[num1 + 5];

fourthStr=result[num3]+result[num3 + 1];
fifthStr=result[num3 + 2];
sixthStr=result[num3 + 3];
*/
////////////////////////////////////////////////







//onMouseUpのカッコ
 }


