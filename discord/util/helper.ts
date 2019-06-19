export function formatDate(date: string | number | Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
}

export function noWhiteSpace(strings: any, ...placeholders: (string)[]) {
    let withSpace = strings.reduce((result: string, string: string, i: number) => (result + placeholders[i - 1] + string));
    // https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space?rq=1
    let withoutSpace = withSpace.replace(/  +/g, ' ');
    return withoutSpace;
  }

export async function get_fake_crypto_news() {
    // https://us-central1-openvpn-238104.cloudfunctions.net/function-2
    return fetch('https://us-central1-openvpn-238104.cloudfunctions.net/function-2')
    .then((res: { text: () => void; }) => res.text())
    .then((body: any) => { 
      return body
    });
}