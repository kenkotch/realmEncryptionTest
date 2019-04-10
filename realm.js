import Realm from 'realm'
import base64js from 'base64-js'

export const STANDARD_OBJECT = 'standard_object'

export const standardObject = {
  name: STANDARD_OBJECT,
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string?'
  }
}

const string = 'N60LgDmG4CuwC9Gb/qdgBvjR0bfRjN4NzPfRwmFj960//+EDlTSGpYwA1V83XDepAT+Dv/wFZL1cqvuIAZjbzw==' // base64
// hex = 37AD0B803986E02BB00BD19BFEA76006F8D1D1B7D18CDE0DCCF7D1C26163F7AD3FFFE103953486A58C00D55F375C37A9013F83BFFC0564BD5CAAFB880198DBCF
const encryptionKey = base64js.toByteArray(string)

const standardObjectSchema = {
  path: 'standardObject.realm',
  schema: [standardObject],
  schemaVersion: 0,
  encryptionKey
}

export const standardObjectsSchema = new Realm(standardObjectSchema)

export const insertRealmFromObject = (object, schema, name) => new Promise(async (resolve, reject) => {
  try {
    console.log('insertRealmFromObject called')
    const realm = await Realm.open(schema)
    realm.write(() => {
      realm.create(name, object)
      resolve()
    })
  } catch (error) {
    console.log(error)
    reject(error)
  }
})

export const getByIdAndName = (
  id,
  name,
  schema
) => new Promise(async (resolve, reject) => {
  try {
    const realm = await Realm.open(schema)
    const obj = realm.objects(name).filtered(`id == ${id}`)
    resolve(convertToArray(obj))
  } catch (error) {
    reject(error)
  }
})

export const deleteRealmById = (
  id,
  name,
  schema,
  children
) => new Promise(async (resolve, reject) => {
  try {
    const realm = await Realm.open(schema)
    realm.write(() => {
      const toDelete = realm.objectForPrimaryKey(name, id)
      realm.delete(toDelete)

      if (children.length) {
        for (let i = 0; i < children.length; i++) {
          const childDelete = realm.objectForPrimaryKey(children[i], id)
          realm.delete(childDelete)
        }
      }

      resolve()
    })
  } catch (error) {
    reject(error)
  }
})
