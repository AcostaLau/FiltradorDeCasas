// ENTIDADES--------------------------------------
class ofertas {
    constructor(nombreCliente, tipoDeMudanza, zona, ambientes){
        this.nombreCliente = nombreCliente, 
        this.tipoDeMudanza = tipoDeMudanza,
        this.zona = zona, 
        this.ambientes = ambientes;
    }
}
const URL = './json.json'


//ARRAYS-----------------------------------------------
let casas= [];
const Lista = [];


// SELECTORES------------------------------------------
let botonArmarCajaCasa =$('#buscar1');
let botonBuscar = $('#buscar2');
let cajaCasa = $('#form')
let selector = $('#cabeza')
const form = document.querySelector("#form");


// AJAX
$.get(URL, function(data, status){
    console.log(data);
    console.log(status);
    if(status === 'success'){
        casas = data;
    }
})

//FUNCIONES----------------------------------------------
function crearTarjetas(filtradas){
    selector.html('');
    let casasFiltradas = filtradas;
    for(const casas of casasFiltradas){
        let div1 = document.createElement('div');
        div1.classList.add('divContainerFiltro');
        div1.id = `casa${casas.id}`
        let dataAOS = document.createAttribute("data-aos");
        dataAOS.value = 'zoom-in';
        div1.setAttributeNode(dataAOS);
        cabeza.appendChild(div1);

        let div2 = document.createElement('div');
        div2.classList.add('tamañoImagenCajaFiltro')
        div1.appendChild(div2);

        let img = document.createElement('img');
        img.classList.add('paisaje__img', 'img-fluid');
        img.src = `${casas.img}`;
        div2.appendChild(img);

        let div3 = document.createElement('div');
        div3.classList.add('pasiajeCajaDiv');
        div1.appendChild(div3);

        let parrafo1 = document.createElement('p');
        parrafo1.classList.add('text-center');
        parrafo1.textContent = `Zona: ${casas.zona}`;

        let parrafo2 = document.createElement('p');
        parrafo2.classList.add('text-center');
        parrafo2.textContent = `Precio: $${casas.precio}`;
        
        let parrafo3 = document.createElement('p');
        parrafo3.classList.add('text-center');
        parrafo3.textContent = `Tipo: ${casas.tipo}`;

        div3.appendChild(parrafo1)
        div3.appendChild(parrafo2)
        div3.appendChild(parrafo3)




    }
    
}


function filtrarPorZona(array){
    let dato = JSON.parse(localStorage.getItem('zona'))
    let zonaFiltrada = array.filter(casa => casa.zona === dato)

    crearTarjetas(zonaFiltrada);
}

function filtrarPorPrecio(){
    let filtro = document.getElementById('verCasas').value;
    let casasFiltradas = casas.filter(casa => casa.precio <= filtro);
    
    filtrarPorZona(casasFiltradas)
}

function guardarDatos(e){
    e.preventDefault()
    let tipoDeMudanza = $('#tipoDeMudanza').val();
    let zona = $('#Zona').val();
    let zona2 = zona.toLowerCase();
    let ambientes = $('#ambientes').val();
    let nombreCliente = $('#nombre').val()

    const nuevaLista = new ofertas (nombreCliente, tipoDeMudanza, zona, ambientes);
    Lista.push(nuevaLista);
    localStorage.setItem('zona', JSON.stringify(zona2))
    localStorage.setItem('lista', JSON.stringify(Lista));

    armarCasa()


}

function armarCasa(){
    cajaCasa.html('');
    let imprimir = JSON.parse(localStorage.getItem('lista'));
    imprimir.forEach(element => {
        let div1 = document.createElement('div');
        div1.classList.add('card', 'text-center', 'cajaContenedoraFelicitaciones');
        div1.id = `cajaLista`;
        form.appendChild(div1);

        let div2 = document.createElement('div');
        div2.classList.add('card-header');
        div1.appendChild(div2);

        let h2 = document.createElement('h2');
        h2.classList.add('textFelicitaciones');
        h2.textContent = '¡Felicidades! tu reserva esta casi lista';
        div2.appendChild(h2);

        let div3 = document.createElement('div');
        div3.classList.add('card-body')
        div1.appendChild(div3);

        let h5uno = document.createElement('h5');
        h5uno.classList.add('card-title', 'textFelicitaciones');
        h5uno.textContent = `Hola ${element.nombreCliente} la siquiente orden será ejecutada: `;

        let h5dos = document.createElement('h5');
        h5dos.classList.add('card-title', 'textFelicitaciones');
        h5dos.textContent = `Vas a mudarte en la zona ${element.zona} `;

        let h5tres = document.createElement('h5');
        h5tres.classList.add('card-title', 'textFelicitaciones');
        h5tres.textContent = `Tipo de mudanza ${element.tipoDeMudanza} `;

        let h5cuatro = document.createElement('h5');
        h5cuatro.classList.add('card-title', 'textFelicitaciones');
        h5cuatro.textContent = `Cantidad de ambientes ${element.ambientes} `;

        let a = document.createElement('a');
        a.classList.add('btn', 'btn-primary', 'botomForm2');
        a.href = '#busquedaDeCasas'
        a.textContent = 'Continuar'

        div3.appendChild(h5uno)
        div3.appendChild(h5dos)
        div3.appendChild(h5tres)
        div3.appendChild(h5cuatro)
        div3.appendChild(a)
    });

    $("#cajaLista").slideDown("slow");
}

// cajaCasa.html(`
//         <div id="cajaLista" class="card text-center cajaContenedoraFelicitaciones">
//             <div class="card-header">
//                 <h2 class="textFelicitaciones">¡Felicidades! tu reserva esta casi lista</h2>
//             </div>
//             <div class="card-body">
//                 <h5 class="card-title textFelicitaciones">Hola ${element.nombreCliente} la siquiente orden será ejecutada:</h5>
//                 <h5 class="card-title textFelicitaciones">Vas a mudarte en la zona ${element.zona}</h5>
//                 <h5 class="card-text textFelicitaciones">Tipo de mudanza ${element.tipoDeMudanza}</h5>
//                 <h5 class="card-text textFelicitaciones">Cantidad de ambientes ${element.ambientes}</h5>
//                 <a href="#busquedaDeCasas" class="btn btn-primary botomForm2">Continuar</a>
//             </div>
//         </div>
//         `) 

//EVENTOS
botonArmarCajaCasa.click(guardarDatos);
botonBuscar.click(filtrarPorPrecio);





