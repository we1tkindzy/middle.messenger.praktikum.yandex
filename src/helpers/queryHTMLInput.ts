export default function queryHtmlInput(element: any, input: string) {
  return element?.querySelector(input) as HTMLInputElement;
}
