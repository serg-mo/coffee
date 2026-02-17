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
  // 2 sets of 10 unique pairwise comparisons, e.g., ab / ba
  comparisons: ComparisonsPair;
}
