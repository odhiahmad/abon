import APIKit from "./index";

export const biodatadashboard = async (data) => {
  try {
    const response = await APIKit({
      url: "/biodata/dashboard/?nip=" + data,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
