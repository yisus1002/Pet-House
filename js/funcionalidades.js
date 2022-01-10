
//-----------------Funciones para hacer dinamica la pagina -----------------//

//Funcion para el boton agregar
async function  btnAgregar(agregar){
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.remove("d-none");
    
    const none =document.getElementById("sAgre");
    none.classList.add("d-none");

    const  btnM = document.getElementById("btnM");
    const btnG= document.getElementById('btnG');

      btnG.classList.remove('d-none');
      btnM.classList.add("d-none");

      const h2 =document.getElementById('h2');
      h2.textContent =agregar;
      if (agregar==='Agregar cliente'){
          LimpiarC();
      }else if(agregar==="Agregar producto"){
          LimpiarP();
      }else if(agregar==="Agregar mascota"){
          LimpiarM();
      }else if(agregar==="Agregar proveedor") {
            LimpiarProvee();
        }
      
}

//Funcion para el boton cancelar
function btnCancelar(){
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.add("d-none");
    const none =document.getElementById("sAgre");
    none.classList.remove("d-none");
    // limpiarFormulario()
}
//Funcion para hacer visible el boton modificar
function hacervisibleBtnM(modificar){
  const  btnM = document.getElementById("btnM");
  const btnG= document.getElementById('btnG');
    btnG.classList.add('d-none');
    btnM.classList.remove("d-none");
    const h2 =document.getElementById('h2');
    h2.textContent =modificar;
}
/** Función para ver formulario para hacer visible la tabla */
function Hacervisibletabla(){
    seccion = document.getElementById("pr");
    seccion.classList.remove("d-none");
}
// Funcion para eliminar la tabla
function eliminarTablahtml(){
    const limpiar = document.getElementById("respuestaApi");
    limpiar.remove();
}
//Funciones para cargar el html de cada api 

//Se carga y se muestra la api cliente en una tabla
function cliente(){
    getAll(apiCliente).then(data => {
        //console.log(data);
        //Varible global
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            element.className = 'row';
        //Variable que almacena el código html de la tabla a  crear
            let htmlTabla = `<div class="container" id="respuestaApi">
            <section id="seccionFormulario" class="bg-ligth p-2 shadow col-10 col-md-8 container rounded px-3 mb-4 d-none position-fixed bg-light " style="top: 12%; left: 10%; ">
            <h2 id="h2" class="text-center"></h2>
            <form action="#" class="text-start">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombres</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre">
                </div>
                <div class="mb-3">
                    <label for="apellido" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="apellido" placeholder="Ingrese los apellidos">
                </div>
                <div class="mb-3">
                    <label for="valor" class="form-label">Telefono</label>
                    <input type="tel" class="form-control" id="valor" placeholder="Ingrese el numero de telefono">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Ingrese el Email">
                </div>
                <div class="mb-3 container ">
                    <input type="button" id="btnG"  class="btn btn-primary m-1 "  onclick="btnGuardarCliente()" value="Guardar">
                    <input type="button" id="btnM"  class="btn btn-primary m-1 "  onclick="BtnModificarC()" value="Modificar">
                    <input type="button" class="btn btn-danger  m-1" onclick="btnCancelar()" value="Cancelar">
                </div>
            </form>
        </section>     
        <div class="container"  id="sAgre">
            <h1>Clientes</h1>
            <button type="button" onclick="btnAgregar('Agregar cliente')" class="btn btn-outline-primary text-uppercase">Agregar</button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover " id="tablaDatos">
            <thead id="tabla">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>`;
                data.forEach((element, index) => {
                htmlTabla = htmlTabla + `
            <tr  id="row-${element.id}">
            <td scope="row"> ${index+1}</td>
            <td> ${element.id}</td>
            <td> ${element.nombres}</td>
            <td> ${element.apellidos}</td>
            <td> ${element.email}</td>
            <td> ${element.telefono}</td>
            <td>
            <div id="myLink" class="container">
            <button type="button" id="" onclick="BtnModificar(${element.id},'Modificar cliente',${index})" class="btn btn-outline-primary col-12 text-uppercase m-1">Modificar</button>
            <button type="button"  onclick="BtnEliminar('${apiCliente}',${element.id})" class="btn btn-outline-danger col-12 text-uppercase m-1">Eliminar</button>
           </div>
                </td>
            </tr>`;
        });
            htmlTabla = htmlTabla + ` </tbody>
        </table>
        </div>
        </div>`;
                element.innerHTML = htmlTabla;
                divApp.appendChild(element);
            });
}

