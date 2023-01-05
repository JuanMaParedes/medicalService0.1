//Variables para mostrar los datos del usuario
let nameP= document.createElement('p');
let lastNameP= document.createElement('p');
let dniP= document.createElement('p');
let direccionP =document.createElement('p');
let ciudadP= document.createElement('p');
let provinciaP =document.createElement('p');
let emailP =document.createElement('p');
let obraSocialP= document.createElement('p');
let avatarImg=document.createElement('img');
let name= "";
let lastName= "";
let dni =0; 
let direccion,ciudad,provincia,email="";
let obraSocial= false;
let avatar="";
let buttonEdit = document.createElement("button");
let buttonEliminar = document.createElement("button");
let editUserForm = document.getElementById("editUserForm");
let content= document.getElementById('content');
//Variables para editar usuario
let newUserAddress = document.getElementById("newUserAddress");
let newUserCity = document.getElementById("newUserCity");
let newUserState = document.getElementById("newUserState");
let newUserObra = document.getElementById("newUserObra");
let newUserURL = document.getElementById("newUserURL");
let newUserEmail = document.getElementById("newUserEmail");
let newUserPass = document.getElementById("newUserPass");

let buttonSave= document.getElementById("buttonSave");
//Variables para eliminar usuario
let buttonDelate= document.getElementById("buttonDelate");
async function getUserById(id){
    const response = await fetch(mockApiURL + '/'+ id);    
    let data = await response.json();
    return data;
}
function clearForm() {
    editUserForm.reset();
  }
function clearGrid() {
      content.innerHTML='';
}


function mostrarDatos(id){
    let usuario = getUserById(id);
    let elementoPadre= document.querySelector('.columna1');
    let elementoPadre2= document.querySelector('.columna2');
    let botones= document.querySelector('.botones');
    usuario.then((response)=>{
        name = response.name;
        lastName= response.lastName;
        dni= response.dni;
        direccion= response.direccion;
        ciudad= response.ciudad;
        provincia=response.provincia;
        email= response.email;
        obraSocial= response.obraSocial;
        avatar=response.avatar;  
        
        nameP.innerHTML= "<strong>Nombre: </strong>" + name;
        elementoPadre.appendChild(nameP);
        lastNameP.innerHTML= "<strong>Apellido: </strong>" + lastName;
        elementoPadre.appendChild(lastNameP);
        dniP.innerHTML= "<strong>Dni: </strong>" + dni;
        elementoPadre.appendChild(dniP);
        direccionP.innerHTML= "<strong>Direccion: </strong>" + direccion;
        elementoPadre.appendChild(direccionP);
        ciudadP.innerHTML= "<strong>Ciudad: </strong>" + ciudad;
        elementoPadre.appendChild(ciudadP);
        avatarImg.setAttribute("id", "imgDatos");
        avatarImg.setAttribute("src", avatar);
        elementoPadre2.appendChild(avatarImg);
        provinciaP.innerHTML= "<strong>Provincia: </strong>" + provincia;
        elementoPadre2.appendChild(provinciaP);
        emailP.innerHTML= "<strong>Email: </strong>" + email;
        elementoPadre2.appendChild(emailP);
        if (obraSocial= true){
            obraSocialP.innerHTML= "<strong>Obra Social: </strong> Si";
        }
        else{
            obraSocialP.innerHTML= "<strong>Obra Social: </strong> No";
        }
        elementoPadre2.appendChild(obraSocialP);
        avatarImg.setAttribute("src", avatar);
        elementoPadre2.appendChild(emailP);
        
        

    }); 
    setTimeout(()=>{
        botonEditar(id,botones);
        botonEliminar(id,botones);
    },500);
    
}
setTimeout(()=>{
    let userId= localStorage.getItem("id");
    mostrarDatos(userId);
},1000);

function botonEditar(id,elementoPadre){
    buttonEdit.className = "btn btn-success";
    buttonEdit.setAttribute("data-bs-toggle","modal");
    buttonEdit.setAttribute("data-bs-target","#modalEditar");
    buttonEdit.setAttribute("id","btnEditar");
    buttonEdit.innerHTML = "Editar mis datos";
    let usuario = getUserById(id);
    usuario.then((response)=>{
        direccion= response.direccion;
        ciudad= response.ciudad;
        provincia=response.provincia;
        email= response.email;
        obraSocial= response.obraSocial;
        avatar=response.avatar;
        passwoed= response.passwoed 

        newUserAddress.value= direccion;
        newUserCity.value= ciudad;
        newUserState.value=provincia;
        newUserEmail.value= email;
        newUserObra.value= obraSocial;
        newUserPass.value= passwoed;
        newUserURL.value= avatar;

    }); 



    buttonSave.addEventListener("click", () => {
    editUser(id);
  }); 
  elementoPadre.appendChild(buttonEdit);
}
function botonEliminar(id,elementoPadre){
    buttonEliminar.className = "btn btn-danger";
    buttonEliminar.setAttribute("data-bs-toggle","modal");
    buttonEliminar.setAttribute("data-bs-target","#modalEliminar");
    buttonEliminar.innerHTML = "Eliminar Cuenta";
    buttonDelate.addEventListener("click", () => {
        btnDelete(id);
    }); 
  elementoPadre.appendChild(buttonEliminar);
}
//Editar Usuario

async function UpdateUser(user, id) {
    const response = await fetch(mockApiURL + '/' + id,
        {
        method: "PUT",
        body: JSON.stringify(user),  
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response)=> response.json())
    .then((json)=> console.log(json));
  
    return response;
  
  }
function createObjetUser(){
    let userEdit={
      direccion: newUserAddress.value,
      ciudad: newUserCity.value,
      provincia: newUserState.value,
      obraSocial: newUserObra.value,
      avatar: newUserURL.value,
      email: newUserEmail.value,
      passwoed: newUserPass.value,

    }
    return userEdit;
}


function editUser(id){
    let edicion = createObjetUser();
    UpdateUser(edicion, id).then(()=>{
          clearForm();
          clearGrid();
          loadUsers();
  
    })
    alert("Datos Modificados");
    location.href="/inicioRegistrado.html";
  }
  //Eliminar Usuario
  async function deleteUser(id) {
    const response = await fetch(mockApiURL + '/' + id,
        {
        method: "DELETE",
    });
  
    return response;
  
  }

  function btnDelete(id){ 
    deleteUser(id).then(()=>{
        clearForm();
        clearGrid();
        loadUsers();
  
    }); 
    localStorage.removeItem("item");
    localStorage.removeItem("id");
    alert("Has eliminado tu cuenta.");
    location.href="/index.html";
  }