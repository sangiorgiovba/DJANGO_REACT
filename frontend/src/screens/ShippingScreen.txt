import React, { useState } from "react";


import { Button, Form } from "react-bootstrap";


import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";


import { useDispatch, useSelector } from "react-redux";


import { saveShippingAddress } from "../redux/slices/cartSlice";

function ShippingScreen({ history }) {

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;


  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();

   
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

  
    history.push("./payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Envio</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Endereco</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Endereco"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Digite a cidade"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Caixa Postal</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o código postal"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Pais</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Insira o país"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
