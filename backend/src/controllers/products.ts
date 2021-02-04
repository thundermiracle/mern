import { Status } from "https://deno.land/x/oak/mod.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import DBProducts from "../../DB/products.ts";

export function getProducts({ response }: RouterContext) {
  response.body = {
    success: true,
    data: DBProducts,
  };
}

export function getProduct({ response, params }: RouterContext) {
  const product = DBProducts.find((product) => product._id === params.id);
  if (product) {
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: "Not Found",
    };
  }
}
