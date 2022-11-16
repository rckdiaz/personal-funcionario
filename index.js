// Funcion Traer Funcionarios
// const traerFuncionarios = 
//     fetch("controllers/controlador_listar_funcionarios.php")
//     .then((response) => response.json())
//     .then((data) => {
//         return data;
//     });

// const mostrarFuncionarios = async () => {
//     const funcionarios = await traerFuncionarios;
//     //console.log(funcionarios);

//     funcionarios.map(({ id_funcionario, nombres, apellido_p }) => {
//         //console.log(id_funcionario, nombres, apellido_p);
//     })
// };
// mostrarFuncionarios();
    
console.log(moment().locale('es').format('LL'));

const inputBuscador = document.querySelector('#inputBuscador');
inputBuscador.addEventListener('keyup', () => keyupBuscador());
const keyupBuscador = () => {
    let inputBuscador = document.querySelector('#inputBuscador').value;
    let divLista = document.querySelector('#divLista');
    if (inputBuscador.length > 0) {
        let url = 'controllers/controlador_buscar.php';
        let formData = new FormData();
        formData.append('inputBuscador', inputBuscador);
        fetch(url, {
            method: 'POST',
            body: formData,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            //console.log('===============');
            console.log({data});
            const divLista = document.querySelector('#divLista');
            while(divLista.firstChild){
                divLista.removeChild(divLista.firstChild);
            }
            for(let dato in data){
                //console.log(data[dato].nombres);
                const a         = document.createElement('a');
                const rut       = data[dato].rut;
                const nombres   = data[dato].nombres;
                const apellidoP = data[dato].apellido_p;
                const apellidoM = data[dato].apellido_m;

                //console.log(rut, nombres, apellidoP, apellidoM);
                a.setAttribute('id', data[dato].rut);
                a.setAttribute('href', '#');
                a.setAttribute('onclick', `btnClickFunc('${rut}', '${nombres}', '${apellidoP}', '${apellidoM}' )`);
                a.classList.add('liList', 'list-group-item', 'list-group-item-action');
                a.appendChild(document.createTextNode(`${nombres} ${apellidoP} ${apellidoM}`));
                //console.log(a);
                divLista.appendChild(a);
            }
        })
        .catch(err => console.log(err))
    } else if(inputBuscador == ''){
        while(divLista.firstChild){
            divLista.removeChild(divLista.firstChild);
        }
        const container = document.querySelector('.container');
        while(container.firstChild){
            container.removeChild(container.firstChild);
            //divLista.removeChild(divLista.firstChild);
        }
    }
}

