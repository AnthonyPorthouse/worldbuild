export class CreatePageDto {
  title: string;

  blocks: {
    content: string;
    revealed: boolean;
  }[];
}
