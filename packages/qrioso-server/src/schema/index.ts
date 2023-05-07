import { stitchSchemas } from '@graphql-tools/stitch'

import profileSchema from './user/user'

export default stitchSchemas({
  subschemas: [profileSchema]
})
