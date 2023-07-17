import { Card, Flex, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";

type EntryCardProps = {
  walletAddress: string;
};

const EntryCard: React.FC<EntryCardProps> = ({ walletAddress }) => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: numberOfEntries, isLoading: isLoadingNumberOfEntries } =
    useContractRead(contract, "entryCount", [walletAddress]);

  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <Card
      p={8}
      mb={4}
    >
      {!isLoadingNumberOfEntries && (
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            border={"1px solid"}
            borderRadius={"6px"}
          >
            {truncateAddress(walletAddress)}
          </Text>
          <Text>Entries: {numberOfEntries.toNumber()}</Text>
        </Flex>
      )}
    </Card>
  );
};

export default EntryCard;
