import { Card, Text } from "@chakra-ui/react";
import React from "react";

type RaffleStatusProps = {
  raffleStatus: boolean;
};

const RaffleStatus: React.FC<RaffleStatusProps> = ({ raffleStatus }) => {
  let backgroundColor = raffleStatus ? "green.200" : "red.200";
  let borderColor = raffleStatus ? "green.500" : "red.500";
  let textColor = raffleStatus ? "green.700" : "red.700";

  return (
    <Card
      py={2}
      textAlign={"center"}
      backgroundColor={backgroundColor}
      border={"1px solid"}
      borderColor={borderColor}
    >
      <Text
        fontSize={"sm"}
        color={textColor}
      >
        Raffle Status: {raffleStatus ? "Open" : "Closed"}
      </Text>
    </Card>
  );
};

export default RaffleStatus;
