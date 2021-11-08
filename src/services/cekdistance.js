import APIKit from "./index";

export const cekdistance = async (data) => {
  try {
    const response = await APIKit({
      url: "/distance/location",
      method: "POST",
      data: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
