export function cleanInput(input: string): string[] {
  return input.trim().split(" ").filter((word) => word != "");
}
