import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import React from "react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { Box, Flex, Text } from "@chakra-ui/react";

type TransferNFTProps = {
  nftContractAddress: string;
  tokenId: string;
};

const AdminTransferNFT: React.FC<TransferNFTProps> = ({
  nftContractAddress,
  tokenId,
}) => {
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: raffleStatus } = useContractRead(
    raffleContract,
    "raffleStatus",
  );

  const { contract: prizeNFTContract } = useContract(
    nftContractAddress,
    "nft-drop",
  );

  const { data: prizeNFTContractMetadata } =
    useContractMetadata(prizeNFTContract);

  const { data: nft, isLoading: isLoadingNFT } = useNFT(
    prizeNFTContract,
    tokenId,
  );

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
          await prizeNFTContract?.setApprovalForToken(
            RAFFLE_CONTRACT_ADDRESS,
            tokenId,
          );

          await raffleContract?.call("selectWinner");
        }}
        isDisabled={!raffleStatus}
      >
        Select Winner
      </Web3Button>
    </Box>
  );
};

export default AdminTransferNFT;