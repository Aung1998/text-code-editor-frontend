import {useEffect, useRef} from 'react'

import {Annotation, EditorState} from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";

export const Editor =({code="", onChange})=>{

  const External = Annotation.define();

  const ref = useRef()
  const editor = useRef()

  const listenerExtension = EditorView.updateListener.of((update) => {
    const state = update.state
    const doc = state.doc.toString()
    if (typeof onChange == 'function' && update.docChanged){
      onChange({ target: { value: doc } });
    }
  })

  useEffect(() => {
    if (!ref.current) return

    if (!editor.current){
      editor.current = new EditorView({
        state: EditorState.create({
          doc: code,
          extensions: [
            basicSetup,
            python(),
            keymap.of(defaultKeymap),
            listenerExtension
          ],
        }),
        parent: ref.current
      })
    }

    return () => {
      if (!ref.current){
        editor.current?.destroy()
        editor.current = null
      }
    }
    },[External, code, listenerExtension, onChange])

  return <div className={'text-left'} ref={ref}></div>
}