// Función al seleccionar un funcionario en la lista del buscador //
const btnClickFunc = ( rut, nombres, apellidoP, apellidoM ) => {
    //console.log('Hola', rut, nombres, apellidoP, apellidoM);
    const url = 'controllers/controlador_traer_funcionario.php';
    let fd = new FormData();
    fd.append('rut', rut);
    fetch(url,{
        method: 'POST',
        body: fd,
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        console.log('data btnClickFunc', data);
        //Lista los mas nuevos //
        const sortedArray = data
                            .sort((a, b) => moment(b.ingreso) - moment(a.ingreso))
                            .filter((curr, index, j) => index === j.findIndex((t) => (t.identificador === curr.identificador )))
                            .sort((a, b) => a.enumerador - b.enumerador)
        console.log(sortedArray);
        //Lista los mas nuevos //

        var hash = {};
        array = data.filter(function(current) {
          var exists = !hash[current.ingreso];
          hash[current.ingreso] = true;
          return exists;
        });
        let arreglo = [];
        array.forEach((item)=> {
            arreglo.push(item.ingreso);
        });
        //console.log(arreglo);
        inputBuscador.value = '';
        //Limpiar lista una vez se haya presionado un funcionario de la lista
        while(divLista.firstChild){
            divLista.removeChild(divLista.firstChild);
            //divLista.removeChild(divLista.firstChild);
        }
        let htmlCabecera = `
            <div class="row">
                <div class="col-sm-8 align-self-center">
                    <h1>${nombres} ${apellidoP} ${apellidoM}</h1>
                </div>
                <div class="col-sm-4 align-self-center ">
                    <img src="./assets/img/imagen.jpg" class="rounded float-end" alt="..." height="200" width="200" >
                </div>
            </div>
            <br>
            <div class="row text-center">
                <div class="col-4">
                    <h3>Periodo:</h3>
                </div>
                <div class="col-4">
                    <select id="selectPeriodos" class="form-select">
                        <option id="seleccione" class="text-center">Seleccione</option>
                        <option id="documentosNuevos" class="text-center">Ultimos Documentos</option>
                    </select>
                </div>
               
            </div>
            <br>
        `;

        let container = document.getElementById('container');
        container.innerHTML = htmlCabecera;
        document.querySelector('body').append(container);
        
        // Listar periodos del select
        const selectPeriodos = document.querySelector('#selectPeriodos');
        arreglo.forEach((periodo)=> {
            let option = document.createElement('option');
            option.id = periodo;
            option.classList.add('periodos', 'text-center');
            option.text = moment(periodo).format('DD/MM/YYYY');
            selectPeriodos.add(option)
            //console.log(periodo);
        })
        //console.log(selectPeriodos);
        // Listar periodos del select

        // Función cuando acambie el select de los periodos//
        selectPeriodos.addEventListener('change', () => {
            const documentos = Array.prototype.slice.call(document.querySelectorAll("#containerChico"), 0); 
            
            
            // Eliminar los div que tiene la clase .archivos // 
            for(documento of documentos){
                //console.log(documento);
                documento.remove();
            }
            const fechaIngreso = selectPeriodos.options[selectPeriodos.selectedIndex].id;
            console.log({fechaIngreso});
            
            let filtro = [];
            if(fechaIngreso == 'seleccione'){
                const mencionCabecera = document.getElementById('containerChico');
                while(mencionCabecera.firstChild){
                    mencionCabecera.removeChild(mencionCabecera.firstChild);
                }
            }
            if( fechaIngreso == 'documentosNuevos'){
                console.log('sortedArray:', sortedArray);
                
                filtro = sortedArray;
            }else {
                //console.log(data);
                filtro = data.filter( element => {
                    return element.ingreso == fechaIngreso;
                });
                console.log({filtro});
            }

            const containerChico = document.createElement('div');
            containerChico.setAttribute('id', 'containerChico');
            containerChico.classList.add('containerChico');
            container.append(containerChico);

            let archivos = '';
            const cabecera = `
                <div class="col text-end"><h5>Documentos</h5></div>
                <div class="col text-center"><h5>Estado</h5></div>
                <div class="col text-center"><h5>Fecha Ingreso</h5></div>
                <div class="col text-center"><h5>Eliminar</h5></div>
                <br><br>
            `;
            const div = document.createElement('div');
            div.setAttribute('id', 'idCabeceraArchivos');
            div.classList.add('row', 'row-cols-4', 'cabeceraArchivos');
            div.innerHTML = cabecera;
            containerChico.append(div);

            filtro.forEach(element => {
                //console.log({element});
                let diferencia = moment(element.expira).diff(moment(), 'days');
                //console.log(diferencia);
                let text = '';
                if(diferencia > 0){
                    text = `
                    <i class="bi bi-check-lg" style="color:green;"></i>    
                    Documento expira en ${diferencia} días.`;
                }else if(isNaN(diferencia)){
                    text = '';
                }else{
                    text = `
                    <i class="bi bi-exclamation-lg" style="color:red ;"></i>
                    Documento expirado, renovar por favor.`;
                }
                
                const div = document.createElement('div');
                div.setAttribute('id', `${element.id_archivo}`);
                div.classList.add('row', 'row-cols-4', 'archivos');
                
                archivos = `
                    <div class="col text-end">
                        <label>
                            <a href="#" onclick='abrirPdf("${element.propietario}", "${element.ingreso}", "${element.nombre}")' >
                                ${element.identificador}:
                            </a>
                        </label>    
                    </div>
                    <div class="col text-center">${text}</div>
                    <div class="col text-center">${moment(element.ingreso).format('DD/MM/YYYY')}</div>
                    <div class="col text-center">
                        <a href="#" onclick='eliminarArchivo("${element.id_archivo}", "${element.propietario}", "${element.ingreso}", "${element.nombre}", "${element.identificador}" )'>
                        <i class="bi bi-x-circle" style="color:red; font-size: 25px;"></i></a>
                    </div>
                    `;
                div.innerHTML = archivos;
                //console.log(archivos);
                containerChico.appendChild(div);               
            })// Fin filtro.forEach //
        })// Fin addEventListener selectPeriodos Función cuando acambie el select de los periodos //
    })// Fin .then //
}// Fin Función al seleccionar un funcionario en la lista del buscador //


