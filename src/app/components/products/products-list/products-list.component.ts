import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  searchKey: string = '';
  pages: number = 1;
  count: number = 10;

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.productService.productsList?.length <= 0) {
      this.productService.getAllProducts().subscribe({
        next: (res) => {
          this.productService.productsList = JSON.parse(res);
          this.productService.displayProductsList = JSON.parse(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  // On click on delete button deletes the product
  deleteProduct(id: string): void {
    /* 
    create  http.delete request to delete the data from table 
    Since we are not making the backend request, we will remove the record from the array to reflect it on UI
    */
    this.productService.productsList = _.reject(this.productService.productsList, ['id', id]);
    this.productService.displayProductsList = _.reject(this.productService.displayProductsList, ['id', id]);
  }

  // On click on Edit button routes to the the details
  editProduct(id: string): void {
    this.router.navigate(['product-details', id]);
  }

  // Filters the data based on colors if the value is typed in textbox
  filter(): void {
    if (!this.searchKey || this.searchKey.length === 0) {
      this.productService.displayProductsList = this.productService.productsList
      return;
    }
    this.productService.displayProductsList =
      this.productService.productsList.filter((o) => o.color.indexOf(this.searchKey) > -1);
    this.pages = 1;
  }


  ngOnDestroy(): void {
  }

}
