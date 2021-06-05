export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
}

/*export function getFormBody(params) {
  let arr = [];

  for (let key in params) {
    let encodedKey = encodeURIComponent(key); //user name => user&name
    let encodedValue = encodeURIComponent(params[key]); //samiran 123 => samiran&123

    arr.push(encodedKey + '=' + encodedValue);
  }

  return arr.join('&'); //username='samiran@gamil.com'&password='123'
}*/
