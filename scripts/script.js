const mockApiURL = "https://628c020fa3fd714fd02b63a5.mockapi.io/Pacientes";

let inicioDni= document.getElementById("inicioDni");
let inicioPass= document.getElementById("inicioPass");
let newUserForm = document.getElementById("newUserForm");
let content= document.getElementById('content');

newUserForm.addEventListener("click", (e) => {
  e.preventDefault();
});
let arreglo=[inicioDni, inicioPass];

async function getUsers() {
    const response = await fetch(mockApiURL);
    let data = await response.json();
  
    return data;
}
function verificar(){
    let ready= true;
    arreglo.forEach((campo)=>{
      if (campo.value == ''){
        campo.style.border= "red 2px solid";
        ready= false;
      }
      else{
        campo.style.border= "green 2px solid";
      }
    })
    return ready;
  }

  function createObjetUser() {
    let userIni = { 
      dni: inicioDni.value,
      passwoed: inicioPass.value,
    };
    return userIni;
  }
iniciarS.addEventListener("click", ()=>{
    iniciarSesion();
});

function iniciarSesion(){
    let veri= false; 
    let array= [];
    let usuarios = getUsers();

    usuarios.then((response) => {
    response.forEach((usuario) => {
    let user={
        dni: usuario.dni,
        pass: usuario.passwoed,
    }
    array.push(user);    
    });   
  array.forEach((usu)=>{
  
    if(usu.dni == inicioDni.value ){
      if(usu.pass == inicioPass.value){
          veri=true;        
      }
    }
   }); 
    
  }); 
  
  setTimeout(()=>{
    if(verificar()){     
      if (veri){ 
        let userIni= createObjetUser();     
        localStorage.setItem('item', userIni.dni)

        location.href="/inicioRegistrado.html"  
      }
      else{
        alert("Dni y/o contraseña no coinciden");
        inicioDni.style.border= "red 2px solid";
        inicioPass.style.border= "red 2px solid";
      }

    }
    else{
     alert("Debe rellenar todos los campos");
    }
    
  },1000);
    
}


