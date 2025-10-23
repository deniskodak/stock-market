import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  userName,
  userImageSrc,
  customClassName,
}: UserAvatarProps) => {
  const srcFallback = "https://github.com/shadcn.png";
  const name = userName || "?";
  return (
    <Avatar className={customClassName}>
      <AvatarImage src={userImageSrc ?? srcFallback} />
      <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
