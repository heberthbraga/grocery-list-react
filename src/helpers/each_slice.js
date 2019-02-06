export const eachSlice = (collection, size) => {
  let slicedProducts = [];
  
  for (var i = 0, l = collection.length; i < l; i += size){
    slicedProducts.push(collection.slice(i, i + size))
  }

  return slicedProducts;
}