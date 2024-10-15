import { useState } from "react";
import {
  Heading,
  Text,
  Center,
  Card,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const FormPage = () => {
  const [events, setEvents] = useState([
    { myevent: "Playing Mini-Golf & Eating Hamburgers" },
  ]);

  // For storing in Local Storage in dev tools
  const [name, setName] = useLocalStorage("Your Added Name:"); 
  // const [ name, setName ] = useState("");   // empty string
  // For storing in Local Storage in dev tools
  // const [ event, setEvent ] = useLocalStorage('Your Added Event:'); 
  // const [ event, setEvent ] = useState(""); // empty string

  const greeting = "Welcome @ WINC New Event App";
  const text = "Please add Your New Event below..";

  const [formData /* , setFormData */] = useLocalStorage({
    //event: '',
    name: "",
  });

  const addEvent = (event) => {
    event.preventDefault();

    setEvents((event) => [{ event, name }, ...event]);
    setName("");
  };

  const toast = useToast();

  const addingEvent = () => {
    toast({
      title: "Event Added..",
      description: "Adding Event Succesfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteEvent = () => {
    if (window.confirm("Sure you want to delete this event?")) {
      try {
        toast({
          title: "Event Deleted..",
          description: "Event deleted successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Delete Failed..",
          description: "Failed to delete event. Please try again!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  // console.log(event); // Log outcome in console..
  // console.log(name);  // Log outcome in console..
  // console.log(email);  // Log outcome in console..
  // console.log(info);  // Log outcome in console..

  return (
    <div className="new-event">
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

        <Center borderRadius="xl" boxShadow="2xl">
          <Card
            direction={{ base: "column", sm: "column" }}
            overflow="hidden"
            variant="outline"
            borderRadius="xl"
            boxShadow="2xl"
            gap={2}
            bgImage="/src/components/balloons.jpeg"
          >
            <form onSubmit={addEvent}>
              <br /> {/* Input veld hier */}
              <textarea
                type="text"
                name="event"
                placeholder=" Please Provide Your New Event:"
                value={formData.name}
                onChange={(name) => setName(name.target.value)}
                cols={71}
                rows={2}
              ></textarea>
              <Flex
                flexDir={["column", "row"]}
                flexWrap="wrap"
                justify="center"
                align="center"
                gap={10}
                m={6}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  color="blue.400"
                  boxShadow="xl"
                  onClick={addingEvent}
                >
                  <b>Add Event</b>
                </Button>
                <Button
                  type="reset"
                  variant="ghost"
                  color="red.400"
                  boxShadow="xl"
                  value="Reset New Event"
                  onClick={deleteEvent}
                >
                  <b>Change Event..</b>
                </Button>
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
              </Flex>
            </form>

            <h2>
              <b>New Event Added by last user:</b>
            </h2>
            {events.map((event) => {
              return (
                <div className="event" key={event.myevent}>
                  <p> {event.myevent}</p>
                  <span> {event.name}</span>
                  <hr />
                </div>
              );
            })}
          </Card>
        </Center>
      </Flex>
    </div>
  );
};
