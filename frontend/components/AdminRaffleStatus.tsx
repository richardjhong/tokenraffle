import { useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import React, { useState } from "react";
import { Card, Text } from "@chakra-ui/react";
import RaffleStatus from "./RaffleStatus";

const AdminRaffleStatus = () => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);
  const { data: raffleStatus } = useContractRead(contract, "raffleStatus");

  const [nftContractAddress, setNftContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<number>(0);

  const reset = () => {
    setNftContractAddress("");
    setTokenId(0);
  };

  return (
    <Card
      p={4}
      mt={4}
      mr={10}
      w={"25%"}
    >
      <Text
        fontWeight={"bold"}
        mb={4}
        fontSize={"xl"}
      >
        Raffle Status:
      </Text>
      <RaffleStatus raffleStatus={raffleStatus} />
    </Card>
  );
};

export default AdminRaffleStatus;
