// helper function to return how many unordered lists there are in handlebars template. There should be as many uls as items in the array response from the get request
const countOccurences = (response) => {
  let count = 0;
  const words = response.text.split(" ");

  // splitting the literal containing the html into words we can loop through, as there should be only as many ul elements as there are items in the get request response this should only increase the count to the same number as items in the items array that is returned from the API.
  words.forEach((word) => {
    if (word.includes("<ul")) {
      count++;
    }
  });

  return count;
};

module.exports = countOccurences;