//Se carga y se muestra la api Producto en una tabla
function Product(){
    getAll(apiProducto).then(data => {
        //console.log(data);
        //Varible global
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            element.className = 'row';
        //Variable que almacena el código html de la tabla a  crear
            let htmlTabla = `<div class="container" id="respuestaApi">
            <section id="seccionFormulario" class="bg-ligth p-2 shadow col-10 col-md-8 container rounded px-3 mb-4 d-none position-fixed bg-light " style="top: 12%; left: 10%; ">
            <h2 id="h2" class="text-center"></h2>
            <form action="#" class="text-start">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre del producto">
            </div>
            <div class="mb-3">
                <label for="precio" class="form-label">Precio</label>
                <input type="number" class="form-control" id="precio" placeholder="Ingrese el precio">
            </div>
            <div class="mb-3">
              <label for="tipoPro" class="form-label" >Tipo de producto</label>
                <select id="idOpcione" class="form-control col-8" >
                    <option id="inser" class="d-none">Seleccione el tipo de producto</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Alimentos">Alimento</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div class="mb-3 container ">
            <input type="button" id="btnG"  class="btn btn-primary m-1 "  onclick="btnGuardarProducto()" value="Guardar">
            <input type="button" id="btnM"  class="btn btn-primary m-1 "  onclick="BtnModificarPrdct()" value="Modificar">
            <input type="button" class="btn btn-danger  m-1" onclick="btnCancelar()" value="Cancelar">
    </div>
        </form>
            </section>
        <div class="container"  id="sAgre">
            <h1>Productos</h1>
            <button type="button" onclick="btnAgregar('Agregar producto')" class="btn btn-outline-primary text-uppercase">Agregar</button>
        </div>
        <div class="table-responsive">  
        <table class="table table-hover" id="tablaDatos">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Tipo de producto</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>`;
                data.forEach((element, index) => {
                htmlTabla = htmlTabla + `
            <tr  id="row-${element.codigo_producto}">
            <td scope="row"> ${index+1}</td>
            <td> ${element.codigo_producto}</td>
            <td> ${element.nombre}</td>
            <td> ${element.precio}</td>
            <td> ${element.tipo_producto}</td>
            <td>
            <div id="myLink" class="container">
                    <button type="button" id="llenarFProd" onclick="BtnModificar(${element.codigo_producto},'Modificar producto',${index})" class="btn btn-outline-primary col-12 text-uppercase m-1">Modificar</button>
                    <button type="button"  onclick="BtnEliminar('${apiProducto}',${element.codigo_producto})" class="btn btn-outline-danger col-12 text-uppercase m-1">Eliminar</button>
            </div>
                </td>
            </tr>`;
        });
            htmlTabla = htmlTabla + ` </tbody>
        </table>
        </div>
        </div>`;
                element.innerHTML = htmlTabla;
                divApp.appendChild(element);
            });
        }
        
