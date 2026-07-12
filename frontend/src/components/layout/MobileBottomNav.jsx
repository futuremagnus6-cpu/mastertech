import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiGrid, FiShoppingCart, FiBox, FiPackage, FiFileText,
} from 'react-icons/fi';

export default function MobileBottomNav() {
  const { user } = useSelector((state) => state.auth);
  const isSuperAdmin = user?.role === 'super_admin';

  const shopNavItems = [
    { path: '/', icon: FiGrid, label: 'Home' },
    { path: '/pos', icon: FiShoppingCart, label: 'POS' },
    { path: '/products', icon: FiBox, label: 'Products' },
    { path: '/orders', icon: FiPackage, label: 'Orders' },
    { path: '/reports', icon: FiFileText, label: 'Reports' },
  ];

  const superAdminNavItems = [
    { path: '/super-admin', icon: FiGrid, label: 'Dashboard' },
    { path: '/super-admin/shops', icon: FiBox, label: 'Shops' },
    { path: '/super-admin/pre-shops', icon: FiPackage, label: 'Pre-Shops' },
    { path: '/super-admin/analytics', icon: FiFileText, label: 'Analytics' },
    { path: '/super-admin/settings', icon: FiFileText, label: 'Settings' },
  ];

  const items = isSuperAdmin ? superAdminNavItems : shopNavItems;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.slice(0, 5).map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/' || item.path === '/super-admin'}
          className={({ isActive }) =>
            `mobile-bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="truncate max-w-[4rem]">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
