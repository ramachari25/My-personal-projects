const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const productsEl=document.querySelector('.product-center')
const shopProducts=document.querySelector(".paginationProducts")
const Pagination=document.querySelector(".paginationPages")
const sortingMenu=document.querySelector(".sortingMenu")
if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Popup
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}
//rendering products in index.html page
const renderProducts=()=>{
  products.forEach((val)=>{
  if(productsEl){
  productsEl.innerHTML+=`
  <div class="product-item">
  <div class="overlay">
    <a href="" class="product-thumb">
      <img src="${val.image}" alt="" />
    </a>
    <span class="discount">${val.discount}</span>
  </div>

  <div class="product-info">
    <span>${val.category}</span>
    <p onclick='storeDetails(${val.id})' style="cursor:pointer;">${val.desc}</p>
    <h4>${val.price}</h4>
  </div>
  <ul class="icons">
    <li><i class="bx bx-heart"></i></li>
    <li><i class="bx bx-search"></i></li>
    <li onclick="AddToCart(${val.id})"><i class="bx bx-cart"></i></li>
  </ul>
</div>`
}})}
renderProducts()
//sorting in products.html
let initialPage=1
const sorting=()=>{
  if(sortingMenu){
    sortingMenu.innerHTML+=`
    <select onchange="sortingType(event)" class="mySelect">
     <option value=" ">Defualt Sorting</option>
     <option value="Sort By Price">Sort By Price</option>
   </select>
   `
  }
}
sorting()
const sortingType=(e)=>{
 if(e.target.value=='Sort By Price'){
     displayItems(initialPage,"Sort By Price")
  }
  
}

//pagination in product.html
const itemsPerPage=3
const totalPages = Math.ceil(products.length / itemsPerPage);
function displayItems(page,type) {
  console.log(type)
  if(shopProducts){
  initialPage=page
  shopProducts.innerHTML=''
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = type=="Sort By Price"?products.slice(startIndex, endIndex).sort((a, b) => a.price - b.price):products.slice(startIndex, endIndex)
  items.forEach((item) => {
    shopProducts.innerHTML+=`
      <div class="product-item">
      <div class="overlay">
        <a href="" class="product-thumb">
          <img src="${item.image}" alt="" />
        </a>
        <span class="discount">${item.discount}</span>
      </div>
    
      <div class="product-info">
        <span>${item.category}</span>
        <p onclick='storeDetails(${item.id})' style="cursor:pointer;">${item.desc}</p>
        <h4>${item.price}</h4>
      </div>
      <ul class="icons">
        <li><i class="bx bx-heart"></i></li>
        <li><i class="bx bx-search"></i></li>
        <li onclick="AddToCart(${item.id})"><i class="bx bx-cart"></i></li>
      </ul>
    </div>`
})}}
const showPagination=()=>{
  if(Pagination){
   Array(totalPages).fill(0).map((val,i)=>{
     Pagination.innerHTML+=`
    <span onclick="displayItems(${i+1})">${i+1}</span>
    `
  })
  }}
showPagination()
displayItems(initialPage)

