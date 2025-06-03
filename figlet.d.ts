declare module "figlet" {
  type Options = {
    font?: string;
    horizontalLayout?: string;
    verticalLayout?: string;
    width?: number;
    whitespaceBreak?: boolean;

  };

  export function textSync(text: string, options?: Options): string;

  export function text(
    text: string,
    options: Options,
    callback: (err: Error | null, result: string) => void
  ): void;

  export function fonts(
    callback: (err: Error | null, fonts: string[]) => void
  ): void;

  export function fontsSync(): string[];
}
