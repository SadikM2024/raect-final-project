import { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { useLocalStorage } from "./useLocalStorage";

export const EditComponent = () => {
  const [event, setEvent] = useLocalStorage("Your Edited Event:");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  // console.log(event)

  const toast = useToast();

  const savingEvent = () => {
    setEvent("");

    toast({
      title: "Saving Event..",
      description: "Event will be saved now!",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteEvent = () => {
    if (window.confirm("Sure you want to delete this event?")) {
      try {
        setEvent("");

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

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            <b>Edit Event:</b>{" "}
            <input
              type="text"
              value={event}
              onChange={(event) => setEvent(event.target.value)}
            ></input>
          </label>
          <br />
          <Flex
            flexDir={["column", "row"]}
            flexWrap="wrap"
            justify="center"
            align="center"
            gap={4}
            mt={4}
            mb={4}
          >
            <Button
              type="submit"
              variant="ghost"
              color="blue.400"
              boxShadow="xl"
              value={event}
              onClick={savingEvent}
            >
              <b>Save & Close</b>
            </Button>
            <Button
              type="reset"
              variant="ghost"
              color="red.400"
              boxShadow="xl"
              value="Reset New Event"
              onClick={deleteEvent}
            >
              <b>Delete Input</b>
            </Button>
          </Flex>
        </form>
      ) : (
        <div>
          <Button
            onClick={handleEdit}
            variant="ghost"
            color="blue.400"
            boxShadow="xl"
          >
            <b>Edit Event</b>
          </Button>
        </div>
      )}
    </div>
  );
};
