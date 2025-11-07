declare module 'react-katex' {
  import { Component } from 'react'

  export class BlockMath extends Component<{ math: string }> {}
  export class InlineMath extends Component<{ math: string }> {}
}
