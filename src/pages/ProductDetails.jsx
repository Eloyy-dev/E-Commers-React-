import React, { useState } from "react";
import { Button, Carousel, CarouselItem, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addCart } from "../store/slices/car.slice";
import '../style/details.css'


const ProductDetails = () => {

  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products)

  const productByID = productsList.find(product => product.id === Number(id))

  const relatedProduct = productsList.filter(product => product?.category.id === productByID?.category.id)

  const addToCart = () => {
    const product = {
      id: id,
      quantity: quantity
    }
    console.log(product)
    dispatch(addCart(product))
  }

  return (
    <div>

      <div className="container-info">
        <div className="container-img">
          {/* <Carousel interval={null}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productByID?.productImgs[0]}
                alt="First slide"
                style={{height: "550px", width: "100"}}
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productByID?.productImgs[1]}
                alt="Second slide"
                style={{height: "550px", width: "100"}}
              />


            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productByID?.productImgs[2]}
                alt="Third slide"
                style={{height: "550px", width: "100"}}
              />
            </Carousel.Item>
          </Carousel> */}
          <img className="img" src={productByID?.productImgs[0]} alt="" />
        </div>
        <div className="Info">
          <h2>{productByID?.title}</h2>
          <p>{productByID?.description}</p>
          <h3>Price:</h3>
          <p>${productByID?.price}</p>
        </div>
      </div>
      <div className="gallety-btn">
        <div className="gallery">
          <div className="box-img">
            <img className="img-gallery" src={productByID?.productImgs[1]} alt="" />
          </div>
          <div className="box-img">
            <img className="img-gallery" src={productByID?.productImgs[2]} alt="" />
          </div>
        </div>
        <div className="btn-add">
          <div className="quantity">
            <p><b>Quantity</b></p>
            <button className="btn-quantity" onClick={() => setQuantity(quantity - 1)}>-</button>
            <p>{quantity < 0 ? "0" : quantity}</p>
            <button className="btn-quantity" onClick={() => setQuantity(quantity + 1)}>+</button>

          </div>
          <Button className="btn" variant="outline-danger" onClick={addToCart} style={{ width: "100%" }}>
            <span>Add to car</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="36" height="36" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="#ff2825" fill="none" strokeLinecap={"round"} strokeLinejoin={"round"}>
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </Button>{' '}
        </div>

      </div>
      <div className="related">
        <h2>Relacionado</h2>
        {
          relatedProduct.map(product => (

            <p key={product.id}><Link to={`/productdetails/${product.id}`}>{product.title}</Link></p>
          ))
        }

      </div>
    </div>
  );
}

export default ProductDetails;