//Adding items to cart function
const AddToCart=(id)=>{
  const obj=products.find((val)=>val.id==id)
  const cart=JSON.parse(localStorage.getItem("cartItems"))
  if(cart&&cart.length>0&&cart.some((value)=>value.id==obj.id)){
     const units=cart.find((val)=>val.id==obj.id)
     units.numberOfUnits++
     localStorage.setItem("cartItems",JSON.stringify(cart))
     alert("Added Succesfully To cart")
     showCartCountInNavbar()
  }
  else{
    if(cart&&cart.length>0){
      cart.push({...obj,numberOfUnits:1})
      localStorage.setItem("cartItems",JSON.stringify(cart))
      alert("Added Succesfully To cart")
      showCartCountInNavbar()
    }
    else{
      localStorage.setItem("cartItems",JSON.stringify([{...obj,numberOfUnits:"1"}]))
      alert("Added Succesfully To cart")
      showCartCountInNavbar()
    }
}}
//showing the selected product in product details page
const storeDetails=(val)=>{
  localStorage.setItem("selectedItem",val)
  window.location.href="productDetails.html"
}
const productsDetailsEl=document.querySelector(".product-detail")
const displayDetails=()=>{
  if(productsDetailsEl){
 
  const id=localStorage.getItem("selectedItem")
  const obj=products.find((val)=>val.id==id)
   productsDetailsEl.innerHTML+=`
  <div class="details container">
        <div class="left image-container">
          <div class="main" id="selectedImageContainer">
          <img src="${obj.image}"></img>
        </div>
        </div>
        <div class="right" id="data">
          <span>Home/T-shirt</span>
          <h1>${obj.desc}</h1>
          <h4 class="price">${obj.price}</h4>
          <form>
            <div>
              <select>
                <option value="Select Size" selected disabled>
                  Select Size
                </option>
                <option value="1">32</option>
                <option value="2">42</option>
                <option value="3">52</option>
                <option value="4">62</option>
              </select>
              <span><i class="bx bx-chevron-down"></i></span>
            </div>
          </form>
          <form class="form">
            <input type="text" placeholder="1" />
            <button  class="addCart" style="cursor:pointer;" onclick="AddToCart(${obj.id})">Add To Cart</button>
          </form>
          <h3>Product Detail</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima
            delectus nulla voluptates nesciunt quidem laudantium, quisquam
            voluptas facilis dicta in explicabo, laboriosam ipsam suscipit!
          </p>
        </div>`
  }
  
}
displayDetails()
//display cart total in navbar
const homeCartEl=document.querySelector(".homeCart")
const CartPageEl=document.querySelector(".cartPage")
const miniHomeCartEl=document.querySelector(".miniHomeCart")
const detailsCartEl=document.querySelector(".detailsCartMini")
const productCartEl=document.querySelector(".productCart")
const showCartCountInNavbar=()=>{
  if(homeCartEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    homeCartEl.innerHTML=`
    <span class="d-flex">${cart.length}</span>
    `
  }
  if(CartPageEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    CartPageEl.innerHTML=`
    <span class="d-flex">${cart.length}</span>
    `

  }
  if(miniHomeCartEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    miniHomeCartEl.innerHTML=`
    <span class="d-flex">${cart.length}</span>
    `

  }
  if(detailsCartEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    detailsCartEl.innerHTML=`
    <span class="d-flex">${cart.length}</span>
    `

  }
  if(productCartEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    productCartEl.innerHTML=`
    <span class="d-flex">${cart.length}</span>
    `

  }
}
showCartCountInNavbar()
//updating cart items
const updateCart=()=>{
  displayCartItems()
  updateSubTotal()
  showCartCountInNavbar()
}
const cartEl=document.querySelector(".cartContent")
const displayCartItems=()=>{
  console.log(cartEl)
  if(cartEl){
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    cartEl.innerHTML=''
    cart.forEach((val)=>{
    cartEl.innerHTML+=`
        <tr>
        <td>
          <div class="cart-info">
            <img src="${val.image}" alt="" />
            <div>
              <p>${val.desc}</p>
              <span>Price:${val.price}</span> <br />
              <a href="#" onclick='removeElement(${val.id})'>remove</a>
            </div>
          </div>
        </td>
        <td>${val.numberOfUnits}</td>
        <td><input type="number" value=${val.numberOfUnits} min="1" onchange='changeUnits(event,${val.id})'/></td>
        <td>${Number(val.price)*val.numberOfUnits}</td>
      </tr>`
    })
  }
}
const changeUnits=(e,id)=>{
 const count=e.target.value
 const cart=JSON.parse(localStorage.getItem("cartItems"))
 const obj=cart.find((val)=>val.id==id)
 obj.numberOfUnits=count
 localStorage.setItem("cartItems",JSON.stringify(cart))
 updateCart()
}
const removeElement=(id)=>{
  const cart=JSON.parse(localStorage.getItem("cartItems"))
  const index=cart.findIndex((val)=>val.id==id)
  if(index>-1){
  cart.splice(index,1)
  }
  localStorage.setItem("cartItems",JSON.stringify(cart))
  updateCart()
}
const totalEl=document.querySelector(".total-price")
const updateSubTotal=()=>{
  if(totalEl){
    totalEl.innerHTML=''
    const cart=JSON.parse(localStorage.getItem("cartItems"))
    const total=cart.reduce((temp,val)=>(Number(val.price)+temp)*val.numberOfUnits,0)
    const tax=total*1/10
    totalEl.innerHTML+=` <table>
  <tr>
    <td>Subtotal</td>
    <td>${total}</td>
  </tr>
  <tr>
    <td>Tax</td>
    <td>${tax}</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>${total+tax}</td>
  </tr>
</table>
<a href="#" class="checkout btn">Proceed To Checkout</a>`
  }}
updateCart()