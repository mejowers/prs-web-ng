import { Vendor } from "./vendor.class";

export class Product {

    id: number;
    vendor: Vendor;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;
    vendorId: number;

    constructor(id: number = 0, vendor: Vendor = new Vendor(), partNumber: string = '', 
        name: string = '', price: number = 0, unit: string = '', photoPath: string ='', vendorId: number = 0) {

            this.id = id;
            this.vendor = vendor;
            this.partNumber = partNumber;
            this.name = name;
            this.price = price;
            this.unit = unit;
            this.photoPath = photoPath;
            this.vendorId = vendorId
        }
}