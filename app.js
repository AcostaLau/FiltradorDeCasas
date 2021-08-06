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
        selector.append(`  <div id="casa${casas.id}" class="divContainerFiltro" data-aos="zoom-in">
            <div class="tamañoImagenCajaFiltro">
                <img class="paisaje__img" src=${casas.img} width="100%" height="100%">
            </div>
        <div class="pasiajeCajaDiv">
            <p class="text-center">Zona: ${casas.zona} <br> Precio: $${casas.precio} <br> Tipo: ${casas.tipo}</p>
        </div>
    </div>`)
    }
    
}

function filtrarPorZona(array){
    let dato = JSON.parse(localStorage.getItem('zona'))
    let zonaFiltrada = casas.filter(casa => casa.zona === dato)

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
        cajaCasa.html(`
        <div id="cajaLista" class="card text-center cajaContenedoraFelicitaciones" style="display: none;">
            <div class="card-header">
                <h2 class="textFelicitaciones">¡Felicidades! tu reserva esta casi lista</h2>
            </div>
            <div class="card-body">
                <h5 class="card-title textFelicitaciones">Hola ${element.nombreCliente} la siquiente orden será ejecutada:</h5>
                <h5 class="card-title textFelicitaciones">Vas a mudarte en la zona ${element.zona}</h5>
                <h5 class="card-text textFelicitaciones">Tipo de mudanza ${element.tipoDeMudanza}</h5>
                <h5 class="card-text textFelicitaciones">Cantidad de ambientes ${element.ambientes}</h5>
                <a href="#busquedaDeCasas" class="btn btn-primary botomForm2">Continuar</a>
            </div>
        </div>
        `) 
    });

    $("#cajaLista").slideDown("slow");
}
//EVENTOS
botonArmarCajaCasa.click(guardarDatos);
botonBuscar.click(filtrarPorPrecio);





