import { stitchSchemas } from '@graphql-tools/stitch'

import userSchema from './user/user'

export default stitchSchemas({
  subschemas: [userSchema]
})
