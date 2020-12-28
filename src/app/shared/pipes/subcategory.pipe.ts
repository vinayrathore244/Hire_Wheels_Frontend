import { Pipe, PipeTransform } from '@angular/core';
import { SubCategory } from '../models/vehicleproperty';

@Pipe({
  name: 'subcategory'
})
export class SubcategoryPipe implements PipeTransform {

  transform(id: number): string {
    return SubCategory.PropertyValue.get(id);
  }

}
