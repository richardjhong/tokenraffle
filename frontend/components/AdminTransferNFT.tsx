import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";

type TransferNFTProps = {
  nftContractAddress: string;
  tokenId: string;
};

const AdminTransferNFT: React.FC<TransferNFTProps> = ({
  nftContractAddress,
  tokenId,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [randomSelectionReady, setRandomSelectionReady] =
    useState<boolean>(false);
  const [winnerSelectionReady, setWinnerSelectionReady] =
    useState<boolean>(false);

  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const {
    data: raffleStatus,
    isError: raffleStatusError,
    isLoading: isLoadingRaffleStatus,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "raffleStatus",
    watch: true,
  });

  const {
    data: currentRafflePlayers,
    isError: currentRafflePlayersError,
    isLoading: isLoadingCurrentRafflePlayers,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "getPlayers",
  });

  useEffect(() => {
    if (raffleStatus && (currentRafflePlayers as Array<any>).length > 0)
      setRandomSelectionReady(true);
  }, [raffleStatus, currentRafflePlayers]);

  const { contract: prizeNFTContract } = useContract(nftContractAddress);

  const { data: prizeNFTContractMetadata } =
    useContractMetadata(prizeNFTContract);

  const { data: nft, isLoading: isLoadingNFT } = useNFT(
    prizeNFTContract,
    tokenId,
  );

  const { config: selectWinnerConfig } = usePrepareContractWrite({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "selectWinner",
    enabled: winnerSelectionReady,
  });

  const { data, write } = useContractWrite(selectWinnerConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const unwatch = useContractEvent({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    eventName: "RequestFulfilled",
    listener: (log) => {
      setWinnerSelectionReady(true);
    },
  });

  useEffect(() => {
    setMounted(true);

    return () => {
      unwatch?.();
    };
  }, [unwatch]);

  if (!mounted) return <></>;

  return (
    <Box>
      <Flex
        flexDirection={"row"}
        my={10}
        alignItems={"center"}
      >
        {!isLoadingNFT && <ThirdwebNftMedia metadata={nft?.metadata!} />}
        <Box ml={4}>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
          >
            {prizeNFTContractMetadata?.name || "Placeholder name"}
          </Text>
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
          >
            {nft?.metadata.name || "Placeholder metadata name"}
          </Text>
        </Box>
      </Flex>
      <Web3Button
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={async () => {
          await raffleContract?.call("requestRandomWords");
        }}
        isDisabled={raffleStatus as boolean}
      >
        Randomize Winner
      </Web3Button>
      <button
        onClick={() => {
          write?.();
          setWinnerSelectionReady(false);
        }}
      >
        {isLoading && "Selecting..."}
        {!isLoading && "Select Winner"}
      </button>
    </Box>
  );
};

export default AdminTransferNFT;
