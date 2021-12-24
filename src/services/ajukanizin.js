import APIKit from "./index";

export const ajukanizin = async (data) => {
  try {
    const response = await APIKit({
      url: "/izin/insert",
      method: "POST",
      data: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
