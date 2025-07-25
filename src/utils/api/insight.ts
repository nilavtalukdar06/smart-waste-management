"use client";

import axios from "axios";

const fetchInsight = async () => {
  const response = await axios.get("/api/analytics/insight");
  return response.data;
};

export default fetchInsight;
