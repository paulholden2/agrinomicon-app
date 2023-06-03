import PropTypes from "prop-types"
import RichText from "@/components/Contentful/RichText"
import ClassificationHyperlink from "@/components/Contentful/ClassificationHyperlink"

export default async function Content({ entry }: { entry: any }) {
  switch (entry.sys.contentType.sys.id) {
    case "classificationHyperlink":
      return <ClassificationHyperlink entry={entry} />
    default:
      return (
        <div>
          {entry.fields.body.content.map((section: any, idx: number) => <RichText key={idx} section={section} />)}
        </div>
      )
  }
}

Content.propTypes = {
  entry: PropTypes.object
}
