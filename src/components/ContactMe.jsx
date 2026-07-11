import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

function ContactMe() {
  const headingColor = useColorModeValue("#1A202C", "#ECEEF3");
  const bodyColor = useColorModeValue("#4A5568", "#ACB2C9");
  const labelColor = useColorModeValue("#1A202C", "#ECEEF3");
  const panelBg = useColorModeValue("#FFFFFF", "#1A202C");
  const borderColor = useColorModeValue("#E2E8F0", "#2D3748");
  const inputBg = useColorModeValue("#F7FAFC", "#232A3A");
  const inputColor = useColorModeValue("#1A202C", "#ECEEF3");
  const placeholderColor = useColorModeValue("#718096", "#ACB2C9");

  return (
    <Box as="section" py={16} px={4}>
      <Container maxW="container.md">
        <Box
          borderWidth="1px"
          borderColor={borderColor}
          bg={panelBg}
          rounded="3xl"
          p={{ base: 6, md: 10 }}
          shadow="xl"
        >
          <Heading as="h2" size="2xl" textAlign="center" color={headingColor}>
            Contact Me
          </Heading>
          <Text
            mt={4}
            mb={10}
            textAlign="center"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="light"
            color={bodyColor}
          >
            Got a technical issue? Want to talk about a certain anime? Collaborate
            on your next project? Let me know.
          </Text>
          <Box as="form" action="https://formspree.io/f/xnqenrvl" method="POST">
            <FormControl mb={8} isRequired>
              <FormLabel color={labelColor}>Your email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@gmail.com"
                bg={inputBg}
                color={inputColor}
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
                _focusVisible={{ borderColor: "#64FFDA", boxShadow: "0 0 0 1px #64FFDA" }}
              />
            </FormControl>
            <FormControl mb={8} isRequired>
              <FormLabel color={labelColor}>Subject</FormLabel>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Let us know how we can help you"
                bg={inputBg}
                color={inputColor}
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
                _focusVisible={{ borderColor: "#64FFDA", boxShadow: "0 0 0 1px #64FFDA" }}
              />
            </FormControl>
            <FormControl mb={8} isRequired>
              <FormLabel color={labelColor}>Your message</FormLabel>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Leave a comment..."
                bg={inputBg}
                color={inputColor}
                borderColor={borderColor}
                _placeholder={{ color: placeholderColor }}
                _focusVisible={{ borderColor: "#64FFDA", boxShadow: "0 0 0 1px #64FFDA" }}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="lg">
              Send message
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactMe;
