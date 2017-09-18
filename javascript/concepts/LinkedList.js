class Node {
  /**
   * @param {any} data
   * @param {Node} next
   */
  constructor(data, next = null) {
    Object.assign(this, { data, next })
  }
}

class LinkedList {
  /**
   * @param {Node} head
   */
  constructor(head = null) {
    Object.assign(this, { head })
  }

  get isEmpty() {
    return this.head === null
  }

  get size() {
    let current = this.head,
      size = 0
    while (current !== null) {
      size++
      current = current.next
    }
    return size
  }

  get lastNode() {
    if (this.isEmpty) {
      return this.head
    }
    let current = this.head
    while (current.next !== null) {
      current = current.next
    }
    return current
  }

  /**
   * @param {Node} node
   */
  prepend(node) {
    node.next = this.head
    this.head = node
  }

  /**
   * @param {Node} node
   */
  append(node) {
    if (this.isEmpty) {
      this.head = node
      return
    }

    this.lastNode.next = node
  }

  /**
   * @param {Node} node
   */
  remove(node) {
    if (!this.contains(node)) {
      return
    }
    if (this.head === node) {
      this.head = this.head.next
      return
    }
    let current = this.head,
      prev = null
    while (current !== node) {
      ;[prev, current] = [current, current.next]
    }
    prev.next = current.next
  }

  /**
   * @param {Node} node
   */
  contains(node) {
    let current = this.head
    while (current !== null) {
      if (current === node) return true
      current = current.next
    }
    return false
  }

  print() {
    let output = "[HEAD]",
      current = this.head
    if (this.isEmpty) {
      return (output += " null")
    }
    while (current !== null) {
      output += ` --> ${current.data}`
      current = current.next
    }
    return output
  }
}
