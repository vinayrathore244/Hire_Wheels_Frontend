import { SubcategoryPipe } from './subcategory.pipe';

describe('SubcategoryPipe', () => {

  let subcategoryPipe: SubcategoryPipe;

  beforeEach(() => {
    subcategoryPipe = new SubcategoryPipe();
  });

  it('create an instance', () => {
    const pipe = new SubcategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return subcategory name', () => {
    const subCategoryId = 1;
    expect(subcategoryPipe.transform(subCategoryId)).toBe('SUV');
  });
});
