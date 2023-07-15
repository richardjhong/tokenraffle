import { Box, Card, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";

const PrizeNFT = () => {
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: prizeNFTContractAddress } = useContractRead(
    raffleContract,
    "nftAddress",
  );

  const { data: prizeNFTTokenId } = useContractRead(raffleContract, "nftId");

  const { contract: prizeNFTContract } = useContract(prizeNFTContractAddress);

  const {
    data: prizeNFTContractMetadata,
    isLoading: isLoadingPrizeNFTContractMetadata,
  } = useContractMetadata(prizeNFTContract);

  const { data: nft, isLoading: isLoadingNFT } = useNFT(
    prizeNFTContract,
    prizeNFTTokenId,
  );

  return (
    <Card p={"5%"}>
      <Heading>Prize NFT</Heading>
      {!isLoadingPrizeNFTContractMetadata && !isLoadingNFT ? (
        <Stack
          spacing={"20px"}
          textAlign={"center"}
        >
          <Box>
            <ThirdwebNftMedia
              metadata={nft?.metadata!}
              height='100%'
              width='100%'
            />
          </Box>
          <Box>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              {prizeNFTContractMetadata?.name
                ? prizeNFTContractMetadata.name
                : "NFT"}
            </Text>
            <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>
          </Box>
        </Stack>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default PrizeNFT;
