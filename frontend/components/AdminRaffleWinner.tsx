import { Box, Card, Text } from "@chakra-ui/react";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import AdminTransferNFT from "./AdminTransferNFT";
import { useContractRead } from "wagmi";

const AdminRaffleWinner = () => {
  const {
    data: prizeNFTContractAddress,
    isError: prizeNFTContractError,
    isLoading: isLoadingPrizeNFTContract,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "nftAddress",
  });

  const {
    data: prizeNFTTokenId,
    isError: prizeNFTTokenIdError,
    isLoading: isLoadingPrizeNFTTokenId,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "nftId",
  });

  return (
    <Card p={4}>
      <Text
        fontSize={"xl"}
        fontWeight={"bold"}
      >
        Raffle Winner
      </Text>
      {prizeNFTContractAddress ===
      "0x0000000000000000000000000000000000000000" ? (
        <Box>
          <Text>No prize NFT set</Text>
          <Text>
            Please start a new raffle and select the NFT that will be raffled
            off.
          </Text>
        </Box>
      ) : (
        <AdminTransferNFT
          nftContractAddress={prizeNFTContractAddress as string}
          tokenId={prizeNFTTokenId?.toString() as string}
        />
      )}
    </Card>
  );
};

export default AdminRaffleWinner;
