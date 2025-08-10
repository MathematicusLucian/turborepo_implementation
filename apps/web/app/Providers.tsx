'use client'
import { useRouter } from 'next/navigation'
import { Navigation } from "@repo/ui/navigation";

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
      <Navigation menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
      {children}
    </>
  );
};

export default Providers;
