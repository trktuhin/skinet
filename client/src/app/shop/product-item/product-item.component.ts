import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
