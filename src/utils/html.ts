type ClassName = string | boolean | number | null | undefined;

export function cn(...classNames: ClassName[]): string {
  return classNames.filter(Boolean).join(' ');
}
