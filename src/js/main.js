// An event listener that formats everything client side on page load when everything has been sent to the client from the server
// SSR is used to get the data and pre render the templates CSR is used to granually format and style this template as it should be.
document.addEventListener("DOMContentLoaded", () => formatValues());

// This map contains the actual values to be displayed
const stockLabelMap = {
  "FTSE 100 Index": "FTSE 100",
  // unicode character for ampersand
  "S&amp;P 500 INDEX": "S&amp;P 500",
  "Euro/US Dollar FX Spot Rate": "Euro Dollar",
  "UK Pound Sterling/US Dollar FX Spot Rate": "Pound Dollar",
  "ICE Brent Crude Oil Front Month": "Brent Crude Oil",
};

const formatLabels = () => {
  const values = Array.prototype.slice.call(
    document.getElementsByClassName("list__wrapper-name"),
  );
  values.forEach((value) => {
    value.innerHTML = stockLabelMap[value.innerHTML];
  });
};

// Arrow function for consistency except here as we need this to be hoisted so the event listener that calls it is obvious at the top of the file
function formatValues() {
  // Creating an array of all the HTML elements that have the quote we want to format
  const values = Array.prototype.slice.call(
    document.getElementsByClassName("list__wrapper-status"),
  );
  //   Looping through the values and putting a plus on the front if the value is positive
  //   The values are all then iteratively formatted to being only 2 decimal places
  values.forEach((value) => {
    const numValue = +value.innerHTML;
    // This is what we use to roung, use Number.EPSILON for greater accuracy
    const roundedInnerHTML = (
      Math.round((numValue + Number.EPSILON) * 100) / 100
    ).toString();
    value.innerHTML =
      numValue >= 0 ? `+${roundedInnerHTML}` : `${roundedInnerHTML}`;
  });
  formatLabels();
}
