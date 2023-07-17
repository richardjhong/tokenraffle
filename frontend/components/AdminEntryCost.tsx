import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";

const AdminEntryCost = () => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: entryCost, isLoading: isLoadingEntryCost } = useContractRead(
    contract,
    "entryCost",
  );

  const { data: raffleStatus } = useContractRead(contract, "raffleStatus");

  const [entryCostValue, setEntryCostValue] = useState<number>(0);

  const resetEntryCost = () => {
    setEntryCostValue(0);
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          Entry Cost:
        </Text>
        {!isLoadingEntryCost && (
          <Text>{ethers.utils.formatEther(entryCost)} ETH</Text>
        )}
      </Box>
      <Input
        type='number'
        value={entryCostValue}
        onChange={(e) => setEntryCostValue(parseFloat(e.target.value))}
      />
      <Web3Button
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={(contract) =>
          contract.call("changeEntryCost", [
            ethers.utils.parseEther(entryCostValue.toString()),
          ])
        }
        isDisabled={raffleStatus}
        onSuccess={resetEntryCost}
      >
        Update Entry Cost
      </Web3Button>
    </Stack>
  );
};

export default AdminEntryCost;
