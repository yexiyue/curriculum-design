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



