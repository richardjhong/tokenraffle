import { Container, Flex, Heading } from "@chakra-ui/react";
import AdminRaffleStatus from "../components/AdminRaffleStatus";

const Admin = () => {
  return (
    <Container
      maxW={"1440px"}
      py={8}
    >
      <Heading>Admin</Heading>
      <Flex flexDirection={"row"}>
        <AdminRaffleStatus />
      </Flex>
    </Container>
  );
};

export default Admin;
