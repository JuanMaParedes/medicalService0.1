const mockApiURL = "https://628c020fa3fd714fd02b63a5.mockapi.io/Pacientes";

let newUserName = document.getElementById("newUserName");
let newLastName = document.getElementById("newLastName");
let newUserDni = document.getElementById("newUserDni");
let newUserAddress = document.getElementById("newUserAddress");
let newUserCity = document.getElementById("newUserCity");
let newUserState = document.getElementById("newUserState");
let newUserObra = document.getElementById("newUserObra");
let newUserURL = document.getElementById("newUserURL");
let newUserEmail = document.getElementById("newUserEmail");
let newUserPass = document.getElementById("newUserPass");
let idForm = document.getElementById("idForm");
let cont= document.getElementById('content');

idForm.addEventListener("click", (e) => {
  e.preventDefault();
});

let arr=[newUserName, newLastName, newUserDni, newUserAddress, newUserCity, newUserState, newUserObra, newUserURL, newUserEmail, newUserPass] ;
function clearForm() {
  idForm.reset();
  }
function clearGrid() {
      cont.innerHTML='';
}
function verificar(){
  let ready= true;
  arr.forEach((campo)=>{
    if (campo.value == ''){
      campo.style.border= "red 2px solid";
      ready= false;
    }
    else{
      campo.style.border= "green 2px solid";
    }
  })
  if(newUserObra.value == "Obra Social"){
    newUserObra.style.border= "red 2px solid";
    ready= false;
  }
  return ready;
}

async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();
  return data;
}
function validarDni(){
  let valDni= false;
  if (newUserDni.value.length == 8){
    valDni=true
  }
  else{
    alert("Ingrese dni de 8 digitos.");
  }
  return valDni;

}

function validarEmail(){
  let valEmail= false;
  let correo=newUserEmail.value;
  for (let i = 0; i < correo.length; i++) {
    if (correo.charAt(i) == '@'){
      valEmail=true
      }

  }
  
  if(valEmail == false){
    alert("Ingrese un email carrecto.");
  }
  return valEmail;

}
function validarPass(){
  let valPass= false;
  if (newUserPass.value.length >= 6){
    valPass=true
  }
  else{
    alert("Ingrese contraseña de mas de 6 caracteres.");
  }
  return valPass;

}

function createObjetUser() {
    let newUser = {
      name: newUserName.value,
      lastName: newLastName.value,
      dni: newUserDni.value,
      direccion: newUserAddress.value,
      ciudad: newUserCity.value,
      provincia: newUserState.value,
      obraSocial: newUserObra.value,
      avatar: newUserURL.value,
      email: newUserEmail.value,
      passwoed: newUserPass.value,
    };
    return newUser;
  }
function btnCreate(){

  //validacion Dni ya exixtente 
  let veri= true; 
  let array= [];
  let usuarios = getUsers();
  usuarios.then((response) => {
  response.forEach((usuario) => {
    array.push(usuario.dni);    
    });   
  array.forEach((dni)=>{
  
    if(dni == newUserDni.value ){
      veri= false
      alert("Dni ya ocupado");
    }
   });
 
  });  
  setTimeout(()=>{
    if(veri && validarDni() && validarPass() && validarEmail()){
      if (verificar()){
        let newUser= createObjetUser();
     
        postUser(newUser).then(()=>{
        clearForm();
        clearGrid();    
        });      
        localStorage.setItem('item', newUser.dni)
        alert("Se ha registrado correctamente. Aceptar para volver pagina principal"); 
        location.href="/inicioRegistrado.html"  
      }
      else{
        alert("Debe rellenar todos los campos");
      }

    }
   
    
  },1000);
    
}

async function postUser(user) {
    const response = await fetch(mockApiURL,{
        method: 'POST',
        body: JSON.stringify(user),  
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response)=> response.json())
    .then((json)=> console.log(json));
   
    return response;

}