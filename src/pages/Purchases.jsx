import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchase.slice";
import axios from "axios";
const Purchases = () => {

  const dispatch = useDispatch();
  const historial = useSelector(state => state.purchases)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
  //  console.log(historial[0]?.cart?.products[0].title)
  //  console.log(historial[0]?.cart?.products[1].title)

  const getDate = (date) => {
    const datee = new Date(date)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return datee.toLocaleDateString('en-GB', options)
  }
  return (

    <div>
      <h1>ESTE ES MI Purchases</h1>
      <ListGroup>
        {
          historial?.map(item => (

            <ListGroupItem key={item.id}>
              <ListGroupItem>
                <h2>{getDate(item.createdAt)}</h2>
              </ListGroupItem>
              <ListGroupItem >
                {
                  item.cart?.products.map(product => (
                    <p key={product.id} style={{ margin: "15px" }} onClick={() => navigate(`/productdetails/${product.id}`)}>{product.title}</p>
                  ))
                }

              </ListGroupItem>

            </ListGroupItem>
          ))
        }
      </ListGroup>
    </div>
  );
}

export default Purchases;