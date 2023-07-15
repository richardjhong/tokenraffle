import { Container, Flex, Text } from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";

const Navbar = () => {
  const address = useAddress();

  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: owner, isLoading: isLoadingOwner } = useContractRead(
    contract,
    "owner",
  );

  return (
    <Container
      maxW={"1440px"}
      py={8}
    >
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Text>RAFFLE APP</Text>
        </Link>
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
        >
          {!isLoadingOwner && owner == address && (
            <Link href={"/admin"}>
              <Text mr={4}>Admin</Text>
            </Link>
          )}
          <ConnectWallet />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
