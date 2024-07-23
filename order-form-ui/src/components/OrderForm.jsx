import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, TextField, Dropdown, Button } from "monday-ui-react-core";

const OrderForm = () => {
  const [orderInputs, setOrderInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    fragrances: null,
    quantity: null,
    inscription: "",
  });
  const [error, setError] = useState(null);
  const [fragranceOptions, setFragranceOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return (
    <Box
      className="max-w-lg w-full p-2 mt-12 mx-auto"
      backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}
    >
      <h2 className="text-lg font-bold py-4 text-gray-700">
        Order Request Form
      </h2>
      <form>
        <Flex direction={Flex.directions.COLUMN} gap={24} className="w-full">
          <Flex gap={16} className="w-full">
            <TextField
              placeholder="John"
              title="First Name *"
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
    </Box>
  );
};

export default OrderForm;
