import APIKit from "./index";

export const opsiabsen = async (data) => {
  try {
    const response = await APIKit({
      url: "category/opsi-luar-kantor",
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
