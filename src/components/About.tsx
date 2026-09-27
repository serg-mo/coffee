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
        Regional sample packs come in five 0.5lb bags and sometimes that's not
        enough to fill the whole 5x5 matrix of pairwise comparisons. Out of the
        25 cells, 5 are self-comparisons on the diagonal and the remaining 20
        are duplicates. I taste each pairing twice, A vs B and B vs A, so 10
        unique pairings. If the two tastings disagree, there is no definite
        winner and no transitive completeness. This is why older matrices may
        not be symmetrical around the diagonal, i.e., a different bean won both
        times.
      </p>
      <p className="mt-2 leading-relaxed">
        Tasting every pair takes too long, especially if I want a definite
        winner, i.e., odd number of tastings for every unique pairing. Both 10
        groups of 3 and 5 groups of 4 compare each pairing 3 times, so there is
        a definite winner, but groups of 4 are easier to remember, i.e., exclude
        one bean at each tasting. Groups of 5 would work too, but I only have 4
        puck screens.
      </p>
      <p className="mt-2 leading-relaxed">
        The sample bags are 226g green and ~180g roasted, so only 10 cups per
        bean (18g dose). The old "pair" tastings required 8 cups, with only 2
        attempts to get the grind right. The new "quad" tastings only need 4
        cups, with 2.5x more room for error.
      </p>
      <p className="mt-2 leading-relaxed">
        A tasting is just a ranked list of four beans, e.g., ABCD. From this
        single tasting we can infer 3 + 2 + 1 = 6 pairwise comparisons. Five
        tastings produce 30 pairwise comparisons for 10 unique pairings. With 3
        votes per pairing, there is a definite winner. Such "quad" dataset can
        be converted to "pair" dataset by copying that winner across the diagonal.
      </p>
      <p className="mt-2 leading-relaxed">
        Bean rank is just a count of wins out of 4 vertical + 4 horizontal = 8
        possible. When there is no definite winner, both beans claim 1 out of
        the 2 available wins (20 total). This is why older matrices may have an
        odd rank and newer dataset ranks are always even. Having 8 wins means
        that I have compared this bean to every other bean, multiple times, and
        it won every time. Those are my favorite beans.
      </p>
    </div>
  );
}
