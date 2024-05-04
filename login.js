function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        document,querySelector('.icon').src = "img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "img/menu_white_36dp.svg"
    }
}
function logar(){

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    if(email == "adm" && senha == "senha"){
        alert("correto");
    }else
        alert("erro");


}


//Variable que mantiene el estado visible del carrito
var carrinhoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrinho);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrinho = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrinho.length;i++){
        var button = botonesAgregarAlCarrinho[i];
        button.addEventListener('click', agregarAlCarrinhoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Obrigado por sua compra");
    //Elimino todos los elmentos del carrito
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    while (carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild)
    }
    actualizarTotalCarrinho();
    ocultarCarrinho();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarrinhoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrinho(titulo, precio, imagenSrc);

    hacerVisibleCarrinho();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrinho(){
    carrinhoVisible = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrinho(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrinho = document.getElementsByClassName('carrinho-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrinho = itemsCarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nombresItemsCarrinho.length;i++){
        if(nombresItemsCarrinho[i].innerText==titulo){
            alert("Produto adicionado ao carrinho");
            return;
        }
    }

    var itemCarrinhoContenido = `
        <div class="carrinho-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrinho-item-detalles">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrinho-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrinho-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarrinhoContenido;
    itemsCarrinho.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrinho);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrinho();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrinho-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrinho();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrinho-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrinho();
    }
}

//Elimino el item seleccionado del carrinho
function eliminarItemCarrinho(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrinho
    actualizarTotalCarrinho();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrinho
    ocultarCarrinho();
}
//Funciòn que controla si hay elementos en el carrinho. Si no hay oculto el carrinho.
function ocultarCarrinho(){
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carrinhoItems.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carrinhoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrinho
function actualizarTotalCarrinho(){
    //seleccionamos el contenedor carrinho
    var carrinhoContenedor = document.getElementsByClassName('carrinho')[0];
    var carrinhoItems = carrinhoContenedor.getElementsByClassName('carrinho-item');
    var total = 0;
    //recorremos cada elemento del carrinho para actualizar el total
    for(var i=0; i< carrinhoItems.length;i++){
        var item = carrinhoItems[i];
        var precioElemento = item.getElementsByClassName('carrinho-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('R$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrinho-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrinho-precio-total')[0].innerText = 'R$'+total.toLocaleString("es") + ",00";

}