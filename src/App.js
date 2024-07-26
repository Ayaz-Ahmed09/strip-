import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
function App() {
  const [products, setProducts] = useState({
    name: "React from FB ",
    price: 10,
    productsBy: "facebook",
  });

  const makePayment=token=>{
    const body={
      token,
      products
    }
    const headers={
      "content-type":"application/json"
    }
    return fetch(`http://localhost:8282/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)

    }).then(response=>{
      console.log(response,"REsponse")
      const {status}=response;
      console.log("status",status)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Payment" amount={products.price * 100}>
          <button className="btn-large pink">Buy react in {products.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