const btnAgregarFunc = document.querySelector("#guardarFuncionario");
btnAgregarFunc.addEventListener("click", () => agregar());
const agregar = async() => {
    let fd = new FormData();

    let rut             = document.querySelector('#id_rut').value;
    let nombres         = document.querySelector('#id_nombres').value;
    let apellidoP       = document.querySelector('#id_apellidoP').value;
    let apellidoM       = document.querySelector('#id_apellidoM').value;
    let ci              = document.querySelector("#id_ci").files[0];
    let certNac         = document.querySelector('#id_nacimiento').files[0];
    let certAnt         = document.querySelector('#id_antecedentes').files[0];
    let EM01            = document.querySelector('#id_EM_01').files[0];
    let EM02            = document.querySelector('#id_EM_02').files[0];
    let certEst         = document.querySelector('#id_estudios').files[0];
    let certTit         = document.querySelector('#id_titulo').files[0];
    let certSalud       = document.querySelector('#id_cert_salud').files[0];
    let sitMilitar      = document.querySelector('#id_militar').files[0];
    let cv              = document.querySelector("#id_cv").files[0];
    let afp             = document.querySelector('#id_afp').files[0];
    let instSalud       = document.querySelector('#id_inst_salud').files[0];
    //let dateCI        = document.querySelector('#expCI').value;
    //let dateNac       = document.querySelector('#expCertNac').value;
    let dateAnt         = document.querySelector('#fechaCertAnt').value;
    let dateAntExpEn    = moment(dateAnt).add(60, 'days').format('YYYY-MM-DD');
    let dateEM01        = document.querySelector('#fechaEM01').value;
    let dateEM01ExpEn   = moment(dateEM01).add(6, 'months').format('YYYY-MM-DD');
    let dateEM02        = document.querySelector('#fechaEM02').value;
    let dateEM02ExpEn   = moment(dateEM02).add(6, 'months').format('YYYY-MM-DD');
    //let dateEst       = document.querySelector('#expCertEst').value;
    //let dateTit       = document.querySelector('#expCertTitulo').value;
    let dateSalud       = document.querySelector('#fechaCertSalud').value;
    let dateSaludExpEn  = moment(dateSalud).add(6, 'months').format('YYYY-MM-DD');
    let dateMil         = document.querySelector('#fechaMilitar').value;
    let dateMilExpEn    = moment(dateMil).add(90, 'days').format('YYYY-MM-DD');
    //let dateCV        = document.querySelector('#expCV').value;
    //let dateAFP       = document.querySelector('#expAFP').value;
    //let dateInstSalud = document.querySelector('#expInstSalud').value;

    fd.append('id_rut', rut);
    fd.append('id_nombres', nombres);
    fd.append('id_apellidoP', apellidoP);
    fd.append('id_apellidoM', apellidoM);
    fd.append("id_ci", ci);
    fd.append('id_nacimiento', certNac);
    fd.append('id_antecedentes', certAnt);
    fd.append('id_EM_01', EM01);
    fd.append('id_EM_02', EM02);
    fd.append('id_estudios', certEst);
    fd.append('id_titulo', certTit);
    fd.append('id_cert_salud', certSalud);
    fd.append('id_militar', sitMilitar);
    fd.append("id_cv", cv);
    fd.append('id_afp', afp);
    fd.append('id_inst_salud', instSalud);
    //fd.append('dateCI', dateCI);
    //fd.append('dateNac', dateNac);
    fd.append('dateAnt', dateAnt);
    fd.append('dateAntExpEn', dateAntExpEn);
    fd.append('dateEM01', dateEM01);
    fd.append('dateEM01ExpEn', dateEM01ExpEn);
    fd.append('dateEM02', dateEM02);
    fd.append('dateEM02ExpEn', dateEM02ExpEn);
    //fd.append('dateEst', dateEst);
    //fd.append('dateTit', dateTit);
    fd.append('dateSalud', dateSalud);
    fd.append('dateSaludExpEn', dateSaludExpEn);
    fd.append('dateMil', dateMil);
    fd.append('dateMilExpEn', dateMilExpEn);
    //fd.append('dateCV', dateCV);
    //fd.append('dateAFP', dateAFP);
    //fd.append('dateInstSalud', dateInstSalud);
    console.log(fd.get('id_ci'));

    const url = 'controllers/controlador_agregar.php';
    await fetch(url, {
        method: 'POST',
        body: fd
    })
    //.then(response => response.json())
    .then(datos => {
        //mostrar imagen
        console.log(datos);
        //  if (datos.resultado == "Ok")
        //     document.getElementById("imagenPerfil")
        //     .setAttribute("src", "docs/"+document.getElementById("foto").files[0].name);       
    })
    .catch(err => {
        console.warn('Hubo un error..', err)
    });
}
// INICIO FUNCIONARIO LOGO //
const indexFuncionario = document.querySelector('#indexFuncionario');
indexFuncionario.addEventListener('click', () => {
    const container = document.querySelector('#container');
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
})
// INICIO FUNCIONARIO LOGO //

