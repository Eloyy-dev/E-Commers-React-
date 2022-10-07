import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCart, getCart, purchaseCart } from "../store/slices/car.slice";
import '../style/car.css'

const Car = ({ show, close }) => {
  const dispatch = useDispatch()
  const [finalPrice, setFinalPrice] = useState("")
  const CarNow = useSelector(state => state.car)

  useEffect(() => {
    dispatch(getCart())
  }, []);


  useEffect(() => {
    let total = 0;
    CarNow.forEach(item => {
      total += item.price * item.productsInCart.quantity
    })
    setFinalPrice(total);
  }, [CarNow])


  const itemPrice = (price, quantity) => {
    const priceItem = price * quantity

    return `${priceItem}.00`;
  }

  const buyCart = () => {
    dispatch(purchaseCart())
  }

  const deleteProduct = (id) => {

    dispatch(deleteProductCart(id))

  }

  return (
    <Offcanvas show={show} onHide={close}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h1>You cart</h1>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr></hr>
      <Offcanvas.Body >
        <div className="body-cart">
          <ul className="container-card-cart">
            {
              CarNow.map(item => (
                <li key={item.id}>
                  <div className="card-cart">
                    <div className="card-header-cart">
                      <h3>{item.title}</h3>
                      <button style={{ borderRadius: "10px" }} onClick={() => deleteProduct(item.id)}><i className="fa-sharp fa-solid fa-trash" style={{ color: "red" }}></i></button>
                    </div>
                    <div className="card-body-cart">
                      <p><span className="span-cart">Cant: </span>{item.productsInCart.quantity}</p>
                      <div>
                        <p><span className="span-cart">Total:</span></p>
                        <p>{itemPrice(item.price, item.productsInCart.quantity)}</p>
                      </div>
                    </div>
                  </div>

                </li>
              ))
            }
          </ul>
          <div className="Final-cart">
            <p>${finalPrice}.00</p>
            <button className="btn-buy" onClick={buyCart}>checkout</button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Car;