
'use client';
import { useState } from "react";
import { Routes } from '../config/routes';
import Link from "next/link";

const Aside = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  let pathname = 'Dashboard';

  return (
    <>
      <div>
        {mobileOpen ? (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden fixed z-40 top-4 right-4 p-1 rounded-lg bg-black text-white"
          >
            ✖
          </button>
        ) : (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden fixed z-20 top-4 right-4 p-2 rounded-lg bg-black text-white"
          >
            ☰
          </button>
        )}

        {mobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" />}

        {/* Sidebar */}
        <div className={`hidden md:block h-[100vh] ${isCollapsed ? 'w-20' : 'w-64'}`}></div>

        <aside
          className={`
            bg-black text-white fixed h-[100vh] left-0 top-0
            transition-all duration-300
            ${isCollapsed ? 'w-20' : 'w-64'}
            ${mobileOpen ? 'translate-x-0 z-40' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="p-4 flex items-center justify-between border-b border-white/20 h-16">
            {!isCollapsed && (
              <Link href={`#`} className="text-white text-lg font-bold">
                <h1 className="text-xl font-bold">Exam Management</h1>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-full hover:bg-white/10 hidden md:block"
            >
              {isCollapsed ? '»' : '«'}
            </button>
          </div>

          <div className="p-4 h-[calc(100%-4rem)] flex flex-col">
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {Routes.map((route, index) => (
                  <li key={route.path + index}>
                    <a
                      href={route.path}
                      className={`
                        flex items-center p-3 rounded-lg transition-colors
                        ${pathname === route.label ? 'bg-white/20' : 'hover:bg-white/10'}
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <span className={`${isCollapsed ? '' : 'mr-3'}`}>{route.icon}</span>
                      {!isCollapsed && route.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              className={`
                mt-auto flex items-center p-3 rounded-lg transition-colors
                bg-red-500 hover:bg-red-600 text-white
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <svg
                className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {!isCollapsed && "Logout"}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Aside;
