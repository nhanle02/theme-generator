export class CreateThemeDto {
  name: string;

  type: string;

  category: string;

  preview_url?: string;

  prompt_template?: string;

  is_active?: boolean;
}
