import react from "react";
import { useState, useEffect } from "react";
import reactdom from "react-dom";
import {
  ChakraProvider,
  Center,
  Heading,
  Text,
  Link,
  Box,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";

const numbercorrect = function (x) {
  return 5;
};

var tree = [];
function App() {
  function getH(boardarray) {
    var inplace = 0;
    for (let i = 0; i < boardarray.length; i++) {
      for (let t = 0; t < boardarray.length; t++) {
        if (boardarray[i][t] === goalstate[i][t]) {
          inplace++;
        }
      }
    }
    return inplace;
  }
  // Fake move functions
  function movedownempty(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex + 1, 1, value);
    if (index === 0) {
      var newboard = [temp, boardstate[1], boardstate[2]];
      return getH(newboard);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      return getH(newboard);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      return getH(newboard);
    }
  }
  function moveupempty(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex - 1, 1, value);
    if (index === 0) {
      return getH([temp, boardstate[1], boardstate[2]]);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      return getH([boardstate[0], temp, boardstate[2]]);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      return getH([boardstate[0], boardstate[1], temp]);
    }
  }
  function moverightempty(index, sindex, zeroindex, zerosindex, value) {
    if (index === 1) {
      var temprowzero = [...boardstate[index].splice(sindex, 1, 0)];
      var temprow = [...boardstate[zeroindex].splice(zerosindex, 1, value)];
      var temp1 = [...boardstate.splice(index, 1, [temprowzero]).flat()];
      var temp0 = [...boardstate[0]];
      var temp2 = [...boardstate.splice(zeroindex, 1, [temprow]).flat()];
      var newboard = [temp0, temp1, temp2];
      return getH([temp0, temp1, temp2]);
    } else if (index === 0) {
      var temprowzero = [...boardstate[index].splice(sindex, 1, 0)];
      var temp0 = [...boardstate.splice(index, 1, [temprowzero]).flat()];
      var temprow = [...boardstate[zeroindex].splice(zerosindex, 1, value)];
      var temp2 = [...boardstate[2]];
      var temp1 = [...boardstate.splice(zeroindex, 1, [temprow]).flat()];
      var newboard = [temp0, temp1, temp2];
      return getH([temp0, temp1, temp2]);
    }
  }
  function moveleftempty(index, sindex, zeroindex, zerosindex, value) {
    if (index === 2) {
      var temprowzero = [...boardstate[index].splice(sindex, 1, 0)];
      var temprow = [...boardstate[zeroindex].splice(zerosindex, 1, value)];
      var temp1 = [...boardstate[1]];
      var temp0 = [...boardstate[0]];
      var temp2 = [...boardstate.splice(index, 1, [temprow]).flat()];
      var newboard = [temp0, temp1, temp2];
      return getH([temp0, temp1, temp2]);
    } else if (index === 1) {
      var temprowzero = [...boardstate[index].splice(sindex, 1, 0)];
      var temprow = [...boardstate[zeroindex].splice(zerosindex, 1, value)];
      var temp2 = [...boardstate[2]];
      var temp0 = [...boardstate.splice(zeroindex, 1, [temprowzero]).flat()];
      var temp1 = [...boardstate.splice(index, 1, [temprow]).flat()];
      var newboard = [temp0, temp1, temp2];
      return getH([temp0, temp1, temp2]);
    }
  }

  //Real move functions
  function movedown(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex + 1, 1, value);
    if (index === 0) {
      var newboard = [temp, boardstate[1], boardstate[2]];
      setboardstate(newboard);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate(newboard);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate(newboard);
    }
  }
  function moveup(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex - 1, 1, value);
    if (index === 0) {
      setboardstate([temp, boardstate[1], boardstate[2]]);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate([boardstate[0], temp, boardstate[2]]);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate([boardstate[0], boardstate[1], temp]);
    }
  }
  function moveright(index, sindex, zeroindex, zerosindex, value) {
    if (index === 1) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp1 = boardstate.splice(index, 1, [temprowzero]).flat();
      var temp0 = [...boardstate[0]];
      var temp2 = boardstate.splice(zeroindex, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    } else if (index === 0) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temp0 = boardstate.splice(index, 1, [temprowzero]).flat();
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp2 = [...boardstate[2]];
      var temp1 = boardstate.splice(zeroindex, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    }
  }
  function moveleft(index, sindex, zeroindex, zerosindex, value) {
    if (index === 2) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp1 = [...boardstate[1]];
      var temp0 = [...boardstate[0]];
      var temp2 = boardstate.splice(index, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
      return [temp0, temp1, temp2];
    } else if (index === 1) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp2 = [...boardstate[2]];
      var temp0 = boardstate.splice(zeroindex, 1, [temprowzero]).flat();
      var temp1 = boardstate.splice(index, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    }
  }

  const board = [
    [1, 7, 8],
    [3, 0, 4],
    [6, 2, 5],
  ];
  const aiboard = [
    [1, 7, 8],
    [3, 0, 4],
    [6, 2, 5],
  ];
  const goalstate = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const [goal, setgoal] = useState(false);

  const [boardstate, setboardstate] = useState(board);
  const [aiboardstate, setaiboardstate] = useState(aiboard);
  const [inputindex, setinputindex] = useState(0);
  const [inputsubindex, setinputsubindex] = useState(0);
  const [corrects, setcorrects] = useState([]);
  const [g, setg] = useState(0);
  const [h, seth] = useState([]);
  const [pressed, setpressed] = useState(false);

  function AI(index, sindex, zeroindex, zerosubindex, value) {
    console.log("Zero was at:" + zeroindex + ", " + zerosubindex);
    if (zeroindex === 0 && zerosubindex === 0) {
      console.log("I am top left");
      console.log("I could've move in two directions");
    }
    if (zeroindex === 0 && zerosubindex === 1) {
      console.log("I am middle left");
      console.log("I could've move in three directions");
    }
    if (zeroindex === 0 && zerosubindex === 2) {
      console.log("I am bottom left");
      console.log("I could've move in two directions");
    }
    if (zeroindex === 1 && zerosubindex === 0) {
      console.log("I am top middle");
      console.log("I could've move in three directions");
      console.log(
        "My Correctness for move down is :" +
          movedownempty(index, sindex, zeroindex, zerosubindex, value)
      );
    }
    if (zeroindex === 1 && zerosubindex === 1) {
      console.log("I am middle middle");
      console.log("I could've move in four directions");
      console.log(
        "My Correctness for move up is :" +
          moveupempty(index, sindex, zeroindex, zerosubindex, value)
      );
      console.log(
        "My Correctness for move up is :" +
          movedownempty(index, sindex, zeroindex, zerosubindex, value)
      );
      console.log(
        "My Correctness for move left is :" +
          moveleftempty(index, sindex, zeroindex, zerosubindex, value)
      );
    }
    if (zeroindex === 1 && zerosubindex === 2) {
      console.log("I am bottom middle");
      console.log("I could've move in three directions");
      console.log(
        "My Correctness for move down is :" +
          movedownempty(index, sindex, zeroindex, zerosubindex, value)
      );
    }
    if (zeroindex === 2 && zerosubindex === 0) {
      console.log("I am top right");
      console.log("I could've move in two directions");
    }
    if (zeroindex === 2 && zerosubindex === 1) {
      console.log("I am middle right");
      console.log("I could've've move in three directions");
    }
    if (zeroindex === 2 && zerosubindex === 2) {
      console.log("I am bottom right");
      console.log("I could've move in two directions");
    }
  }

  useEffect(() => {
    if (boardstate === goalstate) {
      setgoal(true);
    }
    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === goalstate[i][t]) {
          seth(h.splice(h.length, 0, boardstate[i][t]));
        } else {
        }
      }
    }

    setcorrects(h.flat());
  }, [pressed]);
  function handleClick(index, sindex) {
    console.log({ index }, { sindex });
    setpressed(!pressed);
    var zeroindex = 0;
    var zerosindex = 0;
    var value = boardstate[index][sindex];

    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === 0) {
          zeroindex = i;
          zerosindex = t;
        }
      }
    }
    if (index === zeroindex && sindex === zerosindex) {
      AI(index, sindex, zeroindex, zerosindex, value);
    } else {
      if (sindex < board.length - 1) {
        if (
          boardstate[index][sindex + 1] === boardstate[zeroindex][zerosindex]
        ) {
          console.log("move down");
          movedown(index, sindex, zeroindex, zerosindex, value);
        }
      }
      if (sindex > 0) {
        if (
          boardstate[index][sindex - 1] === boardstate[zeroindex][zerosindex]
        ) {
          console.log("move up");
          moveup(index, sindex, zeroindex, zerosindex, value);
        }
      }
      if (index < board.length - 1) {
        if (
          boardstate[index + 1][sindex] === boardstate[zeroindex][zerosindex]
        ) {
          console.log("move right");
          moveright(index, sindex, zeroindex, zerosindex, value);
        }
      }
      if (index > 0) {
        if (board[index - 1][sindex] === board[zeroindex][zerosindex]) {
          console.log("move left");
          moveleft(index, sindex, zeroindex, zerosindex, value);
        }
      }
    }
  }

  return (
    <>
      <Heading margin="5" textAlign="center">
        8 Puzzle Game
      </Heading>
      <Center>
        <Button textAlign="center"> Solve using A* Algorithm</Button>
      </Center>
      <Center p="20">
        <Box bg="blackAlpha.200" padding="10" borderRadius="10">
          <HStack>
            {boardstate.map((items, index) => {
              return (
                <VStack>
                  {items.map((sitem, sindex) => {
                    return (
                      <Button
                        size="lg"
                        colorScheme={corrects.includes(sitem) ? "red" : "blue"}
                        opacity={sitem === 0 ? "0" : "1"}
                        onClick={() => {
                          handleClick(index, sindex);
                        }}
                      >
                        {sitem}
                      </Button>
                    );
                  })}
                </VStack>
              );
            })}
          </HStack>
        </Box>
      </Center>
    </>
  );
}

reactdom.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
