"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAddress = (coords: ILocation | null) => {
  const address = useQuery({
    queryKey: ["address", coords],
    enabled: !!coords,
    queryFn: async () => {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: coords?.lat,
            lon: coords?.long,
            format: "json",
          },
        }
      );
      return response.data.display_name;
    },
  });
  return address;
};

export default useGetAddress;
