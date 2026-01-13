import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Create a safe parser for the greetings response
// Since the route definition uses z.custom, we need to manually define the shape expected
// based on the schema inference in shared/routes
const greetingSchema = z.object({
  id: z.number(),
  message: z.string(),
});

export function useGreetings() {
  return useQuery({
    queryKey: [api.greetings.get.path],
    queryFn: async () => {
      const res = await fetch(api.greetings.get.path);
      if (!res.ok) throw new Error("Failed to fetch greetings");
      
      const data = await res.json();
      // Validate the response array
      return z.array(greetingSchema).parse(data);
    },
  });
}
