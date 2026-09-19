import React from "react";

// Q1 [Jan–Mar] Africa            Ethiopia / Kenya harvest Oct–Feb, fresh crop arriving Jan–May
// Q2 [Apr–Jun] Central America   Guatemala / Costa Rica / Honduras harvest Nov–Mar, fresh crop arriving Jan–Apr
// Q3 [Jul–Sep] South America     Brazil / Peru harvest Apr–Sep, fresh crop arriving Aug–Nov
// Q4 [Oct–Dec] Indonesia         Various islands harvest roughly Apr–Oct, fresh crop arriving Dec

// Demitasse Caffe Espresso blend is Costa Rica + Ethiopia

// Roasting a half pound (226g) takes 3 batches of ~72g, so 15 roasts, which takes hours.
// My roaster can handle 100g, so even after 20% shrinkage, it can yield 4 * 18 = 72g
// One roast per bean, 5 roasts to produce 5 * 4 = 20 servings, which takes an hour.

// coffeebeancorral.com vs sweetmarias.com
// Africa          14 vs 23
// Central America 23 vs 6
// South America   10 vs 4

export default function About() {
  return (
    <div className="mt-10 mx-5 px-6 py-5 rounded-2xl border border-amber-200 bg-amber-50/80 text-amber-900 shadow-sm">
      <h2 className="text-center text-lg font-semibold tracking-tight text-amber-900">
        Single Origin Coffee Rankings
      </h2>
      <p className="mt-2 leading-relaxed">
        Regional sample packs come in five 0.5lb (226g) bags and sometimes
        that's not enough to fill the whole 5x5 matrix of pairwise comparisons.
        Out of the 25 cells, 5 are self-comparisons on the diagonal and the
        remaining 20 are duplicates, so 10 unique pairings. There are two
        comparisons for every pairing, A vs B and B vs A. If the two comparisons
        disagree, there is no definite winner and no transitive completeness.
        Therefore, tastings must compare more than two beans at a time.
      </p>
      <p className="mt-2 leading-relaxed">
        I can taste everything in 10 groups of 3 or 5 groups of 4. Both ways
        compare each pairing 3 times, so there is a definite winner, but groups
        of 4 are easier to remember, i.e., exclude one bean at each tasting.
        Groups of 5 would work too, but I only have 4 puck screens.
      </p>
      <p className="mt-2 leading-relaxed">
        A tasting is just a ranked list of four beans, e.g., ABCD. From this
        single tasting we can infer 3 + 2 + 1 = 6 pairwise comparisons. Five
        tastings produce 30 pairwise comparisons for 10 unique pairings. With 3
        votes per pairing, there is a definite winner. This is why older
        matrices may not be symmetrical around the diagonal, i.e., I picked a
        different bean at both tastings.
      </p>
    </div>
  );
}
