export interface Metadata {
  name: string;
  description: string;
  attributes: any;
  external_url?: string;
  image?: string;
  image_data?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

export interface MetadataRecord extends Metadata {
  collection_id: string;
  token_id: number;
}
