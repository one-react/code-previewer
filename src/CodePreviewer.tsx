import clx from 'classnames'
import React, { PureComponent } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Highlight from 'react-highlight'

import 'highlight.js/styles/atom-one-light.css'

class CopyBtn extends PureComponent<
  {
    source: string
  },
  {
    copied: boolean
  }
> {
  timeoutId: NodeJS.Timer

  state = {
    copied: false
  }

  render() {
    const { copied } = this.state
    return (
      <CopyToClipboard text={this.props.source} onCopy={this.handleCopy}>
        <button className="copy-btn">
          <div className={clx('copy-btn-text', { 'copy-btn-copied': copied })}>
            <div style={{ marginBottom: 6 }}>Copied!</div>
            <div>Copy</div>
          </div>
        </button>
      </CopyToClipboard>
    )
  }

  handleCopy = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.setState(
      {
        copied: true
      },
      () => {
        this.timeoutId = setTimeout(() => {
          this.setState({ copied: false })
        }, 2000)
      }
    )
  }
}

interface Props {
  /**
   * source code as text
   */
  code: string;
  /**
   * lang of source code
   */
  lang: string;
  /**
   * title on the top of sourc code
   */
  title?: string;
}

export class CodePreviewer extends PureComponent<Props, {}> {
  render() {
    const { title, code, lang } = this.props
    return (
      <div className="or-code-previewer">
        { title && <h1 className="or-code-previewer-title">{title}</h1> }
        <CopyBtn source={code} />
        <Highlight className={lang}>{code}</Highlight>
      </div>
    )
  }
}
