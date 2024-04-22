import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { visit } from "unist-util-visit"

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

const escapeHtml = (str: string) => str.replace(/[&<>"']/g, c => escapeMap[c])

export const mermaid: RemarkPlugin<[]> = () => tree => {
  visit(tree, "code", node => {
    if (node.lang == undefined) return
    
    if (node.lang.toLowerCase() !== "mermaid") return

    // @ts-ignore
    node.type = "html"
    node.value = `
      <div class="mermaid">
        <p>Loading graph...</p>
        <pre class="mermaid-src">${escapeHtml(node.value)}</pre>
        </div>
    `
  })
}
