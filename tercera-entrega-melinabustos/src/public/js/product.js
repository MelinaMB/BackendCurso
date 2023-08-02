// const idCarrito = req.session.user.cart;

// let carritoId = localStorage.getItem('carrito-id');
// const API_URL = 'http://localhost:8080/api';
// function putIntoCart(_id) {
//   carritoId = localStorage.getItem('carrito-id');
//   const url = API_URL + '/carts/' + carritoId + '/product/' + _id;

//   const data = { quantity: 1 };

//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((res) => {
//       console.log(res);
//       alert('agregado!!!');
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert(JSON.stringify(error));
//     });
// }
// function showCart() {
//   carritoId = localStorage.getItem('carrito-id');
//   location.href = url;
// }

// function buyCart() {
//   carritoId = localStorage.getItem('carrito-id');
//   const url = API_URL + '/carts/' + carritoId + '/purchase';

//   const options = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   };
//   fetch(url, options);
// }
// if (!carritoId) {
//   alert('no id');
//   const url = API_URL + '/carts';
//   const data = { quantity: 1 };

//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Response:', data);
//       const carritoId = localStorage.setItem('carrito-id', data._id);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert(JSON.stringify(error));
//     });
// }

// ---------antes
let carritoId = localStorage.getItem("carrito-id");
const API_URL = "http://localhost:8080/api";
function putIntoCart(_id) {
  carritoId = localStorage.getItem("carrito-id");
  const url = API_URL + "/carts/" + carritoId + "/product/" + _id;

  const data = { 
    quantity: 1,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      alert("agregado!!!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(JSON.stringify(error));
    });
}

function showCart() {
  carritoId = localStorage.getItem("carrito-id");
  const url = API_URL + "/cartView/carts/" + carritoId;
  location.href=url;
}

function buyCart() {
  carritoId = localStorage.getItem("carrito-id");
  const url = API_URL + "/carts/" + carritoId + "/purchase";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  };

  fetch(url, options);
}

if (!carritoId) {
  alert("no id");
  const url = API_URL + "/carts";

  const data = {
    quantity: 1,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      const carritoId = localStorage.setItem("carrito-id", data._id);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(JSON.stringify(error));
    });
}
