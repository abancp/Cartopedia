const rate = 5
const product = {
    rating: {
        rate: 0,
        totalRatings: 3790+900,
        rates: [2373, 651, 268, 977, 421]
    }
}
const rates = product.rating.rates
var totalValueSum = 0
rates[rate - 1]++
product.rating.rates = rates
product.rating.totalRatings++
for (var i = 5; i > 0; i--) {
    totalValueSum += rates[5 - i] * i
}
console.log(totalValueSum/product.rating.totalRatings)
console.log(product);