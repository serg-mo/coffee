export default interface BeanShape {
  sku: string;
  attributes: Record<string, number>;
  flavors: Record<string, number>;
  specifications: Record<string, string>;
  description: string;
}
