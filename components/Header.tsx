import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: HeaderUser }) => {
  const initialStocks = await searchStocks();

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
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropdown name={user.name} email={user.email} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
