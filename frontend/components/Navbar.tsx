import { Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import { Web3Button } from "@web3modal/react";
import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

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
          {!isLoading && ownerAddress == address && (
            <Link href={"/admin"}>
              <Text mr={4}>Admin</Text>
            </Link>
          )}
          <Web3Button />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
