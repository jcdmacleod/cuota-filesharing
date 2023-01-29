import Avatar from "../UI/Avatar";
import { motion } from "framer-motion";
import Dropdown from "../Dropdown";
import { DropdownItem } from "../Dropdown/Dropdown";
import { router } from "@trpc/server";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { HiChevronDown } from "react-icons/hi";
import useTheme from "../../hooks/useTheme";

interface ProfileInfoProps {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}

export default function ProfileInfo({ name, email, avatar }: ProfileInfoProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { dark, toggleDark } = useTheme();
  const DROPDOWN_OPTIONS: DropdownItem[][] = [
    [
      {
        label: "My uploads",
        onClick: () => router.push("/my-uploads"),
      },
    ],
    [
      {
        label: "Sign out",
        onClick: () => signOut(),
      },
    ],
  ];

  if (session?.user?.role === "admin") {
    DROPDOWN_OPTIONS[0]?.push({
      label: "Admin",
      onClick: () => router.push("/admin"),
    });
    DROPDOWN_OPTIONS[0]?.push({
      label: dark ? "Light mode" : "Dark mode",
      onClick: () => toggleDark(),
    });
  }

  return (
    <>
      <Dropdown itemGroups={DROPDOWN_OPTIONS}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="">
            <HiChevronDown className="text-xl" />
            {/* <p className="-mb-1">{name}</p> */}
            {/* <p className="text-xs opacity-40">{email}</p> */}
          </div>
          <Avatar className="w-10" url={avatar || ""} />
        </motion.div>
      </Dropdown>
    </>
  );
}
