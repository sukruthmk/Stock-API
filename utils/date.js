exports.isToday = (data) => {
  const today = new Date();
  return (
    data.getDate() == today.getDate() &&
    data.getMonth() == today.getMonth() &&
    data.getFullYear() == today.getFullYear()
  );
};
