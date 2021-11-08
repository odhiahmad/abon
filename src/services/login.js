import APIKit from "./index";

export const login = async (dataLogin) => {
  console.log(dataLogin);
  try {
    const response = await APIKit({
      url: "/signin/login",
      method: "POST",
      data: dataLogin,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
