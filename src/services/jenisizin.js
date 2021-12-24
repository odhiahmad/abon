import APIKit from "./index";

export const jenisizin = async (data) => {
  try {
    const response = await APIKit({
      url: `/category/izin`,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
