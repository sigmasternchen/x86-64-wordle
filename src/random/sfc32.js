export const newSFC32 = seed => {
    // see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#sfc32

    let a = 0 | 0;
    let b = seed >> 0;
    let c = seed >> 16; // crutch because JS doesn't have 64 bit ints
    let d = 1 | 0;

    const next = () => {
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = c << 21 | c >>> 11;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }

    for (let i = 0; i < 12; i++) {
        next();
    }

    return next;
}