import { useCallback } from 'react';
import marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-json.js';

export default function markdown(text) {
   const divRef = useCallback(el => {
      el.innerHTML = marked(text, {
         highlight: (code, lang) => {
            let language = !lang || lang === 'html' ? 'markup' : lang;
            if (!Prism.languages[language]) language = 'markup';
            return `<span class='prism-code'>${Prism.highlight(code, Prism.languages[language])}</span>`;
         }
      });
   }, []);

   return <div ref={divRef} />;
}
