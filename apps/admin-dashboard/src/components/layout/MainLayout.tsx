import { ReactNode } from "react";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-vh-100 bg-background">
      <Navbar />
      <div className="pt-5 mt-4 pb-4">
        <main className="container-lg px-3 px-md-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 