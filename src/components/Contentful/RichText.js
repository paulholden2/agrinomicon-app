import Link from "next/link"
import Image from "next/image"
import PropTypes from "prop-types"
import classNames from "classnames"
import Content from "@/components/Contentful/Content"

export const Text = ({ section }) => {
  if (!section.marks) return <span>{section.value}</span>

  const classes = classNames({
    "font-bold": section.marks.find(({ type }) => type === "bold"),
    "italic": section.marks.find(({ type }) => type === "italic"),
    "underline": section.marks.find(({ type }) => type === "underline"),
  })

  if (section.marks.find(({ type }) => type === "superscript")) {
    return <sup className={classes}>{section.value}</sup>
  } else if (section.marks.find(({ type }) => type === "subscript")) {
    return <sub className={classes}>{section.value}</sub>
  } else if (section.marks.find(({ type }) => type === "code")) {
    return <div className="border-2 border-slate-200 dark:border-slate-700 rounded-md p-4 overflow-scroll font-mono"><pre>{section.value}</pre></div>
  } else {
    return <span className={classes}>{section.value}</span>
  }
}

export default function RichText({ section, inline, table }) {
  const content = section.content?.map((subsection, idx) =>
    <RichText
      key={idx}
      section={subsection}
      inline={inline || section.nodeType === "list-item"}
      table={table || ["table-row", "table-cell", "table-header-cell", "table"].includes(section.nodeType)}
    />
  ).filter((s) => {
    return true
  })

  switch (section.nodeType) {
    case "document":
      if (inline) {
        return content
      } else {
        return <div>{content}</div>
      }
    case "text":
      if (section.value === "") return null
      return <Text section={section} />
    case "paragraph":
      if (!section.content.find((s) => !!s.value)) { // empty paragraph
        return null
      } else if (table) {
        return content
      } else if (inline) {
        return <span>{content}</span>
      } else {
        return <p className={classNames("whitespace-pre-wrap", {
          "inline-block": inline,
          "my-6": !inline,
        })}>{content}</p>
      }
    case "hr":
      return <hr className="border-1 border-slate-300 dark:border-slate-700" />
    case "heading-1":
      return <h2 className="text-5xl font-bold">{content}</h2>
    case "heading-2":
      return <h3 className="text-4xl font-bold">{content}</h3>
    case "heading-3":
      return <h4 className="text-3xl font-bold">{content}</h4>
    case "heading-4":
      return <h5 className="text-2xl font-bold">{content}</h5>
    case "heading-5":
      return <h5 className="text-xl font-medium">{content}</h5>
    case "heading-6":
      return <h5 className="text-lg font-medium">{content}</h5>
    case "unordered-list":
      return <ul className="list-disc list-inside my-2">{content}</ul>
    case "ordered-list":
      return <ol className="list-decimal list-inside my-2">{content}</ol>
    case "list-item":
      return <li>{content}</li>
    case "hyperlink":
      return <Link className="font-medium hover:text-slate-700 dark:hover:text-slate-200" href={section.data.uri}>{content}</Link>
    case "embedded-entry-inline":
      return <Content entry={section.data.target} />
    case "embedded-asset-block": {
      const block = section.data.target
      const file = block.fields.file
      return <Image alt={block.description || "Image"} className="rounded-md" src={`https:${file.url}`} width={file.details.image.width} height={file.details.image.height} />
    }
    case "blockquote":
      return <blockquote className="border-l-[0.5rem] ml-2 pl-4 border-slate-200 dark:border-slate-700">{content}</blockquote>
    case "table":
      return <table className="my-4 border-2 border-slate-200 dark:border-slate-700 overflow-hidden inline-block rounded-md"><tbody>{content}</tbody></table>
    case "table-row":
      return <tr className="first:bg-slate-200 first:dark:bg-slate-800">{content}</tr>
    case "table-header-cell":
      return <th className="p-4 border-r-2 border-b-2 last:border-r-0 border-slate-300 dark:border-slate-700">{content}</th>
    case "table-cell":
      return <td className="p-4 border-r-2 last:border-r-0 border-slate-200 dark:border-slate-700">{content}</td>
    default:
      return null
  }
}

RichText.propTypes = {
  inline: PropTypes.bool,
  section: PropTypes.object,
  table: PropTypes.bool
}