// FUNCION VALIDAR RUT// 
// Capturando el DIV alerta y mensaje
let alerta  = document.querySelector("#alerta");
let mensaje = document.querySelector("#mensaje");
// Permitir sólo números en el imput
const isNumber = (evt) => {
  let charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) return false;
  return true;
}
const checkRut = (rut) => {
  if (rut.value.length <= 1) {
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingrese un RUT en el siguiente campo de texto para validar si es correcto o no';
  }
  // Obtiene el valor ingresado quitando puntos y guión.
  let valor = clean(rut.value);
  // Divide el valor ingresado en dígito verificador y resto del RUT.
  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();
  // Separa con un Guión el cuerpo del dígito verificador.
  rut.value = format(rut.value);
  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    rut.setCustomValidity("RUT Incompleto");
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingresó un RUT muy corto, el RUT debe ser mayor a 7 Dígitos. Ej: x.xxx.xxx-x';
    return false;
  }
  // Calcular Dígito Verificador "Método del Módulo 11"
  suma = 0;
  multiplo = 2;
  // Para cada dígito del Cuerpo
  for (i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(cuerpo.length - i);
    // Sumar al Contador General
    suma = suma + index;
    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }
  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);
  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    rut.setCustomValidity("RUT Inválido");
    alerta.classList.remove('alert-info', 'alert-success');
    alerta.classList.add('alert-danger');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + '<strong> No EXISTE</strong>.';
    return false;
  } else {
    rut.setCustomValidity("RUT Válido");
    alerta.classList.remove('d-none', 'alert-danger');
    alerta.classList.add('alert-success');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + '<strong id="estadoRut" > Si EXISTE</strong>.';
    return true;
  }
}
const format = (rut) => {
  rut = clean(rut)
  let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + result
  }
  console.log({result});
  return result
}
const clean = (rut) => {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}
//FUNCION VALIDAR RUT//

