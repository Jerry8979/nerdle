const bid = [
    "box1","box2","box3","box4","box5","box6","box7","box8",
    "box9","box10","box11","box12","box13","box14","box15","box16",
    "box17","box18","box19","box20","box21","box22","box23","box24",
    "box25","box26","box27","box28","box29","box30","box31","box32",
    "box33","box34","box35","box36","box37","box38","box39","box40",
    "box41","box42","box43","box44","box45","box46","box47","box48",
    "box49","box50","box51","box52","box53","box54","box55","box56",
    "box57","box58","box59","box60","box61","box62","box63","box64"
];
const nid = ["num0","num1","num2","num3","num4","num5","num6","num7","num8","num9"];
const oid = ["op0","op1","op2","op3","op4"];
const boxes = [];
const nums = [];
const ops = [];
const input = new Array(8).fill(null);
let a, b, c, d, this_op, answer;
const NumberOfBox = bid.length;
const NumberOfRow = NumberOfBox/8;
const OP = ["+","-","*","/","="];
const btn = document.getElementById("btn");
const btn_del = document.getElementById("del");
const btn_enter = document.getElementById("enter");

let cur = 0;
let row = 0;

for (let i=0; i<NumberOfBox; i++){
    boxes[i] = document.getElementById(bid[i]);
    boxes[i].onclick = function(){
        if (Math.floor(i/8) == row){
            set_border(0);
            cur = i;
            set_border(1);
        }
    }
}

for (let i=0; i<10; i++){
    nums[i] = document.getElementById(nid[i]);
    nums[i].onclick = function(){
        if (row < NumberOfRow){
            let text = nums[i].textContent;
            input[cur%8] = text;
            boxes[cur].textContent = text;
            next();
        }
    }
}

for (let i=0; i<5; i++){
    ops[i] = document.getElementById(oid[i]);
    ops[i].onclick = function(){
        if (row < NumberOfRow){
            let text = OP[i];
            input[cur%8] = text;
            boxes[cur].textContent = text;
            next();
        }
    }
}

function next(){
    set_border(0);
    if (cur % 8 == 7){
        let first_null = input.indexOf(null);
        if (first_null != -1){
            cur = row * 8 + first_null;
        }
    }
    else {
        //cur++;
        let first_null = input.indexOf(null, cur%8);
        let second_null = input.indexOf(null);
        if (first_null != -1){
            cur = row * 8 + first_null;
        }
        else if (second_null != -1){
            cur = row * 8 + second_null;
        }
    }
    set_border(1);
}

function set_border(is_set){
    if (cur >= 0 && cur < NumberOfBox){
        if (is_set == 0){
            boxes[cur].style.border = "2px solid white";
        }
        else if (is_set == 1){
            boxes[cur].style.border = "2px solid black";
        }
    }
}


btn_del.onclick = function(){
    if (cur%8 == 0){
        input[cur%8] = null;
        boxes[cur].textContent = "";
    }
    else if (boxes[cur].textContent == ""){
        set_border(0);
        cur--;
        set_border(1);
        input[cur%8] = null;
        boxes[cur].textContent = "";
    }
    else {
        input[cur%8] = null;
        boxes[cur].textContent = "";
    }
}

btn_enter.onclick = function(){
    if (input.includes(null)){
        console.log("Null value exists.");
    }
    else{
        for (let i=0; i<8; i++){
            let index = row * 8 + i;
            if (input[i] == answer[i]){
                boxes[index].style.color = 'green';
            }
            else if (answer.includes(input[i])){
                boxes[index].style.color = 'blue';
            }
            else {
                boxes[index].style.color = 'red';
            }
        }
        for (let i=0;i<8;i++) {input[i] = null;}
        row++;
        set_border(0);
        if (row < NumberOfRow){
            cur = row * 8;
            set_border(1);
        }
    }
}

function g1(){
  while (true){
    a = Math.floor(Math.random()*100);
    b = Math.floor(Math.random()*100);
    c = a + b;

    s = String(a)+String(b)+String(c);
    if (s.length === 6){
      break;
    }
  }
}

function g2(){
  while (true){
    a = Math.floor(Math.random()*100);
    b = Math.floor(Math.random()*100);
    c = a * b;

    s = String(a)+String(b)+String(c);
    if (s.length === 6){
      break;
    }
  }
}

this_op = Math.floor(Math.random()*4);
if (this_op === 0){
  g1();
}
else if (this_op === 1){
  g1();
  [a,c] = [c,a];
}
else if (this_op === 2){
  g2();
}
else if(this_op === 3){
  g2();
  [a,c] = [c,a];
}
answer = a + OP[this_op] + b + "=" + c;

console.log(answer);