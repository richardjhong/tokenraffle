import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatUnits } from "viem";

const AdminWithdrawBalance = () => {
  const {
    data: contractBalance,
    isError: contractBalanceError,
    isLoading: isLoadingContractBalance,
    refetch: refetchContractBalance,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "getBalance",
  });

  const { config: withdrawBalanceConfig } = usePrepareContractWrite({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "withdrawBalance",
    enabled: contractBalance !== BigInt(0),
  });

  const { data, write } = useContractWrite(withdrawBalanceConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

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
          <Text>{formatUnits(contractBalance as bigint, 18)} ETH</Text>
        )}
      </Box>
      <button
        onClick={async () => {
          await write?.();
          await refetchContractBalance();
        }}
        disabled={contractBalance == BigInt(0)}
      >
        {isLoading && "Withdrawing funds"}
        {!isLoading && "Withdraw Balance"}
      </button>
    </Stack>
  );
};

export default AdminWithdrawBalance;
