export function getFormBody(params) {
  let arr = [];

  for (let key in params) {
    let encodedKey = encodeURIComponent(key); //user name => user&name
    let encodedValue = encodeURIComponent(params[key]); //samiran 123 => samiran&123

    arr.push(encodedKey + '=' + encodedValue);
  }

  return arr.join('&'); //username='samiran@gamil.com'&password='123'
}
