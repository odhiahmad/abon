import APIKit from "./index";

export const riwayatizin = async (data) => {
  try {
    const response = await APIKit({
      url: `/izin/history/?nip=${data.nip}&date=${data.periode}`,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
