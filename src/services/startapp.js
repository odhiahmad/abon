import APIKit from "./index";

export const startapp = async (data) => {
  try {
    const response = await APIKit({
      url: "/api/auth/login",
      method: "POST",
      data: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
