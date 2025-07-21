"use client";
import { useMutation } from "@tanstack/react-query";

const useGetCoordinates = () => {
  const coordinates = useMutation<ILocation>({
    mutationFn: () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({ lat: pos.coords.latitude, long: pos.coords.longitude }),
          (err) => reject(err)
        );
      }),
  });
  return coordinates;
};

export default useGetCoordinates;
