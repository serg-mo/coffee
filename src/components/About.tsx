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

// TODO: this goes in the readme with tailwind styling
export default function About() {
  return (
    <div className="m-2 p-3 rounded-2xl border border-amber-200 bg-amber-50/80 text-amber-900">
      <h2 className="text-center text-lg font-semibold tracking-tight text-amber-900">
        Single Origin Coffee Rankings
      </h2>

      <p className="mt-2 leading-relaxed">
        Regional sample packs come in five 1/2lb bags and sometimes that's not
        enough for the whole 5x5 matrix. A sample bag yields only ~10 doses and
        the old "pair" tastings required 8 of them, with only 2 attempts to get
        the grind right. The new "quad" tastings only need 4 doses per bean.
      </p>

      <p className="mt-2 leading-relaxed">
        Each cell lists the winner of the two beans, with 5 self-comparisons on
        the diagonal showing total wins for that bean. The remaining 20 cells
        cover each pairing twice, A vs B and B vs A. If I pick a different bean
        both times, there is no definite winner and no transitive completeness.
        This is why older matrices may not be symmetrical around the diagonal.
      </p>

      <p className="mt-2 leading-relaxed">
        The old "pair" tastings take too long, especially if I want a definite
        winner, i.e., odd number of comparisons for every unique pairing. I
        could compare each unique pairing 3 times in 10x3 or 5x4, but groups of
        4 are easier to remember, i.e., exclude one bean at each tasting.
        Obviously groups of 5 work too, but I only have 4 puck screens.
      </p>

      <p className="mt-2 leading-relaxed">
        The new "quad" tasting is just a ranked list of four beans, e.g., ABCD.
        From this single tasting we can infer 3 + 2 + 1 = 6 pairwise
        comparisons. Five tastings produce 30 votes for 10 unique pairings, so
        there is a definite winner. A "quad" dataset becomes a "pair" dataset by
        copying that winner across the diagonal. This is why older ranks may be
        odd, but newer ranks are always even.
      </p>

      <p className="mt-2 leading-relaxed">
        The sorting still works, even with conflicting evidence, because I only
        care about the top of the list. The best bean wins 4 vertical and 4
        horizontal cells. A rank of 8 means that I have compared this bean to
        every other bean, several times, and it won every time.
      </p>
    </div>
  );
}
