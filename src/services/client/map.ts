export const getNearbyPools = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `/api/pool/nearby?lat=${latitude}&lng=${longitude}`,
  );
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error);
  }

  return data;
};
