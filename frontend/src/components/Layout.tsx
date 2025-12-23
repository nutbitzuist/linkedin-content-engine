import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  Calendar as CalendarIcon,
  FileEdit,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useStore } from '../lib/store';
import { clsx } from 'clsx';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/templates', icon: FileText, label: 'Templates' },
  { path: '/create', icon: PenTool, label: 'Create Post' },
  { path: '/calendar', icon: CalendarIcon, label: 'Calendar' },
  { path: '/drafts', icon: FileEdit, label: 'Drafts' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar, user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-full bg-dark-800/95 backdrop-blur-xl border-r border-dark-600 z-40 transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-600">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-success flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-dark-900" />
              </div>
              <span className="font-display font-semibold text-lg">ContentForge</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-success flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-dark-900" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/create' && location.pathname.startsWith('/create'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx(
                  'nav-item',
                  isActive && 'active',
                  sidebarCollapsed && 'justify-center px-3'
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-20 left-0 right-0 px-3 space-y-2">
          {/* User Email */}
          {user && !sidebarCollapsed && (
            <div className="px-3 py-2 text-xs text-zinc-500 truncate">
              {user.email}
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all',
              sidebarCollapsed && 'justify-center px-3'
            )}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 left-0 right-0 mx-3 btn-ghost flex items-center justify-center gap-2"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={clsx(
          'flex-1 transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
