export const getError = (error) => {
    const errorMessage = "API Error, please try again.";
  
    if (error.name === "Fetch User") {
      return error.message;
    }
  
    if (!error.response) {
      const err = error.config?.url ?? error;
      console.error(`API ${err} not found`);
      return errorMessage;
    }
    if (process.env.NODE_ENV === "development") {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
    if (error.response.data && error.response.data.errors) {
      return error.response.data.errors;
    }
  
    return errorMessage;
  };