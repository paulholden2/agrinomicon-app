
export async function GET(_: Request, { params: { id }}: { params: { id: string }}) {
  const token = "pk.eyJ1IjoiYnJvbnNvbmhvbGRlbiIsImEiOiJjbGF2NTNpbWYwMmN3M3BrNzFyNmptdnU2In0.pLg0dJ1VsBjIkXRfAO9Tdg"
  const overlay = "geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22fill%22%3A%22%23ff0000%22%7D%2C%22geometry%22%3A%7B%22coordinates%22%3A%5B%5B%5B%5B-119.0713%2C35.2597%5D%2C%5B-119.0715%2C35.2578%5D%2C%5B-119.0729%2C35.2556%5D%2C%5B-119.0743%2C35.2545%5D%2C%5B-119.0743%2C35.2526%5D%2C%5B-119.0567%2C35.2526%5D%2C%5B-119.0567%2C35.2597%5D%2C%5B-119.0713%2C35.2597%5D%5D%5D%2C%5B%5B%5B-119.0742%2C35.2598%5D%2C%5B-119.0742%2C35.2549%5D%2C%5B-119.0729%2C35.2562%5D%2C%5B-119.0718%2C35.258%5D%2C%5B-119.0715%2C35.2597%5D%2C%5B-119.0742%2C35.2598%5D%5D%5D%5D%2C%22type%22%3A%22MultiPolygon%22%7D%7D%5D%7D)"
  const camera = "-119.0654,35.2561,12.3" // lng,lat,zoom,heading,pitch
  return fetch(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${overlay}/${camera}/200x200@2x?access_token=${token}`)
}
