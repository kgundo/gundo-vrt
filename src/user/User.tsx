import axios from "axios";
import { useCallback, useEffect, useState } from "react";

/**
 * エラー型かどうかを判定する関数
 */
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

interface User {
  id: string;
  name: string;
}
export const UserInfo = () => {
  console.log("UserInfo!")
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchUser = useCallback(async () => {
    console.log("fetchUser!")
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (e) {
      if (isError(e)) {
        setError(e);
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();
    console.log("useEffect!")
  }, [fetchUser]);

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log("write!")
  return (
    <div>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
};
