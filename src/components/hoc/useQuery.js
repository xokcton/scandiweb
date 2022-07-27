import { useQuery } from '@apollo/client'

export const withUseCategories = (Component, query) => {
  const WrappedComponent = (props) => {
    const obj = useQuery(query);
    return <Component {...props} queryValue={obj} />;
  }
  return WrappedComponent
}

export const withUseCertainCategory = (Component, query, name) => {
  const WrappedComponent = (props) => {
    const obj = useQuery(query, {
      variables: { name }
    });
    return <Component {...props} queryValue={obj} />;
  }
  return WrappedComponent
}

export const withUseCertainProduct = (Component, query, id) => {
  const WrappedComponent = (props) => {
    const obj = useQuery(query, {
      variables: { id }
    });
    return <Component {...props} queryValue={obj} />;
  }
  return WrappedComponent
}