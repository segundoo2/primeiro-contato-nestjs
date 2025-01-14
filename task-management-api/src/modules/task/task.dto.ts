export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationsDate: Date;
}

export interface findAllParameters {
  title: string;
  status: string;
}
