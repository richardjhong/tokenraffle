import { useState, useEffect } from "react";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther, formatUnits } from "viem";
import { useDebounce } from "../utils/useDebounce";

const AdminEntryCost = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const {
    data: entryCost,
    isError: entryCostError,
    isLoading: isLoadingEntryCost,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "entryCost",
    watch: true,
  });

  const {
    data: raffleStatus,
    isError: raffleStatusError,
    isLoading: isLoadingRaffleStatus,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "raffleStatus",
  });

  const [entryCostValue, setEntryCostValue] = useState<number>(0);
  const debouncedEntryCostValue = useDebounce(entryCostValue, 500);

  const resetEntryCost = () => {
    setEntryCostValue(0);
  };

  const { config: changeEntryCostConfig } = usePrepareContractWrite({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "changeEntryCost",
    args: [parseEther(debouncedEntryCostValue.toString())],
    enabled: Boolean(debouncedEntryCostValue),
  });

  const { data, write } = useContractWrite(changeEntryCostConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

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
          <Text>{formatUnits(entryCost as bigint, 18)} ETH</Text>
        )}
      </Box>
      <Input
        type='number'
        value={entryCostValue}
        onChange={(e) => setEntryCostValue(parseFloat(e.target.value))}
      />
      <button
        onClick={() => {
          write?.();
        }}
        disabled={(raffleStatus as boolean) || !write}
      >
        {isLoading && "Updating..."}
        {!isLoading && "Update Entry Cost"}
      </button>
    </Stack>
  );
};

export default AdminEntryCost;
