import { useContract, useContractRead } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { Container } from "@chakra-ui/react";
import EntryCard from "./EntryCard";

const CurrentEntries = () => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS);

  const { data: currentEntries, isLoading: isLoadingCurrentEntries } =
    useContractRead(contract, "getPlayers");
  return (
    <Container py={8}>
      {!isLoadingCurrentEntries &&
        currentEntries.map((entry: string, index: number) => (
          <EntryCard
            key={index}
            walletAddress={entry}
          />
        ))}
    </Container>
  );
};

export default CurrentEntries;
