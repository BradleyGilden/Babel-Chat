const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, '0')}: ${date.getMinutes().toString().padStart(2, '0')}`
}

export default dateFormatter;
