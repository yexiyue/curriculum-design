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