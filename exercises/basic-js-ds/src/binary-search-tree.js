const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) return new Node(data);

      if (data === node.data) return node;

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return isExistNode(this.rootNode, data);

    function isExistNode(rootNode, data) {
      if (!rootNode) return false;
      if (rootNode.data === data) return true;

      let nextNode = data < rootNode.data ? rootNode.left : rootNode.right;
      return isExistNode(nextNode, data);
    }
  }

  find(data) {
    return findNodeValue(this.rootNode, data);

    function findNodeValue(rootNode, data) {
      if (!rootNode) return null;
      if (rootNode.data === data) return rootNode;

      let nextNode = data < rootNode.data ? rootNode.left : rootNode.right;
      return findNodeValue(nextNode, data);
    }
  }

  remove(data) {
    this.root = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      function minNode(node) {
        return !node.left ? node : minNode(node.left);
      }

      if (!node) {
        return null;
        // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
        // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
        // если данные такие как данные корня, удаляем узел
      } else {
        // удаляем узел без потомков (листовой крайний узел (leaf))
        if (!node.left && !node.right) {
          node = null;
          return node;
        }
        // удаляем узел с одним потомком
        if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }
        // удаляем узел с двумя потомками
        // minNode правого поддерева хранится в новом узле
        let newNode = minNode(node.right);
        node.data = newNode.data;
        node.right = removeNode(node.right, newNode.data);
        return node;
      }
    }
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode?.data || null;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode?.data || null;
  }
}

module.exports = {
  BinarySearchTree,
};
