import './Sidebar.css';

import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <nav>
          <NavLink to="/admin/dashboard" className="admin-link">
            Dashboard
          </NavLink>

          <NavLink to="/admin/create" className="admin-link">
            Create Product
          </NavLink>

          <button onClick={handleLogout} className="admin-link logout">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar
