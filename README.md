# node+ts完成课程设计



## 一、背景

就于前几日，我们数据结构老师发布了课程设计：

**问题描述**建立身份证信息管理系统，能够进行身份证信息的录入、查找，保存，要求考虑查找效率，用二叉排序树存储信息。
具体功能有：
（1）能够进行身份证号码及相关信息的录入，相关信息包括姓名、地址和手机号；
（2）能够快速进行身份证号码的查询，并输出相关信息；
（3）可以修改身份证号码对应的其他信息，如姓名、地址；
（4）可以完成身份证信息的删除。
（5）信息保存到数据文件中。



但我一深思，我c语言差不多一个学期没用了，这不得凉凉。

![-91dab9a5ab46c26](https://gitee.com/yexiyue/picgo-images/raw/master/202112071854246.jpg)

当我回到寝室开始上号![11550153457764](https://gitee.com/yexiyue/picgo-images/raw/master/202112071854529.jpg)

看到熟悉的ts语法，我突发奇想，这能用c来写，为啥就不能用ts来写。

![11550095343534](https://gitee.com/yexiyue/picgo-images/raw/master/202112071856460.jpg)





二、途中曲折，一言难尽

```typescript
//# BST.ts文件

import { IDData, BNode } from "./dataType";

class BST {
  public root: BNode = null;
  public BNode = class implements BNode {
    data: IDData;
    left: BNode = null;
    right: BNode = null;
    constructor(data: IDData) {
      this.data = data;
    }
  }
  //向树中插入节点
  insert(data: IDData): void {
    const newNode = new this.BNode(data);

    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  //寻找插入节点
  private insertNode(root: BNode, node: BNode) {
    //向左查找
    if (Number(node.data.id) < Number(root.data.id)) {
      //如果左子树空直接插入
      if (root.left == null) {
        root.left = node
      } else {
        //如果不空继续递归调用
        this.insertNode(root.left, node)
      }
    } else {
      if (root.right == null) {
        root.right = node
      } else {
        this.insertNode(root.right, node)
      }
    }
  }

  //遍历数据(中序遍历)
  inorderTraversal(): IDData[] {
    const result: IDData[] = [];
    this.preorderTraversalNode(this.root, result);
    return result;
  }
  private preorderTraversalNode(node: BNode, result: IDData[]) {
    if (node == null) return result;
    this.preorderTraversalNode(node.left, result)
    result.push(node.data)
    this.preorderTraversalNode(node.right, result)
  }

  //查找
  search(id: IDData['id']): IDData {
    let node: BNode = this.root;
    while (node) {
      if (Number(id) < Number(node.data.id)) {
        node = node.left
      } else if (Number(id) > Number(node.data.id)) {
        node = node.right
      } else {
        return node.data
      }
    }
  }

  //删除
  delete(id: IDData['id']): IDData {
    let currentNode: BNode = this.root;
    let parentNode: BNode = null;
    let isLeftChild: boolean = true;
    //循环查找要删除的节点 currentNode，已及它的parrentNode,isLeftChild
    while (currentNode.data.id != id) {
      parentNode = currentNode;

      if (Number(id) < Number(currentNode.data.id)) {
        isLeftChild = true;
        currentNode = currentNode.left;
      } else {
        isLeftChild = false;
        currentNode = currentNode.right;
      }

      //找到最后没找到返回null
      if (currentNode == null) {
        return null;
      }
    }

    //1.删除的是叶子节点
    if (currentNode.left == null && currentNode.right == null) {
      if (currentNode == this.root) {
        this.root == null;
      } else if (isLeftChild) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
      //2.删除只有一个子节点的节点
    } else if (currentNode.right == null) {//currentNode只存在左节点
      //判断是否是根节点
      if (currentNode == this.root) {
        this.root = currentNode.left;
        //判断currentNode是不是父节点的左子叶
      } else if (isLeftChild) {
        //如果是就让父节点的左子叶重接仅剩是currentNode的子叶
        parentNode.left = currentNode.left
      } else {
        parentNode.right = currentNode.left
      }
    } else if (currentNode.left == null) {//currentNode只存在由节点
      //判断是否是根节点
      if (currentNode == this.root) {
        this.root = currentNode.right
        //判断currentNode是不是父节点的左子叶
      } else if (isLeftChild) {
        //如果是就让父节点的左子叶重接仅剩是currentNode的子叶
        parentNode.left = currentNode.right
      } else {
        parentNode.right = currentNode.right
      }
    //3.删除的是两个子节点的情况(后继)
    }else{
      //1.找到后续节点
      let successor=this.getSuccessor(currentNode);

      //2.判断是否为根节点
      if(currentNode==this.root){
        this.root=successor;
      }else if(isLeftChild){
        parentNode.left=successor;
      }else{
        parentNode.right=successor;
      }

      //3.将后续的左节点改为被删除的左节点
      successor.left=currentNode.left;
    }
    return currentNode.data;
  }

  private getSuccessor(delNode:BNode):BNode{
    //保存要找到的后续
    let successor:BNode=delNode;
    let current:BNode=delNode.right;
    let successorParent:BNode=delNode;

    while(current!=null){
      successorParent=successor;
      successor=current;
      current=current.left;
    }

    //判断寻找的后续节点是否直接就是要删除的节点的right
    if(successor!=delNode.right){
      successorParent.left=successor.right;
      successor.right=delNode.right
    }

    return successor
  }
}

export default BST
```

声明文件

```typescript
//# dataType.d.ts 文件
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
```

上面是完整的二叉排序树代码，由于刚开始接触数据结构对算法等都还不是很熟悉，

这里参考了

[JavaScript数据结构与算法](https://noran.nsacc.ltd/)



核心二叉树写好了，随之而来的就是以下几个问题：

**1.在哪里运行？**

**2.如何接收命令行参数？**

**3.存储在什么格式的数据文件里？**

**4.怎样存储到数据文件里？**

**5.怎么提高用户体验？**



## 二、发现问题并解决

**1.在哪里运行？**

毋庸置疑在node环境中运行，刚好前段时间也自学了一点进程，线程，net等模块。

我单纯就为了实践一下，把这次课程设计当作一份试卷检验一下以前学的知识。

**2.如何接收命令行参数？**

[node官网](http://nodejs.cn/learn/accept-input-from-the-command-line-in-nodejs)教程里演示了readLine模块，这是一种不错的方法，我用的[inquirer](https://www.npmjs.com/package/inquirer)。

**3.存储在什么格式的数据文件里？**

当时室友在和我回寝室的路上，我室友学的java，我问他，你准备用什么格式的文件保存数据，他说：“txt”。

但我转念一想，txt文本好像并无格式可言，要是能放Excel表格里就好了。

当我回去打开vs code看到了包描述文件package.json时，我觉得可以用json数据保存，json保存的数据里都是键值对，对象和数组，这样我就可以把每一条身份信息放一个对象再存数组里。

**4.怎样存储到数据文件里？**

这里我用的fs模块一次性读入，写入。

**5.怎么提高用户体验？**

写个服务器结合vue整个网页？我转念一想，还有20天期末考试了，写完这个还有时间复习吗？

然后还是选择了控制台打印，当我实践过程中发现打印json字符串数据量一多就没法看了，能不能打印表格呢？经过一番搜索，找到了[word-table](https://www.npmjs.com/package/word-table)这个包。并决定用[chalk](https://www.npmjs.com/package/chalk)尝试过自己做个cli的同学应该都知道，还有一个commander，但我这里并不打算用这个。



以下直接上代码

```typescript
//# src/CommandeLine/index.ts
import inquirer from "inquirer";
import chalk from "chalk";
enum Sex{
  male="男",
  female="女"
}
export async function init(){
  return await inquirer.prompt([
    {
      type:'list',
      name:'serve',
      message:chalk.yellow('请选择服务：'),
      choices:['录入身份信息','查询身份信息','查看所有数据','删除指定信息','修改指定信息','保存','退出']
    }
  ])
}

export async function input(){
  return await inquirer.prompt([
    {
      type:'input',
      name:'name',
      message:'请输入名字',
      default:"张三"
    },
    {
      type:'input',
      name:'age',
      message:'请输入年龄',
      default:'18'
    },
    {
      type:'confirm',
      name:'sex',
      message:'你的性别是男?',
      default:'男'
    },
    {
      type:'input',
      name:'id',
      message:chalk.greenBright('请输入身份证号'),
      validate(value){
        return !value.length ? new Error(chalk.red('身份证号不能为空')) : true
      }
    },
    {
      type:'input',
      name:'address',
      message:'请输入地址',
      default:'未知'
    },
    {
      type:'input',
      name:'telephone',
      message:'请输入电话号码'
    }
  ])
}

export async function confirm(){
  return await inquirer.prompt([{
    type:"confirm",
    name:"continueOperation",
    message:chalk.blue('是否继续?'),
    default:true
  }])
}

export async function search(){
  return await inquirer.prompt([
    {
      type:"input",
      name:'id',
      message:chalk.greenBright('请输入查询身份证号：'),
      validate(value){
        return !value.length ? new Error(chalk.red('身份证号不能为空')) : true
      }
    }
  ])
}

export async function modify(){
  return await inquirer.prompt([
    {
      type:'input',
      name:'name',
      message:'请输入名字',
      default:"张三"
    },
    {
      type:'input',
      name:'age',
      message:'请输入年龄',
      default:'18'
    },
    {
      type:'confirm',
      name:'sex',
      message:'你的性别是男?',
    },
    {
      type:'input',
      name:'address',
      message:'请输入地址',
      default:'未知'
    },
    {
      type:'input',
      name:'telephone',
      message:'请输入电话号码'
    }
  ])
}

export async function signout(){
  return await inquirer.prompt([
    {
      type:'confirm',
      message:chalk.green('是否退出'),
      name:'logout'
    }
  ])
}

```

在写的过程中进行模块化时，刚开始用的直接导出，没使用async,await，导致命令行提示问句时与预想不符合，后面尝试了一下回调的方法，但写起来容易造成回调地狱，由于inquirer直接支持promise所以我就写的这种。



### 简单说明一下：

**在main.ts文件中我对operation.ts 和index.ts创建了子进程，operation.ts主要进行对二叉树的操作，index.ts主要是进行数据表格打印。另外我在operation.ts开启了另一个子进程readWrite.ts，**

**这也是第一次尝试，在子进程中再开一个子进程。readWrite.ts进程主要是对data.json文件读写。**

以下是代码：

```typescript
// # src/child_process/operation.ts
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

```



```typescript
// # src/child_process/readWrite.ts
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
```



```typescript
// # src/child_process/index.ts
import WordTable from 'word-table';
import chalk from 'chalk';
import net from 'net'

let header = [
  "id",
  "name",
  "age",
  "sex",
  "telephone",
  "address"
]
let body = [];

//建立tcp通信(服务端)
const server = net.createServer()
//监听8000端口
server.listen(8000)

server.on('connection', socket => {
  //接收数据打印表格
  socket.on('data', (data) => {

    let msg = JSON.parse(data.toString())

    msg.forEach(e => {
      let arr = [];
      arr.push(e.id)
      arr.push(e.name)
      arr.push(e.age)
      arr.push(e.sex)
      arr.push(e.telephone)
      arr.push(e.address)
      body.push(arr)
    });
    const wt = new WordTable(header, body)

    //console.log(chalk.green('插入数据成功：'))

    console.log(chalk.bgGray.yellow(wt.string()))
    //重置body为下次打印准备

    body=[]
  })
})
```



## 三、总结

就这样我花了两天时间完成了我的课程设计，期间发现问题并解决问题，这是一个痛苦并快乐的事，我也发现了自己的一些问题：

一、typescript写的还不够好，在使用node自带模块时用成了anyscript

二、另外数据结构有待提升

三、在node执行以及node底层还有更多的地方等着去学习

在今年寒假，笔者会努力提升自己，再未来笔者也希望为社区做点贡献。

如果有一天，当你的努力配得上你的梦想，那么，你的梦想也绝对不会辜负你的努力。让自己尽可能变得优秀，当你为一件事情拼命努力的时候，全世界都会帮你！
