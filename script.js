document.body.onclick=()=>{
answers = "";
 for (let i = 1; i <= 60; i++) {
        answers += `${i}. ${answer(i)}<br>`;
 }
localStorage.setItem('OMRAnswers',answers)
}

function completed() {
answers = "<table>";
 for (let i = 1; i <= 60; i++) {
        answers += `<tr><td>${answer(i)}</td></tr>`;
 }
answers+="</table>"
document.write(answers);
};


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