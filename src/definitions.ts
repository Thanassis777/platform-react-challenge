interface CatIdentity {
  id: string;
}

/**
 * Interface for breed details of cat.
 */
export interface IBreed extends CatIdentity {
  weight: {
    imperial: string;
    metric: string;
  };
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  alt_names: string;
  country_code: string;
  energy_level: number;
  wikipedia_url: string;
}

/**
 * Interface for image details of cat.
 */
export interface ICatImage extends CatIdentity {
  height: number;
  url: string;
  width: number;
  breeds?: IBreed[];
}

/**
 * Interface for favourite details of cat.
 */
export interface IFavoriteCatImage extends CatIdentity {
  image: Pick<ICatImage, 'url' | 'id'>;
  image_id: string;
  user_id: string;
}
