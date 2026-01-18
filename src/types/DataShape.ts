export type DataShape = {
  // sku from coffeebeancorral.com
  names: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  // 2 sets of 10 unique pairwise comparisons, e.g., ab / ba
  comparisons: {
    a: {
      b: "a" | "b";
      c: "a" | "c";
      d: "a" | "d";
      e: "a" | "e";
    };
    b: {
      a: "b" | "a";
      c: "b" | "c";
      d: "b" | "d";
      e: "b" | "e";
    };
    c: {
      a: "c" | "a";
      b: "c" | "b";
      d: "c" | "d";
      e: "c" | "e";
    };
    d: {
      a: "d" | "a";
      b: "d" | "b";
      c: "d" | "c";
      e: "d" | "e";
    };
    e: {
      a: "e" | "a";
      b: "e" | "b";
      c: "e" | "c";
      d: "e" | "d";
    };
  };
};
