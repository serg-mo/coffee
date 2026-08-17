import React from "react";

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
