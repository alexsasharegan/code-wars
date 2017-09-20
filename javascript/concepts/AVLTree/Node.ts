class Node {
  key: number
  data: any
  left: Node
  right: Node
  height: number

  constructor(key: number, data: any) {
    Object.assign(this, {
      key,
      data,
      left: null,
      right: null,
      height: null
    })
  }

  /**
   * Performs a right rotate on this node.
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> b.rotateRight() -> c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @return {Node} The root of the sub-tree; the node where this node used to be.
   */
  rotateRight(): Node {
    const newRoot = this.left
    ;[this.left, newRoot.right] = [newRoot.right, this]
    this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1
    newRoot.height = Math.max(newRoot.getLeftHeight(), this.height) + 1
    return newRoot
  }

  /**
   * Performs a left rotate on this node.
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> a.rotateLeft() ->   a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @return {Node} The root of the sub-tree; the node where this node used to be.
   */
  rotateLeft(): Node {
    const newRoot = this.right
    ;[this.right, newRoot.left] = [newRoot.left, this]
    this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1
    newRoot.height = Math.max(newRoot.getRightHeight(), this.height) + 1
    return newRoot
  }

  getLeftHeight(): number {
    return this.left ? this.left.height : -1
  }
  getRightHeight(): number {
    return this.right ? this.right.height : -1
  }
}

export default Node
