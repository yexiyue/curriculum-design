import fs from 'fs'
import util from 'util'
import path from 'path'
const read=util.promisify(fs.readFile);
const write=util.promisify(fs.writeFile);

async function readFile(path:string){
  return await read(path);
}

async function writeFile(path:string,data:any){
  return await write(path,data);
}

let main=async()=>{
  let res=await readFile(path.join(__dirname,'../data.json'))
  process.send(res.toString())

  process.on('message',async(msg:string)=>{
    await write(path.join(__dirname,'../data.json'),msg)
  })
}

main()