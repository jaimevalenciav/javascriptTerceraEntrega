const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carritoCompra = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

items.addEventListener('click', e =>{
    agregarCarrito(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()        
        pintarCard(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = data => {
    data.forEach(producto => {
        templateCard.querySelector(".titulo-producto").textContent = producto.title
        templateCard.querySelector(".precio").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.imagen)
        templateCard.querySelector(".btn-info").dataset.id = producto.id
        templateCard.querySelector(".unidades").textContent = producto.saldo
        templateCard.querySelector(".id").textContent = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const agregarCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-info'))

    if(e.target.classList.contains('btn-info')){
        setCarritoCompra(e.target.parentElement)        
    }
    e.stopPropagation()
}

const setCarritoCompra = objeto => {   
    const producto = {
        id : objeto.querySelector('.btn-info').dataset.id,
        title : objeto.querySelector('.titulo-producto').textContent,
        precio : objeto.querySelector('.precio').textContent,
        imagen : objeto.querySelector('img').src,
        saldo : objeto.querySelector('.unidades').textContent,
        cantidad: 1
    }
    if(carritoCompra.hasOwnProperty(producto.id)){
        producto.cantidad = carritoCompra[producto.id].cantidad + 1
    }
    carritoCompra[producto.id] = {...producto}
    console.log(carritoCompra)
}