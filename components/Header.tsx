import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            className="h-8 w-auto"
            src="/assets/images/logo.png"
            alt="Signalist Logo"
            width={140}
            height={32}
          />
        </Link>
        <nav aria-label="Main" className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
