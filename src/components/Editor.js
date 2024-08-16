import {useEffect, useRef, useState} from 'react'

import {Annotation, EditorState} from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";
import {updateFile} from "../util/codeFilesManagement";

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
    console.log(update.view)
  })

  useEffect(() => {
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

      return () => {
        editor.current.destroy()
        editor.current = null
      }
    },
    [External, code, listenerExtension, onChange])

  useEffect(() => {
    if (editor.current && editor.current.state.doc.toString() !== code){
      editor.current.dispatch({
         changes: { from: 0, to: editor.current.state.doc.length, insert: "" }
      })
    }
  }, [code]);

  return <div className={'text-left'} ref={ref}></div>
}