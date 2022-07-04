const mockApiURL = "https://628c020fa3fd714fd02b63a5.mockapi.io/Pacientes";
const turnosURL= "https://628c020fa3fd714fd02b63a5.mockapi.io/Turnos";

let userActual= localStorage.getItem("item");
let lugarh5= document.createElement('h5');







async function getUsers() {
    const response = await fetch(mockApiURL);
    let data = await response.json();
    return data;
  }



function busquedaUser(dniUser){
    let arrayUsers=[];
    let usuarios = getUsers();
    let nameUser= "";
    usuarios.then((response) => {
    response.forEach((usuario) => {
        let usuArray= {
            id: usuario.id,
            name: usuario.name,
            dni: usuario.dni,  
        }
        arrayUsers.push(usuArray);   
    });
     arrayUsers.forEach((user)=>{
        if( user.dni == dniUser){
            nameUser= user.name;
            localStorage.setItem("id", user.id);
        }
        
    }); 
    
});
setTimeout(()=>{
    mostrarUser(nameUser);
}, 1000);

}

function mostrarUser(userActual){
   //selecciono el padre
   let elementoPadre= document.querySelector('.sesion');
   lugarh5.innerHTML= "Hola " + userActual;
   lugarh5.setAttribute("data-bs-toggle","modal");
   lugarh5.setAttribute("data-bs-target","#modalDatos");
   elementoPadre.appendChild(lugarh5);
   verDatosH5(userActual);

}

function cerrarSesion(){
    localStorage.removeItem('item');
    localStorage.removeItem('id');
    location.href="/index.html";
}


function verDatosH5(userActual){
    lugarh5.addEventListener("mouseover", function (event) {
    //highlight the mouseover target
    lugarh5.innerHTML= "Ver mis datos";
    event.target.style.content = "red";
  }, false);
    lugarh5.addEventListener("mouseout", function (event) {
    // highlight the mouseout target
    lugarh5.innerHTML= "Hola " + userActual;
    event.target.style.color = "black";
  }, false);
}

busquedaUser(userActual);

/* Solicitudes de turno */

async function getUserByTurnos(id){
    const response = await fetch(turnosURL + '/'+ id);    
    let data = await response.json();
    return data;
}
function removeOptions(selectElement) { 
    var i, L = selectElement.options.length - 1; 
    for(i = L; i >= 0; i--) {
         selectElement.remove(i); 
        } 
    }

Fuente: https://www.iteramos.com/pregunta/63970/como-puedo-borrar-todas-las-opciones-de-un-cuadro-desplegable
function drElegido(id){
     sacarTurno(id);   
}

function sacarTurno(id){
    let elementoTitle= document.getElementById("modalT");
    let modalTitle=document.createElement('h5');
    modalTitle.className="modal-title";
    let drSelect= "";
    let elementPadre= document.getElementById("selectTurnos");
    let turnosDr = getUserByTurnos(id);
    let cerrarTurnos= document.getElementById("cerrarTurnos");
    turnosDr.then((response)=>{
        drSelect=response.nameMedical;
        modalTitle.innerHTML= "Turnos disponibles del especialista: "+ drSelect;
        elementoTitle.appendChild(modalTitle);

        response.turnos.forEach((consulta,i)=>{
            let turnoOption=document.createElement('option');
       
            if(consulta[1]){
        
                turnoOption.value=true;
                turnoOption.text= consulta[0];
                elementPadre.appendChild(turnoOption);
            }
        });
    });
    cerrarTurnos.addEventListener("click", ()=>{
        modalTitle.innerHTML= "";
        elementoTitle.appendChild(modalTitle);
        removeOptions(document.getElementById('selectTurnos'));


    });
    
}

