import BST from '../BST'
import net from 'net'
import ChildProcess from 'child_process'
import path from 'path'
//创建二叉树
const bst = new BST()
//必须用绝对路径(在子进程中当前工作文件变了所有相对路径找不到文件)
const child=ChildProcess.fork(path.join(__dirname,'readWrite'))

//建立tcp通信(客户端)
const client = net.createConnection({
  port: 8000,
  host: 'localhost'
})

client.on('connect', () => {
  //建立连接后在操作数据
  child.on('message',(data:any)=>{
    //将json字符串解析成数组
    data=JSON.parse(data)
    //对数组遍历把每一项插入树中
    data.forEach(i => {
      bst.insert(i)
    });
  })
  process.on('message', (msg: any) => {
    if (msg.type == '查询') {
      //console.log(msg.data)

      const res1 = bst.search(msg.data)
      let res = [];
      res.push(res1)
      client.write(JSON.stringify(res))

    } else if (msg.type == '查询所有') {

      //保存中序遍历数据
      const res = bst.inorderTraversal()
      //向子进程2发送数据打印表格
      client.write(JSON.stringify(res))

    } else if (msg.type == '录入') {

      //向二叉树执行插入
      msg.data.forEach(i => {
        bst.insert(i)
      });

    } else if (msg.type == '删除') {

      bst.delete(msg.data)

    }else if (msg.type == '修改') {
      //先删除
      bst.delete(msg.data)
      //再重新写入
      //插入id
      msg.IdData.id=msg.data
      bst.insert(msg.IdData)
    }else if (msg.type == '保存') {
      //向子进程发送写入文件信号
      let res:any=bst.inorderTraversal()
      res=JSON.stringify(res,null,'\t')
      child.send(res)
    }
  })
})

client.on('data', (data) => {
  console.log(data.toString())
})


