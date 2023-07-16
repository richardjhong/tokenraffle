import { Box, Stack, Text } from "@chakra-ui/react";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

const AdminWithdrawBalance = () => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useContractRead(contract, "getBalance");

  return (
    <Stack spacing={4}>
      <Box>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          Contract Balance:
        </Text>
        {!isLoadingContractBalance && (
          <Text>{ethers.utils.formatEther(contractBalance)} ETH</Text>
        )}
      </Box>
      <Web3Button
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={(contract) => contract.call("withdrawBalance")}
        isDisabled={true}
      >
        Withdraw Balance
      </Web3Button>
    </Stack>
  );
};

export default AdminWithdrawBalance;
