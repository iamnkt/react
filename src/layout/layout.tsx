import { NavLink, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/uncontrolledform">Uncontrolled Form</NavLink>
        <NavLink to="/reacthookform">React Hook Form</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
