import { FunctionComponent } from "react";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
