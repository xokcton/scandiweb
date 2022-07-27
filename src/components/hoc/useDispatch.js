import { useDispatch } from "react-redux"

const withUseDispatch = (Component) => {
  const WrappedComponent = (props) => {
    const dispatch = useDispatch();
    return <Component {...props} dispatch={dispatch} />;
  }
  return WrappedComponent
}

export default withUseDispatch