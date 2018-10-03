import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import React from 'react'

import CodePreviewer from 'or-code-previewer'
import { previewCode } from './util'

import Example from './example'

import './styles.scss'

storiesOf('or-sample', module)
  .addDecorator(
    withInfo({
      inline: true,
      propTables: [CodePreviewer],
      propTablesExclude: [Example],
      styles: {
        jsxInfoContent: {
          borderTop: 'none',
          margin: 0
        }
      }
    })
  )
  .add('basic', () => <CodePreviewer title="hello" lang="html" code={require('!!raw-loader!./test.html')} />, {
    info: {
      source: false
    }
  })
  .add('sample', () => <Example />, {
    info: {
      source: false,
      text: previewCode(require('!!raw-loader!./example.tsx'))
    }
  })
