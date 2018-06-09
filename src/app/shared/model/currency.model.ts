/* Defines the Currency entity */
export class Currency {
  public id?: string ;
  public attributes?: Attributes;
  constructor(
    id?: any,
    attributes?: any) {
    this.id = id ? id : null;
    this.attributes = attributes ? attributes : null;
  }
}
class Attributes {
  public code: string;
  public name: string ;
  public currency_type: string;
  public code_iso_numeric3: string;
  public code_iso_alpha3: string;
  public symbol: string;
  public native_symbol: string
  public category: string;
  constructor(
    code?: string,
    name?: string,
    currency_type?: string,
    code_iso_numeric3?: string,
    code_iso_alpha3?: string,
    symbol?: string,
    native_symbol?: string,
    category?: string) {
    this.code = code ? code : null;
    this.name = name ? name : null;
    this.currency_type = currency_type ? currency_type : null;
    this.code_iso_numeric3 = code_iso_numeric3 ? code_iso_numeric3 : null;
    this.code_iso_alpha3 = code_iso_alpha3 ? code_iso_alpha3 : null;
    this.symbol = symbol ? symbol : null;
    this.native_symbol = native_symbol ? native_symbol : null;
    this.category = category ? category : null;
  }
}
