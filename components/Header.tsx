import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";
import { User } from "@/interfaces/auth.interface";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/" aria-label="Go to homepage">
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
        <UserDropdown {...user} />
      </div>
    </header>
  );
};

export default Header;
