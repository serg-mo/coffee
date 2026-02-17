import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function isTransitivelyComplete(dataset: { comparisons: any, names: string[] }) {
    const names = Object.keys(dataset.names); // a, b, c, d, e
    const comparisons = dataset.comparisons;

    const messages = [];

    for (let a of names) {
        for (let b of names) {
            for (let c of names) {
                if (
                    comparisons[a][b] === a && comparisons[b][a] === a && // a > b AND b < a
                    comparisons[b][c] === b && comparisons[c][b] === b && // b > c AND c < b
                    comparisons[a][c] !== a && comparisons[c][a] !== a    // BUT NOT a > c AND c < a
                ) {
                    // NOTE: two answers for each pair must agree or be ignored (ab vs ba)
                    // TODO: highlight the offending cells
                    messages.push(`${a} > ${b} and ${b} > ${c} BUT NOT ${a} > ${c}`);
                }
            }
        }
    }

    return messages
}

function isPair(comparisons: any) {
    // 5 * 4 pairs, opposite sides of the diagonal, a vs b and b vs a
    return comparisons.length == 20
}

function isQuad(comparisons: any) {
    // 5 quads, with 3 direct comparisons for each unique pair
    // abcd, abce, abde, acde, bcde (exclude one bean on every tasting)

    return comparisons.length == 5
}

export default function DatasetCheck(dataset: { comparisons: any, names: string[] }) {
    // NOTE: this has to work for pairwise and quad comparisons, i.e., convert quad to pair
    const messages = isTransitivelyComplete(dataset);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="cursor-pointer" onClick={() => console.log(messages)}>
                {messages.length === 0 ? (
                    <FiCheckCircle title="Transitively Complete" />
                ) : (
                    <FiXCircle title="Not Transitively Complete" />
                )}
            </div>
        </div>
    );
}
