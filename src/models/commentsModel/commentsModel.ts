export interface CommentsModel {
  id?: number;
  comment: string;
  user_id: number;
  draft_id: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export interface CommentsIndexModel {
  user_id: number;
  draft_id: number;
}

export interface CommentsIndexParamsModel {
  page?: number;
  per_page?: number;
  draft_id?: number;
}

export interface CommentsIndexResponseModel {
  total: number;
  per_page: number;
  current_page: number;
  data: CommentsModel[];
}
