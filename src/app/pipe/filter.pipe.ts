import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(list: any[], filterFiled: string, keyWord: string): any {
        if (!filterFiled || !keyWord) {
            return list;
        } else {
            return list.filter(item => item[filterFiled].includes(keyWord));
        }
    }

}
