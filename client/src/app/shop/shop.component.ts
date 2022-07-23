import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BusyService } from '../core/services/busy.service';
import { IBrand } from '../shared/models/Brand';
import { IProduct } from '../shared/models/Product';
import { IProductType } from '../shared/models/ProductType';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef = {} as ElementRef;
  products: IProduct[] | undefined = [];
  brands: IBrand[] = [];
  types: IProductType[] = [];
  totalCount = 0;
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService, public busyService: BusyService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getProducts();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: res => {
        this.products = res?.data;
        this.shopParams.pageNumber = res?.pageIndex ?? 1;
        this.shopParams.pageSize = res?.pageSize ?? 6;
        this.totalCount = res?.count ?? 0;
      },
      error: err => console.log(err)
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: res => this.brands = [{ id: 0, name: 'All' }, ...res],
      error: err => console.log(err)
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: res => this.types = [{ id: 0, name: 'All' }, ...res],
      error: err => console.log(err)
    });
  }

  onBrandIdSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeIdSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event: Event) {
    const sort = (event.target as HTMLInputElement).value;
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
