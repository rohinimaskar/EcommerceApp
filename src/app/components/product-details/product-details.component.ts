import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import * as _ from 'lodash';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productDetails: Product = {
    id: '',
    sku: '',
    name: '',
    type: '',
    description: '',
    color: '',
    price: 0
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(routeParam => {
      const id = routeParam.get('id');
      const productObject = _.find(this.productService.productsList, ['id', id]);
      if (productObject) {
        this.productDetails = productObject;
      }
    })
  }

  updateProduct(): void {
    /* 
    create  http.put request to update the data in table 
    Since we are not making the backend request, we will update the record from the array to reflect it on UI
    */
    this.productService.displayProductsList.forEach(product => {
      if (product.id === this.productDetails.id) {
        product.name = this.productDetails.name;
        product.color = this.productDetails.color;
        product.type = this.productDetails.type;
        product.description = this.productDetails.description;
        product.price = this.productDetails.price;
      }
    });

    this.productService.productsList.forEach(product => {
      if (product.id === this.productDetails.id) {
        product.name = this.productDetails.name;
        product.color = this.productDetails.color;
        product.type = this.productDetails.type;
        product.description = this.productDetails.description;
        product.price = this.productDetails.price;
      }
    });

    this.router.navigate(['product-list']);

  }


  ngOnDestroy(): void {
  }

}
