import { RAFFLE_CONTRACT_ADDRESS, TOKENRAFFLE_CONTRACT_ABI } from "../const";
import { Container } from "@chakra-ui/react";
import EntryCard from "./EntryCard";
import { useContractRead } from "wagmi";
import { useEffect } from "react";

const CurrentEntries = () => {
  const {
    data: currentEntries,
    isError: currentEntriesError,
    isLoading: isLoadingCurrentEntries,
  } = useContractRead({
    address: RAFFLE_CONTRACT_ADDRESS,
    abi: TOKENRAFFLE_CONTRACT_ABI,
    functionName: "getPlayers",
    watch: true,
  });

  return (
    <Container py={8}>
      {!isLoadingCurrentEntries ? (
        Array.isArray(currentEntries) ? (
          currentEntries.map((entry: string, index: number) => (
            <EntryCard
              key={index}
              walletAddress={entry}
            />
          ))
        ) : (
          <p>No entries found.</p>
        )
      ) : (
        <p>Loading entries...</p>
      )}
    </Container>
  );
};

export default CurrentEntries;
