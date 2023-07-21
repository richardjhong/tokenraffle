import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react/evm";
import { Sepolia } from "@thirdweb-dev/chains";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Providers from "../providers/Providers";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Sepolia;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <Providers>
          <Navbar />
          <Component {...pageProps} />
        </Providers>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
