import { Box, Card, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import AdminTransferNFT from "./AdminTransferNFT";

const AdminRaffleWinner = () => {
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: prizeNFTContractAddress } = useContractRead(
    raffleContract,
    "nftAddress",
  );

  const { data: prizeNFTTokenId } = useContractRead(raffleContract, "nftId");

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
          nftContractAddress={prizeNFTContractAddress}
          tokenId={prizeNFTTokenId}
        />
      )}
    </Card>
  );
};

export default AdminRaffleWinner;
