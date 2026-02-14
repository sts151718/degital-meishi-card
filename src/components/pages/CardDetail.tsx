import type { FC } from "react";
import { useParams } from "react-router";

export const CardDetail: FC = () => {
  const { userId } = useParams();
  return <p>id: {userId}</p>;
};
