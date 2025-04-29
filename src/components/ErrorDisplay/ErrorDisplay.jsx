import { useSelector } from 'react-redux';

const ErrorDisplay = () => {
  const { error } = useSelector((state) => state.auth);
  if (!error) return null;
  return <div style={{ color: 'red' }}>Authentication Error: {error.message}</div>;
};

export default ErrorDisplay;