//Se carga y se muestra la api mascota en una tabla
function mascota(){
    getAll(apiMascota).then(data => {
        //console.log(data);
        //Varible global
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            element.className = 'row';
        //Variable que almacena el código html de la tabla a  crear
            let htmlTabla = `<div class="container" id="respuestaApi">
            <section id="seccionFormulario" class="bg-ligth p-2 shadow col-10 col-md-8 container rounded px-3 mb-4 d-none position-fixed bg-light " style="top: 12%; left: 10%; ">
            <h2 id="h2" class="text-center"></h2>
            <form action="#" class="text-start">
            <div class="mb-3">
              <label for="OpcionM" class="form-label" >Tipo de mascota</label>
                <select id="OpcionM" class="form-control col-8" >
                    <option id="inserM" class="d-none">Seleccione el tipo de mascota</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="imgM" class="form-label">Suba la imagen</label>
                 <input accept=".jpg,.png,.jpeg" type="file" class="form-control" id="imgM">
            </div>
            <div class="mb-3">
                <label for="ubicacionM" class="form-label">Ubicación</label>
                <input type="text" class="form-control" id="ubicacionM" placeholder="Ingrese la ubicación">
            </div>

            <div class="mb-3 container ">
            <input type="button" id="btnG"  class="btn btn-primary m-1 "  onclick="btnGuardarMascota()" value="Guardar">
            <input type="button" id="btnM"  class="btn btn-primary m-1 "  onclick="BtnModificarMasc()" value="Modificar">
            <input type="button" class="btn btn-danger  m-1" onclick="btnCancelar()" value="Cancelar">
    </div>
        </form>
            </section>
        <div class="container"  id="sAgre">
            <h1>Mascotas</h1>
            <button type="button" onclick="btnAgregar('Agregar mascota')" class="btn btn-outline-primary text-uppercase">Agregar</button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover" id="tablaDatos">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"Id</th>
                    <th scope="col">Tipo de mascota</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Ubicacion</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>`;
                data.forEach((element, index) => {
                htmlTabla = htmlTabla + `
            <tr  id="row-${element.id}">
            <td scope="row"> ${index+1}</td>
            <td> ${element.id}</td>
            <td> ${element.tipo_mascota}</td>
            <td>${element.imagen}
         <!--   <img src="${element.imagen}" width="140" height="52" class="d-inline-block align-middle ms-3" alt="img-${element.id}"> -->
            </td>
            <td> ${element.ubicacion}</td>
            <td>
            <div id="myLink" class="container">
                    <button type="button"  onclick="BtnModificar(${element.id},'Modificar Mascota',${index})" class="btn btn-outline-primary col-12 text-uppercase m-1">Modificar</button>
                    <button type="button"  onclick="BtnEliminar('${apiMascota}',${element.id})" class="btn btn-outline-danger col-12 text-uppercase m-1">Eliminar</button>
            </div>
                </td>
            </tr>`;
        });
            htmlTabla = htmlTabla + ` </tbody>
        </table>
        </div>
        </div>`;
                element.innerHTML = htmlTabla;
                divApp.appendChild(element);
            });
}

//Se carga y se muestra la api proveedores en una tabla
function proveedor(){
    getAll(apiProveedor).then(data => {
        //console.log(data);
        //Varible global
            datosJson = data;
            const divApp = document.getElementById("app");
            const element = document.createElement("div");
            element.className = 'row';
        //Variable que almacena el código html de la tabla a  crear
            let htmlTabla = `<div class="container" id="respuestaApi">
            <section id="seccionFormulario" class="bg-ligth p-2 shadow col-10 col-md-8 container rounded px-3 mb-4 d-none position-fixed bg-light " style="top: 12%; left: 10%; ">
            <h2 id="h2" class="text-center"></h2>
            <form action="#" class="text-start">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre">
                </div>
                <div class="mb-3">
                    <label for="direccionP" class="form-label">Dirección</label>
                    <input type="text" class="form-control" id="direccionP" placeholder="Ingrese la dirección">
                </div>
                <div class="mb-3">
                    <label for="valor" class="form-label">Telefono</label>
                    <input type="tel" class="form-control" id="valor" placeholder="Ingrese el numero de telefono">
                </div>
                <div class="mb-3 container ">
                <input type="button" id="btnG"  class="btn btn-primary m-1 "  onclick="btnGuardarProveedor()" value="Guardar">
                <input type="button" id="btnM"  class="btn btn-primary m-1 "  onclick="BtnModificarProvee()" value="Modificar">
                <input type="button" class="btn btn-danger  m-1" onclick="btnCancelar()" value="Cancelar">
            </div>
            </form>
        </section>     
        <div class="container"  id="sAgre">
            <h1>Proveedores</h1>
            <button type="button" onclick="btnAgregar('Agregar proveedor')" class="btn btn-outline-primary text-uppercase">Agregar</button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover" id="tablaDatos">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Numero de registro</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>`;
                data.forEach((element, index) => {
                htmlTabla = htmlTabla + `
            <tr  id="row-${element.num_registro}">
            <td scope="row"> ${index+1}</td>
            <td> ${element.num_registro}</td>
            <td> ${element.nombre}</td>
            <td> ${element.direccion}</td>
            <td> ${element.telefono}</td>
            <td>
            <div id="myLink" class="container">
                    <button type="button"  onclick="BtnModificar(${element.num_registro},'Modificar proveedor',${index})" class="btn btn-outline-primary col-12 text-uppercase m-1">Modificar</button>
                    <button type="button"  onclick="BtnEliminar('${apiProveedor}',${element.num_registro})" class="btn btn-outline-danger col-12 text-uppercase m-1">Eliminar</button>
            </div>
                </td>
            </tr>`;
        });
            htmlTabla = htmlTabla + ` </tbody>
        </table>
        </div>
        </div>`;
                element.innerHTML = htmlTabla;
                divApp.appendChild(element);
            }); 
}