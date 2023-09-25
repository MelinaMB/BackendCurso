const API_URL = "http://localhost:8080/api";

let carritoId = getCart();

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
  location.href = url;
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
  fetch(url, options).then((response) => response.json())
  .then((res) => {
    location.href = API_URL + "/ticket/" + res.ticketId;
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(JSON.stringify(error));
  });
}

function eliminarProductos() {
  carritoId = localStorage.getItem("carrito-id");
  const url = API_URL + "/carts/" + carritoId;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  fetch(url, options).then((response) => response.json())
  .then((res) => {
    location.href = API_URL + "/cartView/carts/" + carritoId;
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(JSON.stringify(error));
  });
}

function getCart() {
  const url = API_URL + "/carts/user";

  fetch(url).then((response) => response.json())
  .then((res) => {
    localStorage.setItem("carrito-id", res.cart);
    return res.cart;
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(JSON.stringify(error));
  });
}
