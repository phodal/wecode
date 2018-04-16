const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function unEntity(str) {
  return str.replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/&gt;/g, ">");
}

const clearCode = code => {
  let removeTag = JSON.stringify(code).replace(/<(.|\n)*?>/g, '');
  let removeFirstLast = removeTag.slice(1, -1);
  return unEntity(removeFirstLast);
}

module.exports = {
  formatTime: formatTime,
  clearCode: clearCode
}
