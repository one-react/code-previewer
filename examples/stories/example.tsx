import CodePreviewer from 'or-code-previewer'
import React, { PureComponent } from 'react'

export default class Example extends PureComponent<{}, {}> {
  render() {
    return (
      <CodePreviewer title="Hello world" lang="jsx" code={`<Component title="123" />`} />
    )
  }
}
