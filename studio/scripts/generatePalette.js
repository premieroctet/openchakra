const _ =require('lodash')
const process=require('process')

let temp
let result={}
process.argv.forEach(function (val, index, array) {
    if(index>1){
        if(index=='2'){
            result.name=val
        }else if(index%2==1){
            temp=val
        }else{
            result[temp]=generateShades(val)
        }
    }
    return result
  });

function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b };
}

function RGBToHex(r, g, b) {
    r = Math.max(0, Math.min(255, r))
    g = Math.max(0, Math.min(255, g))
    b = Math.max(0, Math.min(255, b))
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

function generateShades(hexColor) {
    const baseColor = hexToRGB(hexColor)
    const shades={}
    const factors = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8]
    _.reverse(factors)
    factors.map(factor => {
        const r = Math.round(baseColor.r * factor)
        const g = Math.round(baseColor.g * factor)
        const b = Math.round(baseColor.b * factor)
        const hue=1000 - factor*500
        shades[hue]=RGBToHex(r,g,b)
    });
    return shades
}

console.log(result.name)
delete result.name
console.log(result)