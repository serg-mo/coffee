import React from "react";

export default function ComparisonsMatrix({ name, data }) {
    let { names, comparisons } = data
    names = Object.keys(names);

    const getDiagonalCell = (name) =>
        Object.values(comparisons)
            .flatMap(comparisons => Object.values(comparisons))
            .filter(winner => winner === name)
            .length;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center capitalize">{name}</h2>
            <div className="overflow-x-auto">
                <table className="m-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            {['', ...names].map((name) => (
                                <th key={name} className="border border-gray-300 w-10 h-10 bg-gray-100">
                                    {name.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {names.map((a) => (
                            <tr key={a}>
                                <td className="border border-gray-300 p-2 font-bold bg-gray-100 text-center">
                                    {a.toUpperCase()}
                                </td>
                                {names.map((b) => (
                                    <td
                                        key={b}
                                        className={`border border-gray-300 w-10 h-10 text-center ${a === b ? "bg-gray-200" : ""}`}
                                    >
                                        {a === b ? getDiagonalCell(a) : data.comparisons[a][b].toUpperCase()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};