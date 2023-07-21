export function responseMsgs(params: number, name: string) {
  if (params === 1) {
    return `Hello ${name}, welcome to Osei Tutu II Estate live chat. How can we assist you?`;
  }
  switch (params) {
    case 1:
      return `Hello ${name}, welcome to Osei Tutu II Estate live chat. How can we assist you?`;
      break;
    case 2:
      return "";
    case 3:
      return "";
    default:
      break;
  }
  //   switch (params) {
  //     case 1:
  //       break;

  //     default:
  //       break;
  //   }
}
