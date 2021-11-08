import APIKit from "./index";

export const riwayathariini = async (data) => {
  try {
    const response = await APIKit({
      url: `/riwayat/today/?nip=${data}`,
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
