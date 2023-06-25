document.body.onclick=()=>{
answers = "";
 for (let i = 1; i <= 60; i++) {
        answers += `${i}. ${answer(i)}<br>`;
 }
localStorage.setItem('OMRAnswers',answers)
}

function completed() {
answers = `<button style="font-size:2em" onclick="copy(document.querySelector('table'))">Copy</button>
<br>
<table>`;
 for (let i = 1; i <= 60; i++) {
        answers += `<tr><td>${answer(i)}</td></tr>`;
 }
answers+="</table>"
document.write(answers);
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
