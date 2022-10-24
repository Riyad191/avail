

// const arr = [
//     11,"fda",431,"fada"
// ] 

const arr = [
    {"aahlkhlka": "ggg"},
    {"54252": "76474"},
    {"5333": "666"},
    {"aaa": "ggg"},
] 

const r = () => {

    return arr.map(a => +Object.keys(a))
    .filter(a => typeof a == "number")
}

console.log(r());

console.log(parseFloat("40"));

