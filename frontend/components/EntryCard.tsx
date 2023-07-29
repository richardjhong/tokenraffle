import { Card, Flex, Text } from "@chakra-ui/react";
// import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { useContractRead } from "wagmi";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";

type EntryCardProps = {
  walletAddress: string;
};

const EntryCard: React.FC<EntryCardProps> = ({ walletAddress }) => {
  const {
    data: numberOfEntries,
    isError: numberOfEntriesError,
    isLoading: isLoadingNumberOfEntries,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "entryCount",
    args: [walletAddress as `0x${string}`],
  });

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
          <Text>Entries: {Number(numberOfEntries)}</Text>
        </Flex>
      )}
    </Card>
  );
};

export default EntryCard;
