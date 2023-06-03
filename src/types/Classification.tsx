type Classification = {
  id: String,
  kingdom: String,
  genus: String,
  species: String,
  binomial_name: String,
  common_names?: String[],
  aliases?: String[]
}

export default Classification
