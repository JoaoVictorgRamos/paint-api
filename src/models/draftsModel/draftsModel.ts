export interface DraftsModel {
  id?: number;
  image: string;
  user_id: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export interface DraftsIndexModel {
  user_id: number;
}
