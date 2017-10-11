import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public formModel: FormGroup;
    // 商品类型
    public categories: string[];

    constructor(private productService: ProductService) {
        const fb = new FormBuilder();
        this.formModel = fb.group({
            title: ['', Validators.minLength(3)],
            price: [null, this.positiveNumberValidator],
            category: ['-1']
        });
    }

    ngOnInit() {
        this.categories = this.productService.getAllCategories();
    }

    /**
     * 检查一个表单控件的值是否为正数
     * @param {FormControl} control - 表单项
     * @returns {any} - 任意类型的值
     */
    positiveNumberValidator(control: FormControl): any {
        if (!control.value) {
            return null;
        }
        const price = Number.parseFloat(control.value);
        if (price >= 0) {
            return null;
        } else {
            return {positiveNumber: true};
        }
    }

    /**
     * 在控制台打印搜索的值
     */
    onSearch() {
        if (this.formModel.valid) {
            console.log(this.formModel.value);
            this.productService.searchEvent.emit(this.formModel.value);
        }
    }
}
