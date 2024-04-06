export class CreateTaskDto {
  userId?: number;
  title: string;
  description: string;
  fileAttachment?: string;
}
