import { EnsureSlugExistInput, IdFieldInput } from '../../modules';

export const convertGenreSlugToInput = (
  slug: IdFieldInput[]
): EnsureSlugExistInput => {
  return {
    ids: slug.map((s) => s.id),
  };
};
