import { toast } from "react-toastify";

export const handleManyRequest = (err) => {
  if (
    err.data?.error?.text &&
    err.data.error.text === "Too many requests in this time frame."
  ) {
    return toast.error(
      "Too Many Requests ! Please wait a little then execute any action",
      { position: "top-center", toastId: "too-many-request" },
    );
  }
};
