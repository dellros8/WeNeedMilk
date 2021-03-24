import React, { useEffect, useState } from "react";
import { Button, Input, Text, Icon, Card } from "react-native-elements";

const ShoppingListItem = ({ itemName, created }) => {
  return (
    <Card containerStyle={{padding: 0}}>
        <Card.Title>{itemName}</Card.Title>
    </Card>
  );
};

export default ShoppingListItem;
