// document.addEventListener('DOMContentLoaded', () => {
//     // Ensure the DOM is fully loaded before accessing elements
  
//     document.getElementById("callForm").addEventListener("submit", function (event) {
//       event.preventDefault();
//       const phoneNumber = document.getElementById("phoneNumber").value;
//       const nameofuser = document.getElementById("nameofuser").value;
  
//       // Send the phone number to the server for further processing
//       // You may use XMLHttpRequest, fetch, or any other method to send data to the server
  
//       // For simplicity, let's just log the phone number to the console
//       console.log("Phone Number:", phoneNumber);
  
//       // You can add code here to send the request to your server
//     });
//   });
  

//from here service section is started


// document.addEventListener('DOMContentLoaded', () => {
//     // Ensure the DOM is fully loaded before accessing elements
//     let carticon = document.querySelector('#open-cart');
//     let cart = document.querySelector('.cart');
//     let closecart = document.querySelector('#close-cart');
  
//     // Check if the elements are present in the DOM before adding event listeners
//     if (carticon && cart && closecart) {
//       // Open cart
//       carticon.addEventListener('click', () => {
//         cart.classList.add("active");
//       });
  
//       // Close cart
//       closecart.addEventListener('click', () => {
//         cart.classList.remove("active");
//       });
//     } else {
//       console.error('One or more elements not found in the DOM.');
//     }
//   });

//   //making add to cart 
// if(document.readyState == "loading"){
//   document.addEventListener("DOMContentLoaded",ready);
// } else{
//   ready();
// }

// //making function
// function ready() {
//   var removeCartButtons = document.getElementsByClassName('cart-remove') 
//   for (var i = 0;i<removeCartButtons.length;i++){
//     var button = removeCartButtons[i];
//     document.addEventListener('DOMContentLoaded', function() {

//       button.addEventListener("click",removeCartitems);
//     })
    
//   }
//   // Quantity Change
// var quantityInputs = document.getElementsByClassName("cart-quantity")
// for (var i = 0;i<quantityInputs.length;i++){
//   var input = quantityInputs[i];
//   document.addEventListener('DOMContentLoaded', function() {

//     input.addEventListener("change",quantityChanged);
//   })
// }
// // Add to Cart
// var addCart = document.getElementsByClassName('add-cart');
// for (var i = 0;i<addCart.length;i++){
//   var button = quantityInputs[i];
//   document.addEventListener('DOMContentLoaded', function() {

//     button.addEventListener("click",addCartClicked);
//   })
// }
// }

// //remove cart items
// function removeCartitems(event){
//   var buttonClicked = event.target;
//   buttonClicked.parentElement.remove();
//   updatetotal()
// }

// //Quantity Changed
// function quantityChanged(event){
//   var input = event.target;
//   if(isNaN(input.value) || input.value <= 0){
//     input.value = 1;
//   }
//   updatetotal()
// }

// // Update Total
// function updatetotal(){
//   var cartcontent = document.getElementsByClassName('cart-content')[0];
//   var cartboxes = cartcontent.getElementsByClassName('cart-box');
//   var total = 0;
//   for(var i =0; i< cartboxes.length;i++){
//     var cartbox = cartboxes[i];
//     var priceElemnts = cartbox.getElementsByClassName('cart-price')[0];
//     var quantityElemnts = cartbox.getElementsByClassName('cart-quantity')[0];
// var price = parseFloat(priceElemnts.innerText.replace('$',''))
// var quantity = quantityElemnts.value;
// total += price * quantity;

// }
// // if price is in some cent
// total = Math.round(total * 100) / 100;
// document.getElementsByClassName('total-price')[0].innerText = '$' + total;

// }

// // Add Cart Button
// function addCartClicked(event){
// var button = event.target;
// var shopProducts = button.parentElement;
// var title = shopProducts.getElementsByClassName('product-title').innerText[0];
// var price = shopProducts.getElementsByClassName('price').innerText[0];
// var productImg = shopProducts.getElementsByClassName('product-img').innerTex[0].src;

// addproductTocart(title,price,productImg)
// updatetotal();

// }


// function addproductTocart(title,price,productImg){

// var cartShopBox = document.createElement('div');
// cartShopBox.classList.add("cart-box");
// var cartItems = document.getElementsByClassName("cart-content")[0];
// var cartItemsname = cartItems.getElementsByClassName("cart-product-title");
// for(var i =0; i<cartItemsname.length;i++){
//   alert("You Have Already added this item");
//   return
// }

// var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
// <div class="detail-box">
//  <div class="cart-product-title">${title}</div>
//  <div class="cart-price">${price}</div>
//  <input type="number" 
//  name=""
//  id=""
//  value="1"
//  class="cart-quantity"
//  >
// </div>
// <!-- remove item  -->
// <i class='bx bx-trash cart-remove'  ></i>`;

// cartShopBox.innerHTML = cartBoxContent;
// cartItems.append(cartShopBox);
// document.addEventListener('DOMContentLoaded', function() {

//   cartShopBox.getElementsByClassName('cart-remove')[0]
//   .addEventListener('click',removeCartitems);
// })

// document.addEventListener('DOMContentLoaded', function() {
//   cartShopBox.getAttributeNames('cart-quantity')[0]
//   .addEventListener('click',quantityChanged);
// })
// }


