"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchStock from "./SearchStock";

const NavItems = ({ initialStocks }: { initialStocks?: StockWithWatchlistStatus[] }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 text-md font-medium">
      {NAV_ITEMS.map((item) => {
        if (item.label === "Search") {
          return initialStocks ? (
            <li key={item.label}>
              <SearchStock renderAs="text" label="Search" initialStocks={initialStocks} />
            </li>
          ) : null;
        }

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`hover:text-yellow-500 transition-colors ${
                isActive(item.href) ? "text-gray-100" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
