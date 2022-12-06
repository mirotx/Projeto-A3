let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})
function valid(){
    var usuario= document.getElementById("usuario").value;
    var senha= document.getElementById("senha").value
    if(usuario=="admin"&&senha=="admin"){
        location.href='index.html'
    }
    Else{
        ("Login Invalido")
    }
}
