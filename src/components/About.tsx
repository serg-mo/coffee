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
        Ranked Coffee Beans
      </h2>
      <p className="mt-2 leading-relaxed">
        Samples come in half-pound bags and sometimes that's not enough to fill
        the whole 5x5 matrix of pairwise comparisons. There are two tastings for
        every pairing, A vs B and B vs A. If the two cells disagree, there is no
        definite winner and no transitive completeness.
      </p>
      <p className="mt-2 leading-relaxed">
        I can taste all pairings of 5 beans in 10 groups of 3 or 5 groups of 4.
        Both ways compare each pairing 3 times, so there is a definite winner,
        but groups of 4 are easier to remember, i.e., exclude one bean at each
        tasting. Groups of 5 would work too, but I only have 4 puck screens.
      </p>
    </div>
  );
}
