export default function validareCreateProduct(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.company) {
    errors.company = "The company name is required";
  }

  if (!values.url) {
    errors.url = "url product is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(errors.url)) {
    errors.url = "Invalid Url";
  }

  if (!values.description) {
    errors.description = "The company description is required";
  }


  return errors;
}
