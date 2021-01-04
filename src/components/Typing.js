import React from "react";
import useKeyPress from "../hooks/useKeyPress";

const initialWords =
  "since off company fruit car to chief since arrange against electric type music horse level hour plan feel size product voice meat could pitch through fill people cost question could very go book broad danger single shoulder take as press guess more town make are wife nor house wall well";

function Content(props) {
  const { state, dispatch } = props;
  const { outgoingChars, currentChars, incomingChars, gameInput = "" } = state;

  //   useKeyPress((key) => console.log(key));

  return (
    <div className="game">
      <div className="game__text">
        {/* <div>{outgoingChars}</div> */}
        {/* <div>{currentChars}</div>
        <div>{incomingChars}</div> */}
        {[...outgoingChars].map((char, index) => (
          <span style={{ backgroundColor: "green" }} key={index}>
            {char}
          </span>
        ))}

        {[...currentChars].map((char, index) => (
          <span style={{ backgroundColor: "red" }} key={index}>
            {char}
          </span>
        ))}

        {[...incomingChars].map((char, index) => (
          <span key={index}>{`${char}`}</span>
        ))}
      </div>
      <div className="game__input">
        <input
          value={gameInput}
          onChange={(e) =>
            dispatch({ type: "updateGameInput", value: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function updateGame(state, action) {
  //     console.log('value', action.value)
  console.log(action.value.length);
  // console.log(action.value[action.value.length-1])

  const { outgoingChars, currentChars, incomingChars, originalText } = state;

  const lastChar = action.value[action.value.length - 1];
  const inputLength = action.value.length;
  const outgoingLength = outgoingChars.length;
  if (inputLength > 40) return state;

  if (lastChar === " ")
    return {
      ...state,
      outgoingChars: outgoingChars + currentChars,
      currentChars: "",
      gameInput: "",
    };

  //   incomingChars.substr(0, 2);

  //   incomingChars: incomingChars.slice(inputLength);

  //   console.log(incomingChars.slice(inputLength))

  //   return {
  //     ...state,
  //     currentChars: currentChars + incomingChars[0],
  //     incomingChars: incomingChars.slice(1),
  //     gameInput: action.value,
  //   };

  return {
    ...state,
    currentChars: originalText.substr(outgoingLength, inputLength),
    incomingChars: originalText.slice(outgoingLength + inputLength),
    gameInput: action.value,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "updateGameInput":
      return updateGame(state, action);
    // case "updateGameInput":
    //   return { ...state, gameInput: action.value };
    default:
      throw new Error();
  }
}

function Typing(props) {
  const initialState = React.useMemo(() => {
    return {
      outgoingChars: "",
      currentChars: "",
      incomingChars: initialWords,
      gameInput: "",
      originalText: initialWords,
    };
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);
  return (
    <div className="typing">
      <div className="typing__content">
        <Content state={state} dispatch={dispatch} />
      </div>
      <div className="typing__info">
        <div>wpm</div>
        <div>errors</div>
        <div>%</div>
      </div>
    </div>
  );
}

export default Typing;
