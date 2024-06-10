import { toast } from "sonner";

//? success
export const successMessage = (msg: string) => {
  toast.success(msg, {
    duration: 2000,
  });
};

//? error
export const errorMessage = (msg: string) => {
  toast.error(msg, {
    duration: 2000,
  });
};

//? warning
export const warningMessage = (msg: string) => {
  toast.warning(msg, {
    duration: 2000,
  });
};
