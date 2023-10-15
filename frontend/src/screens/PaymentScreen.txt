import React, { useState } from "react";

import { Button, Form, Col } from "react-bootstrap";


import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";


import { useDispatch, useSelector } from "react-redux";


import { savePaymentMethod } from "../redux/slices/cartSlice";

function PaymentScreen({ history }) {
  

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;


  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }



  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

   
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Selecione um metodo</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal ou cartao de credito"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

