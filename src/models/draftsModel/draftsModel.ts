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

export interface IndexAllDraftsParams {
  page?: number;
  per_page?: number;
}

export interface IndexAllDraftsResponse {
  total: number;
  per_page: number;
  current_page: number;
  data: DraftsModel[];
}
