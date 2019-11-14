import JSZip from 'jszip'
import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca
import Kotlin from 'kotlin'
var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;

export const resolveZipFile = async (file) => {
  const facade = new odca.Facade()
  let schemas
  await parseFile(file).then((results) => {
    schemas = facade.deserializeSchemas(results)
  })

  return schemas
}

const parseFile = async (file) => {
    const jszip = new JSZip()
    const results = []
    const promises = []
    let schemaNames

    await jszip.loadAsync(file).then((zip) => {
        schemaNames = Object.values(zip.files)
            .filter((f) => f.dir)
            .map((dir) => dir.name.replace("/", ""))

        schemaNames.forEach((name) => {
            const p = []

            p.push({
                name: "schemaBase",
                value: zip.file(`${name}.json`).async("string")
            })
            let overlayNames = Object.values(zip.files)
                .filter((f) => !f.dir && f.name.match(`${name}/`))
                .map((overlay) => overlay.name)

            overlayNames.forEach((overlayName) => {
                p.push({
                    name: overlayName.replace(`${name}/`, ""),
                    value: zip.file(overlayName).async("string")
                })
            })

            promises.push(p)

        })
    })
    await Promise.all(promises.map((schemaPromise) => {
        return Promise.all(schemaPromise.map(({value}) => value)).then((schema)=> {
            let result = HashMap_init()
            schema.forEach((content, i) => {
                result.put_xwzc9p$(schemaPromise[i]["name"], content)
            })
            results.push(result)
        })
    }))

    return results;
}
