var progress = document.getElementById('progress');
var textarea = document.getElementById('textarea');
var canvas = document.getElementById("canvas");

document.getElementById('fileSel').onchange = function()
{
    //thisはdocument.getElementById('fileSel')
    //files[0]は最初のファイル
    let img = this.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)

    reader.onload = function()
    {
        drawImage(reader.result)
    }
}

function drawImage(url) {
    let ctx = canvas.getContext('2d')
    let image = new Image()
    image.src = url
    image.crossOrigin = "Anonymous";
    image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)

        let src = ctx.getImageData(0, 0, canvas.width, canvas.height)

        Tesseract.recognize(src, {lang: 'eng'}).progress(function(p){
            progress.innerHTML = p.progress
        }).then(function(r){
            textarea.value = r.text
            console.log(r.text);
            var result = r.text.split(/\s/);
　　　　　　　console.log( result );

            //文字スタート位置
            num1=result.indexOf("CLUB");
            //数値スタート位置
　　　　　　　num2=result.indexOf(":f");
            //

            console.log(result[num1]+result[num1 + 1]);
            console.log(result[num2 + 1]);
            console.log(result[num1 + 2]+result[num1 + 3]);
            console.log(result[num2 + 2]);
            console.log(result[num1 + 4]+result[num1 + 5]);
            console.log(result[num2 + 3]);

            //文字スタート位置
            num3=result.indexOf("SPIN");
            //数値スタート位置
　　　　　　　num4=result.indexOf("SIDE");

            //
            console.log(result[num3]+result[num3 + 1]);
            console.log(result[num4 + 1]);
            console.log(result[num3 + 2]);
            console.log(result[num4 + 2]);
            console.log(result[num3 + 3]);
            console.log(result[num4 + 3]);

            document.getElementById("issue1").value=result[num1]+result[num1 + 1];
            document.getElementById("issue11").value=result[num2 + 1];
            document.getElementById("issue2").value=result[num1 + 2]+result[num1 + 3];
            document.getElementById("issue12").value=result[num2 + 2];
            document.getElementById("issue3").value=result[num1 + 4]+result[num1 + 5];
            document.getElementById("issue13").value=result[num2 + 3];
            document.getElementById("issue4").value=result[num3]+result[num3 + 1];
            document.getElementById("issue14").value=result[num4 + 1];
            document.getElementById("issue5").value=result[num3 + 2];
            document.getElementById("issue15").value=result[num4 + 2];
            document.getElementById("issue6").value=result[num3 + 3];
            document.getElementById("issue16").value=result[num4 + 3];


        })
    }
}
