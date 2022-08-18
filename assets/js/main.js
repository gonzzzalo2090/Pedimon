const menu = document.querySelector(".btn__container");
const item = document.querySelectorAll(".item");

//Menu hamburguesa desplegable (toggle)
menu.addEventListener("click", () => {
  item.forEach((i) => i.classList.toggle("show"));
});

//ocultar/mostrar navbar con scroll
const navbar = document.getElementById("navbar")

let ultimoScrollTop = 0;

window.addEventListener("scroll",()=>{
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if(scrollTop > ultimoScrollTop){
    navbar.style.top = '-200px'
  }else{
    navbar.style.top = '0'
  }
  ultimoScrollTop = scrollTop
})






//Contadpr del carrito y el total
const totalItems = document.getElementById("totalItems");
const totalProducts = document.getElementById("totalProducts");
const btnComprar = document.querySelectorAll(".product__btn");
const cart = document.getElementById("cart");

//Creo un array vacio para los productos
let products = [];

//Funcion handleAddProduct
const handleAddProduct = (e) => {
  e.preventDefault();
  if (
    !e.target.classList.contains("product__btn") ||
    e.target.classList.contains("disable")
  ) {
    return;
  }

  //Recorrer el array de productos para ver si el nombre es igual al producto que ya esta agregado y no lo ponga de nuevo en el html
  for (let item in products) {
    if (products[item].name === e.target.dataset.name) {
      //incrementar el contador del producto
      products[item].count++;
      setCount();
      totalPrice();
      productList();
      return;
    }
  }

  //Guardo los target de los data en un objeto y lo pusheo al array vacio
  const newProduct = {
    img: e.target.dataset.img,
    name: e.target.dataset.name,
    price: e.target.dataset.price,
    count: e.target.dataset.count,
  };
  products.push(newProduct);

  setCount();
  totalPrice();
  productList();
};

//listener al boton comprar
btnComprar.forEach((item) => {
  item.addEventListener("click", handleAddProduct);
});

//Funcion para actualizar el contador de productos
const setCount = () => {
  let totalCount = 0;
  //recorro el array con for in y sumo al contador
  for (let item in products) {
    totalCount += parseInt(products[item].count);
  }
  //actualizo el contador q esta en el span del carrito
  totalItems.innerText = totalCount;
  return totalCount;
};

//Funcion que pinta html
const productList = () => {
  cart.innerHTML = products.map((product) => {
    return ` <div class="cart__item">
    <div class="cart__item--content">
      <img
        src="${product.img}"
        alt="pinguino"
        class="item-img"
      />
      <span>x${product.count}</span>
      <p class="cart__title">${product.name}</p>
      <span class="cart__price">$${product.price * product.count}</span>
    </div>
  </div>
    `;
  });
};

//Funcion que da el precio total como el setcount
const totalPrice = () => {
  let totalCart = 0;
  for (let item in products) {
    totalCart += parseInt(products[item].price * products[item].count);
  }
  totalProducts.innerText = totalCart;
  return totalCart;
};
