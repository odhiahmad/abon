import APIKit from "./index";

export const absenluar = async (data) => {
  try {
    const response = await APIKit({
      url: "/presensi/outdoor",
      method: "POST",
      data: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
