let strs = ["kochi", "koyilandi", "kondotti", "kottakkal"]
let res = ""
let tres = strs[0][0]
for (var i = 0; i < strs[0].length; i++) {
    for (var j = 0; j < strs.length; j++) {
        if (strs[j][0] === strs[j][i]) {
            res += strs[0][i]
        }
    }
}
console.log(res)

