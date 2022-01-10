//Api en MockApi

const apiCliente = 'https://61d654c7b7381600171814db.mockapi.io/cliente';
const apiProducto ='https://61d654c7b7381600171814db.mockapi.io/producto';
const apiProveedor ='https://61d654c7b7381600171814db.mockapi.io/proveedor_empresa_asociada';
const apiMascota = 'https://61d654c7b7381600171814db.mockapi.io/mascota';
let ide; //Variable global para almacenar el ide del dato a modificar
let ind; //Variable para almacenar la posiscion del dato a mostrar para llenar los formularios con la información
//De cada api
//Variable para almacenar el resultado de obtener los resultados de cada API
let datosJson;
/** Funciones para consulta de API */
/** Obtener todos los datos */
const getAll = async(api)=>{
    try {
    const respuesta = await fetch(api);
//const data = await respuesta.json();
        if (respuesta.status == 200) {
        let json = await respuesta.json(); // (3)
        console.log(json);
        return json;
        }
    } catch (error) {
    console.log("ERROR: "+error)
    }
};
//Fuuncion para guardar los datos en la api que sea elegida
const guardar = async(api,objeto)=>{
    try {

        const respuesta = await fetch(api, {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: {"Content-type": "application/json; charset=UTF-8"}

        });
        const data = await respuesta.json();
        if (respuesta.status == 201) {
            console.log("Registro creado!")
            return data;
        }
    } catch (error) {
        console.log("ERROR: "+error)
    }    
};
//Funcion para modificar los datos de la api que sea seleccionada
const modificar = async(api,id,objeto)=>{
    try {
        const respuesta = await fetch(`${api}/${id}`, {
            method: "PUT",
            body: JSON.stringify(objeto),
            headers: {"Content-type": "application/json; charset=UTF-8"}           
        });
        
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log("ERROR: "+error)
    }    
}
//Funcion para eliminar un dato que se elija de la api seleccionada
const BtnEliminar=async(api,id)=>{
    try {
        const respuesta = await fetch(`${api}/${id}`,{
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        const data = await respuesta.json();
        if (respuesta.status == 200) {
            console.log("Registro eliminado: " + data)
            let item = document.getElementById("row-"+id);
            item.parentNode.removeChild(item);
            swal({
                title: "Registro eliminado!",
                text: `El ${id} ha sido eliminado`,
                icon: "success",
              });
        }
    } catch (error) {
        console.log("ERROR: "+error)
 }
}

//Funciones para validar si una api ha sido generada antes que otra 
//Dado el caso que se haya generado una y se quiera mostrar la siguiente se limpia la pantalla y se genera la tabla a mostrar dicha api
//Con sus opciones.
const validarC=()=>{
    const respuestApi= document.getElementById("respuestaApi");
    if(respuestApi){
      eliminarTablahtml();
        return cliente();
    }
    Hacervisibletabla();
    cliente();
 }
 function validarP(){
    const respuestApi= document.getElementById("respuestaApi");
    if(respuestApi){
         eliminarTablahtml();
        return Product();
    }
    Hacervisibletabla();
        Product();
 }
 function validarProve(){
    const respuestApi= document.getElementById("respuestaApi");
    if(respuestApi){
        eliminarTablahtml();
        return proveedor();
        }
    Hacervisibletabla();
        proveedor();
}
function validarM(){
    const respuestApi= document.getElementById("respuestaApi");
    if(respuestApi){
       eliminarTablahtml();
        return mascota();
    }
    Hacervisibletabla();
    mascota();
}


//Funcion para cargar los datos de las apis
document.getElementById("btnCargarCliente").addEventListener("click", (e) => {
 validarC();
});
document.getElementById("btnCargarProducto").addEventListener("click", (e) => {
    validarP();
});
document.getElementById("BtnCargarMascotas").addEventListener("click", (e) => {
    validarM();
});
document.getElementById("BtnCargarProveedor").addEventListener("click", (e) => {
validarProve();
});


//Funciones para guardar los datos de cada api ---------------------------------------//
const btnGuardarCliente=()=>{
    objeto = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
         nombres: document.getElementById("nombre").value,
         apellidos:  document.getElementById("apellido").value,
         email: document.getElementById("email").value,
         telefono: document.getElementById("valor").value
    }

    console.log(objeto);
    guardar(apiCliente,objeto).then(response => {
        return response
   })
   .then(data => {
        
        validarC();
        swal({
            title: "Cliente agregado!",
            text: `El ${objeto.nombres} ha sido agregado`,
            icon: "success",
        });
    })

   .catch(function(err) {
       console.log("Se presento un error en la petición");
       console.error(err);
   });
    
}
const btnGuardarProducto=()=>{
    objeto ={
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        tipo_producto: document.getElementById("idOpcione").value
    }
    console.log(objeto);
    guardar(apiProducto,objeto).then(response =>{
    return response;
    })
        .then(data=>{
            validarP();
            swal({
                title: "Producto agregado!",
                text: `El ${objeto.nombre} ha sido agregado`,
                icon: "success",
            });
        })
        .catch(function(err) {
            console.log("Se presento un error en la petición");
            console.error(err);
        });
}
const btnGuardarMascota=()=>{
    objeto ={
        tipo_mascota: document.getElementById("OpcionM").value,
        imagen: document.getElementById("imgM").value,
        ubicacion: document.getElementById("ubicacionM").value
    }
    console.log(objeto);
    guardar(apiMascota,objeto).then(response =>{
    return response;
    })
        .then(data=>{
            validarM();
            swal({
                title: "La mascota se ha agregado!",
                text: `El ${objeto.tipo_mascota} ha sido agregado`,
                icon: "success",
            });
        })
        .catch(function(err) {
            console.log("Se presento un error en la petición");
            console.error(err);
        });  
}
const btnGuardarProveedor=()=>{
    objeto ={
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccionP").value,
        telefono: document.getElementById("valor").value
    }
    console.log(objeto);
    guardar(apiProveedor,objeto).then(response =>{
    return response;
    })
        .then(data=>{
            validarProve();
            swal({
                title: "El proveedor se ha agregado!",
                text: `El ${objeto.nombre} ha sido agregado`,
                icon: "success",
            });
        })
        .catch(function(err) {
            console.log("Se presento un error en la petición");
            console.error(err);
        });   
}

const BtnModificarC=()=>{ //Funcion para modificar el cliente
    const data = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
        nombres: document.getElementById("nombre").value,
        apellidos:  document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("valor").value
    };

    const {nombres,apellidos,email,telefono}=data;
    
    objeto={
        nombres,apellidos,email, telefono
    }
    modificar(apiCliente,ide,objeto).then(response=>{
        return response;
    }).then(data=>{
        validarC();
        swal({
            title: "Cliente modificado!",
            text: `El ${objeto.nombres} ha sido modificado`,
            icon: "success",
        });
    });
}
const BtnModificarPrdct=()=>{ //Funcion para modificar el producto
    const data = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
        nombre: document.getElementById("nombre").value,
        precio:  document.getElementById("precio").value,
        tipo_producto: document.getElementById("idOpcione").value
    };
    const {nombre,precio,tipo_producto}=data;
    objeto={
        nombre,precio,tipo_producto
    }
    modificar(apiProducto,ide,objeto).then(response=>{
        return response;
    }).then(data=>{
        validarP();
        swal({
            title: "Producto modificado!",
            text: `El ${objeto.nombre} ha sido modificado`,
            icon: "success",
        });
    });
}
const BtnModificarMasc=()=>{ //Funcion para modificar la mascota
    const data = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
        tipo_mascota: document.getElementById("OpcionM").value,
        imagen: document.getElementById("imgM").value,
        ubicacion:  document.getElementById("ubicacionM").value
    };
    const {tipo_mascota,imagen,ubicacion}=data;
    objeto={
        tipo_mascota,imagen,ubicacion
    }
    modificar(apiMascota,ide,objeto).then(response=>{
        return response;
    }).then(data=>{
        validarM();
        swal({
            title: "Mascota modificada!",
            text: `El ${objeto.tipo_mascota} ha sido modificado`,
            icon: "success",
        });
    }); 
}
const BtnModificarProvee=()=>{ //Funcion para modificar el proveedor
    const data = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccionP").value,
        telefono:  document.getElementById("valor").value
    };
    const {nombre,direccion,telefono}=data;
    objeto={
        nombre,direccion,telefono
    }
    modificar(apiProveedor,ide,objeto).then(response=>{
        return response;
    }).then(data=>{
        validarProve();
        swal({
            title: "Proveedor modificada!",
            text: `El ${objeto.nombre} ha sido modificado`,
            icon: "success",
        });
    });  
}
function LimpiarC(){
  document.getElementById('apellido').value="";
    document.getElementById('nombre').value="";
     document.getElementById('email').value="";
     document.getElementById('valor').value="";
      
}
function LimpiarP(){
    document.getElementById('nombre').value="";
    document.getElementById('precio').value="";
     document.getElementById('inser').value="";
}

