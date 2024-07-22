import React, { useMemo, useState } from "react";
import { Box, Flex, TextField, Dropdown, Button } from "monday-ui-react-core";

const OrderForm = () => {
  const [orderInputs, setOrderInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fragrances: null,
    quantity: null,
  });

  const fragrances = useMemo(
    () => [
      {
        value: "Rotem",
        label: "Rotem Dekel",
      },
      {
        value: "Hadas",
        label: "Hadas Farhi",
      },
      {
        value: "Netta",
        label: "Netta Muller",
      },
      {
        value: "Dor",
        label: "Dor Yehuda",
      },
    ],
    []
  );

  console.log(orderInputs);

  return (
    <Box
      className="max-w-lg w-full p-2 mt-12 mx-auto"
      backgroundColor={Box.backgroundColors.GREY_BACKGROUND_COLOR}
    >
      <form>
        <Flex direction={Flex.directions.COLUMN} gap={24} className="w-full">
          <Flex gap={16} className="w-full">
            <TextField
              placeholder="John"
              title="First Name"
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
              title="Last Name"
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
              title="Email Address"
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
              title="Telephone"
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, phone: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.TEL}
              required={true}
              requiredAsterisk={true}
            />
          </Flex>
          <Flex gap={16} className="w-full">
            <div className="w-full">
              <section className="label-component--wrapper">
                <label className="label-component--text">Fragrances</label>
              </section>
              <Dropdown
                placeholder="Choose fragrances"
                options={fragrances}
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
              title="Quantity"
              onChange={(value) =>
                setOrderInputs({ ...orderInputs, quantity: value })
              }
              size={TextField.sizes.MEDIUM}
              type={TextField.types.NUMBER}
              required={true}
              requiredAsterisk={true}
            />
          </Flex>
          <Button type="submit" className="my-4">
            Start Order
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default OrderForm;
