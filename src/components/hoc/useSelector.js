import { useSelector } from "react-redux"

const withUseSelector = (Component, selector) => {
  const WrappedComponent = (props) => {
    const obj = useSelector(selector);
    return <Component {...props} selectorValue={obj} />;
  }
  return WrappedComponent;
}

export const nestedWithUseSelector = (Component, selector) => {
  const WrappedComponent = (props) => {
    const obj = useSelector(selector);
    return <Component {...props} nestedSelectorValue={obj} />;
  }
  return WrappedComponent;
}

export default withUseSelector