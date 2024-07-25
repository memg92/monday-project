import mondaySdk from "monday-sdk-js";

export async function createOrder(orderInputs) {
  const monday = mondaySdk();
  monday.setToken(process.env.REACT_APP_MONDAY_API_TOKEN);

  const columnValueParams = {
    text: orderInputs.firstName,
    text6: orderInputs.lastName,
    text5: orderInputs.inscription,
    email: { email: orderInputs.email, text: orderInputs.email },
    phone: orderInputs.phone,
    client_shipping_address__1: orderInputs.address,
    numbers: orderInputs.quantity,
    dropdown__1: {
      labels: orderInputs.fragrances.map((fragrance) => fragrance.label),
    },
  };

  try {
    const response = await monday.api(
      `mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item (board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }`,
      {
        variables: {
          boardId: Number(process.env.REACT_APP_PRODUCTION_BOARD),
          itemName: `${orderInputs.firstName} ${orderInputs.lastName}`,
          columnValues: JSON.stringify(columnValueParams),
          // create new labels if they don't exist
          create_labels_if_missing: true,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
