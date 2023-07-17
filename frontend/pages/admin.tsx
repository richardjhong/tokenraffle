import { Card, Container, Divider, Flex, Heading } from "@chakra-ui/react";
import {
  AdminRaffleStatus,
  AdminEntryCost,
  AdminWithdrawBalance,
  AdminRaffleWinner,
} from "../components/";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();

  const address = useAddress();

  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: owner, isLoading: isLoadingOwner } = useContractRead(
    contract,
    "owner",
  );

  useEffect(() => {
    if (!isLoadingOwner && owner != address) router.push("/");
  }, [address, owner, isLoadingOwner, router]);

  return (
    <Container
      maxW={"1440px"}
      py={8}
    >
      <Heading>Admin</Heading>
      <Flex flexDirection={"row"}>
        <AdminRaffleStatus />
        <Card
          p={4}
          mt={4}
          mr={10}
          w={"25%"}
        >
          <AdminEntryCost />
          <Divider mt={4} />
          <AdminWithdrawBalance />
        </Card>
        <AdminRaffleWinner />
      </Flex>
    </Container>
  );
};

export default Admin;
