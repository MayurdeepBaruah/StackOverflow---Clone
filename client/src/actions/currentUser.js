export const setCurrenUser =(data) => {
    return {
        type: "FETCH_CURRENT_USER",
        payload: data,
    }
}