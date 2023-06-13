import { createClient } from '@qrioso/db/src/client'

const client = createClient()

export const provider = {
  ...client.company
}
