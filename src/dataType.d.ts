export declare enum Sex{
  male="男",
  female="女"
}

export declare interface IDData{
  id:string,
  name:string,
  telephone:string,
  address:string,
  sex:Sex,
  age:number
}

export declare interface BNode{
  data:IDData,
  left:BNode,
  right:BNode
}
