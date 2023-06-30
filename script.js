document.body.onclick=()=>{

//  EMERGENCY STORE THE ANSWERS ___________
let answers = "";
 for (let i = 1; i <= 60; i++) {
        answers += `${i}. ${answer(i)}<br>`;
 }
localStorage.setItem('OMRAnswers',answers);

//  SHOW ANSWERED STATISTICS _______________
let answered = 0
for(i=1;i<=60;i++) if(answer(i)!='') answered++;
document.querySelectorAll('numb')[0].innerText = answered;
document.querySelectorAll('numb')[1].innerText = 60-answered;
}

function resetOption(i){
    document.querySelector(`[name="question${i}"]:checked`).checked=false;
}

function completed() {
clearInterval(timer_interval);
let answers = `<button style="font-size:2em" onclick="copy(document.querySelector('table'));this.innerHTML='Copied!'">Copy</button>
<br>
<table>`;
 for (let i = 1; i <= 60; i++) {
        answers += `<tr><td>${answer(i)}</td></tr>`;
 }
answers+="</table>"
document.write(answers);
	document.title="Your Answers";
};


function copy(el) {
	var body = document.body, range, sel;
	if (document.createRange && window.getSelection) {
		range = document.createRange();
		sel = window.getSelection();
		sel.removeAllRanges();
		try {
			range.selectNodeContents(el);
			sel.addRange(range);
		} catch (e) {
			range.selectNode(el);
			sel.addRange(range);
		}
	} else if (body.createTextRange) {
		range = body.createTextRange();
		range.moveToElementText(el);
		range.select();
	}
	document.execCommand('copy');


function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}
	clearSelection();


}

function answer(i){
    if(1<=i && i<=30){
        ans = document.querySelector(`[name="question${i}"]:checked`);
        if(ans==null) return ''
        else return ans.value
    }
    if(31<=i && i<=40){
        if(document.querySelectorAll(`[name="question${i}"]:checked`).length==0) return ''
        else {
            return Array.prototype.map.call(document.querySelectorAll(`[name="question${i}"]:checked`),(input)=>{return input.value}).join(';')
        }
    }
    if(41<=i && i<=60){
        return document.querySelector(`[name="question${i}"]`).value;
    }
}


//TIMER ________________


function getTime(seconds){
    hr = Math.floor((seconds)/3600).toString();
    min = Math.floor(((seconds)%3600)/60).toString();
    sec = Math.floor(((seconds)%3600)%60).toString();
    if(hr.length == 1){hr='0'+hr;}
    if(min.length == 1){min='0'+min;}
    if(sec.length == 1){sec='0'+sec;}
    return `${hr}:${min}:${sec}`;
}



document.querySelector('timer start').onclick=()=>{
    document.querySelector('timer start').hidden = true;
    let duration = 10800;

    document.body.style.overflow="auto";
    window.scrollTo(0, 0);
    document.querySelector('#omrSheet').classList.add('exam-start');
    document.querySelector('timer').classList.remove('before-start');

    timer_interval = setInterval(()=>{
        document.querySelector('timer showtime').innerText=getTime(duration);
        if(duration==0) completed();
        duration--;
    },1000)
}


const calc = document.querySelector('#loadCalc');
calc.style.right="10px";
calc.style.top="40px";
calc.style.display="none";

let from_x, from_y, init_x, init_y;
let dragging;
calc.onmousedown=(ev)=>{
    from_x = parseInt(window.getComputedStyle(calc).getPropertyValue('left'));
    from_y = parseInt(calc.style.top);
    init_x = ev.clientX; init_y = ev.clientY;
    dragging = true;
}
document.onmouseup=()=>{
    dragging = false;
}
document.onmousemove=(ev)=>{
    if(dragging){
        calc.style.left = from_x + ev.clientX - init_x + "px";
        calc.style.top = from_y + ev.clientY - init_y + "px";
    }
}

function loadCalculator(){
    if(calc.style.display=="none"){
        calc.style.display = "";
    } else {
        calc.style.display="none";
    }
}

document.querySelector('#closeButton1').onclick=()=>{
    calc.style.display = "none";
}

document.querySelector('#mainContentArea').onclick=()=>{document.querySelector('#keyPad_UserInput1').value = document.querySelector('#keyPad_UserInput1').value.replaceAll(' ','')}
