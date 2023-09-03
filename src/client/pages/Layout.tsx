import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavItem } from '../components/NavItem';
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useUserStore } from '../store/user';

export const Layout: React.FC = React.memo(() => {
  const workspaces = useUserStore((state) => {
    const userInfo = state.info;
    if (userInfo) {
      return userInfo.workspaces.map((w) => ({
        id: w.workspace.id,
        name: w.workspace.name,
        role: w.role,
        current: userInfo.currentWorkspace.id === w.workspace.id,
      }));
    }

    return [];
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-gray-100 px-4">
        <div className="px-2 mr-10 font-bold">Tianji</div>
        <div className="flex gap-8">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/monitor" label="Monitor" />
          <NavItem to="/website" label="Website" />
          <NavItem to="/Servers" label="Servers" />
          <NavItem to="/settings" label="Settings" />
        </div>

        <div className="flex-1" />

        <div>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: 'workspaces',
                  label: 'Workspaces',
                  children: workspaces.map((w) => ({
                    key: w.id,
                    label: `${w.name}${w.current ? '(current)' : ''}`,
                    disabled: w.current,
                  })),
                },
                {
                  key: 'logout',
                  label: 'Logout',
                },
              ],
            }}
          >
            <Button shape="circle" size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
      <div className="flex-1 w-full max-w-7xl m-auto px-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
});
Layout.displayName = 'Layout';
