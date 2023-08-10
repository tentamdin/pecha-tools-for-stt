

// get all the files
export const getFiles = async (param) => {

  console.log("param", param);
  try {
    const response = await fetch(`http://localhost:3000/api/${param}`, {
      cache: "no-store",
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("response", data);
    return data;
  } catch (error) {
    console.log("response", error);
  }
};
