import { useReducer } from "react";

const initialState = { value: "", isTouched: false };

const validateReducer = (state, action) => {
  if (action.type === "CHANGE") return { value: action.value, isTouched: true };
  else if (action.type === "RESET") return initialState;
  return initialState;
};

const useValidate = (validationRule) => {
  const [state, dispatch] = useReducer(validateReducer, initialState);

  const valid = validationRule(state.value);
  const error = !valid && state.isTouched;

  const onChange = (event) => {
    setTimeout(() => {
      dispatch({ type: "CHANGE", value: event.target.value });
    }, 500);
  };

  const onReset = () => dispatch({ type: "RESET" });

  return { value: state.value, valid, error, onChange, onReset };
};

export default useValidate;
