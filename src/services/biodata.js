import APIKit from "./index";

export const biodata = async (data) => {
  try {
    const response = await APIKit({
      url: "/biodata/profile/?nip=" + data,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
