export function postedAt(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units = [[31536000, 'tahun'], [2592000, 'bulan'], [86400, 'hari'], [3600, 'jam'], [60, 'menit']];
  const found = units.find(([value]) => seconds >= value);
  return found ? `${Math.floor(seconds / found[0])} ${found[1]} lalu` : 'baru saja';
}

export function plainText(html = '') {
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.textContent || '';
}
