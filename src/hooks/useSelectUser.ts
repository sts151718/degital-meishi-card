import type { User } from "@/domain/User";
import { selectUserById } from "@/lib/supabase/databases/user";
import { useState } from "react";

export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async (userId: string) => {
    setIsLoading(true);

    if (userId === "") {
      throw new Error("Empty User Id");
    }

    const user = await selectUserById(userId);
    setSelectedUser(user);
    setIsLoading(false);
  };

  return { selectedUser, isLoading, fetchUser };
};
