import { toast } from "react-toastify";

export const handleManyRequest = (err) => {
  if (err?.data?.error?.text === "Too many requests in this time frame.") {
    return toast.error(
      "TOO MANY REQUESTS RECEIVED. PLEASE WAIT SOME TIME THEN TRY AGAIN",
      {
        position: "top-center",
        toastId: "many-request",
      },
    );
  }
};
