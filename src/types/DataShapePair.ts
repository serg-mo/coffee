import ComparisonsPair from "./ComparisonsPair";
export default interface DataShapePair {
  // sku from coffeebeancorral.com
  names: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  comparisons?: ComparisonsPair;
}
