import { Product } from './product';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProduct:any[] ,userWord:string): any[] {

    return allProduct.filter(tearm =>tearm.title.toLowerCase().includes(userWord.toLowerCase()));
    
  }

}
