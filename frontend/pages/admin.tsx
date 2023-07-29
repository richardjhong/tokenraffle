import { Card, Container, Divider, Flex, Heading } from "@chakra-ui/react";
import {
  AdminRaffleStatus,
  AdminEntryCost,
  AdminWithdrawBalance,
  AdminRaffleWinner,
} from "../components/";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { TOKENRAFFLE_CONTRACT_ABI } from "../const";

const Admin = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState<boolean>(false);

  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: ownerAddress,
    isError,
    isLoading,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "owner",
  });

  useEffect(() => {
    if (!isLoading && ownerAddress != address) router.push("/");
  }, [address, ownerAddress, isLoading, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

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
