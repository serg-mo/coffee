export const MAX_FLAVOR = 4;
export const MAX_ATTRIBUTE = 7;

export default interface BeanShape {
  sku: string;
  attributes: Record<string, number>;
  flavors: Record<string, number>;
  specifications: Record<string, string>;
  description: string;
}
