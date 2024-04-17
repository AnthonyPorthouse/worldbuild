export class UpdatePageDto {
  title: string;

  blocks: {
    content: string;
    revealed: boolean;
  }[];
}
