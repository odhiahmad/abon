import APIKit from "./index";

export const riwayatabsen = async (data) => {
  try {
    const response = await APIKit({
      url: `/riwayat/presensi/?nip=${data.nip}&periode=${data.periode}`,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