document.addEventListener('DOMContentLoaded', function () {
  // Ensure the DOM is fully loaded before accessing elements
  let carticon = document.querySelector('#open-cart');
  let cart = document.querySelector('.cart');
  let closecart = document.querySelector('#close-cart');

  // Check if the elements are present in the DOM before adding event listeners
  if (carticon && cart && closecart) {
      // Open cart
      carticon.addEventListener('click', () => {
          cart.classList.add("active");
      });

      // Close cart
      closecart.addEventListener('click', () => {
          cart.classList.remove("active");
      });
  } else {
      console.error('One or more elements not found in the DOM.');
  }

  // Add event listeners directly without the loop
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removeCartButtons.length; i++) {
      removeCartButtons[i].addEventListener("click", removeCartitems);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", quantityChanged);
  }

  var addCartButtons = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCartButtons.length; i++) {
      addCartButtons[i].addEventListener("click", addCartClicked);
  }

  // Load cart items from local storage
  loadCartItems();
});

// Rest of your functions...
function removeCartitems(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  saveCartItems();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }
  updatetotal();
  saveCartItems();
}

function updatetotal() {
  var cartcontent = document.getElementsByClassName('cart-content')[0];
  var cartboxes = cartcontent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartboxes.length; i++) {
      var cartbox = cartboxes[i];
      var priceElemnts = cartbox.getElementsByClassName('cart-price')[0];
      var quantityElemnts = cartbox.getElementsByClassName('cart-quantity')[0];
      var price = parseFloat(priceElemnts.innerText.replace('$', ''))
      var quantity = quantityElemnts.value;
      total += price * quantity;
  }
  // if price is in some cent
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = '$' + total;

  // Save Total to local storage
  localStorage.setItem('cartTotal', total);
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

  addproductTocart(title, price, productImg);
  updatetotal();
  saveCartItems();
}

function addproductTocart(title, price, productImg) {
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsname = cartItems.getElementsByClassName("cart-product-title");

  // Check if the item with the same title already exists
  for (var i = 0; i < cartItemsname.length; i++) {
      var existingTitle = cartItemsname[i].innerText;
      if (existingTitle === title) {
          alert("You have already added this item");
          return;
      }
  }

  // Create a new cart box for the item
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" 
              name=""
              id=""
              value="1"
              class="cart-quantity"
          >
      </div>
      <!-- remove item  -->
      <i class='bx bx-trash cart-remove'></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox.getElementsByClassName('cart-remove')[0]
      .addEventListener('click', removeCartitems);

  cartShopBox.getElementsByClassName('cart-quantity')[0]
      .addEventListener('change', quantityChanged);
}

// Concept Of Local Storage
function saveCartItems() {
  var cartcontent = document.getElementsByClassName('cart-content')[0];
  var cartboxes = cartcontent.getElementsByClassName('cart-box');
  var cartItems = [];
  for (var i = 0; i < cartboxes.length; i++) {
      var cartbox = cartboxes[i];
      var titleElement = cartbox.getElementsByClassName('cart-product-title')[0];
      var priceElement = cartbox.getElementsByClassName('cart-price')[0];
      var quantityElement = cartbox.getElementsByClassName('cart-quantity')[0];
      var productImg = cartbox.getElementsByClassName('cart-img')[0].src;

      var item = {
          title: titleElement.innerText,
          price: priceElement.innerText,
          quantity: quantityElement.value,
          productImg: productImg
      };
      cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Loads In Cart
// function loadCartItems() {
//   var cartItems = localStorage.getItem('cartItems');
//   if (cartItems) {
//       cartItems = JSON.parse(cartItems);

//       for (var i = 0; i < cartItems.length; i++) {
//           var item = cartItems[i];
//           addproductTocart(item.title, item.price, item.productImg);

//           var cartboxes = document.getElementsByClassName('cart-box');
//           var cartbox = cartboxes[cartboxes.length - 1];
//           var quantityElement = cartbox.getElementsByClassName("cart-quantity")[0];
//           quantityElement.value = item.quantity;
//       }
//   }

//   var cartTotal = localStorage.getItem('cartTotal');
//   if (cartTotal) {
//       document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
//   }
// }

// Loads In Cart
function loadCartItems() {
  var cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
      cartItems = JSON.parse(cartItems);

      for (var i = 0; i < cartItems.length; i++) {
          var item = cartItems[i];

          // Check if the item with the same title already exists in the cart
          if (!isItemInCart(item.title)) {
            addproductTocart(item.title, item.price, item.productImg);
        
            var cartboxes = document.getElementsByClassName('cart-box');
        
            if (cartboxes.length > 0) {
                var cartbox = cartboxes[cartboxes.length - 1];
                var quantityElement = cartbox.getElementsByClassName("cart-quantity")[0];
        
                if (quantityElement) {
                    quantityElement.value = item.quantity;
                } else {
                    console.error("No element with class 'cart-quantity' found within the last 'cart-box'.");
                }
            } else {
                console.error("No element with class 'cart-box' found.");
            }
        }
        
      }
  }

  var cartTotal = localStorage.getItem('cartTotal');
  if (cartTotal) {
      document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
  }
}

// Helper function to check if an item with the same title is already in the cart
function isItemInCart(title) {
    var cartContent = document.querySelector(".cart-content");

    if (cartContent) {
        var cartProductTitles = cartContent.getElementsByClassName("cart-product-title");

        for (var i = 0; i < cartProductTitles.length; i++) {
            if (cartProductTitles[i].innerText === title) {
                return true;  // Item found in the cart
            }
        }
    }

    return false;  // Item not found in the cart
}

// Clear Cart items
function clearcart(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    cartContent.innerHTML = '';
    updatetotal();
    localStorage.removeItem('cartItems');
}