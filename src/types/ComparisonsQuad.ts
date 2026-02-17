// 5 groups of 4! = 24 permutations, best > ... > worst
type PermExA =
    "bcde" | "bced" | "bdce" | "bdec" | "becd" | "bedc" |
    "cbde" | "cbed" | "cdbe" | "cdeb" | "cebd" | "cedb" |
    "dbce" | "dbec" | "dcbe" | "dceb" | "debc" | "decb" |
    "ebcd" | "ebdc" | "ecbd" | "ecdb" | "edbc" | "edcb";

type PermExB =
    "acde" | "aced" | "adce" | "adec" | "aecd" | "aedc" |
    "cade" | "caed" | "cdae" | "cdea" | "cead" | "ceda" |
    "dace" | "daec" | "dcae" | "dcea" | "deac" | "deca" |
    "eacd" | "eadc" | "ecad" | "ecda" | "edac" | "edca";

type PermExC =
    "abde" | "abed" | "adbe" | "adeb" | "aebd" | "aedb" |
    "bade" | "baed" | "bdae" | "bdea" | "bead" | "beda" |
    "dabe" | "daeb" | "dbae" | "dbea" | "deab" | "deba" |
    "eabd" | "eadb" | "ebad" | "ebda" | "edab" | "edba";

type PermExD =
    "abce" | "abec" | "acbe" | "aceb" | "aebc" | "aecb" |
    "bace" | "baec" | "bcae" | "bcea" | "beac" | "beca" |
    "cabe" | "caeb" | "cbae" | "cbea" | "ceab" | "ceba" |
    "eabc" | "eacb" | "ebac" | "ebca" | "ecab" | "ecba";

type PermExE =
    "abcd" | "abdc" | "acbd" | "acdb" | "adbc" | "adcb" |
    "bacd" | "badc" | "bcad" | "bcda" | "bdac" | "bdca" |
    "cabd" | "cadb" | "cbad" | "cbda" | "cdab" | "cdba" |
    "dabc" | "dacb" | "dbac" | "dbca" | "dcab" | "dcba";

export default interface ComparisonsQuad {
    "exclude-a": PermExA;
    "exclude-b": PermExB;
    "exclude-c": PermExC;
    "exclude-d": PermExD;
    "exclude-e": PermExE;
};