// FUNCION ELIMINAR ARCHIVO //
const eliminarArchivo = (id, propietario, ingreso, nombre, identificador) => {
    console.log(id);
    console.log(propietario);
    console.log(ingreso);
    console.log(nombre);
    Swal.fire({
        title: `¿Eliminar ${identificador}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#0B5ED7',
        denyButtonText: `Cancelar`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`Eliminado correctamente.', '', 'success`);
            let fd = new FormData();
            fd.append('idArchivo', id);
            fd.append('propietario', propietario);
            fd.append('ingreso', ingreso);
            fd.append('nombre', nombre);

            const url = 'controllers/controlador_eliminar.php';
            fetch(url,{
                method: 'POST',
                body: fd,
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            const divId     = document.getElementById(id);
            const container = document.querySelector('#container');
            container.removeChild(divId);
        } else if (result.isDenied) {
          Swal.fire('No se ha eliminado', '', 'info')
        }
    })
}
// FUNCION ELIMINAR ARCHIVO //

// HABILITAR LOS INPUT DATE //
const fileAntecedentes = document.getElementById("id_antecedentes"); 
fileAntecedentes.addEventListener('change', check); 
function check(){ 
    let verificar = this.files.length == 0 ? true : false;   
    let inputFechaCertAnt = document.getElementById("fechaCertAnt"); 
    inputFechaCertAnt.disabled = verificar;
}
const fileEM_01 = document.getElementById("id_EM_01"); 
fileEM_01.addEventListener('change', check2); 
function check2(){ 
    let verificar = this.files.length == 0 ? true : false;   
    let inputFechaEM01 = document.getElementById("fechaEM01"); 
    inputFechaEM01.disabled = verificar;
}
const fileEM_02 = document.getElementById("id_EM_02"); 
fileEM_02.addEventListener('change', check3); 
function check3(){ 
    let verificar = this.files.length == 0 ? true : false;   
    let inputFechaEM02 = document.getElementById("fechaEM02"); 
    inputFechaEM02.disabled = verificar;
}
const fileCert_salud = document.getElementById("id_cert_salud"); 
fileCert_salud.addEventListener('change', check4); 
function check4(){ 
    let verificar = this.files.length == 0 ? true : false;   
    let inputFechaCertSalud = document.getElementById("fechaCertSalud"); 
    inputFechaCertSalud.disabled = verificar;
}
const fileMilitar = document.getElementById("id_militar"); 
fileMilitar.addEventListener('change', check5); 
function check5(){ 
    let verificar = this.files.length == 0 ? true : false;
    let inputFechaMilitar = document.getElementById("fechaMilitar"); 
    inputFechaMilitar.disabled = verificar;
}
// HABILITAR LOS INPUT DATE //


// HABILITAR BOTON AGREGAR FUNCIONARIO //
// const enableBtnAgregar = document.querySelector('#guardarFuncionario');
// enableBtnAgregar.addEventListener('change',() => {
//     let verificar = this.text.length == '' ? true : false;
//     let inputFechaMilitar = document.getElementById("id_rut"); 
//     inputFechaMilitar.disabled = verificar;
// })
// HABILITAR BOTON AGREGAR FUNCIONARIO //

// ABRIR ARCHIVO PDF //
const abrirPdf = (propietario, ingreso, nombre) => {
    window.open(`docs/${propietario}/${ingreso}/${nombre}`,"_blank");
}
// ABRIR ARCHIVO PDF //

// AUTO RELLENAR LOS CAMPOS PARA NO DUPLICAR//
const inputRut = document.querySelector('#id_rut');
inputRut.addEventListener('keyup', () => keyupRut());
const keyupRut = () => {
  
    let strongEstadoRut = document.querySelector('#estadoRut'); 
    let inputRut        = document.querySelector('#id_rut').value;
    let inputNombre     = document.querySelector('#id_nombres'); 
    let inputApellidoP  = document.querySelector('#id_apellidoP');
    let inputApellidoM  = document.querySelector('#id_apellidoM');

    let mensaje = document.querySelector('#mensaje'); 
    //console.log(inputRut);
    if(document.body.contains(strongEstadoRut) ){
        //console.log('Si existe');
        const fd = new FormData();
        fd.append('rut', inputRut);
        const url = 'controllers/controlador_buscar_rut.php';
        fetch(url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
            console.log({data});
            inputNombre.value = data[0].nombres;
            inputNombre.setAttribute('disabled', true);
            inputApellidoP.value = data[0].apellido_p;
            inputApellidoP.setAttribute('disabled', true);
            inputApellidoM.value = data[0].apellido_p;
            inputApellidoM.setAttribute('disabled', true);
        });
    } else if(document.body.contains(mensaje)){
        inputNombre.value = '';
        inputNombre.removeAttribute('disabled');
        inputApellidoP.value = '';
        inputApellidoP.removeAttribute('disabled');
        inputApellidoM.value = '';
        inputApellidoM.removeAttribute('disabled');
    }
}
// AUTO RELLENAR LOS CAMPOS PARA NO DUPLICAR//

