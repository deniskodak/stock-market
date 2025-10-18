"use client";

import { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

interface UserDropdownProps {
  userData: {
    name: string;
    email: string;
  };
};

const UserDropdown: FunctionComponent<UserDropdownProps> = ({ userData }) => {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-400 hover:text-yellow-500"
        >
          <UserAvatar customClassName="h-8 w-8" userName={userData.name} />

          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {userData.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 p-2">
            <UserAvatar customClassName="h-10 w-10" userName={userData.name} />
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {userData.name}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {userData.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 text-medium focus:bg-transparent focus:text-yellow-500 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
        <nav aria-label="Main" className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
