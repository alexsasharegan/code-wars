import Node from "./Node"

class AVLTree {
  comparator: (a: any, b: any) => number
  private $root: Node
  private $size: number

  constructor(comparator: () => number) {
    Object.assign(this, {
      $root: null,
      $size: 0
    })

    this.comparator = comparator || AVLTree.numberCompare
  }

  get(key: number) {
    return this.$root ? this.$get(key, this.$root).data : null
  }

  $get(key: number, root: Node): Node {
    if (key === root.key) {
      return root
    }

    if (this.comparator(key, root.key) < 0) {
      return root.left ? this.$get(key, root.left) : null
    }

    return root.right ? this.$get(key, root.right) : null
  }

  insert(key: number, data: any): void {
    this.$root = this.$insert(key, data, this.$root)
    this.$size++
  }

  private $insert(key: number, data: any, root: Node): Node {
    if (!root) {
      return new Node(key, data)
    }

    if (this.comparator(key, root.key) > 0) {
      root.right = this.$insert(key, data, root.right)
    } else if (this.comparator(key, root.key) < 0) {
      root.left = this.$insert(key, data, root.left)
    } else {
      // It's a duplicate so insertion failed, decrement size to make up for it
      this.$size--
      return root
    }

    // Update height and rebalance tree
    root.height = Math.max(root.getLeftHeight(), root.getRightHeight()) + 1
    const balanceState = AVLTree.getBalanceState(root)

    if (balanceState === AVLTree.UNBALANCED_LEFT) {
      if (this.comparator(key, root.left.key) < 0) {
        // Left left case
        root = root.rotateRight()
      } else {
        // Left right case
        root.left = root.left.rotateLeft()
        return root.rotateRight()
      }
    }

    if (balanceState === AVLTree.UNBALANCED_RIGHT) {
      if (this.comparator(key, root.right.key) > 0) {
        // Right right case
        root = root.rotateLeft()
      } else {
        // Right left case
        root.right = root.right.rotateRight()
        return root.rotateLeft()
      }
    }

    return root
  }

  delete(key: number) {
    this.$root = this.$delete(key, this.$root)
    this.$size--
  }

  private $delete(key: number, root: Node): Node {
    // Perform regular BST deletion
    if (root === null) {
      this.$size++
      return root
    }

    if (this.comparator(key, root.key) < 0) {
      // The key to be deleted is in the left sub-tree
      root.left = this.$delete(key, root.left)
    } else if (this.comparator(key, root.key) > 0) {
      // The key to be deleted is in the right sub-tree
      root.right = this.$delete(key, root.right)
    } else {
      // root is the node to be deleted
      if (!root.left && !root.right) {
        root = null
      } else if (!root.left && root.right) {
        root = root.right
      } else if (root.left && !root.right) {
        root = root.left
      } else {
        // Node has 2 children, get the in-order successor
        var inOrderSuccessor = AVLTree.minValueNode(root.right)
        root.key = inOrderSuccessor.key
        root.right = this.$delete(inOrderSuccessor.key, root.right)
      }
    }

    if (root === null) {
      return root
    }

    // Update height and rebalance tree
    root.height = Math.max(root.getLeftHeight(), root.getRightHeight()) + 1
    var balanceState = AVLTree.getBalanceState(root)

    if (balanceState === AVLTree.UNBALANCED_LEFT) {
      // Left left case
      if (
        AVLTree.getBalanceState(root.left) === AVLTree.BALANCED ||
        AVLTree.getBalanceState(root.left) === AVLTree.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return root.rotateRight()
      }
      // Left right case
      if (AVLTree.getBalanceState(root.left) === AVLTree.SLIGHTLY_UNBALANCED_RIGHT) {
        root.left = root.left.rotateLeft()
        return root.rotateRight()
      }
    }

    if (balanceState === AVLTree.UNBALANCED_RIGHT) {
      // Right right case
      if (
        AVLTree.getBalanceState(root.right) === AVLTree.BALANCED ||
        AVLTree.getBalanceState(root.right) === AVLTree.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return root.rotateLeft()
      }
      // Right left case
      if (AVLTree.getBalanceState(root.right) === AVLTree.SLIGHTLY_UNBALANCED_LEFT) {
        root.right = root.right.rotateRight()
        return root.rotateLeft()
      }
    }

    return root
  }

  contains(key: number): boolean {
    return Boolean(this.$root && this.$get(key, this.$root))
  }

  findMinimum(): number {
    return AVLTree.minValueNode(this.$root).key
  }

  findMaximum(): number {
    return AVLTree.maxValueNode(this.$root).key
  }

  get size() {
    return this.$size
  }

  get isEmpty() {
    return !this.$size
  }

  static getBalanceState(node: Node): number {
    return AVLTree.BALANCED_STATE[node.getLeftHeight() - node.getRightHeight()] || AVLTree.BALANCED
  }

  static minValueNode(root: Node): Node {
    let current = root
    while (current.left) {
      current = current.left
    }
    return current
  }

  static maxValueNode(root: Node): Node {
    let current = root
    while (current.right) {
      current = current.right
    }
    return current
  }

  static numberCompare(a: number, b: number): number {
    return a - b
  }

  static stringCompare(a: string, b: string): number {
    return a.localeCompare(b)
  }

  static get BALANCED_STATE() {
    return {
      [AVLTree.UNBALANCED_RIGHT]: 1,
      [AVLTree.SLIGHTLY_UNBALANCED_RIGHT]: 2,
      [AVLTree.BALANCED]: 3,
      [AVLTree.SLIGHTLY_UNBALANCED_LEFT]: 4,
      [AVLTree.UNBALANCED_LEFT]: 5
    }
  }
  static get UNBALANCED_RIGHT() {
    return -2
  }
  static get SLIGHTLY_UNBALANCED_RIGHT() {
    return -1
  }
  static get BALANCED() {
    return 0
  }
  static get SLIGHTLY_UNBALANCED_LEFT() {
    return 1
  }
  static get UNBALANCED_LEFT() {
    return 2
  }
}

export default AVLTree
