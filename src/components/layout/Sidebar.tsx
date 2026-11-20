import {
  LayoutDashboard,
  Users,
  Wifi,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-icon">
          <Wifi size={22} />
        </div>

        {!isCollapsed && <span>ISP Manager</span>}

        <button
          className="sidebar-toggle"
          onClick={onToggle}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={18} className={isCollapsed ? "rotate-icon" : ""} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {!isCollapsed && <span className="nav-label">MENU</span>}

        <a href="#" className="nav-item active" title="Dashboard">
          <LayoutDashboard size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </a>

        <a href="#" className="nav-item" title="Customers">
          <Users size={20} />
          {!isCollapsed && <span>Customers</span>}
        </a>

        <a href="#" className="nav-item" title="Plans">
          <Wifi size={20} />
          {!isCollapsed && <span>Plans</span>}
        </a>

        <a href="#" className="nav-item" title="Payments">
          <CreditCard size={20} />
          {!isCollapsed && <span>Payments</span>}
        </a>

        <a href="#" className="nav-item" title="Settings">
          <Settings size={20} />
          {!isCollapsed && <span>Settings</span>}
        </a>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">A</div>

          {!isCollapsed && (
            <>
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Administrator</span>
              </div>

              <button className="logout-button" title="Logout">
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
