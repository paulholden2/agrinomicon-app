export type Field = String | Node | Entry | Media

export type Entry = {
  metadata: any,
  sys: {
    space:  { sys: Sys },
    id: String,
    type: String,
    createdAt: String,
    updatedAt: String,
    environment: { sys: Sys },
    revision: Number,
    contentType: { sys: Sys },
    locale: String
  },
  fields: {
    [key: string]: Field | Field[]
  }
}

export type Sys = {
  type: String,
  linkType: String,
  id: String
}

export type Node = {
  nodeType: String,
  data: any,
  content: Node[],
  marks?: any[]
}

export type Media = {
  url: String,
  details: {
    size: Number,
    image: {
      width: Number,
      height: Number
    }
  },
  fileName: String,
  contentType: String
}
