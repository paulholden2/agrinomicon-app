// Monkeypatch to fix issue with Netlify functions:
// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './server.edge' is not defined by "exports" in /var/task/node_modules/react-dom/package.json
// See https://answers.netlify.com/t/next-js-app-directory-some-pages-are-500-internal-server-error-on-deployment/93203

const path = require("node:path")
const fs = require("fs")
const baseDir = process.cwd()

const prebuildScripts = async () => {
  const file = path.join(
    baseDir,
    "/node_modules",
    "next/dist/server/require-hook.js"
  )

  const content = await fs.promises.readFile(file, "utf-8")
  await fs.promises.writeFile(
    file,
    content.replace(
      "if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {",
      "if (true) {"
    )
  )
}

prebuildScripts()