function LimpiarM(){
        document.getElementById('inserM').value="";
        //   document.getElementById('imgM').value="";
    document.getElementById('ubicacionM').value="";
}
const LimpiarProvee =()=>{
    document.getElementById('nombre').value="";
document.getElementById('direccionP').value="";
     document.getElementById('valor').value="";
}
 
 
//----------------Funciones para obtener los datos de dicha api seleccionada y luego
//Son almacenados en el formulario
const llenarFProd=()=>{ //Funcion para llenar el formulario de producto
    getAll(apiProducto).then(data => {
        nomb = `${data[ind].nombre}`;
        prec=`${data[ind].precio}`;
        tipo_p=`${data[ind].tipo_producto}`;
        const n =document.getElementById('nombre');
        const p= document.getElementById('precio');
        const tp= document.getElementById('inser');
        n.value=nomb; p.value=prec; tp.textContent = tipo_p;
        });
}
const llenarFC=()=>{ //Funcion para llenar el formulario de cliente
    getAll(apiCliente).then(data => {
        nomb = `${data[ind].nombres}`;
        ap=`${data[ind].apellidos}`;
        em=`${data[ind].email}`;
        tl=`${data[ind].telefono}`;
        const a=  document.getElementById('apellido');
        const n=  document.getElementById('nombre');
        const e=  document.getElementById('email');
        const t=  document.getElementById('valor');
        n.value=nomb; a.value=ap; e.value=em; t.value=tl;
        }); 
}
const llenarFM =()=>{ //Funcion para llenar el formulario de Mascota
    getAll(apiMascota).then(data => {
        tip = `${data[ind].tipo_mascota}`;
        img=`${data[ind].imagen}`;
        ub=`${data[ind].ubicacion}`;
        const t =       document.getElementById('inserM');
        // const i=          document.getElementById('imgM');
        const u=    document.getElementById('ubicacionM');
        t.textContent=tip; 
        // i.value =img; 
        u.value=ub;
        });  
}
const llenarFProve=()=>{ //Funcion para llenar el formulario de proveedor
    getAll(apiProveedor).then(data => {
        nomb = `${data[ind].nombre}`;
        dr=`${data[ind].direccion}`;
        tl=`${data[ind].telefono}`;
        const n =    document.getElementById('nombre');
        const d= document.getElementById('direccionP');
        const t=      document.getElementById('valor');
        n.value=nomb; d.value=dr;t.value=tl;
        });    
}

//Funcion para obtener el id de la posicion del dato que se va a modificar
const obtenerId=async(i)=>{
    ind=i;
    return ind;
}
//Funcion para Habilitar el formulario para modificar los datos cargados
const BtnModificar=async(id,modificar,i)=>{
    ide=id;
    obtenerId(i);
    btnAgregar();
    hacervisibleBtnM(modificar);
    if (modificar==='Modificar producto'){
        llenarFProd();
        return ide;
    }else if(modificar==='Modificar cliente'){
        llenarFC();
        return ide;
    }else if(modificar==='Modificar Mascota'){
        llenarFM();
        return ide;
    }else if(modificar==='Modificar proveedor'){
        llenarFProve();
        return ide;
    }
    return ide;     //Almacemamos el id extarido en una variable global
}