import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useExternalNavigation = (baseUrl) => {
  const { user } = useSelector((state) => state.auth);

  const getToken = useCallback(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    return token;
  }, []);

  const getExternalUrl = useCallback(() => {
    const token = getToken();

    if (user) {
      const params = new URLSearchParams({
        userName: user.name || "",
        userEmail: user.email || "",
        imageUrl: user?.profile_picture?.url || "",
        token: token || "",
      });
      return `${baseUrl}?${params.toString()}`;
    }

    return baseUrl;
  }, [user, baseUrl, getToken]);

  const handleExternalClick = useCallback(
    (e) => {
      e.preventDefault();
      const externalUrl = getExternalUrl();
      window.location.href = externalUrl;
    },
    [getExternalUrl]
  );

  return { getExternalUrl, handleExternalClick };
};
