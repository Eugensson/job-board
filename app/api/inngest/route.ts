import { serve } from "inngest/next";

import {
  handleJobExpiration,
  helloWorld,
  sendPeriodicJobListings,
} from "@/app/api/inngest/functions";
import { inngest } from "@/utils/inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, handleJobExpiration, sendPeriodicJobListings],
});
