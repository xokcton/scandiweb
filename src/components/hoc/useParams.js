import { useParams } from "react-router-dom"

const withUseParams = (Component) => {
  const WrappedComponent = (props) => {
    const { id } = useParams();
    return <Component {...props} paramsValue={id} />;
  }
  return WrappedComponent;
}

export default withUseParams