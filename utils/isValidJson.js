export default json => {
  if (!json) return true;
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
};
