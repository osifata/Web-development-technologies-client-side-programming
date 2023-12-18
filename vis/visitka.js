(function(){
    window.drawCard = function(form){
        let resultDiv = form.closest('.card-container').querySelector('.card-result > .card');
        
        let fields = [
            'organization',
            'fio',
            'position',
            'phone',
            'email',
            'address'
        ];

        fields.forEach(field => {
            resultDiv.querySelector(`.card__` + field).textContent = form[field].value;
        });
        
        const output = document.getElementById('output');

        onChangeValue();

        function onChangeValue(){
            if (document.querySelector('input[name="dop-phone"]:checked')){
                output.textContent = document.querySelector('input[name="phone1"]').value;
            }
            else{
                output.textContent = '';
            }
        }
    };
})();


id = ['black', 'blue', 'red', 'green', 'yellow', 'purple'];

for (let i = 0; i<=5; i++){
    const btn = document.getElementById(id[i]);

    btn.addEventListener('click', function onClick(event) {
    const box = document.getElementById('fio');

    box.style.color = id[i];
    });
}

id1 = ['#000000', '#181818', '#2a2a2a', '#494949', '#9a9a9a', '#afafaf'];

for (let i = 0; i<=5; i++){
    const btn1 = document.getElementById(id1[i]);

    btn1.addEventListener('click', function onClick(event) {
    const box1 = document.getElementById('position');

    box1.style.color = id1[i];
    });
}


function myFunction(id,pid) {
    var checkBox = document.getElementById(id);
    var text = document.getElementById(pid);
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
    text.style.display = "none";
    }
}

let buttons_1 = document.getElementsByClassName('points');
let buttons_2 = document.getElementsByClassName('points1');
let buttons_3 = document.getElementsByClassName('points2');
for (let i = 0; i < buttons_1.length; i++){
buttons_1[i].onclick = change_align;
buttons_2[i].onclick = change_align;
buttons_3[i].onclick = change_align;
}
function change_align(e){
e.preventDefault()
document.querySelector('.card__fio').style.textAlign = e.target.value
}

let buttons_4 = document.getElementsByClassName('size');
let buttons_5 = document.getElementsByClassName('size1');
let buttons_6 = document.getElementsByClassName('size2');
for (let i = 0; i < buttons_2.length; i++){
buttons_4[i].onclick = change_size;
buttons_5[i].onclick = change_size;
buttons_6[i].onclick = change_size;
}
function change_size(f){
f.preventDefault()
document.querySelector('.card__fio').style.fontSize = f.target.value
}

let buttons_7 = document.getElementsByClassName('points3');
let buttons_8 = document.getElementsByClassName('points4');
let buttons_9 = document.getElementsByClassName('points5');
for (let i = 0; i < buttons_1.length; i++){
buttons_7[i].onclick = change_align_2;
buttons_8[i].onclick = change_align_2;
buttons_9[i].onclick = change_align_2;
}
function change_align_2(e){
e.preventDefault()
document.querySelector('.card__position').style.textAlign = e.target.value
}

let buttons_10 = document.getElementsByClassName('size3');
let buttons_11 = document.getElementsByClassName('size4');
let buttons_12 = document.getElementsByClassName('size5');
for (let i = 0; i < buttons_2.length; i++){
buttons_10[i].onclick = change_size_2;
buttons_11[i].onclick = change_size_2;
buttons_12[i].onclick = change_size_2;
}
function change_size_2(f){
f.preventDefault()
document.querySelector('.card__position').style.fontSize = f.target.value
}