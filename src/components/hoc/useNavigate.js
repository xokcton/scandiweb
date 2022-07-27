import { useNavigate } from "react-router-dom"

const withUseNavigate = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return WrappedComponent;
}

export default withUseNavigate