import ChildProcess from "child_process";
import { init, input, confirm, search ,modify,signout} from './src/CommandLine/index'
import { IDData } from "./src/dataType";
const child1 = ChildProcess.fork('./src/child_process/operation')
const child2 = ChildProcess.fork('./src/child_process/index')
const main = async () => {
  let r1 = await init()
  while (r1.serve != '退出') {
    if (r1.serve == '录入身份信息') {
      //创建数组保存数据
      let res: IDData[] = []
      let r3;
      do {
        let r2 = await input()
        r2.sex=r2.sex?'男':'女';
        res.push(r2)
        r3 = await confirm()
      } while (r3.continueOperation);
      //向子进程operation发送数据
      child1.send({
        type:'录入',
        data:res
      })

    } else if (r1.serve == '查询身份信息') {
      const  {id} = await search()
      console.log(id)
      //向子进程operation发送查询信号
      child1.send({
        type: '查询',
        data: id
      })
    } else if (r1.serve == '查看所有数据') {
      child1.send({
        type:'查询所有',
        data:null
      })
    }else if(r1.serve == '删除指定信息'){
      const {id}=await search()
      //向子进程operation发送删除信号
      child1.send({
        type: '删除',
        data: id
      })
    }else if(r1.serve == '修改指定信息'){
      const {id}=await search()

      let r2 = await modify()
      r2.sex=r2.sex?'男':'女';
      //向子进程operation发送修改信号
      child1.send({
        type: '修改',
        data: id,
        IdData:r2
      })
    }else if(r1.serve == '保存'){

      //向子进程operation发送保存信号
      child1.send({
        type: '保存',
        data:null
      })
      let r1=await signout()
      if(r1.logout){
        process.exit()
      }
    }

    r1 = await init()
    if (r1.serve == '退出') {
      process.exit()
    }
  }
  process.exit()
}

main()



