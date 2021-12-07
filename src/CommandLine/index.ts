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
