import React from "react";
import {
  Heading,
  Text,
  Center,
  Card,
  CardBody,
  Image,
  Button,
  Flex,
  Stack,
  Badge,
  Modal,
  ModalBody,
  useToast,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TimeIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useLoaderData, Link } from "react-router-dom";
import { EditComponent } from "./EditComponent";
import eventsData from "/events.json";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(
    `http://localhost:3000/categories?eventId=${params.eventId}`
  );
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories } = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = eventsData.users.find((user) => user.id === event.createdBy);

  const greeting = "Welcome @ WINC Event App";
  const text = "Check out our Event below..";

  const toast = useToast();

  const confirmBooking = () => {
    toast({
      title: "Confirm Booking.. Please wait..",
      description:
        "Thanks for booking with us! You will receive an invoice ASAP!",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="event-detail">
      <Flex
        justify="center"
        flexDir={["column"]}
        flexWrap="wrap"
        align="center"
      >
        <Heading
          size={"2xl"}
          color={"blue.400"}
          flexDir={["column", "row"]}
          align="center"
          w={["full", "100%"]}
          flexWrap="wrap"
          justify="center"
        >
          {greeting}
        </Heading>

        <Text align="center" color={"orange.300"} fontSize="4xl" mt={4} mb={14}>
          {text}
        </Text>

        <Center>
          <Link to={`/event/${event.id}`}></Link>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            borderRadius="xl"
            boxShadow="2xl"
            gap={0}
          >
            <Image
              src={event.image}
              objectFit="cover"
              maxW={{ base: "100%", sm: "350px" }}
              alt="Event Image"
            />

            <Image
              src={user ? user.image : "/events.json"}
              objectFit="cover"
              maxW={{ base: "100%", sm: "350px" }}
              alt="Event User"
            />

            <CardBody bgColor="gray.200" flexDir="column" align="center">
              <Heading size="xl" color="blue.400">
                <b>{event.title}</b>
              </Heading>
              <Text color="pink.300" fontSize="2xl">
                <b>{event.description}</b>
              </Text>

              <Stack mt="10" spacing="1">
                <Badge
                  borderRadius="xl"
                  px={3}
                  py={1}
                  color="white"
                  bg={"green.300"}
                >
                  Date:{" "}
                  {
                    new Date(event.startTime)
                      .toLocaleDateString("en-GB")
                      .split("T")[0]
                  }
                </Badge>
                <Badge
                  borderRadius="xl"
                  px={3}
                  py={1}
                  color="white"
                  bg={"pink.300"}
                >
                  <TimeIcon w={14} h={14} /> Start:{" "}
                  {event.startTime ? event.startTime.slice(11, 16) : ""}
                </Badge>
                <Badge
                  borderRadius="xl"
                  px={3}
                  py={1}
                  color="white"
                  bg={"blue.300"}
                >
                  <InfoOutlineIcon w={14} h={14} /> End:{" "}
                  {event.startTime ? event.endTime.slice(11, 16) : ""}
                </Badge>
                <Text
                  borderRadius="xl"
                  px={3}
                  py={0.5}
                  color="white"
                  bg={"red.300"}
                >
                  Location: <b>{event.location}</b>
                </Text>
                <Link to={`/event/${event.id}`}>
                  <Text
                    borderRadius="xl"
                    px={3}
                    py={0.5}
                    color="white"
                    bg={"purple.300"}
                  >
                    <b>Category:</b>{" "}
                    {event.categoryIds
                      .map((categoryId) => {
                        const category = categories.find(
                          (category) => category.id === categoryId
                        );
                        return category ? category.name : "";
                      })
                      .join(" & ")}
                  </Text>{" "}
                </Link>
                <Text
                  borderRadius="xl"
                  px={3}
                  py={1}
                  color="white"
                  bg={"yellow.400"}
                >
                  <b>Created By:</b>{" "}
                  {
                    eventsData.users.find((user) => user.id === event.createdBy)
                      .name
                  }
                </Text>
              </Stack>

              <Flex
                justify="center"
                flexDir={["column", "row"]}
                flexWrap="wrap"
                align="center"
                mt={6}
                gap={4}
              >
                <Button
                  variant="solid"
                  bgColor="orange.300"
                  color="white"
                  boxShadow="xl"
                >
                  <Link to={"/"}>
                    <b>Back to Events</b>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  color="green.400"
                  boxShadow="xl"
                  onClick={onOpen}
                >
                  <b>Book Event</b>
                </Button>
                <EditComponent
                  justify="center"
                  flexDir={["column", "row"]}
                  flexWrap="wrap"
                  align="center"
                  mt={6}
                />
              </Flex>

              <Modal size={["full", "md"]} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm your Event, please check..</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody
                    height={["full", "fit-content"]}
                    display="flex"
                    justify-content="center"
                    alignItems={["center", "flex-start"]}
                    flexDir="column"
                  >
                    <Text>1x {event.title}</Text>
                  </ModalBody>

                  <ModalFooter gap={14}>
                    <Button
                      bgColor="green.300"
                      color="white"
                      onClick={confirmBooking}
                    >
                      Confirm Your Booking
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel & Back To Event
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardBody>
          </Card>
        </Center>
      </Flex>
    </div>
  );
};
