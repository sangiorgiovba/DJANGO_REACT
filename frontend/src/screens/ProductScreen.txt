import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductDetails,
  createReview 
  } from "../redux/slices/productSlice";
  
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;
  console.log(productDetails)

  const userLogin = useSelector((state) => state.user );
  const { userDetails } = userLogin;

  const productReviewCreate = useSelector((state) => state.product.createReview);
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;
  useEffect(() => {
   
    if (successProductReview) {
      setRating(0);
      setComment("");
    }

    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, qty));
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Voltar
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={3}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} avaliações`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Preco: R${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Descricao: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Preco:</Col>
                      <Col>
                        <strong>R${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "Em Estoque" : "Fora de estoque"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item >
                    <Row>
                      <Col>Quantidade:</Col>
                      <Col>
                        <Form.Control style={{  border:"2px solid black"}}
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add para o carrinho
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>Avaliações</h4>
              {product.reviews.length === 0 && <Message>Sem Avaliações</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating color={"#f8e825"} value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Escreva uma avaliacao</h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Comentário enviado</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userDetails ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Avaliação</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Ruim</option>
                          <option value="2">2 - Justa</option>
                          <option value="3">3 - Boa</option>
                          <option value="4">4 - Muito Boa</option>
                          <option value="5">5 - Exelente</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Enviar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Favor <Link to="/login">Entrar</Link> Para escrever uma avaliacao
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
