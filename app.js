const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carritoCompra = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

cards.addEventListener('click', e =>{
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
    cards.appendChild(fragment)
}

const agregarCarrito = e => {    
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
    pintarCarrito()
    
}

const pintarCarrito = () => {
    console.log(carritoCompra)
    items.innerHTML = ''
    Object.values(carritoCompra).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-success').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone2 = templateCarrito.cloneNode(true)
        fragment.appendChild(clone2)

        console.log(fragment)
    })
    items.appendChild(fragment)
}