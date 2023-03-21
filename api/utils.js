exports.phoneNumberValidation = function (value) {
  const phone = value.replace(/[^\d]/g, ""); //remove all non digits
  return phone.match(
    /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
  );
};

exports.cpfCnpjValidation = function (value) {
  return value.match(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );
};
