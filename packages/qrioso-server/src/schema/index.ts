import { stitchSchemas } from '@graphql-tools/stitch'

import profileSchema from './profile/profile'

export default stitchSchemas({
  subschemas: [profileSchema]
})
