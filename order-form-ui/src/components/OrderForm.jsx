import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  TextField,
  Dropdown,
  Button,
  Toast,
} from "monday-ui-react-core";
import { createOrder } from "../api/service";

const OrderForm = () => {
  const [orderInputs, setOrderInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    fragrances: [],
    quantity: "",
    inscription: "",
  });
  const [_error, setError] = useState(null);
  const [quantityValidationError, setQuantityValidationError] = useState(null);
  const [fragrancesValidationError, setFragrancesValidationError] =
    useState(null);
  const [fragranceOptions, setFragranceOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // fetch fragrances data from API
  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fragrances");

        setFragranceOptions(
          response.data.map((fragrance) => ({
            value: fragrance.category,
            label: fragrance.category,
          }))
        );
      } catch (error) {
        setError("Failed to fetch fragrances");
      } finally {
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  function validateInputs({ fragrances, quantity }) {
    let isValid = true;

    // ensure exactly 3 fragrances are selected
    if (!fragrances || fragrances.length !== 3) {
      setFragrancesValidationError("Please select exactly 3 fragrances");
      isValid = false;
    } else {
      setFragrancesValidationError(null);
    }

    // ensure quantity is greater than 0
    if (!quantity || quantity < 1) {
      setQuantityValidationError("Quantity must be greater than 0");
      isValid = false;
    } else {
      setQuantityValidationError(null);
    }

    return isValid;
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { fragrances, quantity } = orderInputs;
    const isValid = validateInputs({ fragrances, quantity });

    // if inputs are valid, create order – validateInputs will display error messages
    if (isValid) {
      const response = await createOrder(orderInputs);
      // if response is successful, clear the form
      if (response?.data && response?.data?.create_item?.id) {
        setOrderSubmitted(true);
        setOrderInputs({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          fragrances: [],
          quantity: "",
          inscription: "",
        });
      }
    }
  }

  return (
    <Box className="max-w-lg w-full py-2 px-4 mt-12 mx-auto bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold py-4 text-gray-700">
        Order Request Form
      </h2>
      <form onSubmit={onSubmit}>
        <Flex direction={Flex.directions.COLUMN} gap={24} className="w-full">
          <Flex gap={16} className="w-full">
            <TextField
              placeholder="John"
              title="First Name *"
              value={orderInputs.firstName}
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, firstName: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.TEXT}
              required={true}
              requiredAsterisk={true}
            />
            <TextField
              placeholder="Doe"
              title="Last Name *"
              value={orderInputs.lastName}
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, lastName: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.TEXT}
              required={true}
              requiredAsterisk={true}
            />
          </Flex>
          <Flex gap={16} className="w-full">
            <TextField
              placeholder="john.doe@email.com"
              title="Email Address *"
              value={orderInputs.email}
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, email: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.EMAIL}
              required={true}
              requiredAsterisk={true}
            />
            <TextField
              placeholder="1234567890"
              title="Telephone *"
              value={orderInputs.phone}
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, phone: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.TEL}
              required={true}
              requiredAsterisk={true}
            />
          </Flex>
          <TextField
            placeholder="123 Candle St., Candle City, 12345"
            title="Shipping Address *"
            value={orderInputs.address}
            onChange={(value) =>
              setOrderInputs({ ...orderInputs, address: value })
            }
            size={TextField.sizes.MEDIUM}
            type={TextField.types.TEXT}
            required={true}
            requiredAsterisk={true}
          />
          <Flex gap={16} className="w-full">
            <div className="w-full">
              <section className="label-component--wrapper">
                <label className="label-component--text">Fragrances *</label>
              </section>
              <Dropdown
                placeholder={loading ? "Loading..." : "Choose fragrances"}
                options={fragranceOptions}
                multi
                multiline
                insideOverflowContainer={true}
                onChange={(value) =>
                  setOrderInputs({
                    ...orderInputs,
                    fragrances: value,
                  })
                }
              />
            </div>
            <TextField
              placeholder="0"
              title="Quantity *"
              value={orderInputs.quantity}
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, quantity: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.NUMBER}
              required={true}
              requiredAsterisk={true}
            />
          </Flex>
          <TextField
            placeholder="My Candle"
            title="Inscription (Optional)"
            value={orderInputs.inscription}
            onChange={(value) =>
              setOrderInputs({ ...orderInputs, inscription: value })
            }
            size={TextField.sizes.MEDIUM}
            type={TextField.types.TEXT}
            required={false}
            requiredAsterisk={false}
          />
          <Button type="submit" className="my-4">
            Start Order
          </Button>
        </Flex>
      </form>
      <Toast
        open={!!quantityValidationError}
        onClose={() => setQuantityValidationError(null)}
        type={Toast.types.NEGATIVE}
        className="max-w-fit"
      >
        {quantityValidationError}
      </Toast>
      <Toast
        open={!!fragrancesValidationError}
        onClose={() => setFragrancesValidationError(null)}
        type={Toast.types.NEGATIVE}
        className="max-w-fit"
      >
        {fragrancesValidationError}
      </Toast>
      <Toast
        open={orderSubmitted}
        autoHideDuration={5000}
        onClose={() => setOrderSubmitted(false)}
        type={Toast.types.POSITIVE}
        className="max-w-fit"
      >
        Order Submitted!
      </Toast>
    </Box>
  );
};

export default OrderForm;
