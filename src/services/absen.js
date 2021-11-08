import APIKit from "./index";

export const absen = async (data) => {
  try {
    const response = await APIKit({
      url: "/presensi/cek_metode",
      method: "POST",
      data: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
