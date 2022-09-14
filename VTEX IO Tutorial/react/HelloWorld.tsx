import React, { Component } from 'react'

interface HelloProps {
  name?: string
  font: string
}
class HelloWorld extends Component<HelloProps> {
  constructor(props: HelloProps | Readonly<HelloProps>) {
    super(props)
    this.state = {}
  }

  public render(): JSX.Element {
    return (
      <div className="tc">
        <h2 className={this.props.font}>Olá, {this.props.name}!</h2>
        <p className="i">Este é um ambiente de testes!</p>
      </div>
    )
  }
}

export default HelloWorld
