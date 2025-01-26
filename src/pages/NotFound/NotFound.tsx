import { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * @component
 * A simple component to display a 404 - Page Not Found message.
 * Also, provides a link to navigate back to the home page.
 */
const NotFound: FC = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

export default NotFound;
