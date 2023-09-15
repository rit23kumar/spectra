import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class SalesOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null,
      selectedItems: [],
      quantities: {},
    };
  }

  handleCustomerChange = (event) => {
    this.setState({ selectedCustomer: event.target.value });
  };

  handleItemChange = (event, itemId) => {
    const quantities = { ...this.state.quantities };
    quantities[itemId] = parseInt(event.target.value, 10);
    this.setState({ quantities });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Process the sales order data here, such as sending it to a backend API
    console.log('Sales Order Data:', {
      customer: this.state.selectedCustomer,
      items: this.state.selectedItems,
      quantities: this.state.quantities,
    });
  };

  render() {
    return (
      <Container>
        <h1>Sales Order Page</h1>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Select Customer:</Form.Label>
                <Form.Control as="select" onChange={this.handleCustomerChange}>
                  <option value="">Select a Customer</option>
                  {/* Render customer options here */}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Select Items:</Form.Label>
                {/* Render item selection checkboxes or dropdowns here */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Quantities:</Form.Label>
                {/* Render input fields for item quantities here */}
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit Order
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SalesOrder;
