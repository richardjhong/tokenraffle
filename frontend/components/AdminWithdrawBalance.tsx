import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatUnits } from "viem";

const AdminWithdrawBalance = () => {
  const [emptyBalance, setEmptyBalance] = useState<boolean>(false);

  const {
    data: contractBalance,
    isError: contractBalanceError,
    isLoading: isLoadingContractBalance,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "getBalance",
    watch: true,
  });

  const { config: withdrawBalanceConfig } = usePrepareContractWrite({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "withdrawBalance",
    enabled: !emptyBalance,
  });

  const { data, write } = useContractWrite(withdrawBalanceConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    contractBalance === BigInt(0)
      ? setEmptyBalance(true)
      : setEmptyBalance(false);
  }, [contractBalance]);

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
        onClick={() => write?.()}
        disabled={emptyBalance}
      >
        {isLoading && "Withdrawing funds"}
        {!isLoading && "Withdraw Balance"}
      </button>
    </Stack>
  );
};

export default AdminWithdrawBalance;
