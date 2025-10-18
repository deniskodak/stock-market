import { FunctionComponent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  userName: string;
  userImageSrc?: string;
  customClassName?: string;
}

const UserAvatar: FunctionComponent<UserAvatarProps> = ({
  userName,
  userImageSrc,
  customClassName,
}) => {
  const srcFallback = "https://github.com/shadcn.png";

  return (
    <Avatar className={customClassName}>
      <AvatarImage src={userImageSrc ?? srcFallback} />
      <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
        {userName[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
