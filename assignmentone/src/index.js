import react from "react";
import { useState, useEffect } from "react";
import reactdom from "react-dom";
import {
  ChakraProvider,
  Center,
  Heading,
  Text,
  Link,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";

function App() {
  const board = [
    [1, 0, 8],
    [3, 7, 4],
    [6, 2, 5],
  ];
  const [top, settop] = useState(false);
  const [right, setright] = useState(false);
  const [left, setleft] = useState(false);
  const [bottom, setbottom] = useState(false);
  const [nearzero, setnearzero] = useState(false);
  const [zerodir, setzerodir] = useState("nowhere");
  const [boardstate, setboardstate] = useState(board);
  const [inputindex, setinputindex] = useState(0);
  const [inputsubindex, setinputsubindex] = useState(0);

  useEffect(() => {});
  function handleClick(index, sindex) {
    setright(false);
    setleft(false);
    setbottom(false);
    settop(false);
    setnearzero(false);
    setzerodir("nowhere");
    setinputindex(index);
    setinputsubindex(sindex);
    var value = boardstate[index][sindex];
    console.log("Index: " + index + "\nSub Index: " + sindex);

    if (index === 0) {
      setleft(true);
      console.log("I am left");
      if (boardstate[index + 1][sindex] === 0) {
        console.log("I am left to a zero");
        setnearzero(true);
        setzerodir("left");
      }
      if (sindex === 0) {
        settop(true);
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
        console.log("I am top");
      } else if (sindex === 2) {
        setbottom(true);
        console.log("I am bottom");

        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      } else {
        console.log("I am vertially middle");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      }
    } else if (index === 2) {
      setright(true);
      console.log("I am right");
      if (boardstate[index - 1][sindex] === 0) {
        console.log("I am right to a zero");
        setnearzero(true);
        setzerodir("right");
      }
      if (sindex === 0) {
        settop(true);
        console.log("I am top");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
      } else if (sindex === 2) {
        setbottom(true);
        console.log("I am bottom");
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      } else {
        console.log("I am vertially middle");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      }
    } else {
      console.log("I am horizontally middle");

      if (boardstate[index + 1][sindex] === 0) {
        console.log("I am left to a zero");
        setnearzero(true);
        setzerodir("left");
      }
      if (boardstate[index - 1][sindex] === 0) {
        console.log("I am right to a zero");
        setnearzero(true);
        setzerodir("right");
      }

      if (sindex === 0) {
        settop(true);
        console.log("I am top");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
      } else if (sindex === 2) {
        setbottom(true);
        console.log("I am bottom");
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      } else {
        console.log("I am vertially middle");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
          setzerodir("below");
        }
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
          setzerodir("above");
        }
      }
    }

    if (nearzero) {
      console.log("I shall move");
      if (zerodir === "above") {
        console.log("up");
        if (left) {
          var temp = boardstate[index];
          console.log(temp);
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
        if (right) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
      } else if (zerodir === "below") {
        console.log("down");
        if (left) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
        if (right) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
      } else if (zerodir === "right") {
        console.log("right");
        if (top) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else if (bottom) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
      } else if (zerodir === "left") {
        console.log("left");
        if (top) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else if (bottom) {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        } else {
          setboardstate([boardstate[0], boardstate[1], boardstate[2]]);
        }
      }
    }
  }

  return (
    <Center p="20">
      <Badge colorScheme={nearzero ? "green" : "red"}>Near Zero</Badge>
      <Badge colorScheme={nearzero ? "green" : "red"}>{zerodir}</Badge>
      <HStack>
        {boardstate.map((items, index) => {
          return (
            <VStack>
              {items.map((sitem, sindex) => {
                return (
                  <Button onClick={() => handleClick(index, sindex)}>
                    {sitem}
                  </Button>
                );
              })}
            </VStack>
          );
        })}
      </HStack>
    </Center>
  );
}

reactdom.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
