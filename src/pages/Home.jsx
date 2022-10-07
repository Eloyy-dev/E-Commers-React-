import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductThunk } from "../store/slices/products.slice";
import '../style/home.css'
import axios from "axios";
import { Button, InputGroup, Form, Row, Col, Card, ListGroup, ListGroupItem, Accordion, } from "react-bootstrap";
const Home = () => {

  const productsList = useSelector(state => state.products)
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const [productFiltered, setProductFiltered] = useState([])
  const [searchProduct, setSearchProduct] = useState("")


  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories').then(res => setCategory(res.data.data.categories))
  }, []);

  useEffect(() => {
    setProductFiltered(productsList)
  }, [productsList]);



  const filterCategory = (id) => {

    const filtered = productsList.filter(category => category.category.id === id);

    setProductFiltered(filtered)
  }

  // console.log(productsList[0])

  const Search = () => {

    const filtered = productsList.filter(name => name.title.toLowerCase().includes(searchProduct.toLowerCase()));

    setProductFiltered(filtered)
  }
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      Search()
    }
  }
  return (
    <Row>

      <Col lg={3}>
        <Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              {
                category.map(category => (
                  <ListGroupItem
                    key={category.id}
                    onClick={() => filterCategory(category.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {category.name}
                  </ListGroupItem>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>

      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search products"
            onChange={e => setSearchProduct(e.target.value)}
            value={searchProduct}
            onKeyDown={handleKeyDown}
          />
          <Button className="btn-search" variant="outline-secondary" onClick={() => Search()}>
            Button
          </Button>
        </InputGroup>

        <Row xs={1} md={2} xl={3} className="g-4 container-cards">
          {productFiltered.map(product => (
            <Col key={product.id}>
              <Card onClick={() => navigate(`productdetails/${product.id}`)} style={{ height: "100%" }} >
                <Card.Img variant="top" src={product.productImgs[0]} className="img-home" />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <p style={{ margin: "0px" }}>Price:</p>
                  <Card.Text>
                    ${product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>


    </Row>
  );
}

export default Home;