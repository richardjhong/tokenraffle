import { NextPage } from "next";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { HERO_IMAGE_URL, LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import LotteryStatus from "../components/LotteryStatus";

const Home: NextPage = () => {
  const { contract } = useContract(LOTTERY_CONTRACT_ADDRESS);

  const { data: entryCost, isLoading: isLoadingEntryCost } = useContractRead(
    contract,
    "entryCost",
  );

  const entryCostInEther = entryCost
    ? ethers.utils.formatEther(entryCost)
    : "0";

  const { data: raffleStatus } = useContractRead(contract, "raffleStatus");

  return (
    <Container
      maxW={"1440px"}
      py={8}
    >
      <SimpleGrid
        columns={2}
        spacing={10}
        minH={"60vh"}
      >
        <Flex>
          <MediaRenderer
            src={HERO_IMAGE_URL}
            width='100%'
            height='100%'
          />
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          p={"5%"}
        >
          <Stack spacing={10}>
            <Box>
              <Text fontSize={"xl"}>Raffle App</Text>
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
              >
                Buy a ticket to win the NFT Prize
              </Text>
            </Box>
            <Text fontSize={"xl"}>
              Buy entries for a chance to win the NFT! The NFT will be
              transferred to the winner&apos;s address. The more entries you
              buy, the higher the chance you have of winning the prize!
            </Text>

            <LotteryStatus raffleStatus={raffleStatus} />
            {!isLoadingEntryCost && (
              <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                Cost Per Entry: {entryCostInEther} ETH
              </Text>
            )}
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
