import Classification from "@/types/Classification"

type Variety = {
  id: String,
  denomination: String,
  classification_id: String,
  classification?: Classification
}

export default Variety
