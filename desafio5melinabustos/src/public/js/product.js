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