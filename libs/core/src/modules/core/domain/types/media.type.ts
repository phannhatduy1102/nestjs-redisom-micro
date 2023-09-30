import { CommonEntityType, IdName } from './common.type';

export type Media = {
  id: string;
  slug?: string;
  name: string;
  otherName?: string;
  description?: string;
  coverImage: string;
  lastedEpisode: number;
  viewed: number;
  yop: number;
  totalRating: number;
  ratingCount: number;
  releaseDate?: Date;
  isFree: boolean;
  price: number;
  pricePerEpisode: number;
  author: string;
  followerCount: number;
  type: string;
  country: IdName;
  series: IdName[];
  genres: IdName[];
  episodes: IdName[];
  postedBy: string;
} & CommonEntityType;
