import React from "react";
import { useState } from "react";
import {
  Center,
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Input,
  Image,
  Text,
  Select,
  Stack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { TimeIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { events, categories } = useLoaderData();
  const greeting = "Welcome @ WINC Events App";
  const text = "Check out our List of events below..";

  const matchedEvents = events.filter((event) => {
    const matchesSearch =
      event.title &&
      event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      (event.categoryIds &&
        event.categoryIds.includes(parseInt(selectedCategory)));
    return matchesSearch && matchesCategory;
  });

  // console.log(matchedEvents);

  const toast = useToast();

  const openEvent = () => {
    if (window.confirm("Are you sure you want to check out this event?")) {
      try {
        toast({
          title: "Your Chosen Event..",
          description: "Have fun checking it out!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // navigate("/");
      } catch (error) {
        toast({
          title: "Checking Event Failed..",
          description: "Failed to check event. Please try again!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="event-list">
      <Flex
        justify="center"
        flexDir={["column", "row"]}
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

        <Text align="center" color={"orange.300"} fontSize="4xl" mt={6} mb={20}>
          {text}
        </Text>

        {/* Event Search */}
        <Input
          type="text"
          placeholder="Search Event on Name.."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          h={12}
          w={["full", "25%"]}
          variant="filled"
          opacity="70%"
          ml={8}
          mb={12}
          pl={2}
          color="black"
          borderRadius={"8"}
          bgColor="green.100"
          boxShadow="xl"
        />
        {/*  Category Filter */}
        <Select
          type="select"
          placeholder="Filter Event on Category.."
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          h={12}
          w={["full", "25%"]}
          variant="filled"
          opacity="70%"
          ml={4}
          mb={12}
          pl={10}
          color="black"
          borderRadius={"8"}
          bgColor="red.100"
          boxShadow="xl"
        >
          <option value="">All events..</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Center>
          <Card
            opacity="100%"
            borderRadius="xl"
            variant="outline"
            boxShadow="2xl"
            bgImage="/src/components/balloons.jpeg" // onClick={() => clickFn(events)}
            display="flex"
            flexWrap="wrap"
            flexDir={["column", "row"]}
            cursor="pointer"
            _hover={{ transform: "scale(1.01)" }}
            mt={-10}
            justify="space-evenly"
            alignItems="center"
            background-position="center"
            background-repeat="no-repeat"
            background-size="cover"
            gap={10}
            pl={10}
            pr={10}
          >
            {/* Rendering: events from the matchedEvents array.. */}
            {matchedEvents.map((event) => (
              <div key={event.id} className="events">
                <Link to={`event/${event.id}`}>
                  <Image
                    borderRadius="xl"
                    borderBottomLeftRadius="0"
                    borderBottomRightRadius="0"
                    mt={10}
                    h={56}
                    w="100%"
                    src={event.image}
                    objectFit="cover"
                    boxShadow="2xl"
                    alt="Events Images"
                  />

                  <CardBody
                    bgColor="gray.200"
                    borderRadius="xl"
                    borderTopLeftRadius="0"
                    borderTopRightRadius="0"
                    align="center"
                    boxShadow="2xl"
                    mb={10}
                  >
                    <Heading size="md" color="blue.400">
                      <b>{event.title}</b>
                    </Heading>
                    <Text py="4" color="pink.300">
                      <b>{event.description}</b>
                    </Text>

                    <Stack mt="0" spacing="1">
                      <Badge
                        borderRadius="md"
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
                      </Badge>{" "}
                      {/* Format only Date objects to ISO format (yyyy-MM-dd) */}
                      <Badge
                        borderRadius="md"
                        px={3}
                        py={1}
                        color="white"
                        bg={"pink.300"}
                      >
                        <TimeIcon w={14} h={14} /> Start:{" "}
                        {event.startTime ? event.startTime.slice(11, 16) : ""}
                      </Badge>{" "}
                      {/* Format both Date objects to ISO format (yyyy-MM-dd) */}
                      {/* OR: {new Date(event.startTime).toISOString().slice(11,16)} */}
                      <Badge
                        borderRadius="md"
                        px={3}
                        py={1}
                        color="white"
                        bg={"blue.300"}
                      >
                        <InfoOutlineIcon w={14} h={14} /> End:{" "}
                        {event.startTime ? event.endTime.slice(11, 16) : ""}
                      </Badge>{" "}
                      {/* Format both Date objects to ISO format (yyyy-MM-dd) */}
                      {/*OR: {new Date(event.endTime).toISOString().slice(11,16)} */}
                      <Link to={`/event/${event.id}`}>
                        <Text
                          borderRadius="md"
                          px={3}
                          py={0.5}
                          color="white"
                          bg={"purple.300"}
                        >
                          <b>Category:</b>{" "}
                          {event.categoryIds
                            .map((categoryId) => {
                              const category = categories.find(
                                (cat) => cat.id === categoryId
                              );
                              return category ? category.name : "";
                            })
                            .join(" & ")}
                        </Text>{" "}
                      </Link>
                    </Stack>

                    <Flex
                      justify="center"
                      flexDir={["column", "row"]}
                      flexWrap="wrap"
                      align="center"
                      mt={8}
                      gap={6}
                    >
                      <Button
                        variant="solid"
                        bgColor="orange.300"
                        color="white"
                        size="md"
                        boxShadow="xl"
                        onClick={openEvent}
                      >
                        Check: {event.title}
                      </Button>
                      <Button variant="ghost" color="blue.400" boxShadow="xl">
                        <Link to={"/form/:new"}>
                          <b>Add Event</b>
                        </Link>
                      </Button>
                    </Flex>
                  </CardBody>
                </Link>
              </div>
            ))}
          </Card>
        </Center>
      </Flex>
      <Text align="center" color={"green.300"} fontSize="4xl" mt={5}>
        Thanks for checking out all events & Please feel free to book one of the
        programs
      </Text>
    </div>
  );
};
