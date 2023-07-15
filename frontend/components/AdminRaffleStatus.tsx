import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import React, { useState } from "react";
import { Box, Card, Input, Stack, Text } from "@chakra-ui/react";
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
      {!raffleStatus ? (
        <Stack
          spacing={4}
          mt={4}
        >
          <Box>
            <Text>Prize Contract Address:</Text>
            <Input
              placeholder={"0x..."}
              type='text'
              value={nftContractAddress}
              onChange={(e) => setNftContractAddress(e.target.value)}
            />
          </Box>
          <Box>
            <Text>Prize Token ID:</Text>
            <Input
              placeholder={"0"}
              type='number'
              value={tokenId}
              onChange={(e) => setTokenId(parseInt(e.target.value))}
            />
          </Box>
          <Web3Button
            contractAddress={RAFFLE_CONTRACT_ADDRESS}
            action={(contract) =>
              contract.call("startRaffle", [nftContractAddress, tokenId])
            }
            onSuccess={reset}
          >
            Start Raffle
          </Web3Button>
        </Stack>
      ) : (
        <Stack mt={4}>
          <Web3Button
            contractAddress={RAFFLE_CONTRACT_ADDRESS}
            action={(contract) => contract.call("endRaffle")}
          >
            End Raffle
          </Web3Button>
        </Stack>
      )}
    </Card>
  );
};

export default AdminRaffleStatus;
