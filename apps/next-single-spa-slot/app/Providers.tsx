'use client'
import React from "react";
import { useRouter } from 'next/navigation'
// import { Navigation } from "@repo/ui/navigation";
import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("@repo/ui/navigation").then(mod => mod.Navigation), { ssr: false });

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
  ];

  const handleMenuItemClick = (menuItem: { label: string; path: string }) => {
    router.push(menuItem.path);
  };

  return (
    <>
      {/* <Navigation menuItems={menuItems} onMenuItemClick={handleMenuItemClick} /> */}
      {children}
    </>
  );
};

export default Providers;
