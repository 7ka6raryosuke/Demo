//ランダムに数字を生成
const rand = (min,max) => {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//5桁の数字を生成

const generateSeq = () => {
    return[
        rand(1000,9999),rand(1000,9999),rand(1000,9990),rand(1000,9999),rand(1000,9999)
    ];
}


 
//数列を表示する
const showseq = (seq) => {
    const seqElem = document.getElementById("seq");
    seqElem.textContent = `${seq}`;
}



//答えを入力してボタンを押すことができる画面を表示
const inputform  = (arrayanswer) => {
    const questionnum = rand(1,5);
    const olElem = document.getElementById("answer");
        const liElem = document.createElement("li");
        const inputElem = document.createElement("input");
        inputElem.value = `${questionnum}番目に出た数字を入力`; 
        liElem.appendChild(inputElem);  
        olElem.appendChild(liElem);  

    const resButton = document.getElementById("res_button");


    resButton.addEventListener('click', () => {
            let num = inputElem.value;
            if(num == arrayanswer[questionnum-1]){
                inputElem.value= "正解";
            }else{
                inputElem.value=`×不正解　正答:${arrayanswer[questionnum-1]}`;
            }
    });
}

//数字を時間が過ぎたら消す
const clearseq = () =>{
    const seqElem = document.getElementById("seq");
    seqElem.textContent = '';
}

//開始ボタンが押されたら解答フォームを消す
const clearinputform = () => {
    const olElem = document.getElementById("answer");
    while(olElem.childElementCount){
        olElem.removeChild(olElem.firstChild);
    }
}

const startButton = document.getElementById("start_button");
const Duration = 12000;


//1秒ごとに数列を見せる
startButton.addEventListener('click', () => {

    clearinputform();//前の解答フォームを消す
    const sequence = generateSeq();//4桁の数字が五つならぶ配列を生成
    const initTime = Date.now();
    let remainMsec = Duration;   
    console.log(sequence);
    let count=0;

    let timer = setInterval(() => {    
        remainMsec -= 2000;
        const currentTime = Date.now();

        if(currentTime - initTime > Duration){
            clearInterval(timer);//タイマーを止める
            clearseq();//画面から数列を消す
            inputform(sequence);//解答入力画面に行く
        }else{
            showseq(sequence[count]);
            count++;
        }   
    },2000);
});

