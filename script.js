document.body.onclick=()=>{
let answers = "";
 for (let i = 1; i <= 60; i++) {
        answers += `${i}. ${answer(i)}<br>`;
 }
localStorage.setItem('OMRAnswers',answers)
}

function resetOption(i){
    document.querySelector(`[name="question${i}"]:checked`).checked=false;
}

function completed() {
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
    timer_interval = setInterval(()=>{
        document.querySelector('timer showtime').innerText=getTime(duration);
        if(duration==0) {completed(); clearInterval(timer_interval);}
        duration--;
    },1000)
}
