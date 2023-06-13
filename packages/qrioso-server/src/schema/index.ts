import { stitchSchemas } from '@graphql-tools/stitch'

import userSchema from './user/user'
import companySchema from './company/company'

export default stitchSchemas({
  subschemas: [userSchema, companySchema]
})
