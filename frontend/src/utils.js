// export const getError = (error) => {
//     return error.response && error.response.data.message
//         ? error.respomse.data.message
//         : error.message;
// }

export const getError = (error) => {
    return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
};